import { defaultLocale, type Locale } from './locales';

export function formatNumber(value: number, locale: Locale = defaultLocale, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCurrency(value: number, currency: string, locale: Locale = defaultLocale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: Math.abs(value) >= 1 ? 2 : 6
  }).format(value);
}

export function formatDate(value: string | Date, locale: Locale = defaultLocale, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale, options ?? { year: 'numeric', month: 'short', day: 'numeric' }).format(
    typeof value === 'string' ? new Date(value) : value
  );
}
