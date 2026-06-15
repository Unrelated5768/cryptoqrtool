import { describe, expect, it } from 'vitest';
import { localeDir } from './locales';
import { alternateLinks, localizedHref, localizedPath, parseLocalePath, stripLocaleFromPath } from './routing';

describe('i18n routing', () => {
  it('parses default and prefixed locale paths', () => {
    expect(parseLocalePath('/generate')).toEqual({
      locale: 'en',
      routePath: '/generate',
      hasLocalePrefix: false
    });
    expect(parseLocalePath('/fr/generate')).toEqual({
      locale: 'fr',
      routePath: '/generate',
      hasLocalePrefix: true
    });
    expect(parseLocalePath('/zh-CN/bitcoin-qr-code-generator')).toMatchObject({
      locale: 'zh-CN',
      routePath: '/bitcoin-qr-code-generator'
    });
  });

  it('builds locale-aware paths while keeping English canonical URLs unchanged', () => {
    expect(localizedPath('/generate', 'en')).toBe('/generate');
    expect(localizedPath('/generate', 'fr')).toBe('/fr/generate');
    expect(localizedHref('/verify?network=bitcoin#payload', 'ar')).toBe('/ar/verify?network=bitcoin#payload');
    expect(localizedHref('/fr/generate', 'ja')).toBe('/ja/generate');
    expect(stripLocaleFromPath('/ar/faq')).toBe('/faq');
  });

  it('marks Arabic as RTL and other supported locales as LTR', () => {
    expect(localeDir('ar')).toBe('rtl');
    expect(localeDir('fr')).toBe('ltr');
    expect(localeDir('ja')).toBe('ltr');
  });

  it('emits alternate links including x-default', () => {
    const links = alternateLinks('/fr/generate');
    expect(links).toContainEqual({ locale: 'fr', hreflang: 'fr', href: 'https://cryptoqrtool.com/fr/generate' });
    expect(links).toContainEqual({ locale: 'en', hreflang: 'x-default', href: 'https://cryptoqrtool.com/generate' });
  });
});
