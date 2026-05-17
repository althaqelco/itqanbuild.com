import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE, WHATSAPP_URL } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";
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
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      publishedTime: post.date,
      authors: [SITE.name],
      tags: [post.category, "مقاول جدة", "مقاولات السعودية"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.h1,
      description: post.description,
      images: [post.image],
    },
  };
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

    // Process inline bold markers
    const processBold = (text: string) => {
      const parts = text.split(/\*\*(.*?)\*\*/g);
      return parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      );
    };

    if (line.startsWith("## "))
      elements.push(<h2 key={key++}>{line.slice(3)}</h2>);
    else if (line.startsWith("### "))
      elements.push(<h3 key={key++}>{line.slice(4)}</h3>);
    else if (line.startsWith("- "))
      elements.push(<li key={key++}>{processBold(line.slice(2))}</li>);
    else
      elements.push(<p key={key++}>{processBold(line)}</p>);
  }
  if (inTable) flushTable();
  return elements;
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const content = POSTS_CONTENT[slug];
  if (!post || !content) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.h1,
    description: post.description,
    image: `${SITE.url}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/icons/logo.png` } },
  };

  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ paddingTop: "6.5rem", paddingBottom: "3rem" }}>
          <Image src={post.image} alt={post.imageAlt} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, rgba(6,15,31,0.92) 0%, rgba(10,25,47,0.82) 100%)" }} />
          <div className="relative z-10 container-wide px-4 md:px-6">
            <Link href="/blog" className="inline-flex items-center gap-1 text-[11px] mb-4 hover:opacity-100 transition-opacity" style={{ color: "rgba(248,246,240,0.45)" }}>
              <ArrowRight className="w-3 h-3" /> العودة للمدونة
            </Link>
            <span className="gold-accent" />
            <h1 className="text-2xl md:text-3xl font-extrabold mb-3 max-w-2xl leading-snug" style={{ color: "var(--color-pearl)" }}>
              {post.h1}
            </h1>
            <div className="flex items-center gap-3 text-[11px]" style={{ color: "rgba(248,246,240,0.4)" }}>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
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

            {/* CTA */}
            <div className="mt-10 p-5 rounded-xl text-center" style={{ background: "var(--color-navy)" }}>
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
