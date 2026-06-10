import { routeMeta, webApplicationJsonLd } from '$lib/seo';

export function load() {
  return {
    meta: {
      ...routeMeta('/generate'),
      jsonLd: webApplicationJsonLd
    }
  };
}
