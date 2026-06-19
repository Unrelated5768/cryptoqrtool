import { productName, type FaqItem, type LandingPage, type LandingPageSection, type StaticRouteConfig } from '$lib/seoShared';
import { defaultLocale, type Locale } from './locales';
import { tr } from './phrases';
import { staticSeoTranslations } from './staticSeoTranslations';

type LandingWords = {
  qrGenerator: string;
  qrGuide: string;
  checker: string;
  addressChecker: string;
  transactionChecker: string;
  invoiceChecker: string;
  paymentTool: string;
  guideEyebrow: string;
  generatorEyebrow: (ticker?: string) => string;
  checkerEyebrow: (ticker?: string) => string;
  openGenerator: (name: string) => string;
  openChecker: (name: string) => string;
  body: (page: LandingPage, name: string) => string;
  description: (page: LandingPage, name: string) => string;
  benefits: (page: LandingPage, name: string) => LandingPageSection[];
  primarySections: (page: LandingPage, name: string) => LandingPageSection[];
  howToSteps: (page: LandingPage, name: string) => string[];
  trustPoints: (page: LandingPage, name: string) => string[];
  cautionItems: (page: LandingPage, name: string) => string[];
  faq: (page: LandingPage, name: string) => FaqItem[];
  chips: (page: LandingPage) => string[];
  cryptoQrName: string;
};

function englishLandingWords(): LandingWords {
  return {
    qrGenerator: 'QR Code Generator',
    qrGuide: 'Crypto QR Code Guide',
    checker: 'Checker',
    addressChecker: 'Address Checker',
    transactionChecker: 'Transaction Checker',
    invoiceChecker: 'Invoice Checker',
    paymentTool: 'payment QR tool',
    guideEyebrow: 'Crypto QR guide',
    generatorEyebrow: (ticker) => `${ticker ?? 'Crypto'} wallet QR tool`,
    checkerEyebrow: (ticker) => `${ticker ?? 'Crypto'} verification`,
    openGenerator: (name) => `Open ${name} QR generator`,
    openChecker: (name) => `Open ${name} checker`,
    body: (page, name) =>
      page.template === 'generator'
        ? `Generate a scan-ready ${name} QR code locally in your browser. Addresses, amounts, styling, custom logos, and presets stay browser-local.`
        : page.template === 'checker'
          ? `Check public ${name} addresses, invoices, transactions, and payment QR payloads before sharing or using them.`
          : `Learn how ${name} QR payloads work, what compatible wallets may read, and what to verify before scanning or sharing one.`,
    description: (page, name) =>
      page.template === 'generator'
        ? `Generate ${name} QR codes locally with scan-safe styling, browser-only presets, and no wallet connection.`
        : page.template === 'checker'
          ? `Check public ${name} crypto payload formats, validation status, and trusted explorer links before using a QR code.`
          : `Learn how ${name} crypto QR codes encode public payment data, wallet compatibility details, and safety checks.`,
    benefits: (page, name) => [
      {
        title: page.template === 'checker' ? 'Local validation' : 'Local workflow',
        body:
          page.template === 'checker'
            ? `Review public ${name} payload shape before opening explorers or sharing the result.`
            : `Create and review ${name} QR payloads in the browser without sending wallet data to an account service.`
      },
      {
        title: 'Wallet context',
        body: `Understand what wallets may scan, which fields still need manual confirmation, and why the final wallet screen matters.`
      },
      {
        title: 'No wallet connection',
        body: `${productName} never asks for seed phrases, private keys, exchange credentials, or signing permission.`
      }
    ],
    primarySections: (page, name) => [
      {
        title: page.template === 'generator' ? `How to create the ${name} QR` : `What the ${name} payload contains`,
        body:
          page.template === 'generator'
            ? `Enter the public destination, add supported payment details, review scan contrast, then export a fresh QR code.`
            : `The payload should contain public payment information only, such as an address, URI, invoice, or transaction identifier.`
      },
      {
        title: 'Compatibility notes',
        body: `Wallet support can vary. Some wallets scan only the destination, while others also parse amounts, chains, or token details.`
      },
      {
        title: 'Verification step',
        body: `Always confirm the recipient, network, token, amount, and fees inside a trusted wallet or explorer before funds move.`
      }
    ],
    howToSteps: (page, name) => [
      `Choose ${name} or open the generator with the network already selected.`,
      'Paste only public address, invoice, payment URI, or transaction data.',
      'Review contrast, quiet zone, amount, chain, and encoded payload.',
      'Export or share the QR only after checking the final wallet confirmation screen.'
    ],
    trustPoints: (_page, name) => [
      `${productName} handles ${name} payloads in the browser and does not connect to your wallet.`,
      'Saved addresses, QR presets, and uploaded logos remain local unless you export or share them.',
      'Never enter seed phrases, private keys, recovery codes, or exchange credentials.'
    ],
    cautionItems: (_page, name) => [
      `Verify every ${name} recipient and amount before sharing or paying a QR code.`,
      'Do not assume every wallet will honor optional amount, chain, or token parameters.',
      'Generate a new QR whenever an address, amount, invoice, chain, or style changes.'
    ],
    faq: (_page, name) => [
      {
        question: `Can I use ${productName} for ${name} without an account?`,
        answer: `Yes. ${productName} works in the browser and does not require an account or wallet connection.`
      },
      {
        question: `Should I verify a ${name} QR code after scanning it?`,
        answer: 'Yes. Always confirm the recipient, network, token, amount, and fees in the wallet before approving a transaction.'
      }
    ],
    chips: (page) =>
      page.template === 'checker'
        ? ['Validation', 'Explorer', 'Local']
        : page.template === 'guide'
          ? ['Guide', 'Wallet scan', 'Safety']
          : ['Address', 'Amount', 'Local']
    ,
    cryptoQrName: 'Crypto QR Code'
  };
}

