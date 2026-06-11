import { routeMeta, webApplicationJsonLd } from '$lib/seo';

export function load() {
  return {
    meta: {
      ...routeMeta('/api-docs'),
      jsonLd: webApplicationJsonLd
    }
  };
}
