import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Phone, MapPin, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AITLDRBox from "@/components/AITLDRBox";

const CostCalculator = dynamic(
  () => import("@/components/CostCalculator"),
  { loading: () => <div className="skeleton h-96 rounded-3xl" /> }
);

import DistrictPolygonMap from "@/components/DistrictPolygonMap";
import {
  SITE,
  SERVICES,
  DISTRICTS,
  DISTRICTS_LIST,
  WHATSAPP_URL,
  type ServiceKey,
} from "@/lib/constants";
import { generateDistrictGraph } from "@/lib/schema";
import { DISTRICT_CONTENT } from "@/lib/district-content";
import { BLOG_POSTS } from "@/lib/blog-data";
import { notFound } from "next/navigation";

export default function DistrictPageView({ slug }: { slug: string }) {
  const dist = DISTRICTS[slug]!;
  const content = DISTRICT_CONTENT[slug];
  if (!content) notFound();

  const schema = generateDistrictGraph({
    name: dist.name,
    slug: dist.slug,
    geo: dist.geo,
    description: dist.description,
    image: dist.image,
    faqs: content.faqs,
  });

  const guides = BLOG_POSTS.filter((p) => p.tier === "pillar").slice(0, 3);

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
            src={dist.image}
            alt={dist.imageAlt}
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={60}
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
              <div className="mt-6 text-xs" style={{ color: "rgba(10,25,47,0.62)" }}>
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
                      className="faq-answer text-sm leading-relaxed"
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

        {/* USEFUL GUIDES — district → blog cluster links */}
        {guides.length > 0 && (
          <section className="section-padding bg-section-alt">
            <div className="container-wide">
              <div className="text-center mb-8">
                <span className="gold-accent mx-auto" />
                <h2 className="text-xl font-extrabold mb-3">أدلة مفيدة قبل أن تبدأ مشروعك</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {guides.map((p) => (
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
