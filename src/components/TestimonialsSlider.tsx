"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, CheckCircle } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

/**
 * TestimonialsSlider — INP-safe carousel
 * - Auto-advances every 6s (pausable on hover)
 * - Only auto-advances when visible (IntersectionObserver)
 * - Touch swipe support on mobile
 * - Keyboard accessible (arrow keys + tab)
 * - Pure CSS transitions (no animation libraries)
 */
export default function TestimonialsSlider() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // ─── Visibility Observer — stops CPU work when off-screen ───
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isVisible) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, isVisible]);

  function next() {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  }

  function prev() {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") next();
    else if (e.key === "ArrowRight") prev();
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      // In RTL: swipe right = previous, swipe left = next
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKey}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="آراء عملائنا"
      tabIndex={0}
    >
      {/* Active testimonial */}
      <TestimonialCard testimonial={TESTIMONIALS[active]} />

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={prev}
          aria-label="التقييم السابق"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.2)",
            color: "var(--color-gold-dark)",
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2" role="tablist">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`الانتقال للتقييم ${i + 1}`}
              aria-current={active === i}
              className="transition-all"
              style={{
                width: active === i ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background:
                  active === i
                    ? "var(--color-gold)"
                    : "rgba(10,25,47,0.15)",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="التقييم التالي"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.2)",
            color: "var(--color-gold-dark)",
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Counter */}
      <p
        className="text-center text-xs mt-4"
        style={{ color: "rgba(10,25,47,0.4)" }}
      >
        {active + 1} من {TESTIMONIALS.length}
      </p>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className="glass-card p-8 md:p-10"
      style={{ minHeight: "320px" }}
    >
      {/* Quote icon */}
      <Quote
        className="w-8 h-8 mb-4 opacity-30"
        style={{ color: "var(--color-gold-dark)" }}
        aria-hidden="true"
      />

      {/* Stars */}
      <div
        className="flex items-center gap-1 mb-4"
        aria-label={`تقييم ${testimonial.rating} من ٥`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4"
            style={{
              color: i < testimonial.rating ? "var(--color-gold)" : "rgba(10,25,47,0.15)",
              fill: i < testimonial.rating ? "var(--color-gold)" : "transparent",
            }}
          />
        ))}
        <span
          className="text-xs ms-2"
          style={{ color: "rgba(10,25,47,0.5)" }}
        >
          {testimonial.date}
        </span>
      </div>

      {/* Text */}
      <p
        className="text-sm md:text-base leading-loose mb-6"
        style={{ color: "rgba(10,25,47,0.78)" }}
      >
        {testimonial.text}
      </p>

      {/* Footer */}
      <div
        className="flex items-center gap-4 pt-5"
        style={{ borderTop: "1px solid rgba(10,25,47,0.06)" }}
      >
        {/* Initials avatar */}
        <span
          className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-base shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))",
            color: "var(--color-navy-dark)",
          }}
        >
          {testimonial.initials}
        </span>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold truncate">{testimonial.name}</h3>
            <CheckCircle
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: "var(--color-success)" }}
              aria-label="عميل موثّق"
            />
          </div>
          <div
            className="flex items-center gap-2 text-xs flex-wrap"
            style={{ color: "rgba(10,25,47,0.55)" }}
          >
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {testimonial.district}
            </span>
            <span>·</span>
            <span style={{ color: "var(--color-gold-dark)" }}>
              {testimonial.serviceType}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
