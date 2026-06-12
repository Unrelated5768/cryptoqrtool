import { networks, type NetworkId } from './networks';

export const siteUrl = 'https://cryptoqrtool.com';
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

type BreadcrumbItem = {
  name: string;
  path: string;
};

type StaticRouteKind = 'home' | 'webapp' | 'page' | 'tech-article';

type StaticRouteConfig = {
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

export const homeFaqItems: FaqItem[] = [
  {
    question: `Does ${productName} store crypto addresses?`,
    answer: 'Saved addresses and QR style presets stay in browser local storage on your device and are not synced server-side.'
  },
  {
    question: 'Which networks are supported?',
    answer: `${productName} supports Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT, plus custom payload QR codes.`
  }
];

export const securityFaqItems: FaqItem[] = [
  {
    question: 'Where are saved addresses stored?',
    answer: `Saved addresses are stored in browser local storage under a versioned ${productName} key for this browser profile only.`
  },
  {
    question: 'Are custom logos uploaded?',
    answer: 'No. Custom logos are read and previewed in the browser and are only kept locally if you save them into a preset.'
  }
];

const staticRoutes: Record<string, StaticRouteConfig> = {
  '/': {
    title: `${seoProductName} | ${productName}`,
    description:
      'Generate scannable crypto QR codes locally for Monero, Bitcoin, Ethereum, Solana, Litecoin, USDC, and USDT with browser-only saved addresses and style presets.',
    schemaName: seoProductName,
    kind: 'home',
    faq: homeFaqItems,
    lastModified: contentLastUpdated
  },
  '/generate': {
    title: `Generate Crypto QR Codes | ${productName}`,
    description:
      'Create guided crypto payment QR codes or hand-designed custom payload QR codes with scan-safe styling and local-only presets.',
    schemaName: 'Crypto QR Code Generator',
    kind: 'webapp',
    breadcrumbLabel: 'Generate Crypto QR Codes',
    lastModified: contentLastUpdated
  },
  '/saved': {
    title: `Saved Addresses and QR Presets | ${productName}`,
    description: 'Manage browser-local crypto addresses and QR style presets for this device only.',
    schemaName: 'Saved Addresses and QR Presets',
    kind: 'page',
    breadcrumbLabel: 'Saved Addresses and QR Presets',
    robots: 'noindex,follow',
    indexable: false,
    lastModified: contentLastUpdated
  },
  '/markets': {
    title: `Crypto Market Prices and QR Planning | ${productName}`,
    description: 'Track CoinGecko top 50 crypto assets with logos, live fiat prices, and a converter for QR amount planning.',
    schemaName: 'Crypto Market Prices',
    kind: 'page',
    breadcrumbLabel: 'Market Prices',
    lastModified: contentLastUpdated
  },
  '/fees': {
    title: `Crypto Network Fee Comparison | ${productName}`,
    description: 'Compare live and configured fee estimates for Bitcoin, Ethereum, Solana, and Monero activity.',
    schemaName: 'Crypto Network Fee Comparison',
    kind: 'page',
    breadcrumbLabel: 'Network Fees',
    lastModified: contentLastUpdated
  },
  '/verify': {
    title: `Crypto Address and Transaction Checker | ${productName}`,
    description:
      'Verify crypto addresses, transaction hashes, Lightning invoices, and payment URI QR payloads with local validation, trusted explorer links, and best-effort live lookup.',
    schemaName: 'Crypto Address and Transaction Checker',
    kind: 'webapp',
    breadcrumbLabel: 'Verify Crypto QR Payloads',
    lastModified: contentLastUpdated
  },
  '/exchanges': {
    title: `Crypto Exchange Directory | ${productName}`,
    description: 'Review exchange directory data, trust indicators, and liquidity signals from CoinGecko.',
    schemaName: 'Crypto Exchange Directory',
    kind: 'page',
    breadcrumbLabel: 'Exchange Directory',
    lastModified: contentLastUpdated
  },
  '/security': {
    title: `${productName} Privacy and Security`,
    description: `Learn how ${productName} keeps QR generation, saved addresses, style presets, and custom logos browser-local.`,
    schemaName: `${productName} Privacy and Security`,
    kind: 'page',
    breadcrumbLabel: 'Privacy and Security',
    faq: securityFaqItems,
    lastModified: contentLastUpdated
  },
  '/api-docs': {
    title: `QR Code Generation API Docs | ${productName}`,
    description:
      'Generate crypto QR code SVGs through a server-side API with guided network validation, custom payload support, styling, and local catalog logos.',
    schemaName: 'QR Code Generation API Docs',
    kind: 'tech-article',
    breadcrumbLabel: 'API Docs',
    lastModified: contentLastUpdated
  }
};

function absoluteUrl(path: string) {
  return path === '/' ? siteUrl : `${siteUrl}${path}`;
}

function networkDisplayName(network: (typeof networks)[number]) {
  return network.id === 'usdc' || network.id === 'usdt' ? network.id.toUpperCase() : network.name.replace(' / EVM', '');
}

function guideSlug(networkId: NetworkId) {
  return networkId === 'lightning' ? 'crypto-qrcode-bitcoin-lightning' : `crypto-qrcode-${networkId}`;
}

function generatorSlug(networkId: NetworkId) {
  return `${networkId}-qr-code-generator`;
}

function guideHref(networkId: NetworkId) {
  return `/${guideSlug(networkId)}`;
}

function generatorHref(networkId: NetworkId) {
  return `/${generatorSlug(networkId)}`;
}

function coinGenerateHref(networkId: NetworkId) {
  return `/generate?network=${networkId}`;
}

function payloadExample(networkId: NetworkId) {
  switch (networkId) {
    case 'monero':
      return 'monero:84Pq...tx_amount=1.25';
    case 'bitcoin':
      return 'bitcoin:bc1q...?amount=0.015';
    case 'lightning':
      return 'lnbc2500u1p...';
    case 'ethereum':
      return 'ethereum:0x742d...?value=250000000000000000';
    case 'solana':
      return 'solana:7XSY...?amount=2.5';
    case 'litecoin':
      return 'litecoin:ltc1...?amount=1.5';
    case 'usdc':
      return 'ethereum:USDC/transfer?address=0x742d...';
    case 'usdt':
      return 'ethereum:USDT/transfer?address=0x742d...';
  }
}

function uriScheme(networkId: NetworkId) {
  switch (networkId) {
    case 'monero':
      return 'monero';
    case 'bitcoin':
      return 'bitcoin';
    case 'lightning':
      return 'lightning';
    case 'ethereum':
      return 'ethereum';
    case 'solana':
      return 'solana';
    case 'litecoin':
      return 'litecoin';
    case 'usdc':
      return 'ethereum';
    case 'usdt':
      return 'ethereum';
  }
}

function generatorBody(networkId: NetworkId, name: string) {
  switch (networkId) {
    case 'lightning':
      return `Generate scan-ready Bitcoin Lightning invoice QR codes from BOLT11 payment requests without connecting a wallet. ${productName} keeps invoice handling, QR styling, and saved presets in your browser.`;
    case 'usdc':
    case 'usdt':
      return `Generate ${name} payment QR codes for EVM recipient addresses and token amounts with browser-local processing, scan-safe styling, and no account required.`;
    default:
      return `Generate a scannable ${name} QR code for wallet addresses and payment requests with browser-local processing, scan-safe styling, and no account required.`;
  }
}

function guideBody(networkId: NetworkId, name: string, ticker: string) {
  switch (networkId) {
    case 'lightning':
      return `Learn what a Bitcoin Lightning QR code contains, how BOLT11 invoices are encoded, when wallets expect one-time invoice payloads, and how to avoid reusing expired or already-paid invoices.`;
    case 'monero':
      return `Learn what a Monero QR code contains, how XMR payment URIs work for standard addresses, subaddresses, and integrated addresses, and what to verify before sharing a request.`;
    case 'usdc':
    case 'usdt':
      return `Learn how ${ticker} QR codes represent ERC-20 transfer requests, what wallet compatibility depends on, and when to prefer a dedicated generator for payment amounts.`;
    default:
      return `Learn what a ${name} crypto QR code contains, how ${ticker} payment URIs work, and what to verify before you share or scan one.`;
  }
}

function generatorBenefits(networkId: NetworkId, ticker: string, name: string): LandingPageSection[] {
  const invoice = networkId === 'lightning';
  return [
    {
      title: invoice ? 'BOLT11 invoice support' : 'Address and amount support',
      body: invoice
        ? 'Paste a Lightning invoice and generate a QR payload that compatible wallets can scan directly.'
        : `Generate ${ticker} address QR codes and supported payment request payloads from the same focused tool.`
    },
    {
      title: 'Scan-safe styling',
      body: 'Tune colors, quiet zones, logo size, and contrast while keeping the QR preview readable on mobile wallets.'
    },
    {
      title: 'Local-only workflow',
      body: invoice
        ? 'Invoices, logos, and saved presets stay in browser-local state instead of being synced to a hosted service.'
        : `${name} addresses, QR payloads, custom logos, and saved presets stay in browser-local state.`
    }
  ];
}

function generatorPrimarySections(networkId: NetworkId, name: string, ticker: string): LandingPageSection[] {
  switch (networkId) {
    case 'lightning':
      return [
        {
          title: 'How to generate a Lightning QR code',
          body: 'Paste a fresh BOLT11 invoice, review the preview for scan contrast, and export the QR code for the payer who needs to scan it.'
        },
        {
          title: 'Lightning invoice format',
          body: 'Lightning QR codes encode the invoice itself. The payload is usually a lowercase `lnbc...` string rather than a reusable wallet address.'
        },
        {
          title: 'Why this page is tool-first',
          body: 'Use this generator when you already have an invoice and need a scannable QR. Use the guide page when you need the invoice rules explained first.'
        }
      ];
    case 'ethereum':
      return [
        {
          title: 'How to generate an Ethereum QR code',
          body: 'Select Ethereum, paste the 0x address, optionally add an ETH amount, and export the QR once the preview and address look correct.'
        },
        {
          title: 'Ethereum payment URI format',
          body: 'Ethereum payment QR codes can encode a bare 0x address or an EIP-681 `ethereum:` request that includes value and chain information.'
        },
        {
          title: 'What this page helps you do',
          body: 'This page is designed for creating a QR code quickly, not for teaching the whole URI standard. The companion guide page covers the protocol details.'
        }
      ];
    case 'usdc':
    case 'usdt':
      return [
        {
          title: `How to generate a ${ticker} QR code`,
          body: `Select ${ticker}, paste the EVM recipient address, optionally add a token amount, and export the QR once the transfer request looks correct.`
        },
        {
          title: `${ticker} transfer payload format`,
          body: `${ticker} QR codes usually encode ERC-20 transfer-style requests tied to an EVM recipient address and token decimal rules.`
        },
        {
          title: 'When to use this tool page',
          body: `Use the generator when you need a payment QR immediately. Use the guide page to understand wallet support, token chains, and transfer payload expectations.`
        }
      ];
    default:
      return [
        {
          title: `How to generate a ${name} QR code`,
          body: `Select ${name}, paste the recipient address, optionally add an amount, and export the QR code after checking the preview and encoded payload.`
        },
        {
          title: `${name} payment URI format`,
          body: `${name} QR codes can encode a plain address or a payment URI such as \`${uriScheme(networkId)}:address?amount=...\` when the network supports requested amounts.`
        },
        {
          title: 'Why this page stays transactional',
          body: 'This page is built to get you from a valid public address to a scannable QR code quickly. The companion guide page handles explanation and compatibility.'
        }
      ];
  }
}

function generatorHowToSteps(networkId: NetworkId, name: string) {
  if (networkId === 'lightning') {
    return [
      'Generate a fresh Lightning invoice in your wallet.',
      'Paste the full BOLT11 invoice into the generator.',
      'Review contrast, quiet zone, and logo usage before exporting the QR.',
      'Verify the invoice amount and destination in the receiving wallet before sharing it.'
    ];
  }

  return [
    `Choose ${name} or open this page from the generator with the network preselected.`,
    'Paste the public recipient address or payment destination.',
    'Optionally add an amount if the network supports payment request payloads.',
    'Review the preview and verify the destination before downloading or sharing the QR.'
  ];
}

function generatorTrustPoints(networkId: NetworkId) {
  return [
    `${productName} does not connect to your wallet or ask for seed phrases, private keys, or exchange credentials.`,
    networkId === 'lightning'
      ? 'The generator works from pasted public invoice text only and keeps invoice handling inside the browser.'
      : 'Address handling, QR rendering, custom logos, and presets stay local to the browser unless you explicitly export them.',
    'Always verify the address or invoice in your wallet before sending funds.'
  ];
}

function generatorCautionItems(networkId: NetworkId, name: string, ticker: string) {
  const amountLabel = networkId === 'lightning' ? 'invoice amount' : `${ticker} amount`;
  return [
    `Do not paste seed phrases or private keys. This page is only for public ${networkId === 'lightning' ? 'invoice text' : 'addresses and payment request data'}.`,
    `Double-check the destination and ${amountLabel} before distributing the QR code.`,
    networkId === 'lightning'
      ? 'Lightning invoices are one-time payment requests. Replace expired or already-paid invoices before reusing the QR.'
      : `If a wallet scans only the address and ignores parameters, confirm the recipient and amount manually inside the wallet before sending ${name}.`
  ];
}

function generatorFaq(networkId: NetworkId, name: string, ticker: string): FaqItem[] {
  switch (networkId) {
    case 'lightning':
      return [
        {
          question: 'Can I make a QR code for a Bitcoin Lightning invoice?',
          answer: 'Yes. Paste a BOLT11 invoice beginning with `lnbc` and the generator will create a QR code from the invoice text.'
        },
        {
          question: 'Should I reuse a Lightning invoice QR code?',
          answer: 'No. Lightning invoices are one-time payment requests. Generate a fresh invoice for each new payment.'
        }
      ];
    case 'monero':
      return [
        {
          question: 'Can I generate a Monero QR code for a subaddress?',
          answer: 'Yes. The generator accepts common Monero subaddress formats and can encode them as scan-ready QR codes.'
        },
        {
          question: 'Can I include a Monero payment amount?',
          answer: 'Yes. Add an XMR amount and the tool builds a Monero URI with a `tx_amount` parameter.'
        }
      ];
    default:
      return [
        {
          question: `Can I generate a ${name} QR code without an account?`,
          answer: `Yes. ${productName} generates ${ticker} QR codes in the browser without requiring an account or wallet connection.`
        },
        {
          question: `Does ${productName} store ${name} wallet addresses?`,
          answer: `No. Saved ${name} addresses and QR style presets stay in browser local storage and are not synced server-side.`
        }
      ];
  }
}

function guideBenefits(networkId: NetworkId, name: string, ticker: string): LandingPageSection[] {
  return [
    {
      title: 'What the QR code encodes',
      body:
        networkId === 'lightning'
          ? 'Bitcoin Lightning QR codes encode invoice text, not a reusable address, so the invoice lifecycle matters.'
          : `${name} QR codes usually encode a public address or payment URI that compatible wallets can interpret when scanned.`
    },
    {
      title: 'Wallet compatibility context',
      body:
        networkId === 'usdc' || networkId === 'usdt'
          ? 'Wallet support depends on token transfer parsing, chain selection, and whether the app recognizes ERC-20 transfer payload conventions.'
          : 'Wallet behavior can vary between reading a plain address and reading amount parameters in a payment URI.'
    },
    {
      title: 'How this guide differs from the tool',
      body: `This page explains the format and safety checks. The dedicated ${name} generator page is the place to create the QR code itself.`
    }
  ];
}

function guidePrimarySections(networkId: NetworkId, name: string, ticker: string): LandingPageSection[] {
  switch (networkId) {
    case 'lightning':
      return [
        {
          title: 'What a Lightning QR code contains',
          body: 'A Lightning QR code usually contains a BOLT11 invoice. It is a payment request with encoded amount, route hints, and expiry details rather than a reusable address.'
        },
        {
          title: 'Wallet compatibility',
          body: 'Most Lightning wallets expect lowercase invoice text and treat the invoice as single-use. Expiry and amount handling should be checked before you share the code.'
        },
        {
          title: 'When to switch to the generator',
          body: 'Use the generator once the invoice is ready and you only need a scannable output. This guide is for understanding the format before you create one.'
        }
      ];
    case 'monero':
      return [
        {
          title: 'How Monero QR payloads work',
          body: 'Monero QR codes can encode standard addresses, subaddresses, or integrated addresses, and can optionally include `tx_amount` to request a specific XMR value.'
        },
        {
          title: 'What wallets may do with the payload',
          body: 'Compatible wallets can prefill the recipient and amount after scanning, but the final send screen should still be checked before broadcasting a transaction.'
        },
        {
          title: 'When to use the dedicated generator',
          body: 'Use the generator when you already know the address or amount you want encoded and want a scan-friendly QR without extra setup.'
        }
      ];
    case 'usdc':
    case 'usdt':
      return [
        {
          title: `${ticker} QR payload structure`,
          body: `${ticker} QR codes often represent ERC-20 transfer requests tied to an EVM address and a token amount rather than a chain-native coin transfer.`
        },
        {
          title: 'Compatibility and chain context',
          body: 'Wallets may interpret token transfer requests differently depending on chain support, token metadata, and whether the app recognizes the transfer format.'
        },
        {
          title: 'When to use the generator page',
          body: `Use the generator page when you are ready to build the transfer QR. Use this guide when you need the format, chain, and compatibility details first.`
        }
      ];
    default:
      return [
        {
          title: `How ${name} QR payloads work`,
          body: `${name} QR codes typically encode either a bare recipient address or a payment URI that can include an amount and other wallet-friendly parameters.`
        },
        {
          title: 'Compatibility and scanner behavior',
          body: `Some wallets scan only the ${ticker} address, while others also parse requested amounts. The final confirmation screen in the wallet remains the source of truth.`
        },
        {
          title: `When to use the ${name} generator`,
          body: `Open the dedicated generator when you need to create the QR immediately. Stay on the guide page when you are validating the format or teaching someone how the payload works.`
        }
      ];
  }
}

function guideCautionItems(networkId: NetworkId, name: string, ticker: string) {
  return [
    networkId === 'lightning'
      ? 'Do not reuse expired or already-paid Lightning invoices.'
      : `Do not assume every wallet will honor a requested ${ticker} amount automatically.`,
    `Always verify the final ${name} recipient in the wallet before sending funds.`,
    networkId === 'usdc' || networkId === 'usdt'
      ? 'Check the token chain and recipient address carefully so the transfer request matches the wallet and network you intend to use.'
      : 'Use the dedicated generator page when you need a clean, scannable QR rather than a protocol explanation.'
  ];
}

function guideFaq(networkId: NetworkId, name: string, ticker: string): FaqItem[] {
  switch (networkId) {
    case 'lightning':
      return [
        {
          question: 'What is a Bitcoin Lightning QR code?',
          answer: 'It is usually a QR representation of a BOLT11 Lightning invoice that a payer can scan from a compatible Lightning wallet.'
        },
        {
          question: 'Can a Lightning QR code be reused?',
          answer: 'Normally no. Lightning invoices are meant to be one-time payment requests with expiry and payment state.'
        }
      ];
    default:
      return [
        {
          question: `What does a ${name} crypto QR code contain?`,
          answer: `It usually contains a public ${ticker} address or a payment URI that a compatible wallet can parse after scanning.`
        },
        {
          question: `Is a ${name} QR code enough by itself to send funds?`,
          answer: 'No. The sender should still verify the destination and amount in the wallet confirmation screen before approving the transaction.'
        }
      ];
  }
}

function checkerBenefits(networkId: NetworkId, type: 'address' | 'transaction' | 'invoice', subject: string): LandingPageSection[] {
  return [
    {
      title: 'Local format checks',
      body:
        type === 'invoice'
          ? 'Validate Lightning invoice shape before sharing or turning it into a QR code.'
          : `Check ${subject.toLowerCase()} format before opening a public explorer or handing the value to a payer.`
    },
    {
      title: 'Trusted explorer links',
      body: 'Open the matching public explorer for supported networks without guessing the right URL pattern.'
    },
    {
      title: 'No wallet connection',
      body:
        networkId === 'lightning'
          ? 'The checker works from pasted invoice text only and never asks for signing or wallet access.'
          : 'The checker inspects public payload text only and never asks for wallet login, seed phrases, or signing permissions.'
    }
  ];
}

function checkerPrimarySections(subject: string, type: 'address' | 'transaction' | 'invoice'): LandingPageSection[] {
  return [
    {
      title: `What the ${subject.toLowerCase()} checker validates`,
      body:
        type === 'invoice'
          ? 'The checker looks at the invoice prefix, length, and character set to catch malformed Lightning requests before they are shared.'
          : `The checker looks at the public payload shape, normalization, and known explorer patterns for the submitted ${subject.toLowerCase()}.`
    },
    {
      title: 'What live lookup can and cannot confirm',
      body: 'Explorer and lookup data can help with context, but wallet confirmation screens and trusted counterparty processes still matter before any transfer is approved.'
    },
    {
      title: 'How this differs from the generator',
      body: 'Use the checker to review existing public payload text. Use the generator to create a new QR code from a destination you trust.'
    }
  ];
}

function checkerCautionItems(type: 'address' | 'transaction' | 'invoice') {
  return [
    'Never paste seed phrases, private keys, recovery codes, or exchange credentials into any checker.',
    type === 'invoice'
      ? 'A syntactically valid invoice can still be expired, paid, or not intended for you. Verify the payment details in the wallet before paying.'
      : 'A valid address or transaction hash does not guarantee that the destination is correct for your intended recipient.',
    'Use explorer data as supporting context, not as a replacement for direct wallet verification.'
  ];
}

function checkerFaq(subject: string): FaqItem[] {
  return [
    {
      question: `Can I verify a ${subject.toLowerCase()} without connecting a wallet?`,
      answer: `Yes. ${productName} checks public payload text and does not require a wallet connection.`
    },
    {
      question: 'Should I paste my seed phrase into a crypto checker?',
      answer: 'No. Only paste public addresses, transaction hashes, invoices, or payment URIs. Never paste seed phrases or private keys.'
    }
  ];
}

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
    url: siteUrl,
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
  url: siteUrl,
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

function landingPageJsonLd(page: LandingPage, canonical: string): JsonLd[] {
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

function staticRouteJsonLd(pathname: string, route: StaticRouteConfig): JsonLd[] {
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

function networkGuidePage(network: (typeof networks)[number]): LandingPage {
  const name = networkDisplayName(network);
  const isLightning = network.id === 'lightning';
  return {
    slug: guideSlug(network.id),
    template: 'guide',
    networkId: network.id,
    name,
    ticker: network.ticker,
    accent: network.accent,
    title: `${name} Crypto QR Code Guide | ${productName}`,
    description: isLightning
      ? 'Learn how Bitcoin Lightning QR codes encode BOLT11 invoices, how wallet compatibility works, and what to verify before paying or sharing one.'
      : `Learn how ${name} crypto QR codes encode ${network.ticker} addresses or payment URIs, how wallet compatibility works, and what to verify before using one.`,
    headline: isLightning ? 'What Is a Bitcoin Lightning QR Code?' : `What Is a ${name} Crypto QR Code?`,
    eyebrow: isLightning ? 'Lightning invoice guide' : `${network.ticker} payment QR guide`,
    body: guideBody(network.id, name, network.ticker),
    ctaLabel: isLightning ? 'Open Lightning QR generator' : `Open ${name} QR generator`,
    ctaHref: coinGenerateHref(network.id),
    payloadExample: payloadExample(network.id),
    chips: isLightning ? ['Lightning', 'Invoice', 'BOLT11'] : [network.ticker, 'Payment URI', 'Wallet scan'],
    benefits: guideBenefits(network.id, name, network.ticker),
    primarySections: guidePrimarySections(network.id, name, network.ticker),
    cautionItems: guideCautionItems(network.id, name, network.ticker),
    faq: guideFaq(network.id, name, network.ticker),
    lastModified: contentLastUpdated
  };
}

function networkLandingPage(network: (typeof networks)[number]): LandingPage {
  const name = networkDisplayName(network);
  const isLightning = network.id === 'lightning';
  return {
    slug: generatorSlug(network.id),
    template: 'generator',
    networkId: network.id,
    name,
    ticker: network.ticker,
    accent: network.accent,
    title: `${name} QR Code Generator | ${productName}`,
    description: isLightning
      ? 'Generate Bitcoin Lightning invoice QR codes locally in your browser with scan-safe styling and no wallet connection.'
      : `Generate ${name} (${network.ticker}) wallet address and payment QR codes locally in your browser with scan-safe styling and no wallet connection.`,
    headline: `${name} QR Code Generator`,
    eyebrow: isLightning ? 'BTC Lightning invoice QR tool' : `${network.ticker} wallet QR tool`,
    body: generatorBody(network.id, name),
    ctaLabel: isLightning ? 'Generate Lightning QR code' : `Generate ${network.ticker} QR code`,
    ctaHref: coinGenerateHref(network.id),
    payloadExample: payloadExample(network.id),
    chips: isLightning ? ['Lightning', 'BOLT11', 'Invoice'] : ['Address', 'Amount', 'Local only'],
    benefits: generatorBenefits(network.id, network.ticker, name),
    primarySections: generatorPrimarySections(network.id, name, network.ticker),
    howToSteps: generatorHowToSteps(network.id, name),
    trustPoints: generatorTrustPoints(network.id),
    cautionItems: generatorCautionItems(network.id, name, network.ticker),
    faq: generatorFaq(network.id, name, network.ticker),
    lastModified: contentLastUpdated
  };
}

const genericGuidePage: LandingPage = {
  slug: 'crypto-generate-qrcode',
  template: 'guide',
  name: 'Crypto QR Code',
  accent: '#38bdf8',
  title: `Crypto QR Code Guide | ${productName}`,
  description:
    'Learn how crypto QR codes encode wallet addresses, payment requests, and invoices across Monero, Bitcoin, Lightning, Ethereum, Solana, Litecoin, USDC, and USDT.',
  headline: 'Crypto QR Code Guide',
  eyebrow: 'Multi-network QR explainer',
  body:
    'Learn how crypto QR codes work before you generate one. This guide explains what wallet scanners usually read, how payment URI formats differ by network, and when to use the dedicated tool pages for actual QR generation.',
  ctaLabel: 'Open the multi-network generator',
  ctaHref: '/generate',
  payloadExample: 'bitcoin:bc1q...?amount=0.015',
  chips: ['BTC', 'XMR', 'ETH', 'SOL', 'LTC', 'USDC', 'USDT', 'Lightning'],
  benefits: [
    {
      title: 'Format overview',
      body: 'Compare how major crypto networks encode addresses, payment amounts, and invoice-style QR payloads.'
    },
    {
      title: 'Wallet expectations',
      body: 'Understand what scanners usually prefill and what still needs to be verified manually in the wallet.'
    },
    {
      title: 'Next-step navigation',
      body: 'Jump from the guide to dedicated generator and checker pages once you know which workflow you need.'
    }
  ],
  primarySections: [
    {
      title: 'What a crypto QR code usually contains',
      body: 'Most crypto QR codes encode a public destination such as a wallet address, payment URI, or invoice string. They should never contain private keys or seed phrases.'
    },
    {
      title: 'Why payment formats differ by network',
      body: 'Bitcoin-style URIs, Monero request parameters, Ethereum payment requests, and Lightning invoices use different encoding rules and wallet expectations.'
    },
    {
      title: 'When to use a guide versus a generator',
      body: 'Use the guide when you need the standards explained. Use the generator when you already trust the destination and need a scannable QR output.'
    }
  ],
  cautionItems: [
    'Never share a QR code for a destination you have not verified independently.',
    'Do not assume every wallet will honor optional amount parameters the same way.',
    'Use the dedicated generator page when you need a QR code that other people will actually scan.'
  ],
  faq: [
    {
      question: 'What is a crypto QR code?',
      answer: 'It is a QR code that encodes a public wallet destination, payment request, or invoice string so a wallet can scan it instead of requiring manual typing.'
    },
    {
      question: 'Can I use one generator for every network?',
      answer: 'A multi-network tool can help, but each blockchain still has its own address and payment format rules. Dedicated pages exist for network-specific workflows.'
    }
  ],
  lastModified: contentLastUpdated
};

const checkerNames: Record<NetworkId, string> = {
  monero: 'Monero',
  bitcoin: 'Bitcoin',
  lightning: 'Bitcoin Lightning',
  ethereum: 'Ethereum',
  solana: 'Solana',
  litecoin: 'Litecoin',
  usdc: 'USDC',
  usdt: 'USDT'
};

function checkerLandingPage(network: (typeof networks)[number], type: 'address' | 'transaction' | 'invoice'): LandingPage {
  const name = checkerNames[network.id];
  const isInvoice = type === 'invoice';
  const isToken = network.id === 'usdc' || network.id === 'usdt';
  const checkerLabel = isInvoice ? 'Invoice Checker' : type === 'address' ? 'Address Checker' : 'Transaction Checker';
  const subject = isToken && type === 'address' ? `${name} EVM Recipient` : `${name} ${isInvoice ? 'Invoice' : type === 'address' ? 'Address' : 'Transaction'}`;

  return {
    slug: `${network.id}-${isInvoice ? 'invoice' : type}-checker`,
    template: 'checker',
    networkId: network.id,
    name,
    ticker: network.ticker,
    accent: network.accent,
    title: `${subject} Checker | ${productName}`,
    description: isInvoice
      ? 'Validate Bitcoin Lightning BOLT11 invoice payloads before sharing or scanning them.'
      : type === 'address'
        ? `Check ${subject.toLowerCase()} formats, payment URI payloads, and trusted explorer links before using a crypto QR code.`
        : `Check ${subject.toLowerCase()} hashes with local validation, trusted explorer links, and best-effort live lookup.`,
    headline: `${subject} ${checkerLabel}`,
    eyebrow: isInvoice ? 'BOLT11 invoice validation' : type === 'address' ? `${network.ticker} recipient verification` : `${network.ticker} transaction verification`,
    body: isInvoice
      ? 'Paste a Bitcoin Lightning invoice to validate its BOLT11 shape before turning it into a QR code or sharing it with a payer.'
      : isToken
        ? `Paste a ${name} payment URI, EVM recipient address, or related EVM transaction hash to verify the payload shape and open trusted explorer links.`
        : `Paste a ${name} ${type === 'address' ? 'address or payment URI' : 'transaction hash'} to check its format and inspect available explorer or live lookup data.`,
    ctaLabel: `Open ${checkerLabel.toLowerCase()}`,
    ctaHref: `/verify?network=${network.id}`,
    payloadExample:
      network.id === 'monero'
        ? type === 'transaction'
          ? 'b6f6991d...64 hex chars'
          : 'monero:84Pq...?tx_amount=1.25'
        : network.id === 'bitcoin'
          ? type === 'transaction'
            ? '4d3c2b1a...64 hex chars'
            : 'bitcoin:bc1q...?amount=0.015'
          : network.id === 'lightning'
            ? 'lnbc2500u1p...'
            : network.id === 'ethereum'
              ? type === 'transaction'
                ? '0x5e2b...64 hex chars'
                : 'ethereum:0x742d...?value=250000000000000000'
              : network.id === 'solana'
                ? type === 'transaction'
                  ? '5J7s...base58 signature'
                  : 'solana:7XSY...?amount=2.5'
                : network.id === 'litecoin'
                  ? type === 'transaction'
                    ? '9f8e7d...64 hex chars'
                    : 'litecoin:ltc1...?amount=1.5'
                  : network.id === 'usdc'
                    ? 'ethereum:USDC transfer to 0x742d...'
                    : 'ethereum:USDT transfer to 0x742d...',
    chips: isInvoice ? ['Lightning', 'Invoice', 'BOLT11'] : type === 'address' ? ['Address', 'Payment URI', 'Explorer'] : ['Transaction', 'Hash', 'Live lookup'],
    benefits: checkerBenefits(network.id, type, subject),
    primarySections: checkerPrimarySections(subject, type),
    trustPoints: [
      'The checker works from pasted public payload text and does not connect to your wallet.',
      'Use it to catch obvious formatting issues before you share or pay from a QR code.',
      'Final wallet confirmation still matters before any funds move.'
    ],
    cautionItems: checkerCautionItems(type),
    faq: checkerFaq(subject),
    lastModified: contentLastUpdated
  };
}

export const coinLandingPages = networks.map((network) => networkLandingPage(network));

export const searchLandingPages: LandingPage[] = [...networks.map((network) => networkGuidePage(network)), genericGuidePage];

export const checkerLandingPages: LandingPage[] = networks.flatMap((network) => {
  if (network.id === 'lightning') return [checkerLandingPage(network, 'invoice')];
  return [checkerLandingPage(network, 'address'), checkerLandingPage(network, 'transaction')];
});

export const landingPages: LandingPage[] = [...searchLandingPages, ...coinLandingPages, ...checkerLandingPages];

export type CoinLandingPage = LandingPage;

export function getCoinLandingPage(slug: string) {
  return landingPages.find((page) => page.slug === slug);
}

export function routeMeta(pathname: string): SeoMeta {
  const landingPage = getCoinLandingPage(pathname.replace(/^\//, ''));

  if (landingPage) {
    const canonicalPath = `/${landingPage.canonicalSlug ?? landingPage.slug}`;
    const canonical = absoluteUrl(canonicalPath);

    return {
      title: landingPage.title,
      description: landingPage.description,
      canonical,
      jsonLd: landingPageJsonLd(landingPage, canonical),
      ogImage: defaultOgImage,
      ogImageAlt: defaultOgImageAlt,
      ogImageWidth: defaultOgImageWidth,
      ogImageHeight: defaultOgImageHeight,
      twitterImage: defaultOgImage,
      lastModified: landingPage.lastModified ?? contentLastUpdated
    };
  }

  const route = staticRoutes[pathname] ?? staticRoutes['/'];
  const canonical = absoluteUrl(pathname in staticRoutes ? pathname : '/');

  return {
    title: route.title,
    description: route.description,
    canonical,
    jsonLd: staticRouteJsonLd(pathname in staticRoutes ? pathname : '/', route),
    ogImage: defaultOgImage,
    ogImageAlt: defaultOgImageAlt,
    ogImageWidth: defaultOgImageWidth,
    ogImageHeight: defaultOgImageHeight,
    twitterImage: defaultOgImage,
    robots: route.robots,
    lastModified: route.lastModified ?? contentLastUpdated
  };
}

export function getSitemapEntries() {
  const staticEntries = Object.entries(staticRoutes)
    .filter(([, route]) => route.indexable !== false)
    .map(([path, route]) => ({
      path,
      lastModified: route.lastModified ?? contentLastUpdated
    }));

  const landingEntries = landingPages.map((page) => ({
    path: `/${page.slug}`,
    lastModified: page.lastModified ?? contentLastUpdated
  }));

  return [...staticEntries, ...landingEntries];
}

export function relatedLandingPages(page: LandingPage) {
  const related: LandingPage[] = [];

  if (page.networkId) {
    const generator = landingPages.find((item) => item.template === 'generator' && item.networkId === page.networkId);
    const guide = landingPages.find((item) => item.template === 'guide' && item.networkId === page.networkId);
    const checkers = landingPages.filter((item) => item.template === 'checker' && item.networkId === page.networkId);

    if (generator && generator.slug !== page.slug) related.push(generator);
    if (guide && guide.slug !== page.slug) related.push(guide);
    related.push(...checkers.filter((item) => item.slug !== page.slug));
  }

  const extraGenerators = coinLandingPages.filter((item) => item.slug !== page.slug && !related.some((relatedItem) => relatedItem.slug === item.slug)).slice(0, 4);

  return [...related, ...extraGenerators];
}

export function isIndexableRoute(pathname: string) {
  const landingPage = getCoinLandingPage(pathname.replace(/^\//, ''));
  if (landingPage) return true;

  const route = staticRoutes[pathname];
  return route ? route.indexable !== false : false;
}

export { coinGenerateHref, generatorHref, guideHref };
