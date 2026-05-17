import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowLeft, ShieldCheck, TrendingDown, FileText, Award, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CostCalculator from "@/components/CostCalculator";
import { SITE, SERVICES_LIST, WHATSAPP_URL } from "@/lib/constants";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `أسعار المقاولات في جدة ٢٠٢٦ — جدول شامل | ${SITE.name}`,
  description:
    `أسعار المقاولات في جدة ٢٠٢٦ — جدول شفاف لـ ٩ خدمات + حاسبة تكلفة تفاعلية + تعديلات لكل حي. سجل تجاري ${SITE.crNumber}. معاينة مجانية + عرض سعر مكتوب.`,
  alternates: { canonical: `${SITE.url}/prices` },
  openGraph: {
    title: `أسعار المقاولات في جدة ٢٠٢٦ | ${SITE.name}`,
    description:
      "جدول أسعار شفاف لجميع خدمات المقاولات في جدة + حاسبة تكلفة تفاعلية حسب الحي ومستوى التشطيب.",
    images: [{ url: "/images/og-image-default.png", width: 1200, height: 630 }],
  },
};

// ─── Detailed Price Tables (per service) ───
const PRICE_TABLES = [
  {
    serviceKey: "tarmeem",
    title: "أسعار الترميم في جدة",
    unit: "ريال/م²",
    rows: [
      { label: "ترميم بسيط (دهان + سيراميك جزئي)", min: 150, max: 300, duration: "١–٢ أسبوع" },
      { label: "ترميم متوسط (دهان + سيراميك + كهرباء)", min: 300, max: 600, duration: "٢–٤ أسابيع" },
      { label: "ترميم شامل (هيكلي + داخلي + خارجي)", min: 600, max: 1000, duration: "١–٣ أشهر" },
      { label: "ترميم فاخر (تشطيب فندقي)", min: 1000, max: 1800, duration: "٢–٤ أشهر" },
    ],
    note: "الأسعار تشمل المواد والعمالة. المباني القديمة في حي الروضة والسلامة تحتاج حقن إيبوكسي للبلاطات (+10-15% على التكلفة).",
  },
  {
    serviceKey: "binaa",
    title: "أسعار البناء في جدة",
    unit: "ريال/م²",
    rows: [
      { label: "عظم بالمواد (هيكل إنشائي فقط)", min: 1000, max: 1400, duration: "٤–٦ أشهر" },
      { label: "بناء متوسط (تشطيب أساسي)", min: 1400, max: 2000, duration: "٦–١٠ أشهر" },
      { label: "بناء فاخر (تشطيب كامل)", min: 2000, max: 3000, duration: "٨–١٢ شهراً" },
      { label: "تسليم مفتاح VIP", min: 3000, max: 5000, duration: "١٠–١٨ شهراً" },
    ],
    note: "في شمال جدة وأبحر: +5-7% لاستخدام خرسانة مقاومة للكبريتات (نوع V) والعزل الأسمنتي المزدوج بسبب الملوحة العالية.",
  },
  {
    serviceKey: "shboak",
    title: "أسعار الشبوك والأسوار في جدة",
    unit: "ريال/م.ط",
    rows: [
      { label: "شبك مجدول عادي (ارتفاع ١–٢م)", min: 25, max: 50, duration: "يوم/١٠٠م" },
      { label: "شبك لحامي مجلفن (ارتفاع ١–٣م)", min: 50, max: 100, duration: "يوم/٧٠م" },
      { label: "شبك ألمنيوم فاخر", min: 150, max: 300, duration: "يوم/٤٠م" },
      { label: "شبك أمني مقوى (٢–٤م)", min: 200, max: 500, duration: "يومان/٥٠م" },
    ],
    note: "السعر بالمتر الطولي يشمل الأعمدة والقواعد الخرسانية. الأسوار البلوك السفلية بسعر منفصل.",
  },
  {
    serviceKey: "asphalt",
    title: "أسعار الأسفلت في جدة",
    unit: "ريال/م²",
    rows: [
      { label: "أسفلت بارد (إصلاحات سريعة)", min: 35, max: 50, duration: "يوم" },
      { label: "أسفلت ساخن (مواقف صغيرة)", min: 50, max: 80, duration: "١–٢ يوم" },
      { label: "أسفلت ساخن (طرق ومواقف كبيرة)", min: 80, max: 120, duration: "٢–٤ أيام" },
      { label: "ساحات صناعية (شاحنات ثقيلة)", min: 120, max: 180, duration: "٣–٧ أيام" },
    ],
    note: "السعر يشمل البيس كورس والقاعدة الإسمنتية. لا يشمل الحفر العميق إن لزم.",
  },
  {
    serviceKey: "molahaq",
    title: "أسعار الملاحق في جدة",
    unit: "ريال/م²",
    rows: [
      { label: "ملحق سطح (غرفة + حمام)", min: 800, max: 1200, duration: "٣–٥ أسابيع" },
      { label: "ملحق جانبي متوسط", min: 1200, max: 1600, duration: "٥–٧ أسابيع" },
      { label: "مجلس خارجي فاخر", min: 1600, max: 2200, duration: "٦–٨ أسابيع" },
    ],
    note: "السعر يشمل المساعدة في استخراج التصاريح من أمانة جدة عبر نظام «ابني».",
  },
  {
    serviceKey: "hanager",
    title: "أسعار الهناجر في جدة",
    unit: "ريال/م²",
    rows: [
      { label: "هنجر صغير (حتى ٢٠٠م²)", min: 250, max: 350, duration: "٧–١٠ أيام" },
      { label: "هنجر متوسط (٢٠٠–٥٠٠م²)", min: 350, max: 450, duration: "١٠–١٥ يوم" },
      { label: "مستودع مغلق بعزل حراري", min: 450, max: 600, duration: "١٥–٢١ يوم" },
    ],
    note: "السعر بحديد مجلفن مستورد بضمان ١٠ سنوات على الهيكل. الإنارة الصناعية بسعر منفصل.",
  },
  {
    serviceKey: "tashteebat",
    title: "أسعار التشطيبات في جدة",
    unit: "ريال/م²",
    rows: [
      { label: "تشطيب A — اقتصادي", min: 200, max: 350, duration: "٢–٣ أسابيع" },
      { label: "تشطيب B — متوسط", min: 350, max: 600, duration: "٤–٦ أسابيع" },
      { label: "تشطيب C — فاخر", min: 600, max: 1000, duration: "٦–١٠ أسابيع" },
      { label: "تشطيب فندقي (رخام + خشب طبيعي)", min: 1000, max: 1500, duration: "٨–١٦ أسبوعاً" },
    ],
    note: "أسعار التشطيبات لا تشمل الأثاث. الواجهات (بروفايل/كلادينج) تُحسب بـ م² منفصل.",
  },
  {
    serviceKey: "hadm",
    title: "أسعار الهدم في جدة",
    unit: "ريال/م²",
    rows: [
      { label: "هدم جزئي (جدار/غرفة)", min: 15, max: 25, duration: "١–٢ يوم" },
      { label: "هدم منزل دور واحد", min: 25, max: 40, duration: "٢–٤ أيام" },
      { label: "هدم فيلا متعددة الأدوار", min: 40, max: 60, duration: "٤–٧ أيام" },
    ],
    note: "السعر يشمل ترحيل المخلفات + التصاريح. لا يشمل التقرير الهندسي للأبنية الحساسة.",
  },
];

