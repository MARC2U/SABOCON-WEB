"use client";

import { useEffect, useRef, useState } from "react";

export function ClientIndex({ letters, label }: { letters: string[]; label: string }) {
  const nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const headings = letters.map((letter) => ({
      letter,
      heading: document.getElementById(`clients-${letter}`),
    }));
    let frame: number | undefined;

    function update() {
      frame = undefined;
      const bounds = nav.current?.getBoundingClientRect();
      const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
      const line = Math.max(headerHeight + 115, Math.min(bounds?.height ?? 0, 100) + headerHeight + 32);
      const focused = headings.find(({ heading }) => {
        if (!heading || document.activeElement !== heading) return false;
        const top = heading.getBoundingClientRect().top;
        return top >= headerHeight && top <= line + 80;
      });
      const current = focused ?? headings.findLast(({ heading }) => heading && heading.getBoundingClientRect().top <= line);
      setActive(current?.letter);
    }

    function scheduleUpdate() {
      if (frame === undefined) frame = requestAnimationFrame(update);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [letters]);

  return (
    <nav ref={nav} className="client-index" aria-label={label}>
      {letters.map((letter) => (
        <a key={letter} href={`#clients-${letter}`} aria-current={active === letter ? "location" : undefined}>
          {letter}
        </a>
      ))}
    </nav>
  );
}
