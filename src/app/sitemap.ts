import { featuredProjects } from "@/content/featured-projects";
import type { MetadataRoute } from "next";
import { siteUrl, locales } from "@/content/site";
import { getPosts } from "@/lib/cms";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {const posts=await getPosts()||[];const pages:MetadataRoute.Sitemap=locales.flatMap(locale=>["","/imprint","/privacy","/accessibility","/blog","/clients","/projects",...featuredProjects.map(({ slug })=>`/projects/${slug}`)].map(path=>({url:`${siteUrl}/${locale}${path}`,alternates:{languages:{en:`${siteUrl}/en${path}`,de:`${siteUrl}/de${path}`,fr:`${siteUrl}/fr${path}`}}})));return pages.concat(posts.flatMap(p=>locales.filter(l=>p.title[l]&&p.body?.[l]?.length).map(l=>({url:`${siteUrl}/${l}/blog/${p.slug}`,alternates:{languages:Object.fromEntries(locales.filter(k=>p.title[k]&&p.body?.[k]?.length).map(k=>[k,`${siteUrl}/${k}/blog/${p.slug}`]))}}))));}
