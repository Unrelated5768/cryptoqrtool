import { error } from '@sveltejs/kit';
import { getLocalizedCoinLandingPage, routeMeta } from '$lib/seo';
import { parseLocalePath } from '$lib/i18n/routing';

export function load({ params, url }) {
  const { locale } = parseLocalePath(url.pathname);
  const landingPage = getLocalizedCoinLandingPage(params.slug, locale);

  if (!landingPage) {
    error(404, 'Not found');
  }

  return {
    landingPage,
    meta: routeMeta(url.pathname)
  };
}
