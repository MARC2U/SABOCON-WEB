import localPosts from "@/content/posts.json";
import "server-only";
import { createClient } from "next-sanity";
import { draftMode } from "next/headers";
import type { PortableTextBlock } from "@portabletext/types";
export type Localized<T=string>={en?:T;de?:T;fr?:T};
export type CmsImage={url?:string;aspectRatio?:number;alt?:Localized;credit?:string};
export type Project={_id:string;name:string;slug:string;category?:string;categories?:string[];image?:CmsImage;summary?:Localized;challenge?:Localized;contribution?:Localized;url?:string};
export type Post={_id:string;slug:string;title:Localized;excerpt?:Localized;body?:Localized<PortableTextBlock[]>;image?:CmsImage;publishedAt:string;sourceUrl?:string};
export type Homepage={hero?:Localized<string[]>;belief?:Localized};
export const cmsConfigured=Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
export async function cmsFetch<T>(query:string):Promise<T|null>{
 if(!cmsConfigured)return null;
 const preview=(await draftMode()).isEnabled;
 const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2026-10-08",useCdn:!preview,perspective:preview?"drafts":"published",token:preview?process.env.SANITY_API_READ_TOKEN:undefined});
 return client.fetch<T>(query,{},preview?{cache:"no-store"}:{next:{revalidate:60}});
}
const img='image{alt,credit,"url":asset->url}';
export const getProjects=()=>cmsFetch<Project[]>(`*[_type == "project"] | order(order asc, name asc){_id,name,"slug":slug.current,category,categories,summary,challenge,contribution,url,${img}}`);
const getCmsPosts=()=>cmsFetch<Post[]>(`*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc){_id,"slug":slug.current,title,excerpt,body,publishedAt,sourceUrl,${img}}`);
export const getHomepage=()=>cmsFetch<Homepage>('*[_type == "homepage" && _id == "homepage"][0]{hero,belief}');

export async function getPosts():Promise<Post[]>{const remote=await getCmsPosts()||[];const slugs=new Set(remote.map(p=>p.slug));return [...remote,...(localPosts as Post[]).filter(p=>!slugs.has(p.slug))].sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));}
