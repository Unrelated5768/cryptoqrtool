import { routeMeta } from '$lib/seo';

export async function load({ fetch }) {
  const result = await fetch('/api/exchanges').then((response) => response.json());
  return { meta: routeMeta('/exchanges'), result };
}
