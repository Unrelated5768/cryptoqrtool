import { env } from '$env/dynamic/private';
import { cachedJson, fetchFees } from '$lib/liveData';
import { json } from '@sveltejs/kit';

export async function GET({ fetch }) {
  const result = await cachedJson('fees', 45_000, () => fetchFees(fetch, env.ETHERSCAN_API_KEY));
  return json(result, { headers: { 'cache-control': 'public, max-age=45' } });
}
