import { defaultLocale, type Locale } from '../locales';
import { enMessages, type Messages } from './en';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (...args: never[]) => unknown ? T[K] : T[K] extends object ? DeepPartial<T[K]> : T[K];
};

const localizedMessages: Partial<Record<Locale, DeepPartial<Messages>>> = {
  'en-GB': {
    nav: {
      saved: 'Saved',
      displayCurrency: 'Display currency'
    }
  },
  es: {
    nav: {
      generator: 'Generador',
      verify: 'Verificar',
      saved: 'Guardados',
      markets: 'Mercados',
      fees: 'Comisiones',
      exchanges: 'Exchanges',
      api: 'API',
      faq: 'FAQ',
      security: 'Seguridad',
      privacy: 'Privacidad',
      more: 'Más',
      language: 'Idioma',
      displayCurrency: 'Moneda',
      primaryNavigation: 'Navegación principal',
      mobileNavigation: 'Navegación móvil',
      defaultCurrency: 'Moneda predeterminada'
    }
  },
  pt: {
    nav: {
      generator: 'Gerador',
      verify: 'Verificar',
      saved: 'Salvos',
      markets: 'Mercados',
      fees: 'Taxas',
      exchanges: 'Exchanges',
      faq: 'FAQ',
      security: 'Segurança',
      privacy: 'Privacidade',
      more: 'Mais',
      language: 'Idioma'
    }
  },
  uk: {
    nav: {
      generator: 'Генератор',
      verify: 'Перевірка',
      saved: 'Збережені',
      markets: 'Ринки',
      fees: 'Комісії',
      exchanges: 'Біржі',
      faq: 'FAQ',
      security: 'Безпека',
      privacy: 'Приватність',
      more: 'Ще',
      language: 'Мова'
    }
  },
  nl: {
    nav: {
      generator: 'Generator',
      verify: 'Controleren',
      saved: 'Opgeslagen',
      markets: 'Markten',
      fees: 'Kosten',
      exchanges: 'Exchanges',
      faq: 'FAQ',
      security: 'Beveiliging',
      privacy: 'Privacy',
      more: 'Meer',
      language: 'Taal'
    }
  },
  de: {
    nav: {
      generator: 'Generator',
      verify: 'Prüfen',
      saved: 'Gespeichert',
      markets: 'Märkte',
      fees: 'Gebühren',
      exchanges: 'Börsen',
      faq: 'FAQ',
      security: 'Sicherheit',
      privacy: 'Datenschutz',
      more: 'Mehr',
      language: 'Sprache'
    }
  },
  fr: {
    nav: {
      generator: 'Générateur',
      verify: 'Vérifier',
      saved: 'Enregistrés',
      markets: 'Marchés',
      fees: 'Frais',
      exchanges: 'Exchanges',
      api: 'API',
      faq: 'FAQ',
      security: 'Sécurité',
      privacy: 'Confidentialité',
      more: 'Plus',
      language: 'Langue',
      displayCurrency: 'Devise',
      primaryNavigation: 'Navigation principale',
      mobileNavigation: 'Navigation mobile',
      defaultCurrency: 'Devise par défaut'
    },
    shell: {
      localPrivacyModel: 'Modèle de confidentialité local',
      dataBadge: 'Vos données ne quittent jamais votre navigateur',
      privacyNotice: 'Avis de confidentialité',
      securityModel: 'Modèle de sécurité',
      terms: "Conditions d'utilisation",
      noAccounts: 'Aucun compte. Aucune connexion de portefeuille.',
      forPrivacy: 'pour la confidentialité.'
    }
  },
  it: {
    nav: {
      generator: 'Generatore',
      verify: 'Verifica',
      saved: 'Salvati',
      markets: 'Mercati',
      fees: 'Commissioni',
      exchanges: 'Exchange',
      faq: 'FAQ',
      security: 'Sicurezza',
      privacy: 'Privacy',
      more: 'Altro',
      language: 'Lingua'
    }
  },
  ru: {
    nav: {
      generator: 'Генератор',
      verify: 'Проверка',
      saved: 'Сохранено',
      markets: 'Рынки',
      fees: 'Комиссии',
      exchanges: 'Биржи',
      faq: 'FAQ',
      security: 'Безопасность',
      privacy: 'Конфиденциальность',
      more: 'Еще',
      language: 'Язык'
    }
  },
  ar: {
    nav: {
      generator: 'المولد',
      verify: 'تحقق',
      saved: 'المحفوظات',
      markets: 'الأسواق',
      fees: 'الرسوم',
      exchanges: 'المنصات',
      api: 'API',
      faq: 'الأسئلة',
      security: 'الأمان',
      privacy: 'الخصوصية',
      more: 'المزيد',
      language: 'اللغة',
      displayCurrency: 'عملة العرض',
      primaryNavigation: 'التنقل الرئيسي',
      mobileNavigation: 'تنقل الجوال',
      defaultCurrency: 'العملة الافتراضية'
    },
    shell: {
      localPrivacyModel: 'نموذج خصوصية محلي فقط',
      dataBadge: 'بياناتك لا تغادر متصفحك',
      privacyNotice: 'إشعار الخصوصية',
      securityModel: 'نموذج الأمان',
      terms: 'شروط الاستخدام',
      noAccounts: 'لا حسابات. لا اتصال بمحفظة.',
      forPrivacy: 'من أجل الخصوصية.'
    }
  },
  'zh-CN': {
    nav: {
      generator: '生成器',
      verify: '验证',
      saved: '已保存',
      markets: '市场',
      fees: '费用',
      exchanges: '交易所',
      faq: 'FAQ',
      security: '安全',
      privacy: '隐私',
      more: '更多',
      language: '语言'
    }
  },
  ja: {
    nav: {
      generator: '生成',
      verify: '検証',
      saved: '保存済み',
      markets: '市場',
      fees: '手数料',
      exchanges: '取引所',
      faq: 'FAQ',
      security: 'セキュリティ',
      privacy: 'プライバシー',
      more: 'その他',
      language: '言語'
    }
  },
  ko: {
    nav: {
      generator: '생성기',
      verify: '검증',
      saved: '저장됨',
      markets: '시장',
      fees: '수수료',
      exchanges: '거래소',
      faq: 'FAQ',
      security: '보안',
      privacy: '개인정보',
      more: '더보기',
      language: '언어'
    }
  }
};

function mergeMessages(base: Messages, partial: DeepPartial<Messages> | undefined): Messages {
  if (!partial) return base;

  return {
    nav: { ...base.nav, ...partial.nav },
    shell: { ...base.shell, ...partial.shell },
    landing: { ...base.landing, ...partial.landing }
  };
}

export function messagesForLocale(locale: Locale = defaultLocale): Messages {
  return mergeMessages(enMessages, localizedMessages[locale]);
}
