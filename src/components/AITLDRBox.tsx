import { ClipboardCheck, Banknote, Clock, ShieldCheck } from "lucide-react";

interface AITLDRBoxProps {
  title: string;
  scope: string;
  priceRange: string;
  duration: string;
  warranty: string;
}

export default function AITLDRBox({
  title,
  scope,
  priceRange,
  duration,
  warranty,
}: AITLDRBoxProps) {
  return (
    <section
      aria-label="الخلاصة السريعة"
      className="ai-tldr my-8 rounded-2xl p-6 md:p-8"
      style={{
        background: "rgba(212, 175, 55, 0.04)",
        border: "1px solid rgba(212, 175, 55, 0.15)",
        boxShadow: "0 2px 24px rgba(212, 175, 55, 0.06)",
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{
            background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))",
            color: "var(--color-navy-dark)",
          }}
        >
          📋
        </span>
        <h2
          className="text-base font-bold"
          style={{ color: "var(--color-navy)" }}
        >
          الخلاصة السريعة — {title}
        </h2>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TLDRItem
          icon={<ClipboardCheck className="w-4 h-4" />}
          label="نطاق الخدمة"
          value={scope}
        />
        <TLDRItem
          icon={<Banknote className="w-4 h-4" />}
          label="التكلفة التقريبية"
          value={priceRange}
        />
        <TLDRItem
          icon={<Clock className="w-4 h-4" />}
          label="المدة"
          value={duration}
        />
        <TLDRItem
          icon={<ShieldCheck className="w-4 h-4" />}
          label="الضمان"
          value={warranty}
        />
      </dl>
    </section>
  );
}

function TLDRItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl"
      style={{ background: "rgba(255, 255, 255, 0.5)" }}
    >
      <span
        className="mt-0.5 shrink-0"
        style={{ color: "var(--color-gold-dark)" }}
      >
        {icon}
      </span>
      <div>
        <dt className="text-xs font-semibold mb-0.5" style={{ color: "var(--color-navy)" }}>
          {label}
        </dt>
        <dd className="text-sm" style={{ color: "rgba(10, 25, 47, 0.7)" }}>
          {value}
        </dd>
      </div>
    </div>
  );
}
