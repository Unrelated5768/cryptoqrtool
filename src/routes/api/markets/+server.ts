import { cachedJson, fetchMarkets } from '$lib/liveData';
import { normalizeCurrency } from '$lib/currencyOptions';
import { json } from '@sveltejs/kit';

export async function GET({ fetch, url }) {
  const currency = normalizeCurrency(url.searchParams.get('currency'));
  const result = await cachedJson(`markets:${currency}`, 60_000, () => fetchMarkets(fetch, currency));
  return json(result, { headers: { 'cache-control': 'public, max-age=60' } });
}
