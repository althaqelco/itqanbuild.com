import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Cairo, Alexandria } from "next/font/google";
import { generateRootGraph } from "@/lib/schema";
import { SITE, DEFAULT_OG_IMAGE } from "@/lib/constants";
import GAListener from "@/components/GAListener";
import "./globals.css";

// ─── Arabic Fonts — locally hosted by next/font ───
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-primary",
  preload: true,
  fallback: ["Tajawal", "Noto Sans Arabic", "system-ui", "sans-serif"],
});

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
  preload: true,
  fallback: ["Tajawal", "system-ui", "sans-serif"],
});

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-G55B7C5N9L";

// ─── Global Metadata ───
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | مقاول جدة المعتمد — بناء · ترميم · شبوك · أسفلت`,
    template: `%s | ${SITE.name}`,
  },
  description:
    `مقاول جدة المرخص — خبرة ${SITE.yearsExperience}+ سنة | ${SITE.projectsCompleted}+ مشروع منجز | بناء فلل · ترميم منازل · شبوك · أسفلت · ملاحق · هناجر | ضمان مكتوب على جميع الأعمال | اتصل الآن`,
  keywords: [
    "مقاول جدة",
    "مقاول ترميم جدة",
    "مقاول شبوك جدة",
    "مقاول اسفلت جدة",
    "مقاول بناء جدة",
    "مقاول ملاحق جدة",
    "مقاول عام جدة",
    "مقاول هدم جدة",
    "مقاول هناجر جدة",
    "مقاول تشطيبات جدة",
    "شركة مقاولات جدة",
    "تسليم مفتاح جدة",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: SITE.url,
    siteName: SITE.name,
    title: `مقاول جدة المعتمد — بناء · ترميم · شبوك · أسفلت | ${SITE.name}`,
    description:
      `مقاول جدة المرخص — ${SITE.yearsExperience}+ سنة خبرة | بناء · ترميم · شبوك · أسفلت | ضمان مكتوب`,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${SITE.name} — مقاول جدة`,
      },
    ],
  },
  // Only the card TYPE here — title/description/image intentionally omitted so each
  // page's own openGraph cascades into the Twitter/X card (no stale generic cards).
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: SITE.url,
  },
  // verification: { google: "ADD_YOUR_CODE" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A192F",
};

// ─── Root Graph Schema ───
const rootGraphSchema = generateRootGraph();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${alexandria.variable}`}>
      <head>
        {/* Resource hints — shave DNS+TLS off the worker-loaded GA connection */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Connected @graph Schema — Every Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootGraphSchema),
          }}
        />

        {/* GA4 — standard afterInteractive load.
            (Partytown was removed: routing gtag through its web worker never
            forwarded GA4's /collect requests, so the property received ZERO data.
            Standard gtag reliably collects pageviews + custom events; GA's own
            payload is light and async, so main-thread/INP cost is negligible.) */}
        <Script
          id="gtag-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { send_page_view: true });
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-link">تخطّي إلى المحتوى</a>
        {children}
        <Suspense fallback={null}>
          <GAListener gaId={GA4_ID} />
        </Suspense>
      </body>
    </html>
  );
}
