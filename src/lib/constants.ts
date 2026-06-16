// ═══════════════════════════════════════════════════════════════════
// 🏗️ ItqanBuild — Site-Wide Constants
// Brand, NAP, Services, Districts — Single Source of Truth
// ═══════════════════════════════════════════════════════════════════

export const SITE = {
  name: "إتقان للمقاولات",
  nameEn: "ItqanBuild Contractors",
  tagline: "مقاول جدة — إتقان في كل تفصيلة",
  url: "https://itqanbuild.com",
  logo: "/logo.png",
  phone: "+966542317431",
  phoneDisplay: "٠٥٤ ٢٣١ ٧٤٣١",
  whatsapp: "966542317431",
  email: "info@itqanbuild.com",
  crNumber: "4030253566",
  vatNumber: "311280328300003",
  foundedYear: 2010,
  yearsExperience: 15,
  projectsCompleted: 500,
  address: {
    street: "طريق المدينة المنورة",
    district: "حي الروضة",
    city: "جدة",
    region: "مكة المكرمة",
    postalCode: "23434",
    country: "SA",
  },
  geo: {
    latitude: 21.5433,
    longitude: 39.1728,
  },
  // ─── Opening Hours — Single Source of Truth (Sat–Thu 08:00–17:00, Fri closed) ───
  openingHours: {
    days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "08:00",
    closes: "17:00",
    display: "السبت – الخميس: ٨:٠٠ ص – ٥:٠٠ م · الجمعة إجازة",
  },
  social: {
    instagram: "https://www.instagram.com/itqanbuild",
    twitter: "https://twitter.com/itqanbuild",
    googleMaps: "https://g.page/itqanbuild",
    balady: "https://balady.gov.sa",
    muqawal: "https://muqawal.sa",
  },
} as const;

export type ServiceKey =
  | "tarmeem"
  | "shboak"
  | "asphalt"
  | "binaa"
  | "molahaq"
  | "general"
  | "hadm"
  | "hanager"
  | "tashteebat";

export interface ServiceData {
  key: ServiceKey;
  slug: string;
  title: string;
  h1: string;
  description: string;
  image: string;
  imageAlt: string;
  tldr: {
    scope: string;
    priceRange: string;
    duration: string;
    warranty: string;
  };
  priceUnit: string;
}

