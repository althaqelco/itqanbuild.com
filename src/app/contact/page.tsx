import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowLeft, ShieldCheck, Award, CheckCircle, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ContactForm from "@/components/ContactForm";
import { SITE, SERVICES_LIST, DISTRICTS_LIST, WHATSAPP_URL } from "@/lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `تواصل معنا — ${SITE.name} | مقاول جدة المعتمد | معاينة مجانية`,
  description: `تواصل مع ${SITE.name} — مقاول جدة المعتمد (سجل تجاري ${SITE.crNumber}). اتصل ${SITE.phoneDisplay} أو واتساب. معاينة مجانية + عرض سعر مكتوب خلال ٢٤ ساعة. ${SITE.address.district}، جدة.`,
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: `تواصل معنا — ${SITE.name}`,
    description: `معاينة مجانية وعرض سعر تفصيلي خلال ٢٤ ساعة — مقاول جدة المعتمد`,
    images: [{ url: "/images/og-image-default.png", width: 1200, height: 630 }],
  },
};

// ─── Contact FAQs ───
const CONTACT_FAQS = [
  {
    question: "كم يستغرق الرد على استفسارات العملاء؟",
    answer: "نرد على رسائل واتساب خلال ١٥ دقيقة خلال ساعات العمل (٨ ص – ١٠ م). المكالمات الهاتفية يُرد عليها فوراً. البريد الإلكتروني خلال ٢٤ ساعة عمل كحد أقصى.",
  },
  {
    question: "هل المعاينة الميدانية مجانية فعلاً؟",
    answer: "نعم، المعاينة مجانية ١٠٠٪ وبدون أي التزام. يزور المهندس موقعك، يقيّم الحالة، ويقدم تقريراً أولياً شفهياً. عرض السعر المكتوب التفصيلي يصلك خلال ٢٤ ساعة من المعاينة.",
  },
  {
    question: "ما المناطق التي تخدمونها في جدة؟",
    answer: "نخدم جميع أحياء جدة بدون استثناء: الروضة، السلامة، النزهة، الصفا، الحمدانية، أبحر الشمالية، شمال جدة، وجميع الأحياء الأخرى. لدينا فرق عمل موزّعة جغرافياً لتغطية المدينة بالكامل.",
  },
  {
    question: "ما طرق الدفع المتاحة؟",
    answer: "نقبل التحويل البنكي المحلي (جميع البنوك السعودية)، الشيكات المصدّقة، والدفع النقدي. نظام الدفع مرحلي: ٣٠٪ عند التوقيع، ٤٠٪ عند ٥٠٪ من الإنجاز، ٢٠٪ عند ٩٠٪، و١٠٪ بعد التسليم النهائي.",
  },
  {
    question: "هل تقدمون خدمات طوارئ في عطلة نهاية الأسبوع؟",
    answer: "نعم، لدينا خط طوارئ متاح ٢٤/٧ للحالات العاجلة مثل تسريبات المياه أو مشاكل هيكلية خطيرة. اتصل على الرقم مباشرة وسيتم توجيهك لفريق الطوارئ.",
  },
  {
    question: "كيف أتأكد من ترخيص شركتكم؟",
    answer: `يمكنك التحقق من ترخيصنا عبر: منصة بلدي (balady.gov.sa) بالسجل التجاري ${SITE.crNumber}، أو منصة مقاول التابعة لهيئة المقاولين. كما يمكنك زيارة مقرنا في ${SITE.address.district} للاطلاع على الوثائق الرسمية.`,
  },
];

