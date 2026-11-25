import { CmsImage } from "./cms-image";
import { featuredProjects } from "@/content/featured-projects";
import type { Locale } from "@/content/site";

export const projectLabels = {
  en: { title: "Selected projects", all: "All projects", contact: "Discuss a similar project", work: "SABOCON’s contribution" },
  de: { title: "Ausgewählte Projekte", all: "Alle Projekte", contact: "Ein ähnliches Projekt besprechen", work: "Der Beitrag von SABOCON" },
  fr: { title: "Projets sélectionnés", all: "Tous les projets", contact: "Discuter d’un projet similaire", work: "La contribution de SABOCON" },
};

export function FeaturedWork({ locale }: { locale: Locale }) {
  const labels = projectLabels[locale];
  return (
    <section id="work" className="work section-block" aria-labelledby="featured-title">
      <div className="work-top">
        <h2 id="featured-title">{labels.title}</h2>
        <a className="pill" href={`/${locale}/projects`}>{labels.all} <span aria-hidden="true">→</span></a>
      </div>
      <div className="featured-projects">
        {featuredProjects.map(({ slug, name, image, line }) => (
          <article key={slug}>
            <a className="featured-project" href={`/${locale}/projects/${slug}`}>
              <div data-scroll-motion=""><CmsImage url={image.url} alt={image.alt[locale]} sizes="(max-width: 640px) 92vw, (max-width: 1600px) 50vw, 800px" /></div>
              <h3>{name} <span aria-hidden="true">↗</span></h3>
              <p>{line[locale]}</p>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