export const SERVICES: Record<ServiceKey, ServiceData> = {
  tarmeem: {
    key: "tarmeem",
    slug: "tarmeem",
    title: "مقاول ترميم جدة | ترميم منازل وفلل",
    h1: "مقاول ترميم جدة — تجديد شامل بأسعار تنافسية",
    description:
      "مقاول ترميم جدة المعتمد ✓ ترميم شامل للمنازل والفلل والشقق ✓ أسعار تنافسية ✓ ضمان 3 سنوات مكتوبة",
    image: "/images/service-tarmeem-jeddah.avif",
    imageAlt: "مقاول ترميم منازل في جدة",
    tldr: {
      scope: "ترميم شامل — منازل وفلل وشقق ومباني تجارية",
      priceRange: "١٥٠ – ١٬٠٠٠ ريال/م²",
      duration: "أسبوع واحد (بسيط) — ٣ أشهر (شامل)",
      warranty: "٣ سنوات مكتوبة على جميع الأعمال",
    },
    priceUnit: "ريال/م²",
  },
  shboak: {
    key: "shboak",
    slug: "shboak",
    title: "مقاول شبوك جدة | أسوار وشبوك حديد",
    h1: "مقاول شبوك جدة — حلول أسوار لكل الاستخدامات",
    description:
      "مقاول شبوك جدة ✓ شبوك حديد وألمنيوم وبلاستيك ✓ تركيب احترافي ✓ ضمان ٥ سنوات على المجلفنة",
    image: "/images/service-shboak-jeddah.avif",
    imageAlt: "مقاول شبوك وأسوار حديد جدة",
    tldr: {
      scope: "شبوك حديد، ألمنيوم، بلاستيك PVC، أمني",
      priceRange: "٢٥ – ٥٠٠ ريال/م.ط",
      duration: "١–٧ أيام حسب الطول",
      warranty: "٥ سنوات على الشبوك المجلفنة",
    },
    priceUnit: "ريال/م.ط",
  },
  asphalt: {
    key: "asphalt",
    slug: "asphalt",
    title: "مقاول اسفلت جدة | تبليط طرق ومواقف",
    h1: "مقاول اسفلت جدة — تبليط احترافي بمعايير الطرق السعودية",
    description:
      "مقاول اسفلت جدة ✓ طرق ومواقف سيارات وساحات ✓ أسفلت بارد وساخن ✓ ضمان سنتين",
    image: "/images/service-asphalt-jeddah.avif",
    imageAlt: "أعمال أسفلت وتبليط طرق جدة",
    tldr: {
      scope: "طرق، مواقف، ساحات صناعية، ملاعب",
      priceRange: "٣٥ – ١٢٠ ريال/م²",
      duration: "يوم واحد (بارد) — ٣ أيام (طرق كبيرة)",
      warranty: "سنتان على أعمال التبليط",
    },
    priceUnit: "ريال/م²",
  },
  binaa: {
    key: "binaa",
    slug: "binaa",
    title: "مقاول بناء جدة | بناء فلل وعمارات",
    h1: "مقاول بناء جدة — من التصميم إلى التسليم",
    description:
      "مقاول بناء جدة ✓ فلل وعمارات ومستودعات ✓ تسليم مفتاح بالمواد ✓ ضمان ١٠ سنوات هيكلي",
    image: "/images/service-binaa-villa-jeddah.avif",
    imageAlt: "مقاول بناء فيلا في جدة",
    tldr: {
      scope: "فلل، عمارات، ملاحق، مستودعات — تسليم مفتاح",
      priceRange: "١٬٠٠٠ – ٣٬٠٠٠+ ريال/م²",
      duration: "٦–١٨ شهراً حسب حجم المشروع",
      warranty: "١٠ سنوات على الهيكل الإنشائي",
    },
    priceUnit: "ريال/م²",
  },
  molahaq: {
    key: "molahaq",
    slug: "molahaq",
    title: "مقاول ملاحق جدة | بناء ملاحق منازل",
    h1: "مقاول ملاحق جدة — حلول توسعة منزلك بترخيص",
    description:
      "مقاول ملاحق جدة ✓ ملاحق سطح وجانبية وغرف إضافية ✓ مساعدة في التصاريح ✓ ضمان ٥ سنوات",
    image: "/images/service-molahaq-jeddah.avif",
    imageAlt: "مقاول ملاحق منازل جدة",
    tldr: {
      scope: "ملاحق سطح، ملاحق جانبية، غرف إضافية، مجالس",
      priceRange: "٨٠٠ – ١٬٨٠٠ ريال/م²",
      duration: "٣–٨ أسابيع",
      warranty: "٥ سنوات + مساعدة في استخراج التصاريح",
    },
    priceUnit: "ريال/م²",
  },
  general: {
    key: "general",
    slug: "general",
    title: "مقاول عام جدة | مقاول معماري معتمد",
    h1: "مقاول عام جدة — حلول مقاولات متكاملة",
    description:
      "مقاول عام جدة المعتمد ✓ مقاولات شاملة ✓ إشراف هندسي ✓ تنفيذ متكامل لجميع الأعمال",
    image: "/images/service-general-contractor-jeddah.avif",
    imageAlt: "مقاول عام معتمد جدة",
    tldr: {
      scope: "مقاولات عامة، إشراف هندسي، تنفيذ متكامل",
      priceRange: "حسب نوع المشروع وحجمه",
      duration: "حسب المشروع",
      warranty: "ضمان شامل حسب نوع العمل",
    },
    priceUnit: "ريال",
  },
  hadm: {
    key: "hadm",
    slug: "hadm",
    title: "مقاول هدم جدة | هدم مباني وإزالة",
    h1: "مقاول هدم جدة — إزالة آمنة ومرخصة",
    description:
      "مقاول هدم جدة ✓ هدم مباني وإزالة أسوار ✓ ردم ونقل مخلفات ✓ تصاريح + تأمين ضد الأضرار",
    image: "/images/service-hadm-mabani-jeddah.avif",
    imageAlt: "هدم مباني مقاول هدم جدة",
    tldr: {
      scope: "هدم مباني، إزالة أسوار، ردم، نقل مخلفات",
      priceRange: "تبدأ من ١٥ ريال/م²",
      duration: "١–٧ أيام حسب الحجم",
      warranty: "تصاريح الهدم + تأمين ضد الأضرار",
    },
    priceUnit: "ريال/م²",
  },
  hanager: {
    key: "hanager",
    slug: "hanager",
    title: "مقاول هناجر جدة | هناجر حديد ومستودعات",
    h1: "مقاول هناجر جدة — إنشاء سريع وتوريد فوري",
    description:
      "مقاول هناجر جدة ✓ هناجر حديد ومستودعات صناعية ✓ تصنيع وتركيب ✓ ضمان ١٠ سنوات هيكلي",
    image: "/images/service-hanager-steel-jeddah.avif",
    imageAlt: "مقاول هناجر حديد ومستودعات جدة",
    tldr: {
      scope: "هناجر حديد، مستودعات صناعية، خراطيم",
      priceRange: "٢٥٠ – ٦٠٠ ريال/م²",
      duration: "٧–٢١ يوماً",
      warranty: "١٠ سنوات على الهيكل الحديدي",
    },
    priceUnit: "ريال/م²",
  },
  tashteebat: {
    key: "tashteebat",
    slug: "tashteebat",
    title: "مقاول تشطيبات جدة | دهانات وتشطيب فلل",
    h1: "مقاول تشطيبات جدة — فلل وشقق بجودة فندقية",
    description:
      "مقاول تشطيبات جدة ✓ تشطيب A/B/C ✓ دهانات داخلية وخارجية ✓ واجهات بروفايل ✓ ضمان سنتين",
    image: "/images/service-tashteebat-villa-jeddah.avif",
    imageAlt: "تشطيبات فلل فاخرة مقاول جدة",
    tldr: {
      scope: "تشطيب A/B/C، دهانات داخلية وخارجية، واجهات بروفايل",
      priceRange: "٢٠٠ – ١٬٢٠٠ ريال/م²",
      duration: "أسبوعان – ٤ أشهر",
      warranty: "سنتان على أعمال الدهان والتشطيب",
    },
    priceUnit: "ريال/م²",
  },
};

