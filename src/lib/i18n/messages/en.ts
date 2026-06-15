import { productName } from '$lib/seoShared';

export type Messages = {
  nav: {
    generator: string;
    verify: string;
    saved: string;
    markets: string;
    fees: string;
    exchanges: string;
    api: string;
    faq: string;
    security: string;
    privacy: string;
    more: string;
    language: string;
    displayCurrency: string;
    primaryNavigation: string;
    mobileNavigation: string;
    defaultCurrency: string;
  };
  shell: {
    localPrivacyModel: string;
    updateTitle: string;
    updateBody: string;
    reload: string;
    dismissUpdate: string;
    dataBadge: string;
    footerBody: string;
    footerGenerator: (ticker: string) => string;
    privacyNotice: string;
    securityModel: string;
    terms: string;
    noAccounts: string;
    madeWith: string;
    forPrivacy: string;
    viewSource: string;
    version: (version: string) => string;
    homeAria: string;
  };
  landing: {
    openAllNetworks: string;
    privacyModel: string;
    readGuide: (name: string) => string;
    openGenerator: (name: string) => string;
    createQrCode: (name: string) => string;
    nextSteps: string;
    relatedTools: string;
    relatedGenerator: string;
    guideDetails: string;
    checkerCovers: string;
    generatorCovers: string;
    mistakesAvoid: string;
    trustNotes: string;
    howToSafely: string;
    trustSignals: string;
    guideCautions: string;
    commonMistakes: string;
    faq: string;
    guideRelatedBody: string;
    checkerRelatedBody: string;
    generatorRelatedBody: string;
  };
};

export const enMessages: Messages = {
  nav: {
    generator: 'Generator',
    verify: 'Verify',
    saved: 'Saved',
    markets: 'Markets',
    fees: 'Fees',
    exchanges: 'Exchanges',
    api: 'API',
    faq: 'FAQ',
    security: 'Security',
    privacy: 'Privacy',
    more: 'More',
    language: 'Language',
    displayCurrency: 'Display currency',
    primaryNavigation: 'Primary navigation',
    mobileNavigation: 'Mobile navigation',
    defaultCurrency: 'Default currency'
  },
  shell: {
    localPrivacyModel: 'Local-only privacy model',
    updateTitle: 'A new version is available.',
    updateBody: 'Reload to use the latest deployment.',
    reload: 'Reload',
    dismissUpdate: 'Dismiss update notice',
    dataBadge: 'Your data never leaves your browser',
    footerBody: `${productName} generates QR payloads in the browser. Saved addresses, presets, and custom logos stay in local storage without advertising cookies.`,
    footerGenerator: (ticker: string) => `${ticker} QR generator`,
    privacyNotice: 'Privacy notice',
    securityModel: 'Security model',
    terms: 'Terms of use',
    noAccounts: 'No accounts. No wallet connection.',
    madeWith: 'Made with',
    forPrivacy: 'for privacy.',
    viewSource: 'View source on GitHub',
    version: (version: string) => `Version ${version}`,
    homeAria: `${productName} home`
  },
  landing: {
    openAllNetworks: 'Open all networks',
    privacyModel: 'Privacy model',
    readGuide: (name: string) => `Read the ${name} QR guide`,
    openGenerator: (name: string) => `Open the ${name} generator`,
    createQrCode: (name: string) => `Create a ${name} QR code`,
    nextSteps: 'Next steps for this network',
    relatedTools: 'Related generators and guides',
    relatedGenerator: 'Related tools and guides',
    guideDetails: 'Guide details',
    checkerCovers: 'What the checker covers',
    generatorCovers: 'What this generator covers',
    mistakesAvoid: 'Common mistakes to avoid',
    trustNotes: 'Trust and verification notes',
    howToSafely: 'How to generate safely',
    trustSignals: 'Trust signals',
    guideCautions: 'Guide cautions',
    commonMistakes: 'Common mistakes',
    faq: 'Frequently asked questions',
    guideRelatedBody: 'Move from explanation to action with the matching generator or checker pages.',
    checkerRelatedBody: 'Create or review the matching QR workflow once the payload looks correct.',
    generatorRelatedBody: 'Open the matching guide or checker before you share a QR code publicly.'
  }
};
