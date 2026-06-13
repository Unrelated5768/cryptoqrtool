import { routeMeta } from '$lib/seo';

export function load() {
  return {
    meta: routeMeta('/faq')
  };
}
