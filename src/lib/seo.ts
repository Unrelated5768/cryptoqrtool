import { networks, type NetworkId } from './networks';

export const siteUrl = 'https://cryptoqrtool.com';
export const productName = 'CryptoQR Tool';
export const seoProductName = 'Crypto QR Code Generator';

export type LandingPage = {
  slug: string;
  canonicalSlug?: string;
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
  generatorHref: string;
  payloadExample: string;
  chips: string[];
  benefits: Array<{
    title: string;
    body: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

const genericAccent = '#38bdf8';

function networkDisplayName(network: (typeof networks)[number]) {
  return network.id === 'usdc' ? 'USDC' : network.id === 'usdt' ? 'USDT' : network.name.replace(' / EVM', '');
}

function networkLandingPage(network: (typeof networks)[number]): LandingPage {
  const name = networkDisplayName(network);
  const isLightning = network.id === 'lightning';
  return {
    slug: `${network.id}-qr-code-generator`,
    networkId: network.id,
    name,
    ticker: network.ticker,
    accent: network.accent,
    title: `${name} QR Code Generator | ${productName}`,
    description: isLightning
      ? `Generate Bitcoin Lightning BOLT11 invoice QR codes in your browser with local-only invoice handling, scan-safe styling, and no account required.`
      : `Generate ${name} (${network.ticker}) wallet address and payment QR codes in your browser with local-only address handling, scan-safe styling, and no account required.`,
    headline: `${name} QR Code Generator`,
    eyebrow: isLightning ? 'BTC Lightning invoice QR tool' : `${network.ticker} wallet QR tool`,
    body: isLightning
      ? `Create scannable Bitcoin Lightning QR codes from BOLT11 invoices. ${productName} keeps invoice rendering, QR styling, and saved presets in your browser.`
      : `Create a scannable ${name} QR code for wallet addresses and payment requests. ${productName} keeps QR generation, style presets, and saved addresses in your browser.`,
    ctaLabel: `Generate ${network.ticker} QR code`,
    generatorHref: coinGenerateHref(network.id),
    payloadExample:
      network.id === 'monero'
        ? 'monero:84Pq...tx_amount=1.25'
        : network.id === 'bitcoin'
          ? 'bitcoin:bc1q...?amount=0.015'
          : network.id === 'lightning'
            ? 'lnbc2500u1p...'
            : network.id === 'ethereum'
              ? 'ethereum:0x742d...?value=0.25'
              : network.id === 'solana'
                ? 'solana:7XSY...?amount=2.5'
                : network.id === 'litecoin'
                  ? 'litecoin:ltc1...?amount=1.5'
                  : network.id === 'usdc'
                    ? 'ethereum:USDC/transfer?address=0x742d...'
                    : 'ethereum:USDT/transfer?address=0x742d...',
    chips: isLightning ? ['Lightning', 'BOLT11', 'Invoice'] : ['Address', 'Amount', 'Logo'],
    benefits: [
      {
        title: isLightning ? 'BOLT11 invoice QR codes' : 'Address and amount QR codes',
        body: isLightning
          ? 'Paste a Bitcoin Lightning invoice and generate a QR payload that compatible wallets can scan directly.'
          : `Generate ${network.ticker} address QR codes and supported payment request payloads from the same focused tool.`
      },
      {
        title: 'Scan-safe styling',
        body: 'Tune colors, dot styles, quiet zones, and crypto logos while keeping the QR preview readable.'
      },
      {
        title: 'Local by design',
        body: isLightning
          ? 'Invoice payloads, custom logos, and QR style presets stay in browser-local storage.'
          : 'QR payloads, saved addresses, custom logos, and presets stay in browser-local storage.'
      }
    ],
    faq: [
      {
        question: `Can I generate a ${network.ticker} QR code without an account?`,
        answer: `Yes. ${productName} generates ${network.ticker} QR codes in the browser without requiring an account or wallet connection.`
      },
      {
        question: isLightning
          ? `Does ${productName} store Bitcoin Lightning invoices?`
          : `Does ${productName} store ${name} wallet addresses?`,
        answer: isLightning
          ? 'Lightning invoices and QR style presets stay in browser local storage and are not synced server-side.'
          : 'Saved addresses and QR style presets stay in browser local storage and are not synced server-side.'
      }
    ]
  };
}

export const coinLandingPages = networks.map((network) => {
  return networkLandingPage(network);
});

export const searchLandingPages: LandingPage[] = [
  {
    slug: 'crypto-qrcode-monero',
    canonicalSlug: 'crypto-qrcode-monero',
    networkId: 'monero',
    name: 'Monero',
    ticker: 'XMR',
    accent: '#ff6600',
    title: `Crypto QRCode Monero | ${productName}`,
    description:
      'Generate Monero crypto QR codes for XMR wallet addresses and tx_amount payment requests with browser-local processing and scan-safe styling.',
    headline: 'Crypto QRCode Monero',
    eyebrow: 'XMR private payment QR codes',
    body:
      'Build Monero QR codes for standard addresses, subaddresses, integrated addresses, and optional XMR amounts. Address validation, styling, and saved presets run locally in your browser.',
    ctaLabel: 'Generate Monero QR code',
    generatorHref: coinGenerateHref('monero'),
    payloadExample: 'monero:84Pq...tx_amount=1.25',
    chips: ['XMR', 'Subaddress', 'tx_amount'],
    benefits: [
      {
        title: 'Monero address validation',
        body: 'Check common XMR standard, subaddress, and integrated address formats before creating the QR payload.'
      },
      {
        title: 'Payment amount support',
        body: 'Add an optional XMR amount and generate a Monero URI that compatible wallets can parse.'
      },
      {
        title: 'Local privacy posture',
        body: 'Wallet addresses, custom logos, and presets remain in the browser instead of being sent to a hosted vault.'
      }
    ],
    faq: [
      {
        question: 'Can I make a Monero QR code for a subaddress?',
        answer: 'Yes. The generator accepts common Monero subaddress formats and can encode them as QR codes.'
      },
      {
        question: 'Can I include a Monero payment amount?',
        answer: 'Yes. Add an XMR amount and the tool builds a Monero URI with a tx_amount parameter.'
      }
    ]
  },
  {
    slug: 'crypto-qrcode-bitcoin',
    canonicalSlug: 'crypto-qrcode-bitcoin',
    networkId: 'bitcoin',
    name: 'Bitcoin',
    ticker: 'BTC',
    accent: '#f7931a',
    title: `Crypto QRCode Bitcoin | ${productName}`,
    description:
      'Generate Bitcoin crypto QR codes for BTC wallet addresses and amount payment requests with local address handling and QR styling.',
    headline: 'Crypto QRCode Bitcoin',
    eyebrow: 'BTC wallet payment QR codes',
    body:
      'Create Bitcoin QR codes for legacy and SegWit-style wallet addresses, with optional BTC amounts for payment requests. Tune the QR appearance while keeping the encoded data local.',
    ctaLabel: 'Generate Bitcoin QR code',
    generatorHref: coinGenerateHref('bitcoin'),
    payloadExample: 'bitcoin:bc1q...?amount=0.015',
    chips: ['BTC', 'SegWit', 'Amount'],
    benefits: [
      {
        title: 'Bitcoin address formats',
        body: 'Validate common BTC legacy and bech32 address formats before you export or scan a QR code.'
      },
      {
        title: 'Payment URI output',
        body: 'Add a BTC amount and generate a bitcoin: payment payload for wallet scanners.'
      },
      {
        title: 'Readable QR styling',
        body: 'Customize colors, dots, corners, quiet zones, and logos while preserving scan contrast.'
      }
    ],
    faq: [
      {
        question: 'Can I generate a Bitcoin QR code with an amount?',
        answer: 'Yes. Enter a BTC amount and the generator creates a bitcoin: URI with an amount parameter.'
      },
      {
        question: 'Are Bitcoin addresses uploaded to the server?',
        answer: 'No. QR generation and saved address presets are handled in browser-local state.'
      }
    ]
  },
  {
    slug: 'crypto-qrcode-bitcoin-lightning',
    canonicalSlug: 'crypto-qrcode-bitcoin-lightning',
    networkId: 'lightning',
    name: 'Bitcoin Lightning',
    ticker: 'BTC-LN',
    accent: '#facc15',
    title: `Bitcoin Lightning QR Code Generator | ${productName}`,
    description:
      'Generate Bitcoin Lightning QR codes from BOLT11 invoices with local invoice handling, scan-safe styling, and no wallet connection required.',
    headline: 'Bitcoin Lightning QR Code Generator',
    eyebrow: 'BTC Lightning invoice QR codes',
    body:
      'Turn a Bitcoin Lightning BOLT11 invoice into a scan-ready QR code. Paste the invoice from your wallet, preview the QR locally, tune the style, and export a code that Lightning wallets can scan.',
    ctaLabel: 'Generate Lightning QR code',
    generatorHref: coinGenerateHref('lightning'),
    payloadExample: 'lnbc2500u1p...',
    chips: ['Lightning', 'BOLT11', 'Invoice', 'BTC'],
    benefits: [
      {
        title: 'Invoice-first workflow',
        body: 'Lightning payments use BOLT11 invoices, so the QR encodes the invoice directly instead of a reusable BTC address.'
      },
      {
        title: 'Wallet scanner friendly',
        body: 'Keep the QR high-contrast with quiet-zone defaults designed for fast scanning in mobile Lightning wallets.'
      },
      {
        title: 'Local invoice handling',
        body: 'The invoice, QR preview, custom logos, and saved presets stay in browser-local state.'
      }
    ],
    faq: [
      {
        question: 'Can I make a QR code for a Bitcoin Lightning invoice?',
        answer: 'Yes. Paste a BOLT11 invoice beginning with lnbc and the generator creates a QR code from that invoice.'
      },
      {
        question: 'Should I reuse a Lightning invoice QR code?',
        answer: 'No. Lightning invoices are payment requests. Generate a fresh invoice in your wallet for each payment.'
      }
    ]
  },
  {
    slug: 'crypto-qrcode-ethereum',
    canonicalSlug: 'crypto-qrcode-ethereum',
    networkId: 'ethereum',
    name: 'Ethereum',
    ticker: 'ETH',
    accent: '#627eea',
    title: `Crypto QRCode Ethereum | ${productName}`,
    description:
      'Generate Ethereum crypto QR codes for ETH and EVM wallet addresses with optional value payment requests and browser-local QR styling.',
    headline: 'Crypto QRCode Ethereum',
    eyebrow: 'ETH and EVM wallet QR codes',
    body:
      'Create Ethereum QR codes for 0x wallet addresses and optional ETH payment values. The generator validates common EVM address format and keeps QR payloads local in your browser.',
    ctaLabel: 'Generate Ethereum QR code',
    generatorHref: coinGenerateHref('ethereum'),
    payloadExample: 'ethereum:0x742d...?value=0.25',
    chips: ['ETH', 'EVM', '0x address', 'Value'],
    benefits: [
      {
        title: 'EVM address validation',
        body: 'Check 0x-prefixed Ethereum and EVM wallet addresses before generating a scan-ready QR code.'
      },
      {
        title: 'ETH payment payloads',
        body: 'Add an optional ETH value and encode it in an ethereum: payment URI for compatible wallets.'
      },
      {
        title: 'Reusable QR presets',
        body: 'Save preferred colors, logos, dot styles, and quiet-zone settings locally for repeat generation.'
      }
    ],
    faq: [
      {
        question: 'Can I generate an Ethereum QR code for a 0x address?',
        answer: 'Yes. Paste a 0x Ethereum or EVM address and the generator can create an address QR code.'
      },
      {
        question: 'Can Ethereum QR codes include an ETH amount?',
        answer: 'Yes. Enter an amount and the tool builds an ethereum: URI with a value parameter.'
      }
    ]
  },
  {
    slug: 'crypto-qrcode-solana',
    canonicalSlug: 'crypto-qrcode-solana',
    networkId: 'solana',
    name: 'Solana',
    ticker: 'SOL',
    accent: '#14f195',
    title: `Crypto QRCode Solana | ${productName}`,
    description:
      'Generate Solana crypto QR codes for SOL wallet addresses and amount payment requests with local generation and scan-safe styling.',
    headline: 'Crypto QRCode Solana',
    eyebrow: 'SOL wallet QR codes',
    body:
      'Create Solana QR codes for SOL wallet public keys, with optional payment amounts for wallet scanners. Address checks, preview, styling, and presets stay in the browser.',
    ctaLabel: 'Generate Solana QR code',
    generatorHref: coinGenerateHref('solana'),
    payloadExample: 'solana:7XSY...?amount=2.5',
    chips: ['SOL', 'Base58', 'Amount'],
    benefits: [
      {
        title: 'Solana public key checks',
        body: 'Validate common base58 Solana public key length before creating the QR code.'
      },
      {
        title: 'SOL amount support',
        body: 'Include an optional SOL amount in the generated Solana payment payload.'
      },
      {
        title: 'Local QR rendering',
        body: 'Generate, style, and save QR presets in browser-local state without a wallet connection.'
      }
    ],
    faq: [
      {
        question: 'Can I make a QR code for a Solana wallet address?',
        answer: 'Yes. Paste a Solana public key and the generator creates a QR code for that address.'
      },
      {
        question: 'Does the Solana QR generator require wallet login?',
        answer: 'No. It works from pasted addresses and does not require connecting a wallet.'
      }
    ]
  },
  {
    slug: 'crypto-qrcode-litecoin',
    canonicalSlug: 'crypto-qrcode-litecoin',
    networkId: 'litecoin',
    name: 'Litecoin',
    ticker: 'LTC',
    accent: '#345d9d',
    title: `Crypto QRCode Litecoin | ${productName}`,
    description:
      'Generate Litecoin crypto QR codes for LTC wallet addresses and amount payment requests with browser-local address handling.',
    headline: 'Crypto QRCode Litecoin',
    eyebrow: 'LTC wallet QR codes',
    body:
      'Build Litecoin QR codes for LTC wallet addresses, including legacy and bech32-style formats, with optional payment amounts and scan-safe QR customization.',
    ctaLabel: 'Generate Litecoin QR code',
    generatorHref: coinGenerateHref('litecoin'),
    payloadExample: 'litecoin:ltc1...?amount=1.5',
    chips: ['LTC', 'bech32', 'Amount'],
    benefits: [
      {
        title: 'Litecoin address formats',
        body: 'Validate common LTC legacy, P2SH, and bech32 address patterns before QR export.'
      },
      {
        title: 'Payment URI generation',
        body: 'Add an LTC amount and generate a litecoin: payment payload for compatible wallets.'
      },
      {
        title: 'Styled but scannable',
        body: 'Customize the look while keeping enough quiet zone and contrast for reliable scanning.'
      }
    ],
    faq: [
      {
        question: 'Can I generate a Litecoin QR code with an amount?',
        answer: 'Yes. Enter an LTC amount and the generator creates a litecoin: URI with an amount parameter.'
      },
      {
        question: 'Can I save a Litecoin QR preset?',
        answer: 'Yes. Address and style presets can be saved in browser local storage.'
      }
    ]
  },
  {
    slug: 'crypto-qrcode-usdc',
    canonicalSlug: 'crypto-qrcode-usdc',
    networkId: 'usdc',
    name: 'USDC',
    ticker: 'USDC',
    accent: '#2775ca',
    title: `Crypto QRCode USDC | ${productName}`,
    description:
      'Generate USDC crypto QR codes for ERC-20 recipient addresses and token transfer payloads with local QR generation.',
    headline: 'Crypto QRCode USDC',
    eyebrow: 'USDC ERC-20 QR codes',
    body:
      'Create USDC QR codes for EVM recipient addresses and optional token amounts. The generator builds ERC-20 transfer-style payloads and keeps address handling local.',
    ctaLabel: 'Generate USDC QR code',
    generatorHref: coinGenerateHref('usdc'),
    payloadExample: 'ethereum:USDC/transfer?address=0x742d...',
    chips: ['USDC', 'ERC-20', '0x address'],
    benefits: [
      {
        title: 'ERC-20 recipient checks',
        body: 'Validate the EVM recipient address before generating a USDC payment QR code.'
      },
      {
        title: 'Token amount payloads',
        body: 'Add a USDC amount and encode the transfer units using the token decimal setting.'
      },
      {
        title: 'No account required',
        body: 'Generate and style QR codes from pasted addresses without signing in or connecting a wallet.'
      }
    ],
    faq: [
      {
        question: 'Can I generate a USDC QR code for an Ethereum address?',
        answer: 'Yes. The USDC generator accepts EVM recipient addresses for ERC-20 transfer payloads.'
      },
      {
        question: 'Can a USDC QR code include a token amount?',
        answer: 'Yes. Enter a USDC amount and the generator encodes token units for the transfer payload.'
      }
    ]
  },
  {
    slug: 'crypto-qrcode-usdt',
    canonicalSlug: 'crypto-qrcode-usdt',
    networkId: 'usdt',
    name: 'USDT',
    ticker: 'USDT',
    accent: '#26a17b',
    title: `Crypto QRCode USDT | ${productName}`,
    description:
      'Generate USDT crypto QR codes for ERC-20 recipient addresses and token transfer payloads with browser-local processing.',
    headline: 'Crypto QRCode USDT',
    eyebrow: 'USDT ERC-20 QR codes',
    body:
      'Create USDT QR codes for EVM recipient addresses with optional token amounts. Address validation, QR styling, and saved presets stay local to the browser.',
    ctaLabel: 'Generate USDT QR code',
    generatorHref: coinGenerateHref('usdt'),
    payloadExample: 'ethereum:USDT/transfer?address=0x742d...',
    chips: ['USDT', 'ERC-20', '0x address'],
    benefits: [
      {
        title: 'EVM recipient validation',
        body: 'Check the 0x recipient address before generating an ERC-20 USDT QR payload.'
      },
      {
        title: 'USDT amount support',
        body: 'Add a USDT amount and the generator converts it into token units for the QR payload.'
      },
      {
        title: 'Browser-local workflow',
        body: 'No server-side address vault is used for QR generation, logos, or saved presets.'
      }
    ],
    faq: [
      {
        question: 'Can I generate a USDT QR code for ERC-20 transfers?',
        answer: 'Yes. The USDT generator creates ERC-20 transfer-style payloads for EVM recipient addresses.'
      },
      {
        question: 'Does USDT QR generation require an exchange account?',
        answer: 'No. It works in the browser from a pasted recipient address and optional token amount.'
      }
    ]
  },
  {
    slug: 'crypto-generate-qrcode',
    canonicalSlug: 'crypto-generate-qrcode',
    name: 'Crypto QR Code',
    accent: genericAccent,
    title: `Crypto Generate QRCode | ${productName}`,
    description:
      'Generate crypto QR codes online for Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT with a browser-local QR generator.',
    headline: 'Crypto Generate QRCode',
    eyebrow: 'Multi-coin QR generator',
    body:
      'Generate crypto QR codes for wallet addresses, payment amounts, and custom payloads. Choose a supported network, paste an address, preview the QR code, and export a scan-ready design.',
    ctaLabel: 'Open crypto QR generator',
    generatorHref: '/generate',
    payloadExample: 'bitcoin:bc1q...?amount=0.015',
    chips: ['XMR', 'BTC', 'Lightning', 'ETH', 'SOL', 'LTC', 'USDC', 'USDT'],
    benefits: [
      {
        title: 'One generator for major networks',
        body: 'Use guided presets for Monero, Bitcoin, Bitcoin Lightning invoices, Ethereum/EVM, Solana, Litecoin, USDC, and USDT.'
      },
      {
        title: 'Custom payload mode',
        body: 'Switch to custom mode when you need to encode a raw wallet payload, invoice, or internal reference.'
      },
      {
        title: 'Local saved presets',
        body: 'Save frequently used addresses and QR styles in this browser for repeat generation.'
      }
    ],
    faq: [
      {
        question: 'Which crypto QR codes can I generate?',
        answer: `${productName} supports Monero, Bitcoin, Bitcoin Lightning invoices, Ethereum/EVM, Solana, Litecoin, USDC, and USDT, plus custom text payloads.`
      },
      {
        question: 'Can I generate a QR code without connecting a wallet?',
        answer: 'Yes. The generator works from pasted addresses or custom payloads and does not require a wallet connection.'
      }
    ]
  }
];

export const landingPages: LandingPage[] = [...searchLandingPages, ...coinLandingPages];

export type CoinLandingPage = LandingPage;

export function getCoinLandingPage(slug: string) {
  return landingPages.find((page) => page.slug === slug);
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
  const canonicalPath = coinLandingPage?.canonicalSlug ? `/${coinLandingPage.canonicalSlug}` : pathname;
  return { ...meta, canonical: `${siteUrl}${canonicalPath}` };
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
  const path = `/${page.canonicalSlug ?? page.slug}`;
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
      mainEntity: page.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }
  ];
}

export function coinGenerateHref(networkId: NetworkId) {
  return `/generate?network=${networkId}`;
}
