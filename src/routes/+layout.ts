import { localeDir } from '$lib/i18n/locales';
import { parseLocalePath } from '$lib/i18n/routing';

export const prerender = false;

export function load({ url }) {
  const { locale, routePath } = parseLocalePath(url.pathname);

  return {
    locale,
    dir: localeDir(locale),
    routePath
  };
}
