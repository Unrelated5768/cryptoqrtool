import { networks, type NetworkId } from './networks';

export const siteUrl = 'https://cryptoqrtool.com';
export const productName = 'CryptoQR Tool';
export const seoProductName = 'Crypto QR Code Generator';

export const coinLandingPages = networks.map((network) => {
  const name = network.id === 'usdc' ? 'USDC' : network.id === 'usdt' ? 'USDT' : network.name.replace(' / EVM', '');
  return {
    slug: `${network.id}-qr-code-generator`,
    networkId: network.id,
    name,
    ticker: network.ticker,
    accent: network.accent,
    title: `${name} QR Code Generator | ${productName}`,
    description: `Generate ${name} (${network.ticker}) wallet address and payment QR codes in your browser with local-only address handling, scan-safe styling, and no account required.`,
    headline: `${name} QR Code Generator`,
    body: `Create a scannable ${name} QR code for wallet addresses and payment requests. ${productName} keeps QR generation, style presets, and saved addresses in your browser.`
  };
});

export type CoinLandingPage = (typeof coinLandingPages)[number];

export function getCoinLandingPage(slug: string) {
  return coinLandingPages.find((page) => page.slug === slug);
}

export function routeMeta(pathname: string) {
  const routes: Record<string, { title: string; description: string }> = {
    '/': {
      title: `${seoProductName} | ${productName}`,
      description:
        'Generate scannable crypto QR codes locally for Monero, Bitcoin, Ethereum, Solana, Litecoin, USDC, and USDT with browser-only saved addresses and style presets.'
    },
    '/generate': {
      title: `Generate Crypto QR Codes | ${productName}`,
      description:
        'Create guided crypto payment QR codes or hand-designed custom payload QR codes with scan-safe styling and local-only presets.'
    },
    '/saved': {
      title: `Saved Addresses And QR Presets | ${productName}`,
      description: 'Manage browser-local crypto addresses and QR style presets. Nothing is synced or stored server-side.'
    },
    '/markets': {
      title: `Crypto Market Prices | ${productName}`,
      description: 'Track CoinGecko top 50 crypto assets with logos, live fiat prices, and a local converter for QR amount planning.'
    },
    '/fees': {
      title: `Network Fee Comparison | ${productName}`,
      description: 'Compare live and configured fee estimates for Bitcoin, Ethereum, Solana, and Monero availability.'
    },
    '/exchanges': {
      title: `Crypto Exchange Directory | ${productName}`,
      description: 'Review live exchange directory data and liquidity signals from CoinGecko.'
    },
    '/security': {
      title: `${productName} Privacy And Security`,
      description: `Learn how ${productName} keeps QR generation, saved addresses, style presets, and custom logos browser-local.`
    }
  };

  const coinLandingPage = getCoinLandingPage(pathname.replace(/^\//, ''));
  const meta = coinLandingPage ?? routes[pathname] ?? routes['/'];
  return { ...meta, canonical: `${siteUrl}${pathname}` };
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: productName,
  url: siteUrl,
  description: 'Browser-local crypto QR generation tools for Monero, Bitcoin, Ethereum, Solana, Litecoin, USDC, and USDT.'
};

export const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: seoProductName,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any modern browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  }
};

export function coinLandingJsonLd(page: CoinLandingPage) {
  const path = `/${page.slug}`;
  return [
    organizationJsonLd,
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: page.headline,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any modern browser',
      url: `${siteUrl}${path}`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Can I generate a ${page.ticker} QR code without an account?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes. ${productName} generates ${page.ticker} QR codes in the browser without requiring an account or wallet connection.`
          }
        },
        {
          '@type': 'Question',
          name: `Does ${productName} store ${page.name} wallet addresses?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Saved addresses and QR style presets stay in browser local storage and are not synced server-side.'
          }
        }
      ]
    }
  ];
}

export function coinGenerateHref(networkId: NetworkId) {
  return `/generate?network=${networkId}`;
}
