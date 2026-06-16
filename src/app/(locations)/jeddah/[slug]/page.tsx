import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE,
  SERVICES,
  SERVICES_LIST,
  DISTRICTS,
  DISTRICTS_LIST,
  toOgImage,
  type ServiceKey,
} from "@/lib/constants";
import ServicePageView from "@/components/ServicePageView";
import DistrictPageView from "@/components/DistrictPageView";

export const revalidate = 3600;

// ─── Static Params for ISR — Services + Districts ───
export function generateStaticParams() {
  return [
    ...SERVICES_LIST.map((s) => ({ slug: s.slug })),
    ...DISTRICTS_LIST.map((d) => ({ slug: d.slug })),
  ];
}

// ─── Metadata ───
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES[slug as ServiceKey];
  if (svc) {
    return {
      title: svc.title,
      description: svc.description,
      alternates: { canonical: `${SITE.url}/jeddah/${slug}` },
      openGraph: {
        title: svc.h1,
        description: svc.description,
        url: `${SITE.url}/jeddah/${slug}`,
        images: [{ url: toOgImage(svc.image), width: 1200, height: 630, type: "image/jpeg" }],
      },
    };
  }
  const dist = DISTRICTS[slug];
  if (dist) {
    // Short, front-loaded title — the root template appends the brand exactly once.
    // Guard against double "جدة" when the district name already contains it (e.g. "شمال جدة").
    return {
      title: dist.name.includes("جدة") ? `مقاول ${dist.name}` : `مقاول ${dist.name} جدة`,
      description: dist.description,
      alternates: { canonical: `${SITE.url}/jeddah/${slug}` },
      openGraph: {
        title: dist.h1,
        description: dist.description,
        url: `${SITE.url}/jeddah/${slug}`,
        images: [{ url: toOgImage(dist.image), width: 1200, height: 630, type: "image/jpeg" }],
      },
    };
  }
  return {};
}

// ─── Router Page ───
export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (SERVICES[slug as ServiceKey]) return <ServicePageView slug={slug} />;
  if (DISTRICTS[slug]) return <DistrictPageView slug={slug} />;
  notFound();
}
