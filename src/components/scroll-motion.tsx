"use client";

import { useEffect } from "react";

export function ScrollMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scenes = [...document.querySelectorAll<HTMLElement>("[data-scroll-motion]")];
    let frame: number | undefined;

    function update() {
      frame = undefined;
      const viewport = window.innerHeight;
      const strength = window.innerWidth <= 640 ? .025 : .04;

      for (const scene of scenes) {
        const { top, height } = scene.getBoundingClientRect();
        const hero = scene.dataset.scrollMotion === "hero";
        const progress = hero ? -top / height : (viewport - top) / (viewport + height);
        const bounded = Math.max(0, Math.min(1, progress));
        const offset = (hero ? bounded : bounded * 2 - 1) * strength * 100;
        scene.style.setProperty("--scroll-offset", `${offset}%`);
      }
    }

    function schedule() {
      if (frame === undefined && !preference.matches) frame = requestAnimationFrame(update);
    }

    function applyPreference() {
      if (!preference.matches) {
        schedule();
        return;
      }
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
      for (const scene of scenes) scene.style.removeProperty("--scroll-offset");
    }

    applyPreference();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", applyPreference);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", applyPreference);
      if (frame !== undefined) cancelAnimationFrame(frame);
      for (const scene of scenes) scene.style.removeProperty("--scroll-offset");
    };
  }, []);

  return null;
}
