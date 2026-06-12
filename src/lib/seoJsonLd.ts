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

function webSiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: productName,
    url: siteRootUrl,
    description: 'Browser-local crypto QR generation tools for public addresses, invoices, and payment requests.'
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

export const organizationJsonLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: productName,
  url: siteRootUrl,
  description: 'Browser-local crypto QR generation tools for Monero, Bitcoin, Ethereum, Solana, Litecoin, USDC, and USDT.',
  sameAs: []
};

function landingPageBreadcrumbs(page: LandingPage): BreadcrumbItem[] {
  const current = { name: page.headline, path: `/${page.slug}` };

  if (page.template === 'generator') {
    return [
      { name: 'Home', path: '/' },
      { name: staticRoutes['/generate'].breadcrumbLabel ?? staticRoutes['/generate'].schemaName, path: '/generate' },
      current
    ];
  }

  if (page.template === 'guide' && page.slug !== 'crypto-generate-qrcode') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Crypto QR Code Guide', path: '/crypto-generate-qrcode' },
      current
    ];
  }

  if (page.template === 'checker') {
    return [
      { name: 'Home', path: '/' },
      { name: staticRoutes['/verify'].breadcrumbLabel ?? staticRoutes['/verify'].schemaName, path: '/verify' },
      current
    ];
  }

  return [{ name: 'Home', path: '/' }, current];
}

function staticRouteBreadcrumbs(pathname: string, route: StaticRouteConfig): BreadcrumbItem[] {
  return [{ name: 'Home', path: '/' }, { name: route.breadcrumbLabel ?? route.schemaName, path: pathname }];
}

export function landingPageJsonLd(page: LandingPage, canonical: string): JsonLd[] {
  const schemas: JsonLd[] = [webPageJsonLd(page.headline, page.description, canonical)];

  if (page.template === 'generator' || page.template === 'checker') {
    schemas.push(webApplicationJsonLd(page.headline, page.description, canonical));
  }

  const breadcrumbs = landingPageBreadcrumbs(page);
  if (breadcrumbs.length > 1) {
    schemas.push(breadcrumbJsonLd(breadcrumbs));
  }

  if (page.faq.length > 0) {
    schemas.push(faqJsonLd(page.faq));
  }

  return schemas;
}

export function staticRouteJsonLd(pathname: string, route: StaticRouteConfig): JsonLd[] {
  if (route.indexable === false) return [];

  const canonical = absoluteUrl(pathname);

  if (route.kind === 'home') {
    const schemas = [organizationJsonLd, webSiteJsonLd(), webApplicationJsonLd(route.schemaName, route.description, canonical)];
    if (route.faq?.length) schemas.push(faqJsonLd(route.faq));
    return schemas;
  }

  const schemas: JsonLd[] =
    route.kind === 'webapp'
      ? [webPageJsonLd(route.schemaName, route.description, canonical), webApplicationJsonLd(route.schemaName, route.description, canonical)]
      : route.kind === 'tech-article'
        ? [techArticleJsonLd(route.schemaName, route.description, canonical)]
        : [webPageJsonLd(route.schemaName, route.description, canonical)];

  schemas.push(breadcrumbJsonLd(staticRouteBreadcrumbs(pathname, route)));

  if (route.faq?.length) {
    schemas.push(faqJsonLd(route.faq));
  }

  return schemas;
}
