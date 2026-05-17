import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, CheckCircle, MapPin, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AITLDRBox from "@/components/AITLDRBox";
import CostCalculator from "@/components/CostCalculator";
import DistrictPolygonMap from "@/components/DistrictPolygonMap";
import {
  SITE,
  SERVICES,
  SERVICES_LIST,
  DISTRICTS,
  DISTRICTS_LIST,
  WHATSAPP_URL,
  type ServiceKey,
} from "@/lib/constants";
import { generateServiceGraph, generateDistrictGraph } from "@/lib/schema";
import { DISTRICT_CONTENT } from "@/lib/district-content";

export const revalidate = 3600;

// ─── Static Params for ISR — Services + Districts ───
export function generateStaticParams() {
  return [
    ...SERVICES_LIST.map((s) => ({ slug: s.slug })),
    ...DISTRICTS_LIST.map((d) => ({ slug: d.slug })),
  ];
}

// ─── Service-specific content ───
const SERVICE_CONTENT: Record<
  string,
  {
    intro: string;
    scopes: { title: string; desc: string }[];
    faqs: { question: string; answer: string }[];
    relatedKeys: ServiceKey[];
    projectImage?: string;
  }
> = {
  tarmeem: {
    intro:
      "ترميم شامل للمنازل والفلل والشقق في جدة — من إصلاح الشروخ البسيطة إلى التجديد الكامل بمعايير فندقية. ضمان ٣ سنوات مكتوبة.",
    scopes: [
      { title: "ترميم هيكلي", desc: "معالجة شروخ، تقوية أعمدة، إصلاح أسقف وأساسات" },
      { title: "ترميم داخلي", desc: "سيراميك، مطابخ، حمامات، كهرباء وسباكة" },
      { title: "ترميم خارجي", desc: "واجهات، عزل مائي وحراري، دهانات خارجية" },
      { title: "ترميم جزئي", desc: "غرفة واحدة أو حمام — حلول مرنة حسب الميزانية" },
    ],
    faqs: [
      {
        question: "كم تكلفة ترميم منزل في جدة؟",
        answer:
          "تتراوح بين ١٥٠ ريال/م² للأعمال البسيطة و١,٠٠٠+ ريال/م² للترميم الشامل الفاخر.",
      },
      {
        question: "كم يستغرق ترميم فيلا؟",
        answer: "البسيط أسبوع–أسبوعين، الشامل شهر–٣ أشهر حسب المساحة.",
      },
      {
        question: "هل يحتاج الترميم ترخيص؟",
        answer:
          "الأعمال الداخلية البسيطة لا. الأعمال الهيكلية تحتاج ترخيص من أمانة جدة عبر نظام ابني.",
      },
    ],
    relatedKeys: ["tashteebat", "molahaq", "binaa"],
    projectImage: "/images/project-rawdah-after.avif",
  },
  shboak: {
    intro:
      "تركيب شبوك وأسوار حديد وألمنيوم لجميع الاستخدامات — أراضي، مزارع، مواقع إنشائية. ضمان ٥ سنوات على المجلفنة.",
    scopes: [
      { title: "شبوك حديد مجلفن", desc: "شبك ملحوم ومجدول مقاوم للصدأ — للأراضي والمزارع" },
      { title: "شبوك ألمنيوم", desc: "خفيفة ومقاومة للتآكل — مثالية للمناطق الساحلية" },
      { title: "شبوك أمنية", desc: "شبوك مقواة بأسلاك شائكة — للمواقع الصناعية" },
      { title: "أسوار بلوك + شبك", desc: "قاعدة خرسانية مع شبوك علوية — الحل الأكثر شيوعاً" },
    ],
    faqs: [
      {
        question: "كم سعر متر الشبوك في جدة؟",
        answer:
          "يبدأ من ٢٥ ريال/م.ط للشبك المجدول العادي ويصل إلى ٥٠٠ ريال/م.ط للأمني المقوى.",
      },
      {
        question: "ما أفضل نوع شبك للأراضي؟",
        answer:
          "الشبك المجلفن الملحوم هو الأفضل — مقاوم للصدأ وسهل التركيب بضمان ٥ سنوات.",
      },
    ],
    relatedKeys: ["asphalt", "hadm", "general"],
    projectImage: "/images/project-abhur-shboak.avif",
  },
  asphalt: {
    intro:
      "تبليط طرق ومواقف سيارات وساحات بأسفلت ساخن وبارد — بمعايير الطرق السعودية. ضمان سنتين.",
    scopes: [
      { title: "أسفلت ساخن", desc: "الخيار المعياري للطرق والمواقف الكبيرة — عمر افتراضي طويل" },
      { title: "أسفلت بارد", desc: "حل سريع للرقع والإصلاحات — جاهز للاستخدام فوراً" },
      { title: "تبليط مواقف", desc: "تخطيط وتبليط مواقف سيارات مع علامات أرضية" },
      { title: "ساحات صناعية", desc: "تبليط ساحات للشاحنات والمعدات الثقيلة" },
    ],
    faqs: [
      {
        question: "كم سعر متر الأسفلت في جدة؟",
        answer: "يتراوح بين ٣٥ ريال/م² للبارد و١٢٠ ريال/م² للساخن مع الأساسات.",
      },
      {
        question: "كم يستغرق تبليط موقف سيارات؟",
        answer: "موقف صغير (٢٠٠م²) يوم واحد، المواقف الكبيرة ٢–٣ أيام.",
      },
    ],
    relatedKeys: ["shboak", "hadm", "general"],
    projectImage: "/images/project-north-asphalt.avif",
  },
  binaa: {
    intro:
      "بناء فلل وعمارات ومستودعات من الأساسات حتى التسليم — تسليم مفتاح بالمواد أو عظم. ضمان ١٠ سنوات هيكلي.",
    scopes: [
      { title: "بناء فلل سكنية", desc: "تصميم وتنفيذ فلل من الأساسات إلى التشطيب الكامل" },
      { title: "بناء عمارات", desc: "عمارات سكنية وتجارية متعددة الأدوار" },
      { title: "عظم بالمواد", desc: "هيكل إنشائي كامل — أساسات، أعمدة، أسقف، جدران" },
      { title: "تسليم مفتاح", desc: "جاهز للسكن — كهرباء، سباكة، تشطيبات، دهان" },
    ],
    faqs: [
      {
        question: "كم تكلفة بناء فيلا في جدة بالمتر؟",
        answer:
          "تبدأ من ١,٠٠٠ ريال/م² عظم بالمواد وتصل إلى ٣,٠٠٠+ ريال/م² تسليم مفتاح VIP.",
      },
      {
        question: "ما الفرق بين عظم بالمواد وتسليم مفتاح؟",
        answer: "العظم يشمل الهيكل فقط. تسليم المفتاح يشمل كل شيء جاهز للسكن.",
      },
    ],
    relatedKeys: ["tashteebat", "molahaq", "tarmeem"],
    projectImage: "/images/project-salamah-villa.avif",
  },
  molahaq: {
    intro:
      "بناء ملاحق سطح وجانبية وغرف إضافية في جدة — مع مساعدة في استخراج التصاريح. ضمان ٥ سنوات.",
    scopes: [
      { title: "ملاحق سطح", desc: "غرف إضافية فوق السطح مع عزل مائي وحراري كامل" },
      { title: "ملاحق جانبية", desc: "توسعة المبنى الحالي بغرف ومجالس إضافية" },
      { title: "مجالس خارجية", desc: "بناء مجالس مستقلة بتشطيب فاخر" },
      { title: "غرف سائق/خادمة", desc: "ملاحق خدمية مستقلة بمدخل منفصل" },
    ],
    faqs: [
      {
        question: "هل يحتاج الملحق رخصة بناء؟",
        answer:
          "نعم، أي ملحق يحتاج رخصة من أمانة جدة عبر نظام ابني. نساعدك في استخراجها.",
      },
      {
        question: "كم تكلفة بناء ملحق سطح؟",
        answer: "تتراوح بين ٨٠٠ و١,٨٠٠ ريال/م² حسب مستوى التشطيب.",
      },
    ],
    relatedKeys: ["binaa", "tashteebat", "tarmeem"],
    projectImage: "/images/project-molahaq-salamah.avif",
  },
  general: {
    intro:
      "مقاول عام معتمد في جدة — إشراف هندسي وتنفيذ متكامل لجميع أنواع المشاريع الإنشائية.",
    scopes: [
      { title: "مقاولات شاملة", desc: "إدارة وتنفيذ المشاريع من البداية حتى التسليم" },
      { title: "إشراف هندسي", desc: "متابعة يومية لجودة التنفيذ والالتزام بالمواصفات" },
      { title: "تنفيذ متكامل", desc: "تنسيق جميع الحرف — كهرباء، سباكة، تكييف، دهان" },
      { title: "إدارة مشاريع", desc: "جدولة وميزانية ومتابعة — تقارير أسبوعية للعميل" },
    ],
    faqs: [
      {
        question: "ما هي مهام المقاول العام؟",
        answer:
          "المقاول العام يدير كل المشروع — يتعاقد مع المقاولين الفرعيين ويشرف على الجودة والجدول الزمني.",
      },
    ],
    relatedKeys: ["binaa", "tarmeem", "tashteebat"],
  },
  hadm: {
    intro:
      "هدم مباني وإزالة أسوار وردم ونقل مخلفات في جدة — بتصاريح رسمية وتأمين ضد الأضرار.",
    scopes: [
      { title: "هدم مباني كامل", desc: "إزالة مباني سكنية وتجارية بمعدات متخصصة" },
      { title: "هدم جزئي", desc: "إزالة جدران أو أجزاء محددة مع الحفاظ على الهيكل" },
      { title: "إزالة أسوار", desc: "إزالة أسوار قديمة وإعداد الموقع لأسوار جديدة" },
      { title: "نقل مخلفات", desc: "نقل وتخليص مخلفات البناء بشكل نظامي" },
    ],
    faqs: [
      {
        question: "هل يحتاج الهدم ترخيص؟",
        answer:
          "نعم، الهدم يحتاج تصريح من أمانة جدة + تقرير فني من مكتب هندسي. نتكفل بجميع الإجراءات.",
      },
    ],
    relatedKeys: ["binaa", "asphalt", "shboak"],
  },
  hanager: {
    intro:
      "إنشاء هناجر حديد ومستودعات صناعية في جدة — تصنيع وتركيب سريع مع ضمان ١٠ سنوات على الهيكل.",
    scopes: [
      { title: "هناجر صناعية", desc: "هياكل حديدية للمصانع والورش بمساحات كبيرة" },
      { title: "مستودعات تخزين", desc: "مستودعات مغلقة بعزل حراري للتخزين الآمن" },
      { title: "مظلات سيارات", desc: "مظلات حديدية للمواقف — أشكال ومقاسات متنوعة" },
      { title: "هناجر زراعية", desc: "هناجر للمزارع والدواجن بتهوية ملائمة" },
    ],
    faqs: [
      {
        question: "كم سعر متر الهنجر في جدة؟",
        answer: "يتراوح بين ٢٥٠ و٦٠٠ ريال/م² حسب المواصفات والعزل المطلوب.",
      },
      {
        question: "كم يستغرق بناء هنجر؟",
        answer: "من ٧ أيام للهناجر الصغيرة إلى ٢١ يوماً للمشاريع الكبيرة.",
      },
    ],
    relatedKeys: ["shboak", "asphalt", "general"],
    projectImage: "/images/project-nazha-hanager.avif",
  },
  tashteebat: {
    intro:
      "تشطيبات فلل وشقق بجودة فندقية — دهانات داخلية وخارجية، واجهات بروفايل، سيراميك فاخر. ضمان سنتين.",
    scopes: [
      { title: "تشطيب A (اقتصادي)", desc: "تشطيب أساسي — دهان، سيراميك عادي، كهرباء وسباكة" },
      { title: "تشطيب B (متوسط)", desc: "تشطيب متوسط — بورسلان، دهان جوتن، إضاءة LED" },
      { title: "تشطيب C (فاخر)", desc: "تشطيب فندقي — رخام، خشب طبيعي، جبس بورد مزخرف" },
      { title: "واجهات بروفايل", desc: "كلادينج ألمنيوم وزجاج — واجهات عصرية مميزة" },
    ],
    faqs: [
      {
        question: "كم سعر متر التشطيب في جدة؟",
        answer:
          "يبدأ من ٢٠٠ ريال/م² للاقتصادي ويصل إلى ١,٢٠٠+ ريال/م² للتشطيب الفندقي.",
      },
    ],
    relatedKeys: ["tarmeem", "binaa", "molahaq"],
  },
};

