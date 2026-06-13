import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Phone, CheckCircle, AlertTriangle, Shield, ClipboardList } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AITLDRBox from "@/components/AITLDRBox";

const CostCalculator = dynamic(
  () => import("@/components/CostCalculator"),
  { loading: () => <div className="skeleton h-96 rounded-3xl" /> }
);
import {
  SITE,
  SERVICES,
  DISTRICTS_LIST,
  WHATSAPP_URL,
  type ServiceKey,
} from "@/lib/constants";
import { generateServiceGraph } from "@/lib/schema";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { BLOG_POSTS, BLOG_POST_SERVICE } from "@/lib/blog-data";
import { notFound } from "next/navigation";

export default function ServicePageView({ slug }: { slug: string }) {
  const svc = SERVICES[slug as ServiceKey]!;
  const content = SERVICE_CONTENT[slug];
  if (!content) notFound();

  const schema = generateServiceGraph(svc, content.faqs);
  const related = content.relatedKeys.map((k) => SERVICES[k]).filter(Boolean);
  // Topically-matched articles → links from the money page into the content cluster
  const relatedPosts = BLOG_POSTS.filter(
    (p) => BLOG_POST_SERVICE[p.slug] === svc.key
  ).slice(0, 3);

  return (
    <>
      <Header />
      <main id="main">
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
            quality={75}
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

        {/* DETAILED CONTENT — Deep Technical (NLP/Semantic) */}
        {content.detailedContent && content.detailedContent.length > 0 && (
          <section className="section-padding bg-section-alt">
            <div className="container-wide max-w-4xl">
              <span className="gold-accent" />
              <h2 className="text-xl md:text-2xl font-extrabold mb-6">معلومات تفصيلية عن {svc.h1.split("—")[0].trim()}</h2>
              <div className="space-y-4">
                {content.detailedContent.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(10,25,47,0.75)" }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PROCESS STEPS — E-E-A-T Experience Signal */}
        {content.process && content.process.length > 0 && (
          <section className="section-padding">
            <div className="container-wide max-w-4xl">
              <div className="text-center mb-10">
                <span className="gold-accent mx-auto" />
                <h2 className="text-2xl font-extrabold mb-3">مراحل التنفيذ</h2>
                <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>خطوات منهجية مدروسة — من المعاينة حتى التسليم</p>
              </div>
              <div className="space-y-4">
                {content.process.map((p, i) => (
                  <div key={i} className="glass-card p-5 flex items-start gap-4">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold" style={{ background: "rgba(212,175,55,0.1)", color: "var(--color-gold)" }}>
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold mb-1">{p.step}</h3>
                      <p className="text-sm" style={{ color: "rgba(10,25,47,0.65)" }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SAFETY & STANDARDS — YMYL + Trust Signals */}
        {((content.safetyNotes && content.safetyNotes.length > 0) || (content.standards && content.standards.length > 0)) && (
          <section className="section-padding bg-section-alt">
            <div className="container-wide max-w-4xl">
              <div className="mb-8">
                <span className="gold-accent" />
                <h2 className="text-xl md:text-2xl font-extrabold">السلامة والمعايير الفنية</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.safetyNotes && content.safetyNotes.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(231,76,60,0.08)", color: "var(--color-danger)" }}>
                        <AlertTriangle className="w-5 h-5" />
                      </span>
                      <h3 className="text-lg font-extrabold">إرشادات السلامة</h3>
                    </div>
                    <ul className="space-y-3">
                      {content.safetyNotes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(10,25,47,0.7)" }}>
                          <Shield className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--color-danger)" }} />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {content.standards && content.standards.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(212,175,55,0.08)", color: "var(--color-gold)" }}>
                        <ClipboardList className="w-5 h-5" />
                      </span>
                      <h3 className="text-lg font-extrabold">المعايير والمواصفات</h3>
                    </div>
                    <ul className="space-y-3">
                      {content.standards.map((std, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(10,25,47,0.7)" }}>
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
                          {std}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

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
                  مقاول {d.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* USEFUL ARTICLES — service → blog cluster links */}
        {relatedPosts.length > 0 && (
          <section className="section-padding bg-section-alt">
            <div className="container-wide">
              <div className="text-center mb-8">
                <span className="gold-accent mx-auto" />
                <h2 className="text-xl font-extrabold mb-3">
                  مقالات ودلائل مفيدة عن {svc.h1.split("—")[0].trim()}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="glass-card overflow-hidden group hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold leading-relaxed group-hover:text-[var(--color-gold)] transition-colors">
                        {p.h1}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
