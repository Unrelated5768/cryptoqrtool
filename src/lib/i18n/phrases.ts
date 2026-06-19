import { defaultLocale, type Locale } from './locales';
import { generatedPhraseTranslations } from './generatedPhraseTranslations';

type PhraseMap = Record<string, string>;

const es: PhraseMap = {
  'Local QR generator': 'Generador QR local',
  'Generate crypto QR codes': 'Generar códigos QR cripto',
  'Build address-only, amount payment, or Bitcoin Lightning invoice QR payloads for Monero, Bitcoin, Ethereum/EVM, Solana, Litecoin, USDC, and USDT. QR styling stays local. Switch to custom mode to design an arbitrary QR payload by hand.':
    'Crea payloads QR solo con dirección, con importe o con factura Bitcoin Lightning para Monero, Bitcoin, Ethereum/EVM, Solana, Litecoin, USDC y USDT. El estilo del QR permanece local. Cambia al modo personalizado para diseñar cualquier payload QR manualmente.',
  'Payment details': 'Detalles del pago',
  'Automatic mode detects XMR, BTC, BTC Lightning invoices, ETH/EVM, LTC, or SOL from the address format. Select USDC or USDT manually for ERC-20 token payment URIs.':
    'El modo automático detecta XMR, BTC, facturas BTC Lightning, ETH/EVM, LTC o SOL por el formato de la dirección. Selecciona USDC o USDT manualmente para URI de pago ERC-20.',
  Guided: 'Guiado',
  'Custom payload': 'Payload personalizado',
  Network: 'Red',
  'Automatic from address': 'Automático desde la dirección',
  'Supported payment networks': 'Redes de pago compatibles',
  'Market assets': 'Activos de mercado',
  'Token chain': 'Cadena del token',
  'EVM chain': 'Cadena EVM',
  'Payload standard': 'Estándar del payload',
  'Payment URI': 'URI de pago',
  'CAIP-19 asset ID': 'ID de activo CAIP-19',
  'Recipient address': 'Dirección del destinatario',
  'Lightning invoice': 'Factura Lightning',
  'Paste address': 'Pegar dirección',
  'Copy address': 'Copiar dirección',
  'Address copied.': 'Dirección copiada.',
  'Optional amount': 'Importe opcional',
  'Local save label': 'Etiqueta local',
  'Fiat estimate': 'Estimación fiat',
  'Save address': 'Guardar dirección',
  Payload: 'Payload',
  'Paste payload': 'Pegar payload',
  'Copy payload': 'Copiar payload',
  'Payload copied.': 'Payload copiado.',
  'Check before sharing': 'Comprobar antes de compartir',
  'Open this generated payload in the verifier.': 'Abre este payload generado en el verificador.',
  'Verify payload': 'Verificar payload',
  'Save current style': 'Guardar estilo actual',
  'Custom logos are stored as browser-local data URLs only when you save a style preset.':
    'Los logos personalizados solo se guardan como URL de datos locales del navegador al guardar un ajuste de estilo.',
  'Preset name': 'Nombre del preajuste',
  'Save preset': 'Guardar preajuste',
  'QR preview': 'Vista previa del QR',
  'High-contrast output with quiet-zone enforcement.': 'Salida de alto contraste con zona silenciosa aplicada.',
  'Scan warning': 'Advertencia de escaneo',
  'Scan safe': 'Escaneo seguro',
  'Enter a valid address to generate a QR code.': 'Introduce una dirección válida para generar un código QR.',
  'No payload yet': 'Aún no hay payload',
  Copied: 'Copiado',
  Copy: 'Copiar',
  Share: 'Compartir',
  'Style editor': 'Editor de estilo',
  'Presets keep contrast and quiet-zone defaults conservative.': 'Los preajustes mantienen valores conservadores de contraste y zona silenciosa.',
  'Built-in presets': 'Preajustes incluidos',
  Logo: 'Logo',
  'No embedded logo selected.': 'No hay logo incrustado seleccionado.',
  'Custom uploaded logo selected.': 'Logo personalizado subido seleccionado.',
  'Catalog logo selected.': 'Logo de catálogo seleccionado.',
  Color: 'Color',
  Black: 'Negro',
  White: 'Blanco',
  None: 'Ninguno',
  Custom: 'Personalizado',
  'Upload custom logo': 'Subir logo personalizado',
  Dots: 'Puntos',
  Square: 'Cuadrado',
  Rounded: 'Redondeado',
  Classy: 'Clásico',
  'Extra rounded': 'Extra redondeado',
  'Corner square': 'Esquina cuadrada',
  'Corner dot': 'Punto de esquina',
  'Color mode': 'Modo de color',
  'Solid foreground': 'Primer plano sólido',
  'Gradient foreground': 'Primer plano degradado',
  'Preset palette': 'Paleta predefinida',
  Foreground: 'Primer plano',
  'Gradient end': 'Fin del degradado',
  Background: 'Fondo',
  'Address and transaction checker': 'Comprobador de direcciones y transacciones',
  'Verify crypto QR payloads': 'Verificar payloads QR cripto',
  'Check pasted crypto addresses, transaction hashes, Lightning invoices, and payment URIs before using or sharing a QR code.':
    'Comprueba direcciones cripto, hashes de transacción, facturas Lightning y URI de pago pegadas antes de usar o compartir un código QR.',
  Ready: 'Listo',
  'Automatic detection': 'Detección automática',
  Selected: 'Seleccionado',
  'No seed phrases. No private keys.': 'Sin frases semilla. Sin claves privadas.',
  'Checking...': 'Comprobando...',
  'Security note': 'Nota de seguridad',
  'Public wallet addresses, transaction hashes, and payment request text are safe to inspect. Never paste seed phrases, private keys, recovery codes, or exchange login credentials into any checker.':
    'Las direcciones públicas, hashes y textos de solicitud de pago son seguros para inspeccionar. Nunca pegues frases semilla, claves privadas, códigos de recuperación ni credenciales de exchange en un comprobador.',
  'Local validation': 'Validación local',
  'Detected type': 'Tipo detectado',
  'Normalized value': 'Valor normalizado',
  'Validation message': 'Mensaje de validación',
  'Live lookup': 'Consulta en vivo',
  'Explorer links': 'Enlaces de explorador',
  'Live market data': 'Datos de mercado en vivo',
  'Market prices': 'Precios de mercado',
  'Search assets': 'Buscar activos',
  'Search assets or symbols': 'Buscar activos o símbolos',
  'Market cap': 'Capitalización',
  'Market data is unavailable.': 'Los datos de mercado no están disponibles.',
  'No assets match this search.': 'Ningún activo coincide con esta búsqueda.',
  'Show 12 more': 'Mostrar 12 más',
  remaining: 'restantes',
  Converter: 'Conversor',
  Amount: 'Importe',
  Asset: 'Activo',
  estimate: 'estimación',
  'Live fee comparison': 'Comparación de comisiones en vivo',
  'Network fees': 'Comisiones de red',
  'Priority': 'Prioridad',
  'Standard': 'Estándar',
  'Economy': 'Económica',
  'Source': 'Fuente',
  'Liquidity sources': 'Fuentes de liquidez',
  'Exchange directory': 'Directorio de exchanges',
  'Search exchanges': 'Buscar exchanges',
  'Search exchanges or countries': 'Buscar exchanges o países',
  'Show XMR-support filter state': 'Mostrar estado del filtro de soporte XMR',
  Global: 'Global',
  'Open exchange': 'Abrir exchange',
  'Exchange data is unavailable.': 'Los datos de exchanges no están disponibles.',
  'No exchanges match this search.': 'Ningún exchange coincide con esta búsqueda.',
  'Developer API': 'API para desarrolladores',
  'QR code generation API': 'API de generación de códigos QR',
  Endpoint: 'Endpoint',
  Examples: 'Ejemplos',
  'Direct SVG URL': 'URL SVG directa',
  'POST JSON response': 'Respuesta JSON POST',
  'Custom payload SVG': 'SVG de payload personalizado',
  'Request Fields': 'Campos de solicitud',
  Field: 'Campo',
  Type: 'Tipo',
  Notes: 'Notas',
  'Supported Networks': 'Redes compatibles',
  'Token Chains': 'Cadenas de tokens',
  'Responses And Errors': 'Respuestas y errores',
  Success: 'Éxito',
  Errors: 'Errores',
  Help: 'Ayuda',
  'Crypto QR Code FAQ': 'FAQ de códigos QR cripto',
  'Still verify in your wallet': 'Verifica siempre en tu cartera',
  Legal: 'Legal',
  'Terms of Use': 'Condiciones de uso',
  'Last updated: June 13, 2026': 'Última actualización: 13 de junio de 2026',
  'No financial advice': 'Sin asesoramiento financiero',
  'Acceptable use': 'Uso aceptable',
  'Availability and liability': 'Disponibilidad y responsabilidad',
  'Privacy notice': 'Aviso de privacidad',
  'Cookies, local storage, and analytics': 'Cookies, almacenamiento local y analítica',
  'Cookie use': 'Uso de cookies',
  'Anonymous analytics': 'Analítica anónima',
  'Disable anonymous analytics': 'Desactivar analítica anónima',
  'Anonymous analytics disabled': 'Analítica anónima desactivada',
  'What stays in local storage': 'Qué permanece en almacenamiento local',
  'What is not collected': 'Qué no se recopila',
  'Data processing summary': 'Resumen del procesamiento de datos',
  'Trust and privacy': 'Confianza y privacidad',
  'No account, no wallet connection, no server vault': 'Sin cuenta, sin conexión de cartera, sin bóveda de servidor',
  'Privacy and security FAQ': 'FAQ de privacidad y seguridad',
  Saved: 'Guardado',
  'Saved locally in this browser.': 'Guardado localmente en este navegador.',
  'Style preset saved locally in this browser.': 'Preajuste de estilo guardado localmente en este navegador.',
  Detected: 'Detectado'
};

const fr: PhraseMap = {
  'Local QR generator': 'Générateur QR local',
  'Generate crypto QR codes': 'Générer des QR codes crypto',
  'Payment details': 'Détails du paiement',
  Guided: 'Guidé',
  'Custom payload': 'Payload personnalisé',
  Network: 'Réseau',
  'Automatic from address': "Automatique depuis l'adresse",
  'Supported payment networks': 'Réseaux de paiement pris en charge',
  'Market assets': 'Actifs de marché',
  'Token chain': 'Chaîne du token',
  'EVM chain': 'Chaîne EVM',
  'Payload standard': 'Standard du payload',
  'Recipient address': 'Adresse du destinataire',
  'Paste address': "Coller l'adresse",
  'Copy address': "Copier l'adresse",
  'Address copied.': 'Adresse copiée.',
  'Optional amount': 'Montant facultatif',
  'Local save label': 'Libellé local',
  'Fiat estimate': 'Estimation fiat',
  'Save address': "Enregistrer l'adresse",
  'Paste payload': 'Coller le payload',
  'Copy payload': 'Copier le payload',
  'Payload copied.': 'Payload copié.',
  'Check before sharing': 'Vérifier avant de partager',
  'Open this generated payload in the verifier.': 'Ouvrir ce payload généré dans le vérificateur.',
  'Verify payload': 'Vérifier le payload',
  'Save current style': 'Enregistrer le style actuel',
  'Preset name': 'Nom du préréglage',
  'Save preset': 'Enregistrer le préréglage',
  'QR preview': 'Aperçu du QR',
  'Scan warning': 'Avertissement de scan',
  'Scan safe': 'Scan fiable',
  'No payload yet': 'Aucun payload pour le moment',
  Copied: 'Copié',
  Copy: 'Copier',
  Share: 'Partager',
  'Style editor': 'Éditeur de style',
  'Built-in presets': 'Préréglages intégrés',
  Logo: 'Logo',
  Color: 'Couleur',
  Black: 'Noir',
  White: 'Blanc',
  None: 'Aucun',
  Custom: 'Personnalisé',
  'Upload custom logo': 'Importer un logo personnalisé',
  Square: 'Carré',
  Rounded: 'Arrondi',
  'Extra rounded': 'Très arrondi',
  Foreground: 'Premier plan',
  Background: 'Arrière-plan',
  'Address and transaction checker': "Vérificateur d'adresses et de transactions",
  'Verify crypto QR payloads': 'Vérifier les payloads QR crypto',
  Ready: 'Prêt',
  'Automatic detection': 'Détection automatique',
  Selected: 'Sélectionné',
  'No seed phrases. No private keys.': 'Aucune phrase de récupération. Aucune clé privée.',
  'Checking...': 'Vérification...',
  'Security note': 'Note de sécurité',
  'Local validation': 'Validation locale',
  'Detected type': 'Type détecté',
  'Normalized value': 'Valeur normalisée',
  'Validation message': 'Message de validation',
  'Live lookup': 'Recherche en direct',
  'Explorer links': "Liens d'explorateur",
  'Live market data': 'Données de marché en direct',
  'Market prices': 'Prix du marché',
  'Search assets': 'Rechercher des actifs',
  'Search assets or symbols': 'Rechercher actifs ou symboles',
  'Market cap': 'Capitalisation',
  Converter: 'Convertisseur',
  Amount: 'Montant',
  Asset: 'Actif',
  estimate: 'estimation',
  'Live fee comparison': 'Comparaison des frais en direct',
  'Network fees': 'Frais réseau',
  Priority: 'Priorité',
  Standard: 'Standard',
  Economy: 'Économie',
  Source: 'Source',
  'Liquidity sources': 'Sources de liquidité',
  'Exchange directory': 'Répertoire des exchanges',
  'Open exchange': "Ouvrir l'exchange",
  'Developer API': 'API développeur',
  Examples: 'Exemples',
  'Request Fields': 'Champs de requête',
  Field: 'Champ',
  Type: 'Type',
  Notes: 'Notes',
  'Supported Networks': 'Réseaux pris en charge',
  'Token Chains': 'Chaînes de tokens',
  Success: 'Succès',
  Errors: 'Erreurs',
  Help: 'Aide',
  'Crypto QR Code FAQ': 'FAQ des QR codes crypto',
  'Still verify in your wallet': 'Vérifiez toujours dans votre portefeuille',
  Legal: 'Juridique',
  'Terms of Use': "Conditions d'utilisation",
  'Last updated: June 13, 2026': 'Dernière mise à jour : 13 juin 2026',
  'No financial advice': 'Aucun conseil financier',
  'Acceptable use': 'Utilisation acceptable',
  'Availability and liability': 'Disponibilité et responsabilité',
  'Privacy notice': 'Avis de confidentialité',
  'Cookies, local storage, and analytics': 'Cookies, stockage local et analytique',
  'Cookie use': 'Utilisation des cookies',
  'Anonymous analytics': 'Analytique anonyme',
  'Disable anonymous analytics': "Désactiver l'analytique anonyme",
  'Anonymous analytics disabled': 'Analytique anonyme désactivée',
  'What stays in local storage': 'Ce qui reste dans le stockage local',
  'What is not collected': "Ce qui n'est pas collecté",
  'Data processing summary': 'Résumé du traitement des données',
  'Trust and privacy': 'Confiance et confidentialité',
  'No account, no wallet connection, no server vault': 'Aucun compte, aucune connexion de portefeuille, aucun coffre serveur',
  'Privacy and security FAQ': 'FAQ confidentialité et sécurité',
  'Saved locally in this browser.': 'Enregistré localement dans ce navigateur.',
  'Style preset saved locally in this browser.': 'Préréglage de style enregistré localement dans ce navigateur.',
  Detected: 'Détecté'
};

const de: PhraseMap = {
  'Local QR generator': 'Lokaler QR-Generator',
  'Generate crypto QR codes': 'Krypto-QR-Codes erstellen',
  'Payment details': 'Zahlungsdetails',
  Guided: 'Geführt',
  'Custom payload': 'Eigene Nutzlast',
  Network: 'Netzwerk',
  'Automatic from address': 'Automatisch aus Adresse',
  'Recipient address': 'Empfängeradresse',
  'Save address': 'Adresse speichern',
  'Verify payload': 'Nutzlast prüfen',
  'QR preview': 'QR-Vorschau',
  Copy: 'Kopieren',
  Copied: 'Kopiert',
  Share: 'Teilen',
  'Style editor': 'Stil-Editor',
  'Verify crypto QR payloads': 'Krypto-QR-Nutzlasten prüfen',
  Ready: 'Bereit',
  'Checking...': 'Prüfen...',
  'Security note': 'Sicherheitshinweis',
  'Market prices': 'Marktpreise',
  Converter: 'Umrechner',
  Amount: 'Betrag',
  Asset: 'Asset',
  'Network fees': 'Netzwerkgebühren',
  Priority: 'Priorität',
  Standard: 'Standard',
  Economy: 'Sparsam',
  Source: 'Quelle',
  'Exchange directory': 'Exchange-Verzeichnis',
  'Developer API': 'Entwickler-API',
  Examples: 'Beispiele',
  Help: 'Hilfe',
  Legal: 'Rechtliches',
  'Terms of Use': 'Nutzungsbedingungen',
  'Privacy notice': 'Datenschutzhinweis',
  Detected: 'Erkannt',
  'Cookie use': 'Cookie-Nutzung',
  'Anonymous analytics': 'Anonyme Analyse',
  'Trust and privacy': 'Vertrauen und Datenschutz'
};

const pt: PhraseMap = {
  'Local QR generator': 'Gerador QR local',
  'Generate crypto QR codes': 'Gerar códigos QR cripto',
  'Payment details': 'Detalhes do pagamento',
  Guided: 'Guiado',
  'Custom payload': 'Payload personalizado',
  Network: 'Rede',
  'Recipient address': 'Endereço do destinatário',
  'Save address': 'Salvar endereço',
  'Verify payload': 'Verificar payload',
  Copy: 'Copiar',
  Copied: 'Copiado',
  Share: 'Compartilhar',
  'Style editor': 'Editor de estilo',
  Ready: 'Pronto',
  'Checking...': 'Verificando...',
  'Market prices': 'Preços de mercado',
  Converter: 'Conversor',
  Amount: 'Valor',
  Asset: 'Ativo',
  'Network fees': 'Taxas de rede',
  Priority: 'Prioridade',
  Economy: 'Econômica',
  Source: 'Fonte',
  Help: 'Ajuda',
  Legal: 'Legal',
  'Terms of Use': 'Termos de uso',
  'Privacy notice': 'Aviso de privacidade',
  Detected: 'Detectado'
};

const it: PhraseMap = {
  'Local QR generator': 'Generatore QR locale',
  'Generate crypto QR codes': 'Genera codici QR crypto',
  'Payment details': 'Dettagli del pagamento',
  Guided: 'Guidato',
  Network: 'Rete',
  'Recipient address': 'Indirizzo destinatario',
  'Save address': 'Salva indirizzo',
  Copy: 'Copia',
  Copied: 'Copiato',
  Share: 'Condividi',
  'Style editor': 'Editor stile',
  Ready: 'Pronto',
  'Checking...': 'Controllo...',
  'Market prices': 'Prezzi di mercato',
  Converter: 'Convertitore',
  Amount: 'Importo',
  Asset: 'Asset',
  'Network fees': 'Commissioni di rete',
  Source: 'Fonte',
  Help: 'Aiuto',
  Legal: 'Legale',
  'Terms of Use': "Condizioni d'uso",
  'Privacy notice': 'Informativa privacy',
  Detected: 'Rilevato'
};

const nl: PhraseMap = {
  'Local QR generator': 'Lokale QR-generator',
  'Generate crypto QR codes': 'Crypto-QR-codes genereren',
  'Payment details': 'Betaalgegevens',
  Guided: 'Begeleid',
  Network: 'Netwerk',
  'Recipient address': 'Ontvangeradres',
  'Save address': 'Adres opslaan',
  Copy: 'Kopiëren',
  Copied: 'Gekopieerd',
  Share: 'Delen',
  'Style editor': 'Stijleditor',
  Ready: 'Gereed',
  'Checking...': 'Controleren...',
  'Market prices': 'Marktprijzen',
  Converter: 'Omzetter',
  Amount: 'Bedrag',
  Asset: 'Asset',
  'Network fees': 'Netwerkkosten',
  Source: 'Bron',
  Help: 'Help',
  Legal: 'Juridisch',
  'Terms of Use': 'Gebruiksvoorwaarden',
  'Privacy notice': 'Privacyverklaring',
  Detected: 'Gedetecteerd'
};

