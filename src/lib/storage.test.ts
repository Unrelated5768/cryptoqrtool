import { beforeEach, describe, expect, it } from 'vitest';
import { formatCurrency, setDefaultCurrency } from './currency';
import { defaultQrStyle } from './qrStyle';
import { deleteAddress, loadStorage, migrateStorage, saveAddress, saveStylePreset, updateAddressLabel } from './storage';

describe('browser local storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves, updates, and deletes addresses under versioned app storage', () => {
    const saved = saveAddress({ label: 'Treasury', network: 'monero', address: '4' + 'A'.repeat(94) });
    expect(loadStorage().addresses).toHaveLength(1);

    updateAddressLabel(saved.id, 'Cold treasury');
    expect(loadStorage().addresses[0].label).toBe('Cold treasury');

    deleteAddress(saved.id);
    expect(loadStorage().addresses).toHaveLength(0);
  });

  it('saves style presets with optional custom logo data URL', () => {
    saveStylePreset('Orange', { ...defaultQrStyle, logo: 'custom' }, 'data:image/png;base64,abc');
    const storage = loadStorage();
    expect(storage.presets[0].name).toBe('Orange');
    expect(storage.presets[0].customLogoDataUrl).toContain('data:image');
  });

  it('remembers the default fiat currency in local storage', () => {
    setDefaultCurrency('eur');
    expect(loadStorage().defaultCurrency).toBe('EUR');
  });

  it('migrates missing or invalid currency settings to USD', () => {
    expect(migrateStorage({ addresses: [], presets: [] }).defaultCurrency).toBe('USD');
    expect(migrateStorage({ addresses: [], presets: [], defaultCurrency: 'nope' }).defaultCurrency).toBe('USD');
  });

  it('formats fiat values for the selected currency', () => {
    expect(formatCurrency(12.34, 'CAD')).toContain('12.34');
    expect(formatCurrency(undefined, 'USD')).toBe('Unavailable');
  });
});
