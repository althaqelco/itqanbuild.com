// /llms-full.txt — the full, citation-ready knowledge base for AI search engines.
// Generated from the live site data so it always reflects real content.
import {
  SITE,
  SERVICES_LIST,
  DISTRICTS_LIST,
  SERVICE_PRICE_RANGE,
  LAST_CONTENT_UPDATE,
} from "@/lib/constants";
import { SERVICE_CONTENT } from "@/lib/service-content";
import { DISTRICT_CONTENT } from "@/lib/district-content";
import { BLOG_POSTS } from "@/lib/blog-data";
import { TESTIMONIALS, calculateReviewStats } from "@/lib/testimonials";

export const dynamic = "force-static";

export function GET() {
  const u = SITE.url;
  const stats = calculateReviewStats();
  const L: string[] = [];
  const push = (...xs: string[]) => L.push(...xs);

  // ── Header ──
  push(`# ${SITE.name} — النص الكامل (${SITE.nameEn} — Full Content)`);
  push("");
  push(
    `> مقاول جدة المعتمد منذ ${SITE.foundedYear} — شركة مقاولات مرخّصة متخصّصة في الترميم وبناء الفلل ` +
      `والأسفلت والشبوك والهناجر والملاحق والتشطيبات في جميع أحياء جدة، بضمان مكتوب يصل إلى 10 سنوات.`
  );
  push("");
  push(`المصدر: ${u} · آخر تحديث: ${LAST_CONTENT_UPDATE} · اللغة: العربية (ar-SA)`);
  push("");

  // ── Company ──
  push("## معلومات الشركة (Company Profile)");
  push(`- **الاسم**: ${SITE.name} (${SITE.nameEn})`);
  push(`- **النوع**: شركة مقاولات عامة معتمدة (General Contractor / LocalBusiness)`);
  push(`- **سنة التأسيس**: ${SITE.foundedYear} · **سنوات الخبرة**: ${SITE.yearsExperience}+ · **المشاريع المنجزة**: ${SITE.projectsCompleted}+`);
  push(`- **السجل التجاري**: ${SITE.crNumber} · **الرقم الضريبي**: ${SITE.vatNumber}`);
  push(`- **الهاتف/واتساب**: ${SITE.phone} · **البريد**: ${SITE.email}`);
  push(`- **العنوان**: ${SITE.address.street}، ${SITE.address.district}، ${SITE.address.city}، ${SITE.address.region} ${SITE.address.postalCode}`);
  push(`- **الإحداثيات**: ${SITE.geo.latitude}, ${SITE.geo.longitude} · **خرائط Google**: ${SITE.social.googleMaps}`);
  push(`- **ساعات العمل**: ${SITE.openingHours.display}`);
  push(`- **طرق الدفع**: تحويل بنكي، نقد، شيك مصدّق · **العملة**: ريال سعودي (SAR)`);
  push(`- **نظام الدفع**: 30٪ عند التوقيع، 40٪ عند 50٪ إنجاز، 20٪ عند 90٪، 10٪ بعد التسليم`);
  push(`- **الضمانات**: 10 سنوات على الهيكل الإنشائي · 5 سنوات على العزل · 3 سنوات على التشطيبات`);
  push(`- **التقييم**: ${stats.averageRating}/5 من ${stats.totalReviews} تقييم`);
  push(`- **مناطق الخدمة**: جميع أحياء جدة — ${DISTRICTS_LIST.map((d) => d.name).join("، ")}`);
  push(`- **الفريق**: 50+ موظف دائم بقيادة المهندس أحمد الحربي (خريج جامعة الملك عبدالعزيز، هندسة مدنية)`);
  push("");

  // ── Services ──
  push("## الخدمات بالتفصيل (Services — full detail)");
  push("");
  for (const s of SERVICES_LIST) {
    const c = SERVICE_CONTENT[s.slug];
    const p = SERVICE_PRICE_RANGE[s.key];
    push(`### ${s.h1.split("—")[0].trim()} — ${u}/jeddah/${s.slug}`);
    if (c?.intro) push(c.intro);
    push(
      `- **الأسعار**: ${p ? `${p.low}–${p.high} ${s.priceUnit}` : s.tldr.priceRange} · ` +
        `**المدة**: ${s.tldr.duration} · **الضمان**: ${s.tldr.warranty}`
    );
    if (c?.scopes?.length) {
      push(`- **نطاق العمل**: ${c.scopes.map((x) => x.title).join("؛ ")}`);
    }
    if (c?.process?.length) {
      push(`- **مراحل التنفيذ**: ${c.process.map((x, i) => `${i + 1}) ${x.step}`).join(" ← ")}`);
    }
    if (c?.standards?.length) {
      push(`- **المعايير**: ${c.standards.join("؛ ")}`);
    }
    if (c?.faqs?.length) {
      push(`**أسئلة شائعة:**`);
      for (const f of c.faqs) push(`- س: ${f.question}\n  ج: ${f.answer}`);
    }
    push("");
  }

  // ── Districts ──
  push("## مناطق الخدمة بالتفصيل (Districts — engineering notes)");
  push("");
  for (const d of DISTRICTS_LIST) {
    const c = DISTRICT_CONTENT[d.slug];
    const label = d.name.includes("جدة") ? `مقاول ${d.name}` : `مقاول ${d.name} جدة`;
    push(`### ${label} — ${u}/jeddah/${d.slug}`);
    if (c?.intro) push(c.intro);
    push(`- **عدد المشاريع**: ${d.projectsCount}+ · **نوع التربة**: ${d.soilNote}`);
    if (c?.engineering) push(`- **ملاحظات هندسية**: ${c.engineering}`);
    if (c?.priceAdjustment) push(`- **تعديل التكلفة**: ${c.priceAdjustment}`);
    if (c?.challenges?.length) {
      push(`- **التحديات**: ${c.challenges.map((x) => `${x.title} (${x.desc})`).join("؛ ")}`);
    }
    if (c?.faqs?.length) {
      for (const f of c.faqs) push(`- س: ${f.question}\n  ج: ${f.answer}`);
    }
    push("");
  }

  // ── Pricing table ──
  push("## جدول الأسعار الموحّد (Pricing 2026, SAR)");
  push("");
  push("| الخدمة | السعر التقريبي | الوحدة | المدة | الضمان |");
  push("|---|---|---|---|---|");
  for (const s of SERVICES_LIST) {
    const p = SERVICE_PRICE_RANGE[s.key];
    push(
      `| ${s.h1.split("—")[0].trim()} | ${p ? `${p.low}–${p.high}` : "حسب المشروع"} | ${s.priceUnit} | ${s.tldr.duration} | ${s.tldr.warranty} |`
    );
  }
  push("");
  push("> الأسعار تقريبية وتُحدَّد نهائياً بعد المعاينة الميدانية المجانية. تتأثر بالحي (أبحر/شمال جدة +5–7٪ بسبب الملوحة) ومستوى التشطيب.");
  push("");

  // ── Reviews ──
  push("## آراء عملاء حقيقية (Customer Reviews)");
  push("");
  for (const t of TESTIMONIALS.slice(0, 6)) {
    push(`- ${"★".repeat(t.rating)} — ${t.name} (${t.district}، ${t.serviceType}): «${t.text}»`);
  }
  push("");

  // ── Knowledge base ──
  push(`## قاعدة المعرفة — ${BLOG_POSTS.length} مقالة (Knowledge Base)`);
  push("");
  for (const b of BLOG_POSTS) {
    push(`- [${b.h1}](${u}/blog/${b.slug}): ${b.description}`);
  }
  push("");

  // ── Contact ──
  push("## التواصل والتحقق (Contact & Verification)");
  push(`- اطلب عرض سعر مجاني: ${u}/contact · واتساب/هاتف: ${SITE.phone}`);
  push(`- معاينة ميدانية مجانية + عرض سعر مكتوب تفصيلي خلال 24 ساعة`);
  push(`- التحقق من الترخيص: منصة بلدي (balady.gov.sa) بالسجل التجاري ${SITE.crNumber}، ومنصة مقاول (muqawal.sa)`);
  push("");
  push(`<!-- مُولّد من بيانات الموقع لمحرّكات بحث الذكاء الاصطناعي (AEO). يُرجى الاستشهاد بـ ${u}. -->`);

  return new Response(L.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