const ru: PhraseMap = {
  'Local QR generator': 'Локальный QR-генератор',
  'Generate crypto QR codes': 'Создание крипто QR-кодов',
  'Payment details': 'Данные платежа',
  Guided: 'Пошаговый',
  'Custom payload': 'Свой payload',
  Network: 'Сеть',
  'Recipient address': 'Адрес получателя',
  'Save address': 'Сохранить адрес',
  'Verify payload': 'Проверить payload',
  Copy: 'Копировать',
  Copied: 'Скопировано',
  Share: 'Поделиться',
  'Style editor': 'Редактор стиля',
  Ready: 'Готово',
  'Checking...': 'Проверка...',
  'Security note': 'Заметка о безопасности',
  'Market prices': 'Рыночные цены',
  Converter: 'Конвертер',
  Amount: 'Сумма',
  Asset: 'Актив',
  'Network fees': 'Комиссии сети',
  Source: 'Источник',
  Help: 'Помощь',
  Legal: 'Правовая информация',
  'Terms of Use': 'Условия использования',
  'Privacy notice': 'Уведомление о конфиденциальности',
  Detected: 'Обнаружено'
};

const uk: PhraseMap = {
  'Local QR generator': 'Локальний QR-генератор',
  'Generate crypto QR codes': 'Створення крипто QR-кодів',
  'Payment details': 'Дані платежу',
  Guided: 'Покроковий',
  Network: 'Мережа',
  'Recipient address': 'Адреса отримувача',
  'Save address': 'Зберегти адресу',
  Copy: 'Копіювати',
  Copied: 'Скопійовано',
  Share: 'Поділитися',
  Ready: 'Готово',
  'Checking...': 'Перевірка...',
  Amount: 'Сума',
  Source: 'Джерело',
  Help: 'Допомога',
  'Terms of Use': 'Умови використання',
  'Privacy notice': 'Повідомлення про приватність',
  Detected: 'Виявлено'
};

const ar: PhraseMap = {
  'Local QR generator': 'مولد QR محلي',
  'Generate crypto QR codes': 'إنشاء رموز QR للعملات الرقمية',
  'Payment details': 'تفاصيل الدفع',
  Guided: 'موجه',
  'Custom payload': 'حمولة مخصصة',
  Network: 'الشبكة',
  'Automatic from address': 'تلقائي من العنوان',
  'Supported payment networks': 'شبكات الدفع المدعومة',
  'Market assets': 'أصول السوق',
  'Token chain': 'سلسلة الرمز',
  'EVM chain': 'سلسلة EVM',
  'Payload standard': 'معيار الحمولة',
  'Recipient address': 'عنوان المستلم',
  'Paste address': 'لصق العنوان',
  'Copy address': 'نسخ العنوان',
  'Address copied.': 'تم نسخ العنوان.',
  'Optional amount': 'مبلغ اختياري',
  'Local save label': 'تسمية الحفظ المحلية',
  'Fiat estimate': 'تقدير نقدي',
  'Save address': 'حفظ العنوان',
  Payload: 'الحمولة',
  'Paste payload': 'لصق الحمولة',
  'Copy payload': 'نسخ الحمولة',
  'Payload copied.': 'تم نسخ الحمولة.',
  'Check before sharing': 'تحقق قبل المشاركة',
  'Verify payload': 'تحقق من الحمولة',
  'Save current style': 'حفظ النمط الحالي',
  'Preset name': 'اسم الإعداد',
  'Save preset': 'حفظ الإعداد',
  'QR preview': 'معاينة QR',
  'Scan warning': 'تحذير المسح',
  'Scan safe': 'آمن للمسح',
  'No payload yet': 'لا توجد حمولة بعد',
  Copied: 'تم النسخ',
  Copy: 'نسخ',
  Share: 'مشاركة',
  'Style editor': 'محرر النمط',
  Logo: 'الشعار',
  Color: 'لون',
  Black: 'أسود',
  White: 'أبيض',
  None: 'بدون',
  Custom: 'مخصص',
  Dots: 'النقاط',
  Foreground: 'المقدمة',
  Background: 'الخلفية',
  'Verify crypto QR payloads': 'التحقق من حمولات QR للعملات الرقمية',
  Ready: 'جاهز',
  'Automatic detection': 'كشف تلقائي',
  Selected: 'المحدد',
  'No seed phrases. No private keys.': 'لا عبارات استرداد. لا مفاتيح خاصة.',
  'Checking...': 'جار التحقق...',
  'Security note': 'ملاحظة أمنية',
  'Local validation': 'تحقق محلي',
  'Detected type': 'النوع المكتشف',
  'Normalized value': 'القيمة الموحدة',
  'Validation message': 'رسالة التحقق',
  'Live lookup': 'بحث مباشر',
  'Explorer links': 'روابط المستكشف',
  'Market prices': 'أسعار السوق',
  Converter: 'محول',
  Amount: 'المبلغ',
  Asset: 'الأصل',
  'Network fees': 'رسوم الشبكة',
  Priority: 'أولوية',
  Standard: 'قياسي',
  Economy: 'اقتصادي',
  Source: 'المصدر',
  'Exchange directory': 'دليل المنصات',
  'Developer API': 'واجهة API للمطورين',
  Examples: 'أمثلة',
  Help: 'مساعدة',
  Legal: 'قانوني',
  'Terms of Use': 'شروط الاستخدام',
  'Privacy notice': 'إشعار الخصوصية',
  Detected: 'تم الكشف عن'
};

const zh: PhraseMap = {
  'Local QR generator': '本地 QR 生成器',
  'Generate crypto QR codes': '生成加密货币 QR 码',
  'Payment details': '付款详情',
  Guided: '引导模式',
  'Custom payload': '自定义载荷',
  Network: '网络',
  'Recipient address': '收款地址',
  'Save address': '保存地址',
  Copy: '复制',
  Copied: '已复制',
  Share: '分享',
  'Style editor': '样式编辑器',
  Ready: '就绪',
  'Checking...': '正在检查...',
  'Market prices': '市场价格',
  Converter: '换算器',
  Amount: '金额',
  Asset: '资产',
  'Network fees': '网络费用',
  Source: '来源',
  Help: '帮助',
  Legal: '法律',
  'Terms of Use': '使用条款',
  'Privacy notice': '隐私声明',
  Detected: '已检测到'
};

const ja: PhraseMap = {
  'Local QR generator': 'ローカルQR生成',
  'Generate crypto QR codes': '暗号資産QRコードを生成',
  'Payment details': '支払い詳細',
  Guided: 'ガイド付き',
  'Custom payload': 'カスタムペイロード',
  Network: 'ネットワーク',
  'Recipient address': '受取人アドレス',
  'Save address': 'アドレスを保存',
  Copy: 'コピー',
  Copied: 'コピー済み',
  Share: '共有',
  'Style editor': 'スタイル編集',
  Ready: '準備完了',
  'Checking...': '確認中...',
  'Market prices': '市場価格',
  Converter: '変換',
  Amount: '金額',
  Asset: '資産',
  'Network fees': 'ネットワーク手数料',
  Source: 'ソース',
  Help: 'ヘルプ',
  Legal: '法的情報',
  'Terms of Use': '利用規約',
  'Privacy notice': 'プライバシー通知',
  Detected: '検出済み'
};

const ko: PhraseMap = {
  'Local QR generator': '로컬 QR 생성기',
  'Generate crypto QR codes': '암호화폐 QR 코드 생성',
  'Payment details': '결제 세부 정보',
  Guided: '안내 모드',
  'Custom payload': '사용자 지정 페이로드',
  Network: '네트워크',
  'Recipient address': '수신자 주소',
  'Save address': '주소 저장',
  Copy: '복사',
  Copied: '복사됨',
  Share: '공유',
  'Style editor': '스타일 편집기',
  Ready: '준비됨',
  'Checking...': '확인 중...',
  'Market prices': '시장 가격',
  Converter: '변환기',
  Amount: '금액',
  Asset: '자산',
  'Network fees': '네트워크 수수료',
  Source: '출처',
  Help: '도움말',
  Legal: '법률',
  'Terms of Use': '이용 약관',
  'Privacy notice': '개인정보 고지',
  Detected: '감지됨'
};

const ruExtra: PhraseMap = {
  'QR code generation API': 'API генерации QR-кодов',
  'Crypto QR Code FAQ': 'FAQ по крипто QR-кодам',
  'High-contrast output with quiet-zone enforcement.': 'Высококонтрастный результат с обязательной тихой зоной.',
  'Still verify in your wallet': 'Все равно проверяйте в кошельке',
  'Check before sharing': 'Проверьте перед распространением',
  'Validation message': 'Сообщение проверки',
  'Explorer links': 'Ссылки обозревателей',
  Payload: 'Нагрузка',
  'QR preview': 'Предпросмотр QR',
  'No seed phrases. No private keys.': 'Без seed-фраз. Без приватных ключей.',
  'Address and transaction checker': 'Проверка адресов и транзакций',
  'Verify crypto QR payloads': 'Проверка крипто QR-нагрузок',
  'Browser-local crypto QR utility': 'Локальная утилита для крипто QR',
  'Crypto QR Code Generator': 'Генератор крипто QR-кодов',
  'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
    'CryptoQR Tool создает сканируемые платежные QR-коды для Monero, Bitcoin, Ethereum, Solana, Litecoin и стейблкоинов ERC-20, таких как USDC и USDT, не отправляя адреса кошельков, загруженные логотипы или сохраненные пресеты на сервер.',
  'Your data never leaves your browser': 'Ваши данные не покидают браузер',
  'Made with love for privacy and zero data collection.': 'Сделано для приватности и без сбора данных.',
  'Open generator': 'Открыть генератор',
  'Privacy model': 'Модель приватности',
  '100% Client-Side Processing': '100% обработка на стороне клиента',
  'Addresses, amounts, logos, and presets are generated in your browser. There is no account and no server-side address vault.':
    'Адреса, суммы, логотипы и пресеты создаются в вашем браузере. Аккаунт и серверное хранилище адресов не используются.',
  'Zero Data Collection': 'Нулевой сбор данных',
  'We do not collect your wallet addresses, uploaded logos, or saved presets. Your QR workflow stays on your device.':
    'Мы не собираем адреса кошельков, загруженные логотипы или сохраненные пресеты. Ваш рабочий процесс QR остается на устройстве.',
  'Works Completely Offline': 'Работает полностью офлайн',
  'Core QR generation, styling, downloads, and saved presets keep working in the browser without a live connection.':
    'Создание QR, оформление, скачивание и сохраненные пресеты продолжают работать в браузере без подключения.',
  'Crypto QR generators by coin': 'Генераторы крипто QR по монетам',
  'Dedicated pages for each supported wallet address format and payment payload.':
    'Отдельные страницы для каждого поддерживаемого формата адреса кошелька и платежной нагрузки.',
  'Popular crypto QR searches': 'Популярные поисковые запросы по крипто QR',
  'Frequently asked questions': 'Часто задаваемые вопросы',
  'Does CryptoQR Tool store crypto addresses?': 'Хранит ли CryptoQR Tool криптоадреса?',
  'Saved addresses and QR style presets stay in browser local storage on your device and are not synced server-side.':
    'Сохраненные адреса и пресеты стиля QR остаются в локальном хранилище браузера на вашем устройстве и не синхронизируются с сервером.',
  'Which networks are supported?': 'Какие сети поддерживаются?',
  'CryptoQR Tool supports Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT, plus custom payload QR codes.':
    'CryptoQR Tool поддерживает Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC и USDT, а также QR-коды с пользовательской нагрузкой.',
  'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
    'Ответы о безопасном создании крипто QR-кодов, локальном хранении в браузере, анонимной аналитике, совместимости кошельков и проверках перед отправкой или сканированием платежного запроса.',
  'Is CryptoQR Tool safe for generating crypto QR codes?': 'Безопасен ли CryptoQR Tool для создания крипто QR-кодов?',
  'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
    'Генератор работает в браузере и не требует подключения кошелька, seed-фраз, приватных ключей, аккаунтов или учетных данных биржи. Перед отправкой средств все равно проверяйте каждый адрес назначения или инвойс в кошельке.',
  'Does CryptoQR Tool store wallet addresses?': 'Хранит ли CryptoQR Tool адреса кошельков?',
  'Saved addresses stay in browser local storage on your device when you choose to save them. They are not synced to a server-side address vault.':
    'Сохраненные адреса остаются в локальном хранилище браузера на вашем устройстве, если вы решаете их сохранить. Они не синхронизируются с серверным хранилищем адресов.',
  'Does the site use cookies?': 'Использует ли сайт cookie?',
  'The site does not set advertising, retargeting, account, or tracking cookies. It may use browser local storage for saved addresses, style presets, theme, currency, and the anonymous analytics opt-out setting.':
    'Сайт не устанавливает рекламные, ретаргетинговые, учетные или отслеживающие cookie. Он может использовать локальное хранилище браузера для сохраненных адресов, пресетов стиля, темы, валюты и настройки отказа от анонимной аналитики.',
  'What analytics are used?': 'Какая аналитика используется?',
  'Self-hosted Umami analytics is used for aggregate page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings.':
    'Используется собственная аналитика Umami для агрегированного использования страниц и общих продуктовых событий. Она настроена без отслеживающих cookie, учитывает Do Not Track и исключает строки запросов.',
  'Can a downloaded crypto QR code be changed later?': 'Можно ли позже изменить скачанный крипто QR-код?',
  'No. A downloaded QR image contains the payload that existed when you exported it. If the address, amount, invoice, chain, or style needs to change, generate a new QR code.':
    'Нет. Скачанное изображение QR содержит нагрузку, которая была при экспорте. Если нужно изменить адрес, сумму, инвойс, сеть или стиль, создайте новый QR-код.',
  'What happens if a wallet ignores the amount field?': 'Что если кошелек игнорирует поле суммы?',
  'Some wallets may scan only the destination and ignore optional URI parameters such as amount or token details. Always confirm the recipient, network, token, and amount inside the sending wallet before approving a transaction.':
    'Некоторые кошельки могут считать только получателя и игнорировать необязательные параметры URI, такие как сумма или данные токена. Всегда подтверждайте получателя, сеть, токен и сумму в отправляющем кошельке перед одобрением транзакции.',
  'Can I paste a seed phrase or private key?': 'Можно ли вставить seed-фразу или приватный ключ?',
  'No. The tool is only for public addresses, payment URIs, Lightning invoices, transaction hashes, and custom public payloads. Never paste seed phrases or private keys into any QR generator.':
    'Нет. Инструмент предназначен только для публичных адресов, платежных URI, Lightning-инвойсов, хэшей транзакций и публичных пользовательских нагрузок. Никогда не вставляйте seed-фразы или приватные ключи в QR-генератор.',
  'Does the tool provide financial advice?': 'Дает ли инструмент финансовые советы?',
  'CryptoQR Tool is a utility for generating and checking QR payloads. It does not provide investment, tax, legal, trading, custody, or financial advice.':
    'CryptoQR Tool — утилита для создания и проверки QR-нагрузок. Она не предоставляет инвестиционные, налоговые, юридические, торговые, кастодиальные или финансовые советы.',
  'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
    'CryptoQR Tool помогает создавать читаемые QR-нагрузки, но окончательно подтверждать получателя, сеть, токен, сумму и комиссии нужно в кошельке. Никогда не одобряйте транзакцию только потому, что QR-код успешно отсканировался.',
  'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
    'CryptoQR Tool создан как приватная утилита. Модули рынков, комиссий и бирж обращаются к публичным API, но QR-адреса, сохраненные метки, пресеты стилей и пользовательские логотипы остаются в браузере, пока вы не скопируете, скачаете, экспортируете или поделитесь ими.',
  'Generation is client-side': 'Создание выполняется на клиенте',
  'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
    'Формирование QR-нагрузки, проверка, стилизация, предпросмотр пользовательских логотипов и скачивание выполняются в браузере.',
  'Local storage only': 'Только локальное хранилище',
  'Saved addresses and user-defined style presets use a versioned local storage key and can be deleted by the user.':
    'Сохраненные адреса и пользовательские пресеты стиля используют версионированный ключ локального хранилища и могут быть удалены пользователем.',
  'Custom logo handling': 'Обработка пользовательских логотипов',
  'Uploaded logos are accepted as PNG, JPEG, SVG, or WebP, size-limited, and stored only when saved into a preset.':
    'Загруженные логотипы принимаются в форматах PNG, JPEG, SVG или WebP, ограничены по размеру и сохраняются только при добавлении в пресет.',
  'Scannability checks': 'Проверки сканируемости',
  'Contrast, quiet zone, logo size, and error-correction settings prioritize reliable scanning over decoration.':
    'Контраст, тихая зона, размер логотипа и коррекция ошибок настроены в пользу надежного сканирования, а не декоративности.',
  'Where are saved addresses stored?': 'Где хранятся сохраненные адреса?',
  'Saved addresses are stored in browser local storage under a versioned CryptoQR Tool key for this browser profile only.':
    'Сохраненные адреса хранятся в локальном хранилище браузера под версионированным ключом CryptoQR Tool только для этого профиля браузера.',
  'Are custom logos uploaded?': 'Загружаются ли пользовательские логотипы?',
  'No. Custom logos are read and previewed in the browser and are only kept locally if you save them into a preset.':
    'Нет. Пользовательские логотипы считываются и отображаются в браузере и сохраняются локально только при сохранении в пресет.',
  'Cookies, local storage, and analytics': 'Cookie, локальное хранилище и аналитика',
  'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
    'CryptoQR Tool не использует рекламные cookie, отслеживающие cookie, аккаунты, подключения кошельков или серверное хранилище адресов. Основное создание QR выполняется в браузере, а сохраненные рабочие данные остаются на вашем устройстве, пока вы их не экспортируете или не поделитесь ими.',
  'CryptoQR Tool does not set cookies for advertising, retargeting, user accounts, or cross-site profiling. A cookie settings popup is not shown because there are no optional cookie categories to manage.':
    'CryptoQR Tool не устанавливает cookie для рекламы, ретаргетинга, пользовательских аккаунтов или межсайтового профилирования. Окно настроек cookie не показывается, потому что нет необязательных категорий cookie для управления.',
  'The site may still use browser local storage for features you control, such as saved addresses, presets, theme, currency, and analytics opt-out status.':
    'Сайт может использовать локальное хранилище браузера для функций, которыми вы управляете: сохраненных адресов, пресетов, темы, валюты и статуса отказа от аналитики.',
  'Self-hosted Umami analytics helps measure page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings from page URLs.':
    'Собственная аналитика Umami помогает измерять использование страниц и общие продуктовые события. Она настроена без отслеживающих cookie, учитывает Do Not Track и исключает строки запросов из URL страниц.',
  'Saved addresses': 'Сохраненные адреса',
  'Public recipient addresses and labels stay in this browser profile when you choose to save them.':
    'Публичные адреса получателей и метки остаются в этом профиле браузера, если вы решаете их сохранить.',
  'QR style presets': 'Пресеты стиля QR',
  'Colors, quiet zones, error correction, and optional custom logo data are kept locally for reuse.':
    'Цвета, тихие зоны, коррекция ошибок и необязательные данные пользовательского логотипа сохраняются локально для повторного использования.',
  Preferences: 'Настройки',
  'Theme and display currency are stored locally so the interface opens with your preferred settings.':
    'Тема и валюта отображения сохраняются локально, чтобы интерфейс открывался с вашими предпочтениями.',
  'Analytics opt-out': 'Отказ от аналитики',
  'If you disable anonymous analytics, this browser stores a local opt-out flag named umami.disabled.':
    'Если вы отключаете анонимную аналитику, этот браузер сохраняет локальный флаг отказа umami.disabled.',
  'What stays in local storage': 'Что остается в локальном хранилище',
  'What is not collected': 'Что не собирается',
  'No private keys, seed phrases, wallet connections, or exchange credentials are requested.':
    'Приватные ключи, seed-фразы, подключения кошельков и учетные данные бирж не запрашиваются.',
  'QR payloads, pasted public addresses, amounts, labels, and custom logos are not uploaded to an address vault.':
    'QR-нагрузки, вставленные публичные адреса, суммы, метки и пользовательские логотипы не загружаются в хранилище адресов.',
  'Saved data can be removed by deleting items in the app or clearing this site browser storage.':
    'Сохраненные данные можно удалить, удалив элементы в приложении или очистив хранилище сайта в браузере.',
  'Browser-local data is used to provide the generator, saved address list, QR styling, and display preferences. Server logs and anonymous analytics may be used for reliability, abuse prevention, performance monitoring, and aggregate product improvement. Public market, fee, and exchange views may call external data APIs, but those modules do not require wallet connection or account data.':
    'Локальные данные браузера используются для генератора, списка сохраненных адресов, оформления QR и настроек отображения. Серверные журналы и анонимная аналитика могут использоваться для надежности, предотвращения злоупотреблений, мониторинга производительности и агрегированного улучшения продукта. Разделы рынков, комиссий и бирж могут обращаться к внешним API данных, но не требуют подключения кошелька или данных аккаунта.',
  'These terms explain the permitted use and limits of CryptoQR Tool. By using the site, you agree to use it as a self-directed crypto QR utility and to verify all payment details before acting on them.':
    'Эти условия объясняют разрешенное использование и ограничения CryptoQR Tool. Используя сайт, вы соглашаетесь применять его как самостоятельную утилиту для крипто QR и проверять все платежные данные перед любыми действиями.',
  'Browser-local utility': 'Локальная браузерная утилита',
  'CryptoQR Tool provides tools for creating and checking QR payloads in a browser. The app does not create wallets, custody funds, broker trades, or manage blockchain transactions.':
    'CryptoQR Tool предоставляет инструменты для создания и проверки QR-нагрузок в браузере. Приложение не создает кошельки, не хранит средства, не брокерует сделки и не управляет блокчейн-транзакциями.',
  'No wallet custody or account service': 'Нет хранения кошельков или аккаунт-сервиса',
  'The service does not ask for seed phrases, private keys, exchange credentials, or wallet access. Do not enter secrets into the generator, verifier, or custom payload fields.':
    'Сервис не запрашивает seed-фразы, приватные ключи, учетные данные бирж или доступ к кошельку. Не вводите секреты в генератор, проверку или поля пользовательской нагрузки.',
  'User verification is required': 'Требуется пользовательская проверка',
  'You are responsible for checking every recipient address, chain, token, amount, invoice, memo, and QR payload before sharing it or sending funds.':
    'Вы отвечаете за проверку каждого адреса получателя, сети, токена, суммы, инвойса, memo и QR-нагрузки перед распространением или отправкой средств.',
  'Crypto transactions are irreversible': 'Криптотранзакции необратимы',
  'Blockchain payments can be final and difficult or impossible to recover. Wallet behavior varies, and some wallets may ignore optional amount or token parameters.':
    'Платежи в блокчейне могут быть окончательными, и их трудно или невозможно вернуть. Поведение кошельков различается, некоторые могут игнорировать необязательные параметры суммы или токена.',
  'CryptoQR Tool does not provide investment, tax, legal, trading, custody, accounting, or financial advice. Market, fee, exchange, and verification data are informational and may be delayed, incomplete, inaccurate, or unavailable.':
    'CryptoQR Tool не предоставляет инвестиционные, налоговые, юридические, торговые, кастодиальные, бухгалтерские или финансовые советы. Данные рынков, комиссий, бирж и проверки носят информационный характер и могут быть задержанными, неполными, неточными или недоступными.',
  'You are responsible for your own decisions, wallet configuration, transaction review, and compliance obligations.':
    'Вы отвечаете за собственные решения, настройку кошелька, проверку транзакций и соблюдение требований.',
  'Do not use the site to misrepresent payment destinations, impersonate another party, distribute malicious QR payloads, or facilitate fraud.':
    'Не используйте сайт для искажения платежных назначений, выдачи себя за другую сторону, распространения вредоносных QR-нагрузок или содействия мошенничеству.',
  'Do not interfere with site availability, bypass rate limits, scrape aggressively, or abuse public API endpoints.':
    'Не нарушайте доступность сайта, не обходите лимиты, не выполняйте агрессивный сбор данных и не злоупотребляйте публичными API.',
  'Do not rely on generated QR codes as the only verification step for a transaction. Always confirm details in a trusted wallet or explorer.':
    'Не полагайтесь на созданные QR-коды как на единственный этап проверки транзакции. Всегда подтверждайте данные в надежном кошельке или обозревателе.',
  'The site is provided as-is and may change, pause, or stop without notice. To the fullest extent permitted by law, CryptoQR Tool is not liable for lost funds, wrong-address payments, wallet incompatibility, network fees, failed scans, delayed data, third-party API behavior, or other losses from using generated or verified payloads.':
    'Сайт предоставляется как есть и может изменяться, приостанавливаться или прекращать работу без уведомления. В максимальной степени, разрешенной законом, CryptoQR Tool не несет ответственности за потерю средств, платежи на неверный адрес, несовместимость кошельков, сетевые комиссии, неудачные сканирования, задержанные данные, поведение сторонних API или другие потери от использования созданных или проверенных нагрузок.',
  'Browser-local library': 'Локальная библиотека браузера',
  'Saved addresses and presets': 'Сохраненные адреса и пресеты',
  'This page reads only from local storage in this browser. Saved custom logos are kept as data URLs only inside saved presets.':
    'Эта страница читает данные только из локального хранилища этого браузера. Сохраненные пользовательские логотипы хранятся как data URL только внутри пресетов.',
  'All networks': 'Все сети',
  'Generate QR': 'Создать QR',
  'Edit label': 'Изменить метку',
  'Delete address': 'Удалить адрес',
  'No saved addresses yet.': 'Сохраненных адресов пока нет.',
  'Style presets': 'Пресеты стиля',
  'Apply preset': 'Применить пресет',
  'Edit preset name': 'Изменить имя пресета',
  'Delete preset': 'Удалить пресет',
  'No user-defined style presets yet. Save one from the generator after customizing QR styling.':
    'Пользовательских пресетов стиля пока нет. Сохраните один из генератора после настройки оформления QR.',
  'Rename saved address': 'Переименовать сохраненный адрес',
  'Rename style preset': 'Переименовать пресет стиля',
  'Copied to clipboard.': 'Скопировано в буфер обмена.',
  dots: 'точки',
  logo: 'логотип',
  'quiet zone': 'тихая зона',
  'Generate the same wallet-compatible crypto QR payloads from server-side requests. The API returns SVG by default, supports guided network validation, custom payloads, scan-safe colors, quiet-zone sizing, and local catalog logos.':
    'Создавайте те же совместимые с кошельками крипто QR-нагрузки из серверных запросов. API по умолчанию возвращает SVG и поддерживает управляемую проверку сетей, пользовательские нагрузки, безопасные для сканирования цвета, размер тихой зоны и локальные каталожные логотипы.',
  'Send JSON for larger payloads or nested style options.': 'Отправляйте JSON для больших нагрузок или вложенных параметров стиля.',
  'Direct SVG URL': 'Прямой URL SVG',
  'POST JSON response': 'JSON-ответ POST',
  'Custom payload SVG': 'SVG пользовательской нагрузки',
  Endpoint: 'Конечная точка',
  'Request Fields': 'Поля запроса',
  Field: 'Поле',
  Type: 'Тип',
  Notes: 'Примечания',
  'Supported Networks': 'Поддерживаемые сети',
  'Token Chains': 'Сети токенов',
  'Responses And Errors': 'Ответы и ошибки',
  Success: 'Успех',
  Errors: 'Ошибки',
  'Defaults to guided unless payload is provided.': 'По умолчанию используется управляемый режим, если нагрузка не указана.',
  'Automatic detection supports the same address formats as the generator.':
    'Автоматическое определение поддерживает те же форматы адресов, что и генератор.',
  'Validated for guided payment networks.': 'Проверяется для управляемых платежных сетей.',
  'Optional positive decimal amount. Invalid amounts are ignored.': 'Необязательная положительная десятичная сумма. Недопустимые суммы игнорируются.',
  'Required for custom mode. Limited to 4096 characters.': 'Обязательно для пользовательского режима. Ограничение: 4096 символов.',
  'SVG is returned as image/svg+xml. JSON includes payload, network, validation, and svg.':
    'SVG возвращается как image/svg+xml. JSON содержит payload, network, validation и svg.',
  'Supports foreground, background, margin, logo, logoVariant, and logoSize.':
    'Поддерживает foreground, background, margin, logo, logoVariant и logoSize.',
  'for SVG requests, or': 'для SVG-запросов или',
  when: 'когда',
  'Invalid addresses, unknown automatic networks, malformed JSON, or empty custom payloads return JSON errors with':
    'Недопустимые адреса, неизвестные автоматические сети, некорректный JSON или пустые пользовательские нагрузки возвращают ошибки JSON со статусом',
  status: 'статус',
  Guide: 'Руководство',
  'Wallet context': 'Контекст кошелька',
  'Local only': 'Только локально',
  Address: 'Адрес',
  Validation: 'Проверка',
  Explorer: 'Обозреватель',
  Safety: 'Безопасность'
};

