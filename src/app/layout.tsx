import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cairo } from "next/font/google";
import { generateRootGraph } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import "./globals.css";

// ─── Arabic Font — Cairo (Google's official Arabic-first font, locally hosted by next/font) ───
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-primary",
  preload: true,
  fallback: ["Tajawal", "Noto Sans Arabic", "system-ui", "sans-serif"],
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
    "مقاول جدة المرخص — خبرة ١٥+ سنة | ٥٠٠+ مشروع منجز | بناء فلل · ترميم منازل · شبوك · أسفلت · ملاحق · هناجر | ضمان مكتوب على جميع الأعمال | اتصل الآن",
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
    title: `${SITE.name} | مقاول جدة المعتمد`,
    description:
      "مقاول جدة المرخص — ١٥+ سنة خبرة | بناء · ترميم · شبوك · أسفلت | ضمان مكتوب",
    images: [
      {
        url: "/images/og-image-default.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — مقاول جدة`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | مقاول جدة المعتمد`,
    description:
      "مقاول جدة المرخص — ١٥+ سنة خبرة | بناء · ترميم · شبوك · أسفلت | ضمان مكتوب",
    images: ["/images/og-image-default.png"],
  },
  alternates: {
    canonical: SITE.url,
  },
  verification: {
    google: "GOOGLE_VERIFICATION_CODE",
  },
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
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        {/* Connected @graph Schema — Every Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootGraphSchema),
          }}
        />

        {/* Partytown — moves heavy 3rd-party scripts to Web Worker (INP-safe) */}
        <Script
          id="partytown-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.partytown = {
                lib: "/~partytown/",
                forward: ["gtag", "dataLayer.push"],
              };
            `,
          }}
        />
        <Script
          id="partytown-script"
          strategy="beforeInteractive"
          src="/~partytown/partytown.js"
        />

        {/* GA4 via Partytown Worker — does NOT block Main Thread / INP */}
        <Script
          id="gtag-src"
          strategy="worker"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="worker"
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
      <body className={`${cairo.className} antialiased`}>{children}</body>
    </html>
  );
}