export const SERVICES_LIST = Object.values(SERVICES);

// ─── Arabic serviceType labels for JSON-LD (avoids Latin slug leaking into schema) ───
export const SERVICE_TYPE_AR: Record<ServiceKey, string> = {
  tarmeem: "ترميم",
  shboak: "شبوك",
  asphalt: "أسفلت",
  binaa: "بناء",
  molahaq: "ملاحق",
  general: "مقاولات عامة",
  hadm: "هدم",
  hanager: "هناجر",
  tashteebat: "تشطيبات",
};

// ─── Machine-readable price ranges (SAR) for Offer schema; null = quote-based ───
export const SERVICE_PRICE_RANGE: Record<ServiceKey, { low: number; high: number } | null> = {
  tarmeem: { low: 150, high: 1000 },
  shboak: { low: 25, high: 500 },
  asphalt: { low: 35, high: 120 },
  binaa: { low: 1000, high: 3000 },
  molahaq: { low: 800, high: 1800 },
  general: null,
  hadm: { low: 15, high: 60 },
  hanager: { low: 250, high: 600 },
  tashteebat: { low: 200, high: 1200 },
};

// ─── OG image helper: maps a square AVIF content photo to its 1200×630 JPG twin ───
// (social crawlers — Twitter/X especially — need JPG/PNG at 1.91:1, not square AVIF)
export const toOgImage = (src: string): string => src.replace(/\.avif$/, "-og.jpg");

// Default OG image for pages without a dedicated hero (1200×630 JPG)
export const DEFAULT_OG_IMAGE = "/images/hero-contractor-jeddah-og.jpg";

// Last meaningful content update — stable sitemap lastmod (avoids churning every deploy)
export const LAST_CONTENT_UPDATE = "2026-06-13";

export interface DistrictData {
  key: string;
  slug: string;
  name: string;
  nameEn: string;
  h1: string;
  description: string;
  image: string;
  imageAlt: string;
  geo: { latitude: number; longitude: number };
  projectsCount: number;
  soilNote: string;
}

