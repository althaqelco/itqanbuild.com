// ═══════════════════════════════════════════════════════════════════
// 🔗 Connected Schema — @graph JSON-LD Generator
// Outputs interconnected Knowledge Graph entities via @id pointers
// Organization → WebSite → LocalBusiness → Service → FAQPage
// ═══════════════════════════════════════════════════════════════════

import {
  SITE,
  SERVICE_TYPE_AR,
  SERVICE_PRICE_RANGE,
  LAST_CONTENT_UPDATE,
  type ServiceData,
} from "./constants";
import { TESTIMONIALS, calculateReviewStats } from "./testimonials";

const BASE_URL = SITE.url;

// Reusable Speakable block — marks the primary spoken regions for voice/AI assistants
const SPEAKABLE = {
  "@type": "SpeakableSpecification",
  cssSelector: ["h1", ".ai-tldr", ".faq-answer"],
};

// ─── Organization + LocalBusiness (Root Entity — Every Page) ───
export function generateOrganizationSchema() {
  return {
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": `${BASE_URL}/#organization`,
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: BASE_URL,
    description:
      "شركة مقاولات معتمدة في جدة منذ 2010 — بناء فلل وعمارات، ترميم، أسفلت، شبوك، هناجر، ملاحق، وتشطيبات بضمان مكتوب يصل إلى 10 سنوات.",
    slogan: SITE.tagline,
    knowsLanguage: ["ar", "en"],
    logo: {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#logo`,
      url: `${BASE_URL}${SITE.logo}`,
      width: 500,
      height: 400,
      caption: SITE.name,
    },
    image: [
      `${BASE_URL}/images/hero-contractor-jeddah.avif`,
      `${BASE_URL}/images/team-main-contractor-jeddah.avif`,
    ],
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    currenciesAccepted: "SAR",
    paymentAccepted: "تحويل بنكي، نقد، شيك مصدّق",
    hasMap: SITE.social.googleMaps,
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
        dayOfWeek: [...SITE.openingHours.days],
        opens: SITE.openingHours.opens,
        closes: SITE.openingHours.closes,
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer service",
        areaServed: "SA",
        availableLanguage: ["Arabic"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [...SITE.openingHours.days],
          opens: SITE.openingHours.opens,
          closes: SITE.openingHours.closes,
        },
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
        reviewCount: stats.totalReviews.toString(), // matches the reviews actually published on-page
      };
    })(),
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating.toString(),
        bestRating: "5",
      },
      author: { "@type": "Person", name: t.name },
      datePublished: t.date,
      reviewBody: t.text,
    })),
    foundingDate: SITE.foundedYear.toString(),
    foundingLocation: { "@type": "City", name: "جدة" },
    memberOf: {
      "@type": "Organization",
      name: "الغرفة التجارية الصناعية بجدة",
    },
    keywords:
      "مقاول جدة، مقاول ترميم جدة، مقاول بناء جدة، مقاول أسفلت جدة، شركة مقاولات جدة، تسليم مفتاح جدة",
    taxID: SITE.crNumber,
    vatID: SITE.vatNumber,
    numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
    // sameAs must point to profiles that describe THIS business — not generic
    // government portals (balady.gov.sa / muqawal.sa stay as on-page "verify us" links only).
    sameAs: [
      SITE.social.googleMaps,
      SITE.social.instagram,
      SITE.social.twitter,
    ],
  };
}

