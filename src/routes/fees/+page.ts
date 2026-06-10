import { routeMeta } from '$lib/seo';

export async function load({ fetch }) {
  const result = await fetch('/api/fees').then((response) => response.json());
  return { meta: routeMeta('/fees'), result };
}