// ─── District Cost Modifiers ───
const DISTRICT_MODIFIERS_DISPLAY = [
  { name: "حي الروضة", modifier: "0%", note: "تربة مستقرة — لا تعديلات" },
  { name: "حي السلامة", modifier: "0%", note: "تربة صخرية — حفر أعمق لكن أساسات أقوى" },
  { name: "حي النزهة", modifier: "0%", note: "منطقة مختلطة — حسب فحص التربة" },
  { name: "حي الصفا", modifier: "0%", note: "تربة رملية متوسطة" },
  { name: "حي الحمدانية", modifier: "+2%", note: "بعض المناطق قرب الأودية تحتاج أساسات أعمق" },
  { name: "شمال جدة", modifier: "+5%", note: "ملوحة عالية — خرسانة مقاومة للكبريتات" },
  { name: "أبحر الشمالية", modifier: "+7%", note: "بيئة ساحلية قاسية — عزل أسمنتي مزدوج" },
];

// ─── FAQs (Schema) ───
const PRICE_FAQS = [
  {
    question: "هل الأسعار في الجدول شاملة المواد والعمالة؟",
    answer:
      "نعم، جميع الأسعار المعروضة تشمل المواد والعمالة بالكامل. الاستثناء الوحيد هو التصاريح الحكومية والاستشارات الهندسية الخارجية، والتي تُذكر صراحةً عند الاتفاق.",
  },
  {
    question: "هل أسعار جدة تختلف عن باقي المدن؟",
    answer:
      "نعم — أسعار جدة أعلى من الرياض بنحو 8-12% بسبب تكاليف الشحن من ميناء جدة الإسلامي وتكلفة العمالة الموسمية. لكن أرخص من المدن الساحلية الأخرى كالخبر.",
  },
  {
    question: "لماذا أسعار أبحر وشمال جدة أعلى؟",
    answer:
      "بسبب الملوحة العالية والمياه الجوفية السطحية، نستخدم حصرياً خرسانة مقاومة للكبريتات (نوع V) وعوازل أسمنتية مزدوجة الطبقة. هذا يضمن عمراً إنشائياً 50+ سنة لكنه يزيد التكلفة 5-7%.",
  },
  {
    question: "هل يمكن تقسيط المبلغ؟",
    answer:
      "نعم، نقدم خطط دفع مرحلية مرتبطة بإنجاز المشروع: 30% عند التوقيع، 40% عند 50% من الإنجاز، 20% عند 90%، و10% بعد التسليم النهائي والاستلام.",
  },
  {
    question: "كيف أحصل على عرض سعر دقيق؟",
    answer:
      "تواصل معنا عبر واتساب أو اتصل بنا لحجز معاينة مجانية. خلال 24 ساعة من المعاينة الميدانية، نرسل لك عرضاً تفصيلياً يشمل: قائمة المواد، الكميات، السعر النهائي، والجدول الزمني.",
  },
  {
    question: "هل الأسعار قابلة للتفاوض؟",
    answer:
      "هامش التفاوض موجود في المشاريع الكبيرة (200م²+) وخاصةً عند الدفع النقدي مقدماً، ويصل إلى 5-8%. أما الأسعار المعلنة فهي تنافسية فعلاً ومحسوبة على أساس تكلفة فعلية + هامش معقول.",
  },
  {
    question: "هل تشمل الأسعار استخراج التراخيص؟",
    answer: "الأسعار المعروضة لا تشمل الرسوم الحكومية (رخصة البناء عبر نظام ابني، تصاريح الترميم من بلدي). لكننا نتولى كافة إجراءات الترخيص نيابةً عنك — الرسوم فقط تُحسب بشكل منفصل وتُذكر صراحةً في العقد.",
  },
  {
    question: "كيف تُحسب أسعار التشطيبات — بالمتر أم بالغرفة؟",
    answer: "جميع أسعار التشطيبات تُحسب بالمتر المربع (ريال/م²) وتشمل المواد والعمالة. سعر التشطيب يعتمد على المستوى المطلوب: اقتصادي (200-350 ريال/م²)، متوسط (350-600)، فاخر (600-1000)، أو فندقي (1000-1500). الأثاث والواجهات الخارجية بتكلفة منفصلة.",
  },
];

