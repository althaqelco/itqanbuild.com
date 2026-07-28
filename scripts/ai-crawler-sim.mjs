// AI Crawler / Agent Simulator — fetches the LIVE site with each bot's real
// User-Agent string and reports what that bot would actually receive.
// Critical: most AI crawlers do NOT execute JavaScript, so we assert that the
// content, JSON-LD and speakable markers exist in the RAW server HTML.

const BASE = "https://itqanbuild.com";

// Real, current UA strings as published by each operator.
const BOTS = [
  // ── OpenAI / ChatGPT ──
  ["GPTBot", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot", "OpenAI · فهرسة/تدريب"],
  ["OAI-SearchBot", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot", "OpenAI · بحث ChatGPT"],
  ["ChatGPT-User", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot", "ChatGPT · جلب حيّ (لحظة الاستشهاد)"],
  // ── Google (AI Overviews / Gemini) ──
  ["Googlebot", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Google · الفهرسة الأساسية"],
  ["Google-Extended", "Mozilla/5.0 (compatible; Google-Extended/1.0; +http://www.google.com/bot.html)", "Google · Gemini/AI Overviews"],
  ["Google-CloudVertexBot", "Mozilla/5.0 (compatible; Google-CloudVertexBot/1.0; +http://www.google.com/bot.html)", "Google · تأريض Vertex"],
  // ── Anthropic / Claude ──
  ["ClaudeBot", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ClaudeBot/1.0; +claudebot@anthropic.com", "Anthropic · فهرسة"],
  ["Claude-User", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Claude-User/1.0; +Claude-User@anthropic.com", "Claude · جلب حيّ"],
  ["Claude-SearchBot", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com", "Claude · بحث"],
  // ── Perplexity ──
  ["PerplexityBot", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot", "Perplexity · فهرسة"],
  ["Perplexity-User", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user", "Perplexity · جلب حيّ"],
  // ── Apple / Microsoft / Meta / Amazon ──
  ["Applebot", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)", "Apple · Siri/Spotlight"],
  ["bingbot", "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)", "Microsoft · Bing/Copilot"],
  ["meta-externalagent", "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)", "Meta AI"],
  ["Amazonbot", "Mozilla/5.0 (Linux; like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/  Mobile Safari/537.36 (compatible; Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot)", "Amazon · Alexa"],
  // ── Others ──
  ["MistralAI-User", "MistralAI-User/1.0", "Mistral · جلب حيّ"],
  ["DuckAssistBot", "Mozilla/5.0 (compatible; DuckAssistBot/1.0; +https://duckduckgo.com/duckassistbot)", "DuckDuckGo AI"],
  ["CCBot", "CCBot/2.0 (https://commoncrawl.org/faq/)", "Common Crawl (مصدر تدريب واسع)"],
];

// Pages that matter most for citation
const PAGES = [
  ["/", "الرئيسية"],
  ["/jeddah/binaa", "صفحة خدمة"],
  ["/blog/villa-build-cost-jeddah", "مقالة تكلفة"],
  ["/prices", "الأسعار"],
  ["/llms.txt", "llms.txt"],
  ["/llms-full.txt", "llms-full.txt"],
];

const TIMEOUT = 20000;

async function fetchAs(url, ua) {
  const t0 = Date.now();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": ua, "Accept-Language": "ar,en;q=0.8" },
      redirect: "follow",
      signal: ctrl.signal,
    });
    const body = await res.text();
    return {
      status: res.status,
      ms: Date.now() - t0,
      type: (res.headers.get("content-type") || "").split(";")[0],
      size: body.length,
      body,
      server: res.headers.get("server") || "",
      xrobots: res.headers.get("x-robots-tag") || "",
    };
  } catch (e) {
    return { status: 0, ms: Date.now() - t0, error: e.name === "AbortError" ? "TIMEOUT" : e.message, body: "" };
  } finally {
    clearTimeout(timer);
  }
}

// Does the RAW html (no JS) already contain the substance a bot needs?
function analyze(html) {
  const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  let valid = 0;
  const types = new Set();
  for (const m of ld) {
    try {
      const j = JSON.parse(m[1]);
      valid++;
      for (const n of j["@graph"] || [j]) {
        const t = n["@type"];
        (Array.isArray(t) ? t : [t]).forEach((x) => x && types.add(x));
      }
    } catch {}
  }
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    ldValid: valid,
    ldTotal: ld.length,
    types: [...types],
    h1: (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ""])[1].replace(/<[^>]+>/g, "").trim().slice(0, 60),
    speakable: /SpeakableSpecification/.test(html),
    faqAnswers: (html.match(/class="[^"]*faq-answer[^"]*"/g) || []).length,
    faqPage: /"FAQPage"/.test(html),
    llmsLink: /href="\/llms\.txt"/.test(html),
    noindex: /<meta[^>]+name="robots"[^>]+noindex/i.test(html),
    words: text.split(" ").length,
  };
}

console.log("═".repeat(78));
console.log("  محاكي زحف عناكب ووكلاء الذكاء الاصطناعي — " + BASE);
console.log("═".repeat(78));

// ── PHASE 1: every bot hits the homepage ──
console.log("\n▐ المرحلة ١: وصول كل وكيل إلى الصفحة الرئيسية (HTML خام، بلا JS)\n");
console.log(
  "WKL".padEnd(23) + "HTTP".padEnd(6) + "ms".padEnd(7) + "KB".padEnd(7) + "JSON-LD".padEnd(9) + "كلمات".padEnd(8) + "H1"
);
console.log("─".repeat(78));

const results = [];
for (const [name, ua, role] of BOTS) {
  const r = await fetchAs(BASE + "/", ua);
  const a = r.body ? analyze(r.body) : null;
  results.push({ name, role, r, a });
  const ok = r.status === 200;
  console.log(
    name.padEnd(23) +
      String(r.status || r.error).padEnd(6) +
      String(r.ms).padEnd(7) +
      String(Math.round((r.size || 0) / 1024)).padEnd(7) +
      (a ? `${a.ldValid}/${a.ldTotal}` : "-").padEnd(9) +
      String(a ? a.words : "-").padEnd(8) +
      (ok && a ? a.h1 : "❌ " + (r.error || "")).slice(0, 30)
  );
}

// ── PHASE 2: one representative bot across all key pages ──
console.log("\n▐ المرحلة ٢: GPTBot عبر الصفحات المفتاحية\n");
console.log("الصفحة".padEnd(22) + "HTTP".padEnd(6) + "النوع".padEnd(13) + "KB".padEnd(6) + "JSON-LD".padEnd(9) + "speakable".padEnd(11) + "FAQ");
console.log("─".repeat(78));
const gptUA = BOTS[0][1];
const pageResults = [];
for (const [path, label] of PAGES) {
  const r = await fetchAs(BASE + path, gptUA);
  const isTxt = path.endsWith(".txt");
  const a = !isTxt && r.body ? analyze(r.body) : null;
  pageResults.push({ path, label, r, a, isTxt });
  console.log(
    label.padEnd(22) +
      String(r.status || r.error).padEnd(6) +
      (r.type || "-").padEnd(13) +
      String(Math.round((r.size || 0) / 1024)).padEnd(6) +
      (a ? `${a.ldValid}/${a.ldTotal}` : "—").padEnd(9) +
      (a ? (a.speakable ? "✅" : "❌") : "—").padEnd(11) +
      (a ? a.faqAnswers : "—")
  );
}

// ── PHASE 3: robots.txt compliance ──
console.log("\n▐ المرحلة ٣: تطابق robots.txt مع الوكلاء\n");
const robots = await fetchAs(BASE + "/robots.txt", gptUA);
const declared = [...robots.body.matchAll(/User-Agent:\s*(\S+)/gi)].map((m) => m[1]);
const missing = BOTS.map((b) => b[0]).filter(
  (n) => !declared.some((d) => d.toLowerCase() === n.toLowerCase()) && !["Googlebot", "bingbot"].includes(n)
);
console.log(`  robots.txt: HTTP ${robots.status} · وكلاء معلنون: ${declared.length}`);
console.log(`  مسموح للجميع عبر "*": ${/User-Agent:\s*\*/i.test(robots.body) && /Allow:\s*\//.test(robots.body) ? "نعم ✅" : "لا ❌"}`);
console.log(`  Sitemap معلن: ${/Sitemap:/i.test(robots.body) ? "نعم ✅" : "لا ❌"}`);
console.log(`  وكلاء مختبَرون بلا إعلان صريح: ${missing.length ? missing.join(", ") : "لا شيء ✅"}`);

// ── SUMMARY ──
const okCount = results.filter((x) => x.r.status === 200).length;
const blocked = results.filter((x) => x.r.status !== 200);
const home = results.find((x) => x.a)?.a;
console.log("\n" + "═".repeat(78));
console.log("  الخلاصة");
console.log("═".repeat(78));
console.log(`  وكلاء نجحوا (200): ${okCount}/${BOTS.length}`);
if (blocked.length) console.log(`  ⚠ محجوبون/فشلوا: ${blocked.map((b) => `${b.name}(${b.r.status || b.r.error})`).join(", ")}`);
console.log(`  متوسط الاستجابة: ${Math.round(results.reduce((s, x) => s + x.r.ms, 0) / results.length)} ms`);
if (home) {
  console.log(`  المحتوى في HTML الخام بلا JS: ${home.words} كلمة ✅ (العناكب لا تنفّذ JS)`);
  console.log(`  أنواع Schema على الرئيسية: ${home.types.join(", ")}`);
  console.log(`  speakable=${home.speakable ? "✅" : "❌"} · faq-answer=${home.faqAnswers} · FAQPage=${home.faqPage ? "✅" : "❌"} · llms-link=${home.llmsLink ? "✅" : "❌"} · noindex=${home.noindex ? "⚠ نعم" : "لا ✅"}`);
}
const pagesOk = pageResults.filter((p) => p.r.status === 200).length;
console.log(`  صفحات مفتاحية متاحة: ${pagesOk}/${PAGES.length}`);
console.log("═".repeat(78));
