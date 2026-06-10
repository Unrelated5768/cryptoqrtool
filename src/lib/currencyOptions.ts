export const fiatCurrencies = [
  { code: 'USD', label: 'USD' },
  { code: 'EUR', label: 'EUR' },
  { code: 'CAD', label: 'CAD' },
  { code: 'GBP', label: 'GBP' },
  { code: 'AUD', label: 'AUD' },
  { code: 'JPY', label: 'JPY' },
  { code: 'CHF', label: 'CHF' }
] as const;

export type FiatCurrency = (typeof fiatCurrencies)[number]['code'];

export function normalizeCurrency(currency: unknown): FiatCurrency {
  const value = typeof currency === 'string' ? currency.toUpperCase() : '';
  return fiatCurrencies.some((option) => option.code === value) ? (value as FiatCurrency) : 'USD';
}
