declare global {
  const __APP_VERSION__: string;
  const __APP_COMMIT__: string;

  namespace App {
    interface PageData {
      meta?: import('$lib/seo').SeoMeta;
      locale?: import('$lib/i18n/locales').Locale;
      dir?: import('$lib/i18n/locales').TextDirection;
      routePath?: string;
    }
  }
}

export {};
