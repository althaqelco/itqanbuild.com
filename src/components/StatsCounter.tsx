"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  icon?: React.ReactNode;
}

interface StatsCounterProps {
  stats: Stat[];
  duration?: number; // animation duration in ms
}

/**
 * StatsCounter — animated counter triggered by Intersection Observer
 * INP-safe: uses requestAnimationFrame, no setInterval
 * Respects prefers-reduced-motion (shows final value instantly)
 */
export default function StatsCounter({ stats, duration = 1800 }: StatsCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasAnimated(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {stats.map((stat, i) => (
        <StatItem
          key={i}
          stat={stat}
          shouldAnimate={hasAnimated}
          duration={duration}
        />
      ))}
    </div>
  );
}

function StatItem({
  stat,
  shouldAnimate,
  duration,
}: {
  stat: Stat;
  shouldAnimate: boolean;
  duration: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let startTime: number | null = null;
    let frameId: number;

    function tick(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(stat.value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [shouldAnimate, stat.value, duration]);

  return (
    <div className="glass-card p-6 text-center">
      {stat.icon && (
        <span
          className="block mb-3 mx-auto w-fit"
          style={{ color: "var(--color-gold)" }}
          aria-hidden="true"
        >
          {stat.icon}
        </span>
      )}
      <span
        className="text-3xl md:text-4xl font-black block mb-1"
        style={{ color: "var(--color-navy)" }}
      >
        {current.toLocaleString("ar-SA")}
        {stat.suffix && (
          <span style={{ color: "var(--color-gold-dark)" }}>{stat.suffix}</span>
        )}
      </span>
      <span className="text-xs md:text-sm" style={{ color: "rgba(10,25,47,0.6)" }}>
        {stat.label}
      </span>
    </div>
  );
}
