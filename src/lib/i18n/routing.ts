import { absoluteUrl } from '$lib/seoShared';
import { defaultLocale, isLocale, localeConfigs, supportedLocales, type Locale } from './locales';

export type ParsedLocalePath = {
  locale: Locale;
  routePath: string;
  hasLocalePrefix: boolean;
};

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  return pathname.startsWith('/') ? pathname.replace(/\/+$/, '') || '/' : `/${pathname.replace(/\/+$/, '')}`;
}

export function parseLocalePath(pathname: string): ParsedLocalePath {
  const normalized = normalizePath(pathname);
  const [, firstSegment = '', ...rest] = normalized.split('/');

  if (isLocale(firstSegment)) {
    const routePath = rest.length > 0 ? `/${rest.join('/')}` : '/';
    return {
      locale: firstSegment,
      routePath: normalizePath(routePath),
      hasLocalePrefix: firstSegment !== defaultLocale
    };
  }

  return {
    locale: defaultLocale,
    routePath: normalized,
    hasLocalePrefix: false
  };
}

export function stripLocaleFromPath(pathname: string) {
  return parseLocalePath(pathname).routePath;
}

export function localePrefix(locale: Locale) {
  return locale === defaultLocale ? '' : `/${locale}`;
}

export function localizedPath(pathname: string, locale: Locale = defaultLocale) {
  const parsed = parseLocalePath(pathname);
  const basePath = normalizePath(parsed.routePath);
  return `${localePrefix(locale)}${basePath === '/' ? '' : basePath}` || '/';
}

export function localizedHref(href: string, locale: Locale = defaultLocale) {
  if (!href.startsWith('/') || href.startsWith('//')) return href;

  const [pathAndQuery, hash = ''] = href.split('#');
  const [pathname, query = ''] = pathAndQuery.split('?');
  const localized = localizedPath(pathname, locale);
  return `${localized}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}

export function alternateLinks(pathname: string) {
  const routePath = stripLocaleFromPath(pathname);
  return [
    ...supportedLocales.map((locale) => ({
      locale,
      hreflang: localeConfigs[locale].hreflang,
      href: absoluteUrl(localizedPath(routePath, locale))
    })),
    {
      locale: defaultLocale,
      hreflang: 'x-default',
      href: absoluteUrl(localizedPath(routePath, defaultLocale))
    }
  ];
}
