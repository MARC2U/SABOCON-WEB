import { draftMode } from "next/headers";
export async function GET(){(await draftMode()).disable();return new Response(null,{status:307,headers:{Location:"/en","Cache-Control":"no-store"}});}
