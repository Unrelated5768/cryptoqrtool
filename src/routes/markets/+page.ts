import { routeMeta } from '$lib/seo';

export async function load({ fetch }) {
  const result = await fetch('/api/markets').then((response) => response.json());
  return { meta: routeMeta('/markets'), result };
}
