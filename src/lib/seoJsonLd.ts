import {
  absoluteUrl,
  productName,
  siteRootUrl,
  type BreadcrumbItem,
  type JsonLd,
  type FaqItem,
  type LandingPage,
  type StaticRouteConfig
} from './seoShared';
import { defaultLocale, type Locale } from './i18n/locales';
import { localizeBreadcrumbLabel } from './i18n/seo';
import { staticRoutes } from './seoStaticRoutes';

function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

function faqJsonLd(items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

function webPageJsonLd(name: string, description: string, url: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    url,
    description
  };
}

function webApplicationJsonLd(name: string, description: string, url: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any modern browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

const defaultStructuredDataDescription =
  'Browser-local crypto QR generation tools for Monero, Bitcoin, Ethereum, Solana, Litecoin, USDC, and USDT.';

function organizationJsonLdForDescription(description: string = defaultStructuredDataDescription): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: productName,
    url: siteRootUrl,
    description,
    sameAs: []
  };
}

function webSiteJsonLd(description: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: productName,
    url: siteRootUrl,
    description
  };
}

function techArticleJsonLd(name: string, description: string, url: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: name,
    url,
    description,
    author: {
      '@type': 'Organization',
      name: productName
    }
  };
}

export const organizationJsonLd: JsonLd = organizationJsonLdForDescription();

function landingPageBreadcrumbs(page: LandingPage, locale: Locale): BreadcrumbItem[] {
  const current = { name: page.headline, path: `/${page.slug}` };

  if (page.template === 'generator') {
    return [
      { name: localizeBreadcrumbLabel('Home', locale), path: '/' },
      { name: localizeBreadcrumbLabel('Generator', locale), path: '/generate' },
      current
    ];
  }

  if (page.template === 'guide' && page.slug !== 'crypto-generate-qrcode') {
    return [
      { name: localizeBreadcrumbLabel('Home', locale), path: '/' },
      { name: localizeBreadcrumbLabel('Guide', locale), path: '/crypto-generate-qrcode' },
      current
    ];
  }

  if (page.template === 'checker') {
    return [
      { name: localizeBreadcrumbLabel('Home', locale), path: '/' },
      { name: localizeBreadcrumbLabel('Verify', locale), path: '/verify' },
      current
    ];
  }

  return [{ name: localizeBreadcrumbLabel('Home', locale), path: '/' }, current];
}

function staticRouteBreadcrumbs(pathname: string, route: StaticRouteConfig, locale: Locale): BreadcrumbItem[] {
  return [
    { name: localizeBreadcrumbLabel('Home', locale), path: '/' },
    { name: localizeBreadcrumbLabel(route.breadcrumbLabel ?? route.schemaName, locale), path: pathname }
  ];
}

export function landingPageJsonLd(page: LandingPage, canonical: string, locale: Locale = defaultLocale): JsonLd[] {
  const schemas: JsonLd[] = [webPageJsonLd(page.headline, page.description, canonical)];

  if (page.template === 'generator' || page.template === 'checker') {
    schemas.push(webApplicationJsonLd(page.headline, page.description, canonical));
  }

  const breadcrumbs = landingPageBreadcrumbs(page, locale);
  if (breadcrumbs.length > 1) {
    schemas.push(breadcrumbJsonLd(breadcrumbs));
  }

  if (page.faq.length > 0) {
    schemas.push(faqJsonLd(page.faq));
  }

  return schemas;
}

export function staticRouteJsonLd(pathname: string, route: StaticRouteConfig, locale: Locale = defaultLocale): JsonLd[] {
  if (route.indexable === false) return [];

  const canonical = absoluteUrl(pathname);

  if (route.kind === 'home') {
    const schemas = [
      organizationJsonLdForDescription(route.description),
      webSiteJsonLd(route.description),
      webApplicationJsonLd(route.schemaName, route.description, canonical)
    ];
    if (route.faq?.length) schemas.push(faqJsonLd(route.faq));
    return schemas;
  }

  const schemas: JsonLd[] =
    route.kind === 'webapp'
      ? [webPageJsonLd(route.schemaName, route.description, canonical), webApplicationJsonLd(route.schemaName, route.description, canonical)]
      : route.kind === 'tech-article'
        ? [techArticleJsonLd(route.schemaName, route.description, canonical)]
        : [webPageJsonLd(route.schemaName, route.description, canonical)];

  schemas.push(breadcrumbJsonLd(staticRouteBreadcrumbs(pathname, route, locale)));

  if (route.faq?.length) {
    schemas.push(faqJsonLd(route.faq));
  }

  return schemas;
}
