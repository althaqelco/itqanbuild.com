import type { MetadataRoute } from "next";
import { SITE, SERVICES_LIST, DISTRICTS_LIST, LAST_CONTENT_UPDATE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  // Stable content-modified date — avoids a churning lastmod that resets every deploy
  const updated = LAST_CONTENT_UPDATE;

  const hero = `${base}/images/hero-contractor-jeddah.avif`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: updated, changeFrequency: "weekly", priority: 1.0, images: [hero] },
    { url: `${base}/jeddah`, lastModified: updated, changeFrequency: "weekly", priority: 0.9, images: [hero] },
    { url: `${base}/about`, lastModified: updated, changeFrequency: "monthly", priority: 0.7, images: [`${base}/images/team-main-contractor-jeddah.avif`] },
    { url: `${base}/contact`, lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: updated, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/prices`, lastModified: updated, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/projects`, lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Image-sitemap entries — surface every hero in Google Images (robots now allows /_next/).
  const servicePages: MetadataRoute.Sitemap = SERVICES_LIST.map((s) => ({
    url: `${base}/jeddah/${s.slug}`,
    lastModified: updated,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    images: [`${base}${s.image}`],
  }));

  const districtPages: MetadataRoute.Sitemap = DISTRICTS_LIST.map((d) => ({
    url: `${base}/jeddah/${d.slug}`,
    lastModified: updated,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: [`${base}${d.image}`],
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.dateModified ?? p.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [`${base}${p.image}`],
  }));

  return [...staticPages, ...servicePages, ...districtPages, ...blogPages];
}
