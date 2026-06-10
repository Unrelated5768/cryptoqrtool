import { cachedJson, fetchExchanges } from '$lib/liveData';
import { json } from '@sveltejs/kit';

export async function GET({ fetch }) {
  const result = await cachedJson('exchanges', 5 * 60_000, () => fetchExchanges(fetch));
  return json(result, { headers: { 'cache-control': 'public, max-age=300' } });
}