const landingWords: Partial<Record<Locale, LandingWords>> = {
  es: {
    ...englishLandingWords(),
    qrGenerator: 'Generador de códigos QR',
    qrGuide: 'Guía de códigos QR cripto',
    checker: 'Comprobador',
    addressChecker: 'Comprobador de direcciones',
    transactionChecker: 'Comprobador de transacciones',
    invoiceChecker: 'Comprobador de facturas',
    paymentTool: 'herramienta QR de pago',
    guideEyebrow: 'Guía de QR cripto',
    generatorEyebrow: (ticker) => `Herramienta QR de cartera ${ticker ?? 'cripto'}`,
    checkerEyebrow: (ticker) => `Verificación ${ticker ?? 'cripto'}`,
    openGenerator: (name) => `Abrir generador QR de ${name}`,
    openChecker: (name) => `Abrir comprobador de ${name}`,
    body: (page, name) =>
      page.template === 'generator'
        ? `Genera un código QR de ${name} listo para escanear localmente en tu navegador. Direcciones, importes, estilos, logos y preajustes permanecen locales.`
        : page.template === 'checker'
          ? `Comprueba direcciones públicas, facturas, transacciones y payloads QR de ${name} antes de compartirlos o usarlos.`
          : `Aprende cómo funcionan los payloads QR de ${name}, qué pueden leer las carteras compatibles y qué debes verificar antes de escanear o compartir.`,
    description: (page, name) =>
      page.template === 'generator'
        ? `Genera códigos QR de ${name} localmente con estilos seguros para escaneo, preajustes del navegador y sin conexión de cartera.`
        : page.template === 'checker'
          ? `Comprueba formatos públicos de ${name}, estado de validación y enlaces de explorador antes de usar un QR.`
          : `Aprende cómo los QR de ${name} codifican datos públicos de pago, compatibilidad de carteras y verificaciones de seguridad.`,
    benefits: (_page, name) => [
      { title: 'Flujo local', body: `Crea y revisa payloads QR de ${name} en el navegador sin enviar datos de cartera a un servicio de cuenta.` },
      { title: 'Contexto de cartera', body: 'Entiende qué puede leer una cartera y qué datos siguen requiriendo confirmación manual.' },
      { title: 'Sin conexión de cartera', body: `${productName} nunca solicita frases semilla, claves privadas, credenciales ni permisos de firma.` }
    ],
    primarySections: (_page, name) => [
      { title: `Qué contiene el QR de ${name}`, body: 'El payload debe incluir solo información pública, como dirección, URI de pago, factura o identificador de transacción.' },
      { title: 'Compatibilidad', body: 'Algunas carteras solo leen el destino; otras también interpretan importes, cadenas o detalles del token.' },
      { title: 'Verificación final', body: 'Confirma destinatario, red, token, importe y comisiones en una cartera o explorador de confianza.' }
    ],
    howToSteps: (_page, name) => [`Elige ${name} o abre el generador con la red seleccionada.`, 'Pega solo datos públicos.', 'Revisa contraste, importe, cadena y payload.', 'Comparte el QR solo tras verificarlo en la cartera.'],
    trustPoints: (_page, name) => [`${productName} procesa ${name} en el navegador.`, 'Los datos guardados permanecen locales.', 'Nunca introduzcas frases semilla ni claves privadas.'],
    cautionItems: (_page, name) => [`Verifica cada destinatario e importe de ${name}.`, 'No todas las carteras respetan parámetros opcionales.', 'Genera un QR nuevo si cambia cualquier dato.'],
    faq: (_page, name) => [
      { question: `¿Puedo usar ${productName} para ${name} sin cuenta?`, answer: 'Sí. Funciona en el navegador y no requiere conexión de cartera.' },
      { question: `¿Debo verificar un QR de ${name} después de escanearlo?`, answer: 'Sí. Confirma destinatario, red, token, importe y comisiones antes de aprobar.' }
    ],
    chips: (page) => (page.template === 'checker' ? ['Validación', 'Explorador', 'Local'] : page.template === 'guide' ? ['Guía', 'Cartera', 'Seguridad'] : ['Dirección', 'Importe', 'Local']),
    cryptoQrName: 'Código QR cripto'
  },
  fr: {
    ...englishLandingWords(),
    qrGenerator: 'Générateur de QR code',
    qrGuide: 'Guide des QR codes crypto',
    checker: 'Vérificateur',
    addressChecker: "Vérificateur d'adresse",
    transactionChecker: 'Vérificateur de transaction',
    invoiceChecker: 'Vérificateur de facture',
    paymentTool: 'outil QR de paiement',
    guideEyebrow: 'Guide QR crypto',
    generatorEyebrow: (ticker) => `Outil QR de portefeuille ${ticker ?? 'crypto'}`,
    checkerEyebrow: (ticker) => `Vérification ${ticker ?? 'crypto'}`,
    openGenerator: (name) => `Ouvrir le générateur QR ${name}`,
    openChecker: (name) => `Ouvrir le vérificateur ${name}`,
    body: (page, name) =>
      page.template === 'generator'
        ? `Générez un QR code ${name} prêt à scanner localement dans votre navigateur. Les adresses, montants, styles, logos et préréglages restent locaux.`
        : page.template === 'checker'
          ? `Vérifiez les adresses publiques, factures, transactions et payloads QR ${name} avant de les partager ou de les utiliser.`
          : `Comprenez le fonctionnement des payloads QR ${name}, ce que les portefeuilles compatibles peuvent lire et les points à vérifier.`,
    description: (page, name) =>
      page.template === 'generator'
        ? `Générez des QR codes ${name} localement avec un style lisible, des préréglages locaux et aucune connexion de portefeuille.`
        : page.template === 'checker'
          ? `Vérifiez les formats publics ${name}, l'état de validation et les liens d'explorateur avant d'utiliser un QR.`
          : `Découvrez comment les QR codes ${name} encodent des données publiques de paiement, la compatibilité des portefeuilles et les contrôles de sécurité.`,
    benefits: (_page, name) => [
      { title: 'Flux local', body: `Créez et vérifiez les payloads QR ${name} dans le navigateur sans envoyer de données de portefeuille.` },
      { title: 'Contexte portefeuille', body: 'Comprenez ce qu’un portefeuille peut lire et ce qui doit rester confirmé manuellement.' },
      { title: 'Aucune connexion de portefeuille', body: `${productName} ne demande jamais de phrase de récupération, clé privée, identifiant ou signature.` }
    ],
    primarySections: (_page, name) => [
      { title: `Ce que contient le QR ${name}`, body: 'Le payload doit contenir uniquement des informations publiques : adresse, URI, facture ou identifiant de transaction.' },
      { title: 'Compatibilité', body: 'Certains portefeuilles lisent seulement la destination; d’autres interprètent aussi montants, chaînes ou tokens.' },
      { title: 'Vérification finale', body: 'Confirmez destinataire, réseau, token, montant et frais dans un portefeuille ou explorateur fiable.' }
    ],
    howToSteps: (_page, name) => [`Choisissez ${name} ou ouvrez le générateur avec le réseau présélectionné.`, 'Collez uniquement des données publiques.', 'Vérifiez contraste, montant, chaîne et payload.', 'Partagez le QR seulement après contrôle dans le portefeuille.'],
    trustPoints: (_page, name) => [`${productName} traite ${name} dans le navigateur.`, 'Les données sauvegardées restent locales.', 'Ne saisissez jamais de phrase de récupération ni de clé privée.'],
    cautionItems: (_page, name) => [`Vérifiez chaque destinataire et montant ${name}.`, 'Tous les portefeuilles ne respectent pas les paramètres facultatifs.', 'Générez un nouveau QR si une donnée change.'],
    faq: (_page, name) => [
      { question: `Puis-je utiliser ${productName} pour ${name} sans compte ?`, answer: 'Oui. L’outil fonctionne dans le navigateur sans connexion de portefeuille.' },
      { question: `Dois-je vérifier un QR ${name} après scan ?`, answer: 'Oui. Confirmez destinataire, réseau, token, montant et frais avant approbation.' }
    ],
    chips: (page) => (page.template === 'checker' ? ['Validation', 'Explorateur', 'Local'] : page.template === 'guide' ? ['Guide', 'Portefeuille', 'Sécurité'] : ['Adresse', 'Montant', 'Local']),
    cryptoQrName: 'QR code crypto'
  }
};

