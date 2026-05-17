import Link from "next/link";
import Image from "next/image";
import { SITE, SERVICES_LIST, DISTRICTS_LIST, WHATSAPP_URL } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock, Shield, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, var(--color-navy) 0%, var(--color-navy-dark) 100%)",
      }}
    >
      {/* Trust Bar */}
      <div
        className="py-6"
        style={{
          background: "rgba(212, 175, 55, 0.06)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
        }}
      >
        <div className="container-wide px-4 md:px-6 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <TrustItem icon={<Shield className="w-5 h-5" />} label="مرخص ومعتمد" />
          <TrustItem icon={<Award className="w-5 h-5" />} label={`${SITE.yearsExperience}+ سنة خبرة`} />
          <TrustItem icon={<Clock className="w-5 h-5" />} label="ضمان مكتوب" />
          <TrustItem
            icon={<span className="text-sm font-bold">⭐</span>}
            label="٤.٩ تقييم Google"
          />
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black"
                style={{
                  background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))",
                  color: "var(--color-navy-dark)",
                }}
              >
                م
              </div>
              <div>
                <span className="text-xl font-bold block" style={{ color: "var(--color-pearl)" }}>
                  {SITE.name}
                </span>
                <span className="text-xs" style={{ color: "var(--color-gold)" }}>
                  {SITE.nameEn}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(248, 246, 240, 0.6)" }}>
              شركة مقاولات معتمدة في جدة منذ {SITE.foundedYear}. نقدم خدمات البناء والترميم والشبوك
              والأسفلت والهناجر بأعلى معايير الجودة مع ضمان مكتوب على جميع الأعمال.
            </p>

            {/* Trust Badges */}
            <div className="flex gap-3">
              <Image
                src="/images/license-commercial-register.avif"
                alt="السجل التجاري — إتقان للمقاولات"
                width={56}
                height={56}
                className="rounded-lg opacity-80 hover:opacity-100 transition-opacity"
              />
              <Image
                src="/images/certificate-chamber-commerce.avif"
                alt="عضوية غرفة جدة التجارية"
                width={56}
                height={56}
                className="rounded-lg opacity-80 hover:opacity-100 transition-opacity"
              />
              <Image
                src="/images/balady-verified-screenshot.avif"
                alt="شاشة التحقق من منصة بلدي"
                width={56}
                height={56}
                className="rounded-lg opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-bold mb-6 tracking-wider" style={{ color: "var(--color-gold)" }}>
              خدماتنا
            </h3>
            <ul className="space-y-3">
              {SERVICES_LIST.map((s) => (
                <li key={s.key}>
                  <Link
                    href={`/jeddah/${s.slug}`}
                    className="text-sm transition-colors hover:text-[var(--color-gold)]"
                    style={{ color: "rgba(248, 246, 240, 0.6)" }}
                  >
                    {s.h1.split("—")[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Districts Links */}
          <div>
            <h3 className="text-sm font-bold mb-6 tracking-wider" style={{ color: "var(--color-gold)" }}>
              مناطق الخدمة
            </h3>
            <ul className="space-y-3">
              {DISTRICTS_LIST.map((d) => (
                <li key={d.key}>
                  <Link
                    href={`/jeddah/${d.slug}`}
                    className="text-sm transition-colors hover:text-[var(--color-gold)]"
                    style={{ color: "rgba(248, 246, 240, 0.6)" }}
                  >
                    مقاول {d.name} جدة
                  </Link>
                </li>
              ))}
            </ul>

            <h3
              className="text-sm font-bold mt-8 mb-4 tracking-wider"
              style={{ color: "var(--color-gold)" }}
            >
              روابط مهمة
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm transition-colors hover:text-[var(--color-gold)]"
                  style={{ color: "rgba(248, 246, 240, 0.6)" }}
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm transition-colors hover:text-[var(--color-gold)]"
                  style={{ color: "rgba(248, 246, 240, 0.6)" }}
                >
                  معرض أعمالنا
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm transition-colors hover:text-[var(--color-gold)]"
                  style={{ color: "rgba(248, 246, 240, 0.6)" }}
                >
                  المدونة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / NAP */}
          <div>
            <h3 className="text-sm font-bold mb-6 tracking-wider" style={{ color: "var(--color-gold)" }}>
              تواصل معنا
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-3 text-sm group"
                  style={{ color: "rgba(248, 246, 240, 0.7)" }}
                >
                  <Phone className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                  <span className="group-hover:text-[var(--color-gold)] transition-colors">
                    {SITE.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm group"
                  style={{ color: "rgba(248, 246, 240, 0.7)" }}
                >
                  <span className="text-[var(--color-whatsapp)] shrink-0">💬</span>
                  <span className="group-hover:text-[var(--color-whatsapp)] transition-colors">
                    تواصل عبر واتساب
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-sm group"
                  style={{ color: "rgba(248, 246, 240, 0.7)" }}
                >
                  <Mail className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                  <span className="group-hover:text-[var(--color-gold)] transition-colors">
                    {SITE.email}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{ color: "rgba(248, 246, 240, 0.7)" }}>
                <MapPin className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-1" />
                <span>
                  {SITE.address.street}، {SITE.address.district}
                  <br />
                  {SITE.address.city}، {SITE.address.region}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: "rgba(248, 246, 240, 0.7)" }}>
                <Clock className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                <span>السبت – الخميس: ٨:٠٠ ص – ٥:٠٠ م</span>
              </li>
            </ul>

            {/* CR Number */}
            <div
              className="mt-6 p-3 rounded-lg text-xs"
              style={{
                background: "rgba(212, 175, 55, 0.06)",
                border: "1px solid rgba(212, 175, 55, 0.1)",
                color: "rgba(248, 246, 240, 0.5)",
              }}
            >
              سجل تجاري رقم: {SITE.crNumber}
              <br />
              <a
                href={SITE.social.balady}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-gold)] transition-colors"
              >
                التحقق عبر منصة بلدي ↗
              </a>
              {" · "}
              <a
                href={SITE.social.muqawal}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-gold)] transition-colors"
              >
                منصة مقاول ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="py-4"
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="container-wide px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(248, 246, 240, 0.35)" }}>
            © {new Date().getFullYear()} {SITE.name} — جميع الحقوق محفوظة | جدة، المملكة العربية السعودية
          </p>
          <p className="text-xs" style={{ color: "rgba(248, 246, 240, 0.25)" }}>
            نساهم في تحقيق رؤية المملكة ٢٠٣٠ 🇸🇦
          </p>
        </div>
      </div>
    </footer>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ color: "var(--color-gold)" }}>{icon}</span>
      <span className="text-sm font-medium" style={{ color: "rgba(248, 246, 240, 0.7)" }}>
        {label}
      </span>
    </div>
  );
}
