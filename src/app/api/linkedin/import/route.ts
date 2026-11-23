import { createClient } from "next-sanity";
import { normalizePost } from "@/lib/import-linkedin";
import { matchesSecret } from "@/lib/secret";
export const runtime="nodejs";
export async function POST(request:Request){
 if(!matchesSecret(request.headers.get("authorization"),process.env.LINKEDIN_IMPORT_SECRET?`Bearer ${process.env.LINKEDIN_IMPORT_SECRET}`:undefined))return Response.json({error:"Unauthorized"},{status:401});
 if(!process.env.SANITY_API_WRITE_TOKEN||!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)return Response.json({error:"Import is not configured"},{status:503});
 const raw=await request.text();if(Buffer.byteLength(raw)>100000)return Response.json({error:"Payload too large"},{status:413});
 let doc;try{doc=normalizePost(JSON.parse(raw));}catch{return Response.json({error:"Invalid payload"},{status:400});}
 const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2026-10-08",useCdn:false,token:process.env.SANITY_API_WRITE_TOKEN,perspective:"raw"});
 // Atomic createIfNotExists and a stable source ID prevent duplicate imports.
 const existing=await client.fetch('count(*[_id in $ids])',{ids:[doc._id,`drafts.${doc._id}`]});
 if(existing)return Response.json({status:"already-imported"});
 const direct=process.env.LINKEDIN_IMPORT_PUBLISH==="true";
 await client.createIfNotExists({...doc,_id:direct?doc._id:`drafts.${doc._id}`});
 return Response.json({status:direct?"published":"draft-created",images:"not-imported"});
}
