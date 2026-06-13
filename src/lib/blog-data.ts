import type { ServiceKey } from "./constants";

export interface BlogPost {
  slug: string;
  title: string;
  h1: string;
  description: string;
  image: string;
  imageAlt: string;
  date: string;
  dateModified?: string;
  readTime: string;
  category: string;
  tier?: "pillar" | "cluster" | "faq";
}

// ─── Maps each post to its primary commercial (money) page for in-content linking ───
export const BLOG_POST_SERVICE: Record<string, ServiceKey> = {
  "choose-contractor-jeddah": "general",
  "tarmeem-cost-jeddah": "tarmeem",
  "build-house-jeddah-stages": "binaa",
  "shboak-types-jeddah": "shboak",
  "asphalt-types-jeddah": "asphalt",
  "hanager-guide-jeddah": "hanager",
  "villa-paint-colors-jeddah": "tashteebat",
  "hadm-requirements-jeddah": "hadm",
  "tashteeb-abc-comparison": "tashteebat",
  "building-permit-jeddah-2026": "binaa",
  "roof-insulation-jeddah": "tarmeem",
  "brick-types-jeddah": "binaa",
  "mokawel-aam-vs-mimari": "general",
  "mokawel-profit-percentage": "general",
  "ml7aq-permit-jeddah": "molahaq",
  "tasleem-miftah-meaning": "binaa",
  "contractor-warning-signs": "general",
  "best-time-tarmeem-jeddah": "tarmeem",
  "contract-protection-tips": "general",
  "concrete-types-jeddah": "binaa",
  "smart-home-jeddah": "tashteebat",
  "waterproofing-jeddah": "tarmeem",
  "foundation-types-jeddah": "binaa",
  "cost-overrun-prevention": "general",
  "best-time-build-jeddah": "binaa",
};

