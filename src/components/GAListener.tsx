"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a GA4 page_view on App Router client-side (soft) navigations.
 * The initial hard load is already counted by `gtag('config', …, { send_page_view: true })`
 * in layout.tsx, so we skip the first effect run to avoid a double count.
 * gtag is bridged to the Partytown worker via the `forward: ["gtag", …]` config.
 */
export default function GAListener({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    const qs = searchParams.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;
    window.gtag("event", "page_view", {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
      send_to: gaId,
    });
  }, [pathname, searchParams, gaId]);

  return null;
}
