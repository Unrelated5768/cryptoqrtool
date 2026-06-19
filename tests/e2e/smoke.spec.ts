import { expect, test, type Page } from '@playwright/test';

const bitcoinAddress = 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080';
const lightningInvoice = 'lnbc2500u1p3xnhl2pp5qqqsyqcyq5rqwzqfka';

async function gotoReady(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.readyState === 'complete');
}

test.beforeEach(async ({ page }) => {
  await page.route('**/api/markets**', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        state: 'fresh',
        updatedAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
        data: [
          {
            id: 'bitcoin',
            symbol: 'BTC',
            name: 'Bitcoin',
            image: '',
            price: 100000,
            change24h: 1.2,
            marketCap: 1
          },
          {
            id: 'monero',
            symbol: 'XMR',
            name: 'Monero',
            image: '',
            price: 180,
            change24h: -0.4,
            marketCap: 1
          }
        ]
      })
    });
  });

  await page.route('**/api/fees**', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        state: 'fresh',
        updatedAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
        data: [
          {
            network: 'Bitcoin',
            ticker: 'BTC',
            status: 'fresh',
            priority: '12 sat/vB',
            standard: '8 sat/vB',
            economy: '4 sat/vB',
            source: 'mempool.space'
          }
        ]
      })
    });
  });

  await page.route('**/api/exchanges**', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        state: 'fresh',
        updatedAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
        data: [
          {
            id: 'kraken',
            name: 'Kraken',
            trustScore: 10,
            tradeVolumeBtc: 1234,
            url: 'https://www.kraken.com'
          }
        ]
      })
    });
  });

  await page.route('**/api/verify**', async (route) => {
    const requestUrl = new URL(route.request().url());
    const q = requestUrl.searchParams.get('q') ?? '';
    const network = requestUrl.searchParams.get('network') ?? 'automatic';
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        state: 'fresh',
        inputType: q.startsWith('0x') ? 'transaction' : q.startsWith('bitcoin:') ? 'payment-uri' : 'address',
        network: network === 'automatic' ? 'bitcoin' : network,
        validation: { status: 'valid', message: 'Valid test payload.' },
        normalized: q,
        lookup: {
          state: 'fresh',
          source: 'Mock explorer',
          summary: 'Mock lookup returned current data.',
          details: { confirmed: true }
        },
        explorerLinks: [{ label: 'Mock explorer', href: 'https://example.com/explorer' }],
        updatedAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
        message: 'Valid test payload.'
      })
    });
  });
});

test('generates and copies a payment QR payload', async ({ page }) => {
  await gotoReady(page, '/generate');

  await expect(page.locator('script[src*="umami"], script[src*="analytics.cryptoqrtool.com"]')).toHaveCount(0);

  await page.getByTestId('network-select').selectOption('bitcoin');
  await page.getByTestId('address-input').fill(bitcoinAddress);
  await page.getByTestId('amount-input').fill('0.1');

  await expect(page.getByTestId('qr-payload')).toContainText(`bitcoin:${bitcoinAddress}?amount=0.1`);
  await expect(page.getByTestId('qr-render-host').locator('svg')).toBeVisible();

  await page.getByTestId('copy-payload').click();
  await expect(page.getByTestId('copy-payload')).toContainText('Copied');
});

test('persists saved addresses locally and opens them from the saved page', async ({ page }) => {
  await gotoReady(page, '/generate');

  await page.getByTestId('network-select').selectOption('bitcoin');
  await page.getByTestId('address-input').fill(bitcoinAddress);
  await page.getByTestId('label-input').fill('Treasury BTC');
  await page.getByTestId('save-address').click();

  await gotoReady(page, '/saved');
  await expect(page.getByTestId('saved-address-row')).toContainText('Treasury BTC');
  await page.getByTestId('generate-saved-address').click();

  await expect(page).toHaveURL(new RegExp('/generate'));
  await expect(page.getByTestId('address-input')).toHaveValue(bitcoinAddress);
  await expect(page.getByTestId('qr-payload')).toContainText(bitcoinAddress);
});

test('generates a Bitcoin Lightning invoice QR payload', async ({ page }) => {
  await gotoReady(page, '/crypto-qrcode-bitcoin-lightning');
  await expect(page.locator('h1')).toContainText('Bitcoin Lightning');

  await page.getByRole('link', { name: /(open|generate) lightning qr (generator|code)/i }).click();
  await page.getByTestId('address-input').fill(lightningInvoice);

  await expect(page.getByLabel('Lightning invoice')).toBeVisible();
  await expect(page.getByTestId('amount-input')).toHaveCount(0);
  await expect(page.getByTestId('qr-payload')).toContainText(lightningInvoice);
  await expect(page.getByTestId('qr-render-host').locator('svg')).toBeVisible();
});

test('verifies a Bitcoin address with mocked live lookup', async ({ page }) => {
  await gotoReady(page, '/verify');

  await page.getByTestId('verify-input').fill(bitcoinAddress);
  await page.getByTestId('verify-submit').click();

  await expect(page.getByTestId('verify-result')).toContainText('Bitcoin');
  await expect(page.getByTestId('verify-result')).toContainText(bitcoinAddress);
  await expect(page.getByText('Mock explorer').first()).toBeVisible();
});

test('verifies an Ethereum transaction hash with mocked live lookup', async ({ page }) => {
  const txHash = `0x${'a'.repeat(64)}`;
  await gotoReady(page, '/verify');
  await page.getByTestId('verify-network').selectOption('ethereum');
  await page.getByTestId('verify-input').fill(txHash);
  await page.getByTestId('verify-submit').click();

  await expect(page.getByTestId('verify-result')).toContainText('Ethereum');
  await expect(page.getByTestId('verify-result')).toContainText(txHash);
  await expect(page.getByText('Mock lookup returned current data.')).toBeVisible();
});

test('opens generated QR payloads in the verifier', async ({ page }) => {
  await gotoReady(page, '/generate');

  await page.getByTestId('network-select').selectOption('bitcoin');
  await page.getByTestId('address-input').fill(bitcoinAddress);
  await page.getByTestId('amount-input').fill('0.1');
  await page.getByRole('link', { name: /verify payload/i }).click();

  await expect(page).toHaveURL(/\/verify/);
  await expect(page.getByTestId('verify-input')).toHaveValue(`bitcoin:${bitcoinAddress}?amount=0.1`);
});

test('public routes load on desktop and mobile viewports', async ({ page }) => {
  for (const path of [
    '/',
    '/markets',
    '/fees',
    '/verify',
    '/exchanges',
    '/api-docs',
    '/security',
    '/fr/generate',
    '/fr/faq',
    '/fr/privacy',
    '/fr/security',
    '/pt/faq',
    '/de/privacy',
    '/nl/security',
    '/it/bitcoin-qr-code-generator',
    '/ru/faq',
    '/uk/bitcoin-qr-code-generator',
    '/ar/generate',
    '/es/bitcoin-qr-code-generator',
    '/ar/faq',
    '/zh-CN/faq',
    '/ja/privacy',
    '/ko/security',
    '/crypto-qrcode-bitcoin-lightning',
    '/bitcoin-address-checker'
  ]) {
    await page.goto(path);
    await expect(page.locator('main')).toBeVisible();
  }
});
