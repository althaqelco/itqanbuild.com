import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, CheckCircle, Phone, ShieldCheck, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE, WHATSAPP_URL, SERVICES_LIST } from "@/lib/constants";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `معرض مشاريعنا في جدة — ${SITE.projectsCompleted}+ مشروع | ${SITE.name}`,
  description:
    `معرض مشاريع ${SITE.name} — ${SITE.projectsCompleted}+ مشروع منجز في جدة بضمان مكتوب. صور قبل/بعد بإحداثيات GPS. ترميم، بناء، شبوك، أسفلت، ملاحق، هناجر، تشطيبات. سجل تجاري ${SITE.crNumber}.`,
  alternates: { canonical: `${SITE.url}/projects` },
  openGraph: {
    title: `معرض المشاريع — ${SITE.name}`,
    description: `أكثر من ${SITE.projectsCompleted} مشروع منجز في جدة بضمان مكتوب.`,
    images: [{ url: "/images/og-image-default.png", width: 1200, height: 630 }],
  },
};

interface Project {
  slug: string;
  title: string;
  serviceType: string;
  serviceSlug: string;
  district: string;
  districtSlug: string;
  year: string;
  area: string;
  duration: string;
  image: string;
  imageAlt: string;
  hasBeforeAfter?: boolean;
  beforeImage?: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    slug: "rawdah-villa-tarmeem-2024",
    title: "ترميم شامل لفيلا ٤٨٠م² — حي الروضة",
    serviceType: "ترميم",
    serviceSlug: "tarmeem",
    district: "حي الروضة",
    districtSlug: "rawdah",
    year: "٢٠٢٤",
    area: "٤٨٠م²",
    duration: "٢.٥ شهر",
    image: "/images/project-rawdah-after.avif",
    imageAlt: "فيلا حي الروضة بعد الترميم الشامل",
    hasBeforeAfter: true,
    beforeImage: "/images/project-rawdah-before.avif",
    highlights: [
      "حقن إيبوكسي للبلاطات الخرسانية القديمة",
      "تجديد كامل للسباكة والكهرباء",
      "عزل مائي بولي يوريا حديث",
      "واجهة بروفايل + دهان جوتن",
    ],
  },
  {
    slug: "salamah-villa-binaa-2024",
    title: "بناء فيلا حديثة ٦٥٠م² — حي السلامة",
    serviceType: "بناء",
    serviceSlug: "binaa",
    district: "حي السلامة",
    districtSlug: "salamah",
    year: "٢٠٢٤",
    area: "٦٥٠م²",
    duration: "١٢ شهراً",
    image: "/images/project-salamah-villa.avif",
    imageAlt: "بناء فيلا جديدة في حي السلامة جدة",
    highlights: [
      "أساسات على صخر طبيعي + قاعدة عزل",
      "تسليم مفتاح كامل",
      "تشطيب فاخر بمرمر إيطالي",
      "نظام منزل ذكي مدمج",
    ],
  },
  {
    slug: "north-jeddah-asphalt-2024",
    title: "أسفلت موقف سيارات ١,٢٠٠م² — شمال جدة",
    serviceType: "أسفلت",
    serviceSlug: "asphalt",
    district: "شمال جدة",
    districtSlug: "north",
    year: "٢٠٢٤",
    area: "١,٢٠٠م²",
    duration: "٥ أيام",
    image: "/images/project-north-asphalt.avif",
    imageAlt: "تبليط موقف سيارات شمال جدة بأسفلت ساخن",
    highlights: [
      "أسفلت ساخن سماكة ٧سم",
      "بيس كورس مضغوط ٢٠سم",
      "تخطيط مواقف بدهان حراري",
      "تصريف أمطار مدمج",
    ],
  },
  {
    slug: "abhur-shboak-2024",
    title: "شبوك حديد مجلفن ٣٥٠م.ط — أبحر الشمالية",
    serviceType: "شبوك",
    serviceSlug: "shboak",
    district: "أبحر الشمالية",
    districtSlug: "abhur",
    year: "٢٠٢٤",
    area: "٣٥٠م.ط",
    duration: "٧ أيام",
    image: "/images/project-abhur-shboak.avif",
    imageAlt: "شبوك أبحر الشمالية فولاذ مقاوم للملوحة",
    highlights: [
      "فولاذ ٣١٦ مقاوم للملوحة البحرية",
      "قواعد خرسانية Type V",
      "ارتفاع ٢.٥م — أمان متكامل",
      "ضمان ٥ سنوات على المجلفن",
    ],
  },
  {
    slug: "salamah-molahaq-2024",
    title: "ملحق سطح ٨٠م² — حي السلامة",
    serviceType: "ملاحق",
    serviceSlug: "molahaq",
    district: "حي السلامة",
    districtSlug: "salamah",
    year: "٢٠٢٤",
    area: "٨٠م²",
    duration: "٦ أسابيع",
    image: "/images/project-molahaq-salamah.avif",
    imageAlt: "ملحق سطح حديث في حي السلامة جدة",
    highlights: [
      "ترخيص رسمي من أمانة جدة",
      "تقوية أعمدة الدور الأول",
      "عزل مائي وحراري كامل",
      "تشطيب فاخر + حمام مستقل",
    ],
  },
  {
    slug: "nazha-hanager-2024",
    title: "هنجر صناعي ٤٠٠م² — حي النزهة",
    serviceType: "هناجر",
    serviceSlug: "hanager",
    district: "حي النزهة",
    districtSlug: "nazha",
    year: "٢٠٢٤",
    area: "٤٠٠م²",
    duration: "١٢ يوماً",
    image: "/images/project-nazha-hanager.avif",
    imageAlt: "هنجر صناعي حي النزهة جدة",
    highlights: [
      "هيكل حديد مجلفن مستورد",
      "ارتفاع ٨م صافي",
      "عزل حراري بأسقف الساندويتش",
      "ضمان ١٠ سنوات على الهيكل",
    ],
  },
];

