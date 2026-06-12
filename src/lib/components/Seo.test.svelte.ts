import { render } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { routeMeta } from '$lib/seo';
import Seo from './Seo.svelte';

const mockPageState = {
  url: new URL('https://cryptoqrtool.com/'),
  data: {
    meta: routeMeta('/')
  }
};

vi.mock('$app/stores', () => ({
  page: {
    subscribe: (run: (value: typeof mockPageState) => void) => {
      run(mockPageState);
      return () => undefined;
    }
  }
}));

function renderFor(pathname: string) {
  mockPageState.url = new URL(`https://cryptoqrtool.com${pathname}`);
  mockPageState.data.meta = routeMeta(pathname);
  render(Seo);
}

function getJsonLdContents() {
  return Array.from(document.head.querySelectorAll('script[type="application/ld+json"]')).map((node) => node.textContent ?? '');
}

afterEach(() => {
  document.head.innerHTML = '';
});

describe('Seo', () => {
  it('renders parseable JSON-LD for representative routes', () => {
    for (const pathname of ['/', '/bitcoin-qr-code-generator', '/crypto-qrcode-bitcoin', '/security']) {
      renderFor(pathname);

      const jsonLdContents = getJsonLdContents();
      expect(jsonLdContents.length).toBeGreaterThan(0);

      for (const content of jsonLdContents) {
        expect(content).not.toContain('JSON.stringify');
        expect(content).not.toContain('undefined');
        expect(content).not.toContain('[object Object]');

        const parsed = JSON.parse(content);
        expect(Array.isArray(parsed) || (typeof parsed === 'object' && parsed !== null)).toBe(true);
      }

      document.head.innerHTML = '';
    }
  });

  it('emits noindex robots metadata for saved presets page', () => {
    renderFor('/saved');

    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex,follow');
  });

  it('emits default social preview metadata', () => {
    renderFor('/generate');

    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://cryptoqrtool.com/og-image.png'
    );
    expect(document.head.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe(
      'https://cryptoqrtool.com/og-image.png'
    );
  });
});
