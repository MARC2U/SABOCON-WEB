"use client";

import type { PointerEvent, ReactNode } from "react";

export function HeroMotion({ children }: { children: ReactNode }) {
  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const visual = event.currentTarget;
    const bounds = visual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    visual.style.setProperty("--hero-x", `${x * 14}px`);
    visual.style.setProperty("--hero-y", `${y * 14}px`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--hero-x");
    event.currentTarget.style.removeProperty("--hero-y");
  }

  return (
    <div className="hero-visual" data-scroll-motion="hero" onPointerMove={followPointer} onPointerLeave={reset} onPointerCancel={reset}>
      {children}
    </div>
  );
}