export const DISTRICTS: Record<string, DistrictData> = {
  rawdah: {
    key: "rawdah",
    slug: "rawdah",
    name: "حي الروضة",
    nameEn: "Al Rawdah",
    h1: "مقاول حي الروضة جدة — خبرة أكثر من ٥٠ مشروعاً في الحي",
    description:
      "مقاول حي الروضة جدة ✓ ترميم وبناء وتشطيبات ✓ خبرة في المباني الكلاسيكية ✓ ٥٠+ مشروع في الحي",
    image: "/images/district-rawdah-jeddah.avif",
    imageAlt: "مقاول حي الروضة جدة",
    geo: { latitude: 21.5433, longitude: 39.1728 },
    projectsCount: 52,
    soilNote:
      "تربة مستقرة — أساسات قصيرة كافية. المباني القديمة تحتاج حقن إيبوكسي للبلاطات.",
  },
  salamah: {
    key: "salamah",
    slug: "salamah",
    name: "حي السلامة",
    nameEn: "Al Salamah",
    h1: "مقاول حي السلامة جدة — تجديد وترميم المنازل العريقة",
    description:
      "مقاول حي السلامة جدة ✓ خبرة في ترميم المنازل القديمة ✓ تشطيبات فاخرة ✓ ملاحق سطح",
    image: "/images/district-salamah-jeddah.avif",
    imageAlt: "مقاول حي السلامة جدة",
    geo: { latitude: 21.5569, longitude: 39.1701 },
    projectsCount: 38,
    soilNote:
      "تربة صخرية مستقرة — تكاليف حفر أعلى ولكن أساسات أقوى بشكل طبيعي.",
  },
  nazha: {
    key: "nazha",
    slug: "nazha",
    name: "حي النزهة",
    nameEn: "Al Nazhah",
    h1: "مقاول حي النزهة جدة — بناء وتشطيب بأعلى المعايير",
    description:
      "مقاول حي النزهة جدة ✓ بناء فلل وهناجر صناعية وأسفلت مواقف ✓ خبرة في الأراضي المختلطة وفحص التربة ✓ معاينة مجانية وعرض سعر تفصيلي.",
    image: "/images/district-nazha-jeddah.avif",
    imageAlt: "مقاول حي النزهة جدة",
    geo: { latitude: 21.5812, longitude: 39.1654 },
    projectsCount: 28,
    soilNote: "منطقة مختلطة — تحتاج فحص تربة لتحديد نوع الأساسات.",
  },
  safa: {
    key: "safa",
    slug: "safa",
    name: "حي الصفا",
    nameEn: "Al Safa",
    h1: "مقاول حي الصفا جدة — ترميم وتطوير العقارات",
    description:
      "مقاول حي الصفا جدة ✓ ترميم شامل وملاحق وتشطيبات فاخرة ✓ خبرة في تطوير العقارات القائمة ✓ معاينة مجانية وعرض سعر مكتوب خلال ٢٤ ساعة.",
    image: "/images/district-safa-jeddah.avif",
    imageAlt: "مقاول حي الصفا جدة",
    geo: { latitude: 21.5511, longitude: 39.1851 },
    projectsCount: 34,
    soilNote: "تربة رملية متوسطة — أساسات شريطية قياسية.",
  },
  hamadaniyah: {
    key: "hamadaniyah",
    slug: "hamadaniyah",
    name: "حي الحمدانية",
    nameEn: "Al Hamadaniyah",
    h1: "مقاول حي الحمدانية جدة — بناء مشاريع سكنية جديدة",
    description:
      "مقاول حي الحمدانية جدة ✓ بناء فلل جديدة وشبوك وأسوار وأسفلت ✓ خبرة في الأساسات العميقة قرب الأودية ✓ ضمان مكتوب ومعاينة مجانية.",
    image: "/images/district-hamadaniyah-jeddah.avif",
    imageAlt: "مقاول حي الحمدانية جدة",
    geo: { latitude: 21.6123, longitude: 39.2145 },
    projectsCount: 22,
    soilNote:
      "تربة رملية — تحتاج أساسات عميقة في بعض المناطق القريبة من الأودية.",
  },
  north: {
    key: "north",
    slug: "north",
    name: "شمال جدة",
    nameEn: "North Jeddah",
    h1: "مقاول شمال جدة — أبحر الشمالية والأحياء الجديدة",
    description:
      "مقاول شمال جدة وأبحر ✓ خرسانة مقاومة للكبريتات وعزل مزدوج للبناء الساحلي ✓ معالجة الملوحة والمياه الجوفية ✓ معاينة مجانية وضمان مكتوب.",
    image: "/images/district-north-jeddah.avif",
    imageAlt: "مقاول شمال جدة وأبحر الشمالية",
    geo: { latitude: 21.6745, longitude: 39.1234 },
    projectsCount: 45,
    soilNote:
      "ملوحة عالية + مياه جوفية سطحية — نستخدم حصرياً خرسانة مقاومة للكبريتات (نوع V) وعوازل أسمنتية مزدوجة.",
  },
  abhur: {
    key: "abhur",
    slug: "abhur",
    name: "أبحر الشمالية",
    nameEn: "Abhur",
    h1: "مقاول أبحر الشمالية جدة — بناء ساحلي متخصص",
    description:
      "مقاول أبحر الشمالية ✓ خبرة في البناء الساحلي ✓ خرسانة مقاومة للملوحة ✓ عزل مزدوج",
    image: "/images/district-abhur-jeddah.avif",
    imageAlt: "مقاول أبحر الشمالية جدة",
    geo: { latitude: 21.7123, longitude: 39.0987 },
    projectsCount: 31,
    soilNote:
      "بيئة ساحلية قاسية — ارتفاع منسوب المياه السطحية يتطلب عزل أسمنتي مزدوج وخرسانة مقاومة للكبريتات.",
  },
};

export const DISTRICTS_LIST = Object.values(DISTRICTS);

export const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "خدماتنا", href: "/#services", hasSubmenu: true },
  { label: "مشاريعنا", href: "/projects" },
  { label: "الأسعار", href: "/prices" },
  { label: "من نحن", href: "/about" },
  { label: "المدونة", href: "/blog" },
  { label: "تواصل", href: "/contact" },
];

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "مرحباً، أريد الاستفسار عن خدمات المقاولات في جدة"
)}`;
