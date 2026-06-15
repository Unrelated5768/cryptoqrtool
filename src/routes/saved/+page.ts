import { routeMeta } from '$lib/seo';

export function load({ url }) {
  return { meta: routeMeta(url.pathname) };
}
