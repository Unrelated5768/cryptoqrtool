export type LiveState = 'loading' | 'fresh' | 'stale' | 'unavailable' | 'rate-limited';

export interface LiveResult<T> {
  state: LiveState;
  data: T;
  updatedAt: string;
  message?: string;
}

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  price: number | null;
  change24h: number | null;
  marketCap: number | null;
}

export interface FeeRow {
  network: string;
  ticker: string;
  status: LiveState;
  priority: string;
  standard: string;
  economy: string;
  source: string;
}

export interface ExchangeRow {
  id: string;
  name: string;
  image?: string;
  country?: string;
  trustScore?: number;
  tradeVolumeBtc?: number;
  url?: string;
}

const cache = new Map<string, { expires: number; value: unknown }>();

export async function cachedJson<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<LiveResult<T>> {
  const now = Date.now();
  const cached = cache.get(key) as { expires: number; value: T } | undefined;

  if (cached && cached.expires > now) {
    return { state: 'fresh', data: cached.value, updatedAt: new Date(cached.expires - ttlMs).toISOString() };
  }

  try {
    const value = await fetcher();
    cache.set(key, { expires: now + ttlMs, value });
    return { state: 'fresh', data: value, updatedAt: new Date().toISOString() };
  } catch (error) {
    if (cached) {
      return {
        state: 'stale',
        data: cached.value,
        updatedAt: new Date(cached.expires - ttlMs).toISOString(),
        message: error instanceof Error ? error.message : 'Using stale cached data.'
      };
    }
    return {
      state: error instanceof Response && error.status === 429 ? 'rate-limited' : 'unavailable',
      data: [] as T,
      updatedAt: new Date().toISOString(),
      message: error instanceof Error ? error.message : 'Live data is unavailable.'
    };
  }
}

export async function fetchMarkets(fetchFn = fetch, currency = 'USD'): Promise<MarketAsset[]> {
  const vsCurrency = encodeURIComponent(currency.toLowerCase());
  const url =
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`;
  const response = await fetchFn(url);
  assertOk(response);
  const rows = (await response.json()) as Array<Record<string, unknown>>;
  return rows.map((row) => ({
    id: String(row.id),
    symbol: String(row.symbol).toUpperCase(),
    name: String(row.name),
    image: row.image ? String(row.image) : undefined,
    price: numberOrNull(row.current_price),
    change24h: numberOrNull(row.price_change_percentage_24h),
    marketCap: numberOrNull(row.market_cap)
  }));
}

export async function fetchFees(fetchFn = fetch, etherscanKey?: string): Promise<FeeRow[]> {
  const rows: FeeRow[] = [];

  try {
    const response = await fetchFn('https://mempool.space/api/v1/fees/recommended');
    assertOk(response);
    const data = (await response.json()) as Record<string, number>;
    rows.push({
      network: 'Bitcoin',
      ticker: 'BTC',
      status: 'fresh',
      priority: `${data.fastestFee ?? 'n/a'} sat/vB`,
      standard: `${data.halfHourFee ?? 'n/a'} sat/vB`,
      economy: `${data.hourFee ?? 'n/a'} sat/vB`,
      source: 'mempool.space'
    });
  } catch {
    rows.push(unavailableFee('Bitcoin', 'BTC', 'mempool.space'));
  }

  if (etherscanKey) {
    try {
      const response = await fetchFn(
        `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanKey}`
      );
      assertOk(response);
      const data = (await response.json()) as { result?: Record<string, string> };
      rows.push({
        network: 'Ethereum / EVM',
        ticker: 'ETH',
        status: 'fresh',
        priority: `${data.result?.FastGasPrice ?? 'n/a'} gwei`,
        standard: `${data.result?.ProposeGasPrice ?? 'n/a'} gwei`,
        economy: `${data.result?.SafeGasPrice ?? 'n/a'} gwei`,
        source: 'Etherscan Gas Oracle'
      });
    } catch {
      rows.push(unavailableFee('Ethereum / EVM', 'ETH', 'Etherscan Gas Oracle'));
    }
  } else {
    rows.push({
      ...unavailableFee('Ethereum / EVM', 'ETH', 'Etherscan Gas Oracle'),
      source: 'Configure ETHERSCAN_API_KEY'
    });
  }

  rows.push({
    network: 'Solana',
    ticker: 'SOL',
    status: 'fresh',
    priority: '~0.000005 SOL',
    standard: '~0.000005 SOL',
    economy: '~0.000005 SOL',
    source: 'Protocol base fee estimate'
  });

  rows.push({
    network: 'Monero',
    ticker: 'XMR',
    status: 'unavailable',
    priority: 'Unavailable',
    standard: 'Unavailable',
    economy: 'Unavailable',
    source: 'No reliable configured source'
  });

  return rows;
}

export async function fetchExchanges(fetchFn = fetch): Promise<ExchangeRow[]> {
  const response = await fetchFn('https://api.coingecko.com/api/v3/exchanges?per_page=30&page=1');
  assertOk(response);
  const rows = (await response.json()) as Array<Record<string, unknown>>;
  return rows.map((row) => ({
    id: String(row.id),
    name: String(row.name),
    image: row.image ? String(row.image) : undefined,
    country: row.country ? String(row.country) : undefined,
    trustScore: numberOrNull(row.trust_score) ?? undefined,
    tradeVolumeBtc: numberOrNull(row.trade_volume_24h_btc) ?? undefined,
    url: row.url ? String(row.url) : undefined
  }));
}

function unavailableFee(network: string, ticker: string, source: string): FeeRow {
  return {
    network,
    ticker,
    status: 'unavailable',
    priority: 'Unavailable',
    standard: 'Unavailable',
    economy: 'Unavailable',
    source
  };
}

function assertOk(response: Response) {
  if (response.status === 429) throw new Response('Rate limited', { status: 429 });
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);
}

function numberOrNull(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
