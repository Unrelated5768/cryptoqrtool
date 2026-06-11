import { getNetwork, isTokenNetwork, type NetworkId } from '$lib/networks';
import { verifyLocally, type LookupState, type VerificationNetwork, type VerificationResultBase } from '$lib/verification';

export interface VerificationLookup {
  state: LookupState;
  source: string;
  summary: string;
  details?: Record<string, string | number | boolean | null>;
}

export interface VerificationApiResult extends VerificationResultBase {
  lookup: VerificationLookup;
}

export async function verifyWithLookup(
  fetchFn: typeof fetch,
  q: string,
  network: VerificationNetwork,
  etherscanKey?: string
): Promise<VerificationApiResult> {
  const base = verifyLocally(q, network);
  const lookup =
    base.validation.status === 'valid' && base.network
      ? await lookupInput(fetchFn, base.network, base.inputType, base.normalized, etherscanKey)
      : unavailableLookup('Validation', 'Live lookup is skipped until the input validates locally.');

  return {
    ...base,
    state: lookup.state,
    lookup,
    updatedAt: new Date().toISOString(),
    message: lookup.state === 'fresh' ? `${base.message} Live lookup returned current data.` : base.message
  };
}

async function lookupInput(
  fetchFn: typeof fetch,
  network: NetworkId,
  inputType: VerificationResultBase['inputType'],
  value: string,
  etherscanKey?: string
): Promise<VerificationLookup> {
  if (inputType === 'lightning-invoice') {
    return unavailableLookup('BOLT11 validation', 'Lightning invoice format is checked locally. Settlement lookup is not available.');
  }

  if (network === 'bitcoin') {
    return inputType === 'transaction' ? lookupBitcoinTx(fetchFn, value) : lookupBitcoinAddress(fetchFn, value);
  }

  if (network === 'ethereum' || isTokenNetwork(network)) {
    return inputType === 'transaction'
      ? lookupEvmTx(fetchFn, value, etherscanKey)
      : lookupEvmAddress(fetchFn, value, etherscanKey);
  }

  if (network === 'solana') {
    return inputType === 'transaction' ? lookupSolanaSignature(fetchFn, value) : lookupSolanaAddress(fetchFn, value);
  }

  if (network === 'litecoin') {
    return unavailableLookup('Explorer links', 'Litecoin live lookup is not configured. Use the trusted explorer links.');
  }

  if (network === 'monero') {
    return unavailableLookup('Explorer links', 'Monero live lookup is not configured. Use the trusted explorer search link.');
  }

  return unavailableLookup(getNetwork(network).name, 'Live lookup is unavailable for this network.');
}

async function lookupBitcoinAddress(fetchFn: typeof fetch, address: string): Promise<VerificationLookup> {
  try {
    const response = await fetchFn(`https://mempool.space/api/address/${encodeURIComponent(address)}`);
    assertOk(response);
    const data = (await response.json()) as {
      chain_stats?: { tx_count?: number; funded_txo_sum?: number; spent_txo_sum?: number };
      mempool_stats?: { tx_count?: number };
    };
    const funded = data.chain_stats?.funded_txo_sum ?? 0;
    const spent = data.chain_stats?.spent_txo_sum ?? 0;
    return {
      state: 'fresh',
      source: 'mempool.space',
      summary: `${data.chain_stats?.tx_count ?? 0} confirmed transactions, ${data.mempool_stats?.tx_count ?? 0} in mempool.`,
      details: {
        confirmedTransactions: data.chain_stats?.tx_count ?? 0,
        mempoolTransactions: data.mempool_stats?.tx_count ?? 0,
        balanceSats: funded - spent
      }
    };
  } catch (error) {
    return lookupError('mempool.space', error);
  }
}

async function lookupBitcoinTx(fetchFn: typeof fetch, txid: string): Promise<VerificationLookup> {
  try {
    const response = await fetchFn(`https://mempool.space/api/tx/${encodeURIComponent(txid)}`);
    assertOk(response);
    const data = (await response.json()) as { status?: { confirmed?: boolean; block_height?: number; block_time?: number }; fee?: number };
    return {
      state: 'fresh',
      source: 'mempool.space',
      summary: data.status?.confirmed ? `Confirmed in block ${data.status.block_height ?? 'unknown'}.` : 'Seen by provider but unconfirmed.',
      details: {
        confirmed: Boolean(data.status?.confirmed),
        blockHeight: data.status?.block_height ?? null,
        feeSats: data.fee ?? null
      }
    };
  } catch (error) {
    return lookupError('mempool.space', error);
  }
}

