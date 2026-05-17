import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Phone, ArrowLeft, Star, Shield, Award, CheckCircle, MapPin, Building2, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Badge, WhyUsCard, ProjectCard, EEATItem, FAQ } from "@/components/HomeCards";
import { SITE, SERVICES_LIST, DISTRICTS_LIST, WHATSAPP_URL } from "@/lib/constants";

// ─── Dynamic Imports — below-the-fold client components ───
const CostCalculator = dynamic(
  () => import("@/components/CostCalculator"),
  { loading: () => <div className="skeleton h-96 rounded-3xl" /> }
);
const TestimonialsSlider = dynamic(
  () => import("@/components/TestimonialsSlider"),
  { loading: () => <div className="skeleton h-80 rounded-2xl" /> }
);
const StatsCounter = dynamic(
  () => import("@/components/StatsCounter"),
  { loading: () => <div className="skeleton h-40 rounded-2xl" /> }
);

export const revalidate = 3600;

// ─── Homepage FAQs Data (for schema) ───
const HOME_FAQS = [
  { q: "كم تكلفة مقاول ترميم في جدة؟", a: "تتراوح تكلفة الترميم في جدة بين ١٥٠ ريال/م² للأعمال البسيطة (دهان ولياسة) و١,٠٠٠+ ريال/م² للترميم الشامل الفاخر. المعاينة المجانية تحدد التكلفة الدقيقة." },
  { q: "كم تكلفة بناء فيلا في جدة بالمتر؟", a: "تبدأ من ١,٠٠٠ ريال/م² للبناء الاقتصادي (شغل عظم بالمواد) وتصل إلى ٣,٠٠٠+ ريال/م² لتسليم مفتاح VIP بتشطيب فاخر." },
  { q: "ما الفرق بين شغل العظم بالمواد وتسليم المفتاح؟", a: "شغل العظم يشمل الهيكل الإنشائي فقط (حفر، أساسات، أعمدة، سقف). تسليم المفتاح يشمل كل شيء من الأساسات حتى الدهان والسيراميك والكهرباء والسباكة — جاهز للسكن." },
  { q: "كيف أتحقق من ترخيص المقاول في جدة؟", a: "يمكنك التحقق من ترخيص أي مقاول عبر منصة بلدي (balady.gov.sa) برقم السجل التجاري، أو عبر منصة مقاول التابعة لهيئة المقاولين السعودية." },
  { q: "هل يحتاج الملحق رخصة بناء في جدة؟", a: "نعم، أي ملحق أو توسعة يحتاج رخصة بناء من أمانة جدة عبر نظام ابني. نساعدك في استخراج الكروكي التنظيمي وجميع التصاريح اللازمة." },
  { q: "ما هو سعر متر الشبوك في جدة؟", a: "يبدأ من ٢٥ ريال/م.ط للشبك المجدول العادي ويصل إلى ٥٠٠ ريال/م.ط للشبك الأمني المقوى. السعر يعتمد على النوع والارتفاع والمنطقة." },
];

