import Link from "next/link";
import type { Post } from "@/lib/cms";
import { CmsImage } from "./cms-image";
import { translate as t,type Locale } from "@/content/site";
export function BlogCards({posts,locale}:{posts:Post[];locale:Locale}){return <div className="blog-grid">{posts.map(p=><article key={p._id}>{p.image?.url&&<CmsImage url={p.image.url} alt={p.image.alt?.[locale]||""} aspectRatio={p.image.aspectRatio} large sizes="(max-width: 280px) 90vw, 240px"/>}<time dateTime={p.publishedAt}>{new Date(p.publishedAt).toLocaleDateString(locale==="fr"?"fr-FR":locale==="de"?"de-DE":"en-GB",{year:"numeric",month:"long",timeZone:"Europe/Berlin"})}</time><h2><Link href={`/${locale}/blog/${p.slug}`}>{p.title[locale]}</Link></h2><p>{p.excerpt?.[locale]}</p><Link href={`/${locale}/blog/${p.slug}`}>{t(locale,"Read article","Beitrag lesen")} <span aria-hidden="true">→</span></Link></article>)}</div>;}
