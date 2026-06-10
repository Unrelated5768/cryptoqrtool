const siteUrl = 'https://cryptogen.local';

export function routeMeta(pathname: string) {
  const routes: Record<string, { title: string; description: string }> = {
    '/': {
      title: 'CryptoGen | Local Crypto QR Code Generator',
      description:
        'Generate scannable crypto QR codes locally for Monero, Bitcoin, Ethereum, Solana, Litecoin, USDC, and USDT with browser-only saved addresses and style presets.'
    },
    '/generate': {
      title: 'Generate Crypto QR Codes | CryptoGen',
      description:
        'Create guided crypto payment QR codes or hand-designed custom payload QR codes with scan-safe styling and local-only presets.'
    },
    '/saved': {
      title: 'Saved Addresses And QR Presets | CryptoGen',
      description: 'Manage browser-local crypto addresses and QR style presets. Nothing is synced or stored server-side.'
    },
    '/markets': {
      title: 'Crypto Market Prices | CryptoGen',
      description: 'Track CoinGecko top 50 crypto assets with logos, live fiat prices, and a local converter for QR amount planning.'
    },
    '/fees': {
      title: 'Network Fee Comparison | CryptoGen',
      description: 'Compare live and configured fee estimates for Bitcoin, Ethereum, Solana, and Monero availability.'
    },
    '/exchanges': {
      title: 'Crypto Exchange Directory | CryptoGen',
      description: 'Review live exchange directory data and liquidity signals from CoinGecko.'
    },
    '/security': {
      title: 'CryptoGen Privacy And Security',
      description: 'Learn how CryptoGen keeps QR generation, saved addresses, style presets, and custom logos browser-local.'
    }
  };

  const meta = routes[pathname] ?? routes['/'];
  return { ...meta, canonical: `${siteUrl}${pathname}` };
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CryptoGen',
  url: siteUrl,
  description: 'Browser-local crypto QR generation tools for Monero, Bitcoin, Ethereum, Solana, Litecoin, USDC, and USDT.'
};

export const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CryptoGen QR Generator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any modern browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  }
};
