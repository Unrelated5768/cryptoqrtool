import { expect, test } from '@playwright/test';

const bitcoinAddress = 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080';
const lightningInvoice = 'lnbc2500u1p3xnhl2pp5qqqsyqcyq5rqwzqfka';

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
});

test('generates and copies a payment QR payload', async ({ page }) => {
  await page.goto('/generate');

  await page.getByTestId('network-select').selectOption('bitcoin');
  await page.getByTestId('address-input').fill(bitcoinAddress);
  await page.getByTestId('amount-input').fill('0.1');

  await expect(page.getByTestId('qr-payload')).toContainText(`bitcoin:${bitcoinAddress}?amount=0.1`);
  await expect(page.getByTestId('qr-render-host').locator('svg')).toBeVisible();

  await page.getByTestId('copy-payload').click();
  await expect(page.getByTestId('copy-payload')).toContainText('Copied');
});

test('persists saved addresses locally and opens them from the saved page', async ({ page }) => {
  await page.goto('/generate');

  await page.getByTestId('network-select').selectOption('bitcoin');
  await page.getByTestId('address-input').fill(bitcoinAddress);
  await page.getByTestId('label-input').fill('Treasury BTC');
  await page.getByTestId('save-address').click();

  await page.goto('/saved');
  await expect(page.getByTestId('saved-address-row')).toContainText('Treasury BTC');
  await page.getByTestId('generate-saved-address').click();

  await expect(page).toHaveURL(new RegExp('/generate'));
  await expect(page.getByTestId('address-input')).toHaveValue(bitcoinAddress);
  await expect(page.getByTestId('qr-payload')).toContainText(bitcoinAddress);
});

test('generates a Bitcoin Lightning invoice QR payload', async ({ page }) => {
  await page.goto('/crypto-qrcode-bitcoin-lightning');
  await expect(page.locator('h1')).toContainText('Bitcoin Lightning');

  await page.getByRole('link', { name: /generate lightning qr code/i }).click();
  await page.getByTestId('address-input').fill(lightningInvoice);

  await expect(page.getByLabel('Lightning invoice')).toBeVisible();
  await expect(page.getByTestId('amount-input')).toHaveCount(0);
  await expect(page.getByTestId('qr-payload')).toContainText(lightningInvoice);
  await expect(page.getByTestId('qr-render-host').locator('svg')).toBeVisible();
});

test('public routes load on desktop and mobile viewports', async ({ page }) => {
  for (const path of ['/', '/markets', '/fees', '/exchanges', '/api-docs', '/security', '/crypto-qrcode-bitcoin-lightning']) {
    await page.goto(path);
    await expect(page.locator('main')).toBeVisible();
  }
});
