import {
  contentLastUpdated,
  productName,
  seoProductName,
  type FaqItem,
  type StaticRouteConfig
} from './seoShared';

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

export const faqPageItems: FaqItem[] = [
  {
    question: `Is ${productName} safe for generating crypto QR codes?`,
    answer:
      'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.'
  },
  {
    question: `Does ${productName} store wallet addresses?`,
    answer:
      'Saved addresses stay in browser local storage on your device when you choose to save them. They are not synced to a server-side address vault.'
  },
  {
    question: 'Does the site use cookies?',
    answer:
      'The site does not set advertising, retargeting, account, or tracking cookies. It may use browser local storage for saved addresses, style presets, theme, currency, and the anonymous analytics opt-out setting.'
  },
  {
    question: 'What analytics are used?',
    answer:
      'Self-hosted Umami analytics is used for aggregate page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings.'
  },
  {
    question: 'Can a downloaded crypto QR code be changed later?',
    answer:
      'No. A downloaded QR image contains the payload that existed when you exported it. If the address, amount, invoice, chain, or style needs to change, generate a new QR code.'
  },
  {
    question: 'What happens if a wallet ignores the amount field?',
    answer:
      'Some wallets may scan only the destination and ignore optional URI parameters such as amount or token details. Always confirm the recipient, network, token, and amount inside the sending wallet before approving a transaction.'
  },
  {
    question: 'Can I paste a seed phrase or private key?',
    answer:
      'No. The tool is only for public addresses, payment URIs, Lightning invoices, transaction hashes, and custom public payloads. Never paste seed phrases or private keys into any QR generator.'
  },
  {
    question: 'Does the tool provide financial advice?',
    answer:
      `${productName} is a utility for generating and checking QR payloads. It does not provide investment, tax, legal, trading, custody, or financial advice.`
  }
];

export const staticRoutes: Record<string, StaticRouteConfig> = {
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
  '/privacy': {
    title: `Privacy, Cookies, and Local Storage | ${productName}`,
    description: `Review ${productName} cookie use, browser local storage, anonymous analytics, and the analytics opt-out control.`,
    schemaName: `${productName} Privacy Notice`,
    kind: 'page',
    breadcrumbLabel: 'Privacy Notice',
    lastModified: contentLastUpdated
  },
  '/terms': {
    title: `Terms of Use | ${productName}`,
    description: `Read the ${productName} terms for browser-local QR generation, no wallet custody, user verification, and crypto transaction risk.`,
    schemaName: `${productName} Terms of Use`,
    kind: 'page',
    breadcrumbLabel: 'Terms of Use',
    lastModified: contentLastUpdated
  },
  '/faq': {
    title: `Crypto QR Code FAQ | ${productName}`,
    description: `Answers about crypto QR code safety, local storage, cookies, analytics, wallet compatibility, and transaction verification.`,
    schemaName: `${productName} FAQ`,
    kind: 'page',
    breadcrumbLabel: 'FAQ',
    faq: faqPageItems,
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
