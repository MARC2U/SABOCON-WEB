"use client";
import { projectPreviews } from "@/content/project-previews";
import type { Project } from "@/lib/cms";
import { CmsImage } from "./cms-image";
import { projectImages } from "@/content/project-images";
import { useState } from "react";
import { projects, translate as t, type Locale } from "@/content/site";
import { ReferenceArt } from "./reference-art";
export function Work({locale,items}:{locale:Locale;items?:Project[]|null}) {
 const entries=items?.length?items:projects.map(p=>({...p,_id:p.name,summary:undefined,challenge:undefined,contribution:projectPreviews[p.name],image:projectImages[p.name],url:"url" in p ? p.url : undefined}));
 const [filter,setFilter]=useState("All"); const filtered=entries.filter(p=>filter==="All"||(p.categories ?? ("category" in p && p.category ? [p.category] : [])).includes(filter));
 const labels={All:t(locale,"All","Alle"),Websites:t(locale,"Websites","Websites"),Brands:t(locale,"Brands","Marken"),Systems:t(locale,"Systems","Systeme")};
 return <section id="work" className="work section-block" aria-labelledby="work-title"><div className="work-top"><div><p className="eyebrow">— {t(locale,"SELECTED WORK","AUSGEWÄHLTE PROJEKTE")}</p><h2 id="work-title">{t(locale,"LESS TALK.","WENIGER REDEN.")}<br/>{t(locale,"MORE WORK","MEHR MACHEN")}<span className="orange-dot" aria-hidden="true">.</span></h2></div><div className="filters" aria-label={t(locale,"Filter projects","Projekte filtern")}>{Object.entries(labels).map(([key,label])=><button key={key} aria-pressed={filter===key} onClick={()=>setFilter(key)}>{label}</button>)}</div></div><p className="sr-only" role="status">{filtered.length} {t(locale,"projects shown","Projekte angezeigt")}</p><div className="work-grid">{filtered.map(project=><article key={project._id}>{project.image?.url?<CmsImage url={project.image.url} alt={project.image.alt?.[locale]||""}/>: "crop" in project && project.crop ? <ReferenceArt crop={project.crop as number[]} label={t(locale,`Concept image for ${project.name}`,`Entwurfsmotiv für ${project.name}`)}/>:<div className="cms-image project-image-pending"><span>{t(locale,"Project image to follow","Projektbild folgt")}</span></div>}<h3>{project.name}</h3><p>{project.summary?.[locale]}</p><details className="project-detail"><summary>{t(locale,"Project preview","Projektvorschau")} <span aria-hidden="true">↗</span></summary>{items?.length || project.contribution?.[locale]?<><p>{project.challenge?.[locale]}</p><p>{project.contribution?.[locale]}</p></>:<p>{t(locale,"A project description is not yet available.","Eine Projektbeschreibung liegt noch nicht vor.")}</p>}{project.url&&<p><a href={project.url}>{t(locale,"Visit project","Projekt ansehen")} ↗</a></p>}</details></article>)}</div></section>;
}