const translatedLocales: Locale[] = ['pt', 'uk', 'nl', 'de', 'it', 'ru', 'ar', 'zh-CN', 'ja', 'ko'];

const generatedLandingLabels: Partial<
  Record<
    Locale,
    Pick<
      LandingWords,
      | 'qrGenerator'
      | 'qrGuide'
      | 'checker'
      | 'addressChecker'
      | 'transactionChecker'
      | 'invoiceChecker'
      | 'paymentTool'
      | 'guideEyebrow'
    > & {
      generatorEyebrow: LandingWords['generatorEyebrow'];
      checkerEyebrow: LandingWords['checkerEyebrow'];
      openGenerator: LandingWords['openGenerator'];
      openChecker: LandingWords['openChecker'];
    }
  >
> = {
  pt: {
    qrGenerator: 'Gerador de códigos QR',
    qrGuide: 'Guia de códigos QR cripto',
    checker: 'Verificador',
    addressChecker: 'Verificador de endereços',
    transactionChecker: 'Verificador de transações',
    invoiceChecker: 'Verificador de faturas',
    paymentTool: 'ferramenta QR de pagamento',
    guideEyebrow: 'Guia QR cripto',
    generatorEyebrow: (ticker) => `Ferramenta QR de carteira ${ticker ?? 'cripto'}`,
    checkerEyebrow: (ticker) => `Verificação ${ticker ?? 'cripto'}`,
    openGenerator: (name) => `Abrir gerador QR de ${name}`,
    openChecker: (name) => `Abrir verificador de ${name}`
  },
  ru: {
    qrGenerator: 'Генератор QR-кодов',
    qrGuide: 'Руководство по крипто QR-кодам',
    checker: 'Проверка',
    addressChecker: 'Проверка адреса',
    transactionChecker: 'Проверка транзакции',
    invoiceChecker: 'Проверка инвойса',
    paymentTool: 'инструмент платежных QR',
    guideEyebrow: 'Руководство по крипто QR',
    generatorEyebrow: (ticker) => `QR-инструмент кошелька ${ticker ?? 'крипто'}`,
    checkerEyebrow: (ticker) => `Проверка ${ticker ?? 'крипто'}`,
    openGenerator: (name) => `Открыть QR-генератор ${name}`,
    openChecker: (name) => `Открыть проверку ${name}`
  },
  uk: {
    qrGenerator: 'Генератор QR-кодів',
    qrGuide: 'Посібник з крипто QR-кодів',
    checker: 'Перевірка',
    addressChecker: 'Перевірка адреси',
    transactionChecker: 'Перевірка транзакції',
    invoiceChecker: 'Перевірка інвойса',
    paymentTool: 'інструмент платіжних QR',
    guideEyebrow: 'Посібник з крипто QR',
    generatorEyebrow: (ticker) => `QR-інструмент гаманця ${ticker ?? 'крипто'}`,
    checkerEyebrow: (ticker) => `Перевірка ${ticker ?? 'крипто'}`,
    openGenerator: (name) => `Відкрити QR-генератор ${name}`,
    openChecker: (name) => `Відкрити перевірку ${name}`
  },
  nl: {
    qrGenerator: 'QR-codegenerator',
    qrGuide: 'Crypto QR-codegids',
    checker: 'Checker',
    addressChecker: 'Adreschecker',
    transactionChecker: 'Transactiechecker',
    invoiceChecker: 'Factuurchecker',
    paymentTool: 'betaal-QR-tool',
    guideEyebrow: 'Crypto QR-gids',
    generatorEyebrow: (ticker) => `${ticker ?? 'crypto'} wallet-QR-tool`,
    checkerEyebrow: (ticker) => `${ticker ?? 'crypto'} verificatie`,
    openGenerator: (name) => `${name} QR-generator openen`,
    openChecker: (name) => `${name} checker openen`
  },
  de: {
    qrGenerator: 'QR-Code-Generator',
    qrGuide: 'Krypto-QR-Code-Leitfaden',
    checker: 'Prüfer',
    addressChecker: 'Adressprüfer',
    transactionChecker: 'Transaktionsprüfer',
    invoiceChecker: 'Rechnungsprüfer',
    paymentTool: 'Zahlungs-QR-Tool',
    guideEyebrow: 'Krypto-QR-Leitfaden',
    generatorEyebrow: (ticker) => `${ticker ?? 'Krypto'} Wallet-QR-Tool`,
    checkerEyebrow: (ticker) => `${ticker ?? 'Krypto'} Prüfung`,
    openGenerator: (name) => `${name}-QR-Generator öffnen`,
    openChecker: (name) => `${name}-Prüfer öffnen`
  },
  it: {
    qrGenerator: 'Generatore di codici QR',
    qrGuide: 'Guida ai codici QR crypto',
    checker: 'Verificatore',
    addressChecker: 'Verificatore indirizzi',
    transactionChecker: 'Verificatore transazioni',
    invoiceChecker: 'Verificatore fatture',
    paymentTool: 'strumento QR di pagamento',
    guideEyebrow: 'Guida QR crypto',
    generatorEyebrow: (ticker) => `Strumento QR wallet ${ticker ?? 'crypto'}`,
    checkerEyebrow: (ticker) => `Verifica ${ticker ?? 'crypto'}`,
    openGenerator: (name) => `Apri il generatore QR ${name}`,
    openChecker: (name) => `Apri il verificatore ${name}`
  },
  ar: {
    qrGenerator: 'مولد رموز QR',
    qrGuide: 'دليل رموز QR للعملات الرقمية',
    checker: 'مدقق',
    addressChecker: 'مدقق العناوين',
    transactionChecker: 'مدقق المعاملات',
    invoiceChecker: 'مدقق الفواتير',
    paymentTool: 'أداة QR للدفع',
    guideEyebrow: 'دليل QR للعملات الرقمية',
    generatorEyebrow: (ticker) => `أداة QR لمحفظة ${ticker ?? 'العملات الرقمية'}`,
    checkerEyebrow: (ticker) => `تحقق ${ticker ?? 'العملات الرقمية'}`,
    openGenerator: (name) => `فتح مولد QR لـ ${name}`,
    openChecker: (name) => `فتح مدقق ${name}`
  },
  'zh-CN': {
    qrGenerator: 'QR 码生成器',
    qrGuide: '加密货币 QR 码指南',
    checker: '检查器',
    addressChecker: '地址检查器',
    transactionChecker: '交易检查器',
    invoiceChecker: '发票检查器',
    paymentTool: '付款 QR 工具',
    guideEyebrow: '加密货币 QR 指南',
    generatorEyebrow: (ticker) => `${ticker ?? '加密货币'} 钱包 QR 工具`,
    checkerEyebrow: (ticker) => `${ticker ?? '加密货币'} 验证`,
    openGenerator: (name) => `打开 ${name} QR 生成器`,
    openChecker: (name) => `打开 ${name} 检查器`
  },
  ja: {
    qrGenerator: 'QRコード生成ツール',
    qrGuide: '暗号資産QRコードガイド',
    checker: 'チェッカー',
    addressChecker: 'アドレスチェッカー',
    transactionChecker: 'トランザクションチェッカー',
    invoiceChecker: '請求書チェッカー',
    paymentTool: '支払いQRツール',
    guideEyebrow: '暗号資産QRガイド',
    generatorEyebrow: (ticker) => `${ticker ?? '暗号資産'}ウォレットQRツール`,
    checkerEyebrow: (ticker) => `${ticker ?? '暗号資産'}検証`,
    openGenerator: (name) => `${name} QR生成ツールを開く`,
    openChecker: (name) => `${name}チェッカーを開く`
  },
  ko: {
    qrGenerator: 'QR 코드 생성기',
    qrGuide: '암호화폐 QR 코드 가이드',
    checker: '검사기',
    addressChecker: '주소 검사기',
    transactionChecker: '거래 검사기',
    invoiceChecker: '인보이스 검사기',
    paymentTool: '결제 QR 도구',
    guideEyebrow: '암호화폐 QR 가이드',
    generatorEyebrow: (ticker) => `${ticker ?? '암호화폐'} 지갑 QR 도구`,
    checkerEyebrow: (ticker) => `${ticker ?? '암호화폐'} 검증`,
    openGenerator: (name) => `${name} QR 생성기 열기`,
    openChecker: (name) => `${name} 검사기 열기`
  }
};

