import { ProjectFinder } from "@/components/project-finder";
import { SoundExamples } from "@/components/sound-examples";
import { HomeScrollReset } from "@/components/home-scroll-reset";
import { ScrollMotion } from "@/components/scroll-motion";
import { FeaturedWork } from "@/components/featured-work";
import { ClientsTeaser } from "@/components/clients";
import { SocialFeed } from "@/components/social-feed";
import { getPosts,getHomepage } from "@/lib/cms";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Hero, Positioning, Services, Thinking, Process, Contact, Footer } from "@/components/sections";
import { company, siteUrl, translate, type Locale } from "@/content/site";
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}):Promise<Metadata>{ const {locale}=await params; return {alternates:{canonical:`/${locale}`,languages:{en:"/en",de:"/de",fr:"/fr","x-default":"/en"}}}; }
export default async function Home({params}:{params:Promise<{locale:Locale}>}) { const {locale}=await params;
 const [posts,settings]=await Promise.all([getPosts(),getHomepage()]);
 const data={"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":`${siteUrl}/#organization`,name:company.name,legalName:company.name,url:siteUrl,logo:`${siteUrl}/brand/sabocon-round-orange.png`,email:company.email,telephone:company.phone,vatID:company.vat,address:{"@type":"PostalAddress",streetAddress:company.street,postalCode:company.postalCode,addressLocality:company.city,addressCountry:"DE"},contactPoint:[{"@type":"ContactPoint",contactType:"customer service",telephone:company.phone,email:company.email,availableLanguage:["English","German","French"]}]},{"@type":"WebSite","@id":`${siteUrl}/#website`,url:siteUrl,name:"SABOCON",inLanguage:["en","de","fr"],publisher:{"@id":`${siteUrl}/#organization`}}]};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\u003c")}}/><a className="skip-link" href="#main">{translate(locale,"Skip to content","Zum Inhalt springen")}</a><div id="top"/><Header locale={locale}/><main id="main" tabIndex={-1}><HomeScrollReset/><ScrollMotion/><Hero locale={locale} settings={settings}/><Positioning locale={locale} settings={settings}/><Services locale={locale}/><ProjectFinder locale={locale}/><FeaturedWork locale={locale}/><SoundExamples locale={locale}/><ClientsTeaser locale={locale}/><Thinking locale={locale} posts={posts||[]}/><Process locale={locale}/><Contact locale={locale}/><SocialFeed locale={locale}/></main><Footer locale={locale}/></>;
}
