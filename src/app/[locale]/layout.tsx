import { draftMode } from "next/headers";
import { PreviewBanner } from "@/components/preview-banner";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, siteUrl, isPublished, type Locale } from "@/content/site";
import "../globals.css";
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale=>({locale})); }
export async function generateMetadata({ params }: { params: Promise<{locale:string}> }): Promise<Metadata> { const {locale}=await params; const preview=(await draftMode()).isEnabled;
const title = locale === "fr" ? "SABOCON — Stratégie. Design. Technologie."
  : locale === "de" ? "SABOCON — Strategie. Design. Technologie."
  : "SABOCON — Strategy. Design. Technology.";
 return { metadataBase: new URL(siteUrl), title: { default: title, template: "%s | SABOCON" }, description: locale==="fr" ? "SABOCON GmbH : agence de stratégie, de design et de solutions numériques dans la région de Francfort. Technologie créative, branding et expériences numériques." : locale==="de" ? "SABOCON GmbH: Agentur für Strategie, Design und digitale Lösungen im Raum Frankfurt. Creative Technology, Branding und digitale Erlebnisse." : "SABOCON GmbH: an agency for strategy, design and digital solutions in the Frankfurt region. Creative technology, branding and digital experiences.", robots: { index:isPublished&&!preview, follow:isPublished&&!preview }, openGraph: { title, locale:locale==="fr"?"fr_FR":locale==="de" ? "de_DE" : "en_GB", type:"website" } }; }
export default async function Layout({children,params}: {children:React.ReactNode;params:Promise<{locale:string}>}) { const {locale}=await params; if(!locales.includes(locale as Locale)) notFound(); return <html lang={locale} className="sabocon-site"><body><PreviewBanner/>{children}</body></html>; }
