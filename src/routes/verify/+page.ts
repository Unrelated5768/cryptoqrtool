import { routeMeta } from '$lib/seo';

export async function load({ fetch, url }) {
  const q = url.searchParams.get('q') ?? '';
  const network = url.searchParams.get('network') ?? 'automatic';
  const result = q
    ? await fetch(`/api/verify?network=${encodeURIComponent(network)}&q=${encodeURIComponent(q)}`).then((response) =>
        response.json()
      )
    : null;

  return {
    meta: routeMeta(url.pathname),
    q,
    network,
    result
  };
}
