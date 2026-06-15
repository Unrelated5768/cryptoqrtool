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
      language: 'Мова',
      displayCurrency: 'Валюта',
      primaryNavigation: 'Основна навігація',
      mobileNavigation: 'Мобільна навігація',
      defaultCurrency: 'Типова валюта'
    },
    shell: {
      localPrivacyModel: 'Локальна модель приватності',
      updateTitle: 'Доступна нова версія.',
      updateBody: 'Перезавантажте сторінку, щоб використати останнє розгортання.',
      reload: 'Перезавантажити',
      dismissUpdate: 'Закрити сповіщення про оновлення',
      dataBadge: 'Ваші дані не залишають браузер',
      footerBody: 'CryptoQR Tool створює QR-payload у браузері. Збережені адреси, пресети й користувацькі логотипи залишаються в локальному сховищі без рекламних cookie.',
      footerGenerator: (ticker: string) => `Генератор QR для ${ticker}`,
      privacyNotice: 'Повідомлення про приватність',
      securityModel: 'Модель безпеки',
      terms: 'Умови використання',
      noAccounts: 'Без акаунтів. Без підключення гаманця.',
      madeWith: 'Створено з',
      forPrivacy: 'для приватності.',
      viewSource: 'Переглянути код на GitHub',
      version: (version: string) => `Версія ${version}`,
      homeAria: 'Домашня сторінка CryptoQR Tool'
    },
    landing: {
      openAllNetworks: 'Відкрити всі мережі',
      privacyModel: 'Модель приватності',
      readGuide: (name: string) => `Прочитати посібник QR для ${name}`,
      openGenerator: (name: string) => `Відкрити генератор ${name}`,
      createQrCode: (name: string) => `Створити QR-код ${name}`,
      nextSteps: 'Наступні кроки для цієї мережі',
      relatedTools: 'Пов’язані генератори та посібники',
      relatedGenerator: 'Пов’язані інструменти та посібники',
      guideDetails: 'Деталі посібника',
      checkerCovers: 'Що перевіряє інструмент',
      generatorCovers: 'Що охоплює цей генератор',
      mistakesAvoid: 'Поширені помилки, яких слід уникати',
      trustNotes: 'Нотатки про довіру та перевірку',
      howToSafely: 'Як безпечно створити',
      trustSignals: 'Ознаки довіри',
      guideCautions: 'Застереження посібника',
      commonMistakes: 'Поширені помилки',
      faq: 'Поширені запитання',
      guideRelatedBody: 'Перейдіть від пояснення до дії за допомогою відповідних сторінок генератора або перевірки.',
      checkerRelatedBody: 'Створіть або перевірте відповідний QR-процес після того, як payload виглядає коректно.',
      generatorRelatedBody: 'Відкрийте відповідний посібник або перевірку, перш ніж публічно поширювати QR-код.'
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
      language: 'Язык',
      displayCurrency: 'Валюта',
      primaryNavigation: 'Основная навигация',
      mobileNavigation: 'Мобильная навигация',
      defaultCurrency: 'Валюта по умолчанию'
    },
    shell: {
      localPrivacyModel: 'Локальная модель приватности',
      updateTitle: 'Доступна новая версия.',
      updateBody: 'Перезагрузите страницу, чтобы использовать последний деплой.',
      reload: 'Перезагрузить',
      dismissUpdate: 'Закрыть уведомление об обновлении',
      dataBadge: 'Ваши данные не покидают браузер',
      footerBody: 'CryptoQR Tool создает QR-нагрузки в браузере. Сохраненные адреса, пресеты и пользовательские логотипы остаются в локальном хранилище без рекламных cookie.',
      footerGenerator: (ticker: string) => `Генератор QR для ${ticker}`,
      privacyNotice: 'Уведомление о конфиденциальности',
      securityModel: 'Модель безопасности',
      terms: 'Условия использования',
      noAccounts: 'Без аккаунтов. Без подключения кошелька.',
      madeWith: 'Сделано с',
      forPrivacy: 'для приватности.',
      viewSource: 'Посмотреть код на GitHub',
      version: (version: string) => `Версия ${version}`,
      homeAria: 'Главная страница CryptoQR Tool'
    },
    landing: {
      openAllNetworks: 'Открыть все сети',
      privacyModel: 'Модель приватности',
      readGuide: (name: string) => `Прочитать руководство QR для ${name}`,
      openGenerator: (name: string) => `Открыть генератор ${name}`,
      createQrCode: (name: string) => `Создать QR-код ${name}`,
      nextSteps: 'Следующие шаги для этой сети',
      relatedTools: 'Связанные генераторы и руководства',
      relatedGenerator: 'Связанные инструменты и руководства',
      guideDetails: 'Детали руководства',
      checkerCovers: 'Что проверяет инструмент',
      generatorCovers: 'Что охватывает этот генератор',
      mistakesAvoid: 'Распространенные ошибки',
      trustNotes: 'Заметки о доверии и проверке',
      howToSafely: 'Как создать безопасно',
      trustSignals: 'Сигналы доверия',
      guideCautions: 'Предостережения руководства',
      commonMistakes: 'Распространенные ошибки',
      faq: 'Часто задаваемые вопросы',
      guideRelatedBody: 'Перейдите от объяснения к действию с помощью соответствующих страниц генератора или проверки.',
      checkerRelatedBody: 'Создайте или проверьте соответствующий QR-процесс после того, как нагрузка выглядит корректно.',
      generatorRelatedBody: 'Откройте соответствующее руководство или проверку перед публичным распространением QR-кода.'
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
