import Image from "next/image";
import { ClientIndex } from "./client-index";
import { ExternalLink } from "@/components/external-link";
import clients from "@/content/clients.json";
import type { Locale } from "@/content/site";

export const clientHeadings: Record<Locale, string> = {
  en: "Who we worked for",
  de: "Für wen wir gearbeitet haben",
  fr: "Pour qui nous avons travaillé",
};

const directoryLabels: Record<Locale, string> = {
  en: "View client list",
  de: "Kundenliste ansehen",
  fr: "Voir la liste des clients",
};

export function ClientsTeaser({ locale }: { locale: Locale }) {
  return (
    <section id="clients" className="section-block clients-teaser" aria-labelledby="clients-title">
      <a className="clients-teaser-link" href={`/${locale}/clients`}>
        <div className="clients-teaser-copy">
          <h2 id="clients-title">{clientHeadings[locale]}</h2>
          <span className="pill">
            {directoryLabels[locale]} <span aria-hidden="true">→</span>
          </span>
        </div>
        <div className="clients-teaser-art" data-scroll-motion="">
          <Image src="/visuals/client-directory.webp" alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1600px) 53vw, 850px" />
        </div>
      </a>
    </section>
  );
}

export function Clients({ locale }: { locale: Locale }) {
  const collator = new Intl.Collator(locale, { numeric: true, sensitivity: "base" });
  const sortedClients = clients.toSorted((a, b) => collator.compare(a.name, b.name));

  const groups = new Map<string, typeof clients>();
  for (const client of sortedClients) {
    const initial = client.name.normalize("NFD")[0].toUpperCase();
    const letter = /^[A-Z]$/.test(initial) ? initial : "0–9";
    const group = groups.get(letter) ?? [];
    group.push(client);
    groups.set(letter, group);
  }

  const indexLabels = {
    en: "Jump to a letter",
    de: "Zu einem Buchstaben springen",
    fr: "Aller à une lettre",
  };
  return (
    <>
      <ClientIndex letters={[...groups.keys()]} label={indexLabels[locale]} />
      {[...groups].map(([letter, clients]) => (
        <section key={letter} aria-labelledby={`clients-${letter}`}>
          <h2 id={`clients-${letter}`} tabIndex={-1}>{letter}</h2>
          <ul className="client-list" role="list">
            {clients.map(({ name, url }) => (
              <li key={name}>{url ? <ExternalLink locale={locale} href={url}>{name}</ExternalLink> : name}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
