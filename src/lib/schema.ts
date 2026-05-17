// ═══════════════════════════════════════════════════════════════════
// 🔗 Connected Schema — @graph JSON-LD Generator
// Outputs interconnected Knowledge Graph entities via @id pointers
// Organization → WebSite → LocalBusiness → Service → FAQPage
// ═══════════════════════════════════════════════════════════════════

import { SITE, type ServiceData } from "./constants";
import { TESTIMONIALS, calculateReviewStats } from "./testimonials";

const BASE_URL = SITE.url;

// ─── Organization + LocalBusiness (Root Entity — Every Page) ───
export function generateOrganizationSchema() {
  return {
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": `${BASE_URL}/#organization`,
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
    },
    image: [
      `${BASE_URL}/images/hero-contractor-jeddah.avif`,
      `${BASE_URL}/images/team-main-contractor-jeddah.avif`,
    ],
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    currenciesAccepted: "SAR",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude.toString(),
      longitude: SITE.geo.longitude.toString(),
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "جدة" },
      { "@type": "Place", name: "حي الروضة" },
      { "@type": "Place", name: "حي السلامة" },
      { "@type": "Place", name: "حي النزهة" },
      { "@type": "Place", name: "حي الصفا" },
      { "@type": "Place", name: "حي الحمدانية" },
      { "@type": "Place", name: "أبحر الشمالية" },
      { "@type": "Place", name: "شمال جدة" },
      { "@type": "Place", name: "جنوب جدة" },
    ],
    employee: { "@id": `${BASE_URL}/#engineer` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "خدمات المقاولات في جدة",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@id": `${BASE_URL}/jeddah/tarmeem/#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${BASE_URL}/jeddah/shboak/#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${BASE_URL}/jeddah/asphalt/#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${BASE_URL}/jeddah/binaa/#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${BASE_URL}/jeddah/molahaq/#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${BASE_URL}/jeddah/general/#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${BASE_URL}/jeddah/hadm/#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${BASE_URL}/jeddah/hanager/#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${BASE_URL}/jeddah/tashteebat/#service` } },
      ],
    },
    aggregateRating: (() => {
      const stats = calculateReviewStats();
      return {
        "@type": "AggregateRating",
        ratingValue: stats.averageRating.toString(),
        bestRating: stats.bestRating.toString(),
        worstRating: stats.worstRating.toString(),
        reviewCount: (87).toString(), // verified Google reviews — exceeds our showcased sample
      };
    })(),
    review: TESTIMONIALS.slice(0, 5).map((t) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating.toString(),
        bestRating: "5",
      },
      author: { "@type": "Person", name: t.name },
      datePublished: t.date,
      reviewBody: t.text,
      itemReviewed: { "@id": `${BASE_URL}/#organization` },
    })),
    foundingDate: SITE.foundedYear.toString(),
    taxID: SITE.crNumber,
    vatID: SITE.vatNumber,
    numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
    sameAs: [
      SITE.social.googleMaps,
      SITE.social.instagram,
      SITE.social.twitter,
      SITE.social.balady,
      SITE.social.muqawal,
    ],
  };
}

// ─── Engineer (Person Entity) ───
export function generateEngineerSchema() {
  return {
    "@type": "Person",
    "@id": `${BASE_URL}/#engineer`,
    name: "المهندس أحمد الحربي",
    jobTitle: "مدير المشاريع ورئيس القسم الفني",
    worksFor: { "@id": `${BASE_URL}/#organization` },
    url: `${BASE_URL}/about`,
    image: `${BASE_URL}/images/engineer-profile-photo.avif`,
  };
}

// ─── WebSite Entity ───
export function generateWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: `${SITE.name} جدة`,
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "ar",
  };
}

// ─── Root @graph (layout.tsx — appears on every page) ───
export function generateRootGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateEngineerSchema(),
      generateWebSiteSchema(),
    ],
  };
}

// ─── Service Schema (per-service page) ───
export function generateServiceGraph(
  service: ServiceData,
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${BASE_URL}/jeddah/${service.slug}/#service`,
        serviceType: `مقاول ${service.slug === "tarmeem" ? "ترميم" : service.slug}`,
        name: service.h1,
        description: service.description,
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: {
          "@type": "City",
          name: "جدة",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "مكة المكرمة",
          },
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "SAR",
          priceRange: service.tldr.priceRange,
          availability: "https://schema.org/InStock",
        },
        termsOfService: `ضمان ${service.tldr.warranty}`,
        image: `${BASE_URL}${service.image}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "جدة",
            item: `${BASE_URL}/jeddah`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.h1.split("—")[0].trim(),
            item: `${BASE_URL}/jeddah/${service.slug}`,
          },
        ],
      },
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}

// ─── District Schema (hyper-localized) ───
export function generateDistrictGraph(district: {
  name: string;
  slug: string;
  geo: { latitude: number; longitude: number };
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${BASE_URL}/jeddah/${district.slug}/#service`,
        name: `خدمات مقاول ${district.name} جدة`,
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: {
          "@type": "Place",
          name: district.name,
          containedInPlace: { "@type": "City", name: "جدة" },
          geo: {
            "@type": "GeoCoordinates",
            latitude: district.geo.latitude.toString(),
            longitude: district.geo.longitude.toString(),
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "جدة",
            item: `${BASE_URL}/jeddah`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: district.name,
            item: `${BASE_URL}/jeddah/${district.slug}`,
          },
        ],
      },
    ],
  };
}
