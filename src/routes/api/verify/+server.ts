import { env } from '$env/dynamic/private';
import { cachedJson } from '$lib/liveData';
import { networks } from '$lib/networks';
import { verifyWithLookup, type VerificationApiResult } from '$lib/server/verificationLookup';
import type { VerificationNetwork } from '$lib/verification';
import { json } from '@sveltejs/kit';

export async function GET({ fetch, url }) {
  const q = url.searchParams.get('q') ?? '';
  const requestedNetwork = url.searchParams.get('network') ?? 'automatic';
  const network = isVerificationNetwork(requestedNetwork) ? requestedNetwork : 'automatic';
  const cacheKey = `verify:${network}:${q.trim().toLowerCase()}`;

  const result = await cachedJson<VerificationApiResult>(cacheKey, 30_000, () =>
    verifyWithLookup(fetch, q, network, env.ETHERSCAN_API_KEY)
  );

  return json(result.data, { headers: { 'cache-control': 'public, max-age=30' } });
}

function isVerificationNetwork(value: string): value is VerificationNetwork {
  return value === 'automatic' || networks.some((network) => network.id === value);
}
