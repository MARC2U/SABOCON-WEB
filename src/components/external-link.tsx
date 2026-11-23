import type { ComponentPropsWithoutRef } from "react";
import { siteUrl, type Locale } from "@/content/site";

const newWindowLabels: Record<Locale, string> = {
  en: "Opens in a new tab or window",
  de: "Öffnet in einem neuen Tab oder Fenster",
  fr: "S’ouvre dans un nouvel onglet ou une nouvelle fenêtre",
};

const siteHost = new URL(siteUrl).hostname.replace(/^www\./, "");

type LinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "target"> & {
  href: string;
  locale: Locale;
};

function isExternalWebLink(href: string) {
  try {
    const destination = new URL(href, siteUrl);
    return (destination.protocol === "https:" || destination.protocol === "http:")
      && destination.hostname.replace(/^www\./, "") !== siteHost;
  } catch {
    return false;
  }
}

export function ExternalLink({ href, locale, children, ...props }: LinkProps) {
  if (!isExternalWebLink(href)) return <a {...props} href={href}>{children}</a>;

  const label = newWindowLabels[locale];
  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer" title={label}>
      {children}<span className="sr-only"> ({label})</span>
    </a>
  );
}