const ukExtra: PhraseMap = {
  'QR code generation API': 'API генерації QR-кодів',
  'Crypto QR Code FAQ': 'FAQ про крипто QR-коди',
  'High-contrast output with quiet-zone enforcement.': 'Висококонтрастний результат з обов’язковою тихою зоною.',
  'Still verify in your wallet': 'Все одно перевіряйте у гаманці',
  'Check before sharing': 'Перевірте перед поширенням',
  'Validation message': 'Повідомлення перевірки',
  'Explorer links': 'Посилання оглядачів',
  Payload: 'Payload',
  'QR preview': 'Попередній перегляд QR',
  'No seed phrases. No private keys.': 'Без seed-фраз. Без приватних ключів.',
  'Address and transaction checker': 'Перевірка адрес і транзакцій',
  'Verify crypto QR payloads': 'Перевірка крипто QR-payload',
  'Browser-local crypto QR utility': 'Локальна утиліта для крипто QR',
  'Crypto QR Code Generator': 'Генератор крипто QR-кодів',
  'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
    'CryptoQR Tool створює скановані платіжні QR-коди для Monero, Bitcoin, Ethereum, Solana, Litecoin і стейблкоїнів ERC-20, таких як USDC та USDT, не надсилаючи адреси гаманців, завантажені логотипи або збережені пресети на сервер.',
  'Your data never leaves your browser': 'Ваші дані не залишають браузер',
  'Made with love for privacy and zero data collection.': 'Створено для приватності та без збору даних.',
  'Open generator': 'Відкрити генератор',
  'Privacy model': 'Модель приватності',
  '100% Client-Side Processing': '100% обробка на стороні клієнта',
  'Addresses, amounts, logos, and presets are generated in your browser. There is no account and no server-side address vault.':
    'Адреси, суми, логотипи та пресети створюються у вашому браузері. Обліковий запис і серверне сховище адрес не використовуються.',
  'Zero Data Collection': 'Нульовий збір даних',
  'We do not collect your wallet addresses, uploaded logos, or saved presets. Your QR workflow stays on your device.':
    'Ми не збираємо адреси гаманців, завантажені логотипи чи збережені пресети. Ваш QR-процес залишається на пристрої.',
  'Works Completely Offline': 'Працює повністю офлайн',
  'Core QR generation, styling, downloads, and saved presets keep working in the browser without a live connection.':
    'Основне створення QR, стилізація, завантаження та збережені пресети працюють у браузері без активного з’єднання.',
  'Crypto QR generators by coin': 'Генератори крипто QR за монетами',
  'Dedicated pages for each supported wallet address format and payment payload.':
    'Окремі сторінки для кожного підтримуваного формату адреси гаманця та платіжного payload.',
  'Popular crypto QR searches': 'Популярні пошуки крипто QR',
  'Frequently asked questions': 'Поширені запитання',
  'Does CryptoQR Tool store crypto addresses?': 'Чи зберігає CryptoQR Tool криптоадреси?',
  'Saved addresses and QR style presets stay in browser local storage on your device and are not synced server-side.':
    'Збережені адреси та пресети стилю QR залишаються в локальному сховищі браузера на вашому пристрої та не синхронізуються із сервером.',
  'Which networks are supported?': 'Які мережі підтримуються?',
  'CryptoQR Tool supports Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT, plus custom payload QR codes.':
    'CryptoQR Tool підтримує Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC і USDT, а також QR-коди з користувацьким payload.',
  'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
    'Відповіді про безпечне створення крипто QR-кодів, локальне зберігання в браузері, анонімну аналітику, сумісність гаманців і перевірки перед поширенням або скануванням платіжного запиту.',
  'Is CryptoQR Tool safe for generating crypto QR codes?': 'Чи безпечний CryptoQR Tool для створення крипто QR-кодів?',
  'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
    'Генератор працює у браузері та не потребує підключення гаманця, seed-фраз, приватних ключів, акаунтів або облікових даних біржі. Перед надсиланням коштів усе одно перевіряйте кожну адресу призначення або інвойс у гаманці.',
  'Does CryptoQR Tool store wallet addresses?': 'Чи зберігає CryptoQR Tool адреси гаманців?',
  'Saved addresses stay in browser local storage on your device when you choose to save them. They are not synced to a server-side address vault.':
    'Збережені адреси залишаються в локальному сховищі браузера на вашому пристрої, якщо ви вирішуєте їх зберегти. Вони не синхронізуються із серверним сховищем адрес.',
  'Does the site use cookies?': 'Чи використовує сайт cookie?',
  'The site does not set advertising, retargeting, account, or tracking cookies. It may use browser local storage for saved addresses, style presets, theme, currency, and the anonymous analytics opt-out setting.':
    'Сайт не встановлює рекламні, ретаргетингові, облікові або трекінгові cookie. Він може використовувати локальне сховище браузера для збережених адрес, пресетів стилю, теми, валюти та налаштування відмови від анонімної аналітики.',
  'What analytics are used?': 'Яка аналітика використовується?',
  'Self-hosted Umami analytics is used for aggregate page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings.':
    'Використовується власна аналітика Umami для агрегованого використання сторінок і загальних подій продукту. Вона налаштована без трекінгових cookie, поважає Do Not Track і виключає рядки запитів.',
  'Can a downloaded crypto QR code be changed later?': 'Чи можна пізніше змінити завантажений крипто QR-код?',
  'No. A downloaded QR image contains the payload that existed when you exported it. If the address, amount, invoice, chain, or style needs to change, generate a new QR code.':
    'Ні. Завантажене QR-зображення містить payload, який існував під час експорту. Якщо потрібно змінити адресу, суму, інвойс, мережу або стиль, створіть новий QR-код.',
  'What happens if a wallet ignores the amount field?': 'Що станеться, якщо гаманець ігнорує поле суми?',
  'Some wallets may scan only the destination and ignore optional URI parameters such as amount or token details. Always confirm the recipient, network, token, and amount inside the sending wallet before approving a transaction.':
    'Деякі гаманці можуть сканувати лише отримувача та ігнорувати необов’язкові параметри URI, як-от суму або дані токена. Завжди підтверджуйте отримувача, мережу, токен і суму в гаманці відправника перед схваленням транзакції.',
  'Can I paste a seed phrase or private key?': 'Чи можна вставити seed-фразу або приватний ключ?',
  'No. The tool is only for public addresses, payment URIs, Lightning invoices, transaction hashes, and custom public payloads. Never paste seed phrases or private keys into any QR generator.':
    'Ні. Інструмент призначений лише для публічних адрес, платіжних URI, Lightning-інвойсів, хешів транзакцій і користувацьких публічних payload. Ніколи не вставляйте seed-фрази або приватні ключі в QR-генератор.',
  'Does the tool provide financial advice?': 'Чи надає інструмент фінансові поради?',
  'CryptoQR Tool is a utility for generating and checking QR payloads. It does not provide investment, tax, legal, trading, custody, or financial advice.':
    'CryptoQR Tool — утиліта для створення та перевірки QR-payload. Вона не надає інвестиційних, податкових, юридичних, торгових, кастодіальних або фінансових порад.',
  'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
    'CryptoQR Tool допомагає створювати читабельні QR-payload, але остаточно підтверджувати призначення, мережу, токен, суму й комісії потрібно у гаманці. Ніколи не схвалюйте транзакцію лише тому, що QR-код успішно відсканувався.',
  'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
    'CryptoQR Tool створено як приватну утиліту. Модулі ринків, комісій і бірж звертаються до публічних API, але QR-адреси, збережені мітки, пресети стилю та користувацькі логотипи залишаються у браузері, доки ви їх не скопіюєте, завантажите, експортуєте або поширите.',
  'Generation is client-side': 'Створення виконується на клієнті',
  'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
    'Формування QR-payload, перевірка, стилізація, попередній перегляд користувацьких логотипів і завантаження виконуються у браузері.',
  'Local storage only': 'Лише локальне сховище',
  'Saved addresses and user-defined style presets use a versioned local storage key and can be deleted by the user.':
    'Збережені адреси та користувацькі пресети стилю використовують версійний ключ локального сховища й можуть бути видалені користувачем.',
  'Custom logo handling': 'Обробка користувацьких логотипів',
  'Uploaded logos are accepted as PNG, JPEG, SVG, or WebP, size-limited, and stored only when saved into a preset.':
    'Завантажені логотипи приймаються у форматах PNG, JPEG, SVG або WebP, обмежуються за розміром і зберігаються лише при додаванні до пресета.',
  'Scannability checks': 'Перевірки сканованості',
  'Contrast, quiet zone, logo size, and error-correction settings prioritize reliable scanning over decoration.':
    'Контраст, тиха зона, розмір логотипа й корекція помилок налаштовані для надійного сканування, а не декоративності.',
  'Where are saved addresses stored?': 'Де зберігаються збережені адреси?',
  'Saved addresses are stored in browser local storage under a versioned CryptoQR Tool key for this browser profile only.':
    'Збережені адреси зберігаються в локальному сховищі браузера під версійним ключем CryptoQR Tool лише для цього профілю браузера.',
  'Are custom logos uploaded?': 'Чи завантажуються користувацькі логотипи?',
  'No. Custom logos are read and previewed in the browser and are only kept locally if you save them into a preset.':
    'Ні. Користувацькі логотипи читаються й переглядаються у браузері та зберігаються локально лише якщо ви зберігаєте їх у пресет.',
  'Cookies, local storage, and analytics': 'Cookie, локальне сховище та аналітика',
  'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
    'CryptoQR Tool не використовує рекламні cookie, трекінгові cookie, акаунти, підключення гаманців або серверне сховище адрес. Основне створення QR виконується у браузері, а збережені робочі дані залишаються на вашому пристрої, доки ви їх не експортуєте або не поширите.',
  'CryptoQR Tool does not set cookies for advertising, retargeting, user accounts, or cross-site profiling. A cookie settings popup is not shown because there are no optional cookie categories to manage.':
    'CryptoQR Tool не встановлює cookie для реклами, ретаргетингу, облікових записів або міжсайтового профілювання. Вікно налаштувань cookie не показується, бо немає необов’язкових категорій cookie для керування.',
  'The site may still use browser local storage for features you control, such as saved addresses, presets, theme, currency, and analytics opt-out status.':
    'Сайт може використовувати локальне сховище браузера для функцій, якими ви керуєте: збережених адрес, пресетів, теми, валюти та статусу відмови від аналітики.',
  'Self-hosted Umami analytics helps measure page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings from page URLs.':
    'Власна аналітика Umami допомагає вимірювати використання сторінок і загальні події продукту. Вона налаштована без трекінгових cookie, поважає Do Not Track і виключає рядки запитів з URL сторінок.',
  'Saved addresses': 'Збережені адреси',
  'Public recipient addresses and labels stay in this browser profile when you choose to save them.':
    'Публічні адреси отримувачів і мітки залишаються в цьому профілі браузера, якщо ви вирішуєте їх зберегти.',
  'QR style presets': 'Пресети стилю QR',
  'Colors, quiet zones, error correction, and optional custom logo data are kept locally for reuse.':
    'Кольори, тихі зони, корекція помилок і необов’язкові дані користувацького логотипа зберігаються локально для повторного використання.',
  Preferences: 'Налаштування',
  'Theme and display currency are stored locally so the interface opens with your preferred settings.':
    'Тема та валюта відображення зберігаються локально, щоб інтерфейс відкривався з вашими вподобаннями.',
  'Analytics opt-out': 'Відмова від аналітики',
  'If you disable anonymous analytics, this browser stores a local opt-out flag named umami.disabled.':
    'Якщо ви вимикаєте анонімну аналітику, цей браузер зберігає локальний прапорець відмови umami.disabled.',
  'What stays in local storage': 'Що залишається в локальному сховищі',
  'What is not collected': 'Що не збирається',
  'No private keys, seed phrases, wallet connections, or exchange credentials are requested.':
    'Приватні ключі, seed-фрази, підключення гаманців або облікові дані бірж не запитуються.',
  'QR payloads, pasted public addresses, amounts, labels, and custom logos are not uploaded to an address vault.':
    'QR-payload, вставлені публічні адреси, суми, мітки та користувацькі логотипи не завантажуються до сховища адрес.',
  'Saved data can be removed by deleting items in the app or clearing this site browser storage.':
    'Збережені дані можна видалити, видаливши елементи в застосунку або очистивши сховище цього сайту в браузері.',
  'Browser-local data is used to provide the generator, saved address list, QR styling, and display preferences. Server logs and anonymous analytics may be used for reliability, abuse prevention, performance monitoring, and aggregate product improvement. Public market, fee, and exchange views may call external data APIs, but those modules do not require wallet connection or account data.':
    'Локальні дані браузера використовуються для генератора, списку збережених адрес, стилізації QR і налаштувань відображення. Серверні журнали та анонімна аналітика можуть використовуватися для надійності, запобігання зловживанням, моніторингу продуктивності й агрегованого покращення продукту. Розділи ринків, комісій і бірж можуть звертатися до зовнішніх API даних, але не потребують підключення гаманця або даних акаунта.',
  'These terms explain the permitted use and limits of CryptoQR Tool. By using the site, you agree to use it as a self-directed crypto QR utility and to verify all payment details before acting on them.':
    'Ці умови пояснюють дозволене використання та обмеження CryptoQR Tool. Використовуючи сайт, ви погоджуєтеся застосовувати його як самостійну утиліту для крипто QR і перевіряти всі платіжні дані перед будь-якими діями.',
  'Browser-local utility': 'Локальна браузерна утиліта',
  'CryptoQR Tool provides tools for creating and checking QR payloads in a browser. The app does not create wallets, custody funds, broker trades, or manage blockchain transactions.':
    'CryptoQR Tool надає інструменти для створення та перевірки QR-payload у браузері. Застосунок не створює гаманці, не зберігає кошти, не брокерує угоди й не керує блокчейн-транзакціями.',
  'No wallet custody or account service': 'Немає зберігання гаманців або сервісу акаунтів',
  'The service does not ask for seed phrases, private keys, exchange credentials, or wallet access. Do not enter secrets into the generator, verifier, or custom payload fields.':
    'Сервіс не запитує seed-фрази, приватні ключі, облікові дані бірж або доступ до гаманця. Не вводьте секрети в генератор, перевірку або поля користувацького payload.',
  'User verification is required': 'Потрібна перевірка користувачем',
  'You are responsible for checking every recipient address, chain, token, amount, invoice, memo, and QR payload before sharing it or sending funds.':
    'Ви відповідаєте за перевірку кожної адреси отримувача, мережі, токена, суми, інвойса, memo та QR-payload перед поширенням або надсиланням коштів.',
  'Crypto transactions are irreversible': 'Криптотранзакції незворотні',
  'Blockchain payments can be final and difficult or impossible to recover. Wallet behavior varies, and some wallets may ignore optional amount or token parameters.':
    'Платежі в блокчейні можуть бути остаточними, і їх важко або неможливо відновити. Поведінка гаманців різниться, деякі можуть ігнорувати необов’язкові параметри суми або токена.',
  'CryptoQR Tool does not provide investment, tax, legal, trading, custody, accounting, or financial advice. Market, fee, exchange, and verification data are informational and may be delayed, incomplete, inaccurate, or unavailable.':
    'CryptoQR Tool не надає інвестиційних, податкових, юридичних, торгових, кастодіальних, бухгалтерських або фінансових порад. Дані ринків, комісій, бірж і перевірки мають інформаційний характер і можуть бути затриманими, неповними, неточними або недоступними.',
  'You are responsible for your own decisions, wallet configuration, transaction review, and compliance obligations.':
    'Ви відповідаєте за власні рішення, налаштування гаманця, перевірку транзакцій і дотримання вимог.',
  'Do not use the site to misrepresent payment destinations, impersonate another party, distribute malicious QR payloads, or facilitate fraud.':
    'Не використовуйте сайт для викривлення платіжних призначень, видавання себе за іншу сторону, поширення шкідливих QR-payload або сприяння шахрайству.',
  'Do not interfere with site availability, bypass rate limits, scrape aggressively, or abuse public API endpoints.':
    'Не порушуйте доступність сайту, не обходьте ліміти, не виконуйте агресивний збір даних і не зловживайте публічними API.',
  'Do not rely on generated QR codes as the only verification step for a transaction. Always confirm details in a trusted wallet or explorer.':
    'Не покладайтеся на створені QR-коди як на єдиний етап перевірки транзакції. Завжди підтверджуйте дані в надійному гаманці або оглядачі.',
  'The site is provided as-is and may change, pause, or stop without notice. To the fullest extent permitted by law, CryptoQR Tool is not liable for lost funds, wrong-address payments, wallet incompatibility, network fees, failed scans, delayed data, third-party API behavior, or other losses from using generated or verified payloads.':
    'Сайт надається як є і може змінюватися, призупинятися або припиняти роботу без повідомлення. У максимальному обсязі, дозволеному законом, CryptoQR Tool не несе відповідальності за втрату коштів, платежі на неправильну адресу, несумісність гаманців, мережеві комісії, невдалі сканування, затримані дані, поведінку сторонніх API або інші втрати від використання створених чи перевірених payload.',
  'Browser-local library': 'Локальна бібліотека браузера',
  'Saved addresses and presets': 'Збережені адреси та пресети',
  'This page reads only from local storage in this browser. Saved custom logos are kept as data URLs only inside saved presets.':
    'Ця сторінка читає дані лише з локального сховища цього браузера. Збережені користувацькі логотипи зберігаються як data URL лише всередині пресетів.',
  'All networks': 'Усі мережі',
  'Generate QR': 'Створити QR',
  'Edit label': 'Редагувати мітку',
  'Delete address': 'Видалити адресу',
  'No saved addresses yet.': 'Збережених адрес ще немає.',
  'Style presets': 'Пресети стилю',
  'Apply preset': 'Застосувати пресет',
  'Edit preset name': 'Редагувати назву пресета',
  'Delete preset': 'Видалити пресет',
  'No user-defined style presets yet. Save one from the generator after customizing QR styling.':
    'Користувацьких пресетів стилю ще немає. Збережіть один із генератора після налаштування стилю QR.',
  'Rename saved address': 'Перейменувати збережену адресу',
  'Rename style preset': 'Перейменувати пресет стилю',
  'Copied to clipboard.': 'Скопійовано до буфера обміну.',
  dots: 'точки',
  logo: 'логотип',
  'quiet zone': 'тиха зона',
  'Generate the same wallet-compatible crypto QR payloads from server-side requests. The API returns SVG by default, supports guided network validation, custom payloads, scan-safe colors, quiet-zone sizing, and local catalog logos.':
    'Створюйте ті самі сумісні з гаманцями крипто QR-payload із серверних запитів. API за замовчуванням повертає SVG і підтримує керовану перевірку мереж, користувацькі payload, безпечні для сканування кольори, розмір тихої зони та локальні каталожні логотипи.',
  'Send JSON for larger payloads or nested style options.': 'Надсилайте JSON для більших payload або вкладених параметрів стилю.',
  'Direct SVG URL': 'Прямий URL SVG',
  'POST JSON response': 'JSON-відповідь POST',
  'Custom payload SVG': 'SVG користувацького payload',
  Endpoint: 'Кінцева точка',
  'Request Fields': 'Поля запиту',
  Field: 'Поле',
  Type: 'Тип',
  Notes: 'Примітки',
  'Supported Networks': 'Підтримувані мережі',
  'Token Chains': 'Мережі токенів',
  'Responses And Errors': 'Відповіді та помилки',
  Success: 'Успіх',
  Errors: 'Помилки',
  'Defaults to guided unless payload is provided.': 'За замовчуванням використовується керований режим, якщо payload не вказано.',
  'Automatic detection supports the same address formats as the generator.':
    'Автоматичне визначення підтримує ті самі формати адрес, що й генератор.',
  'Validated for guided payment networks.': 'Перевіряється для керованих платіжних мереж.',
  'Optional positive decimal amount. Invalid amounts are ignored.': 'Необов’язкова додатна десяткова сума. Недійсні суми ігноруються.',
  'Required for custom mode. Limited to 4096 characters.': 'Обов’язково для користувацького режиму. Обмеження: 4096 символів.',
  'SVG is returned as image/svg+xml. JSON includes payload, network, validation, and svg.':
    'SVG повертається як image/svg+xml. JSON містить payload, network, validation і svg.',
  'Supports foreground, background, margin, logo, logoVariant, and logoSize.':
    'Підтримує foreground, background, margin, logo, logoVariant і logoSize.',
  'for SVG requests, or': 'для SVG-запитів або',
  when: 'коли',
  'Invalid addresses, unknown automatic networks, malformed JSON, or empty custom payloads return JSON errors with':
    'Недійсні адреси, невідомі автоматичні мережі, некоректний JSON або порожні користувацькі payload повертають JSON-помилки зі статусом',
  status: 'статус',
  Guide: 'Посібник',
  'Wallet context': 'Контекст гаманця',
  'Local only': 'Лише локально',
  Address: 'Адреса',
  Validation: 'Перевірка',
  Explorer: 'Оглядач',
  Safety: 'Безпека'
};

