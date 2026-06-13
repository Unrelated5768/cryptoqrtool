import { describe, expect, it } from 'vitest';
import { getCoinLandingPage, getSitemapEntries, relatedPageLabel, routeMeta } from './seo';

function schemaTypes(pathname: string) {
  return new Set((routeMeta(pathname).jsonLd ?? []).map((item) => String(item['@type'])));
}

describe('seo metadata', () => {
  it('keeps paired generator and guide pages distinct', () => {
    const generatorPage = getCoinLandingPage('bitcoin-qr-code-generator');
    const guidePage = getCoinLandingPage('crypto-qrcode-bitcoin');

    expect(generatorPage).toBeDefined();
    expect(guidePage).toBeDefined();

    expect(generatorPage?.template).toBe('generator');
    expect(guidePage?.template).toBe('guide');
    expect(generatorPage?.title).not.toBe(guidePage?.title);
    expect(generatorPage?.headline).not.toBe(guidePage?.headline);
    expect(generatorPage?.description).not.toBe(guidePage?.description);
    expect(generatorPage?.primarySections[0]?.title).not.toBe(guidePage?.primarySections[0]?.title);
  });

  it('keeps canonicals self-referential for paired pages', () => {
    expect(routeMeta('/').canonical).toBe('https://cryptoqrtool.com/');
    expect(routeMeta('/bitcoin-qr-code-generator').canonical).toBe('https://cryptoqrtool.com/bitcoin-qr-code-generator');
    expect(routeMeta('/crypto-qrcode-bitcoin').canonical).toBe('https://cryptoqrtool.com/crypto-qrcode-bitcoin');
  });

  it('uses intent-specific related labels for generator, guide, and checker pages', () => {
    const generatorPage = getCoinLandingPage('bitcoin-qr-code-generator');
    const guidePage = getCoinLandingPage('crypto-qrcode-bitcoin');
    const checkerPage = getCoinLandingPage('bitcoin-address-checker');

    expect(generatorPage).toBeDefined();
    expect(guidePage).toBeDefined();
    expect(checkerPage).toBeDefined();

    expect(relatedPageLabel(generatorPage!)).toBe('Bitcoin QR Code Generator');
    expect(relatedPageLabel(guidePage!)).toBe('What Is a Bitcoin Crypto QR Code?');
    expect(relatedPageLabel(checkerPage!)).toBe('Bitcoin Address Checker');
  });

  it('uses different schema intent for generator and guide pages', () => {
    const generatorTypes = schemaTypes('/bitcoin-qr-code-generator');
    const guideTypes = schemaTypes('/crypto-qrcode-bitcoin');

    expect(generatorTypes.has('WebApplication')).toBe(true);
    expect(generatorTypes.has('BreadcrumbList')).toBe(true);
    expect(generatorTypes.has('FAQPage')).toBe(true);
    expect(guideTypes.has('WebApplication')).toBe(false);
    expect(guideTypes.has('BreadcrumbList')).toBe(true);
    expect(guideTypes.has('FAQPage')).toBe(true);
  });

  it('marks saved presets as noindex and keeps them out of the sitemap', () => {
    expect(routeMeta('/saved').robots).toBe('noindex,follow');
    expect(getSitemapEntries().some((entry) => entry.path === '/saved')).toBe(false);
  });

  it('adds breadcrumbs to indexable non-home routes', () => {
    expect(schemaTypes('/generate').has('BreadcrumbList')).toBe(true);
    expect(schemaTypes('/markets').has('BreadcrumbList')).toBe(true);
    expect(schemaTypes('/privacy').has('BreadcrumbList')).toBe(true);
    expect(schemaTypes('/terms').has('BreadcrumbList')).toBe(true);
    expect(schemaTypes('/faq').has('BreadcrumbList')).toBe(true);
    expect(schemaTypes('/').has('BreadcrumbList')).toBe(false);
  });

  it('includes the privacy notice in metadata and sitemap entries', () => {
    expect(routeMeta('/privacy').title).toContain('Privacy');
    expect(getSitemapEntries().some((entry) => entry.path === '/privacy')).toBe(true);
  });

  it('includes terms and FAQ metadata in sitemap entries', () => {
    expect(routeMeta('/terms').title).toContain('Terms');
    expect(routeMeta('/faq').title).toContain('FAQ');
    expect(schemaTypes('/faq').has('FAQPage')).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === '/terms')).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === '/faq')).toBe(true);
  });

  it('includes lastmod data for every sitemap entry', () => {
    const entries = getSitemapEntries();

    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
