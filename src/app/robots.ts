import type { MetadataRoute } from "next";
import {siteUrl,isPublished} from "@/content/site";
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:"*",...(isPublished?{allow:"/"}:{disallow:"/"})},...(isPublished?{sitemap:`${siteUrl}/sitemap.xml`}:{})};}
