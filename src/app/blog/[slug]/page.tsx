import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE, SERVICES, WHATSAPP_URL, toOgImage } from "@/lib/constants";
import { BLOG_POSTS, BLOG_POST_SERVICE } from "@/lib/blog-data";
import { POSTS_CONTENT } from "@/content/posts";

export const revalidate = 3600;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE.url}/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.h1,
      description: post.description,
      images: [
        {
          url: toOgImage(post.image),
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: post.imageAlt,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      authors: ["المهندس أحمد الحربي"],
      tags: [post.category, "مقاول جدة", "مقاولات السعودية"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.h1,
      description: post.description,
      images: [toOgImage(post.image)],
    },
  };
}

// Parse inline markdown: [label](url) links (internal → next/link) + **bold**
function processInline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const tokenRe = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*/g;
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      const label = m[1];
      const href = m[2];
      out.push(
        href.startsWith("/") ? (
          <Link key={i} href={href} className="article-link">
            {label}
          </Link>
        ) : (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="article-link">
            {label}
          </a>
        )
      );
    } else {
      out.push(<strong key={i}>{m[3]}</strong>);
    }
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function renderMarkdown(md: string) {
  const lines = md.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let inTable = false;
  let key = 0;

  function flushTable() {
    if (tableRows.length < 2) return;
    const header = tableRows[0];
    const body = tableRows.slice(2); // skip separator row
    elements.push(
      <div key={key++} className="overflow-x-auto my-4">
        <table>
          <thead>
            <tr>{header.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  }

  for (const line of lines) {
    if (line.startsWith("|")) {
      inTable = true;
      tableRows.push(line.split("|").filter(Boolean).map((c) => c.trim()));
      continue;
    }
    if (inTable) flushTable();
    if (!line.trim()) continue;

    if (line.startsWith("## "))
      elements.push(<h2 key={key++}>{processInline(line.slice(3))}</h2>);
    else if (line.startsWith("### ")) {
      const h3 = line.slice(4);
      // Short colon-terminated labels ("الوصف:", "العيوب:") are inline sublabels,
      // not section headings — render as bold paragraphs to avoid heading-outline bloat.
      const isLabel =
        /[:：]\s*$/.test(h3) && h3.replace(/[:：]\s*$/, "").trim().split(/\s+/).length <= 3;
      elements.push(
        isLabel ? (
          <p key={key++} className="font-bold mt-3 mb-1">{processInline(h3)}</p>
        ) : (
          <h3 key={key++}>{processInline(h3)}</h3>
        )
      );
    } else if (line.startsWith("- "))
      elements.push(<li key={key++}>{processInline(line.slice(2))}</li>);
    else
      elements.push(<p key={key++}>{processInline(line)}</p>);
  }
  if (inTable) flushTable();
  return elements;
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const content = POSTS_CONTENT[slug];
  if (!post || !content) notFound();

  // Category/tier-aware related posts (spreads link equity beyond the first 3 pillars)
  const related = [...BLOG_POSTS.filter((p) => p.slug !== slug)]
    .sort((a, b) => {
      const score = (p: (typeof BLOG_POSTS)[number]) =>
        (p.category === post.category ? 2 : 0) + (p.tier === post.tier ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, 3);

  // The commercial (money) page this article supports — for in-content internal linking
  const relatedService = SERVICES[BLOG_POST_SERVICE[slug]];

  const pageUrl = `${SITE.url}/blog/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: post.title,
        description: post.description,
        isPartOf: { "@id": `${SITE.url}/#website` },
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
        inLanguage: "ar",
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}/#article`,
        headline: post.h1,
        description: post.description,
        image: `${SITE.url}${toOgImage(post.image)}`,
        datePublished: post.date,
        dateModified: post.dateModified ?? post.date,
        inLanguage: "ar",
        articleSection: post.category,
        author: { "@id": `${SITE.url}/#engineer` },
        publisher: { "@id": `${SITE.url}/#organization` },
        isPartOf: { "@id": `${pageUrl}/#webpage` },
        mainEntityOfPage: { "@id": `${pageUrl}/#webpage` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "المدونة", item: `${SITE.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.h1, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ paddingTop: "6.5rem", paddingBottom: "3rem" }}>
          <Image src={post.image} alt={post.imageAlt} fill priority fetchPriority="high" quality={60} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, rgba(6,15,31,0.92) 0%, rgba(10,25,47,0.82) 100%)" }} />
          <div className="relative z-10 container-wide px-4 md:px-6">
            <Link href="/blog" className="inline-flex items-center gap-1 text-[11px] mb-4 hover:opacity-100 transition-opacity" style={{ color: "rgba(248,246,240,0.45)" }}>
              <ArrowRight className="w-3 h-3" /> العودة للمدونة
            </Link>
            <span className="gold-accent" />
            <h1 className="text-2xl md:text-3xl font-extrabold mb-3 max-w-2xl leading-snug" style={{ color: "var(--color-pearl)" }}>
              {post.h1}
            </h1>
            <div className="flex items-center gap-3 text-[11px]" style={{ color: "rgba(248,246,240,0.55)" }}>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.dateModified && post.dateModified !== post.date ? "آخر تحديث: " : "نُشر: "}
                <time dateTime={post.dateModified ?? post.date}>{post.dateModified ?? post.date}</time>
              </span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
              <span className="px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.15)", color: "var(--color-gold)" }}>
                {post.category}
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-wide" style={{ maxWidth: "720px" }}>
            <article className="prose-article">{renderMarkdown(content)}</article>

            {/* Related Service — contextual internal link to the money page */}
            {relatedService && (
              <Link
                href={`/jeddah/${relatedService.slug}`}
                className="mt-10 glass-card p-5 flex items-start gap-4 group hover:-translate-y-0.5 transition-all"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={relatedService.image} alt={relatedService.imageAlt} fill className="object-cover" sizes="80px" />
                </div>
                <div>
                  <span className="text-[11px]" style={{ color: "rgba(10,25,47,0.62)" }}>خدمة ذات صلة في جدة</span>
                  <h3 className="text-base font-bold mb-1 group-hover:text-[var(--color-gold-dark)] transition-colors">
                    {relatedService.h1.split("—")[0].trim()} ←
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(10,25,47,0.6)" }}>
                    {relatedService.tldr.scope} · {relatedService.tldr.priceRange}
                  </p>
                </div>
              </Link>
            )}

            {/* CTA */}
            <div className="mt-6 p-5 rounded-xl text-center" style={{ background: "var(--color-navy)" }}>
              <p className="text-base font-bold mb-3" style={{ color: "var(--color-pearl)" }}>هل تحتاج استشارة مجانية؟</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">تواصل عبر واتساب</a>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="section-padding bg-section-alt">
          <div className="container-wide">
            <h2 className="text-xl font-extrabold mb-6 text-center">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="glass-card overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-36 overflow-hidden">
                    <Image src={r.image} alt={r.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-[0.85rem] font-bold leading-relaxed">{r.h1}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
