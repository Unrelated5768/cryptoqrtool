import { error } from '@sveltejs/kit';
import { coinLandingJsonLd, getCoinLandingPage, routeMeta } from '$lib/seo';

export function load({ params }) {
  const landingPage = getCoinLandingPage(params.slug);

  if (!landingPage) {
    error(404, 'Not found');
  }

  return {
    landingPage,
    meta: {
      ...routeMeta(`/${landingPage.slug}`),
      jsonLd: coinLandingJsonLd(landingPage)
    }
  };
}
