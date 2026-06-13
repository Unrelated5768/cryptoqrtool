module.exports = {
  ci: {
    collect: {
      startServerCommand: 'bun run preview --host 127.0.0.1 --port 4173',
      url: [
        'http://127.0.0.1:4173/',
        'http://127.0.0.1:4173/generate',
        'http://127.0.0.1:4173/markets',
        'http://127.0.0.1:4173/fees',
        'http://127.0.0.1:4173/exchanges',
        'http://127.0.0.1:4173/security',
        'http://127.0.0.1:4173/faq',
        'http://127.0.0.1:4173/privacy',
        'http://127.0.0.1:4173/terms'
      ],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop'
      }
    },
    assert: {
      assertions: {
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:performance': ['warn', { minScore: 0.8 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