// ─── Projects FAQs ───
const PROJECT_FAQS = [
  { question: "هل صور المشاريع حقيقية وموثقة؟", answer: `نعم، جميع الصور التي نعرضها ملتقطة من طرفنا أثناء وبعد التنفيذ. المشاريع الميدانية موثقة بإحداثيات GPS ويمكنك زيارة أي مشروع من مشاريعنا المنجزة بعد التنسيق مع فريقنا.` },
  { question: "هل يمكنني زيارة مشروع مشابه لمشروعي؟", answer: "بالتأكيد، نرتّب زيارات ميدانية لعملائنا المحتملين لمعاينة مشاريع مماثلة في جدة. هذا يساعدك على تقييم جودة التنفيذ فعلياً قبل اتخاذ قرارك. تواصل معنا لحجز موعد الزيارة." },
  { question: "كم عدد المشاريع التي أنجزتموها فعلاً؟", answer: `أنجزنا أكثر من ${SITE.projectsCompleted} مشروع في جدة خلال ${SITE.yearsExperience}+ سنة في تخصصات البناء والترميم والشبوك والأسفلت والملاحق والهناجر والتشطيبات والهدم والمقاولات العامة. نعرض في معرضنا عيّنة مختارة تمثل تنوع خدماتنا.` },
  { question: "ما مدة الضمان على المشاريع المنفذة؟", answer: "نقدم ضمان مكتوب على جميع المشاريع: ١٠ سنوات على الهيكل الإنشائي، ٥ سنوات على العزل المائي والحراري، ٣ سنوات على التشطيبات والتمديدات. الضمان موثق في العقد مع شروط واضحة." },
  { question: "هل تنفذون مشاريع في جميع أحياء جدة؟", answer: "نعم، لدينا مشاريع منجزة في جميع أحياء جدة: الروضة، السلامة، النزهة، الصفا، الحمدانية، أبحر الشمالية، وشمال جدة. كل حي له خصائص هندسية مختلفة ونملك الخبرة للتعامل معها جميعاً." },
  { question: "هل يمكنني الاطلاع على صور قبل وبعد؟", answer: "نعم، نوثّق جميع مشاريع الترميم والتجديد بصور احترافية قبل وبعد التنفيذ. يمكنك مشاهدة بعضها في معرضنا أعلاه، وللمزيد تواصل معنا عبر واتساب وسنرسل لك ألبوم مشاريع مماثلة." },
];

function projectsPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE.url}/projects/#webpage`,
        url: `${SITE.url}/projects`,
        name: `معرض المشاريع — ${SITE.name}`,
        description: `معرض أكثر من ${SITE.projectsCompleted} مشروع مقاولات منجز في جدة بضمان مكتوب.`,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
        inLanguage: "ar",
      },
      {
        "@type": "ItemList",
        name: "مشاريع منجزة",
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            image: `${SITE.url}${p.image}`,
            dateCreated: p.year,
            locationCreated: { "@type": "Place", name: `${p.district}، جدة` },
            creator: { "@id": `${SITE.url}/#organization` },
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "مشاريعنا", item: `${SITE.url}/projects` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: PROJECT_FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsPageSchema()) }}
        />

        {/* HERO */}
        <section className="page-hero">
          <div className="container-wide px-4 md:px-6">
            <nav className="flex items-center gap-2 text-xs mb-4" style={{ color: "rgba(10,25,47,0.4)" }}>
              <Link href="/" className="hover:text-[var(--color-gold)]">الرئيسية</Link>
              <span>/</span>
              <span style={{ color: "var(--color-gold-dark)" }}>مشاريعنا</span>
            </nav>
            <span className="gold-accent mx-auto" />
            <h1 className="text-3xl md:text-4xl font-extrabold">معرض مشاريعنا في جدة — {SITE.projectsCompleted}+ مشروع منجز</h1>
            <p>صور موثقة بإحداثيات GPS — قبل وبعد — تحت إشراف المهندس أحمد الحربي</p>
          </div>
        </section>

        {/* NLP INTRO */}
        <section className="py-6">
          <div className="container-wide max-w-4xl px-4">
            <p className="text-sm leading-loose" style={{ color: "rgba(10,25,47,0.7)" }}>
              يعرض هذا المعرض عيّنة مختارة من مشاريع <strong>{SITE.name}</strong> المنجزة في أحياء جدة المختلفة. كل مشروع تم تنفيذه تحت <strong>إشراف هندسي مباشر</strong> مع التزام صارم بمعايير <strong>كود البناء السعودي</strong> ومواصفات <strong>أمانة جدة</strong>. نوثّق جميع مشاريعنا بصور احترافية وإحداثيات GPS لتتمكن من معاينة الجودة بنفسك قبل اتخاذ قرارك.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="py-10 bg-section-alt">
          <div className="container-wide max-w-4xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <StatCard value="٥٠٠+" label="مشروع منجز" />
              <StatCard value="١٥+" label="سنة خبرة" />
              <StatCard value="٧" label="أحياء نخدمها" />
              <StatCard value="٤.٩" label="تقييم العملاء" />
            </div>
          </div>
        </section>

        {/* PROJECTS GRID */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-12">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">مشاريع مختارة ٢٠٢٤</h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                ٦ مشاريع تمثّل تنوع خدماتنا في أحياء جدة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((p) => (
                <article key={p.slug} className="glass-card overflow-hidden group">
                  {/* Image — with optional before/after */}
                  <div className="relative h-72 overflow-hidden">
                    {p.hasBeforeAfter && p.beforeImage ? (
                      <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                        <div className="relative">
                          <Image
                            src={p.beforeImage}
                            alt={`${p.title} — قبل الترميم`}
                            fill
                            className="object-cover"
                            sizes="(max-width:768px) 50vw, 25vw"
                          />
                          <span
                            className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-md"
                            style={{
                              background: "rgba(0,0,0,0.6)",
                              color: "white",
                            }}
                          >
                            قبل
                          </span>
                        </div>
                        <div className="relative">
                          <Image
                            src={p.image}
                            alt={p.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width:768px) 50vw, 25vw"
                          />
                          <span
                            className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-md"
                            style={{
                              background: "var(--color-gold)",
                              color: "var(--color-navy-dark)",
                            }}
                          >
                            بعد
                          </span>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 50vw"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div
                      className="flex items-center gap-3 mb-3 flex-wrap text-xs"
                      style={{ color: "rgba(10,25,47,0.55)" }}
                    >
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {p.year}
                      </span>
                      <span>•</span>
                      <Link
                        href={`/jeddah/${p.districtSlug}`}
                        className="flex items-center gap-1 hover:text-[var(--color-gold-dark)]"
                      >
                        <MapPin className="w-3 h-3" />
                        {p.district}
                      </Link>
                      <span>•</span>
                      <span>{p.area}</span>
                      <span>•</span>
                      <span>{p.duration}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-3 leading-snug">{p.title}</h3>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-4">
                      {p.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs"
                          style={{ color: "rgba(10,25,47,0.65)" }}
                        >
                          <CheckCircle
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: "var(--color-gold)" }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Service Link */}
                    <Link
                      href={`/jeddah/${p.serviceSlug}`}
                      className="text-xs font-semibold inline-flex items-center gap-1"
                      style={{ color: "var(--color-gold-dark)" }}
                    >
                      شاهد خدمة {p.serviceType}
                      <ArrowLeft className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl font-extrabold mb-3">تصفّح المشاريع حسب التخصص</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {SERVICES_LIST.slice(0, 10).map((s) => (
                <Link
                  key={s.slug}
                  href={`/jeddah/${s.slug}`}
                  className="block py-4 px-4 text-center rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{
                    background: "white",
                    border: "1px solid rgba(10,25,47,0.06)",
                    color: "var(--color-navy)",
                  }}
                >
                  {s.h1.split("—")[0].trim()}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* E-E-A-T */}
        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <Award className="w-5 h-5" style={{ color: "var(--color-gold)" }} />
                <h2 className="text-lg font-bold">اعتماداتنا الرسمية</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs" style={{ color: "rgba(10,25,47,0.7)" }}>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" style={{ color: "var(--color-gold)" }} /><span>سجل تجاري: {SITE.crNumber}</span></div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" style={{ color: "var(--color-gold)" }} /><span>الرقم الضريبي: {SITE.vatNumber}</span></div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" style={{ color: "var(--color-gold)" }} /><span>مسجّل في منصة بلدي ومقاول</span></div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" style={{ color: "var(--color-gold)" }} /><span>ضمان مكتوب حتى ١٠ سنوات</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl font-extrabold mb-3">أسئلة شائعة عن مشاريعنا</h2>
            </div>
            <div className="space-y-3">
              {PROJECT_FAQS.map((faq, i) => (
                <details key={i} className="glass-card group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="text-sm font-bold pe-4">{faq.question}</span>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-open:rotate-45" style={{ background: "rgba(212,175,55,0.1)", color: "var(--color-gold)" }}>+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(10,25,47,0.65)" }}>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 text-center" style={{ background: "var(--color-navy)" }}>
          <div className="container-wide max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4" style={{ color: "var(--color-pearl)" }}>
              مشروعك القادم — هل تنضم لقائمة عملائنا؟
            </h2>
            <p className="mb-6 text-sm" style={{ color: "rgba(248,246,240,0.5)" }}>
              معاينة مجانية + دراسة الموقع + عرض سعر مكتوب خلال ٢٤ ساعة
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                ابدأ مشروعك <ArrowLeft className="w-4 h-4" />
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

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        className="text-3xl md:text-4xl font-extrabold mb-1"
        style={{ color: "var(--color-gold-dark)" }}
      >
        {value}
      </div>
      <div className="text-xs" style={{ color: "rgba(10,25,47,0.6)" }}>
        {label}
      </div>
    </div>
  );
}
