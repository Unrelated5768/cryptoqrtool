export const defaultLocale = 'en';

export const supportedLocales = [
  'en',
  'en-GB',
  'es',
  'pt',
  'uk',
  'nl',
  'de',
  'fr',
  'it',
  'ru',
  'ar',
  'zh-CN',
  'ja',
  'ko'
] as const;

export type Locale = (typeof supportedLocales)[number];
export type TextDirection = 'ltr' | 'rtl';

export type LocaleConfig = {
  code: Locale;
  hreflang: string;
  label: string;
  nativeLabel: string;
  dir: TextDirection;
  fallback: Locale;
};

export const localeConfigs: Record<Locale, LocaleConfig> = {
  en: {
    code: 'en',
    hreflang: 'en',
    label: 'English',
    nativeLabel: 'English',
    dir: 'ltr',
    fallback: 'en'
  },
  'en-GB': {
    code: 'en-GB',
    hreflang: 'en-GB',
    label: 'English (UK)',
    nativeLabel: 'English (UK)',
    dir: 'ltr',
    fallback: 'en'
  },
  es: {
    code: 'es',
    hreflang: 'es',
    label: 'Spanish',
    nativeLabel: 'Español',
    dir: 'ltr',
    fallback: 'en'
  },
  pt: {
    code: 'pt',
    hreflang: 'pt',
    label: 'Portuguese',
    nativeLabel: 'Português',
    dir: 'ltr',
    fallback: 'en'
  },
  uk: {
    code: 'uk',
    hreflang: 'uk',
    label: 'Ukrainian',
    nativeLabel: 'Українська',
    dir: 'ltr',
    fallback: 'en'
  },
  nl: {
    code: 'nl',
    hreflang: 'nl',
    label: 'Dutch',
    nativeLabel: 'Nederlands',
    dir: 'ltr',
    fallback: 'en'
  },
  de: {
    code: 'de',
    hreflang: 'de',
    label: 'German',
    nativeLabel: 'Deutsch',
    dir: 'ltr',
    fallback: 'en'
  },
  fr: {
    code: 'fr',
    hreflang: 'fr',
    label: 'French',
    nativeLabel: 'Français',
    dir: 'ltr',
    fallback: 'en'
  },
  it: {
    code: 'it',
    hreflang: 'it',
    label: 'Italian',
    nativeLabel: 'Italiano',
    dir: 'ltr',
    fallback: 'en'
  },
  ru: {
    code: 'ru',
    hreflang: 'ru',
    label: 'Russian',
    nativeLabel: 'Русский',
    dir: 'ltr',
    fallback: 'en'
  },
  ar: {
    code: 'ar',
    hreflang: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    dir: 'rtl',
    fallback: 'en'
  },
  'zh-CN': {
    code: 'zh-CN',
    hreflang: 'zh-CN',
    label: 'Chinese (Simplified)',
    nativeLabel: '简体中文',
    dir: 'ltr',
    fallback: 'en'
  },
  ja: {
    code: 'ja',
    hreflang: 'ja',
    label: 'Japanese',
    nativeLabel: '日本語',
    dir: 'ltr',
    fallback: 'en'
  },
  ko: {
    code: 'ko',
    hreflang: 'ko',
    label: 'Korean',
    nativeLabel: '한국어',
    dir: 'ltr',
    fallback: 'en'
  }
};

export function isLocale(value: string | undefined): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function localeDir(locale: Locale): TextDirection {
  return localeConfigs[locale].dir;
}
