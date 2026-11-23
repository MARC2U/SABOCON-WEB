import { createHash } from "node:crypto";
export type ImportPost={id:string;text:string;language:"en"|"de"|"fr";publishedAt:string;url:string;title?:string};
export function normalizePost(value:unknown){
 if(!value || typeof value!=="object")throw new Error("Invalid post");
 const p=value as ImportPost;
 if(typeof p.id!=="string"||!p.id.trim()||p.id.length>300||typeof p.text!=="string"||!p.text.trim()||p.text.length>50000||!["en","de","fr"].includes(p.language)||typeof p.publishedAt!=="string"||!Number.isFinite(Date.parse(p.publishedAt)))throw new Error("id, text, language and valid publishedAt required");
 const url=new URL(p.url);if(url.protocol!=="https:"||!(url.hostname==="linkedin.com"||url.hostname.endsWith(".linkedin.com")))throw new Error("LinkedIn source URL required");
 if(p.title!==undefined&&(typeof p.title!=="string"||p.title.length>200))throw new Error("Invalid title");
 const key=createHash("sha256").update(p.id).digest("hex").slice(0,32);
 const title=p.title?.trim()||p.text.split("\n").find(v=>v.trim())!.slice(0,100);
 return {_id:`linkedin-${key}`,_type:"post",slug:{_type:"slug",current:`linkedin-${key}`},title:{[p.language]:title},excerpt:{[p.language]:p.text.slice(0,200)},body:{[p.language]:p.text.split(/\n\s*\n/).filter(v=>v.trim()).map((text,i)=>({_type:"block",_key:`paragraph-${i}`,style:"normal",markDefs:[],children:[{_type:"span",_key:`text-${i}`,text,marks:[]}]}))},publishedAt:new Date(p.publishedAt).toISOString(),sourceUrl:url.toString(),sourceId:p.id,originalLanguage:p.language};
}
