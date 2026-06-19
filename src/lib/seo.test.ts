import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getCoinLandingPage, getLocalizedCoinLandingPage, getSitemapEntries, relatedPageLabel, routeMeta } from './seo';
import { supportedLocales, type Locale } from './i18n/locales';
import { messagesForLocale } from './i18n/messages';
import { phraseTranslations, tr } from './i18n/phrases';
import { staticRoutes } from './seoStaticRoutes';
import type { JsonLd } from './seoShared';

function schemaTypes(pathname: string) {
  return new Set((routeMeta(pathname).jsonLd ?? []).map((item) => String(item['@type'])));
}

function jsonLdOfType(pathname: string, type: string) {
  return (routeMeta(pathname).jsonLd ?? []).find((item) => item['@type'] === type) as JsonLd | undefined;
}

function renderedPhraseKeys() {
  const roots = [
    'src/routes',
    'src/lib/components',
    'src/lib/seoStaticRoutes.ts',
    'src/lib/networks.ts',
    'src/lib/verification.ts',
    'src/lib/qrStyle.ts',
    'src/lib/liveData.ts'
  ];
  const files: string[] = [];

  function walk(path: string) {
    const stats = statSync(path);
    if (stats.isDirectory()) {
      for (const entry of readdirSync(path)) walk(join(path, entry));
      return;
    }
    if (/\.(svelte|ts)$/.test(path)) files.push(path);
  }

  for (const root of roots) walk(join(process.cwd(), root));

  const keys = new Set<string>();
  const translationCall = /\b(?:t|tr)\s*\((?:[^,()]+,\s*)?[`"']([^`"'$]+)[`"']/g;
  const translatedProperty = /\b(?:title|body|question|answer|message|summary):\s*[`"']([^`"'$]+)[`"']/g;
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(translationCall)) keys.add(match[1]);
    for (const match of source.matchAll(translatedProperty)) keys.add(match[1]);
  }
  return keys;
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

  it('targets Monero QR code search intent on the generator page', () => {
    const page = getCoinLandingPage('monero-qr-code-generator');
    const meta = routeMeta('/monero-qr-code-generator');
    const faqSchema = jsonLdOfType('/monero-qr-code-generator', 'FAQPage');

    expect(page).toBeDefined();
    expect(page?.headline).toBe('Monero QR Code Generator');
    expect(meta.title).toContain('Monero QR Code Generator');
    expect(meta.description).toContain('Monero QR code');
    expect(page?.body).toContain('XMR payments');
    expect(page?.chips).toContain('Subaddress');
    expect(page?.chips).toContain('tx_amount');
    expect(page?.faq.length).toBeGreaterThanOrEqual(6);
    expect(JSON.stringify(faqSchema)).toContain('subaddress');
    expect(JSON.stringify(faqSchema)).toContain('XMR QR code');
  });

  it('localizes canonicals and alternate links for prefixed routes', () => {
    const meta = routeMeta('/fr/generate');

    expect(meta.title).toContain('Générer');
    expect(meta.canonical).toBe('https://cryptoqrtool.com/fr/generate');
    expect(meta.alternates).toContainEqual(expect.objectContaining({ hreflang: 'fr', href: 'https://cryptoqrtool.com/fr/generate' }));
    expect(meta.alternates).toContainEqual(expect.objectContaining({ hreflang: 'x-default', href: 'https://cryptoqrtool.com/generate' }));
  });

  it('localizes Russian and Ukrainian route metadata and generated landing copy', () => {
    const ruFaq = routeMeta('/ru/faq');
    const ukFaq = routeMeta('/uk/faq');
    const ruBitcoin = getLocalizedCoinLandingPage('bitcoin-qr-code-generator', 'ru');
    const ukBitcoin = getLocalizedCoinLandingPage('bitcoin-qr-code-generator', 'uk');

    expect(ruFaq.title).toContain('FAQ по крипто QR-кодам');
    expect(ukFaq.title).toContain('FAQ про крипто QR-коди');
    expect(ruFaq.description).not.toContain('Answers about');
    expect(ukFaq.description).not.toContain('Answers about');
    expect(ruBitcoin?.headline).toContain('Генератор');
    expect(ukBitcoin?.headline).toContain('Генератор');
    expect(ruBitcoin?.body).toContain('Создание крипто QR-кодов');
    expect(ukBitcoin?.body).toContain('Створення крипто QR-кодів');
  });

  it('localizes JSON-LD FAQ and breadcrumbs for Russian and Ukrainian pages', () => {
    const ruFaqSchema = jsonLdOfType('/ru/faq', 'FAQPage');
    const ukBreadcrumbs = jsonLdOfType('/uk/bitcoin-qr-code-generator', 'BreadcrumbList');

    expect(JSON.stringify(ruFaqSchema)).toContain('Безопасен ли CryptoQR Tool');
    expect(JSON.stringify(ruFaqSchema)).not.toContain('Is CryptoQR Tool safe');
    expect(JSON.stringify(ukBreadcrumbs)).toContain('Головна');
    expect(JSON.stringify(ukBreadcrumbs)).toContain('Генератор');
    expect(JSON.stringify(ukBreadcrumbs)).not.toContain('"Home"');
  });

  it('translates French FAQ, footer, landing, privacy, and security content', () => {
    const faqIntro =
      'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.';
    const privacyIntro =
      'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.';
    const securityIntro =
      'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.';
    const landing = getLocalizedCoinLandingPage('bitcoin-qr-code-generator', 'fr');
    const footer = messagesForLocale('fr').shell.footerBody;

    expect(tr('fr', faqIntro)).not.toBe(faqIntro);
    expect(tr('fr', privacyIntro)).not.toBe(privacyIntro);
    expect(tr('fr', securityIntro)).not.toBe(securityIntro);
    expect(landing?.headline).toContain('Générateur');
    expect(landing?.body).toContain('Générez');
    expect(footer).toContain('navigateur');
    expect(footer).not.toContain('Saved addresses');
  });

  it('has non-English page content for every production locale on FAQ, footer, landing, privacy, and security', () => {
    const faqIntro =
      'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.';
    const privacyIntro =
      'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.';
    const securityIntro =
      'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.';
    const locales = supportedLocales.filter((locale) => locale !== 'en' && locale !== 'en-GB') as Locale[];

    for (const locale of locales) {
      const footer = messagesForLocale(locale).shell.footerBody;
      const landing = getLocalizedCoinLandingPage('bitcoin-qr-code-generator', locale);

      expect(tr(locale, faqIntro), locale).not.toBe(faqIntro);
      expect(tr(locale, privacyIntro), locale).not.toBe(privacyIntro);
      expect(tr(locale, securityIntro), locale).not.toBe(securityIntro);
      expect(footer, locale).not.toContain('Saved addresses');
      expect(footer, locale).not.toContain('generates QR payloads in the browser');
      expect(landing?.headline, locale).not.toBe('Bitcoin QR Code Generator');
      expect(landing?.body, locale).not.toContain('Generate a scan-ready');
    }
  });

  it('has translations for every rendered phrase key in every production locale', () => {
    const keys = renderedPhraseKeys();
    const locales = supportedLocales.filter((locale) => locale !== 'en' && locale !== 'en-GB') as Locale[];

    expect(keys.size).toBeGreaterThan(300);
    for (const locale of locales) {
      const missing = [...keys].filter((key) => !(key in (phraseTranslations[locale] ?? {})));
      expect(missing, `${locale}: ${missing.join(', ')}`).toEqual([]);
    }
  });

  it('localizes static route metadata for every production locale', () => {
    const locales = supportedLocales.filter((locale) => locale !== 'en' && locale !== 'en-GB') as Locale[];

    for (const locale of locales) {
      for (const path of Object.keys(staticRoutes)) {
        const localizedPath = path === '/' ? `/${locale}` : `/${locale}${path}`;
        const english = routeMeta(path);
        const localized = routeMeta(localizedPath);
        const jsonLd = JSON.stringify(localized.jsonLd ?? []);

        expect(localized.title, `${locale} ${path} title`).not.toBe(english.title);
        expect(localized.description, `${locale} ${path} description`).not.toBe(english.description);
        expect(jsonLd, `${locale} ${path} jsonLd`).not.toContain(english.description);
      }
    }
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
    expect(getSitemapEntries().some((entry) => entry.path === '/fr/privacy')).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === '/ar/faq')).toBe(true);
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
