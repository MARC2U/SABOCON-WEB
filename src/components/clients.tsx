import { ExternalLink } from "@/components/external-link";
import clients from "@/content/clients.json";
import type { Locale } from "@/content/site";

const headings: Record<Locale, string> = {
  en: "Who we worked for",
  de: "Für wen wir gearbeitet haben",
  fr: "Pour qui nous avons travaillé",
};

export function Clients({ locale }: { locale: Locale }) {
  return (
    <section id="clients" className="section-block clients" aria-labelledby="clients-title">
      <h2 id="clients-title">{headings[locale]}</h2>
      <ul className="client-list" role="list">
        {clients.map(({ name, url }) => (
          <li key={name}>{url ? <ExternalLink locale={locale} href={url}>{name}</ExternalLink> : name}</li>
        ))}
      </ul>
    </section>
  );
}
