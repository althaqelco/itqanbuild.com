import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ContactForm from "@/components/ContactForm";
import { SITE, WHATSAPP_URL } from "@/lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `تواصل معنا — ${SITE.name} | مقاول جدة`,
  description: `تواصل مع ${SITE.name} — اتصل ${SITE.phoneDisplay} أو واتساب لطلب معاينة مجانية وعرض سعر. جدة، ${SITE.address.district}.`,
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container-wide px-4 md:px-6">
            <span className="gold-accent mx-auto" />
            <h1 className="text-3xl md:text-4xl font-extrabold">تواصل معنا</h1>
            <p>معاينة مجانية + عرض سعر تفصيلي خلال ٢٤ ساعة</p>
          </div>
        </section>

        {/* CONTACT CARDS */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="glass-card p-8 text-center group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl block">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(37,211,102,0.1)" }}>
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.28-1.234l-.306-.184-2.865.852.852-2.865-.184-.306A8 8 0 1112 20z"/></svg>
                </div>
                <h2 className="text-lg font-bold mb-2">واتساب</h2>
                <p className="text-sm mb-4" style={{ color: "rgba(10,25,47,0.6)" }}>الطريقة الأسرع — نرد خلال ١٥ دقيقة</p>
                <span className="text-sm font-semibold" style={{ color: "#25d366" }}>أرسل رسالة الآن</span>
              </a>

              <a href={`tel:${SITE.phone}`} className="glass-card p-8 text-center group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl block">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(212,175,55,0.1)" }}>
                  <Phone className="w-7 h-7" style={{ color: "var(--color-gold)" }} />
                </div>
                <h2 className="text-lg font-bold mb-2">اتصل مباشرة</h2>
                <p className="text-sm mb-4" style={{ color: "rgba(10,25,47,0.6)" }}>متاح من ٨ صباحاً حتى ١٠ مساءً</p>
                <span className="text-lg font-bold" style={{ color: "var(--color-gold-dark)" }} dir="ltr">{SITE.phoneDisplay}</span>
              </a>

              <a href={`mailto:${SITE.email}`} className="glass-card p-8 text-center group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl block">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(10,25,47,0.06)" }}>
                  <Mail className="w-7 h-7" style={{ color: "var(--color-navy)" }} />
                </div>
                <h2 className="text-lg font-bold mb-2">البريد الإلكتروني</h2>
                <p className="text-sm mb-4" style={{ color: "rgba(10,25,47,0.6)" }}>للعروض الرسمية والعقود</p>
                <span className="text-sm font-semibold" style={{ color: "var(--color-navy)" }}>{SITE.email}</span>
              </a>

              <div className="glass-card p-8 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(10,25,47,0.06)" }}>
                  <MapPin className="w-7 h-7" style={{ color: "var(--color-navy)" }} />
                </div>
                <h2 className="text-lg font-bold mb-2">الموقع</h2>
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
        <section className="section-padding bg-section-alt">
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
              <p className="text-xs mt-4 text-center" style={{ color: "rgba(10,25,47,0.4)" }}>* المعاينات الميدانية تتطلب حجز مسبق</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
