import Image from "next/image";

export function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass-card p-6 text-center">
      <span className="block mb-3 mx-auto w-fit" style={{ color: "var(--color-gold)" }}>
        {icon}
      </span>
      <span
        className="text-3xl md:text-4xl font-black block mb-1"
        style={{ color: "var(--color-navy)" }}
      >
        {value}
      </span>
      <span className="text-xs md:text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
        {label}
      </span>
    </div>
  );
}

export function SpecialtyTag({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
      style={{
        background: "rgba(10,25,47,0.04)",
        color: "rgba(10,25,47,0.7)",
      }}
    >
      <span style={{ color: "var(--color-gold-dark)" }}>{icon}</span>
      {text}
    </span>
  );
}

export function CredentialCard({
  image,
  title,
  subtitle,
  link,
}: {
  image: string;
  title: string;
  subtitle: string;
  link?: string;
}) {
  const inner = (
    <div className="glass-card overflow-hidden text-center hover:-translate-y-0.5 transition-all">
      <div className="relative h-32" style={{ background: "rgba(10,25,47,0.03)" }}>
        <Image src={image} alt={title} fill className="object-contain p-4" sizes="200px" />
      </div>
      <div className="p-3">
        <h3 className="text-xs font-bold mb-0.5">{title}</h3>
        <p
          className="text-[10px]"
          style={{ color: "var(--color-gold-dark)" }}
        >
          {subtitle}
          {link && " ↗"}
        </p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return inner;
}

export function ValueCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <span className="text-3xl mb-3 block">{icon}</span>
      <h3 className="text-base font-bold mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(10,25,47,0.65)" }}>
        {desc}
      </p>
    </div>
  );
}
