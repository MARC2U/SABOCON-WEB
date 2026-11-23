"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";
export default defineConfig({name:"sabocon",title:"SABOCON Redaktion",basePath:"/studio",projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "unconfigured",dataset:process.env.NEXT_PUBLIC_SANITY_DATASET || "production",plugins:[structureTool({structure:S=>S.list().title("Redaktion").items([S.listItem().title("Startseite – Texte").child(S.document().schemaType("homepage").documentId("homepage")),...S.documentTypeListItems().filter(item=>item.getId()!=="homepage")])})],schema:{types:schemaTypes}});
