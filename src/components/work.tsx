"use client";
import { ExternalLink } from "@/components/external-link";
import { projectPreviews } from "@/content/project-previews";
import type { Project } from "@/lib/cms";
import { CmsImage } from "./cms-image";
import { projectImages } from "@/content/project-images";
import { useSearchParams } from "next/navigation";
import { featuredProjects } from "@/content/featured-projects";
import { projects, translate as t, type Locale } from "@/content/site";
import { ReferenceArt } from "./reference-art";
export function Work({locale,items,title}:{locale:Locale;items?:Project[]|null;title:string}) {
 const localEntries = projects.map(p=>({...p,_id:p.name,summary:undefined,challenge:undefined,contribution:projectPreviews[p.name],image:projectImages[p.name],url:"url" in p ? p.url : undefined}));
 const entries = items?.length
   ? [...items, ...localEntries.filter((project) => project.name === "Treedonator" &&
       !items.some((item) => item.slug === "treedonator" || item.name.toLowerCase() === "treedonator"))]
   : localEntries;
 const query = useSearchParams();
 const category = query.get("category");
 const filter = ["websites", "brands", "systems"].includes(category ?? "") ? category : null;
 const filtered = entries.filter(p => !filter || (p.categories ?? ("category" in p && p.category ? [p.category] : [])).some(category => category.toLowerCase() === filter));

 function selectCategory(value: string) {
   const url = new URL(window.location.href);
   if (value === "All") url.searchParams.delete("category");
   else url.searchParams.set("category", value.toLowerCase());
   if (url.href !== window.location.href) window.history.pushState(null, "", url);
 }
 const labels={All:t(locale,"All","Alle"),Websites:t(locale,"Websites","Websites"),Brands:t(locale,"Brands","Marken"),Systems:t(locale,"Systems","Systeme")};
 return <section id="work" className="work section-block" aria-labelledby="work-title"><div className="work-top"><h1 id="work-title">{title}</h1><div className="filters" aria-label={t(locale,"Filter projects","Projekte filtern")}>{Object.entries(labels).map(([key,label])=><button key={key} aria-pressed={filter === (key === "All" ? null : key.toLowerCase())} onClick={()=>selectCategory(key)}>{label}</button>)}</div></div><p className="sr-only" role="status">{filtered.length} {t(locale,"projects shown","Projekte angezeigt")}</p><div className="work-grid">{filtered.map(project=>{
 const featured = featuredProjects.find(item => ("slug" in project && item.slug === project.slug) || item.name.toLowerCase() === project.name.toLowerCase());
 return <article key={project._id}>{project.image?.url?<CmsImage url={project.image.url} alt={project.image.alt?.[locale]||""}/>: "crop" in project && project.crop ? <ReferenceArt crop={project.crop as number[]} label={t(locale,`Concept image for ${project.name}`,`Entwurfsmotiv für ${project.name}`)}/>:<div className="cms-image project-image-pending"><span>{t(locale,"Project image to follow","Projektbild folgt")}</span></div>}<h2>{featured ? <a href={`/${locale}/projects/${featured.slug}`}>{project.name}</a> : project.name}</h2><p>{project.summary?.[locale]}</p><details className="project-detail"><summary>{t(locale,"Project preview","Projektvorschau")} <span aria-hidden="true">↗</span></summary>{items?.length || project.contribution?.[locale]?<><p>{project.challenge?.[locale]}</p><p>{project.contribution?.[locale]}</p></>:<p>{t(locale,"A project description is not yet available.","Eine Projektbeschreibung liegt noch nicht vor.")}</p>}{project.url&&<p><ExternalLink locale={locale} href={project.url}>{t(locale,"Visit project","Projekt ansehen")} ↗</ExternalLink></p>}</details></article>;})}</div></section>;
}