// ─── Schema ───
function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE.url}/contact/#contactpage`,
        url: `${SITE.url}/contact`,
        name: `تواصل معنا — ${SITE.name}`,
        description: "صفحة التواصل مع شركة إتقان للمقاولات في جدة — معاينة مجانية وعرض سعر مكتوب.",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
        inLanguage: "ar",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE.url}/#localbusiness-contact`,
        name: SITE.name,
        telephone: SITE.phone,
        email: SITE.email,
        url: SITE.url,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.city,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: "SA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.geo.latitude.toString(),
          longitude: SITE.geo.longitude.toString(),
        },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday"], opens: "08:00", closes: "22:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday"], opens: "16:00", closes: "22:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "21:00" },
        ],
        contactPoint: [
          { "@type": "ContactPoint", telephone: SITE.phone, contactType: "customer service", areaServed: "SA", availableLanguage: ["Arabic"], hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Saturday"], opens: "08:00", closes: "22:00" } },
          { "@type": "ContactPoint", telephone: SITE.phone, contactType: "emergency", areaServed: "SA", availableLanguage: ["Arabic"] },
        ],
        taxID: SITE.crNumber,
        vatID: SITE.vatNumber,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "تواصل معنا", item: `${SITE.url}/contact` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: CONTACT_FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema()) }}
        />

        {/* HERO */}
        <section className="page-hero">
          <div className="container-wide px-4 md:px-6">
            <nav className="flex items-center gap-2 text-xs mb-4" style={{ color: "rgba(10,25,47,0.4)" }}>
              <Link href="/" className="hover:text-[var(--color-gold)]">الرئيسية</Link>
              <span>/</span>
              <span style={{ color: "var(--color-gold-dark)" }}>تواصل معنا</span>
            </nav>
            <span className="gold-accent mx-auto" />
            <h1 className="text-3xl md:text-4xl font-extrabold">تواصل معنا — مقاول جدة المعتمد</h1>
            <p>معاينة مجانية + عرض سعر مكتوب خلال ٢٤ ساعة — بدون أي التزام</p>
          </div>
        </section>

        {/* YMYL TRUST BAR */}
        <section className="py-6 bg-section-alt">
          <div className="container-wide max-w-4xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              <TrustBadge icon={<ShieldCheck className="w-5 h-5" />} text="مرخص ومعتمد" />
              <TrustBadge icon={<Award className="w-5 h-5" />} text={`سجل تجاري ${SITE.crNumber}`} />
              <TrustBadge icon={<FileText className="w-5 h-5" />} text="عقد مكتوب + ضمان" />
              <TrustBadge icon={<CheckCircle className="w-5 h-5" />} text="تأمين ضد الأضرار" />
            </div>
          </div>
        </section>

        {/* INTRO — NLP Rich */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <p className="text-sm leading-loose mb-0" style={{ color: "rgba(10,25,47,0.7)" }}>
              تبحث عن <strong>مقاول معتمد في جدة</strong> لمشروعك القادم؟ شركة <strong>{SITE.name}</strong> — المسجّلة رسمياً لدى <strong>وزارة التجارة</strong> (سجل تجاري {SITE.crNumber}) وعضو <strong>الغرفة التجارية الصناعية بجدة</strong> — تقدم لك <strong>معاينة ميدانية مجانية</strong> مع عرض سعر مكتوب تفصيلي خلال ٢٤ ساعة. نخدم جميع أحياء جدة بخبرة تتجاوز <strong>{SITE.yearsExperience} عاماً</strong> وأكثر من <strong>{SITE.projectsCompleted} مشروع منجز</strong> في تخصصات البناء والترميم والشبوك والأسفلت والملاحق والهناجر والتشطيبات.
            </p>
          </div>
        </section>

        {/* CONTACT CARDS */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">طرق التواصل</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="glass-card p-8 text-center group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl block">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(37,211,102,0.1)" }}>
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.28-1.234l-.306-.184-2.865.852.852-2.865-.184-.306A8 8 0 1112 20z"/></svg>
                </div>
                <h3 className="text-lg font-bold mb-2">واتساب</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(10,25,47,0.6)" }}>الطريقة الأسرع — نرد خلال ١٥ دقيقة</p>
                <span className="text-sm font-semibold" style={{ color: "#25d366" }}>أرسل رسالة الآن</span>
              </a>

              <a href={`tel:${SITE.phone}`} className="glass-card p-8 text-center group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl block">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(212,175,55,0.1)" }}>
                  <Phone className="w-7 h-7" style={{ color: "var(--color-gold)" }} />
                </div>
                <h3 className="text-lg font-bold mb-2">اتصل مباشرة</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(10,25,47,0.6)" }}>متاح من ٨ صباحاً حتى ١٠ مساءً</p>
                <span className="text-lg font-bold" style={{ color: "var(--color-gold-dark)" }} dir="ltr">{SITE.phoneDisplay}</span>
              </a>

              <a href={`mailto:${SITE.email}`} className="glass-card p-8 text-center group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl block">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(10,25,47,0.06)" }}>
                  <Mail className="w-7 h-7" style={{ color: "var(--color-navy)" }} />
                </div>
                <h3 className="text-lg font-bold mb-2">البريد الإلكتروني</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(10,25,47,0.6)" }}>للعروض الرسمية والعقود</p>
                <span className="text-sm font-semibold" style={{ color: "var(--color-navy)" }}>{SITE.email}</span>
              </a>

              <div className="glass-card p-8 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(10,25,47,0.06)" }}>
                  <MapPin className="w-7 h-7" style={{ color: "var(--color-navy)" }} />
                </div>
                <h3 className="text-lg font-bold mb-2">الموقع</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(10,25,47,0.6)" }}>
                  {SITE.address.street}، {SITE.address.district}<br />
                  {SITE.address.city}، {SITE.address.region}
                </p>
                <a href={SITE.social.googleMaps} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold inline-flex items-center gap-1" style={{ color: "var(--color-gold-dark)" }}>
                  افتح في خرائط قوقل <ArrowLeft className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="section-padding">
          <div className="container-wide max-w-2xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">طلب عرض سعر مكتوب</h2>
              <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
                املأ النموذج وسنتواصل معك خلال ١٥ دقيقة عبر واتساب
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* MAP EMBED — GEO Signal */}
        <section className="bg-section-alt">
          <div className="container-wide max-w-4xl px-4 py-10">
            <div className="text-center mb-6">
              <span className="gold-accent mx-auto" />
              <h2 className="text-xl font-extrabold mb-2">موقعنا في جدة</h2>
              <p className="text-xs" style={{ color: "rgba(10,25,47,0.5)" }}>
                {SITE.address.street}، {SITE.address.district}، جدة {SITE.address.postalCode}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg" style={{ height: "320px" }}>
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${SITE.geo.latitude},${SITE.geo.longitude}&zoom=15&language=ar`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`موقع ${SITE.name} على خرائط قوقل`}
              />
            </div>
          </div>
        </section>

        {/* WORKING HOURS */}
        <section className="section-padding">
          <div className="container-wide max-w-2xl">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <Clock className="w-5 h-5" style={{ color: "var(--color-gold)" }} />
                <h2 className="text-xl font-bold">ساعات العمل</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(10,25,47,0.06)" }}>
                  <span>الأحد — الخميس</span>
                  <span className="font-bold">٨:٠٠ ص — ١٠:٠٠ م</span>
                </div>
                <div className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(10,25,47,0.06)" }}>
                  <span>الجمعة</span>
                  <span className="font-bold">٤:٠٠ م — ١٠:٠٠ م</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>السبت</span>
                  <span className="font-bold">٩:٠٠ ص — ٩:٠٠ م</span>
                </div>
              </div>
              <p className="text-xs mt-4 text-center" style={{ color: "rgba(10,25,47,0.4)" }}>* المعاينات الميدانية تتطلب حجز مسبق · خط الطوارئ متاح ٢٤/٧</p>
            </div>
          </div>
        </section>

        {/* AREAS WE SERVE — Internal Links */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-xl font-extrabold mb-2">مناطق خدمتنا في جدة</h2>
              <p className="text-xs" style={{ color: "rgba(10,25,47,0.5)" }}>نخدم جميع أحياء جدة — اختر حيّك لمعرفة المزيد</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {DISTRICTS_LIST.map((d) => (
                <Link key={d.slug} href={`/jeddah/${d.slug}`} className="px-4 py-2 rounded-full text-xs font-semibold transition-all hover:-translate-y-0.5" style={{ background: "rgba(212,175,55,0.08)", color: "var(--color-gold-dark)", border: "1px solid rgba(212,175,55,0.15)" }}>
                  📍 {d.name}
                </Link>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold mb-3">خدماتنا</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {SERVICES_LIST.map((s) => (
                  <Link key={s.slug} href={`/jeddah/${s.slug}`} className="px-3 py-1.5 rounded-lg text-xs transition-all hover:-translate-y-0.5" style={{ background: "rgba(10,25,47,0.04)", color: "rgba(10,25,47,0.7)" }}>
                    {s.h1.split("—")[0].trim()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-8">
              <span className="gold-accent mx-auto" />
              <h2 className="text-2xl font-extrabold mb-3">أسئلة شائعة عن التواصل</h2>
            </div>
            <div className="space-y-3">
              {CONTACT_FAQS.map((faq, i) => (
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
              ابدأ مشروعك اليوم
            </h2>
            <p className="mb-6 text-sm" style={{ color: "rgba(248,246,240,0.5)" }}>
              معاينة مجانية — عرض سعر مكتوب — ضمان رسمي — بدون التزام
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                واتساب — عرض سعر فوري <ArrowLeft className="w-4 h-4" />
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

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,175,55,0.1)", color: "var(--color-gold-dark)" }}>{icon}</span>
      <span className="text-xs font-bold">{text}</span>
    </div>
  );
}
