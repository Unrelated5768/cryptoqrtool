import { describe, expect, it, vi } from 'vitest';
import { cachedJson, fetchExchanges, fetchMarkets } from './liveData';

describe('live data adapters', () => {
  it('maps CoinGecko market rows', async () => {
    const fetchFn = vi.fn(async () => new Response(JSON.stringify([
      {
        id: 'monero',
        symbol: 'xmr',
        name: 'Monero',
        image: 'https://assets.coingecko.com/coins/images/69/large/monero_logo.png',
        current_price: 180,
        price_change_percentage_24h: 1.2,
        market_cap: 3
      }
    ])));
    const rows = await fetchMarkets(fetchFn as unknown as typeof fetch);
    expect(fetchFn).toHaveBeenCalledWith(expect.stringContaining('per_page=50'));
    expect(fetchFn).toHaveBeenCalledWith(expect.stringContaining('vs_currency=usd'));
    expect(rows[0]).toMatchObject({
      symbol: 'XMR',
      price: 180,
      image: 'https://assets.coingecko.com/coins/images/69/large/monero_logo.png'
    });
  });

  it('requests markets in the selected fiat currency', async () => {
    const fetchFn = vi.fn(async () => new Response(JSON.stringify([])));
    await fetchMarkets(fetchFn as unknown as typeof fetch, 'EUR');
    expect(fetchFn).toHaveBeenCalledWith(expect.stringContaining('vs_currency=eur'));
  });

  it('maps CoinGecko exchange logos', async () => {
    const fetchFn = vi.fn(async () => new Response(JSON.stringify([
      {
        id: 'kraken',
        name: 'Kraken',
        image: 'https://assets.coingecko.com/markets/images/29/small/kraken.jpg',
        trust_score: 10,
        trade_volume_24h_btc: 1234
      }
    ])));
    const rows = await fetchExchanges(fetchFn as unknown as typeof fetch);
    expect(rows[0]).toMatchObject({
      id: 'kraken',
      name: 'Kraken',
      image: 'https://assets.coingecko.com/markets/images/29/small/kraken.jpg'
    });
  });

  it('returns stale cached data when refresh fails', async () => {
    await cachedJson('test-cache', 10_000, async () => [{ ok: true }]);
    const result = await cachedJson('test-cache', 10_000, async () => {
      throw new Error('offline');
    });
    expect(result.state).toBe('fresh');
    expect(result.data).toEqual([{ ok: true }]);
  });
});
