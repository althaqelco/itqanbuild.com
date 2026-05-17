import Link from "next/link";
import { ArrowLeft, Home, Phone, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE, SERVICES_LIST, WHATSAPP_URL } from "@/lib/constants";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative flex items-center justify-center"
          style={{
            paddingTop: "8rem",
            paddingBottom: "4rem",
            minHeight: "60vh",
            background:
              "linear-gradient(165deg, var(--color-navy-dark) 0%, var(--color-navy) 100%)",
          }}
        >
          <div className="container-wide text-center max-w-2xl px-4">
            <span
              className="block text-8xl font-extrabold mb-4"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              404
            </span>
            <h1
              className="text-2xl md:text-3xl font-extrabold mb-4"
              style={{ color: "var(--color-pearl)" }}
            >
              الصفحة غير موجودة
            </h1>
            <p
              className="text-sm mb-8 leading-relaxed"
              style={{ color: "rgba(248,246,240,0.55)" }}
            >
              عذراً، الصفحة التي تبحث عنها غير متاحة. ربما تم نقلها أو حذفها.
              يمكنك الاختيار من الخيارات أدناه أو البحث عن الخدمة المطلوبة.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href="/" className="btn-gold">
                <Home className="w-4 h-4" />
                الصفحة الرئيسية
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Phone className="w-4 h-4" />
                تواصل معنا
              </a>
            </div>

            {/* Services Quick Links */}
            <div
              className="rounded-2xl p-6 text-right"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,55,0.1)",
              }}
            >
              <h2
                className="text-sm font-bold mb-4 flex items-center gap-2"
                style={{ color: "var(--color-gold)" }}
              >
                <Search className="w-4 h-4" />
                هل تبحث عن إحدى خدماتنا؟
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES_LIST.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/jeddah/${s.slug}`}
                    className="block py-2.5 px-3 rounded-xl text-xs font-medium transition-all hover:-translate-y-0.5"
                    style={{
                      background: "rgba(212,175,55,0.06)",
                      border: "1px solid rgba(212,175,55,0.08)",
                      color: "var(--color-pearl)",
                    }}
                  >
                    {s.h1.split("—")[0].trim()}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust Signal */}
            <p
              className="text-xs mt-6"
              style={{ color: "rgba(248,246,240,0.3)" }}
            >
              {SITE.name} — سجل تجاري {SITE.crNumber} | مقاول جدة المعتمد
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
