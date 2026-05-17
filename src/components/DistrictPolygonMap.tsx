import { MapPin, Navigation } from "lucide-react";

interface DistrictPolygonMapProps {
  districtName: string;
  geo: { latitude: number; longitude: number };
  projectsCount: number;
  /** Embed iframe is lazy-loaded — does not block INP */
  zoom?: number;
}

/**
 * DistrictPolygonMap — Google Maps Embed (no JS API, no API key needed)
 * INP-safe: iframe with loading="lazy" — defers map JS until scroll-in-view
 * Polygon visualization via Google Maps Embed `q=` query (district name search)
 */
export default function DistrictPolygonMap({
  districtName,
  geo,
  projectsCount,
  zoom = 14,
}: DistrictPolygonMapProps) {
  const query = encodeURIComponent(`${districtName}، جدة، السعودية`);
  const embedSrc = `https://www.google.com/maps?q=${query}&hl=ar&z=${zoom}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${geo.latitude},${geo.longitude}`;

  return (
    <section
      className="rounded-3xl overflow-hidden"
      aria-label={`خريطة ${districtName}`}
      style={{
        background: "var(--color-pearl-warm)",
        border: "1px solid rgba(10,25,47,0.06)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between flex-wrap gap-3"
        style={{
          background: "rgba(212,175,55,0.05)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))",
              color: "var(--color-navy-dark)",
            }}
          >
            <MapPin className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base font-bold leading-tight">{districtName}</h3>
            <span className="text-[11px]" style={{ color: "var(--color-gold-dark)" }}>
              {projectsCount}+ مشروع منجز في هذه المنطقة
            </span>
          </div>
        </div>
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(10,25,47,0.04)",
            color: "var(--color-navy)",
          }}
        >
          <Navigation className="w-3 h-3" />
          الاتجاهات
        </a>
      </div>

      {/* Embed Map — lazy loaded for INP */}
      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          src={embedSrc}
          title={`خريطة ${districtName} — جدة`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full border-0"
          allow="geolocation"
        />
      </div>

      {/* Coordinates Footer */}
      <dl
        className="px-6 py-4 grid grid-cols-2 gap-2 text-xs"
        style={{ background: "rgba(10,25,47,0.02)", color: "rgba(10,25,47,0.6)" }}
      >
        <div>
          <dt className="font-semibold mb-0.5">خط العرض</dt>
          <dd dir="ltr">{geo.latitude.toFixed(4)}° N</dd>
        </div>
        <div>
          <dt className="font-semibold mb-0.5">خط الطول</dt>
          <dd dir="ltr">{geo.longitude.toFixed(4)}° E</dd>
        </div>
      </dl>
    </section>
  );
}
