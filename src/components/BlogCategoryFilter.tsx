"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Filter } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

interface BlogCategoryFilterProps {
  allPosts: BlogPost[];
  categories: { name: string; count: number }[];
  featured: BlogPost;
}

/**
 * BlogCategoryFilter — interactive category filtering
 * Pure client-side filter (no network calls)
 * INP-safe: useMemo prevents re-computation
 */
export default function BlogCategoryFilter({
  allPosts,
  categories,
  featured,
}: BlogCategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    const list = allPosts.slice(1); // skip featured
    if (!activeCategory) return list;
    return list.filter((p) => p.category === activeCategory);
  }, [activeCategory, allPosts]);

  return (
    <>
      {/* Featured Article — only when no filter */}
      {!activeCategory && (
        <Link
          href={`/blog/${featured.slug}`}
          className="glass-card block overflow-hidden group mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-56 md:h-72 overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <span
                className="absolute top-3 end-3 px-2.5 py-1 rounded-full text-[11px] font-bold"
                style={{
                  background: "var(--color-gold)",
                  color: "var(--color-navy-dark)",
                }}
              >
                مقال مميز
              </span>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span
                className="text-[11px] font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "var(--color-gold-dark)" }}
              >
                {featured.category}
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold mb-3 leading-snug group-hover:text-[var(--color-gold-dark)] transition-colors">
                {featured.h1}
              </h2>
              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ color: "rgba(10,25,47,0.6)" }}
              >
                {featured.description}
              </p>
              <div
                className="flex items-center gap-4 text-xs"
                style={{ color: "rgba(10,25,47,0.4)" }}
              >
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {featured.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {featured.readTime}
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold"
          style={{ color: "rgba(10,25,47,0.6)" }}
        >
          <Filter className="w-3.5 h-3.5" />
          تصفية:
        </span>
        <CategoryButton
          label="الكل"
          count={allPosts.length}
          active={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        />
        {categories.map((cat) => (
          <CategoryButton
            key={cat.name}
            label={cat.name}
            count={cat.count}
            active={activeCategory === cat.name}
            onClick={() => setActiveCategory(cat.name)}
          />
        ))}
      </div>

      {/* Filtered Results */}
      <div className="mb-3">
        <h2 className="text-lg font-bold">
          {activeCategory ? `مقالات: ${activeCategory}` : "جميع المقالات"}
          <span
            className="text-sm font-normal ms-2"
            style={{ color: "rgba(10,25,47,0.5)" }}
          >
            ({filteredPosts.length} مقالة)
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card overflow-hidden group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
              {post.tier === "pillar" && (
                <span
                  className="absolute top-2 end-2 px-2 py-0.5 rounded-full text-[9px] font-bold"
                  style={{
                    background: "rgba(212,175,55,0.95)",
                    color: "var(--color-navy-dark)",
                  }}
                >
                  دليل شامل
                </span>
              )}
            </div>
            <div className="p-4">
              <span
                className="text-[10px] font-semibold tracking-wider"
                style={{ color: "var(--color-gold-dark)" }}
              >
                {post.category}
              </span>
              <h3 className="text-[0.9rem] font-bold mt-1.5 mb-2 leading-relaxed group-hover:text-[var(--color-gold-dark)] transition-colors">
                {post.h1}
              </h3>
              <div
                className="flex items-center justify-between text-[11px]"
                style={{ color: "rgba(10,25,47,0.4)" }}
              >
                <div className="flex items-center gap-3">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <span
                  className="flex items-center gap-0.5 font-semibold"
                  style={{ color: "var(--color-gold-dark)" }}
                >
                  اقرأ <ArrowLeft className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div
          className="text-center py-12 rounded-2xl"
          style={{
            background: "rgba(10,25,47,0.02)",
            color: "rgba(10,25,47,0.5)",
          }}
        >
          لا توجد مقالات في هذا التصنيف حالياً
        </div>
      )}
    </>
  );
}

function CategoryButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
      style={{
        background: active
          ? "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))"
          : "rgba(10,25,47,0.04)",
        color: active ? "var(--color-navy-dark)" : "rgba(10,25,47,0.7)",
        border: active
          ? "1px solid transparent"
          : "1px solid rgba(10,25,47,0.06)",
      }}
    >
      {label}
      <span
        className="text-[10px] px-1.5 py-0.5 rounded-full"
        style={{
          background: active
            ? "rgba(10,25,47,0.15)"
            : "rgba(10,25,47,0.06)",
          color: active ? "var(--color-navy-dark)" : "rgba(10,25,47,0.5)",
        }}
      >
        {count}
      </span>
    </button>
  );
}