async function lookupEvmAddress(fetchFn: typeof fetch, address: string, etherscanKey?: string): Promise<VerificationLookup> {
  if (!etherscanKey) {
    return unavailableLookup('Etherscan', 'Set ETHERSCAN_API_KEY to enable Ethereum/EVM live lookup.');
  }

  try {
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${encodeURIComponent(address)}&tag=latest&apikey=${etherscanKey}`;
    const response = await fetchFn(url);
    assertOk(response);
    const data = (await response.json()) as { status?: string; message?: string; result?: string };
    if (data.status === '0' && /rate limit/i.test(data.result ?? data.message ?? '')) {
      throw new Response('Rate limited', { status: 429 });
    }
    return {
      state: 'fresh',
      source: 'Etherscan',
      summary: 'Address was found by Etherscan balance lookup.',
      details: {
        balanceWei: data.result ?? null
      }
    };
  } catch (error) {
    return lookupError('Etherscan', error);
  }
}

async function lookupEvmTx(fetchFn: typeof fetch, hash: string, etherscanKey?: string): Promise<VerificationLookup> {
  if (!etherscanKey) {
    return unavailableLookup('Etherscan', 'Set ETHERSCAN_API_KEY to enable Ethereum/EVM live lookup.');
  }

  try {
    const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${encodeURIComponent(hash)}&apikey=${etherscanKey}`;
    const response = await fetchFn(url);
    assertOk(response);
    const data = (await response.json()) as { result?: { blockNumber?: string | null; from?: string; to?: string | null } | null; message?: string };
    if (/rate limit/i.test(data.message ?? '')) throw new Response('Rate limited', { status: 429 });
    if (!data.result) {
      return unavailableLookup('Etherscan', 'Etherscan did not return a transaction for this hash.');
    }
    return {
      state: 'fresh',
      source: 'Etherscan',
      summary: data.result.blockNumber ? 'Transaction exists and has a block number.' : 'Transaction exists but no block number was returned.',
      details: {
        blockNumber: data.result.blockNumber ?? null,
        from: data.result.from ?? null,
        to: data.result.to ?? null
      }
    };
  } catch (error) {
    return lookupError('Etherscan', error);
  }
}

async function lookupSolanaAddress(fetchFn: typeof fetch, address: string): Promise<VerificationLookup> {
  try {
    const response = await solanaRpc(fetchFn, 'getAccountInfo', [address, { encoding: 'base64' }]);
    const data = (await response.json()) as { result?: { value?: { lamports?: number; owner?: string } | null } };
    return {
      state: 'fresh',
      source: 'Solana public RPC',
      summary: data.result?.value ? 'Account exists on Solana mainnet-beta.' : 'Address format is valid, but no account data was returned.',
      details: {
        exists: Boolean(data.result?.value),
        lamports: data.result?.value?.lamports ?? null,
        owner: data.result?.value?.owner ?? null
      }
    };
  } catch (error) {
    return lookupError('Solana public RPC', error);
  }
}

async function lookupSolanaSignature(fetchFn: typeof fetch, signature: string): Promise<VerificationLookup> {
  try {
    const response = await solanaRpc(fetchFn, 'getSignatureStatuses', [[signature], { searchTransactionHistory: true }]);
    const data = (await response.json()) as { result?: { value?: Array<{ confirmationStatus?: string; err?: unknown; slot?: number } | null> } };
    const status = data.result?.value?.[0] ?? null;
    return {
      state: 'fresh',
      source: 'Solana public RPC',
      summary: status ? `Signature found with ${status.confirmationStatus ?? 'unknown'} status.` : 'Signature format is valid, but the public RPC did not find it.',
      details: {
        found: Boolean(status),
        confirmationStatus: status?.confirmationStatus ?? null,
        slot: status?.slot ?? null,
        hasError: status?.err ? true : false
      }
    };
  } catch (error) {
    return lookupError('Solana public RPC', error);
  }
}

async function solanaRpc(fetchFn: typeof fetch, method: string, params: unknown[]) {
  const response = await fetchFn('https://api.mainnet-beta.solana.com', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 'cryptoqr-verify', method, params })
  });
  assertOk(response);
  return response;
}

function unavailableLookup(source: string, summary: string): VerificationLookup {
  return { state: 'unavailable', source, summary };
}

function lookupError(source: string, error: unknown): VerificationLookup {
  if (error instanceof Response && error.status === 429) {
    return { state: 'rate-limited', source, summary: 'Provider rate limit reached. Try again later or open an explorer link.' };
  }
  return {
    state: 'unavailable',
    source,
    summary: error instanceof Error ? error.message : 'Live lookup is unavailable. Use the explorer links to inspect this input.'
  };
}

function assertOk(response: Response) {
  if (response.status === 429) throw new Response('Rate limited', { status: 429 });
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);
}
