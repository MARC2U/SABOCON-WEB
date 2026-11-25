import type { Metadata } from "next";
import { Clients, clientHeadings } from "@/components/clients";
import { LegalPage } from "@/components/legal-page";
import { locales, type Locale } from "@/content/site";

type ClientPageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: ClientPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: clientHeadings[locale],
    alternates: {
      canonical: `/${locale}/clients`,
      languages: Object.fromEntries(locales.map((language) => [language, `/${language}/clients`])),
    },
  };
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { locale } = await params;

  return (
    <LegalPage locale={locale} title={clientHeadings[locale]}>
      <Clients locale={locale} />
    </LegalPage>
  );
}
