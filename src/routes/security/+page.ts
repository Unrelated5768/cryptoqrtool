import { organizationJsonLd, routeMeta } from '$lib/seo';

export function load() {
  return {
    meta: {
      ...routeMeta('/security'),
      jsonLd: [
        organizationJsonLd,
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Where are saved addresses stored?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Saved addresses are stored in browser local storage under a versioned CryptoGen app key.'
              }
            },
            {
              '@type': 'Question',
              name: 'Are custom logos uploaded?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Custom logos are read in the browser and only stored as local data URLs if the user saves a style preset.'
              }
            }
          ]
        }
      ]
    }
  };
}
