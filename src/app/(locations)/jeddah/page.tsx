import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, MapPin, Wrench, Phone, ShieldCheck, Award, Building2, Users, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AITLDRBox from "@/components/AITLDRBox";
import { SITE, SERVICES_LIST, DISTRICTS_LIST, WHATSAPP_URL } from "@/lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `مقاول جدة المعتمد | جميع خدمات المقاولات في جدة — ${SITE.name}`,
  description:
    "مقاول جدة الأول — ٥٠٠+ مشروع منجز | ١٥ سنة خبرة | ٩ خدمات (بناء، ترميم، شبوك، أسفلت، ملاحق، هناجر، تشطيبات، هدم) | يخدم جميع أحياء جدة | ضمان مكتوب",
  alternates: {
    canonical: `${SITE.url}/jeddah`,
  },
};

export default function JeddahHubPage() {
  return (
    <>
      <Header />
      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <Image
            src="/images/hero-contractor-jeddah.avif"
            alt="مقاول جدة — خدمات مقاولات متكاملة"
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
          <div className="relative z-10 container-wide px-4 md:px-6 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <MapPin className="w-4 h-4" style={{ color: "var(--color-gold)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--color-gold)" }}>
                جدة، المملكة العربية السعودية
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black mb-6"
              style={{ color: "var(--color-pearl)" }}
            >
              مقاول جدة —{" "}
              <span style={{ color: "var(--color-gold)" }}>٩ خدمات متكاملة</span>
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto mb-8"
              style={{ color: "rgba(248,246,240,0.7)" }}
            >
              كل خدمات المقاولات في مدينة جدة تحت سقف واحد. فريق واحد — ضمان واحد — جودة لا تتنازل.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                ابدأ مشروعك الآن <ArrowLeft className="w-4 h-4" />
              </a>
              <a href={`tel:${SITE.phone}`} className="btn-outline">
                <Phone className="w-4 h-4" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* ═══ AI TL;DR ═══ */}
        <section className="container-wide px-4 md:px-6 -mt-8 relative z-20">
          <AITLDRBox
            title="مقاول جدة المعتمد"
            scope="بناء، ترميم، شبوك، أسفلت، ملاحق، هناجر، تشطيبات، هدم، عام"
            priceRange="١٥ – ٣,٠٠٠+ ريال/م² (حسب الخدمة)"
            duration="من يوم واحد إلى ١٨ شهراً"
            warranty="١٠ سنوات هيكلي + ٥ سنوات على العزل + ٣ سنوات على التشطيبات"
          />
        </section>

        {/* ═══ INTRODUCTION ═══ */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <span className="gold-accent" />
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
              لماذا تختار {SITE.name} كمقاولك في جدة؟
            </h2>
            <div className="space-y-4 text-sm leading-loose" style={{ color: "rgba(10,25,47,0.75)" }}>
              <p>
                في مدينة بحجم جدة، يصعب اختيار المقاول المناسب لمشروعك. مع وجود أكثر من ٢,٠٠٠ مقاول مسجّل في منصة بلدي، الفرق بين المقاول المحترف والآخر قد يعني الفرق بين منزل أحلامك ومنزل المشاكل لعقود قادمة. شركة <strong>{SITE.name}</strong> تقدّم لك خبرة <strong>{SITE.yearsExperience}+ سنة</strong> في السوق الجدّاوي، مع أكثر من <strong>{SITE.projectsCompleted} مشروع منجز</strong> في جميع أحياء جدة، من حي الروضة القديم إلى أبحر الشمالية الساحلية.
              </p>
              <p>
                نحن لا نُقدّم خدمة عامة — بل نُقدّم <strong>حلولاً هندسية مخصصة</strong> لكل حي في جدة. في حي الروضة، نتعامل مع البلاطات الخرسانية القديمة بحقن الإيبوكسي. في أبحر، نستخدم خرسانة مقاومة للكبريتات (نوع V) للملوحة العالية. في الحمدانية، نأخذ بعين الاعتبار قرب الأودية الجافة. هذه ليست تفاصيل تجدها عند أي مقاول — هي ثمرة عقد ونصف من الخبرة الميدانية الفعلية.
              </p>
              <p>
                <strong>تخصصاتنا التسعة</strong> تشمل كل ما يحتاجه مشروعك: من <strong>بناء فيلا فاخرة من الصفر</strong> بنظام تسليم المفتاح، إلى <strong>ترميم منزل قديم</strong> بحاجة لتجديد شامل، مروراً بـ <strong>ملاحق السطح</strong>، و<strong>شبوك الأراضي</strong>، و<strong>تبليط مواقف</strong> السيارات والساحات الصناعية. نُغطّي كل احتياج بنفس مستوى الجودة والاحترافية.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ TRUST INDICATORS ═══ */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">ما يميّزنا حقاً</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <TrustCard
                icon={<Award className="w-6 h-6" />}
                title="ترخيص رسمي"
                desc="مسجّلون في بلدي ومقاول + عضوية غرفة جدة"
              />
              <TrustCard
                icon={<ShieldCheck className="w-6 h-6" />}
                title="ضمان مكتوب"
                desc="١٠ سنوات هيكلي + شهادة موثّقة"
              />
              <TrustCard
                icon={<Building2 className="w-6 h-6" />}
                title="500+ مشروع"
                desc="موثّقة بصور وإحداثيات GPS"
              />
              <TrustCard
                icon={<Users className="w-6 h-6" />}
                title="فريق ثابت"
                desc="مهندسون وعمال موظفون دائمون"
              />
            </div>
          </div>
        </section>

        {/* ═══ ALL SERVICES ═══ */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-12">
              <span className="gold-accent mx-auto" />
              <h2 className="text-3xl font-black mb-4">خدماتنا في جدة</h2>
              <p className="max-w-2xl mx-auto text-sm" style={{ color: "rgba(10,25,47,0.65)" }}>
                ٩ خدمات متكاملة — كل خدمة بفريق متخصص، مواصفات واضحة، وضمان مكتوب
              </p>
            </div>

            <div className="space-y-6">
              {SERVICES_LIST.map((s, i) => (
                <Link
                  key={s.key}
                  href={`/jeddah/${s.slug}`}
                  className="glass-card flex flex-col md:flex-row overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div
                    className={`relative w-full md:w-72 h-52 md:h-auto shrink-0 overflow-hidden ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 288px"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4" style={{ color: "var(--color-gold)" }} />
                      <span className="text-xs font-semibold" style={{ color: "var(--color-gold-dark)" }}>
                        {s.tldr.priceRange}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                      {s.h1}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "rgba(10,25,47,0.6)" }}>
                      {s.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs" style={{ color: "rgba(10,25,47,0.5)" }}>
                      <span>📋 {s.tldr.scope.split("،")[0]}</span>
                      <span>⏱️ {s.tldr.duration}</span>
                      <span>🛡️ {s.tldr.warranty}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--color-gold-dark)" }}>
                      عرض التفاصيل والأسعار
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ DISTRICTS ═══ */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide">
            <div className="text-center mb-12">
              <span className="gold-accent mx-auto" />
              <h2 className="text-3xl font-black mb-4">أحياء جدة التي نخدمها</h2>
              <p className="max-w-xl mx-auto text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                نعمل في جميع أحياء جدة مع فهم عميق لخصائص كل منطقة — من تربتها إلى تاريخها الإنشائي
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {DISTRICTS_LIST.map((d) => (
                <Link
                  key={d.key}
                  href={`/jeddah/${d.slug}`}
                  className="group relative h-48 rounded-2xl overflow-hidden"
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
                      background:
                        "linear-gradient(to top, rgba(10,25,47,0.9) 0%, rgba(10,25,47,0.2) 50%, transparent 100%)",
                    }}
                  >
                    <MapPin className="w-4 h-4 mb-1" style={{ color: "var(--color-gold)" }} />
                    <span className="text-sm font-bold" style={{ color: "var(--color-pearl)" }}>
                      {d.name}
                    </span>
                    <span className="text-[10px]" style={{ color: "rgba(248,246,240,0.5)" }}>
                      {d.projectsCount}+ مشروع منجز
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ENGINEERING PHILOSOPHY ═══ */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <span className="gold-accent" />
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
              فلسفتنا الهندسية: لا حلول عامة
            </h2>
            <div className="space-y-4 text-sm leading-loose" style={{ color: "rgba(10,25,47,0.75)" }}>
              <p>
                المقاول العام في السوق السعودي غالباً ما يقدّم حلولاً موحّدة لكل المشاريع — نفس نوع الأساسات، نفس مواد التشطيب، نفس درجة الخرسانة. هذا النهج يعمل في بعض الأحيان، لكنه يفشل في حالات كثيرة لأن <strong>جدة ليست مدينة موحدة</strong>. التربة في حي الروضة تختلف جوهرياً عن تربة أبحر الشمالية. الرطوبة الجوية في الكورنيش الشمالي تختلف عن جنوب جدة. السرعة المطلوبة لمشروع تجاري تختلف عن مشروع سكني عائلي.
              </p>
              <p>
                <strong>نهجنا مختلف</strong>: نبدأ كل مشروع بـ <strong>تقرير ميداني تفصيلي</strong> يشمل فحص التربة، تحليل البيئة المحلية، ومراجعة المتطلبات الخاصة بالحي. ثم نضع <strong>خطة هندسية مخصصة</strong> تأخذ بعين الاعتبار كل تلك العوامل. على سبيل المثال:
              </p>
              <ul className="space-y-2 mr-6 list-disc">
                <li>
                  <strong>في حي السلامة</strong> (تربة صخرية): نستخدم معدات تكسير خاصة في الحفر، لكن نوفّر في الأساسات لأن الصخر يدعم الأحمال بشكل طبيعي.
                </li>
                <li>
                  <strong>في أبحر الشمالية</strong> (ملوحة عالية + مياه جوفية): نستخدم حصرياً خرسانة Type V مع إضافات Silica Fume، وحديد إيبوكسي مغلف، وعزل ثلاثي الطبقات.
                </li>
                <li>
                  <strong>في حي الحمدانية</strong> (مناطق قرب الأودية): نعمق الأساسات ٢-٢.٥م، ونصمم نظام تصريف خاص للسيول الموسمية.
                </li>
                <li>
                  <strong>في حي النزهة</strong> (تربة مختلطة): نطلب دائماً فحص تربة قبل أي مشروع لتحديد نوع الأساسات الأمثل.
                </li>
              </ul>
              <p>
                هذا التخصيص الهندسي ليس مجرد ميزة تسويقية — بل هو ما يحدد الفرق بين <strong>منزل يصمد ٥٠ سنة</strong> وآخر يحتاج إصلاحات جذرية خلال ١٠ سنوات. الاستثمار في الجودة من البداية يوفّر مبالغ ضخمة في الصيانة لاحقاً.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ PROCESS ═══ */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-10">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">كيف نعمل؟ من الاستشارة إلى التسليم</h2>
            </div>
            <div className="space-y-6">
              <ProcessStep
                num="١"
                title="استشارة مجانية"
                desc="معاينة ميدانية بدون التزام، تقدير أولي للتكلفة والمدة، ومناقشة احتياجاتك الفعلية."
              />
              <ProcessStep
                num="٢"
                title="دراسة هندسية تفصيلية"
                desc="فحص الموقع، تقرير التربة (للمشاريع الجديدة)، التصميم المعماري، والمواصفات التفصيلية."
              />
              <ProcessStep
                num="٣"
                title="عرض سعر مكتوب"
                desc="جدول كميات تفصيلي بكل البنود، مواصفات المواد بالماركات، الجدول الزمني المرحلي، والضمانات."
              />
              <ProcessStep
                num="٤"
                title="استخراج التراخيص"
                desc="نتولى كل الإجراءات: الكروكي، رخصة البناء عبر «ابني»، موافقة الدفاع المدني إن لزم."
              />
              <ProcessStep
                num="٥"
                title="التنفيذ بإشراف هندسي"
                desc="فريق متخصص + مهندس مشرف يومي، تقارير أسبوعية مصوّرة، التزام صارم بالجدول والمواصفات."
              />
              <ProcessStep
                num="٦"
                title="الفحص والتسليم"
                desc="فحص شامل قبل التسليم، قائمة الملاحظات (Punch List)، تسليم نهائي مع شهادات الضمان."
              />
              <ProcessStep
                num="٧"
                title="خدمة ما بعد التسليم"
                desc="متابعة دورية لسنتين، استجابة سريعة لأي ملاحظة، وصيانة دورية اختيارية."
              />
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="section-padding text-center" style={{ background: "var(--color-navy)" }}>
          <div className="container-wide max-w-2xl">
            <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--color-gold)" }} />
            <h2 className="text-3xl font-black mb-6" style={{ color: "var(--color-pearl)" }}>
              ابدأ مشروعك في جدة الآن
            </h2>
            <p className="mb-8" style={{ color: "rgba(248,246,240,0.6)" }}>
              معاينة مجانية — عرض سعر تفصيلي خلال ٢٤ ساعة — بدون التزام
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                تواصل عبر واتساب
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

function TrustCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass-card p-6 text-center">
      <div
        className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))",
          color: "var(--color-navy-dark)",
        }}
      >
        {icon}
      </div>
      <h3 className="text-sm font-bold mb-1.5">{title}</h3>
      <p className="text-xs leading-relaxed" style={{ color: "rgba(10,25,47,0.6)" }}>
        {desc}
      </p>
    </div>
  );
}

function ProcessStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-extrabold"
        style={{
          background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))",
          color: "var(--color-navy-dark)",
        }}
      >
        {num}
      </div>
      <div className="flex-1">
        <h3 className="text-base font-bold mb-1.5">{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(10,25,47,0.65)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}