const complaintPageExtras: Partial<Record<Locale, PhraseMap>> = {
  es: {
    'Browser-local crypto QR utility': 'Utilidad QR cripto local',
    'Crypto QR Code Generator': 'Generador de códigos QR cripto',
    'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
      'CryptoQR Tool genera códigos QR de pago escaneables para Monero, Bitcoin, Ethereum, Solana, Litecoin y stablecoins ERC-20 como USDC y USDT sin enviar direcciones, logos subidos ni preajustes guardados a un servidor.',
    '100% Client-Side Processing': 'Procesamiento 100% en el cliente',
    'Addresses, amounts, logos, and presets are generated in your browser. There is no account and no server-side address vault.':
      'Las direcciones, importes, logos y preajustes se generan en tu navegador. No hay cuenta ni bóveda de direcciones en servidor.',
    'Zero Data Collection': 'Cero recopilación de datos',
    'We do not collect your wallet addresses, uploaded logos, or saved presets. Your QR workflow stays on your device.':
      'No recopilamos direcciones de cartera, logos subidos ni preajustes guardados. Tu flujo QR permanece en tu dispositivo.',
    'Works Completely Offline': 'Funciona completamente sin conexión',
    'Core QR generation, styling, downloads, and saved presets keep working in the browser without a live connection.':
      'La generación QR, estilos, descargas y preajustes guardados siguen funcionando en el navegador sin conexión activa.',
    'Crypto QR generators by coin': 'Generadores QR cripto por moneda',
    'Dedicated pages for each supported wallet address format and payment payload.':
      'Páginas dedicadas para cada formato de dirección y payload de pago compatible.',
    'Popular crypto QR searches': 'Búsquedas populares de QR cripto',
    'Frequently asked questions': 'Preguntas frecuentes',
    'Does CryptoQR Tool store crypto addresses?': '¿CryptoQR Tool almacena direcciones cripto?',
    'Saved addresses and QR style presets stay in browser local storage on your device and are not synced server-side.':
      'Las direcciones guardadas y los preajustes de estilo QR permanecen en el almacenamiento local del navegador y no se sincronizan con el servidor.',
    'Which networks are supported?': '¿Qué redes son compatibles?',
    'CryptoQR Tool supports Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT, plus custom payload QR codes.':
      'CryptoQR Tool admite Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC y USDT, además de códigos QR con payload personalizado.',
    'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
      'Respuestas sobre generación segura de QR cripto, almacenamiento local, analítica anónima, compatibilidad de carteras y comprobaciones antes de compartir o escanear una solicitud de pago.',
    'Is CryptoQR Tool safe for generating crypto QR codes?': '¿CryptoQR Tool es seguro para generar códigos QR cripto?',
    'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
      'El generador se ejecuta en tu navegador y no requiere conexión de cartera, frases semilla, claves privadas, cuentas ni credenciales de exchange. Aun así, verifica cada dirección o factura en tu cartera antes de enviar fondos.',
    'Does CryptoQR Tool store wallet addresses?': '¿CryptoQR Tool almacena direcciones de cartera?',
    'Saved addresses stay in browser local storage on your device when you choose to save them. They are not synced to a server-side address vault.':
      'Las direcciones guardadas permanecen en el almacenamiento local del navegador cuando decides guardarlas. No se sincronizan con una bóveda de direcciones del servidor.',
    'Does the site use cookies?': '¿El sitio usa cookies?',
    'The site does not set advertising, retargeting, account, or tracking cookies. It may use browser local storage for saved addresses, style presets, theme, currency, and the anonymous analytics opt-out setting.':
      'El sitio no establece cookies publicitarias, de retargeting, cuenta o seguimiento. Puede usar almacenamiento local para direcciones, preajustes, tema, moneda y exclusión de analítica anónima.',
    'What analytics are used?': '¿Qué analítica se usa?',
    'Self-hosted Umami analytics is used for aggregate page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings.':
      'Se usa Umami autoalojado para uso agregado de páginas y eventos generales del producto. Está configurado sin cookies de seguimiento, respeta Do Not Track y excluye cadenas de consulta.',
    'Can a downloaded crypto QR code be changed later?': '¿Puede cambiarse después un QR cripto descargado?',
    'No. A downloaded QR image contains the payload that existed when you exported it. If the address, amount, invoice, chain, or style needs to change, generate a new QR code.':
      'No. Una imagen QR descargada contiene el payload existente al exportarla. Si cambia la dirección, importe, factura, cadena o estilo, genera un QR nuevo.',
    'What happens if a wallet ignores the amount field?': '¿Qué ocurre si una cartera ignora el campo de importe?',
    'Some wallets may scan only the destination and ignore optional URI parameters such as amount or token details. Always confirm the recipient, network, token, and amount inside the sending wallet before approving a transaction.':
      'Algunas carteras pueden leer solo el destino e ignorar parámetros opcionales como importe o token. Confirma siempre destinatario, red, token e importe en la cartera antes de aprobar.',
    'Can I paste a seed phrase or private key?': '¿Puedo pegar una frase semilla o clave privada?',
    'No. The tool is only for public addresses, payment URIs, Lightning invoices, transaction hashes, and custom public payloads. Never paste seed phrases or private keys into any QR generator.':
      'No. La herramienta es solo para direcciones públicas, URI de pago, facturas Lightning, hashes de transacción y payloads públicos. Nunca pegues frases semilla ni claves privadas.',
    'Does the tool provide financial advice?': '¿La herramienta ofrece asesoramiento financiero?',
    'CryptoQR Tool is a utility for generating and checking QR payloads. It does not provide investment, tax, legal, trading, custody, or financial advice.':
      'CryptoQR Tool es una utilidad para generar y comprobar payloads QR. No ofrece asesoramiento de inversión, fiscal, legal, trading, custodia ni financiero.',
    'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
      'CryptoQR Tool ayuda a crear payloads QR legibles, pero tu cartera es el lugar final para confirmar destino, cadena, token, importe y comisiones. Nunca apruebes una transacción solo porque un QR se escaneó correctamente.',
    'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
      'CryptoQR Tool está diseñado como utilidad privada. Los módulos de mercado, comisiones y exchanges llaman a API públicas, pero direcciones QR, etiquetas, preajustes y logos permanecen en el navegador salvo que los copies, descargues, exportes o compartas.',
    'Generation is client-side': 'La generación es del lado del cliente',
    'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
      'La construcción, validación, estilo, vista previa de logos y descargas de payloads QR se ejecutan en el navegador.',
    'Local storage only': 'Solo almacenamiento local',
    'Saved addresses and user-defined style presets use a versioned local storage key and can be deleted by the user.':
      'Las direcciones guardadas y preajustes del usuario usan una clave versionada de almacenamiento local y pueden eliminarse.',
    'Custom logo handling': 'Gestión de logos personalizados',
    'Uploaded logos are accepted as PNG, JPEG, SVG, or WebP, size-limited, and stored only when saved into a preset.':
      'Los logos subidos se aceptan como PNG, JPEG, SVG o WebP, tienen límite de tamaño y solo se guardan al incluirlos en un preajuste.',
    'Scannability checks': 'Comprobaciones de escaneo',
    'Contrast, quiet zone, logo size, and error-correction settings prioritize reliable scanning over decoration.':
      'Contraste, zona silenciosa, tamaño de logo y corrección de errores priorizan el escaneo fiable sobre la decoración.',
    'Where are saved addresses stored?': '¿Dónde se almacenan las direcciones guardadas?',
    'Saved addresses are stored in browser local storage under a versioned CryptoQR Tool key for this browser profile only.':
      'Las direcciones se almacenan en el almacenamiento local del navegador bajo una clave versionada de CryptoQR Tool solo para este perfil.',
    'Are custom logos uploaded?': '¿Se suben los logos personalizados?',
    'No. Custom logos are read and previewed in the browser and are only kept locally if you save them into a preset.':
      'No. Los logos se leen y previsualizan en el navegador y solo se conservan localmente si los guardas en un preajuste.',
    'Cookies, local storage, and analytics': 'Cookies, almacenamiento local y analítica',
    'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
      'CryptoQR Tool no usa cookies publicitarias ni de seguimiento, cuentas, conexiones de cartera ni bóveda de direcciones en servidor. La generación QR funciona en el navegador y los datos guardados permanecen en tu dispositivo salvo que los exportes o compartas.',
    'CryptoQR Tool does not set cookies for advertising, retargeting, user accounts, or cross-site profiling. A cookie settings popup is not shown because there are no optional cookie categories to manage.':
      'CryptoQR Tool no establece cookies de publicidad, retargeting, cuentas ni perfilado entre sitios. No se muestra un panel de cookies porque no hay categorías opcionales que gestionar.',
    'The site may still use browser local storage for features you control, such as saved addresses, presets, theme, currency, and analytics opt-out status.':
      'El sitio puede usar almacenamiento local para funciones que controlas, como direcciones guardadas, preajustes, tema, moneda y estado de exclusión de analítica.',
    'Self-hosted Umami analytics helps measure page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings from page URLs.':
      'La analítica Umami autoalojada mide uso de páginas y eventos generales. Está configurada sin cookies de seguimiento, respeta Do Not Track y excluye consultas de las URL.',
    'Saved addresses': 'Direcciones guardadas',
    'Public recipient addresses and labels stay in this browser profile when you choose to save them.':
      'Las direcciones públicas y etiquetas permanecen en este perfil del navegador cuando decides guardarlas.',
    'QR style presets': 'Preajustes de estilo QR',
    'Colors, quiet zones, error correction, and optional custom logo data are kept locally for reuse.':
      'Colores, zonas silenciosas, corrección de errores y datos opcionales de logos se guardan localmente para reutilizarlos.',
    Preferences: 'Preferencias',
    'Theme and display currency are stored locally so the interface opens with your preferred settings.':
      'El tema y la moneda se guardan localmente para abrir la interfaz con tus preferencias.',
    'Analytics opt-out': 'Exclusión de analítica',
    'If you disable anonymous analytics, this browser stores a local opt-out flag named umami.disabled.':
      'Si desactivas la analítica anónima, este navegador guarda una marca local llamada umami.disabled.',
    'What stays in local storage': 'Qué queda en almacenamiento local',
    'What is not collected': 'Qué no se recopila',
    'No private keys, seed phrases, wallet connections, or exchange credentials are requested.':
      'No se solicitan claves privadas, frases semilla, conexiones de cartera ni credenciales de exchange.',
    'QR payloads, pasted public addresses, amounts, labels, and custom logos are not uploaded to an address vault.':
      'Payloads QR, direcciones públicas pegadas, importes, etiquetas y logos no se suben a una bóveda de direcciones.',
    'Saved data can be removed by deleting items in the app or clearing this site browser storage.':
      'Los datos guardados pueden eliminarse borrando elementos en la app o limpiando el almacenamiento del sitio.',
    'Browser-local data is used to provide the generator, saved address list, QR styling, and display preferences. Server logs and anonymous analytics may be used for reliability, abuse prevention, performance monitoring, and aggregate product improvement. Public market, fee, and exchange views may call external data APIs, but those modules do not require wallet connection or account data.':
      'Los datos locales del navegador se usan para el generador, lista de direcciones, estilo QR y preferencias. Registros y analítica anónima pueden usarse para fiabilidad, prevención de abuso, rendimiento y mejora agregada. Mercado, comisiones y exchanges pueden llamar API externas, pero no requieren conexión de cartera ni cuenta.'
  },
  fr: {
    'Browser-local crypto QR utility': 'Utilitaire QR crypto local',
    'Crypto QR Code Generator': 'Générateur de QR codes crypto',
    'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
      'CryptoQR Tool génère des QR codes de paiement scannables pour Monero, Bitcoin, Ethereum, Solana, Litecoin et les stablecoins ERC-20 comme USDC et USDT sans envoyer les adresses, logos importés ou préréglages vers un serveur.',
    '100% Client-Side Processing': 'Traitement 100 % côté client',
    'Addresses, amounts, logos, and presets are generated in your browser. There is no account and no server-side address vault.':
      'Les adresses, montants, logos et préréglages sont générés dans votre navigateur. Il n’y a ni compte ni coffre d’adresses côté serveur.',
    'Zero Data Collection': 'Aucune collecte de données',
    'We do not collect your wallet addresses, uploaded logos, or saved presets. Your QR workflow stays on your device.':
      'Nous ne collectons pas vos adresses de portefeuille, logos importés ni préréglages. Votre flux QR reste sur votre appareil.',
    'Works Completely Offline': 'Fonctionne entièrement hors ligne',
    'Core QR generation, styling, downloads, and saved presets keep working in the browser without a live connection.':
      'La génération QR, le style, les téléchargements et les préréglages continuent de fonctionner dans le navigateur sans connexion active.',
    'Crypto QR generators by coin': 'Générateurs QR crypto par monnaie',
    'Dedicated pages for each supported wallet address format and payment payload.':
      'Pages dédiées pour chaque format d’adresse de portefeuille et payload de paiement pris en charge.',
    'Popular crypto QR searches': 'Recherches QR crypto populaires',
    'Frequently asked questions': 'Questions fréquentes',
    'Does CryptoQR Tool store crypto addresses?': 'CryptoQR Tool stocke-t-il des adresses crypto ?',
    'Saved addresses and QR style presets stay in browser local storage on your device and are not synced server-side.':
      'Les adresses sauvegardées et les préréglages QR restent dans le stockage local du navigateur sur votre appareil et ne sont pas synchronisés côté serveur.',
    'Which networks are supported?': 'Quels réseaux sont pris en charge ?',
    'CryptoQR Tool supports Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT, plus custom payload QR codes.':
      'CryptoQR Tool prend en charge Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC et USDT, ainsi que les QR codes à payload personnalisé.',
    'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
      'Réponses sur la génération sécurisée de QR codes crypto, le stockage local, l’analytique anonyme, la compatibilité des portefeuilles et les vérifications avant de partager ou scanner une demande de paiement.',
    'Is CryptoQR Tool safe for generating crypto QR codes?': 'CryptoQR Tool est-il sûr pour générer des QR codes crypto ?',
    'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
      'Le générateur fonctionne dans votre navigateur et ne demande ni connexion de portefeuille, ni phrase de récupération, ni clé privée, ni compte, ni identifiant d’exchange. Vérifiez toujours chaque adresse ou facture dans votre portefeuille avant d’envoyer des fonds.',
    'Does CryptoQR Tool store wallet addresses?': 'CryptoQR Tool stocke-t-il les adresses de portefeuille ?',
    'Saved addresses stay in browser local storage on your device when you choose to save them. They are not synced to a server-side address vault.':
      'Les adresses enregistrées restent dans le stockage local du navigateur sur votre appareil lorsque vous choisissez de les sauvegarder. Elles ne sont pas synchronisées avec un coffre d’adresses côté serveur.',
    'Does the site use cookies?': 'Le site utilise-t-il des cookies ?',
    'The site does not set advertising, retargeting, account, or tracking cookies. It may use browser local storage for saved addresses, style presets, theme, currency, and the anonymous analytics opt-out setting.':
      'Le site ne dépose pas de cookies publicitaires, de reciblage, de compte ou de suivi. Il peut utiliser le stockage local du navigateur pour les adresses, préréglages, thème, devise et le réglage de refus de l’analytique anonyme.',
    'What analytics are used?': 'Quelle analytique est utilisée ?',
    'Self-hosted Umami analytics is used for aggregate page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings.':
      'Une analytique Umami auto-hébergée est utilisée pour l’usage agrégé des pages et des événements produit généraux. Elle est configurée sans cookies de suivi, respecte Do Not Track et exclut les chaînes de requête.',
    'Can a downloaded crypto QR code be changed later?': 'Un QR code crypto téléchargé peut-il être modifié ensuite ?',
    'No. A downloaded QR image contains the payload that existed when you exported it. If the address, amount, invoice, chain, or style needs to change, generate a new QR code.':
      'Non. Une image QR téléchargée contient le payload présent au moment de l’export. Si l’adresse, le montant, la facture, la chaîne ou le style change, générez un nouveau QR code.',
    'What happens if a wallet ignores the amount field?': 'Que se passe-t-il si un portefeuille ignore le champ montant ?',
    'Some wallets may scan only the destination and ignore optional URI parameters such as amount or token details. Always confirm the recipient, network, token, and amount inside the sending wallet before approving a transaction.':
      'Certains portefeuilles peuvent lire uniquement la destination et ignorer les paramètres URI optionnels comme le montant ou les détails du token. Confirmez toujours destinataire, réseau, token et montant dans le portefeuille avant d’approuver.',
    'Can I paste a seed phrase or private key?': 'Puis-je coller une phrase de récupération ou une clé privée ?',
    'No. The tool is only for public addresses, payment URIs, Lightning invoices, transaction hashes, and custom public payloads. Never paste seed phrases or private keys into any QR generator.':
      'Non. L’outil est uniquement destiné aux adresses publiques, URI de paiement, factures Lightning, hashes de transaction et payloads publics personnalisés. Ne collez jamais de phrase de récupération ni de clé privée.',
    'Does the tool provide financial advice?': 'L’outil fournit-il des conseils financiers ?',
    'CryptoQR Tool is a utility for generating and checking QR payloads. It does not provide investment, tax, legal, trading, custody, or financial advice.':
      'CryptoQR Tool est un utilitaire de génération et de vérification de payloads QR. Il ne fournit aucun conseil d’investissement, fiscal, juridique, de trading, de conservation ou financier.',
    'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
      'CryptoQR Tool aide à créer des payloads QR lisibles, mais votre portefeuille reste l’endroit final pour confirmer destination, chaîne, token, montant et frais. N’approuvez jamais une transaction uniquement parce qu’un QR code a été scanné.',
    'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
      'CryptoQR Tool est conçu comme un utilitaire privé. Les modules de marché, frais et exchanges appellent des API publiques, mais les adresses QR, libellés, préréglages et logos restent dans le navigateur sauf si vous les copiez, téléchargez, exportez ou partagez.',
    'Generation is client-side': 'La génération est côté client',
    'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
      'La construction, validation, mise en forme, prévisualisation des logos et téléchargements des payloads QR s’exécutent dans le navigateur.',
    'Local storage only': 'Stockage local uniquement',
    'Saved addresses and user-defined style presets use a versioned local storage key and can be deleted by the user.':
      'Les adresses sauvegardées et préréglages de style utilisent une clé de stockage local versionnée et peuvent être supprimés par l’utilisateur.',
    'Custom logo handling': 'Gestion des logos personnalisés',
    'Uploaded logos are accepted as PNG, JPEG, SVG, or WebP, size-limited, and stored only when saved into a preset.':
      'Les logos importés sont acceptés en PNG, JPEG, SVG ou WebP, limités en taille et stockés uniquement lorsqu’ils sont enregistrés dans un préréglage.',
    'Scannability checks': 'Contrôles de scannabilité',
    'Contrast, quiet zone, logo size, and error-correction settings prioritize reliable scanning over decoration.':
      'Le contraste, la zone silencieuse, la taille du logo et la correction d’erreurs privilégient un scan fiable plutôt que la décoration.',
    'Where are saved addresses stored?': 'Où sont stockées les adresses sauvegardées ?',
    'Saved addresses are stored in browser local storage under a versioned CryptoQR Tool key for this browser profile only.':
      'Les adresses sauvegardées sont stockées dans le stockage local du navigateur sous une clé CryptoQR Tool versionnée, uniquement pour ce profil.',
    'Are custom logos uploaded?': 'Les logos personnalisés sont-ils téléversés ?',
    'No. Custom logos are read and previewed in the browser and are only kept locally if you save them into a preset.':
      'Non. Les logos personnalisés sont lus et prévisualisés dans le navigateur et ne sont conservés localement que si vous les enregistrez dans un préréglage.',
    'Cookies, local storage, and analytics': 'Cookies, stockage local et analytique',
    'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
      'CryptoQR Tool n’utilise pas de cookies publicitaires ou de suivi, de comptes, de connexions de portefeuille ni de coffre d’adresses côté serveur. La génération QR fonctionne dans le navigateur et les données sauvegardées restent sur votre appareil sauf export ou partage.',
    'CryptoQR Tool does not set cookies for advertising, retargeting, user accounts, or cross-site profiling. A cookie settings popup is not shown because there are no optional cookie categories to manage.':
      'CryptoQR Tool ne dépose pas de cookies publicitaires, de reciblage, de compte ou de profilage intersites. Aucune fenêtre de réglage des cookies n’est affichée, car il n’y a pas de catégories optionnelles à gérer.',
    'The site may still use browser local storage for features you control, such as saved addresses, presets, theme, currency, and analytics opt-out status.':
      'Le site peut utiliser le stockage local du navigateur pour les fonctions que vous contrôlez, comme les adresses sauvegardées, préréglages, thème, devise et refus de l’analytique.',
    'Self-hosted Umami analytics helps measure page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings from page URLs.':
      'L’analytique Umami auto-hébergée mesure l’usage des pages et des événements produit généraux. Elle est configurée sans cookies de suivi, respecte Do Not Track et exclut les paramètres d’URL.',
    'Saved addresses': 'Adresses sauvegardées',
    'Public recipient addresses and labels stay in this browser profile when you choose to save them.':
      'Les adresses publiques de destinataire et libellés restent dans ce profil de navigateur lorsque vous les sauvegardez.',
    'QR style presets': 'Préréglages de style QR',
    'Colors, quiet zones, error correction, and optional custom logo data are kept locally for reuse.':
      'Les couleurs, zones silencieuses, correction d’erreurs et données de logo optionnelles sont conservées localement pour réutilisation.',
    Preferences: 'Préférences',
    'Theme and display currency are stored locally so the interface opens with your preferred settings.':
      'Le thème et la devise d’affichage sont stockés localement afin que l’interface s’ouvre avec vos préférences.',
    'Analytics opt-out': 'Refus de l’analytique',
    'If you disable anonymous analytics, this browser stores a local opt-out flag named umami.disabled.':
      'Si vous désactivez l’analytique anonyme, ce navigateur stocke un indicateur local nommé umami.disabled.',
    'What stays in local storage': 'Ce qui reste en stockage local',
    'What is not collected': 'Ce qui n’est pas collecté',
    'No private keys, seed phrases, wallet connections, or exchange credentials are requested.':
      'Aucune clé privée, phrase de récupération, connexion de portefeuille ou identifiant d’exchange n’est demandé.',
    'QR payloads, pasted public addresses, amounts, labels, and custom logos are not uploaded to an address vault.':
      'Les payloads QR, adresses publiques collées, montants, libellés et logos ne sont pas envoyés vers un coffre d’adresses.',
    'Saved data can be removed by deleting items in the app or clearing this site browser storage.':
      'Les données sauvegardées peuvent être supprimées depuis l’app ou en vidant le stockage navigateur de ce site.',
    'Browser-local data is used to provide the generator, saved address list, QR styling, and display preferences. Server logs and anonymous analytics may be used for reliability, abuse prevention, performance monitoring, and aggregate product improvement. Public market, fee, and exchange views may call external data APIs, but those modules do not require wallet connection or account data.':
      'Les données locales du navigateur servent au générateur, à la liste d’adresses, au style QR et aux préférences. Journaux serveur et analytique anonyme peuvent servir à la fiabilité, prévention des abus, performance et amélioration agrégée. Les vues marché, frais et exchanges peuvent appeler des API externes, mais ne demandent ni connexion de portefeuille ni compte.'
  },
  pt: {
    'Browser-local crypto QR utility': 'Utilitário QR cripto local',
    'Crypto QR Code Generator': 'Gerador de códigos QR cripto',
    'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
      'O CryptoQR Tool gera códigos QR de pagamento escaneáveis para Monero, Bitcoin, Ethereum, Solana, Litecoin e stablecoins ERC-20 como USDC e USDT sem enviar endereços, logos enviados ou predefinições salvas para um servidor.',
    'Your data never leaves your browser': 'Seus dados nunca saem do navegador',
    'Made with love for privacy and zero data collection.': 'Feito para privacidade e sem coleta de dados.',
    'Open generator': 'Abrir gerador',
    'Privacy model': 'Modelo de privacidade',
    '100% Client-Side Processing': 'Processamento 100% no cliente',
    'Addresses, amounts, logos, and presets are generated in your browser. There is no account and no server-side address vault.':
      'Endereços, valores, logos e predefinições são gerados no navegador. Não há conta nem cofre de endereços no servidor.',
    'Zero Data Collection': 'Zero coleta de dados',
    'We do not collect your wallet addresses, uploaded logos, or saved presets. Your QR workflow stays on your device.':
      'Não coletamos endereços de carteira, logos enviados nem predefinições salvas. Seu fluxo QR fica no seu dispositivo.',
    'Works Completely Offline': 'Funciona totalmente offline',
    'Core QR generation, styling, downloads, and saved presets keep working in the browser without a live connection.':
      'A geração de QR, estilo, downloads e predefinições salvas continuam funcionando no navegador sem conexão ativa.',
    'Crypto QR generators by coin': 'Geradores QR cripto por moeda',
    'Dedicated pages for each supported wallet address format and payment payload.':
      'Páginas dedicadas para cada formato de endereço de carteira e payload de pagamento compatível.',
    'Popular crypto QR searches': 'Buscas populares de QR cripto',
    'Frequently asked questions': 'Perguntas frequentes',
    'Does CryptoQR Tool store crypto addresses?': 'O CryptoQR Tool armazena endereços cripto?',
    'Saved addresses and QR style presets stay in browser local storage on your device and are not synced server-side.':
      'Endereços salvos e predefinições de estilo QR ficam no armazenamento local do navegador e não são sincronizados com o servidor.',
    'Which networks are supported?': 'Quais redes são compatíveis?',
    'CryptoQR Tool supports Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT, plus custom payload QR codes.':
      'O CryptoQR Tool oferece suporte a Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC e USDT, além de códigos QR com payload personalizado.',
    'Crypto QR Code FAQ': 'FAQ de códigos QR cripto',
    'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
      'Respostas sobre geração segura de QR cripto, armazenamento local no navegador, análise anônima, compatibilidade de carteiras e verificações antes de compartilhar ou escanear um pedido de pagamento.',
    'Is CryptoQR Tool safe for generating crypto QR codes?': 'O CryptoQR Tool é seguro para gerar códigos QR cripto?',
    'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
      'O gerador roda no navegador e não exige conexão de carteira, frases seed, chaves privadas, contas ou credenciais de exchange. Ainda assim, verifique cada endereço ou fatura na carteira antes de enviar fundos.',
    'Does CryptoQR Tool store wallet addresses?': 'O CryptoQR Tool armazena endereços de carteira?',
    'Saved addresses stay in browser local storage on your device when you choose to save them. They are not synced to a server-side address vault.':
      'Endereços salvos ficam no armazenamento local do navegador quando você escolhe salvá-los. Eles não são sincronizados com um cofre de endereços no servidor.',
    'Does the site use cookies?': 'O site usa cookies?',
    'The site does not set advertising, retargeting, account, or tracking cookies. It may use browser local storage for saved addresses, style presets, theme, currency, and the anonymous analytics opt-out setting.':
      'O site não define cookies de publicidade, retargeting, conta ou rastreamento. Ele pode usar armazenamento local para endereços salvos, predefinições, tema, moeda e opção de recusa de análise anônima.',
    'What analytics are used?': 'Quais análises são usadas?',
    'Self-hosted Umami analytics is used for aggregate page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings.':
      'A análise Umami auto-hospedada é usada para uso agregado de páginas e eventos gerais do produto. Ela é configurada sem cookies de rastreamento, respeita Do Not Track e exclui strings de consulta.',
    'Can a downloaded crypto QR code be changed later?': 'Um QR cripto baixado pode ser alterado depois?',
    'No. A downloaded QR image contains the payload that existed when you exported it. If the address, amount, invoice, chain, or style needs to change, generate a new QR code.':
      'Não. Uma imagem QR baixada contém o payload existente no momento da exportação. Se endereço, valor, fatura, rede ou estilo mudar, gere um novo QR.',
    'What happens if a wallet ignores the amount field?': 'O que acontece se uma carteira ignorar o campo de valor?',
    'Some wallets may scan only the destination and ignore optional URI parameters such as amount or token details. Always confirm the recipient, network, token, and amount inside the sending wallet before approving a transaction.':
      'Algumas carteiras podem ler apenas o destino e ignorar parâmetros URI opcionais, como valor ou detalhes do token. Sempre confirme destinatário, rede, token e valor na carteira antes de aprovar.',
    'Can I paste a seed phrase or private key?': 'Posso colar uma frase seed ou chave privada?',
    'No. The tool is only for public addresses, payment URIs, Lightning invoices, transaction hashes, and custom public payloads. Never paste seed phrases or private keys into any QR generator.':
      'Não. A ferramenta é apenas para endereços públicos, URIs de pagamento, faturas Lightning, hashes de transação e payloads públicos personalizados. Nunca cole frases seed ou chaves privadas.',
    'Does the tool provide financial advice?': 'A ferramenta oferece aconselhamento financeiro?',
    'CryptoQR Tool is a utility for generating and checking QR payloads. It does not provide investment, tax, legal, trading, custody, or financial advice.':
      'O CryptoQR Tool é um utilitário para gerar e verificar payloads QR. Ele não oferece aconselhamento de investimento, fiscal, jurídico, trading, custódia ou financeiro.',
    'Still verify in your wallet': 'Ainda verifique na sua carteira',
    'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
      'O CryptoQR Tool ajuda a criar payloads QR legíveis, mas sua carteira é o local final para confirmar destino, rede, token, valor e taxas. Nunca aprove uma transação apenas porque um QR foi escaneado.',
    'Trust and privacy': 'Confiança e privacidade',
    'No account, no wallet connection, no server vault': 'Sem conta, sem conexão de carteira, sem cofre no servidor',
    'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
      'O CryptoQR Tool foi criado como utilitário privado. Módulos de mercado, taxas e exchanges chamam APIs públicas, mas endereços QR, etiquetas, predefinições e logos ficam no navegador salvo se você copiar, baixar, exportar ou compartilhar.',
    'Generation is client-side': 'A geração é no cliente',
    'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
      'Construção, validação, estilo, prévia de logos e downloads de payloads QR rodam no navegador.',
    'Local storage only': 'Somente armazenamento local',
    'Saved addresses and user-defined style presets use a versioned local storage key and can be deleted by the user.':
      'Endereços salvos e predefinições do usuário usam uma chave versionada de armazenamento local e podem ser excluídos pelo usuário.',
    'Custom logo handling': 'Tratamento de logos personalizados',
    'Uploaded logos are accepted as PNG, JPEG, SVG, or WebP, size-limited, and stored only when saved into a preset.':
      'Logos enviados são aceitos como PNG, JPEG, SVG ou WebP, têm limite de tamanho e só são armazenados quando salvos em uma predefinição.',
    'Scannability checks': 'Verificações de escaneabilidade',
    'Contrast, quiet zone, logo size, and error-correction settings prioritize reliable scanning over decoration.':
      'Contraste, zona silenciosa, tamanho do logo e correção de erros priorizam escaneamento confiável em vez de decoração.',
    'Privacy and security FAQ': 'FAQ de privacidade e segurança',
    'Where are saved addresses stored?': 'Onde os endereços salvos ficam armazenados?',
    'Saved addresses are stored in browser local storage under a versioned CryptoQR Tool key for this browser profile only.':
      'Endereços salvos ficam no armazenamento local do navegador sob uma chave versionada do CryptoQR Tool apenas para este perfil.',
    'Are custom logos uploaded?': 'Logos personalizados são enviados?',
    'No. Custom logos are read and previewed in the browser and are only kept locally if you save them into a preset.':
      'Não. Logos personalizados são lidos e pré-visualizados no navegador e só ficam locais se você os salvar em uma predefinição.',
    'Cookies, local storage, and analytics': 'Cookies, armazenamento local e análise',
    'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
      'O CryptoQR Tool não usa cookies de publicidade ou rastreamento, contas, conexões de carteira nem cofre de endereços no servidor. A geração QR roda no navegador e os dados salvos ficam no dispositivo salvo se você exportar ou compartilhar.',
    'Cookie use': 'Uso de cookies',
    'CryptoQR Tool does not set cookies for advertising, retargeting, user accounts, or cross-site profiling. A cookie settings popup is not shown because there are no optional cookie categories to manage.':
      'O CryptoQR Tool não define cookies de publicidade, retargeting, contas ou perfilamento entre sites. Não há popup de cookies porque não existem categorias opcionais a gerenciar.',
    'The site may still use browser local storage for features you control, such as saved addresses, presets, theme, currency, and analytics opt-out status.':
      'O site ainda pode usar armazenamento local para recursos que você controla, como endereços salvos, predefinições, tema, moeda e status de recusa de análise.',
    'Anonymous analytics': 'Análise anônima',
    'Self-hosted Umami analytics helps measure page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings from page URLs.':
      'A análise Umami auto-hospedada mede uso de páginas e eventos gerais do produto. Ela é configurada sem cookies de rastreamento, respeita Do Not Track e exclui consultas das URLs.',
    'Disable anonymous analytics': 'Desativar análise anônima',
    'Anonymous analytics disabled': 'Análise anônima desativada',
    'Saved addresses': 'Endereços salvos',
    'Public recipient addresses and labels stay in this browser profile when you choose to save them.':
      'Endereços públicos de destinatário e etiquetas ficam neste perfil do navegador quando você os salva.',
    'QR style presets': 'Predefinições de estilo QR',
    'Colors, quiet zones, error correction, and optional custom logo data are kept locally for reuse.':
      'Cores, zonas silenciosas, correção de erros e dados opcionais de logo ficam locais para reutilização.',
    Preferences: 'Preferências',
    'Theme and display currency are stored locally so the interface opens with your preferred settings.':
      'Tema e moeda de exibição ficam salvos localmente para abrir a interface com suas preferências.',
    'Analytics opt-out': 'Recusa de análise',
    'If you disable anonymous analytics, this browser stores a local opt-out flag named umami.disabled.':
      'Se você desativar a análise anônima, este navegador salva uma marca local chamada umami.disabled.',
    'What stays in local storage': 'O que fica no armazenamento local',
    'What is not collected': 'O que não é coletado',
    'No private keys, seed phrases, wallet connections, or exchange credentials are requested.':
      'Chaves privadas, frases seed, conexões de carteira ou credenciais de exchange não são solicitadas.',
    'QR payloads, pasted public addresses, amounts, labels, and custom logos are not uploaded to an address vault.':
      'Payloads QR, endereços públicos colados, valores, etiquetas e logos não são enviados para um cofre de endereços.',
    'Saved data can be removed by deleting items in the app or clearing this site browser storage.':
      'Dados salvos podem ser removidos excluindo itens no app ou limpando o armazenamento deste site no navegador.',
    'Data processing summary': 'Resumo do processamento de dados',
    'Browser-local data is used to provide the generator, saved address list, QR styling, and display preferences. Server logs and anonymous analytics may be used for reliability, abuse prevention, performance monitoring, and aggregate product improvement. Public market, fee, and exchange views may call external data APIs, but those modules do not require wallet connection or account data.':
      'Dados locais do navegador fornecem o gerador, lista de endereços, estilo QR e preferências. Logs e análise anônima podem ser usados para confiabilidade, abuso, desempenho e melhoria agregada. Mercado, taxas e exchanges podem chamar APIs externas, mas não exigem carteira ou conta.'
  },
  de: {
    'Browser-local crypto QR utility': 'Browserlokales Krypto-QR-Werkzeug',
    'Crypto QR Code Generator': 'Krypto-QR-Code-Generator',
    'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
      'CryptoQR Tool erzeugt scannbare Zahlungs-QR-Codes für Monero, Bitcoin, Ethereum, Solana, Litecoin und ERC-20-Stablecoins wie USDC und USDT, ohne Wallet-Adressen, hochgeladene Logos oder gespeicherte Presets an einen Server zu senden.',
    'Your data never leaves your browser': 'Deine Daten verlassen nie deinen Browser',
    'Made with love for privacy and zero data collection.': 'Für Datenschutz und ohne Datensammlung gemacht.',
    'Open generator': 'Generator öffnen',
    'Privacy model': 'Datenschutzmodell',
    '100% Client-Side Processing': '100 % Verarbeitung im Browser',
    'Addresses, amounts, logos, and presets are generated in your browser. There is no account and no server-side address vault.':
      'Adressen, Beträge, Logos und Presets werden in deinem Browser erzeugt. Es gibt kein Konto und keinen serverseitigen Adresstresor.',
    'Zero Data Collection': 'Keine Datensammlung',
    'We do not collect your wallet addresses, uploaded logos, or saved presets. Your QR workflow stays on your device.':
      'Wir sammeln keine Wallet-Adressen, hochgeladenen Logos oder gespeicherten Presets. Dein QR-Ablauf bleibt auf deinem Gerät.',
    'Works Completely Offline': 'Funktioniert vollständig offline',
    'Core QR generation, styling, downloads, and saved presets keep working in the browser without a live connection.':
      'QR-Erzeugung, Styling, Downloads und gespeicherte Presets funktionieren im Browser auch ohne aktive Verbindung.',
    'Crypto QR generators by coin': 'Krypto-QR-Generatoren nach Coin',
    'Dedicated pages for each supported wallet address format and payment payload.':
      'Eigene Seiten für jedes unterstützte Wallet-Adressformat und jeden Zahlungs-Payload.',
    'Popular crypto QR searches': 'Beliebte Krypto-QR-Suchen',
    'Frequently asked questions': 'Häufige Fragen',
    'Does CryptoQR Tool store crypto addresses?': 'Speichert CryptoQR Tool Krypto-Adressen?',
    'Saved addresses and QR style presets stay in browser local storage on your device and are not synced server-side.':
      'Gespeicherte Adressen und QR-Stilpresets bleiben im lokalen Browser-Speicher deines Geräts und werden nicht serverseitig synchronisiert.',
    'Which networks are supported?': 'Welche Netzwerke werden unterstützt?',
    'CryptoQR Tool supports Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT, plus custom payload QR codes.':
      'CryptoQR Tool unterstützt Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC und USDT sowie QR-Codes mit eigenem Payload.',
    'Crypto QR Code FAQ': 'FAQ zu Krypto-QR-Codes',
    'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
      'Antworten zur sicheren Erzeugung von Krypto-QR-Codes, lokalem Browser-Speicher, anonymer Analyse, Wallet-Kompatibilität und Prüfungen vor dem Teilen oder Scannen einer Zahlungsanforderung.',
    'Is CryptoQR Tool safe for generating crypto QR codes?': 'Ist CryptoQR Tool sicher für Krypto-QR-Codes?',
    'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
      'Der Generator läuft im Browser und benötigt keine Wallet-Verbindung, Seed-Phrasen, privaten Schlüssel, Konten oder Exchange-Zugangsdaten. Prüfe trotzdem jede Zieladresse oder Rechnung in deiner Wallet, bevor du Geld sendest.',
    'Does CryptoQR Tool store wallet addresses?': 'Speichert CryptoQR Tool Wallet-Adressen?',
    'Saved addresses stay in browser local storage on your device when you choose to save them. They are not synced to a server-side address vault.':
      'Gespeicherte Adressen bleiben im lokalen Browser-Speicher deines Geräts, wenn du sie speicherst. Sie werden nicht mit einem serverseitigen Adresstresor synchronisiert.',
    'Does the site use cookies?': 'Verwendet die Website Cookies?',
    'The site does not set advertising, retargeting, account, or tracking cookies. It may use browser local storage for saved addresses, style presets, theme, currency, and the anonymous analytics opt-out setting.':
      'Die Website setzt keine Werbe-, Retargeting-, Konto- oder Tracking-Cookies. Sie kann lokalen Browser-Speicher für gespeicherte Adressen, Presets, Theme, Währung und Analyse-Opt-out verwenden.',
    'What analytics are used?': 'Welche Analyse wird verwendet?',
    'Self-hosted Umami analytics is used for aggregate page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings.':
      'Selbst gehostete Umami-Analyse wird für aggregierte Seitennutzung und grobe Produktereignisse verwendet. Sie ist ohne Tracking-Cookies konfiguriert, respektiert Do Not Track und schließt Query-Strings aus.',
    'Can a downloaded crypto QR code be changed later?': 'Kann ein heruntergeladener Krypto-QR-Code später geändert werden?',
    'No. A downloaded QR image contains the payload that existed when you exported it. If the address, amount, invoice, chain, or style needs to change, generate a new QR code.':
      'Nein. Ein heruntergeladenes QR-Bild enthält den Payload zum Zeitpunkt des Exports. Wenn Adresse, Betrag, Rechnung, Chain oder Stil geändert werden müssen, erstelle einen neuen QR-Code.',
    'What happens if a wallet ignores the amount field?': 'Was passiert, wenn eine Wallet das Betragsfeld ignoriert?',
    'Some wallets may scan only the destination and ignore optional URI parameters such as amount or token details. Always confirm the recipient, network, token, and amount inside the sending wallet before approving a transaction.':
      'Manche Wallets lesen nur das Ziel und ignorieren optionale URI-Parameter wie Betrag oder Token-Details. Bestätige Empfänger, Netzwerk, Token und Betrag immer in der sendenden Wallet.',
    'Can I paste a seed phrase or private key?': 'Kann ich eine Seed-Phrase oder einen privaten Schlüssel einfügen?',
    'No. The tool is only for public addresses, payment URIs, Lightning invoices, transaction hashes, and custom public payloads. Never paste seed phrases or private keys into any QR generator.':
      'Nein. Das Tool ist nur für öffentliche Adressen, Zahlungs-URIs, Lightning-Rechnungen, Transaktionshashes und öffentliche eigene Payloads gedacht. Füge niemals Seed-Phrasen oder private Schlüssel ein.',
    'Does the tool provide financial advice?': 'Bietet das Tool Finanzberatung?',
    'CryptoQR Tool is a utility for generating and checking QR payloads. It does not provide investment, tax, legal, trading, custody, or financial advice.':
      'CryptoQR Tool ist ein Werkzeug zum Erzeugen und Prüfen von QR-Payloads. Es bietet keine Anlage-, Steuer-, Rechts-, Handels-, Verwahr- oder Finanzberatung.',
    'Still verify in your wallet': 'Trotzdem in deiner Wallet prüfen',
    'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
      'CryptoQR Tool hilft beim Erstellen lesbarer QR-Payloads, aber deine Wallet ist der endgültige Ort zur Bestätigung von Ziel, Chain, Token, Betrag und Gebühren. Genehmige nie nur deshalb eine Transaktion, weil ein QR-Code erfolgreich gescannt wurde.',
    'Trust and privacy': 'Vertrauen und Datenschutz',
    'No account, no wallet connection, no server vault': 'Kein Konto, keine Wallet-Verbindung, kein Server-Tresor',
    'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
      'CryptoQR Tool ist als privates Werkzeug konzipiert. Markt-, Gebühren- und Exchange-Module nutzen öffentliche APIs, aber QR-Adressen, Labels, Presets und Logos bleiben im Browser, solange du sie nicht kopierst, herunterlädst, exportierst oder teilst.',
    'Generation is client-side': 'Erzeugung im Browser',
    'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
      'QR-Payload-Erstellung, Validierung, Styling, Logo-Vorschau und Downloads laufen im Browser.',
    'Local storage only': 'Nur lokaler Speicher',
    'Saved addresses and user-defined style presets use a versioned local storage key and can be deleted by the user.':
      'Gespeicherte Adressen und nutzerdefinierte Stilpresets verwenden einen versionierten lokalen Speicherschlüssel und können gelöscht werden.',
    'Custom logo handling': 'Umgang mit eigenen Logos',
    'Uploaded logos are accepted as PNG, JPEG, SVG, or WebP, size-limited, and stored only when saved into a preset.':
      'Hochgeladene Logos werden als PNG, JPEG, SVG oder WebP akzeptiert, sind größenbegrenzt und werden nur beim Speichern in einem Preset abgelegt.',
    'Scannability checks': 'Scanbarkeitsprüfungen',
    'Contrast, quiet zone, logo size, and error-correction settings prioritize reliable scanning over decoration.':
      'Kontrast, Ruhezone, Logogröße und Fehlerkorrektur priorisieren zuverlässiges Scannen statt Dekoration.',
    'Privacy and security FAQ': 'FAQ zu Datenschutz und Sicherheit',
    'Where are saved addresses stored?': 'Wo werden gespeicherte Adressen abgelegt?',
    'Saved addresses are stored in browser local storage under a versioned CryptoQR Tool key for this browser profile only.':
      'Gespeicherte Adressen werden im lokalen Browser-Speicher unter einem versionierten CryptoQR-Tool-Schlüssel nur für dieses Profil abgelegt.',
    'Are custom logos uploaded?': 'Werden eigene Logos hochgeladen?',
    'No. Custom logos are read and previewed in the browser and are only kept locally if you save them into a preset.':
      'Nein. Eigene Logos werden im Browser gelesen und angezeigt und bleiben nur lokal, wenn du sie in einem Preset speicherst.',
    'Cookies, local storage, and analytics': 'Cookies, lokaler Speicher und Analyse',
    'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
      'CryptoQR Tool verwendet keine Werbe- oder Tracking-Cookies, Konten, Wallet-Verbindungen oder serverseitigen Adresstresor. Die QR-Erzeugung läuft im Browser und gespeicherte Arbeitsdaten bleiben auf deinem Gerät, sofern du sie nicht exportierst oder teilst.',
    'Cookie use': 'Cookie-Nutzung',
    'CryptoQR Tool does not set cookies for advertising, retargeting, user accounts, or cross-site profiling. A cookie settings popup is not shown because there are no optional cookie categories to manage.':
      'CryptoQR Tool setzt keine Cookies für Werbung, Retargeting, Konten oder Cross-Site-Profiling. Ein Cookie-Popup wird nicht angezeigt, da es keine optionalen Cookie-Kategorien gibt.',
    'The site may still use browser local storage for features you control, such as saved addresses, presets, theme, currency, and analytics opt-out status.':
      'Die Website kann lokalen Browser-Speicher für Funktionen verwenden, die du steuerst: gespeicherte Adressen, Presets, Theme, Währung und Analyse-Opt-out.',
    'Anonymous analytics': 'Anonyme Analyse',
    'Self-hosted Umami analytics helps measure page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings from page URLs.':
      'Selbst gehostete Umami-Analyse misst Seitennutzung und grobe Produktereignisse. Sie ist ohne Tracking-Cookies konfiguriert, respektiert Do Not Track und schließt URL-Query-Strings aus.',
    'Disable anonymous analytics': 'Anonyme Analyse deaktivieren',
    'Anonymous analytics disabled': 'Anonyme Analyse deaktiviert',
    'Saved addresses': 'Gespeicherte Adressen',
    'Public recipient addresses and labels stay in this browser profile when you choose to save them.':
      'Öffentliche Empfängeradressen und Labels bleiben in diesem Browserprofil, wenn du sie speicherst.',
    'QR style presets': 'QR-Stilpresets',
    'Colors, quiet zones, error correction, and optional custom logo data are kept locally for reuse.':
      'Farben, Ruhezonen, Fehlerkorrektur und optionale Logodaten werden lokal zur Wiederverwendung gespeichert.',
    Preferences: 'Einstellungen',
    'Theme and display currency are stored locally so the interface opens with your preferred settings.':
      'Theme und Anzeigewährung werden lokal gespeichert, damit die Oberfläche mit deinen Einstellungen öffnet.',
    'Analytics opt-out': 'Analyse-Opt-out',
    'If you disable anonymous analytics, this browser stores a local opt-out flag named umami.disabled.':
      'Wenn du anonyme Analyse deaktivierst, speichert dieser Browser ein lokales Opt-out-Flag namens umami.disabled.',
    'What stays in local storage': 'Was im lokalen Speicher bleibt',
    'What is not collected': 'Was nicht gesammelt wird',
    'No private keys, seed phrases, wallet connections, or exchange credentials are requested.':
      'Private Schlüssel, Seed-Phrasen, Wallet-Verbindungen oder Exchange-Zugangsdaten werden nicht angefordert.',
    'QR payloads, pasted public addresses, amounts, labels, and custom logos are not uploaded to an address vault.':
      'QR-Payloads, eingefügte öffentliche Adressen, Beträge, Labels und Logos werden nicht in einen Adresstresor hochgeladen.',
    'Saved data can be removed by deleting items in the app or clearing this site browser storage.':
      'Gespeicherte Daten können durch Löschen in der App oder Leeren des Browser-Speichers dieser Website entfernt werden.',
    'Data processing summary': 'Zusammenfassung der Datenverarbeitung',
    'Browser-local data is used to provide the generator, saved address list, QR styling, and display preferences. Server logs and anonymous analytics may be used for reliability, abuse prevention, performance monitoring, and aggregate product improvement. Public market, fee, and exchange views may call external data APIs, but those modules do not require wallet connection or account data.':
      'Browserlokale Daten liefern Generator, Adressliste, QR-Styling und Anzeigeeinstellungen. Serverlogs und anonyme Analyse können für Zuverlässigkeit, Missbrauchsschutz, Performance und aggregierte Produktverbesserung genutzt werden. Markt-, Gebühren- und Exchange-Ansichten können externe APIs aufrufen, benötigen aber keine Wallet- oder Kontodaten.'
  },
  nl: {
    'Browser-local crypto QR utility': 'Browserlokale crypto-QR-tool',
    'Crypto QR Code Generator': 'Crypto-QR-codegenerator',
    'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
      'CryptoQR Tool genereert scanbare betaal-QR-codes voor Monero, Bitcoin, Ethereum, Solana, Litecoin en ERC-20-stablecoins zoals USDC en USDT zonder walletadressen, geüploade logo’s of opgeslagen presets naar een server te sturen.',
    'Your data never leaves your browser': 'Je gegevens verlaten je browser nooit',
    'Made with love for privacy and zero data collection.': 'Gemaakt voor privacy en zonder gegevensverzameling.',
    'Open generator': 'Generator openen',
    'Privacy model': 'Privacymodel',
    '100% Client-Side Processing': '100% verwerking in de browser',
    'Addresses, amounts, logos, and presets are generated in your browser. There is no account and no server-side address vault.':
      'Adressen, bedragen, logo’s en presets worden in je browser gegenereerd. Er is geen account en geen serverkluis voor adressen.',
    'Zero Data Collection': 'Geen gegevensverzameling',
    'We do not collect your wallet addresses, uploaded logos, or saved presets. Your QR workflow stays on your device.':
      'We verzamelen geen walletadressen, geüploade logo’s of opgeslagen presets. Je QR-workflow blijft op je apparaat.',
    'Works Completely Offline': 'Werkt volledig offline',
    'Core QR generation, styling, downloads, and saved presets keep working in the browser without a live connection.':
      'QR-generatie, styling, downloads en opgeslagen presets blijven in de browser werken zonder actieve verbinding.',
    'Crypto QR generators by coin': 'Crypto-QR-generators per munt',
    'Dedicated pages for each supported wallet address format and payment payload.':
      'Aparte pagina’s voor elk ondersteund walletadresformaat en betaalpayload.',
    'Popular crypto QR searches': 'Populaire crypto-QR-zoekopdrachten',
    'Frequently asked questions': 'Veelgestelde vragen',
    'Does CryptoQR Tool store crypto addresses?': 'Slaat CryptoQR Tool cryptoadressen op?',
    'Saved addresses and QR style presets stay in browser local storage on your device and are not synced server-side.':
      'Opgeslagen adressen en QR-stijlpresets blijven in lokale browseropslag op je apparaat en worden niet server-side gesynchroniseerd.',
    'Which networks are supported?': 'Welke netwerken worden ondersteund?',
    'CryptoQR Tool supports Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT, plus custom payload QR codes.':
      'CryptoQR Tool ondersteunt Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC en USDT, plus QR-codes met eigen payload.',
    'Crypto QR Code FAQ': 'FAQ over crypto-QR-codes',
    'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
      'Antwoorden over veilig crypto-QR-codes genereren, browserlokale opslag, anonieme analytics, walletcompatibiliteit en controles vóór delen of scannen van een betaalverzoek.',
    'Is CryptoQR Tool safe for generating crypto QR codes?': 'Is CryptoQR Tool veilig voor crypto-QR-codes?',
    'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
      'De generator draait in je browser en vereist geen walletverbinding, seedphrases, privésleutels, accounts of exchange-inloggegevens. Controleer elke bestemming of factuur nog steeds in je wallet voordat je geld verzendt.',
    'Does CryptoQR Tool store wallet addresses?': 'Slaat CryptoQR Tool walletadressen op?',
    'Saved addresses stay in browser local storage on your device when you choose to save them. They are not synced to a server-side address vault.':
      'Opgeslagen adressen blijven in lokale browseropslag wanneer je ze opslaat. Ze worden niet gesynchroniseerd met een serverkluis.',
    'Does the site use cookies?': 'Gebruikt de site cookies?',
    'The site does not set advertising, retargeting, account, or tracking cookies. It may use browser local storage for saved addresses, style presets, theme, currency, and the anonymous analytics opt-out setting.':
      'De site plaatst geen advertentie-, retargeting-, account- of trackingcookies. Lokale opslag kan worden gebruikt voor adressen, presets, thema, valuta en analytics-opt-out.',
    'What analytics are used?': 'Welke analytics worden gebruikt?',
    'Self-hosted Umami analytics is used for aggregate page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings.':
      'Zelf gehoste Umami-analytics wordt gebruikt voor geaggregeerd paginagebruik en grove productevents. Het gebruikt geen trackingcookies, respecteert Do Not Track en sluit querystrings uit.',
    'Can a downloaded crypto QR code be changed later?': 'Kan een gedownloade crypto-QR-code later worden gewijzigd?',
    'No. A downloaded QR image contains the payload that existed when you exported it. If the address, amount, invoice, chain, or style needs to change, generate a new QR code.':
      'Nee. Een gedownload QR-beeld bevat de payload van het exportmoment. Als adres, bedrag, factuur, chain of stijl wijzigt, genereer dan een nieuwe QR-code.',
    'What happens if a wallet ignores the amount field?': 'Wat gebeurt er als een wallet het bedrag negeert?',
    'Some wallets may scan only the destination and ignore optional URI parameters such as amount or token details. Always confirm the recipient, network, token, and amount inside the sending wallet before approving a transaction.':
      'Sommige wallets lezen alleen de bestemming en negeren optionele URI-parameters zoals bedrag of tokengegevens. Bevestig ontvanger, netwerk, token en bedrag altijd in de verzendende wallet.',
    'Can I paste a seed phrase or private key?': 'Kan ik een seedphrase of privésleutel plakken?',
    'No. The tool is only for public addresses, payment URIs, Lightning invoices, transaction hashes, and custom public payloads. Never paste seed phrases or private keys into any QR generator.':
      'Nee. De tool is alleen voor publieke adressen, betaal-URI’s, Lightning-facturen, transactiehashes en publieke payloads. Plak nooit seedphrases of privésleutels.',
    'Does the tool provide financial advice?': 'Geeft de tool financieel advies?',
    'CryptoQR Tool is a utility for generating and checking QR payloads. It does not provide investment, tax, legal, trading, custody, or financial advice.':
      'CryptoQR Tool is een hulpmiddel voor het genereren en controleren van QR-payloads. Het geeft geen beleggings-, belasting-, juridisch, handels-, bewaar- of financieel advies.',
    'Still verify in your wallet': 'Controleer nog steeds in je wallet',
    'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
      'CryptoQR Tool helpt leesbare QR-payloads te maken, maar je wallet is de uiteindelijke plek om bestemming, chain, token, bedrag en kosten te bevestigen. Keur nooit een transactie goed alleen omdat een QR-code succesvol scande.',
    'Trust and privacy': 'Vertrouwen en privacy',
    'No account, no wallet connection, no server vault': 'Geen account, geen walletverbinding, geen serverkluis',
    'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
      'CryptoQR Tool is ontworpen als privéhulpmiddel. Markt-, fee- en exchange-modules gebruiken publieke API’s, maar QR-adressen, labels, presets en logo’s blijven in de browser tenzij je ze kopieert, downloadt, exporteert of deelt.',
    'Generation is client-side': 'Generatie gebeurt client-side',
    'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
      'QR-payloadopbouw, validatie, styling, logovoorbeelden en downloads draaien in de browser.',
    'Local storage only': 'Alleen lokale opslag',
    'Saved addresses and user-defined style presets use a versioned local storage key and can be deleted by the user.':
      'Opgeslagen adressen en gebruikerspresets gebruiken een versiegebonden lokale opslagsleutel en kunnen door de gebruiker worden verwijderd.',
    'Custom logo handling': 'Omgaan met aangepaste logo’s',
    'Uploaded logos are accepted as PNG, JPEG, SVG, or WebP, size-limited, and stored only when saved into a preset.':
      'Geüploade logo’s worden geaccepteerd als PNG, JPEG, SVG of WebP, hebben een groottelimiet en worden alleen opgeslagen in een preset.',
    'Scannability checks': 'Scanbaarheidscontroles',
    'Contrast, quiet zone, logo size, and error-correction settings prioritize reliable scanning over decoration.':
      'Contrast, stille zone, logogrootte en foutcorrectie geven betrouwbare scans prioriteit boven decoratie.',
    'Privacy and security FAQ': 'FAQ over privacy en beveiliging',
    'Where are saved addresses stored?': 'Waar worden opgeslagen adressen bewaard?',
    'Saved addresses are stored in browser local storage under a versioned CryptoQR Tool key for this browser profile only.':
      'Opgeslagen adressen staan in lokale browseropslag onder een versiegebonden CryptoQR Tool-sleutel voor dit browserprofiel.',
    'Are custom logos uploaded?': 'Worden aangepaste logo’s geüpload?',
    'No. Custom logos are read and previewed in the browser and are only kept locally if you save them into a preset.':
      'Nee. Aangepaste logo’s worden in de browser gelezen en bekeken en blijven alleen lokaal als je ze in een preset opslaat.',
    'Cookies, local storage, and analytics': 'Cookies, lokale opslag en analytics',
    'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
      'CryptoQR Tool gebruikt geen advertentie- of trackingcookies, accounts, walletverbindingen of serverkluis. QR-generatie draait in de browser en opgeslagen workflowgegevens blijven op je apparaat tenzij je ze exporteert of deelt.',
    'Cookie use': 'Cookiegebruik',
    'CryptoQR Tool does not set cookies for advertising, retargeting, user accounts, or cross-site profiling. A cookie settings popup is not shown because there are no optional cookie categories to manage.':
      'CryptoQR Tool plaatst geen cookies voor advertenties, retargeting, accounts of cross-site profilering. Er is geen cookiepopup omdat er geen optionele categorieën zijn.',
    'The site may still use browser local storage for features you control, such as saved addresses, presets, theme, currency, and analytics opt-out status.':
      'De site kan lokale opslag gebruiken voor functies die jij beheert, zoals adressen, presets, thema, valuta en analytics-opt-out.',
    'Anonymous analytics': 'Anonieme analytics',
    'Self-hosted Umami analytics helps measure page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings from page URLs.':
      'Zelf gehoste Umami-analytics meet paginagebruik en grove productevents. Het gebruikt geen trackingcookies, respecteert Do Not Track en sluit querystrings uit URL’s uit.',
    'Disable anonymous analytics': 'Anonieme analytics uitschakelen',
    'Anonymous analytics disabled': 'Anonieme analytics uitgeschakeld',
    'Saved addresses': 'Opgeslagen adressen',
    'Public recipient addresses and labels stay in this browser profile when you choose to save them.':
      'Publieke ontvangeradressen en labels blijven in dit browserprofiel wanneer je ze opslaat.',
    'QR style presets': 'QR-stijlpresets',
    'Colors, quiet zones, error correction, and optional custom logo data are kept locally for reuse.':
      'Kleuren, stille zones, foutcorrectie en optionele logogegevens blijven lokaal voor hergebruik.',
    Preferences: 'Voorkeuren',
    'Theme and display currency are stored locally so the interface opens with your preferred settings.':
      'Thema en weergavevaluta worden lokaal opgeslagen zodat de interface met je voorkeuren opent.',
    'Analytics opt-out': 'Analytics-opt-out',
    'If you disable anonymous analytics, this browser stores a local opt-out flag named umami.disabled.':
      'Als je anonieme analytics uitschakelt, slaat deze browser een lokale opt-outvlag umami.disabled op.',
    'What stays in local storage': 'Wat in lokale opslag blijft',
    'What is not collected': 'Wat niet wordt verzameld',
    'No private keys, seed phrases, wallet connections, or exchange credentials are requested.':
      'Privésleutels, seedphrases, walletverbindingen of exchange-inloggegevens worden niet gevraagd.',
    'QR payloads, pasted public addresses, amounts, labels, and custom logos are not uploaded to an address vault.':
      'QR-payloads, geplakte publieke adressen, bedragen, labels en logo’s worden niet geüpload naar een adreskluis.',
    'Saved data can be removed by deleting items in the app or clearing this site browser storage.':
      'Opgeslagen gegevens kunnen worden verwijderd door items in de app te wissen of de browseropslag van deze site te legen.',
    'Data processing summary': 'Samenvatting gegevensverwerking',
    'Browser-local data is used to provide the generator, saved address list, QR styling, and display preferences. Server logs and anonymous analytics may be used for reliability, abuse prevention, performance monitoring, and aggregate product improvement. Public market, fee, and exchange views may call external data APIs, but those modules do not require wallet connection or account data.':
      'Browserlokale gegevens worden gebruikt voor de generator, adreslijst, QR-styling en voorkeuren. Serverlogs en anonieme analytics kunnen worden gebruikt voor betrouwbaarheid, misbruikpreventie, prestaties en productverbetering. Markt-, fee- en exchangeweergaven kunnen externe API’s gebruiken, maar vereisen geen wallet- of accountgegevens.'
  },
  it: {
    'Browser-local crypto QR utility': 'Utilità QR crypto locale nel browser',
    'Crypto QR Code Generator': 'Generatore di codici QR crypto',
    'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
      'CryptoQR Tool genera codici QR di pagamento scansionabili per Monero, Bitcoin, Ethereum, Solana, Litecoin e stablecoin ERC-20 come USDC e USDT senza inviare indirizzi wallet, loghi caricati o preset salvati a un server.',
    'Your data never leaves your browser': 'I tuoi dati non lasciano mai il browser',
    'Made with love for privacy and zero data collection.': 'Creato per la privacy e senza raccolta dati.',
    'Open generator': 'Apri generatore',
    'Privacy model': 'Modello di privacy',
    '100% Client-Side Processing': 'Elaborazione 100% lato client',
    'Addresses, amounts, logos, and presets are generated in your browser. There is no account and no server-side address vault.':
      'Indirizzi, importi, loghi e preset vengono generati nel browser. Non ci sono account né un vault di indirizzi lato server.',
    'Zero Data Collection': 'Zero raccolta dati',
    'We do not collect your wallet addresses, uploaded logos, or saved presets. Your QR workflow stays on your device.':
      'Non raccogliamo indirizzi wallet, loghi caricati o preset salvati. Il flusso QR resta sul tuo dispositivo.',
    'Works Completely Offline': 'Funziona completamente offline',
    'Core QR generation, styling, downloads, and saved presets keep working in the browser without a live connection.':
      'Generazione QR, stile, download e preset salvati continuano a funzionare nel browser senza connessione attiva.',
    'Crypto QR generators by coin': 'Generatori QR crypto per moneta',
    'Dedicated pages for each supported wallet address format and payment payload.':
      'Pagine dedicate per ogni formato di indirizzo wallet e payload di pagamento supportato.',
    'Popular crypto QR searches': 'Ricerche QR crypto popolari',
    'Frequently asked questions': 'Domande frequenti',
    'Does CryptoQR Tool store crypto addresses?': 'CryptoQR Tool memorizza indirizzi crypto?',
    'Saved addresses and QR style presets stay in browser local storage on your device and are not synced server-side.':
      'Gli indirizzi salvati e i preset di stile QR restano nello storage locale del browser sul dispositivo e non vengono sincronizzati lato server.',
    'Which networks are supported?': 'Quali reti sono supportate?',
    'CryptoQR Tool supports Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT, plus custom payload QR codes.':
      'CryptoQR Tool supporta Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC e USDT, oltre a codici QR con payload personalizzato.',
    'Crypto QR Code FAQ': 'FAQ sui codici QR crypto',
    'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
      'Risposte su generazione sicura di QR crypto, storage locale, analytics anonimi, compatibilità wallet e controlli prima di condividere o scansionare una richiesta di pagamento.',
    'Is CryptoQR Tool safe for generating crypto QR codes?': 'CryptoQR Tool è sicuro per generare codici QR crypto?',
    'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
      'Il generatore gira nel browser e non richiede connessione wallet, seed phrase, chiavi private, account o credenziali exchange. Verifica comunque ogni indirizzo o fattura nel wallet prima di inviare fondi.',
    'Does CryptoQR Tool store wallet addresses?': 'CryptoQR Tool memorizza indirizzi wallet?',
    'Saved addresses stay in browser local storage on your device when you choose to save them. They are not synced to a server-side address vault.':
      'Gli indirizzi salvati restano nello storage locale del browser quando scegli di salvarli. Non vengono sincronizzati con un vault di indirizzi lato server.',
    'Does the site use cookies?': 'Il sito usa cookie?',
    'The site does not set advertising, retargeting, account, or tracking cookies. It may use browser local storage for saved addresses, style presets, theme, currency, and the anonymous analytics opt-out setting.':
      'Il sito non imposta cookie pubblicitari, retargeting, account o tracciamento. Può usare lo storage locale per indirizzi salvati, preset, tema, valuta e opt-out dagli analytics anonimi.',
    'What analytics are used?': 'Quali analytics vengono usati?',
    'Self-hosted Umami analytics is used for aggregate page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings.':
      'Vengono usati analytics Umami self-hosted per uso aggregato delle pagine ed eventi prodotto generali. Sono configurati senza cookie di tracciamento, rispettano Do Not Track ed escludono query string.',
    'Can a downloaded crypto QR code be changed later?': 'Un QR crypto scaricato può essere cambiato dopo?',
    'No. A downloaded QR image contains the payload that existed when you exported it. If the address, amount, invoice, chain, or style needs to change, generate a new QR code.':
      'No. Un’immagine QR scaricata contiene il payload presente al momento dell’esportazione. Se indirizzo, importo, fattura, chain o stile cambiano, genera un nuovo QR.',
    'What happens if a wallet ignores the amount field?': 'Cosa succede se un wallet ignora il campo importo?',
    'Some wallets may scan only the destination and ignore optional URI parameters such as amount or token details. Always confirm the recipient, network, token, and amount inside the sending wallet before approving a transaction.':
      'Alcuni wallet possono leggere solo la destinazione e ignorare parametri URI opzionali come importo o dettagli token. Conferma sempre destinatario, rete, token e importo nel wallet prima di approvare.',
    'Can I paste a seed phrase or private key?': 'Posso incollare una seed phrase o chiave privata?',
    'No. The tool is only for public addresses, payment URIs, Lightning invoices, transaction hashes, and custom public payloads. Never paste seed phrases or private keys into any QR generator.':
      'No. Lo strumento è solo per indirizzi pubblici, URI di pagamento, fatture Lightning, hash di transazione e payload pubblici personalizzati. Non incollare mai seed phrase o chiavi private.',
    'Does the tool provide financial advice?': 'Lo strumento fornisce consulenza finanziaria?',
    'CryptoQR Tool is a utility for generating and checking QR payloads. It does not provide investment, tax, legal, trading, custody, or financial advice.':
      'CryptoQR Tool è un’utilità per generare e controllare payload QR. Non fornisce consulenza finanziaria, fiscale, legale, di trading, custodia o investimento.',
    'Still verify in your wallet': 'Verifica comunque nel wallet',
    'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
      'CryptoQR Tool aiuta a creare payload QR leggibili, ma il wallet è il punto finale per confermare destinazione, chain, token, importo e commissioni. Non approvare mai solo perché un QR è stato scansionato.',
    'Trust and privacy': 'Fiducia e privacy',
    'No account, no wallet connection, no server vault': 'Nessun account, nessuna connessione wallet, nessun vault server',
    'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
      'CryptoQR Tool è progettato come utilità privata. I moduli mercato, fee ed exchange chiamano API pubbliche, ma indirizzi QR, etichette, preset e loghi restano nel browser salvo copia, download, esportazione o condivisione.',
    'Generation is client-side': 'Generazione lato client',
    'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
      'Costruzione payload QR, validazione, stile, anteprime logo e download avvengono nel browser.',
    'Local storage only': 'Solo storage locale',
    'Saved addresses and user-defined style presets use a versioned local storage key and can be deleted by the user.':
      'Indirizzi salvati e preset utente usano una chiave di storage locale versionata e possono essere eliminati dall’utente.',
    'Custom logo handling': 'Gestione loghi personalizzati',
    'Uploaded logos are accepted as PNG, JPEG, SVG, or WebP, size-limited, and stored only when saved into a preset.':
      'I loghi caricati sono accettati come PNG, JPEG, SVG o WebP, hanno limite di dimensione e sono salvati solo dentro un preset.',
    'Scannability checks': 'Controlli di scansione',
    'Contrast, quiet zone, logo size, and error-correction settings prioritize reliable scanning over decoration.':
      'Contrasto, quiet zone, dimensione logo e correzione errori privilegiano scansioni affidabili rispetto alla decorazione.',
    'Privacy and security FAQ': 'FAQ privacy e sicurezza',
    'Where are saved addresses stored?': 'Dove sono archiviati gli indirizzi salvati?',
    'Saved addresses are stored in browser local storage under a versioned CryptoQR Tool key for this browser profile only.':
      'Gli indirizzi salvati sono nello storage locale del browser sotto una chiave CryptoQR Tool versionata solo per questo profilo.',
    'Are custom logos uploaded?': 'I loghi personalizzati vengono caricati?',
    'No. Custom logos are read and previewed in the browser and are only kept locally if you save them into a preset.':
      'No. I loghi personalizzati vengono letti e mostrati nel browser e restano locali solo se salvati in un preset.',
    'Cookies, local storage, and analytics': 'Cookie, storage locale e analytics',
    'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
      'CryptoQR Tool non usa cookie pubblicitari o di tracciamento, account, connessioni wallet o vault server. La generazione QR gira nel browser e i dati salvati restano sul dispositivo salvo esportazione o condivisione.',
    'Cookie use': 'Uso dei cookie',
    'CryptoQR Tool does not set cookies for advertising, retargeting, user accounts, or cross-site profiling. A cookie settings popup is not shown because there are no optional cookie categories to manage.':
      'CryptoQR Tool non imposta cookie per pubblicità, retargeting, account o profilazione cross-site. Non viene mostrato un popup cookie perché non ci sono categorie opzionali.',
    'The site may still use browser local storage for features you control, such as saved addresses, presets, theme, currency, and analytics opt-out status.':
      'Il sito può usare storage locale per funzioni controllate da te, come indirizzi, preset, tema, valuta e stato opt-out analytics.',
    'Anonymous analytics': 'Analytics anonimi',
    'Self-hosted Umami analytics helps measure page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings from page URLs.':
      'Gli analytics Umami self-hosted misurano uso pagine ed eventi prodotto generali. Sono senza cookie di tracciamento, rispettano Do Not Track ed escludono query string dagli URL.',
    'Disable anonymous analytics': 'Disattiva analytics anonimi',
    'Anonymous analytics disabled': 'Analytics anonimi disattivati',
    'Saved addresses': 'Indirizzi salvati',
    'Public recipient addresses and labels stay in this browser profile when you choose to save them.':
      'Indirizzi pubblici del destinatario ed etichette restano in questo profilo browser quando li salvi.',
    'QR style presets': 'Preset stile QR',
    'Colors, quiet zones, error correction, and optional custom logo data are kept locally for reuse.':
      'Colori, quiet zone, correzione errori e dati logo opzionali restano locali per riuso.',
    Preferences: 'Preferenze',
    'Theme and display currency are stored locally so the interface opens with your preferred settings.':
      'Tema e valuta di visualizzazione sono salvati localmente così l’interfaccia apre con le preferenze scelte.',
    'Analytics opt-out': 'Opt-out analytics',
    'If you disable anonymous analytics, this browser stores a local opt-out flag named umami.disabled.':
      'Se disattivi gli analytics anonimi, questo browser salva un flag locale chiamato umami.disabled.',
    'What stays in local storage': 'Cosa resta nello storage locale',
    'What is not collected': 'Cosa non viene raccolto',
    'No private keys, seed phrases, wallet connections, or exchange credentials are requested.':
      'Non vengono richieste chiavi private, seed phrase, connessioni wallet o credenziali exchange.',
    'QR payloads, pasted public addresses, amounts, labels, and custom logos are not uploaded to an address vault.':
      'Payload QR, indirizzi pubblici incollati, importi, etichette e loghi non vengono caricati in un vault indirizzi.',
    'Saved data can be removed by deleting items in the app or clearing this site browser storage.':
      'I dati salvati possono essere rimossi eliminando elementi nell’app o pulendo lo storage browser del sito.',
    'Data processing summary': 'Riepilogo trattamento dati',
    'Browser-local data is used to provide the generator, saved address list, QR styling, and display preferences. Server logs and anonymous analytics may be used for reliability, abuse prevention, performance monitoring, and aggregate product improvement. Public market, fee, and exchange views may call external data APIs, but those modules do not require wallet connection or account data.':
      'I dati locali del browser servono per generatore, elenco indirizzi, stile QR e preferenze. Log server e analytics anonimi possono servire per affidabilità, abuso, prestazioni e miglioramento aggregato. Mercati, fee ed exchange possono chiamare API esterne, ma non richiedono wallet o account.'
  },
  ar: {
    'Browser-local crypto QR utility': 'أداة QR للعملات الرقمية داخل المتصفح',
    'Crypto QR Code Generator': 'مولد رموز QR للعملات الرقمية',
    'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
      'ينشئ CryptoQR Tool رموز QR قابلة للمسح لمدفوعات Monero وBitcoin وEthereum وSolana وLitecoin والعملات المستقرة ERC-20 مثل USDC وUSDT بدون إرسال عناوين المحافظ أو الشعارات أو الإعدادات المحفوظة إلى خادم.',
    'Your data never leaves your browser': 'بياناتك لا تغادر متصفحك',
    'Made with love for privacy and zero data collection.': 'صنع من أجل الخصوصية وبدون جمع بيانات.',
    'Open generator': 'فتح المولد',
    'Privacy model': 'نموذج الخصوصية',
    '100% Client-Side Processing': 'معالجة 100% على جهازك',
    'Addresses, amounts, logos, and presets are generated in your browser. There is no account and no server-side address vault.':
      'تُنشأ العناوين والمبالغ والشعارات والإعدادات في متصفحك. لا يوجد حساب ولا خزنة عناوين على الخادم.',
    'Zero Data Collection': 'لا جمع للبيانات',
    'We do not collect your wallet addresses, uploaded logos, or saved presets. Your QR workflow stays on your device.':
      'لا نجمع عناوين المحافظ أو الشعارات المرفوعة أو الإعدادات المحفوظة. يبقى سير عمل QR على جهازك.',
    'Works Completely Offline': 'يعمل بالكامل دون اتصال',
    'Core QR generation, styling, downloads, and saved presets keep working in the browser without a live connection.':
      'تستمر عملية إنشاء QR والتنسيق والتنزيلات والإعدادات المحفوظة في المتصفح بدون اتصال مباشر.',
    'Crypto QR generators by coin': 'مولدات QR للعملات حسب العملة',
    'Dedicated pages for each supported wallet address format and payment payload.':
      'صفحات مخصصة لكل تنسيق عنوان محفظة وحمولة دفع مدعومة.',
    'Popular crypto QR searches': 'عمليات بحث QR شائعة للعملات الرقمية',
    'Frequently asked questions': 'الأسئلة الشائعة',
    'Does CryptoQR Tool store crypto addresses?': 'هل يخزن CryptoQR Tool عناوين العملات الرقمية؟',
    'Saved addresses and QR style presets stay in browser local storage on your device and are not synced server-side.':
      'تبقى العناوين المحفوظة وإعدادات نمط QR في التخزين المحلي للمتصفح على جهازك ولا تتم مزامنتها على الخادم.',
    'Which networks are supported?': 'ما الشبكات المدعومة؟',
    'CryptoQR Tool supports Monero, Bitcoin, Bitcoin Lightning, Ethereum, Solana, Litecoin, USDC, and USDT, plus custom payload QR codes.':
      'يدعم CryptoQR Tool Monero وBitcoin وBitcoin Lightning وEthereum وSolana وLitecoin وUSDC وUSDT، إضافة إلى رموز QR بحمولات مخصصة.',
    'Crypto QR Code FAQ': 'أسئلة شائعة حول رموز QR للعملات الرقمية',
    'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
      'إجابات حول إنشاء رموز QR للعملات الرقمية بأمان، والتخزين المحلي، والتحليلات المجهولة، وتوافق المحافظ، والفحوصات قبل مشاركة أو مسح طلب دفع.',
    'Is CryptoQR Tool safe for generating crypto QR codes?': 'هل CryptoQR Tool آمن لإنشاء رموز QR للعملات الرقمية؟',
    'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
      'يعمل المولد في متصفحك ولا يتطلب اتصال محفظة أو عبارات استرداد أو مفاتيح خاصة أو حسابات أو بيانات منصة. ومع ذلك تحقق من كل عنوان أو فاتورة داخل محفظتك قبل إرسال الأموال.',
    'Does CryptoQR Tool store wallet addresses?': 'هل يخزن CryptoQR Tool عناوين المحافظ؟',
    'Saved addresses stay in browser local storage on your device when you choose to save them. They are not synced to a server-side address vault.':
      'تبقى العناوين المحفوظة في التخزين المحلي للمتصفح عندما تختار حفظها. لا تتم مزامنتها مع خزنة عناوين على الخادم.',
    'Does the site use cookies?': 'هل يستخدم الموقع ملفات تعريف الارتباط؟',
    'The site does not set advertising, retargeting, account, or tracking cookies. It may use browser local storage for saved addresses, style presets, theme, currency, and the anonymous analytics opt-out setting.':
      'لا يضع الموقع ملفات تعريف ارتباط للإعلانات أو إعادة الاستهداف أو الحسابات أو التتبع. قد يستخدم التخزين المحلي للعناوين والإعدادات والسمة والعملة وخيار تعطيل التحليلات المجهولة.',
    'What analytics are used?': 'ما التحليلات المستخدمة؟',
    'Self-hosted Umami analytics is used for aggregate page usage and coarse product events. It is configured without tracking cookies, respects browser Do Not Track, and excludes query strings.':
      'تُستخدم تحليلات Umami المستضافة ذاتياً لقياس استخدام الصفحات والأحداث العامة. وهي بلا ملفات تتبع، وتحترم Do Not Track، وتستبعد سلاسل الاستعلام.',
    'Can a downloaded crypto QR code be changed later?': 'هل يمكن تغيير رمز QR منزّل لاحقاً؟',
    'No. A downloaded QR image contains the payload that existed when you exported it. If the address, amount, invoice, chain, or style needs to change, generate a new QR code.':
      'لا. تحتوي صورة QR المنزلة على الحمولة التي كانت موجودة عند التصدير. إذا تغير العنوان أو المبلغ أو الفاتورة أو الشبكة أو النمط، أنشئ رمزاً جديداً.',
    'What happens if a wallet ignores the amount field?': 'ماذا يحدث إذا تجاهلت المحفظة حقل المبلغ؟',
    'Some wallets may scan only the destination and ignore optional URI parameters such as amount or token details. Always confirm the recipient, network, token, and amount inside the sending wallet before approving a transaction.':
      'قد تقرأ بعض المحافظ الوجهة فقط وتتجاهل معاملات URI الاختيارية مثل المبلغ أو تفاصيل الرمز. أكد دائماً المستلم والشبكة والرمز والمبلغ داخل المحفظة قبل الموافقة.',
    'Can I paste a seed phrase or private key?': 'هل يمكنني لصق عبارة استرداد أو مفتاح خاص؟',
    'No. The tool is only for public addresses, payment URIs, Lightning invoices, transaction hashes, and custom public payloads. Never paste seed phrases or private keys into any QR generator.':
      'لا. الأداة مخصصة للعناوين العامة وURI الدفع وفواتير Lightning وهاشات المعاملات والحمولات العامة. لا تلصق عبارات استرداد أو مفاتيح خاصة أبداً.',
    'Still verify in your wallet': 'تحقق دائماً في محفظتك',
    'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
      'يساعد CryptoQR Tool على إنشاء حمولات QR قابلة للقراءة، لكن محفظتك هي المكان النهائي لتأكيد الوجهة والشبكة والرمز والمبلغ والرسوم. لا توافق على معاملة فقط لأن QR تم مسحه بنجاح.',
    'Trust and privacy': 'الثقة والخصوصية',
    'No account, no wallet connection, no server vault': 'لا حساب، لا اتصال بمحفظة، لا خزنة خادم',
    'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
      'صُمم CryptoQR Tool كأداة خاصة. تستدعي وحدات السوق والرسوم والمنصات واجهات API عامة، لكن عناوين QR والتسميات والإعدادات والشعارات تبقى في المتصفح إلا إذا نسختها أو نزّلتها أو صدّرتها أو شاركتها.',
    'Generation is client-side': 'الإنشاء يتم على جهازك',
    'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
      'إنشاء حمولة QR والتحقق والتنسيق ومعاينات الشعارات والتنزيلات تعمل في المتصفح.',
    'Local storage only': 'تخزين محلي فقط',
    'Privacy and security FAQ': 'أسئلة الخصوصية والأمان',
    'Cookies, local storage, and analytics': 'ملفات تعريف الارتباط والتخزين المحلي والتحليلات',
    'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
      'لا يستخدم CryptoQR Tool ملفات تعريف ارتباط إعلانية أو ملفات تتبع أو حسابات أو اتصالات محافظ أو خزنة عناوين على الخادم. يعمل إنشاء QR الأساسي في المتصفح وتبقى بيانات سير العمل المحفوظة على جهازك ما لم تصدرها أو تشاركها.',
    'What stays in local storage': 'ما يبقى في التخزين المحلي',
    'What is not collected': 'ما لا يتم جمعه',
    'Data processing summary': 'ملخص معالجة البيانات'
  },
  'zh-CN': {
    'Browser-local crypto QR utility': '浏览器本地加密货币 QR 工具',
    'Crypto QR Code Generator': '加密货币 QR 码生成器',
    'Your data never leaves your browser': '你的数据永不离开浏览器',
    'Made with love for privacy and zero data collection.': '为隐私而建，不收集数据。',
    'Open generator': '打开生成器',
    'Privacy model': '隐私模型',
    'Crypto QR Code FAQ': '加密货币 QR 码常见问题',
    'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
      '关于安全生成加密货币 QR 码、浏览器本地存储、匿名分析、钱包兼容性，以及分享或扫描付款请求前需要检查的内容。',
    'Is CryptoQR Tool safe for generating crypto QR codes?': 'CryptoQR Tool 用于生成加密货币 QR 码安全吗？',
    'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
      '生成器在浏览器中运行，不需要连接钱包、助记词、私钥、账户或交易所凭据。发送资金前仍应在钱包中核对每个目标地址或发票。',
    'Still verify in your wallet': '仍需在钱包中确认',
    'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
      'CryptoQR Tool 可帮助创建可读的 QR 载荷，但钱包才是最终确认目标、链、代币、金额和手续费的地方。不要只因为 QR 码扫描成功就批准交易。',
    'Trust and privacy': '信任与隐私',
    'No account, no wallet connection, no server vault': '无账户、无钱包连接、无服务器地址库',
    'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
      'CryptoQR Tool 被设计为隐私工具。行情、费用和交易所模块会调用公共 API，但 QR 地址、保存的标签、样式预设和自定义 logo 会留在浏览器中，除非你复制、下载、导出或分享。',
    'Generation is client-side': '生成在客户端完成',
    'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
      'QR 载荷构建、验证、样式、自定义 logo 预览和下载都在浏览器中运行。',
    'Local storage only': '仅本地存储',
    'Privacy and security FAQ': '隐私与安全常见问题',
    'Cookies, local storage, and analytics': 'Cookie、本地存储和分析',
    'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
      'CryptoQR Tool 不使用广告 cookie、跟踪 cookie、账户、钱包连接或服务器端地址库。核心 QR 生成在浏览器中运行，保存的工作流数据会留在你的设备上，除非你导出或分享。',
    'Cookie use': 'Cookie 使用',
    'Anonymous analytics': '匿名分析',
    'What stays in local storage': '哪些内容留在本地存储',
    'What is not collected': '不会收集的内容',
    'Data processing summary': '数据处理摘要',
    'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
      'CryptoQR Tool 可为 Monero、Bitcoin、Ethereum、Solana、Litecoin 以及 USDC、USDT 等 ERC-20 稳定币生成可扫描的付款 QR 码，不会把钱包地址、上传的 logo 或保存的预设发送到服务器。',
    'Frequently asked questions': '常见问题',
    'Crypto QR generators by coin': '按币种划分的加密货币 QR 生成器'
  },
  ja: {
    'Browser-local crypto QR utility': 'ブラウザ内の暗号資産QRツール',
    'Crypto QR Code Generator': '暗号資産QRコード生成ツール',
    'Your data never leaves your browser': 'データはブラウザの外へ出ません',
    'Made with love for privacy and zero data collection.': 'プライバシーとゼロデータ収集のために作られています。',
    'Open generator': '生成ツールを開く',
    'Privacy model': 'プライバシーモデル',
    'Crypto QR Code FAQ': '暗号資産QRコードFAQ',
    'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
      '暗号資産QRコードの安全な生成、ブラウザ内保存、匿名分析、ウォレット互換性、支払いリクエストを共有またはスキャンする前の確認事項についての回答です。',
    'Is CryptoQR Tool safe for generating crypto QR codes?': 'CryptoQR Toolは暗号資産QRコード生成に安全ですか？',
    'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
      '生成ツールはブラウザで動作し、ウォレット接続、シードフレーズ、秘密鍵、アカウント、取引所認証情報を必要としません。送金前には必ずウォレット内で送信先や請求を確認してください。',
    'Still verify in your wallet': '必ずウォレットで確認',
    'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
      'CryptoQR Toolは読みやすいQRペイロードの作成を助けますが、送信先、チェーン、トークン、金額、手数料の最終確認はウォレットで行います。QRの読み取り成功だけで承認しないでください。',
    'Trust and privacy': '信頼とプライバシー',
    'No account, no wallet connection, no server vault': 'アカウント不要、ウォレット接続不要、サーバー保管庫なし',
    'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
      'CryptoQR Toolはプライベートなユーティリティとして設計されています。市場、手数料、取引所モジュールは公開APIを呼び出しますが、QRアドレス、保存ラベル、スタイルプリセット、カスタムロゴはコピー、ダウンロード、エクスポート、共有しない限りブラウザ内に残ります。',
    'Generation is client-side': '生成はクライアント側',
    'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
      'QRペイロードの作成、検証、スタイル、カスタムロゴのプレビュー、ダウンロードはブラウザで実行されます。',
    'Local storage only': 'ローカル保存のみ',
    'Privacy and security FAQ': 'プライバシーとセキュリティFAQ',
    'Cookies, local storage, and analytics': 'Cookie、ローカル保存、分析',
    'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
      'CryptoQR Toolは広告Cookie、追跡Cookie、アカウント、ウォレット接続、サーバー側のアドレス保管庫を使用しません。QR生成はブラウザ内で実行され、保存された作業データはエクスポートまたは共有しない限り端末に残ります。',
    'Cookie use': 'Cookieの使用',
    'Anonymous analytics': '匿名分析',
    'What stays in local storage': 'ローカル保存に残るもの',
    'What is not collected': '収集されないもの',
    'Data processing summary': 'データ処理の概要',
    'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
      'CryptoQR ToolはMonero、Bitcoin、Ethereum、Solana、Litecoin、USDCやUSDTなどのERC-20ステーブルコイン向けに、ウォレットアドレス、アップロードロゴ、保存プリセットをサーバーへ送信せず、スキャン可能な支払いQRコードを生成します。',
    'Frequently asked questions': 'よくある質問',
    'Crypto QR generators by coin': '通貨別の暗号資産QR生成ツール'
  },
  ko: {
    'Browser-local crypto QR utility': '브라우저 로컬 암호화폐 QR 도구',
    'Crypto QR Code Generator': '암호화폐 QR 코드 생성기',
    'Your data never leaves your browser': '데이터는 브라우저를 벗어나지 않습니다',
    'Made with love for privacy and zero data collection.': '개인정보 보호와 무수집을 위해 만들었습니다.',
    'Open generator': '생성기 열기',
    'Privacy model': '개인정보 모델',
    'Crypto QR Code FAQ': '암호화폐 QR 코드 FAQ',
    'Answers about generating crypto QR codes safely, browser-local storage, anonymous analytics, wallet compatibility, and the checks to make before sharing or scanning a payment request.':
      '암호화폐 QR 코드를 안전하게 생성하는 방법, 브라우저 로컬 저장소, 익명 분석, 지갑 호환성, 결제 요청을 공유하거나 스캔하기 전 확인 사항에 대한 답변입니다.',
    'Is CryptoQR Tool safe for generating crypto QR codes?': 'CryptoQR Tool은 암호화폐 QR 코드 생성에 안전한가요?',
    'The generator runs in your browser and does not require wallet connection, seed phrases, private keys, accounts, or exchange credentials. You should still verify every destination address or invoice inside your wallet before sending funds.':
      '생성기는 브라우저에서 실행되며 지갑 연결, 시드 문구, 개인 키, 계정 또는 거래소 인증 정보를 요구하지 않습니다. 자금을 보내기 전에는 지갑에서 모든 수신 주소나 인보이스를 확인해야 합니다.',
    'Still verify in your wallet': '지갑에서 반드시 확인',
    'CryptoQR Tool helps create readable QR payloads, but your wallet is the final place to confirm the destination, chain, token, amount, and transaction fees. Never approve a transaction only because a QR code scanned successfully.':
      'CryptoQR Tool은 읽기 쉬운 QR 페이로드를 만드는 데 도움을 주지만, 목적지, 체인, 토큰, 금액, 수수료의 최종 확인은 지갑에서 해야 합니다. QR 코드가 스캔되었다는 이유만으로 거래를 승인하지 마세요.',
    'Trust and privacy': '신뢰와 개인정보',
    'No account, no wallet connection, no server vault': '계정 없음, 지갑 연결 없음, 서버 보관소 없음',
    'CryptoQR Tool is designed as a private utility. Live market, fee, and exchange modules call public APIs, but QR addresses, saved labels, style presets, and custom logos stay in the browser unless you copy, download, export, or share them.':
      'CryptoQR Tool은 개인용 유틸리티로 설계되었습니다. 시장, 수수료, 거래소 모듈은 공개 API를 호출하지만 QR 주소, 저장된 라벨, 스타일 프리셋, 사용자 로고는 복사, 다운로드, 내보내기 또는 공유하지 않는 한 브라우저에 남습니다.',
    'Generation is client-side': '생성은 클라이언트 측에서 수행',
    'QR payload construction, validation, styling, custom logo previews, and downloads run in the browser.':
      'QR 페이로드 구성, 검증, 스타일링, 사용자 로고 미리보기, 다운로드는 브라우저에서 실행됩니다.',
    'Local storage only': '로컬 저장소만 사용',
    'Privacy and security FAQ': '개인정보 및 보안 FAQ',
    'Cookies, local storage, and analytics': '쿠키, 로컬 저장소, 분석',
    'CryptoQR Tool does not use advertising cookies, tracking cookies, accounts, wallet connections, or a server-side address vault. Core QR generation runs in the browser, and saved workflow data remains on your device unless you export or share it.':
      'CryptoQR Tool은 광고 쿠키, 추적 쿠키, 계정, 지갑 연결 또는 서버 측 주소 보관소를 사용하지 않습니다. 핵심 QR 생성은 브라우저에서 실행되며 저장된 작업 데이터는 내보내거나 공유하지 않는 한 기기에 남습니다.',
    'Cookie use': '쿠키 사용',
    'Anonymous analytics': '익명 분석',
    'What stays in local storage': '로컬 저장소에 남는 것',
    'What is not collected': '수집하지 않는 것',
    'Data processing summary': '데이터 처리 요약',
    'CryptoQR Tool generates scannable payment QR codes for Monero, Bitcoin, Ethereum, Solana, Litecoin, and ERC-20 stablecoins like USDC and USDT without sending wallet addresses, uploaded logos, or saved presets to a server.':
      'CryptoQR Tool은 Monero, Bitcoin, Ethereum, Solana, Litecoin 및 USDC, USDT 같은 ERC-20 스테이블코인용 스캔 가능한 결제 QR 코드를 생성하며 지갑 주소, 업로드한 로고, 저장된 프리셋을 서버로 보내지 않습니다.',
    'Frequently asked questions': '자주 묻는 질문',
    'Crypto QR generators by coin': '코인별 암호화폐 QR 생성기'
  }
};

