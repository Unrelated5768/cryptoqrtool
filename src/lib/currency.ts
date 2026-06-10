import { writable } from 'svelte/store';
import { loadStorage, saveStorage } from './storage';
import { normalizeCurrency, type FiatCurrency } from './currencyOptions';
export { fiatCurrencies, normalizeCurrency, type FiatCurrency } from './currencyOptions';

export const defaultCurrency = writable<FiatCurrency>(loadStorage().defaultCurrency);

export function setDefaultCurrency(currency: string) {
  const normalized = normalizeCurrency(currency);
  const data = loadStorage();
  data.defaultCurrency = normalized;
  saveStorage(data);
  defaultCurrency.set(normalized);
}

export function formatCurrency(value: number | null | undefined, currency: FiatCurrency): string {
  if (value === null || value === undefined || Number.isNaN(value)) return 'Unavailable';

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2
  }).format(value);
}
