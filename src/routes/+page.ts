import { organizationJsonLd, productName, routeMeta } from '$lib/seo';

export function load() {
  return {
    meta: {
      ...routeMeta('/'),
      jsonLd: [
        organizationJsonLd,
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: `Does ${productName} store crypto addresses?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Saved addresses and QR style presets are stored only in browser local storage.'
              }
            },
            {
              '@type': 'Question',
              name: 'Which networks are supported?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: `${productName} supports Monero, Bitcoin, Ethereum/EVM, Solana, Litecoin, USDC, and USDT in v1.`
              }
            }
          ]
        }
      ]
    }
  };
}
