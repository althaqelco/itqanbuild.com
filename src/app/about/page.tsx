import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle,
  Award,
  Shield,
  Users,
  MapPin,
  Building2,
  Sparkles,
  GraduationCap,
  Briefcase,
  Hammer,
  Calendar,
  ArrowLeft,
  Phone,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { StatCard, SpecialtyTag, CredentialCard, ValueCard } from "@/components/AboutCards";
import { SITE, WHATSAPP_URL, SERVICES_LIST, DISTRICTS_LIST } from "@/lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `من نحن — ${SITE.name} | مقاول جدة المعتمد منذ ${SITE.foundedYear}`,
  description: `تعرّف على ${SITE.name} — مقاول جدة المعتمد منذ ${SITE.foundedYear}. ${SITE.projectsCompleted}+ مشروع منجز، فريق هندسي بقيادة م. أحمد الحربي، ضمان مكتوب ١٠ سنوات.`,
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: `من نحن — ${SITE.name}`,
    description: `مقاول جدة المعتمد — ${SITE.yearsExperience} سنة خبرة و${SITE.projectsCompleted}+ مشروع منجز في جميع أحياء جدة.`,
    images: [{ url: "/images/team-main-contractor-jeddah.avif", width: 1200, height: 630 }],
  },
};

// ─── About FAQs ───
const ABOUT_FAQS = [
  { question: "من هو صاحب شركة إتقان للمقاولات؟", answer: `${SITE.name} يديرها المهندس أحمد الحربي — خريج جامعة الملك عبدالعزيز تخصص هندسة مدنية، مع خبرة ${SITE.yearsExperience}+ سنة في سوق المقاولات بجدة. الشركة مسجلة رسمياً بسجل تجاري ${SITE.crNumber}.` },
  { question: "كم عدد موظفي الشركة؟", answer: "يعمل في الشركة أكثر من ٥٠ موظفاً دائماً: مهندسون مدنيون، فنيون متخصصون، وعمال مهرة. لا نعتمد على العمالة المؤقتة — جميع فرقنا موظفون دائمون بعقود رسمية." },
  { question: "ما هي تخصصات الشركة؟", answer: "نتخصص في ٩ خدمات: بناء فلل وعمارات، ترميم وتجديد، شبوك أراضي، أسفلت وتبليط، ملاحق سطح، هناجر ومستودعات، تشطيبات داخلية وخارجية، هدم وإزالة، ومقاولات عامة." },
  { question: "هل الشركة مرخصة ومسجلة رسمياً؟", answer: `نعم — سجل تجاري ساري ${SITE.crNumber}، رقم ضريبي ${SITE.vatNumber}، مسجلون في منصة بلدي ومنصة مقاول، وعضو الغرفة التجارية الصناعية بجدة.` },
  { question: "ما مناطق خدمة الشركة؟", answer: "نخدم جميع أحياء جدة: الروضة، السلامة، النزهة، الصفا، الحمدانية، أبحر الشمالية، شمال جدة، وأي حي آخر. لدينا فرق موزعة جغرافياً لتغطية المدينة بالكامل." },
  { question: "كيف يمكنني التواصل مع الشركة؟", answer: `تواصل معنا عبر واتساب أو اتصل على ${SITE.phoneDisplay}. نرد على الرسائل خلال ١٥ دقيقة ونقدم معاينة مجانية + عرض سعر مكتوب خلال ٢٤ ساعة.` },
];

