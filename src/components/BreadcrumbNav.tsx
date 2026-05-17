import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}

/**
 * BreadcrumbNav — Accessible navigation breadcrumbs
 * Renders both visual breadcrumb + JSON-LD BreadcrumbList Schema
 * Use `light` variant on dark hero sections, `dark` on white pages
 */
export default function BreadcrumbNav({ items, variant = "dark" }: BreadcrumbNavProps) {
  const isLight = variant === "light";

  return (
    <nav
      aria-label="مسار التنقل"
      className="flex items-center gap-2 text-xs flex-wrap"
      style={{
        color: isLight
          ? "rgba(248,246,240,0.5)"
          : "rgba(10,25,47,0.55)",
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-[var(--color-gold)] transition-colors"
        aria-label="الصفحة الرئيسية"
      >
        <Home className="w-3 h-3" />
        الرئيسية
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronLeft className="w-3 h-3 opacity-50" />
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-[var(--color-gold)] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "var(--color-gold)" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