export const BLOG_POSTS: BlogPost[] = [
  // ─── PILLAR ARTICLES ───
  {
    slug: "choose-contractor-jeddah",
    title: `كيف تختار مقاول في جدة — دليل شامل ٢٠٢٦`,
    h1: "كيف تختار مقاول في جدة — الدليل الشامل ٢٠٢٦",
    description:
      "دليل اختيار المقاول المناسب في جدة — ١٠ معايير، أسئلة يجب طرحها، كيف تتحقق من الترخيص عبر بلدي، والفرق بين المقاول الفردي وشركة المقاولات.",
    image: "/images/blog-hero-choose-contractor.avif",
    imageAlt: "اختيار مقاول في جدة",
    date: "2026-05-10",
    readTime: "١٢ دقيقة",
    category: "أدلة شاملة",
    tier: "pillar",
  },
  {
    slug: "tarmeem-cost-jeddah",
    title: `تكلفة ترميم المنزل في جدة ٢٠٢٦ — دليل الأسعار`,
    h1: "تكلفة ترميم المنزل في جدة — دليل الأسعار ٢٠٢٦",
    description:
      "أسعار ترميم المنازل في جدة بالتفصيل — دهان، سيراميك، سباكة، كهرباء. جدول مقارنة + حاسبة تكلفة تفاعلية + خصوصيات الأحياء.",
    image: "/images/blog-hero-tarmeem-cost.avif",
    imageAlt: "تكلفة ترميم منزل جدة",
    date: "2026-05-08",
    readTime: "١٣ دقيقة",
    category: "أسعار",
    tier: "pillar",
  },
  {
    slug: "build-house-jeddah-stages",
    title: `مراحل بناء منزل في جدة من الصفر — دليل ٢٠٢٦`,
    h1: "مراحل بناء منزل في جدة من الصفر — الدليل الكامل",
    description:
      "من رخصة البناء إلى تسليم المفتاح — ٧ مراحل لبناء منزل في جدة مع جدول زمني وتكاليف تقريبية لكل مرحلة + أخطاء شائعة.",
    image: "/images/blog-hero-build-stages.avif",
    imageAlt: "مراحل بناء منزل جدة",
    date: "2026-05-05",
    readTime: "١٥ دقيقة",
    category: "أدلة شاملة",
    tier: "pillar",
  },

  // ─── CLUSTER ARTICLES ───
  {
    slug: "shboak-types-jeddah",
    title: `أنواع شبوك الأسوار وأفضلها في جدة ٢٠٢٦`,
    h1: "أنواع شبوك الأسوار — أيها الأنسب لأرضك في جدة؟",
    description:
      "مقارنة شاملة بين شبوك الحديد المجلفن والألمنيوم والبلاستيك PVC — مع أسعار ٢٠٢٦ ومتطلبات رخصة التسوير.",
    image: "/images/blog-hero-shboak-types.avif",
    imageAlt: "أنواع شبوك أسوار جدة",
    date: "2026-04-28",
    readTime: "٩ دقائق",
    category: "مقارنات",
    tier: "cluster",
  },
  {
    slug: "asphalt-types-jeddah",
    title: `الفرق بين الأسفلت البارد والساخن في جدة`,
    h1: "الأسفلت البارد vs الساخن — أيهما أنسب لمشروعك في جدة؟",
    description:
      "مقارنة فنية بين الأسفلت البارد والساخن — المتانة، التكلفة، سرعة التنفيذ، وأفضل الاستخدامات في مناخ جدة.",
    image: "/images/blog-hero-asphalt-types.avif",
    imageAlt: "أنواع أسفلت جدة",
    date: "2026-04-20",
    readTime: "٨ دقائق",
    category: "مقارنات",
    tier: "cluster",
  },
  {
    slug: "hanager-guide-jeddah",
    title: `هناجر الإنشاء السريع في جدة — مميزات وأسعار ٢٠٢٦`,
    h1: "هناجر الإنشاء السريع — كل ما تحتاج معرفته",
    description:
      "دليل شامل عن هناجر الحديد في جدة — أنواعها، مميزاتها، عيوبها، أسعار ٢٠٢٦ بالمتر، ومدة التنفيذ.",
    image: "/images/blog-hero-hanager-guide.avif",
    imageAlt: "هناجر حديد جدة",
    date: "2026-04-15",
    readTime: "١٠ دقائق",
    category: "أدلة",
    tier: "cluster",
  },
  {
    slug: "villa-paint-colors-jeddah",
    title: `أفضل ألوان دهانات الفلل في جدة ٢٠٢٦`,
    h1: "أفضل ألوان دهانات الفلل في جدة ٢٠٢٦ — دليل المعماري",
    description:
      "اختيار ألوان دهانات الفلل في جدة — تأثير المناخ على الألوان، الترندات الحديثة، ونصائح اختيار اللون المناسب للواجهة والداخلية.",
    image: "/images/service-tashteebat-villa-jeddah.avif",
    imageAlt: "ألوان دهانات فلل جدة",
    date: "2026-04-10",
    readTime: "٧ دقائق",
    category: "تشطيبات",
    tier: "cluster",
  },
  {
    slug: "hadm-requirements-jeddah",
    title: `اشتراطات هدم المباني في جدة — التصاريح والأمان`,
    h1: "اشتراطات هدم المباني في جدة — دليل التصاريح والأمان",
    description:
      "كيفية الحصول على تصريح هدم في جدة، الإجراءات القانونية، احتياطات السلامة، وتكلفة الهدم لكل نوع مبنى.",
    image: "/images/service-hadm-mabani-jeddah.avif",
    imageAlt: "هدم مباني جدة",
    date: "2026-04-05",
    readTime: "٨ دقائق",
    category: "إجراءات",
    tier: "cluster",
  },
  {
    slug: "tashteeb-abc-comparison",
    title: `الفرق بين تشطيب A و B و C — أي تختار؟`,
    h1: "تشطيب A vs B vs C — الفرق التفصيلي ومتى تختار كل نوع",
    description:
      "شرح مفصّل لأنظمة التشطيب الثلاثة في السوق السعودي — المواد، التكلفة، الجودة، ومتى تختار كل نوع.",
    image: "/images/service-tashteebat-villa-jeddah.avif",
    imageAlt: "أنواع تشطيب الفلل جدة",
    date: "2026-03-28",
    readTime: "٩ دقائق",
    category: "تشطيبات",
    tier: "cluster",
  },
  {
    slug: "building-permit-jeddah-2026",
    title: `كيف تحصل على رخصة بناء في جدة ٢٠٢٦ — كروكي تنظيمي`,
    h1: "كيف تحصل على رخصة بناء في جدة ٢٠٢٦ — دليل خطوة بخطوة",
    description:
      "إجراءات استخراج رخصة البناء عبر نظام «ابني» — المتطلبات، المدة، التكلفة، وأخطاء شائعة يقع فيها الملاك.",
    image: "/images/service-binaa-villa-jeddah.avif",
    imageAlt: "رخصة بناء جدة",
    date: "2026-03-20",
    readTime: "١١ دقيقة",
    category: "إجراءات",
    tier: "cluster",
  },
  {
    slug: "roof-insulation-jeddah",
    title: `عزل الأسطح في جدة — الدليل الشامل ٢٠٢٦`,
    h1: "عزل الأسطح في جدة — أفضل أنواع العزل لمناخ جدة الحار",
    description:
      "مقارنة أنواع عزل الأسطح في جدة (بيتومين، بولي يوريا، فوم، رغوي) — التكلفة، العمر الافتراضي، وأيها يناسب مناخ جدة.",
    image: "/images/service-tarmeem-jeddah.avif",
    imageAlt: "عزل أسطح جدة",
    date: "2026-03-15",
    readTime: "٨ دقائق",
    category: "تشطيبات",
    tier: "cluster",
  },
  {
    slug: "brick-types-jeddah",
    title: `الطوب الخفيف vs الطوب الأحمر — أيهما أفضل لجدة؟`,
    h1: "الطوب الخفيف vs الطوب الأحمر — أيهما الأفضل للبناء في جدة؟",
    description:
      "مقارنة فنية بين الطوب الخفيف (سيبوركس) والطوب الأحمر التقليدي — العزل، التكلفة، السرعة، وأيهما يناسب مناخ جدة.",
    image: "/images/service-binaa-villa-jeddah.avif",
    imageAlt: "أنواع الطوب جدة",
    date: "2026-03-08",
    readTime: "٧ دقائق",
    category: "مقارنات",
    tier: "cluster",
  },

  // ─── FAQ ARTICLES ───
  {
    slug: "mokawel-aam-vs-mimari",
    title: `ما الفرق بين المقاول العام والمقاول المعماري؟`,
    h1: "ما الفرق بين المقاول العام والمقاول المعماري؟",
    description:
      "شرح الفرق بين المقاول العام والمقاول المعماري في السوق السعودي — التخصصات، المسؤوليات، ومتى تحتاج كلاً منهما.",
    image: "/images/service-general-contractor-jeddah.avif",
    imageAlt: "الفرق بين المقاول العام والمعماري",
    date: "2026-02-28",
    readTime: "٦ دقائق",
    category: "أسئلة شائعة",
    tier: "faq",
  },
  {
    slug: "mokawel-profit-percentage",
    title: `كم يأخذ المقاول نسبة من مشروع البناء؟`,
    h1: "كم يأخذ المقاول نسبة من مشروع البناء؟ الحقيقة الكاملة",
    description:
      "شرح هامش الربح الفعلي للمقاول في جدة — كيف يُحسب السعر، هل المقاول الأرخص هو الأفضل، ومتى تشك بأن السعر منخفض جداً.",
    image: "/images/service-general-contractor-jeddah.avif",
    imageAlt: "نسبة ربح المقاول",
    date: "2026-02-20",
    readTime: "٦ دقائق",
    category: "أسئلة شائعة",
    tier: "faq",
  },
  {
    slug: "ml7aq-permit-jeddah",
    title: `هل يحتاج الملحق رخصة بناء في جدة؟`,
    h1: "هل يحتاج الملحق رخصة بناء في جدة؟ الإجابة الكاملة",
    description:
      "كل ما تحتاج معرفته عن تصاريح الملاحق في جدة — متى تحتاج رخصة، الإجراءات، التكلفة، وما يحدث إذا بنيت بدون ترخيص.",
    image: "/images/service-molahaq-jeddah.avif",
    imageAlt: "رخصة ملحق جدة",
    date: "2026-02-15",
    readTime: "٧ دقائق",
    category: "أسئلة شائعة",
    tier: "faq",
  },
  {
    slug: "tasleem-miftah-meaning",
    title: `ما الفرق بين شغل عظم بالمواد وتسليم مفتاح؟`,
    h1: "شغل عظم بالمواد vs تسليم مفتاح — الفرق الجوهري",
    description:
      "شرح مصطلحي «شغل عظم بالمواد» و«تسليم مفتاح» في السوق السعودي — الفروقات، التكاليف، الضمانات، وأيهما أنسب لمشروعك.",
    image: "/images/service-binaa-villa-jeddah.avif",
    imageAlt: "تسليم مفتاح أم عظم بالمواد",
    date: "2026-02-08",
    readTime: "٦ دقائق",
    category: "أسئلة شائعة",
    tier: "faq",
  },
  {
    slug: "contractor-warning-signs",
    title: `علامات التحذير عند اختيار المقاول الخطأ`,
    h1: "١٠ علامات تحذير تدل على أنك اخترت المقاول الخطأ",
    description:
      "كيف تكتشف المقاول السيء قبل التوقيع — علامات تحذيرية في العرض، العقد، الموقع، والتواصل تحميك من الكوارث.",
    image: "/images/service-general-contractor-jeddah.avif",
    imageAlt: "علامات التحذير من المقاول السيء",
    date: "2026-02-01",
    readTime: "٧ دقائق",
    category: "أسئلة شائعة",
    tier: "faq",
  },
  {
    slug: "best-time-tarmeem-jeddah",
    title: `متى يجب ترميم المنزل قبل فوات الأوان؟`,
    h1: "متى يجب ترميم المنزل قبل فوات الأوان؟ ٨ علامات",
    description:
      "علامات تدل على حاجة منزلك لترميم عاجل — شقوق، تسرّب، صدأ، رطوبة. كيف تكتشفها مبكراً قبل تفاقم الأضرار.",
    image: "/images/service-tarmeem-jeddah.avif",
    imageAlt: "وقت ترميم المنزل جدة",
    date: "2026-01-25",
    readTime: "٦ دقائق",
    category: "أسئلة شائعة",
    tier: "faq",
  },

  // ─── ROUND 2 — CLUSTER + FAQ articles (6 additional) ───
  {
    slug: "contract-protection-tips",
    title: `كيف تحمي نفسك قانونياً في عقد المقاولة؟`,
    h1: "كيف تحمي نفسك قانونياً في عقد المقاولة؟ ١٠ بنود إلزامية",
    description:
      "دليل قانوني لتوقيع عقد مقاولة آمن — ١٠ بنود إلزامية، شروط الدفع، الضمانات، الشرط الجزائي، وآلية حل النزاعات.",
    image: "/images/service-general-contractor-jeddah.avif",
    imageAlt: "حماية قانونية في عقد المقاولة",
    date: "2026-01-15",
    readTime: "١٠ دقائق",
    category: "حماية قانونية",
    tier: "cluster",
  },
  {
    slug: "concrete-types-jeddah",
    title: `أنواع الخرسانة المستخدمة في البناء السعودي`,
    h1: "أنواع الخرسانة في جدة — مواصفات الكود السعودي",
    description:
      "شرح فني لأنواع الخرسانة (OPC, SRC Type V, HSC) — متى تستخدم كل نوع، التكلفة، وخصوصية الأحياء الساحلية في جدة.",
    image: "/images/service-binaa-villa-jeddah.avif",
    imageAlt: "أنواع الخرسانة في جدة",
    date: "2026-01-08",
    readTime: "١١ دقيقة",
    category: "تقنية البناء",
    tier: "cluster",
  },
  {
    slug: "smart-home-jeddah",
    title: `المنزل الذكي في جدة ٢٠٢٦ — دليل شامل`,
    h1: "المنزل الذكي في جدة ٢٠٢٦ — استثمار أم رفاهية؟",
    description:
      "كل ما تحتاجه عن المنازل الذكية في جدة — KNX, HomeKit, Google Home. التكاليف، التأسيس، والاستراتيجية الذكية للاستثمار.",
    image: "/images/service-tashteebat-villa-jeddah.avif",
    imageAlt: "منزل ذكي جدة",
    date: "2025-12-28",
    readTime: "١٢ دقيقة",
    category: "تقنية البناء",
    tier: "cluster",
  },
  {
    slug: "waterproofing-jeddah",
    title: `العزل المائي في جدة — الدليل الشامل ٢٠٢٦`,
    h1: "العزل المائي في جدة — كل أنواعه وأيها يناسبك",
    description:
      "مقارنة أنواع العزل المائي (بيتومين، بولي يوريا، إسمنتي، HDPE) — التكلفة، العمر الافتراضي، وأي نوع يناسب كل حي في جدة.",
    image: "/images/service-tarmeem-jeddah.avif",
    imageAlt: "عزل مائي في جدة",
    date: "2025-12-20",
    readTime: "١٠ دقائق",
    category: "تقنية البناء",
    tier: "cluster",
  },
  {
    slug: "foundation-types-jeddah",
    title: `أنواع الأساسات في جدة — أيها يناسب أرضك؟`,
    h1: "أنواع الأساسات في جدة — دليل اختيار الأساس الصحيح",
    description:
      "شرح أنواع الأساسات (شريطية، لبشة، أوتاد، منفصلة) — أيها يناسب تربة كل حي في جدة، التكاليف، وأخطاء قاتلة يجب تجنّبها.",
    image: "/images/service-binaa-villa-jeddah.avif",
    imageAlt: "أنواع الأساسات في جدة",
    date: "2025-12-12",
    readTime: "١١ دقيقة",
    category: "تقنية البناء",
    tier: "cluster",
  },
  {
    slug: "cost-overrun-prevention",
    title: `كيف تتجنب تجاوز ميزانية البناء؟`,
    h1: "كيف تتجنب تجاوز ميزانية البناء؟ ١٠ أسباب وحلول",
    description:
      "٧٣٪ من مشاريع جدة تتجاوز الميزانية ١٥-٥٠٪. اكتشف الأسباب الـ ١٠ وكيف تحمي ميزانيتك بقاعدة الـ ٢٠٪.",
    image: "/images/service-general-contractor-jeddah.avif",
    imageAlt: "تجنب تجاوز ميزانية البناء",
    date: "2025-12-05",
    readTime: "١٠ دقائق",
    category: "أسئلة شائعة",
    tier: "faq",
  },
  {
    slug: "best-time-build-jeddah",
    title: `أفضل وقت لبدء البناء في جدة`,
    h1: "أفضل وقت لبدء البناء في جدة — التوقيت يحدد التكلفة والجودة",
    description:
      "دليل التوقيت المثالي للبناء في جدة — كيف يؤثر الموسم على التكلفة (١٠-٢٠٪) والجودة. خطة سنوية كاملة لمشروعك.",
    image: "/images/service-binaa-villa-jeddah.avif",
    imageAlt: "أفضل وقت للبناء في جدة",
    date: "2025-11-25",
    readTime: "٩ دقائق",
    category: "أسئلة شائعة",
    tier: "faq",
  },
];