// ─── Schema ───
function pricesPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/prices/#webpage`,
        url: `${SITE.url}/prices`,
        name: `أسعار المقاولات في جدة ٢٠٢٦ — ${SITE.name}`,
        description: "جدول شامل لأسعار جميع خدمات المقاولات في جدة + حاسبة تكلفة تفاعلية + تعديلات السعر حسب الحي.",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
        inLanguage: "ar",
      },
      {
        "@type": "ItemList",
        name: "أسعار خدمات المقاولات في جدة",
        numberOfItems: PRICE_TABLES.length,
        itemListElement: PRICE_TABLES.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Offer",
            name: t.title,
            priceCurrency: "SAR",
            priceSpecification: { "@type": "PriceSpecification", minPrice: t.rows[0].min, maxPrice: t.rows[t.rows.length - 1].max, priceCurrency: "SAR", unitText: t.unit },
            offeredBy: { "@id": `${SITE.url}/#organization` },
            areaServed: { "@type": "City", name: "جدة" },
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "الأسعار", item: `${SITE.url}/prices` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: PRICE_FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

export default function PricesPage() {
  const schema = pricesPageSchema();

  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        {/* HERO */}
        <section className="page-hero">
          <div className="container-wide px-4 md:px-6">
            <nav className="flex items-center gap-2 text-xs mb-4" style={{ color: "rgba(10,25,47,0.4)" }}>
              <Link href="/" className="hover:text-[var(--color-gold)]">الرئيسية</Link>
              <span>/</span>
              <span style={{ color: "var(--color-gold-dark)" }}>الأسعار</span>
            </nav>
            <span className="gold-accent mx-auto" />
            <h1 className="text-3xl md:text-4xl font-extrabold">أسعار المقاولات في جدة ٢٠٢٦</h1>
            <p>جدول شفاف لجميع الخدمات + حاسبة تفاعلية حسب الحي والتشطيب</p>
          </div>
        </section>

        {/* YMYL DISCLAIMER + E-E-A-T */}
        <section className="py-4">
          <div className="container-wide max-w-4xl px-4">
            <p className="text-xs leading-relaxed text-center" style={{ color: "rgba(10,25,47,0.5)" }}>
              ⚠️ الأسعار المعروضة تقريبية وتعتمد على المعاينة الميدانية. المعاينة مجانية وعرض السعر النهائي مكتوب ومفصّل. سجل تجاري {SITE.crNumber} · الرقم الضريبي {SITE.vatNumber}.
            </p>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="py-8 bg-section-alt">
          <div className="container-wide max-w-4xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <TrustItem icon={<ShieldCheck className="w-5 h-5" />} title="شفافية كاملة" desc="لا رسوم خفية" />
              <TrustItem icon={<TrendingDown className="w-5 h-5" />} title="أسعار تنافسية" desc="مقارنة بسوق جدة" />
              <TrustItem icon={<FileText className="w-5 h-5" />} title="عقد مكتوب" desc="بنود واضحة + ضمان" />
            </div>
          </div>
        </section>

        {/* INTERACTIVE CALCULATOR */}
        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">حاسبة التكلفة التفاعلية</h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                اختر الخدمة، المساحة، مستوى التشطيب، والحي — وستحصل على تقدير فوري
              </p>
            </div>
            <CostCalculator />
          </div>
        </section>

        {/* PRICE TABLES — Per Service */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-12">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">جداول الأسعار التفصيلية</h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                ٨ خدمات — أسعار شفافة بريال سعودي
              </p>
            </div>

            <div className="space-y-10">
              {PRICE_TABLES.map((table) => {
                const service = SERVICES_LIST.find((s) => s.key === table.serviceKey);
                return (
                  <div key={table.serviceKey} className="glass-card overflow-hidden">
                    <div
                      className="px-6 py-5 flex items-center justify-between"
                      style={{
                        background: "rgba(10,25,47,0.03)",
                        borderBottom: "1px solid rgba(212,175,55,0.12)",
                      }}
                    >
                      <h3 className="text-lg font-bold">{table.title}</h3>
                      {service && (
                        <Link
                          href={`/jeddah/${service.slug}`}
                          className="text-xs font-semibold flex items-center gap-1"
                          style={{ color: "var(--color-gold-dark)" }}
                        >
                          تفاصيل الخدمة <ArrowLeft className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr style={{ background: "rgba(10,25,47,0.02)" }}>
                            <th className="text-start p-4 font-bold">النوع</th>
                            <th className="text-center p-4 font-bold whitespace-nowrap">السعر ({table.unit})</th>
                            <th className="text-center p-4 font-bold whitespace-nowrap">المدة</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, i) => (
                            <tr
                              key={i}
                              style={{ borderTop: "1px solid rgba(10,25,47,0.04)" }}
                            >
                              <td className="p-4">{row.label}</td>
                              <td className="text-center p-4 font-bold whitespace-nowrap" style={{ color: "var(--color-gold-dark)" }}>
                                {row.min.toLocaleString("ar-SA")} – {row.max.toLocaleString("ar-SA")}
                              </td>
                              <td className="text-center p-4 text-xs whitespace-nowrap" style={{ color: "rgba(10,25,47,0.55)" }}>
                                {row.duration}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="px-6 py-4 text-xs" style={{ background: "rgba(212,175,55,0.04)", color: "rgba(10,25,47,0.65)" }}>
                      <strong style={{ color: "var(--color-gold-dark)" }}>ملاحظة هندسية:</strong> {table.note}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DISTRICT MODIFIERS */}
        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">تعديلات الأسعار حسب الحي</h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                خصائص التربة والبيئة في كل حي تؤثر على التكلفة النهائية
              </p>
            </div>

            <div className="glass-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(10,25,47,0.03)" }}>
                    <th className="text-start p-4 font-bold">الحي</th>
                    <th className="text-center p-4 font-bold whitespace-nowrap">التعديل</th>
                    <th className="text-start p-4 font-bold">السبب الهندسي</th>
                  </tr>
                </thead>
                <tbody>
                  {DISTRICT_MODIFIERS_DISPLAY.map((d, i) => (
                    <tr key={i} style={{ borderTop: "1px solid rgba(10,25,47,0.04)" }}>
                      <td className="p-4 font-semibold">{d.name}</td>
                      <td
                        className="text-center p-4 font-bold whitespace-nowrap"
                        style={{
                          color: d.modifier === "0%" ? "rgba(10,25,47,0.5)" : "var(--color-gold-dark)",
                        }}
                      >
                        {d.modifier}
                      </td>
                      <td className="p-4 text-xs" style={{ color: "rgba(10,25,47,0.6)" }}>
                        {d.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">أسئلة شائعة عن الأسعار</h2>
            </div>
            <div className="space-y-3">
              {PRICE_FAQS.map((faq, i) => (
                <details key={i} className="glass-card group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="text-sm font-bold pe-4">{faq.question}</span>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-open:rotate-45"
                      style={{ background: "rgba(212,175,55,0.1)", color: "var(--color-gold)" }}
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(10,25,47,0.65)" }}>
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding text-center" style={{ background: "var(--color-navy)" }}>
          <div className="container-wide max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4" style={{ color: "var(--color-pearl)" }}>
              عرض سعر دقيق خلال ٢٤ ساعة
            </h2>
            <p className="mb-6 text-sm" style={{ color: "rgba(248,246,240,0.5)" }}>
              معاينة مجانية + جدول كميات + جدول زمني — كل ذلك مكتوب
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                واتساب — عرض سعر <ArrowLeft className="w-4 h-4" />
              </a>
              <a href={`tel:${SITE.phone}`} className="btn-outline">
                <Phone className="w-4 h-4" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 justify-center">
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(212,175,55,0.1)", color: "var(--color-gold-dark)" }}
      >
        {icon}
      </span>
      <div className="text-start">
        <span className="text-sm font-bold block">{title}</span>
        <span className="text-xs" style={{ color: "rgba(10,25,47,0.5)" }}>
          {desc}
        </span>
      </div>
    </div>
  );
}
