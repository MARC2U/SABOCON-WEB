"use client";

import { useEffect } from "react";

export function HomeScrollReset() {
  useEffect(() => {
    const [navigation] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (navigation?.type !== "reload" || window.location.hash) return;

    let frame: number | undefined;

    function resetAfterLoad() {
      frame = requestAnimationFrame(() => {
        if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
      });
    }

    if (document.readyState === "complete") resetAfterLoad();
    else window.addEventListener("pageshow", resetAfterLoad, { once: true });

    return () => {
      window.removeEventListener("pageshow", resetAfterLoad);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
