import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar, BookOpen, TrendingUp, MessageSquare, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BlogCategoryFilter from "@/components/BlogCategoryFilter";
import { SITE, WHATSAPP_URL } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `المدونة — ${SITE.name} | ${BLOG_POSTS.length} مقالة عن المقاولات في جدة`,
  description: `${BLOG_POSTS.length} مقالة متخصصة عن المقاولات في جدة — أدلة أسعار، مراحل البناء، أنواع الشبوك، الأساسات، العزل، المنزل الذكي، ونصائح اختيار المقاول.`,
  alternates: { canonical: `${SITE.url}/blog` },
};

// Blog index Schema
function blogSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE.url}/blog/#blog`,
        url: `${SITE.url}/blog`,
        name: `مدونة ${SITE.name}`,
        description: `${BLOG_POSTS.length} مقالة متخصصة في المقاولات بجدة`,
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: "ar",
        blogPost: BLOG_POSTS.slice(0, 10).map((p) => ({
          "@type": "BlogPosting",
          headline: p.h1,
          description: p.description,
          datePublished: p.date,
          author: { "@id": `${SITE.url}/#organization` },
          image: `${SITE.url}${p.image}`,
          url: `${SITE.url}/blog/${p.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "المدونة", item: `${SITE.url}/blog` },
        ],
      },
    ],
  };
}

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const pillars = BLOG_POSTS.filter((p) => p.tier === "pillar");
  const clusters = BLOG_POSTS.filter((p) => p.tier === "cluster");
  const faqs = BLOG_POSTS.filter((p) => p.tier === "faq");

  // Unique categories with counts
  const categories = Array.from(new Set(BLOG_POSTS.map((p) => p.category))).map(
    (cat) => ({ name: cat, count: BLOG_POSTS.filter((p) => p.category === cat).length })
  );

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema()) }}
        />

        {/* Hero */}
        <section className="page-hero">
          <div className="container-wide px-4 md:px-6">
            <span className="gold-accent mx-auto" />
            <h1 className="text-3xl md:text-4xl font-extrabold">مدونة إتقان</h1>
            <p>
              {BLOG_POSTS.length} مقالة متخصصة — أدلة، تقنيات، ومقارنات من فريقنا الهندسي
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 bg-section-alt">
          <div className="container-wide max-w-4xl px-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <BlogStat
                icon={<BookOpen className="w-5 h-5" />}
                value={pillars.length.toString()}
                label="أدلة شاملة"
              />
              <BlogStat
                icon={<TrendingUp className="w-5 h-5" />}
                value={clusters.length.toString()}
                label="مقارنات تقنية"
              />
              <BlogStat
                icon={<MessageSquare className="w-5 h-5" />}
                value={faqs.length.toString()}
                label="أسئلة شائعة"
              />
            </div>
          </div>
        </section>

        {/* Category Filter — Client component for interactive filtering */}
        <section className="section-padding">
          <div className="container-wide">
            <BlogCategoryFilter
              allPosts={BLOG_POSTS}
              categories={categories}
              featured={featured}
            />
          </div>
        </section>

        {/* Newsletter CTA */}
        <section
          className="section-padding text-center"
          style={{ background: "var(--color-navy)" }}
        >
          <div className="container-wide max-w-2xl">
            <BookOpen
              className="w-10 h-10 mx-auto mb-4"
              style={{ color: "var(--color-gold)" }}
            />
            <h2
              className="text-2xl md:text-3xl font-extrabold mb-4"
              style={{ color: "var(--color-pearl)" }}
            >
              هل لديك سؤال غير مذكور؟
            </h2>
            <p className="mb-6 text-sm" style={{ color: "rgba(248,246,240,0.5)" }}>
              فريقنا الهندسي جاهز للإجابة على أسئلتك التقنية والمشورة المجانية
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                اسأل عبر واتساب
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

function BlogStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 justify-center">
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "rgba(212,175,55,0.1)", color: "var(--color-gold-dark)" }}
      >
        {icon}
      </span>
      <div className="text-start">
        <span
          className="text-xl font-extrabold block leading-tight"
          style={{ color: "var(--color-navy)" }}
        >
          {value}
        </span>
        <span className="text-xs" style={{ color: "rgba(10,25,47,0.55)" }}>
          {label}
        </span>
      </div>
    </div>
  );
}
