import { productName, type LandingPage, type StaticRouteConfig } from '$lib/seoShared';
import { defaultLocale, type Locale } from './locales';

const staticTranslations: Partial<Record<Locale, Partial<Record<string, Partial<StaticRouteConfig>>>>> = {
  fr: {
    '/': {
      title: `Générateur de QR codes crypto | ${productName}`,
      description:
        'Générez localement des QR codes crypto pour Monero, Bitcoin, Ethereum, Solana, Litecoin, USDC et USDT avec des adresses et styles conservés dans le navigateur.',
      schemaName: 'Générateur de QR codes crypto'
    },
    '/generate': {
      title: `Générer des QR codes crypto | ${productName}`,
      description: 'Créez des QR codes de paiement crypto avec styles lisibles au scan et préréglages locaux.'
    },
    '/faq': {
      title: `FAQ sur les QR codes crypto | ${productName}`,
      description: 'Réponses sur la sécurité des QR codes crypto, le stockage local, les cookies, les analyses et la compatibilité des portefeuilles.'
    }
  },
  ar: {
    '/': {
      title: `مولد رموز QR للعملات الرقمية | ${productName}`,
      description: 'أنشئ رموز QR للعملات الرقمية محلياً في المتصفح لعناوين عامة وطلبات دفع بدون اتصال بالمحفظة.',
      schemaName: 'مولد رموز QR للعملات الرقمية'
    },
    '/generate': {
      title: `إنشاء رموز QR للعملات الرقمية | ${productName}`,
      description: 'أنشئ رموز QR لمدفوعات العملات الرقمية مع تنسيق آمن للمسح وحفظ محلي للإعدادات.'
    },
    '/faq': {
      title: `أسئلة شائعة حول QR للعملات الرقمية | ${productName}`,
      description: 'إجابات حول أمان رموز QR للعملات الرقمية والتخزين المحلي والتوافق مع المحافظ.'
    }
  },
  ja: {
    '/': {
      title: `暗号資産QRコード生成ツール | ${productName}`,
      description:
        'Monero、Bitcoin、Ethereum、Solana、Litecoin、USDC、USDT向けのスキャン可能な暗号資産QRコードをブラウザ内で生成します。',
      schemaName: '暗号資産QRコード生成ツール'
    },
    '/generate': {
      title: `暗号資産QRコードを生成 | ${productName}`,
      description: '安全にスキャンできるスタイルとローカル保存のプリセットで暗号資産決済QRコードを作成します。'
    }
  },
  es: {
    '/': {
      title: `Generador de códigos QR cripto | ${productName}`,
      description: 'Genera códigos QR cripto localmente en el navegador para direcciones públicas y solicitudes de pago.'
    }
  },
  de: {
    '/': {
      title: `Krypto-QR-Code-Generator | ${productName}`,
      description: 'Erzeuge Krypto-QR-Codes lokal im Browser für öffentliche Adressen und Zahlungsanfragen.'
    }
  }
};

const routeLabelTranslations: Partial<Record<Locale, Record<string, string>>> = {
  fr: {
    Generator: 'Générateur',
    Verify: 'Vérifier',
    Saved: 'Enregistrés',
    Markets: 'Marchés',
    Fees: 'Frais',
    Exchanges: 'Exchanges',
    Security: 'Sécurité',
    Privacy: 'Confidentialité',
    Terms: 'Conditions',
    FAQ: 'FAQ'
  },
  ar: {
    Generator: 'المولد',
    Verify: 'تحقق',
    Saved: 'المحفوظات',
    Markets: 'الأسواق',
    Fees: 'الرسوم',
    Exchanges: 'المنصات',
    Security: 'الأمان',
    Privacy: 'الخصوصية',
    Terms: 'الشروط',
    FAQ: 'الأسئلة'
  }
};

export function localizeStaticRoute(pathname: string, route: StaticRouteConfig, locale: Locale): StaticRouteConfig {
  const translated = staticTranslations[locale]?.[pathname];
  if (!translated) return route;
  return { ...route, ...translated };
}

export function localizeBreadcrumbLabel(label: string, locale: Locale) {
  return routeLabelTranslations[locale]?.[label] ?? label;
}

export function localizeLandingPage(page: LandingPage, locale: Locale = defaultLocale): LandingPage {
  if (locale === defaultLocale || locale === 'en-GB') return page;

  const localizedName = page.name;
  const title =
    page.template === 'generator'
      ? `${localizedName} QR Code Generator | ${productName}`
      : page.template === 'checker'
        ? `${page.headline} | ${productName}`
        : page.title;

  const description =
    locale === 'fr'
      ? page.template === 'generator'
        ? `Générez des QR codes ${localizedName} localement dans votre navigateur avec un style lisible au scan et sans connexion de portefeuille.`
        : page.template === 'checker'
          ? `Vérifiez les formats publics ${localizedName}, les liens d'explorateur et les payloads QR avant utilisation.`
          : `Comprenez comment fonctionnent les QR codes ${localizedName}, la compatibilité des portefeuilles et les vérifications à faire.`
      : locale === 'ar'
        ? page.template === 'generator'
          ? `أنشئ رموز QR لـ ${localizedName} محلياً في المتصفح بدون اتصال بالمحفظة.`
          : page.description
        : page.description;

  return {
    ...page,
    title,
    description,
    ctaHref: page.ctaHref,
    lastModified: page.lastModified
  };
}
