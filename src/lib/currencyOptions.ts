export const fiatCurrencies = [
  { code: 'USD', label: 'USD', symbol: '$' },
  { code: 'EUR', label: 'EUR', symbol: '€' },
  { code: 'CAD', label: 'CAD', symbol: 'C$' },
  { code: 'GBP', label: 'GBP', symbol: '£' },
  { code: 'AUD', label: 'AUD', symbol: 'A$' },
  { code: 'JPY', label: 'JPY', symbol: '¥' },
  { code: 'CHF', label: 'CHF', symbol: 'Fr' }
] as const;

export type FiatCurrency = (typeof fiatCurrencies)[number]['code'];

export function normalizeCurrency(currency: unknown): FiatCurrency {
  const value = typeof currency === 'string' ? currency.toUpperCase() : '';
  return fiatCurrencies.some((option) => option.code === value) ? (value as FiatCurrency) : 'USD';
}