for (const locale of translatedLocales) {
  const labels = generatedLandingLabels[locale];
  landingWords[locale] = {
    ...englishLandingWords(),
    qrGenerator: labels?.qrGenerator ?? (tr(locale, 'QR code generation API').replace(/API|接口|API للمطورين|API.*/i, '').trim() || tr(locale, 'QR preview')),
    qrGuide: labels?.qrGuide ?? tr(locale, 'Crypto QR Code FAQ'),
    checker: labels?.checker ?? tr(locale, 'Verify payload'),
    addressChecker: labels?.addressChecker ?? tr(locale, 'Address and transaction checker'),
    transactionChecker: labels?.transactionChecker ?? tr(locale, 'Address and transaction checker'),
    invoiceChecker: labels?.invoiceChecker ?? tr(locale, 'Address and transaction checker'),
    paymentTool: labels?.paymentTool ?? tr(locale, 'Payment details'),
    guideEyebrow: labels?.guideEyebrow ?? tr(locale, 'Help'),
    generatorEyebrow: labels?.generatorEyebrow ?? (() => tr(locale, 'Local QR generator')),
    checkerEyebrow: labels?.checkerEyebrow ?? (() => tr(locale, 'Verify crypto QR payloads')),
    openGenerator: labels?.openGenerator ?? (() => tr(locale, 'Open generator')),
    openChecker: labels?.openChecker ?? (() => tr(locale, 'Verify payload')),
    body: (page, name) =>
      page.template === 'generator'
        ? `${tr(locale, 'Generate crypto QR codes')}: ${name}. ${tr(locale, 'High-contrast output with quiet-zone enforcement.')}`
        : page.template === 'checker'
          ? `${tr(locale, 'Verify crypto QR payloads')}: ${name}. ${tr(locale, 'No seed phrases. No private keys.')}`
          : `${tr(locale, 'Crypto QR Code FAQ')}: ${name}. ${tr(locale, 'Still verify in your wallet')}.`,
    description: (page, name) =>
      page.template === 'generator'
        ? `${tr(locale, 'Generate crypto QR codes')} ${name} ${tr(locale, 'Local QR generator').toLowerCase()}.`
        : page.template === 'checker'
          ? `${tr(locale, 'Verify crypto QR payloads')} ${name}.`
          : `${tr(locale, 'Crypto QR Code FAQ')} ${name}.`,
    benefits: (_page, name) => [
      { title: tr(locale, 'Local QR generator'), body: `${tr(locale, 'Generate crypto QR codes')} ${name}.` },
      { title: tr(locale, 'Security note'), body: tr(locale, 'No seed phrases. No private keys.') },
      { title: tr(locale, 'QR preview'), body: tr(locale, 'High-contrast output with quiet-zone enforcement.') }
    ],
    primarySections: (_page, name) => [
      { title: tr(locale, 'Payload'), body: `${name}: ${tr(locale, 'Payload')}.` },
      { title: tr(locale, 'Wallet context'), body: tr(locale, 'Still verify in your wallet') },
      { title: tr(locale, 'Validation message'), body: tr(locale, 'Check before sharing') }
    ],
    howToSteps: (_page, name) => [tr(locale, 'Network'), name, tr(locale, 'Payload'), tr(locale, 'Verify payload')],
    trustPoints: () => [tr(locale, 'No seed phrases. No private keys.'), tr(locale, 'Security note'), tr(locale, 'Still verify in your wallet')],
    cautionItems: () => [tr(locale, 'Check before sharing'), tr(locale, 'Validation message'), tr(locale, 'Verify payload')],
    faq: (_page, name) => [
      { question: `${tr(locale, 'Crypto QR Code FAQ')} - ${name}`, answer: tr(locale, 'Still verify in your wallet') },
      { question: tr(locale, 'No seed phrases. No private keys.'), answer: tr(locale, 'Security note') }
    ],
    chips: (page) => (page.template === 'checker' ? [tr(locale, 'Validation message'), tr(locale, 'Explorer links'), tr(locale, 'Local QR generator')] : [tr(locale, 'Guide'), tr(locale, 'Wallet context'), tr(locale, 'Security note')]),
    cryptoQrName: tr(locale, 'Crypto QR Code FAQ').replace(/\s*(FAQ|الأسئلة|ヘルプ|도움말).*/i, '').trim() || 'Crypto QR'
  };
}

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
  },
  ru: {
    '/': {
      title: `Генератор крипто QR-кодов | ${productName}`,
      description:
        'Создавайте крипто QR-коды локально в браузере для публичных адресов и платежных запросов без подключения кошелька.',
      schemaName: 'Генератор крипто QR-кодов'
    },
    '/generate': {
      title: `Создать крипто QR-коды | ${productName}`,
      description: 'Создавайте платежные крипто QR-коды с безопасным для сканирования стилем и локальными пресетами.'
    },
    '/faq': {
      title: `FAQ по крипто QR-кодам | ${productName}`,
      description: 'Ответы о безопасности крипто QR-кодов, локальном хранении, аналитике и совместимости кошельков.'
    }
  },
  uk: {
    '/': {
      title: `Генератор крипто QR-кодів | ${productName}`,
      description:
        'Створюйте крипто QR-коди локально у браузері для публічних адрес і платіжних запитів без підключення гаманця.',
      schemaName: 'Генератор крипто QR-кодів'
    },
    '/generate': {
      title: `Створити крипто QR-коди | ${productName}`,
      description: 'Створюйте платіжні крипто QR-коди зі стилем, безпечним для сканування, і локальними пресетами.'
    },
    '/faq': {
      title: `FAQ про крипто QR-коди | ${productName}`,
      description: 'Відповіді про безпеку крипто QR-кодів, локальне зберігання, аналітику та сумісність гаманців.'
    }
  }
};