export const phraseTranslations: Partial<Record<Locale, PhraseMap>> = {
  es: { ...es, ...complaintPageExtras.es, ...generatedPhraseTranslations.es },
  pt: { ...pt, ...complaintPageExtras.pt, ...generatedPhraseTranslations.pt },
  uk: { ...uk, ...ukExtra, ...generatedPhraseTranslations.uk },
  nl: { ...nl, ...complaintPageExtras.nl, ...generatedPhraseTranslations.nl },
  de: { ...de, ...complaintPageExtras.de, ...generatedPhraseTranslations.de },
  fr: { ...fr, ...complaintPageExtras.fr, ...generatedPhraseTranslations.fr },
  it: { ...it, ...complaintPageExtras.it, ...generatedPhraseTranslations.it },
  ru: { ...ru, ...ruExtra, ...generatedPhraseTranslations.ru },
  ar: { ...ar, ...complaintPageExtras.ar, ...generatedPhraseTranslations.ar },
  'zh-CN': { ...zh, ...complaintPageExtras['zh-CN'], ...generatedPhraseTranslations['zh-CN'] },
  ja: { ...ja, ...complaintPageExtras.ja, ...generatedPhraseTranslations.ja },
  ko: { ...ko, ...complaintPageExtras.ko, ...generatedPhraseTranslations.ko },
  'en-GB': {}
};

export function tr(locale: Locale = defaultLocale, phrase: string) {
  return phraseTranslations[locale]?.[phrase] ?? phrase;
}

export function trStatus(locale: Locale, status: string) {
  const labels: Record<string, string> = {
    fresh: tr(locale, 'fresh'),
    stale: tr(locale, 'stale'),
    unavailable: tr(locale, 'unavailable'),
    'rate-limited': tr(locale, 'rate-limited'),
    valid: tr(locale, 'Valid'),
    warning: tr(locale, 'warning'),
    invalid: tr(locale, 'invalid'),
    unsupported: tr(locale, 'unsupported')
  };
  return labels[status] ?? tr(locale, status);
}
