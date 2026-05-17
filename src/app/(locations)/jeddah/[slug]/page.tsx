import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE,
  SERVICES,
  SERVICES_LIST,
  DISTRICTS,
  DISTRICTS_LIST,
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
        images: [{ url: svc.image, width: 1200, height: 630 }],
      },
    };
  }
  const dist = DISTRICTS[slug];
  if (dist) {
    return {
      title: `${dist.h1} — ${SITE.name}`,
      description: dist.description,
      alternates: { canonical: `${SITE.url}/jeddah/${slug}` },
      openGraph: {
        title: dist.h1,
        description: dist.description,
        images: [{ url: dist.image, width: 1200, height: 630 }],
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
