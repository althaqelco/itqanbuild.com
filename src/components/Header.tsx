"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { SITE, SERVICES_LIST, WHATSAPP_URL } from "@/lib/constants";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackCta(label: string, channel: "phone" | "whatsapp") {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", channel === "phone" ? "phone_click" : "whatsapp_click", {
    event_category: "CTA",
    event_label: label,
  });
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // ─── rAF-throttled scroll listener (INP-safe) ───
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[var(--z-header)] transition-all duration-500 ${
        scrolled
          ? "py-2 shadow-lg"
          : "py-4"
      }`}
      style={{
        background: scrolled
          ? "rgba(10, 25, 47, 0.85)"
          : "rgba(10, 25, 47, 0.40)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(212, 175, 55, 0.15)"
          : "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div className="container-wide flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/logo.png" 
            alt={`شعار ${SITE.name}`} 
            width={56} 
            height={56} 
            className="w-12 h-12 md:w-14 md:h-14 object-contain mix-blend-lighten drop-shadow-md"
            style={{ filter: "brightness(1.1)" }}
          />
          <div>
            <span
              className="text-lg md:text-xl font-bold block leading-tight font-heading"
              style={{ color: "var(--color-pearl)" }}
            >
              {SITE.name}
            </span>
            <span
              className="text-[10px] md:text-xs tracking-wider block"
              style={{ color: "var(--color-gold)" }}
            >
              مقاولات معتمدة منذ {SITE.foundedYear}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavLink href="/" label="الرئيسية" />

          {/* Services Dropdown — Pure CSS Transition (no framer-motion) */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{ color: "rgba(248, 246, 240, 0.8)" }}
              onMouseEnter={() => setServicesOpen(true)}
            >
              خدماتنا
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="absolute top-full end-0 mt-1 w-64 rounded-xl overflow-hidden transition-all duration-200 origin-top"
              style={{
                background: "rgba(10, 25, 47, 0.95)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(212, 175, 55, 0.12)",
                boxShadow: "0 16px 48px rgba(0, 0, 0, 0.3)",
                opacity: servicesOpen ? 1 : 0,
                transform: servicesOpen ? "scaleY(1) translateY(0)" : "scaleY(0.96) translateY(8px)",
                pointerEvents: servicesOpen ? "auto" : "none",
              }}
            >
              <div className="py-2">
                {SERVICES_LIST.map((s) => (
                  <Link
                    key={s.key}
                    href={`/jeddah/${s.slug}`}
                    className="block px-4 py-2.5 text-sm transition-colors"
                    style={{ color: "rgba(248, 246, 240, 0.75)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-gold)";
                      e.currentTarget.style.background = "rgba(212, 175, 55, 0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(248, 246, 240, 0.75)";
                      e.currentTarget.style.background = "transparent";
                    }}
                    onClick={() => setServicesOpen(false)}
                  >
                    {s.h1.split("—")[0].trim()}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink href="/projects" label="مشاريعنا" />
          <NavLink href="/prices" label="الأسعار" />
          <NavLink href="/about" label="من نحن" />
          <NavLink href="/blog" label="المدونة" />
          <NavLink href="/contact" label="تواصل" />
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta("header_whatsapp", "whatsapp")}
            className="px-4 py-2 text-sm font-semibold rounded-full transition-all"
            style={{
              color: "var(--color-whatsapp)",
              border: "1.5px solid var(--color-whatsapp)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-whatsapp)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-whatsapp)";
            }}
          >
            واتساب
          </a>
          <a
            href={`tel:${SITE.phone}`}
            onClick={() => trackCta("header_phone", "phone")}
            className="btn-gold !py-2 !px-5 !text-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            {SITE.phoneDisplay}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg"
          style={{ color: "var(--color-pearl)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="القائمة"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu — CSS grid height animation (no framer-motion) */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-smooth)]"
        style={{
          display: "grid",
          gridTemplateRows: mobileOpen ? "1fr" : "0fr",
          opacity: mobileOpen ? 1 : 0,
          background: "rgba(10, 25, 47, 0.98)",
          borderTop: mobileOpen ? "1px solid rgba(212, 175, 55, 0.1)" : "1px solid transparent",
        }}
      >
        <div className="min-h-0">
          <nav className="container-wide px-4 py-6 flex flex-col gap-1">
            <MobileLink href="/" label="الرئيسية" onClick={() => setMobileOpen(false)} />
            <div className="py-2">
              <span
                className="text-xs font-semibold tracking-wider px-3 pb-2 block"
                style={{ color: "var(--color-gold)" }}
              >
                خدماتنا
              </span>
              {SERVICES_LIST.map((s) => (
                <MobileLink
                  key={s.key}
                  href={`/jeddah/${s.slug}`}
                  label={s.h1.split("—")[0].trim()}
                  onClick={() => setMobileOpen(false)}
                  indent
                />
              ))}
            </div>
            <MobileLink href="/projects" label="مشاريعنا" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/prices" label="الأسعار" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/about" label="من نحن" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/blog" label="المدونة" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/contact" label="تواصل" onClick={() => setMobileOpen(false)} />

            <div className="flex flex-col gap-3 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <a
                href={`tel:${SITE.phone}`}
                onClick={() => trackCta("mobile_menu_phone", "phone")}
                className="btn-gold w-full text-center"
              >
                <Phone className="w-4 h-4 inline me-2" />
                اتصل الآن — {SITE.phoneDisplay}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta("mobile_menu_whatsapp", "whatsapp")}
                className="btn-outline w-full text-center"
                style={{ borderColor: "var(--color-whatsapp)", color: "var(--color-whatsapp)" }}
              >
                تواصل عبر واتساب
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
      style={{ color: "rgba(248, 246, 240, 0.8)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--color-gold)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(248, 246, 240, 0.8)";
      }}
    >
      {label}
    </Link>
  );
}

function MobileLink({
  href,
  label,
  onClick,
  indent,
}: {
  href: string;
  label: string;
  onClick: () => void;
  indent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block py-2.5 text-sm rounded-lg transition-colors ${indent ? "ps-8" : "ps-3"}`}
      style={{ color: "rgba(248, 246, 240, 0.7)" }}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
