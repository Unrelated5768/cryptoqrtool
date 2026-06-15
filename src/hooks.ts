import type { Handle, Reroute } from '@sveltejs/kit';
import { localeDir } from '$lib/i18n/locales';
import { parseLocalePath } from '$lib/i18n/routing';

export const reroute: Reroute = ({ url }) => {
  const parsed = parseLocalePath(url.pathname);
  if (parsed.hasLocalePrefix) return parsed.routePath;
};

export const handle: Handle = async ({ event, resolve }) => {
  const { locale } = parseLocalePath(event.url.pathname);
  const dir = localeDir(locale);

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('<html lang="en" class="dark">', `<html lang="${locale}" dir="${dir}" class="dark">`)
  });
};