// ─── Metadata ───
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES[slug as ServiceKey];
  if (svc) {
    return {
      title: svc.title,
      description: svc.description,
      alternates: { canonical: `${SITE.url}/jeddah/${slug}` },
      openGraph: {
        title: svc.h1,
        description: svc.description,
        images: [{ url: svc.image, width: 1200, height: 630 }],
      },
    };
  }
  const dist = DISTRICTS[slug];
  if (dist) {
    return {
      title: `${dist.h1} — ${SITE.name}`,
      description: dist.description,
      alternates: { canonical: `${SITE.url}/jeddah/${slug}` },
      openGraph: {
        title: dist.h1,
        description: dist.description,
        images: [{ url: dist.image, width: 1200, height: 630 }],
      },
    };
  }
  return {};
}

// ─── Router Page ───
export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (SERVICES[slug as ServiceKey]) return <ServicePageView slug={slug} />;
  if (DISTRICTS[slug]) return <DistrictPageView slug={slug} />;
  notFound();
}

// ═══════════════════════════════════════════════════════════════════
// SERVICE PAGE
// ═══════════════════════════════════════════════════════════════════
function ServicePageView({ slug }: { slug: string }) {
  const svc = SERVICES[slug as ServiceKey]!;
  const content = SERVICE_CONTENT[slug];
  if (!content) notFound();

  const schema = generateServiceGraph(svc, content.faqs);
  const related = content.relatedKeys.map((k) => SERVICES[k]).filter(Boolean);

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* HERO */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "7rem", paddingBottom: "3.5rem" }}
        >
          <Image
            src={svc.image}
            alt={svc.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg, rgba(6,15,31,0.93) 0%, rgba(10,25,47,0.82) 100%)",
            }}
          />
          <div className="relative z-10 container-wide px-4 md:px-6">
            <nav
              className="flex items-center gap-2 text-xs mb-6"
              style={{ color: "rgba(248,246,240,0.5)" }}
            >
              <Link href="/" className="hover:text-[var(--color-gold)]">
                الرئيسية
              </Link>
              <span>/</span>
              <Link href="/jeddah" className="hover:text-[var(--color-gold)]">
                جدة
              </Link>
              <span>/</span>
              <span style={{ color: "var(--color-gold)" }}>
                {svc.h1.split("—")[0].trim()}
              </span>
            </nav>
            <div className="max-w-2xl">
              <h1
                className="text-2xl md:text-3xl font-extrabold mb-4 leading-snug"
                style={{ color: "var(--color-pearl)" }}
              >
                {svc.h1}
              </h1>
              <p
                className="text-sm mb-6 max-w-xl"
                style={{ color: "rgba(248,246,240,0.6)" }}
              >
                {content.intro}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  عرض سعر مجاني <ArrowLeft className="w-4 h-4" />
                </a>
                <a href={`tel:${SITE.phone}`} className="btn-outline">
                  <Phone className="w-4 h-4" />
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TL;DR */}
        <section className="container-wide px-4 md:px-6 -mt-8 relative z-20">
          <AITLDRBox
            title={svc.h1.split("—")[0].trim()}
            scope={svc.tldr.scope}
            priceRange={svc.tldr.priceRange}
            duration={svc.tldr.duration}
            warranty={svc.tldr.warranty}
          />
        </section>

        {/* SCOPE */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="gold-accent" />
                <h2 className="text-xl md:text-2xl font-extrabold mb-4">ماذا نقدم؟</h2>
                <div className="space-y-4">
                  {content.scopes.map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: "var(--color-gold)" }}
                      />
                      <div>
                        <span className="text-sm font-bold block">{s.title}</span>
                        <span className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                          {s.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {content.projectImage && (
                <div className="relative h-80 lg:h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={content.projectImage}
                    alt={`مشروع ${svc.h1.split("—")[0].trim()} منجز`}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl font-extrabold mb-3">احسب التكلفة</h2>
            </div>
            <CostCalculator />
          </div>
        </section>

        {/* FAQ */}
        {content.faqs.length > 0 && (
          <section className="section-padding">
            <div className="container-wide max-w-3xl">
              <div className="text-center mb-8">
                <span className="gold-accent mx-auto" />
                <h2 className="text-2xl font-extrabold mb-3">أسئلة شائعة</h2>
              </div>
              <div className="space-y-3">
                {content.faqs.map((faq, i) => (
                  <details key={i} className="glass-card group">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                      <span className="text-sm font-bold pe-4">{faq.question}</span>
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-open:rotate-45"
                        style={{
                          background: "rgba(212,175,55,0.1)",
                          color: "var(--color-gold)",
                        }}
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5">
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(10,25,47,0.65)" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RELATED */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl font-extrabold mb-3">خدمات ذات صلة</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((s) => (
                <Link
                  key={s.key}
                  href={`/jeddah/${s.slug}`}
                  className="glass-card overflow-hidden group hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold mb-1 group-hover:text-[var(--color-gold)] transition-colors">
                      {s.h1.split("—")[0].trim()}
                    </h3>
                    <span className="text-xs" style={{ color: "var(--color-gold-dark)" }}>
                      {s.tldr.priceRange}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DISTRICTS — INTERNAL LINK */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-xl font-extrabold mb-3">
                {svc.h1.split("—")[0].trim()} في أحياء جدة
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {DISTRICTS_LIST.map((d) => (
                <Link
                  key={d.slug}
                  href={`/jeddah/${d.slug}`}
                  className="block py-3 px-4 rounded-xl text-center text-xs font-semibold transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(212,175,55,0.06)",
                    border: "1px solid rgba(212,175,55,0.12)",
                    color: "var(--color-navy)",
                  }}
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="section-padding text-center"
          style={{ background: "var(--color-navy)" }}
        >
          <div className="container-wide max-w-2xl">
            <h2
              className="text-2xl font-extrabold mb-4"
              style={{ color: "var(--color-pearl)" }}
            >
              جاهز تبدأ؟
            </h2>
            <p className="mb-6 text-sm" style={{ color: "rgba(248,246,240,0.5)" }}>
              معاينة مجانية + عرض سعر تفصيلي خلال ٢٤ ساعة
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
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

// ═══════════════════════════════════════════════════════════════════
// DISTRICT PAGE (Hyper-Localized — 100% Unique Content)
// ═══════════════════════════════════════════════════════════════════
function DistrictPageView({ slug }: { slug: string }) {
  const dist = DISTRICTS[slug]!;
  const content = DISTRICT_CONTENT[slug];
  if (!content) notFound();

  const schema = generateDistrictGraph({
    name: dist.name,
    slug: dist.slug,
    geo: dist.geo,
  });

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* HERO */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "7rem", paddingBottom: "3.5rem" }}
        >
          <Image
            src={dist.image}
            alt={dist.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg, rgba(6,15,31,0.93) 0%, rgba(10,25,47,0.82) 100%)",
            }}
          />
          <div className="relative z-10 container-wide px-4 md:px-6">
            <nav
              className="flex items-center gap-2 text-xs mb-6"
              style={{ color: "rgba(248,246,240,0.5)" }}
            >
              <Link href="/" className="hover:text-[var(--color-gold)]">
                الرئيسية
              </Link>
              <span>/</span>
              <Link href="/jeddah" className="hover:text-[var(--color-gold)]">
                جدة
              </Link>
              <span>/</span>
              <span style={{ color: "var(--color-gold)" }}>{dist.name}</span>
            </nav>
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.2)",
                }}
              >
                <MapPin className="w-3.5 h-3.5" style={{ color: "var(--color-gold)" }} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--color-gold)" }}
                >
                  {dist.projectsCount}+ مشروع منجز
                </span>
              </div>
              <h1
                className="text-2xl md:text-3xl font-extrabold mb-4 leading-snug"
                style={{ color: "var(--color-pearl)" }}
              >
                {dist.h1}
              </h1>
              <p
                className="text-sm mb-6 max-w-xl"
                style={{ color: "rgba(248,246,240,0.6)" }}
              >
                {content.intro}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  عرض سعر مجاني <ArrowLeft className="w-4 h-4" />
                </a>
                <a href={`tel:${SITE.phone}`} className="btn-outline">
                  <Phone className="w-4 h-4" />
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TL;DR */}
        <section className="container-wide px-4 md:px-6 -mt-8 relative z-20">
          <AITLDRBox
            title={`مقاول ${dist.name}`}
            scope={`جميع خدمات المقاولات في ${dist.name}`}
            priceRange={content.priceAdjustment}
            duration="حسب المشروع"
            warranty="ضمان مكتوب ١٠ سنوات هيكلي + ٥ سنوات على الأعمال"
          />
        </section>

        {/* ENGINEERING NOTE (AI-Proof Content) */}
        <section className="section-padding">
          <div className="container-wide max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <span className="gold-accent" />
                <h2 className="text-xl md:text-2xl font-extrabold mb-4">
                  ملاحظات هندسية عن {dist.name}
                </h2>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "rgba(10,25,47,0.75)" }}
                >
                  {content.engineering}
                </p>
                <h3 className="text-base font-bold mb-3">الخلفية التاريخية</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(10,25,47,0.7)" }}
                >
                  {content.history}
                </p>
              </div>
              <DistrictPolygonMap
                districtName={dist.name}
                geo={dist.geo}
                projectsCount={dist.projectsCount}
              />
            </div>
          </div>
        </section>

        {/* CHALLENGES & SOLUTIONS */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                تحديات البناء في {dist.name}
              </h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                ما يجب معرفته قبل البدء — خبرتنا الميدانية في هذا الحي
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {content.challenges.map((c, i) => (
                <div key={i} className="glass-card p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(231,76,60,0.08)",
                        color: "var(--color-danger)",
                      }}
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                    <h3 className="text-base font-bold flex-1">{c.title}</h3>
                  </div>
                  <p className="text-sm" style={{ color: "rgba(10,25,47,0.65)" }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICE ADJUSTMENT */}
        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.02) 100%)",
                border: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              <span className="gold-accent mx-auto" />
              <h2 className="text-xl font-extrabold mb-3">
                تعديل التكلفة في {dist.name}
              </h2>
              <p
                className="text-sm max-w-2xl mx-auto"
                style={{ color: "rgba(10,25,47,0.7)" }}
              >
                {content.priceAdjustment}
              </p>
              <div className="mt-6 text-xs" style={{ color: "rgba(10,25,47,0.5)" }}>
                <strong>نوع التربة:</strong> {dist.soilNote}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES IN THIS DISTRICT */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                خدماتنا في {dist.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {content.scopes.map((scope, i) => {
                const svc = SERVICES[scope.serviceSlug as ServiceKey];
                if (!svc) return null;
                return (
                  <Link
                    key={i}
                    href={`/jeddah/${svc.slug}`}
                    className="glass-card overflow-hidden group hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={svc.image}
                        alt={svc.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold mb-1.5 group-hover:text-[var(--color-gold)] transition-colors">
                        {scope.service}
                      </h3>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(10,25,47,0.55)" }}
                      >
                        {scope.note}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl font-extrabold mb-3">احسب تكلفة مشروعك</h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                اختر «{dist.name}» في الحاسبة لتطبيق تعديلات السعر تلقائياً
              </p>
            </div>
            <CostCalculator />
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl font-extrabold mb-3">
                أسئلة شائعة عن المقاولات في {dist.name}
              </h2>
            </div>
            <div className="space-y-3">
              {content.faqs.map((faq, i) => (
                <details key={i} className="glass-card group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="text-sm font-bold pe-4">{faq.question}</span>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-open:rotate-45"
                      style={{
                        background: "rgba(212,175,55,0.1)",
                        color: "var(--color-gold)",
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(10,25,47,0.65)" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* OTHER DISTRICTS */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl font-extrabold mb-3">أحياء أخرى نخدمها</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {DISTRICTS_LIST.filter((d) => d.slug !== slug)
                .slice(0, 6)
                .map((d) => (
                  <Link
                    key={d.slug}
                    href={`/jeddah/${d.slug}`}
                    className="group relative h-32 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={d.image}
                      alt={d.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, 16vw"
                    />
                    <div
                      className="absolute inset-0 flex items-end p-3"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(10,25,47,0.9), transparent 60%)",
                      }}
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: "var(--color-pearl)" }}
                      >
                        {d.name}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="section-padding text-center"
          style={{ background: "var(--color-navy)" }}
        >
          <div className="container-wide max-w-2xl">
            <h2
              className="text-2xl md:text-3xl font-extrabold mb-4"
              style={{ color: "var(--color-pearl)" }}
            >
              مشروعك في {dist.name} يبدأ هنا
            </h2>
            <p className="mb-6 text-sm" style={{ color: "rgba(248,246,240,0.5)" }}>
              معاينة مجانية + جدول كميات + جدول زمني خلال ٢٤ ساعة
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
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
