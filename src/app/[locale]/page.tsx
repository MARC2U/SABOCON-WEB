import { Clients } from "@/components/clients";
import { SocialFeed } from "@/components/social-feed";
import { getProjects,getPosts,getHomepage } from "@/lib/cms";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Hero, Positioning, Services, Work, Thinking, Process, Contact, Footer } from "@/components/sections";
import { company, siteUrl, translate, type Locale } from "@/content/site";
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}):Promise<Metadata>{ const {locale}=await params; return {alternates:{canonical:`/${locale}`,languages:{en:"/en",de:"/de",fr:"/fr","x-default":"/en"}}}; }
export default async function Home({params}:{params:Promise<{locale:Locale}>}) { const {locale}=await params;
 const [projects,posts,settings]=await Promise.all([getProjects(),getPosts(),getHomepage()]);
 const data={"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":`${siteUrl}/#organization`,name:company.name,legalName:company.name,url:siteUrl,logo:`${siteUrl}/brand/sabocon-round-orange.png`,email:company.email,telephone:company.phone,vatID:company.vat,address:{"@type":"PostalAddress",streetAddress:company.street,postalCode:company.postalCode,addressLocality:company.city,addressCountry:"DE"},contactPoint:[{"@type":"ContactPoint",contactType:"customer service",telephone:company.phone,email:company.email,availableLanguage:["English","German","French"]}]},{"@type":"WebSite","@id":`${siteUrl}/#website`,url:siteUrl,name:"SABOCON",inLanguage:["en","de","fr"],publisher:{"@id":`${siteUrl}/#organization`}}]};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\u003c")}}/><a className="skip-link" href="#main">{translate(locale,"Skip to content","Zum Inhalt springen")}</a><div id="top"/><Header locale={locale}/><main id="main" tabIndex={-1}><Hero locale={locale} settings={settings}/><Positioning locale={locale} settings={settings}/><Services locale={locale}/><Clients locale={locale}/><Work locale={locale} items={projects}/><Thinking locale={locale} posts={posts||[]}/><SocialFeed locale={locale}/><Process locale={locale}/><Contact locale={locale}/></main><Footer locale={locale}/></>;
}
