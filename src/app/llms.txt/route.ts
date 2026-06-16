// /llms.txt — curated index for AI search engines (llmstxt.org convention).
// Generated from the live data so service/district/blog links can never drift.
import {
  SITE,
  SERVICES_LIST,
  DISTRICTS_LIST,
  SERVICE_PRICE_RANGE,
  LAST_CONTENT_UPDATE,
} from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";

export const dynamic = "force-static";

export function GET() {
  const u = SITE.url;
  const L: string[] = [];

  L.push(`# ${SITE.name} (${SITE.nameEn})`);
  L.push("");
  L.push(
    `> مقاول جدة المعتمد منذ ${SITE.foundedYear} — شركة مقاولات مرخّصة (سجل تجاري ${SITE.crNumber}، ` +
      `رقم ضريبي ${SITE.vatNumber}) متخصّصة في الترميم وبناء الفلل والعمارات والأسفلت والشبوك والهناجر ` +
      `والملاحق والتشطيبات في جميع أحياء جدة. ${SITE.yearsExperience}+ سنة خبرة، ` +
      `${SITE.projectsCompleted}+ مشروع منجز، ضمان مكتوب يصل إلى 10 سنوات. ` +
      `ساعات العمل: ${SITE.openingHours.display}. الهاتف/واتساب: ${SITE.phone}. الموقع: ${u}`
  );
  L.push("");

  L.push("## الخدمات (Services in Jeddah)");
  for (const s of SERVICES_LIST) {
    const p = SERVICE_PRICE_RANGE[s.key];
    const price = p ? ` — ${p.low}–${p.high} ${s.priceUnit}` : " — حسب المشروع";
    L.push(`- [${s.h1.split("—")[0].trim()}](${u}/jeddah/${s.slug}): ${s.tldr.scope}${price}`);
  }
  L.push("");

  L.push("## مناطق الخدمة (Service Districts in Jeddah)");
  for (const d of DISTRICTS_LIST) {
    const label = d.name.includes("جدة") ? `مقاول ${d.name}` : `مقاول ${d.name} جدة`;
    L.push(`- [${label}](${u}/jeddah/${d.slug}): ${d.projectsCount}+ مشروع — ${d.soilNote}`);
  }
  L.push("");

  L.push("## الأسعار والمشاريع (Pricing & Projects)");
  L.push(`- [أسعار المقاولات في جدة ٢٠٢٦ — جدول شامل](${u}/prices)`);
  L.push(`- [معرض المشاريع المنجزة](${u}/projects)`);
  L.push("");

  L.push("## أدلة المعرفة (Knowledge Guides)");
  for (const p of BLOG_POSTS.filter((b) => b.tier === "pillar")) {
    L.push(`- [${p.h1}](${u}/blog/${p.slug})`);
  }
  L.push("");

  L.push("## مراجع (References)");
  L.push(`- [من نحن — الترخيص والفريق الهندسي](${u}/about)`);
  L.push(`- [تواصل / طلب عرض سعر مجاني](${u}/contact)`);
  L.push(`- [المدونة — ${BLOG_POSTS.length} مقالة متخصّصة](${u}/blog)`);
  L.push(`- [النص الكامل للاستشهاد (llms-full)](${u}/llms-full.txt)`);
  L.push(`- [خريطة الموقع XML](${u}/sitemap.xml)`);
  L.push("");
  L.push(`<!-- آخر تحديث: ${LAST_CONTENT_UPDATE} · مُولّد لمحرّكات بحث الذكاء الاصطناعي (AEO) -->`);

  return new Response(L.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