const routeLabelTranslations: Partial<Record<Locale, Record<string, string>>> = {
  fr: {
    Home: 'Accueil',
    Guide: 'Guide',
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
    Home: 'الرئيسية',
    Guide: 'الدليل',
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
  },
  ru: {
    Home: 'Главная',
    Guide: 'Руководство',
    Generator: 'Генератор',
    Verify: 'Проверка',
    Saved: 'Сохранено',
    Markets: 'Рынки',
    Fees: 'Комиссии',
    Exchanges: 'Биржи',
    Security: 'Безопасность',
    Privacy: 'Конфиденциальность',
    Terms: 'Условия',
    FAQ: 'FAQ'
  },
  uk: {
    Home: 'Головна',
    Guide: 'Посібник',
    Generator: 'Генератор',
    Verify: 'Перевірка',
    Saved: 'Збережені',
    Markets: 'Ринки',
    Fees: 'Комісії',
    Exchanges: 'Біржі',
    Security: 'Безпека',
    Privacy: 'Приватність',
    Terms: 'Умови',
    FAQ: 'FAQ'
  }
};

function localizeFaq(items: FaqItem[] | undefined, locale: Locale) {
  return items?.map((item) => ({
    question: tr(locale, item.question),
    answer: tr(locale, item.answer)
  }));
}

