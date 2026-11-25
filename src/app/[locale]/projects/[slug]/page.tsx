import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal-page";
import { CmsImage } from "@/components/cms-image";
import { ExternalLink } from "@/components/external-link";
import { projectLabels } from "@/components/featured-work";
import { featuredProjects } from "@/content/featured-projects";
import { company, locales, translate, type Locale } from "@/content/site";

type Props = { params: Promise<{ locale: Locale; slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return {
    title: project.name,
    description: project.line[locale],
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: Object.fromEntries(locales.map((language) => [language, `/${language}/projects/${slug}`])),
    },
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { locale, slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  const labels = projectLabels[locale];

  return (
    <LegalPage title={project.name} locale={locale}>
      <article className="project-case-study">
        <p>{project.line[locale]}</p>
        <CmsImage url={project.image.url} alt={project.image.alt[locale]} large />
        <h2>{labels.work}</h2>
        <p>{project.description[locale]}</p>
        <section aria-labelledby="case-contact">
          <h2 id="case-contact">{labels.contact}</h2>
          <div className="contact-actions">
            <ExternalLink className="pill dark" href={company.booking} locale={locale}>
              {translate(locale, "Book a 15-min call", "15-Min-Gespräch buchen")}
            </ExternalLink>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
        </section>
        <a href={`/${locale}/projects`}>← {labels.all}</a>
      </article>
    </LegalPage>
  );
}
