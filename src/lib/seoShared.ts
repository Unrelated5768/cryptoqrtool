import type { NetworkId } from './networks';

export const siteUrl = 'https://cryptoqrtool.com';
export const siteRootUrl = `${siteUrl}/`;
export const productName = 'CryptoQR Tool';
export const seoProductName = 'Crypto QR Code Generator';
export const defaultOgImage = `${siteUrl}/og-image.png`;
export const defaultOgImageAlt = 'CryptoQR Tool crypto QR code generator';
export const defaultOgImageWidth = 1200;
export const defaultOgImageHeight = 630;
export const contentLastUpdated = '2026-06-12';

export type JsonLd = Record<string, unknown>;

export type FaqItem = {
  question: string;
  answer: string;
};

export type SeoMeta = {
  title: string;
  description: string;
  canonical: string;
  alternates?: {
    hreflang: string;
    href: string;
  }[];
  jsonLd?: JsonLd[];
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  twitterImage?: string;
  robots?: string;
  lastModified?: string;
};

export type LandingPageTemplate = 'generator' | 'guide' | 'checker';

export type LandingPageSection = {
  title: string;
  body: string;
};

export type LandingPage = {
  slug: string;
  canonicalSlug?: string;
  template: LandingPageTemplate;
  networkId?: NetworkId;
  name: string;
  ticker?: string;
  accent: string;
  title: string;
  description: string;
  headline: string;
  eyebrow: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  payloadExample: string;
  chips: string[];
  benefits: LandingPageSection[];
  primarySections: LandingPageSection[];
  howToSteps?: string[];
  trustPoints?: string[];
  cautionItems?: string[];
  faq: FaqItem[];
  lastModified?: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type StaticRouteKind = 'home' | 'webapp' | 'page' | 'tech-article';

export type StaticRouteConfig = {
  title: string;
  description: string;
  schemaName: string;
  kind: StaticRouteKind;
  breadcrumbLabel?: string;
  faq?: FaqItem[];
  robots?: string;
  indexable?: boolean;
  lastModified?: string;
};

export function indefiniteArticle(phrase: string) {
  return /^[aeiou]/i.test(phrase.trim()) ? 'an' : 'a';
}

export function absoluteUrl(path: string) {
  return path === '/' ? siteRootUrl : `${siteUrl}${path}`;
}