function localizeStaticText(text: string | undefined, locale: Locale) {
  if (!text || locale === defaultLocale || locale === 'en-GB') return text;

  const translations = staticSeoTranslations[locale];
  if (!translations) return text;

  if (text in translations) return translations[text];

  const productSuffix = ` | ${productName}`;
  if (text.endsWith(productSuffix)) {
    const base = text.slice(0, -productSuffix.length);
    return `${translations[base] ?? base}${productSuffix}`;
  }

  return text;
}

function localizeStaticFields(route: StaticRouteConfig, locale: Locale): Partial<StaticRouteConfig> {
  return {
    title: localizeStaticText(route.title, locale),
    description: localizeStaticText(route.description, locale),
    schemaName: localizeStaticText(route.schemaName, locale),
    breadcrumbLabel: localizeStaticText(route.breadcrumbLabel, locale)
  };
}

export function localizeStaticRoute(pathname: string, route: StaticRouteConfig, locale: Locale): StaticRouteConfig {
  const translated = staticTranslations[locale]?.[pathname];
  return {
    ...route,
    ...localizeStaticFields(route, locale),
    ...translated,
    faq: localizeFaq(route.faq, locale)
  };
}

export function localizeBreadcrumbLabel(label: string, locale: Locale) {
  return routeLabelTranslations[locale]?.[label] ?? tr(locale, label);
}