// ─── About Page Schema ───
function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE.url}/about/#aboutpage`,
        url: `${SITE.url}/about`,
        name: `من نحن — ${SITE.name}`,
        description: `صفحة التعريف بـ${SITE.name} — مقاول جدة المعتمد.`,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
        mainEntity: { "@id": `${SITE.url}/#engineer` },
        inLanguage: "ar",
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}/#engineer-full`,
        name: "المهندس أحمد الحربي",
        givenName: "أحمد",
        familyName: "الحربي",
        honorificPrefix: "م.",
        jobTitle: "مدير المشاريع ورئيس القسم الفني",
        worksFor: { "@id": `${SITE.url}/#organization` },
        alumniOf: { "@type": "EducationalOrganization", name: "جامعة الملك عبدالعزيز", sameAs: "https://www.kau.edu.sa" },
        knowsAbout: ["الهندسة المدنية", "مقاولات البناء", "ترميم المباني", "الكود السعودي للبناء", "إدارة المشاريع الإنشائية"],
        url: `${SITE.url}/about`,
        image: `${SITE.url}/images/engineer-profile-photo.avif`,
        hasOccupation: { "@type": "Occupation", name: "مهندس مدني", occupationLocation: { "@type": "City", name: "جدة" } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "من نحن", item: `${SITE.url}/about` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: ABOUT_FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

// ─── Timeline Milestones ───
const MILESTONES = [
  { year: SITE.foundedYear, title: "تأسيس الشركة", desc: "بدأنا في حي الروضة بـ ٣ موظفين ومشاريع ترميم صغيرة." },
  { year: SITE.foundedYear + 3, title: "أول مشروع بناء كبير", desc: "إنجاز فيلا ٦٠٠م² في حي السلامة — نقطة التحول." },
  { year: SITE.foundedYear + 6, title: "التوسع لشمال جدة", desc: "افتتاح فرع لخدمة أحياء أبحر وشمال جدة الساحلية." },
  { year: SITE.foundedYear + 9, title: "تسجيل في منصة مقاول", desc: "حصلنا على التصنيف المهني من الهيئة السعودية للمقاولين." },
  { year: SITE.foundedYear + 12, title: "أكثر من ٣٠٠ مشروع", desc: "تجاوزنا حاجز ٣٠٠ مشروع منجز بمعدل نمو ٢٥٪ سنوياً." },
  { year: 2026, title: "اليوم — رواد المقاولات في جدة", desc: `${SITE.projectsCompleted}+ مشروع منجز، فريق ٥٠+ موظف، ضمان ١٠ سنوات.` },
];

// ─── Specialized Teams ───
const TEAMS = [
  {
    icon: <Building2 className="w-6 h-6" />,
    name: "فريق البناء",
    count: "١٨ مهندس وعامل",
    desc: "متخصصون في بناء الفلل والعمارات من الأساسات حتى التسليم",
  },
  {
    icon: <Hammer className="w-6 h-6" />,
    name: "فريق الترميم",
    count: "١٢ متخصص",
    desc: "خبراء في تجديد المباني القديمة وتدعيم الهياكل الإنشائية",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    name: "فريق التشطيبات",
    count: "١٥ حرفي",
    desc: "نجارون، دهانون، سيراميك، كهرباء، وسباكة بخبرة ١٠+ سنوات",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    name: "فريق الإشراف",
    count: "٥ مهندسين",
    desc: "إشراف هندسي يومي + تقارير أسبوعية مصوّرة للعملاء",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema()) }}
        />

        {/* HERO */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "7rem", paddingBottom: "3.5rem" }}
        >
          <Image
            src="/images/team-main-contractor-jeddah.avif"
            alt={`فريق ${SITE.name} جدة`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
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
              className="flex items-center gap-2 text-xs mb-5"
              style={{ color: "rgba(248,246,240,0.5)" }}
            >
              <Link href="/" className="hover:text-[var(--color-gold)]">
                الرئيسية
              </Link>
              <span>/</span>
              <span style={{ color: "var(--color-gold)" }}>من نحن</span>
            </nav>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <Calendar className="w-3.5 h-3.5" style={{ color: "var(--color-gold)" }} />
              <span className="text-xs font-semibold" style={{ color: "var(--color-gold)" }}>
                معتمدون منذ {SITE.foundedYear}
              </span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
              style={{ color: "var(--color-pearl)" }}
            >
              من نحن — <span style={{ color: "var(--color-gold)" }}>{SITE.name}</span>
            </h1>
            <p
              className="text-base max-w-2xl leading-relaxed"
              style={{ color: "rgba(248,246,240,0.7)" }}
            >
              شركة مقاولات معتمدة في جدة منذ {SITE.foundedYear}. {SITE.yearsExperience}+ سنة من
              الخبرة الميدانية الفعلية، {SITE.projectsCompleted}+ مشروع منجز، فريق هندسي متخصص
              يفهم كل حي في جدة من الداخل.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard icon={<Award className="w-6 h-6" />} value={`${SITE.yearsExperience}+`} label="سنة خبرة فعلية" />
              <StatCard icon={<Users className="w-6 h-6" />} value={`${SITE.projectsCompleted}+`} label="مشروع منجز" />
              <StatCard icon={<Shield className="w-6 h-6" />} value="١٠" label="سنوات ضمان هيكلي" />
              <StatCard icon={<MapPin className="w-6 h-6" />} value="٧+" label="أحياء نخدمها" />
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <span className="gold-accent" />
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
              قصتنا — من الأساسات إلى القمة
            </h2>
            <div
              className="space-y-5 text-sm md:text-base leading-loose"
              style={{ color: "rgba(10,25,47,0.78)" }}
            >
              <p>
                تأسست <strong>{SITE.name}</strong> عام {SITE.foundedYear} في مدينة جدة برؤية واضحة:
                تقديم خدمات مقاولات بمعايير احترافية تليق بسوق المملكة العربية السعودية، وبشفافية
                وضمانات تحمي حقوق العميل. بدأنا بفريق صغير من ٣ موظفين ومشاريع ترميم صغيرة في حي
                الروضة، واليوم نُنفّذ مشاريع بناء فلل وعمارات وهناجر في جميع أحياء جدة بفريق يضم
                <strong> ٥٠+ موظف دائم</strong> ومهندس مشرف متفرّغ لكل مشروع.
              </p>
              <p>
                ما يميّزنا ليس فقط الخبرة التقنية — بل <strong>فهمنا العميق لخصائص كل حي في جدة</strong>.
                نعرف الفرق الجوهري بين تربة أبحر الساحلية المالحة (التي تتطلب خرسانة مقاومة للكبريتات
                Type V) وتربة الروضة الصخرية المستقرة (التي تسمح بأساسات شريطية قصيرة). نعرف أن المباني
                القديمة في حي السلامة تحتاج حقن إيبوكسي قبل أي ترميم، وأن مشاريع الحمدانية القريبة من
                الأودية تتطلب أساسات أعمق. هذه المعرفة المحلية لا تُكتب في الكتب — بل تُكتسب من
                {SITE.yearsExperience}+ سنة من العمل الميداني الفعلي.
              </p>
              <p>
                نفخر بأننا <strong>مرخصون من وزارة التجارة</strong>، أعضاء في الغرفة التجارية بجدة،
                ومسجلون رسمياً في منصة بلدي (balady.gov.sa) ومنصة مقاول (muqawal.sa) التابعة للهيئة
                السعودية للمقاولين. كل مشروع نُنفّذه يحمل <strong>ضمان مكتوب يصل إلى ١٠ سنوات</strong>
                على الهيكل الإنشائي، ٥ سنوات على العزل، و٣ سنوات على التشطيبات — ضمان نشهد به ونوثّقه
                بشهادات رسمية يستلمها العميل عند تسليم المشروع.
              </p>
              <p>
                في رؤيتنا للمستقبل، نواكب <strong>رؤية المملكة ٢٠٣٠</strong> ببناء مستدام وعالي الكفاءة.
                نستخدم مواد عازلة حديثة توفّر ٣٠-٥٠٪ من فاتورة التكييف، ونعتمد على أنظمة منزلية ذكية
                في مشاريعنا الفاخرة، ونتبع الكود السعودي للبناء (SBC) بصرامة كاملة. هدفنا ليس بناء
                منازل فحسب — بل بناء <strong>إرث يستمر لأجيال</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-12">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">رحلتنا — محطات بارزة</h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                من ٢٠١٠ حتى اليوم — نمو مدروس وتوسع منهجي
              </p>
            </div>
            <div className="relative">
              <div
                className="absolute right-6 md:right-8 top-0 bottom-0 w-px"
                style={{ background: "rgba(212,175,55,0.25)" }}
                aria-hidden="true"
              />
              <ul className="space-y-8">
                {MILESTONES.map((m) => (
                  <li key={m.year} className="relative ps-16 md:ps-20">
                    <span
                      className="absolute right-0 top-1 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xs md:text-sm font-extrabold"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))",
                        color: "var(--color-navy-dark)",
                      }}
                    >
                      {m.year}
                    </span>
                    <h3 className="text-base md:text-lg font-bold mb-1.5">{m.title}</h3>
                    <p className="text-sm" style={{ color: "rgba(10,25,47,0.65)" }}>
                      {m.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* LEADERSHIP — ENGINEER PROFILE */}
        <section className="section-padding">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">قيادة هندسية موثوقة</h2>
            </div>
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="relative h-72 md:h-auto">
                  <Image
                    src="/images/engineer-profile-photo.avif"
                    alt="المهندس أحمد الحربي — مدير المشاريع"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="md:col-span-2 p-6 md:p-10">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
                    style={{
                      background: "rgba(212,175,55,0.1)",
                      color: "var(--color-gold-dark)",
                    }}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    خريج جامعة الملك عبدالعزيز
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold mb-1">م. أحمد الحربي</h3>
                  <p
                    className="text-sm font-semibold mb-5"
                    style={{ color: "var(--color-gold-dark)" }}
                  >
                    مدير المشاريع ورئيس القسم الفني
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "rgba(10,25,47,0.7)" }}
                  >
                    مهندس مدني بخبرة تتجاوز {SITE.yearsExperience} عاماً في قطاع المقاولات السعودي.
                    أشرف شخصياً على أكثر من {SITE.projectsCompleted} مشروعاً في جدة، من ترميم
                    المنازل العائلية الصغيرة إلى بناء الفلل الفاخرة والمشاريع التجارية الكبيرة.
                    حاصل على بكالوريوس الهندسة المدنية من جامعة الملك عبدالعزيز، وعضو في الهيئة
                    السعودية للمهندسين، ومتخصص معتمد في الكود السعودي للبناء (SBC 301).
                  </p>
                  <h4 className="text-sm font-bold mb-3">مجالات تخصصه:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    <SpecialtyTag icon={<Building2 className="w-3.5 h-3.5" />} text="بناء الفلل والعمارات" />
                    <SpecialtyTag icon={<Hammer className="w-3.5 h-3.5" />} text="ترميم المباني القديمة" />
                    <SpecialtyTag icon={<Shield className="w-3.5 h-3.5" />} text="السلامة الإنشائية" />
                    <SpecialtyTag icon={<Briefcase className="w-3.5 h-3.5" />} text="إدارة المشاريع الكبيرة" />
                  </div>
                  <blockquote
                    className="text-sm italic border-r-2 pr-4 py-1"
                    style={{
                      borderColor: "var(--color-gold)",
                      color: "rgba(10,25,47,0.7)",
                    }}
                  >
                    «المقاول الصحيح لا يبني جدراناً — يبني ثقة. لذلك نضع كل تفاصيل المشروع في
                    عقد مكتوب، ونوقّع على ضمانات حقيقية، ونرحّب بأي مراجعة هندسية مستقلة في أي
                    مرحلة من المشروع.»
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR TEAMS */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">فرقنا المتخصصة</h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                ٥٠+ موظف دائم في ٤ فرق متخصصة — كل فريق يعمل على ما يتقنه
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAMS.map((t) => (
                <div key={t.name} className="glass-card p-6 text-center">
                  <span
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))",
                      color: "var(--color-navy-dark)",
                    }}
                  >
                    {t.icon}
                  </span>
                  <h3 className="text-base font-bold mb-1">{t.name}</h3>
                  <p
                    className="text-xs font-semibold mb-2"
                    style={{ color: "var(--color-gold-dark)" }}
                  >
                    {t.count}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(10,25,47,0.6)" }}>
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREDENTIALS / E-E-A-T */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">ترخيصاتنا واعتماداتنا</h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                تحقّق من سجلاتنا في كل المنصات الرسمية — لأن الشفافية أساس الثقة
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <CredentialCard
                image="/images/license-commercial-register.avif"
                title="السجل التجاري"
                subtitle={`رقم ${SITE.crNumber}`}
              />
              <CredentialCard
                image="/images/certificate-chamber-commerce.avif"
                title="غرفة جدة التجارية"
                subtitle="عضوية فعّالة"
              />
              <CredentialCard
                image="/images/balady-verified-screenshot.avif"
                title="منصة بلدي"
                subtitle="مقاول معتمد"
                link={SITE.social.balady}
              />
              <CredentialCard
                image="/images/muqawal-profile-screenshot.avif"
                title="منصة مقاول"
                subtitle="الهيئة السعودية للمقاولين"
                link={SITE.social.muqawal}
              />
              <CredentialCard
                image="/images/guarantee-certificate.avif"
                title="شهادة ضمان"
                subtitle="١٠ سنوات هيكلي"
              />
              <CredentialCard
                image="/images/license-commercial-register.avif"
                title="تأمين شامل"
                subtitle="عمالة + ضد الغير"
              />
            </div>
            <div
              className="p-5 rounded-2xl text-center text-sm"
              style={{
                background: "rgba(212,175,55,0.06)",
                border: "1px solid rgba(212,175,55,0.15)",
                color: "rgba(10,25,47,0.7)",
              }}
            >
              <strong>كيف تتحقق منا بنفسك؟</strong> ادخل إلى{" "}
              <a
                href={SITE.social.balady}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold"
                style={{ color: "var(--color-gold-dark)" }}
              >
                balady.gov.sa
              </a>{" "}
              وابحث بسجلنا التجاري <strong>{SITE.crNumber}</strong> — أو راسلنا لطلب صور أصلية
              لجميع وثائقنا.
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">قيمنا الستة</h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                ما نؤمن به ونمارسه يومياً في كل مشروع
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ValueCard
                icon="🎯"
                title="الإتقان"
                desc="اسمنا هو وعدنا — كل تفصيلة في المشروع تُنفّذ بأعلى معايير الجودة والدقة، حتى التفاصيل التي لن يراها أحد."
              />
              <ValueCard
                icon="🤝"
                title="الشفافية"
                desc="عرض سعر تفصيلي بالبند بالماركة بالكمية — لا مفاجآت ولا تكاليف مخفية. كل شيء واضح من البداية."
              />
              <ValueCard
                icon="⏰"
                title="الالتزام"
                desc="جدول زمني مكتوب في العقد مع شرط جزائي ٠.٥٪ لكل أسبوع تأخير. نسلّم في الوقت المتفق عليه أو قبله."
              />
              <ValueCard
                icon="🛡️"
                title="الضمان"
                desc="ضمان مكتوب موثّق ١٠ سنوات على الهيكل، ٥ على العزل، ٣ على التشطيبات — مع متابعة سنتين مجاناً."
              />
              <ValueCard
                icon="🇸🇦"
                title="رؤية ٢٠٣٠"
                desc="نساهم في بناء مستقبل المملكة من خلال مشاريع مستدامة، مواد عازلة موفّرة للطاقة، وأنظمة منزلية ذكية."
              />
              <ValueCard
                icon="📍"
                title="معرفة محلية"
                desc="نفهم تربة ومناخ كل حي في جدة — من الساحل المالح إلى الأحياء الصخرية الداخلية."
              />
            </div>
          </div>
        </section>

        {/* INTERNAL LINKING */}
        <section className="section-padding">
          <div className="container-wide max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <span className="gold-accent" />
                <h2 className="text-xl font-extrabold mb-4">خدماتنا التسعة</h2>
                <ul className="space-y-2.5">
                  {SERVICES_LIST.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/jeddah/${s.slug}`}
                        className="text-sm flex items-center gap-2 transition-colors hover:text-[var(--color-gold-dark)]"
                        style={{ color: "rgba(10,25,47,0.7)" }}
                      >
                        <ArrowLeft className="w-3 h-3" />
                        {s.h1.split("—")[0].trim()}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="gold-accent" />
                <h2 className="text-xl font-extrabold mb-4">الأحياء التي نخدمها</h2>
                <ul className="space-y-2.5">
                  {DISTRICTS_LIST.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/jeddah/${d.slug}`}
                        className="text-sm flex items-center gap-2 transition-colors hover:text-[var(--color-gold-dark)]"
                        style={{ color: "rgba(10,25,47,0.7)" }}
                      >
                        <MapPin className="w-3 h-3" />
                        مقاول {d.name} ({d.projectsCount}+ مشروع)
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl font-extrabold mb-3">أسئلة شائعة عن الشركة</h2>
            </div>
            <div className="space-y-3">
              {ABOUT_FAQS.map((faq, i) => (
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
              ابدأ مشروعك مع {SITE.name}
            </h2>
            <p className="mb-6 text-sm" style={{ color: "rgba(248,246,240,0.5)" }}>
              معاينة مجانية + عرض سعر تفصيلي خلال ٢٤ ساعة — بدون التزام
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                تواصل عبر واتساب <ArrowLeft className="w-4 h-4" />
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


