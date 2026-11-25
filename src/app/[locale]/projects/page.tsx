import type { Metadata } from "next";
import { Work } from "@/components/work";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections";
import { projectLabels } from "@/components/featured-work";
import { getProjects } from "@/lib/cms";
import { locales, translate, type Locale } from "@/content/site";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: projectLabels[locale].all,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: Object.fromEntries(locales.map((language) => [language, `/${language}/projects`])),
    },
  };
}

export default async function Projects({ params, searchParams }: Props) {
  const [{ locale }, , items] = await Promise.all([params, searchParams, getProjects()]);
  return (
    <>
      <a href="#main" className="skip-link">{translate(locale, "Skip to content", "Zum Inhalt springen")}</a>
      <Header locale={locale} />
      <main id="main" tabIndex={-1}>
        <Work locale={locale} items={items} title={projectLabels[locale].all} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
