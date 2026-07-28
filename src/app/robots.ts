import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // NEVER block /_next/ — Googlebot needs /_next/static (JS/CSS) to render
        // and /_next/image to fetch & index every on-page optimized image.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        // Explicitly opt into AI-search citation (AEO) — we WANT to be cited.
        // Covers training/indexing bots AND live "user-triggered fetch" agents
        // (ChatGPT-User, Perplexity-User, MistralAI-User) that retrieve a page
        // in real time to answer a question — those are the citation moments.
        userAgent: [
          // OpenAI / ChatGPT
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          // Google (AI Overviews / Gemini grounding)
          "Google-Extended",
          "Google-CloudVertexBot",
          // Anthropic / Claude
          "ClaudeBot",
          "Claude-Web",
          "Claude-User",
          "Claude-SearchBot",
          "anthropic-ai",
          // Perplexity
          "PerplexityBot",
          "Perplexity-User",
          // Apple / Microsoft / Meta / Amazon
          "Applebot",
          "Applebot-Extended",
          "meta-externalagent",
          "FacebookBot",
          "Amazonbot",
          // Other AI answer engines & datasets
          "MistralAI-User",
          "cohere-ai",
          "DuckAssistBot",
          "YouBot",
          "Bytespider",
          "Diffbot",
          "Timpibot",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
