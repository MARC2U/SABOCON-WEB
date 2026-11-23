"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandMark } from "./brand-mark";
import { locales, translate as t, type Locale } from "@/content/site";

export function Header({
  locale,
  availableLocales = locales,
}: {
  locale: Locale;
  availableLocales?: Locale[];
}) {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const home = `/${locale}`;
  const links = [
    [t(locale, "Work", "Projekte"), "work"],
    [t(locale, "What we do", "Leistungen"), "leistungen"],
    [t(locale, "Thinking", "Impulse"), "thinking"],
    [t(locale, "About", "Über uns"), "positionierung"],
    [t(locale, "Contact", "Kontakt"), "kontakt"],
  ];

  useEffect(() => {
    if (open) menu.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <header
      className="header"
      onBlur={(event) => {
        if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <a href={home} className="brand" aria-label={t(locale, "SABOCON home", "SABOCON Startseite")}>
        <BrandMark className="header-mark" />
        <span className="wordmark">SABOCON<span className="orange-dot" aria-hidden="true">●</span></span>
      </a>
      <nav
        ref={menu}
        id="main-nav"
        aria-label={t(locale, "Main navigation", "Hauptnavigation")}
        className={open ? "nav open" : "nav"}
      >
        {links.map(([label, id]) => (
          <a key={id} href={`${home}#${id}`} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href={`${home}/blog`} onClick={() => setOpen(false)}>Blog</a>
      </nav>
      <div className="header-controls">
        <nav className="language-switch" aria-label={t(locale, "Language selection", "Sprachauswahl")}>
          {availableLocales.map((lang) => (
            <a
              key={lang}
              href={pathname.replace(/^\/(en|de|fr)(?=\/|$)/, `/${lang}`)}
              hrefLang={lang}
              lang={lang}
              aria-current={locale === lang ? "page" : undefined}
              aria-label={lang === "en" ? "English" : lang === "fr" ? "Français" : "Deutsch"}
            >
              {lang.toUpperCase()}
            </a>
          ))}
        </nav>
        <button
          ref={toggle}
          type="button"
          className={open ? "menu-toggle active" : "menu-toggle"}
          aria-label={open ? t(locale, "Close menu", "Menü schließen") : t(locale, "Open menu", "Menü öffnen")}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