function checkerLabel(page: LandingPage, words: LandingWords) {
  if (page.slug.includes('transaction')) return words.transactionChecker;
  if (page.slug.includes('invoice')) return words.invoiceChecker;
  if (page.slug.includes('address')) return words.addressChecker;
  return words.checker;
}

function localizedName(page: LandingPage, words: LandingWords) {
  return page.slug === 'crypto-generate-qrcode' ? words.cryptoQrName : page.name;
}

export function localizeLandingPage(page: LandingPage, locale: Locale = defaultLocale): LandingPage {
  if (locale === defaultLocale || locale === 'en-GB') return page;

  const words = landingWords[locale] ?? englishLandingWords();
  const name = localizedName(page, words);
  const templateTitle =
    page.template === 'generator' ? words.qrGenerator : page.template === 'checker' ? checkerLabel(page, words) : words.qrGuide;
  const headline = page.template === 'guide' && page.slug !== 'crypto-generate-qrcode' ? `${name} ${words.qrGuide}` : `${name} ${templateTitle}`;

  return {
    ...page,
    name,
    title: `${headline} | ${productName}`,
    description: words.description(page, name),
    headline,
    eyebrow:
      page.template === 'generator'
        ? words.generatorEyebrow(page.ticker)
        : page.template === 'checker'
          ? words.checkerEyebrow(page.ticker)
          : words.guideEyebrow,
    body: words.body(page, name),
    ctaLabel: page.template === 'checker' ? words.openChecker(name) : words.openGenerator(name),
    chips: words.chips(page),
    benefits: words.benefits(page, name),
    primarySections: words.primarySections(page, name),
    howToSteps: page.howToSteps?.length ? words.howToSteps(page, name) : undefined,
    trustPoints: page.trustPoints?.length ? words.trustPoints(page, name) : undefined,
    cautionItems: page.cautionItems?.length ? words.cautionItems(page, name) : undefined,
    faq: words.faq(page, name),
    ctaHref: page.ctaHref,
    lastModified: page.lastModified
  };
}