// ─── Engineer (Person Entity) ───
export function generateEngineerSchema() {
  return {
    "@type": "Person",
    "@id": `${BASE_URL}/#engineer`,
    name: "المهندس أحمد الحربي",
    givenName: "أحمد",
    familyName: "الحربي",
    honorificPrefix: "م.",
    jobTitle: "مدير المشاريع ورئيس القسم الفني",
    description:
      "مهندس مدني خريج جامعة الملك عبدالعزيز بخبرة تتجاوز 15 عاماً في قطاع المقاولات السعودي، أشرف على أكثر من 500 مشروع في جدة من الترميم إلى بناء الفلل والمشاريع التجارية.",
    knowsAbout: [
      "الهندسة المدنية",
      "مقاولات البناء",
      "ترميم المباني",
      "الكود السعودي للبناء",
      "إدارة المشاريع الإنشائية",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "جامعة الملك عبدالعزيز",
      sameAs: "https://www.kau.edu.sa",
    },
    knowsLanguage: ["ar", "en"],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "بكالوريوس الهندسة المدنية",
      educationalLevel: "Bachelor's Degree",
      about: "الهندسة المدنية",
      recognizedBy: {
        "@type": "EducationalOrganization",
        name: "جامعة الملك عبدالعزيز",
        sameAs: "https://www.kau.edu.sa",
      },
    },
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
    description: "مقاول جدة المعتمد — بناء، ترميم، أسفلت، شبوك، هناجر، ملاحق، تشطيبات.",
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "ar",
    // NOTE: potentialAction/SearchAction intentionally omitted — the site has no
    // on-site search endpoint; declaring a fake SearchAction violates Google's policy.
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
  faqs: { question: string; answer: string }[],
  process?: { step: string; desc: string }[]
) {
  const pageUrl = `${BASE_URL}/jeddah/${service.slug}`;
  const price = SERVICE_PRICE_RANGE[service.key];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: service.title,
        description: service.description,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${BASE_URL}${service.image}`,
        },
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
        inLanguage: "ar",
        datePublished: `${SITE.foundedYear}-01-01`,
        dateModified: LAST_CONTENT_UPDATE,
        lastReviewed: LAST_CONTENT_UPDATE,
        speakable: SPEAKABLE,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        serviceType: `مقاول ${SERVICE_TYPE_AR[service.key]}`,
        category: "خدمات المقاولات والبناء",
        name: service.h1,
        description: service.description,
        provider: { "@id": `${BASE_URL}/#organization` },
        brand: { "@id": `${BASE_URL}/#organization` },
        audience: {
          "@type": "Audience",
          audienceType: "ملاك العقارات والمستثمرون في جدة",
          geographicArea: { "@type": "City", name: "جدة" },
        },
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [...SITE.openingHours.days],
          opens: SITE.openingHours.opens,
          closes: SITE.openingHours.closes,
        },
        areaServed: {
          "@type": "City",
          name: "جدة",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "مكة المكرمة",
          },
        },
        ...(price
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "SAR",
                availability: "https://schema.org/InStock",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "SAR",
                  minPrice: price.low,
                  maxPrice: price.high,
                  unitText: service.priceUnit,
                },
              },
            }
          : {}),
        termsOfService: `ضمان ${service.tldr.warranty}`,
        image: `${BASE_URL}${service.image}`,
        mainEntityOfPage: { "@id": `${pageUrl}/#webpage` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "جدة", item: `${BASE_URL}/jeddah` },
          {
            "@type": "ListItem",
            position: 3,
            name: service.h1.split("—")[0].trim(),
            item: pageUrl,
          },
        ],
      },
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}/#faq`,
              isPartOf: { "@id": `${pageUrl}/#webpage` },
              inLanguage: "ar",
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
      ...(process && process.length > 0
        ? [
            {
              "@type": "HowTo",
              "@id": `${pageUrl}/#howto`,
              name: `مراحل تنفيذ ${service.h1.split("—")[0].trim()} في جدة`,
              description: `خطوات تنفيذ خدمة ${service.h1.split("—")[0].trim()} مع إتقان للمقاولات من المعاينة حتى التسليم.`,
              inLanguage: "ar",
              isPartOf: { "@id": `${pageUrl}/#webpage` },
              image: `${BASE_URL}${service.image}`,
              ...(price
                ? {
                    estimatedCost: {
                      "@type": "MonetaryAmount",
                      currency: "SAR",
                      minValue: price.low,
                      maxValue: price.high,
                    },
                  }
                : {}),
              step: process.map((p, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: p.step,
                text: p.desc,
                url: `${pageUrl}#step-${i + 1}`,
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
  description?: string;
  image?: string;
  faqs?: { question: string; answer: string }[];
}) {
  const pageUrl = `${BASE_URL}/jeddah/${district.slug}`;
  const faqs = district.faqs ?? [];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `مقاول ${district.name} جدة`,
        ...(district.description ? { description: district.description } : {}),
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
        ...(district.image
          ? {
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${BASE_URL}${district.image}`,
              },
            }
          : {}),
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
        inLanguage: "ar",
        dateModified: LAST_CONTENT_UPDATE,
        lastReviewed: LAST_CONTENT_UPDATE,
        speakable: SPEAKABLE,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        serviceType: "مقاولات عامة",
        category: "خدمات المقاولات والبناء",
        name: `خدمات مقاول ${district.name} جدة`,
        ...(district.description ? { description: district.description } : {}),
        provider: { "@id": `${BASE_URL}/#organization` },
        brand: { "@id": `${BASE_URL}/#organization` },
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [...SITE.openingHours.days],
          opens: SITE.openingHours.opens,
          closes: SITE.openingHours.closes,
        },
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
        ...(district.image ? { image: `${BASE_URL}${district.image}` } : {}),
        mainEntityOfPage: { "@id": `${pageUrl}/#webpage` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "جدة", item: `${BASE_URL}/jeddah` },
          { "@type": "ListItem", position: 3, name: district.name, item: pageUrl },
        ],
      },
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}/#faq`,
              isPartOf: { "@id": `${pageUrl}/#webpage` },
              inLanguage: "ar",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  };
}