// ─── Homepage Schema ───
function homePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: SITE.url,
        name: `مقاول جدة المعتمد — ${SITE.name}`,
        description: `${SITE.name} — مقاول جدة المعتمد. ${SITE.projectsCompleted}+ مشروع منجز بضمان مكتوب.`,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
        inLanguage: "ar",
      },
      {
        "@type": "FAQPage",
        mainEntity: HOME_FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema()) }}
        />
        {/* ═══ HERO SECTION ═══ */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Image */}
          <Image
            src="/images/hero-contractor-jeddah.avif"
            alt="مقاول جدة — إتقان للمقاولات"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg, rgba(6,15,31,0.92) 0%, rgba(10,25,47,0.80) 50%, rgba(10,25,47,0.70) 100%)",
            }}
          />

          <div className="relative z-10 container-wide px-4 md:px-6 py-32 md:py-40">
            <div className="max-w-3xl">
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge icon={<Star className="w-3.5 h-3.5" />} text="٤.٩ تقييم Google" />
                <Badge icon={<Shield className="w-3.5 h-3.5" />} text="مرخص ومعتمد" />
                <Badge icon={<Award className="w-3.5 h-3.5" />} text={`${SITE.projectsCompleted}+ مشروع`} />
              </div>

              <h1
                className="text-3xl md:text-4xl font-extrabold mb-5 leading-snug"
                style={{ color: "var(--color-pearl)" }}
              >
                مقاول جدة —{" "}
                <span style={{ color: "var(--color-gold)" }}>خبرة تتكلم</span>{" "}
                عنها مشاريعنا
              </h1>
              <p
                className="text-base md:text-lg mb-8 max-w-xl leading-relaxed"
                style={{ color: "rgba(248,246,240,0.65)" }}
              >
                {SITE.yearsExperience}+ سنة في سوق المقاولات الجدّاوي. بناء فلل · ترميم منازل · شبوك · أسفلت
                · هناجر · ملاحق — ضمان مكتوب على جميع الأعمال، تسليم مفتاح بالمواد.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  احصل على عرض سعر مجاني
                  <ArrowLeft className="w-4 h-4" />
                </a>
                <a href={`tel:${SITE.phone}`} className="btn-outline">
                  <Phone className="w-4 h-4" />
                  اتصل الآن — {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 inset-x-0 flex justify-center z-10">
            <div
              className="w-6 h-10 rounded-full flex justify-center pt-2"
              style={{ border: "2px solid rgba(212,175,55,0.3)" }}
            >
              <div
                className="w-1.5 h-3 rounded-full animate-bounce"
                style={{ background: "var(--color-gold)" }}
              />
            </div>
          </div>
        </section>

        {/* ═══ SERVICES GRID ═══ */}
        <section id="services" className="section-padding bg-section-alt">
          <div className="container-wide">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">خدماتنا في جدة</h2>
              <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(10,25,47,0.55)" }}>
                ٩ خدمات مقاولات متكاملة — من الأساسات إلى التسليم. كل خدمة بفريق متخصص وضمان مكتوب.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_LIST.map((s) => (
                <Link
                  key={s.key}
                  href={`/jeddah/${s.slug}`}
                  className="group glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(10,25,47,0.7) 0%, transparent 50%)",
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                      {s.h1.split("—")[0].trim()}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: "rgba(10,25,47,0.6)" }}>
                      {s.tldr.scope}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold" style={{ color: "var(--color-gold-dark)" }}>
                        {s.tldr.priceRange}
                      </span>
                      <span className="text-xs" style={{ color: "rgba(10,25,47,0.4)" }}>
                        عرض التفاصيل ←
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY US ═══ */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">لماذا إتقان للمقاولات؟</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <WhyUsCard
                icon="🏗️"
                title={`${SITE.projectsCompleted}+ مشروع منجز`}
                desc="خبرة عملية في مشاريع متنوعة — من ترميم الشقق الصغيرة إلى بناء الفلل الفاخرة والمباني التجارية."
              />
              <WhyUsCard
                icon="📜"
                title="ضمان مكتوب"
                desc="ضمان رسمي مكتوب يصل إلى ١٠ سنوات على الهيكل الإنشائي — مع متابعة مجانية بعد التسليم."
              />
              <WhyUsCard
                icon="⏱️"
                title="التزام بالمواعيد"
                desc="جدول زمني مكتوب في العقد — مع شرط جزائي واضح. نسلّم في الوقت المتفق عليه أو قبله."
              />
              <WhyUsCard
                icon="💰"
                title="أسعار شفافة"
                desc="عرض سعر تفصيلي بالبند. لا مفاجآت — تكلفة المواد والعمالة واضحة من البداية."
              />
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS GALLERY ═══ */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">مشاريعنا في جدة</h2>
              <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(10,25,47,0.55)" }}>
                صور حقيقية من مشاريع منفذة في أحياء جدة — قبل وبعد
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                image="/images/project-rawdah-before.avif"
                imageAfter="/images/project-rawdah-after.avif"
                title="ترميم فيلا — حي الروضة"
                category="ترميم"
                district="الروضة"
              />
              <ProjectCard
                image="/images/project-salamah-villa.avif"
                title="بناء فيلا سكنية — حي السلامة"
                category="بناء"
                district="السلامة"
              />
              <ProjectCard
                image="/images/project-north-asphalt.avif"
                title="أسفلت موقف سيارات — شمال جدة"
                category="أسفلت"
                district="شمال جدة"
              />
              <ProjectCard
                image="/images/project-abhur-shboak.avif"
                title="شبوك مشروع — أبحر الشمالية"
                category="شبوك"
                district="أبحر"
              />
              <ProjectCard
                image="/images/project-nazha-hanager.avif"
                title="هنجر صناعي — حي النزهة"
                category="هناجر"
                district="النزهة"
              />
              <ProjectCard
                image="/images/project-molahaq-salamah.avif"
                title="ملحق سطح — حي السلامة"
                category="ملاحق"
                district="السلامة"
              />
            </div>
          </div>
        </section>

        {/* ═══ DISTRICTS ═══ */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                مناطق خدمتنا في جدة
              </h2>
              <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(10,25,47,0.55)" }}>
                نخدم جميع أحياء جدة — مع فهم عميق لخصائص كل حي
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {DISTRICTS_LIST.map((d) => (
                <Link
                  key={d.key}
                  href={`/jeddah/${d.slug}`}
                  className="group relative h-44 rounded-2xl overflow-hidden"
                >
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-end p-4"
                    style={{
                      background: "linear-gradient(to top, rgba(10,25,47,0.85) 0%, transparent 60%)",
                    }}
                  >
                    <MapPin className="w-4 h-4 mb-1" style={{ color: "var(--color-gold)" }} />
                    <span className="text-sm font-bold text-center" style={{ color: "var(--color-pearl)" }}>
                      {d.name}
                    </span>
                    <span className="text-[10px]" style={{ color: "rgba(248,246,240,0.5)" }}>
                      {d.projectsCount}+ مشروع
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ COST CALCULATOR ═══ */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">احسب تكلفة مشروعك</h2>
              <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(10,25,47,0.55)" }}>
                حاسبة تقريبية فورية — اختر الخدمة والمساحة واحصل على تقدير الآن
              </p>
            </div>
            <CostCalculator />
          </div>
        </section>

        {/* ═══ TEAM / E-E-A-T ═══ */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 lg:h-[480px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/team-main-contractor-jeddah.avif"
                  alt="فريق إتقان للمقاولات جدة"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <span className="gold-accent" />
                <h2 className="text-xl md:text-2xl font-extrabold mb-4">
                  فريق متخصص — خبرة حقيقية في أحياء جدة
                </h2>
                <p className="mb-6" style={{ color: "rgba(10,25,47,0.7)" }}>
                  بقيادة المهندس أحمد الحربي — مدير المشاريع ورئيس القسم الفني بخبرة تتجاوز
                  {SITE.yearsExperience} عاماً في السوق السعودي. فريقنا يفهم خصائص تربة كل حي
                  في جدة ويعرف الفرق بين أساسات أبحر الساحلية وأساسات الروضة الجبلية.
                </p>

                <ul className="space-y-3 mb-8">
                  <EEATItem text="سجل تجاري ساري — مرخص من وزارة التجارة" />
                  <EEATItem text="عضو في الغرفة التجارية بجدة" />
                  <EEATItem text="مسجّل في منصة بلدي ومنصة مقاول" />
                  <EEATItem text="ضمان مكتوب يصل إلى ١٠ سنوات على الهيكل الإنشائي" />
                  <EEATItem text={`أكثر من ${SITE.projectsCompleted} مشروع منجز في جدة`} />
                </ul>

                <div className="flex gap-3">
                  <Image
                    src="/images/engineer-profile-photo.avif"
                    alt="المهندس أحمد الحربي — رئيس القسم الفني"
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <div>
                    <span className="text-sm font-bold block">م. أحمد الحربي</span>
                    <span className="text-xs" style={{ color: "rgba(10,25,47,0.5)" }}>
                      مدير المشاريع — إتقان للمقاولات
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ STATS COUNTER ═══ */}
        <section className="section-padding">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                أرقام تتحدث عن خبرتنا
              </h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                {SITE.yearsExperience}+ سنة في سوق المقاولات الجدّاوي
              </p>
            </div>
            <StatsCounter
              stats={[
                {
                  icon: <Building2 className="w-6 h-6" />,
                  value: SITE.projectsCompleted,
                  suffix: "+",
                  label: "مشروع منجز",
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  value: SITE.yearsExperience,
                  suffix: "+",
                  label: "سنة خبرة",
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  value: 50,
                  suffix: "+",
                  label: "موظف دائم",
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  value: 87,
                  suffix: "+",
                  label: "تقييم إيجابي",
                },
              ]}
            />
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                ماذا يقول عملاؤنا
              </h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                ١٠ آراء من عملاء حقيقيين في أحياء جدة المختلفة
              </p>
            </div>
            <TestimonialsSlider />
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl font-extrabold mb-3">أسئلة شائعة</h2>
            </div>
            <div className="space-y-3">
              <FAQ q="كم تكلفة مقاول ترميم في جدة؟" a="تتراوح تكلفة الترميم في جدة بين ١٥٠ ريال/م² للأعمال البسيطة (دهان ولياسة) و١,٠٠٠+ ريال/م² للترميم الشامل الفاخر. المعاينة المجانية تحدد التكلفة الدقيقة." />
              <FAQ q="كم تكلفة بناء فيلا في جدة بالمتر؟" a="تبدأ من ١,٠٠٠ ريال/م² للبناء الاقتصادي (شغل عظم بالمواد) وتصل إلى ٣,٠٠٠+ ريال/م² لتسليم مفتاح VIP بتشطيب فاخر." />
              <FAQ q="ما الفرق بين شغل العظم بالمواد وتسليم المفتاح؟" a="شغل العظم يشمل الهيكل الإنشائي فقط (حفر، أساسات، أعمدة، سقف). تسليم المفتاح يشمل كل شيء من الأساسات حتى الدهان والسيراميك والكهرباء والسباكة — جاهز للسكن." />
              <FAQ q="كيف أتحقق من ترخيص المقاول في جدة؟" a="يمكنك التحقق من ترخيص أي مقاول عبر منصة بلدي (balady.gov.sa) برقم السجل التجاري، أو عبر منصة مقاول التابعة لهيئة المقاولين السعودية." />
              <FAQ q="هل يحتاج الملحق رخصة بناء في جدة؟" a="نعم، أي ملحق أو توسعة يحتاج رخصة بناء من أمانة جدة عبر نظام ابني. نساعدك في استخراج الكروكي التنظيمي وجميع التصاريح اللازمة." />
              <FAQ q="ما هو سعر متر الشبوك في جدة؟" a="يبدأ من ٢٥ ريال/م.ط للشبك المجدول العادي ويصل إلى ٥٠٠ ريال/م.ط للشبك الأمني المقوى. السعر يعتمد على النوع والارتفاع والمنطقة." />
            </div>
          </div>
        </section>

        {/* ═══ CTA SECTION ═══ */}
        <section
          className="py-12 text-center"
          style={{ background: "var(--color-navy)" }}
        >
          <div className="container-wide max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4" style={{ color: "var(--color-pearl)" }}>
                جاهز تبدأ مشروعك؟
              </h2>
              <p className="mb-6 text-sm" style={{ color: "rgba(248,246,240,0.5)" }}>
                تواصل معنا الآن للحصول على معاينة مجانية وعرض سعر تفصيلي — بدون أي التزام
              </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                واتساب — عرض سعر فوري
                <ArrowLeft className="w-4 h-4" />
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
