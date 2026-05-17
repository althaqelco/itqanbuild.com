import Image from "next/image";
import { MapPin, CheckCircle } from "lucide-react";

export function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
      style={{
        background: "rgba(212,175,55,0.1)",
        border: "1px solid rgba(212,175,55,0.2)",
        color: "var(--color-gold)",
      }}
    >
      {icon}
      {text}
    </span>
  );
}

export function WhyUsCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div
      className="glass-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <span className="text-3xl mb-4 block">{icon}</span>
      <h3 className="text-base font-bold mb-2">{title}</h3>
      <p className="text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>{desc}</p>
    </div>
  );
}

export function ProjectCard({
  image,
  imageAfter,
  title,
  category,
  district,
}: {
  image: string;
  imageAfter?: string;
  title: string;
  category: string;
  district: string;
}) {
  return (
    <div className="glass-card overflow-hidden group">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {imageAfter && (
          <span
            className="absolute top-3 start-3 px-2 py-1 text-[10px] font-bold rounded-full"
            style={{
              background: "var(--color-gold)",
              color: "var(--color-navy-dark)",
            }}
          >
            قبل / بعد
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold mb-1">{title}</h3>
        <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(10,25,47,0.5)" }}>
          <span>{category}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {district}
          </span>
        </div>
      </div>
    </div>
  );
}

export function EEATItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
      <span className="text-sm" style={{ color: "rgba(10,25,47,0.7)" }}>{text}</span>
    </li>
  );
}

export function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="glass-card group">
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
        <span className="text-sm font-bold pe-4">{q}</span>
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-open:rotate-45"
          style={{
            background: "rgba(212,175,55,0.1)",
            color: "var(--color-gold)",
          }}
        >
          +
        </span>
      </summary>
      <div className="px-5 pb-5">
        <p className="text-sm leading-relaxed" style={{ color: "rgba(10,25,47,0.65)" }}>
          {a}
        </p>
      </div>
    </details>
  );
}
