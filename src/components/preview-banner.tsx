import { draftMode } from "next/headers";
export async function PreviewBanner(){return(await draftMode()).isEnabled?<aside className="preview-banner"><span>Entwurfsvorschau / Draft preview – Änderungen sind noch nicht veröffentlicht.</span><a href="/api/preview/exit">Vorschau beenden / Exit preview</a></aside>:null;}
