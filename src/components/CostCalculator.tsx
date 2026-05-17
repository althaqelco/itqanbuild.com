"use client";

import { useState, useMemo, useEffect } from "react";
import { Calculator, ArrowLeft } from "lucide-react";
import { WHATSAPP_URL, SITE } from "@/lib/constants";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// ─── Pricing Data (SAR per m²) ───
const SERVICE_PRICES: Record<string, Record<string, number>> = {
  tarmeem:     { eco: 200,  mid: 400,  luxury: 800,  vip: 1200 },
  binaa:       { eco: 1200, mid: 1700, luxury: 2500, vip: 3500 },
  shboak:      { eco: 30,   mid: 65,   luxury: 200,  vip: 400  },
  asphalt:     { eco: 40,   mid: 60,   luxury: 90,   vip: 120  },
  molahaq:     { eco: 900,  mid: 1200, luxury: 1600, vip: 2000 },
  hanager:     { eco: 280,  mid: 380,  luxury: 500,  vip: 650  },
  tashteebat:  { eco: 250,  mid: 500,  luxury: 900,  vip: 1400 },
  hadm:        { eco: 15,   mid: 25,   luxury: 40,   vip: 60   },
  general:     { eco: 1000, mid: 1500, luxury: 2200, vip: 3200 },
};

const SERVICE_LABELS: Record<string, string> = {
  tarmeem: "ترميم منازل",
  binaa: "بناء فلل وعمارات",
  shboak: "شبوك وأسوار",
  asphalt: "أسفلت وتبليط",
  molahaq: "ملاحق",
  hanager: "هناجر حديد",
  tashteebat: "تشطيبات ودهانات",
  hadm: "هدم مباني",
  general: "مقاولات عامة",
};

const FINISH_LABELS: Record<string, string> = {
  eco: "اقتصادي",
  mid: "متوسط",
  luxury: "فاخر",
  vip: "VIP — تسليم مفتاح",
};

const DISTRICT_MODIFIERS: Record<string, number> = {
  rawdah: 0,
  salamah: 0,
  nazha: 0,
  safa: 0,
  hamadaniyah: 2,
  north: 5,
  abhur: 7,
  south: 3,
  other: 0,
};

const DISTRICT_LABELS: Record<string, string> = {
  rawdah: "حي الروضة",
  salamah: "حي السلامة",
  nazha: "حي النزهة",
  safa: "حي الصفا",
  hamadaniyah: "حي الحمدانية",
  north: "شمال جدة / أبحر",
  abhur: "أبحر الشمالية",
  south: "جنوب جدة",
  other: "حي آخر",
};

const DURATION_MAP: Record<string, string> = {
  tarmeem: "أسبوع – ٣ أشهر",
  binaa: "٦ – ١٨ شهراً",
  shboak: "١ – ٧ أيام",
  asphalt: "يوم – ٣ أيام",
  molahaq: "٣ – ٨ أسابيع",
  hanager: "٧ – ٢١ يوماً",
  tashteebat: "أسبوعان – ٤ أشهر",
  hadm: "١ – ٧ أيام",
  general: "حسب المشروع",
};

