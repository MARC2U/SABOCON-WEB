import { ExternalLink } from "@/components/external-link";
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { BlogCards } from "@/components/blog-cards";
import { getPosts } from "@/lib/cms";
import { translate as t,type Locale } from "@/content/site";
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}):Promise<Metadata>{const{locale}=await params;return{title:t(locale,"Blog","Blog"),alternates:{canonical:`/${locale}/blog`,languages:{en:"/en/blog",de:"/de/blog",fr:"/fr/blog"}}};}
export default async function Blog({params}:{params:Promise<{locale:Locale}>}){const{locale}=await params;const posts=(await getPosts()||[]).filter(p=>p.title[locale]&&p.body?.[locale]?.length);return <LegalPage locale={locale} title={t(locale,"Ideas. Perspectives. Real talk.","Ideen. Perspektiven. Klartext.")}><p>{t(locale,"Thoughts from SABOCON on design, technology and communication.","Gedanken von SABOCON zu Design, Technologie und Kommunikation.")}</p>{posts.length?<BlogCards posts={posts} locale={locale}/>:<p className="blog-empty">{t(locale,"Our first articles are being prepared. Visit our LinkedIn page for current posts.","Unsere ersten Beiträge werden vorbereitet. Aktuelle Posts findest du auf unserer LinkedIn-Seite.")} <ExternalLink locale={locale} href="https://www.linkedin.com/company/sabocon-gmbh/">LinkedIn ↗</ExternalLink></p>}</LegalPage>;}