export default function CostCalculator() {
  const [area, setArea] = useState(200);
  const [service, setService] = useState("tarmeem");
  const [finish, setFinish] = useState("mid");
  const [district, setDistrict] = useState("rawdah");

  const result = useMemo(() => {
    const basePrice = SERVICE_PRICES[service]?.[finish] ?? 0;
    const modifier = 1 + (DISTRICT_MODIFIERS[district] ?? 0) / 100;
    const pricePerM2 = Math.round(basePrice * modifier);
    const totalMin = Math.round(pricePerM2 * area * 0.85);
    const totalMax = Math.round(pricePerM2 * area * 1.15);
    return { pricePerM2, totalMin, totalMax };
  }, [area, service, finish, district]);

  // ─── GA4 NavBoost Signal: fires when user actively engages with calculator ───
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    const timer = setTimeout(() => {
      window.gtag?.("event", "calculator_used", {
        event_category: "Engagement",
        event_label: "cost_calculator",
        service_type: service,
        district,
        finish_level: finish,
        area_m2: area,
        estimated_min: result.totalMin,
        estimated_max: result.totalMax,
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [area, service, finish, district, result.totalMin, result.totalMax]);

  function trackQuoteRequest(channel: "whatsapp" | "phone") {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", "quote_request", {
      event_category: "Lead",
      event_label: `calculator_${channel}`,
      service_type: service,
      district,
      estimated_value: result.totalMax,
    });
  }

  const whatsappMsg = encodeURIComponent(
    `مرحباً، أريد عرض سعر لـ:\n` +
      `الخدمة: ${SERVICE_LABELS[service]}\n` +
      `المساحة: ${area} م²\n` +
      `التشطيب: ${FINISH_LABELS[finish]}\n` +
      `الحي: ${DISTRICT_LABELS[district]}\n` +
      `التقدير: ${result.totalMin.toLocaleString("ar-SA")} – ${result.totalMax.toLocaleString("ar-SA")} ريال`
  );

  return (
    <section
      className="rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%)",
        boxShadow: "0 8px 48px rgba(10, 25, 47, 0.2)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex items-center gap-3"
        style={{
          background: "rgba(212, 175, 55, 0.08)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.12)",
        }}
      >
        <Calculator className="w-5 h-5" style={{ color: "var(--color-gold)" }} />
        <h3 className="text-lg font-bold" style={{ color: "var(--color-pearl)" }}>
          حاسبة التكلفة التقريبية
        </h3>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Area Input */}
          <InputGroup label="مساحة المشروع (م²)">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={20}
                max={2000}
                step={10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                aria-label="مساحة المشروع بالمتر المربع"
                className="flex-1 accent-[var(--color-gold)]"
              />
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(Math.max(1, Number(e.target.value)))}
                aria-label="القيمة الرقمية للمساحة"
                className="w-20 text-center rounded-lg py-2 text-sm font-bold"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  color: "var(--color-gold)",
                }}
              />
            </div>
          </InputGroup>

          {/* Service Select */}
          <InputGroup label="نوع الخدمة">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              aria-label="نوع الخدمة المطلوبة"
              className="w-full rounded-lg py-2.5 px-3 text-sm"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "var(--color-pearl)",
              }}
            >
              {Object.entries(SERVICE_LABELS).map(([key, label]) => (
                <option key={key} value={key} style={{ background: "var(--color-navy)", color: "var(--color-pearl)" }}>
                  {label}
                </option>
              ))}
            </select>
          </InputGroup>

          {/* Finish Level */}
          <InputGroup label="مستوى التشطيب">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(FINISH_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFinish(key)}
                  className="py-2 px-3 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background:
                      finish === key
                        ? "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))"
                        : "rgba(255, 255, 255, 0.04)",
                    color: finish === key ? "var(--color-navy-dark)" : "rgba(248, 246, 240, 0.6)",
                    border:
                      finish === key
                        ? "1px solid transparent"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </InputGroup>

          {/* District Select */}
          <InputGroup label="الحي في جدة">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              aria-label="الحي في جدة"
              className="w-full rounded-lg py-2.5 px-3 text-sm"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "var(--color-pearl)",
              }}
            >
              {Object.entries(DISTRICT_LABELS).map(([key, label]) => (
                <option key={key} value={key} style={{ background: "var(--color-navy)", color: "var(--color-pearl)" }}>
                  {label}
                </option>
              ))}
            </select>
          </InputGroup>
        </div>

        {/* Results */}
        <div
          className="mt-8 p-6 rounded-2xl"
          style={{
            background: "rgba(212, 175, 55, 0.06)",
            border: "1px solid rgba(212, 175, 55, 0.15)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-6">
            <ResultCard
              label="سعر المتر"
              value={`${result.pricePerM2.toLocaleString("ar-SA")} ريال`}
            />
            <ResultCard
              label="التكلفة التقريبية"
              value={`${result.totalMin.toLocaleString("ar-SA")} – ${result.totalMax.toLocaleString("ar-SA")} ريال`}
              highlight
            />
            <ResultCard
              label="المدة المتوقعة"
              value={DURATION_MAP[service] || "حسب المشروع"}
            />
          </div>

          <p className="text-xs text-center mb-5" style={{ color: "rgba(248, 246, 240, 0.4)" }}>
            * الأسعار تقريبية وتخضع للمعاينة الفعلية — للحصول على عرض سعر دقيق تواصل معنا
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackQuoteRequest("whatsapp")}
              className="btn-gold justify-center"
            >
              احصل على عرض سعر دقيق
              <ArrowLeft className="w-4 h-4" />
            </a>
            <a
              href={`tel:${SITE.phone}`}
              onClick={() => trackQuoteRequest("phone")}
              className="btn-outline justify-center"
            >
              اتصل الآن — {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: "var(--color-gold)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="p-3 rounded-xl"
      style={{
        background: highlight ? "rgba(212, 175, 55, 0.1)" : "rgba(255, 255, 255, 0.03)",
      }}
    >
      <span className="text-xs block mb-1" style={{ color: "rgba(248, 246, 240, 0.5)" }}>
        {label}
      </span>
      <span
        className="text-sm font-bold"
        style={{ color: highlight ? "var(--color-gold)" : "var(--color-pearl)" }}
      >
        {value}
      </span>
    </div>
  );
}
