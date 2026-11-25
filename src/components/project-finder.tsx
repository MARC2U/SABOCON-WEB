"use client";

import { useState } from "react";
import { CmsImage } from "./cms-image";
import { featuredProjects } from "@/content/featured-projects";
import { projectImages } from "@/content/project-images";
import type { Locale } from "@/content/site";

const sinoScan = featuredProjects.find((project) => project.slug === "sinoscan")!;
const mainglueckskind = featuredProjects.find((project) => project.slug === "mainglueckskind")!;

const choices = [
  {
    id: "brand",
    name: mainglueckskind.name,
    image: mainglueckskind.image,
    path: `/projects/${mainglueckskind.slug}`,
  },
  {
    id: "systems",
    name: sinoScan.name,
    image: sinoScan.image,
    path: `/projects/${sinoScan.slug}`,
  },
  {
    id: "participation",
    name: "XMS DONATE",
    image: projectImages["XMS DONATE"],
    path: "#xmsdonate",
  },
] as const;

const copy = {
  en: {
    title: "What would you like to change?",
    options: ["Sharpen our brand", "Simplify everyday work", "Get people involved"],
    descriptions: [
      "MAINGLÜCKSKIND brings its brand identity to life through a website and digital tools for families.",
      "SinoScan simplifies complex sourcing requests with dedicated inquiry platforms.",
      "XMS DONATE turns a contribution into something people can see and share.",
    ],
    view: "View example",
    contact: "Discuss your project",
  },
  de: {
    title: "Was möchtest du verändern?",
    options: ["Unsere Marke schärfen", "Abläufe vereinfachen", "Menschen zum Mitmachen bewegen"],
    descriptions: [
      "Für MAINGLÜCKSKIND haben wir einen Markenauftritt mit Website und digitalen Werkzeugen für Familien gestaltet.",
      "SinoScan vereinfacht komplexe Beschaffungsanfragen mit eigens entwickelten Anfrageplattformen.",
      "Bei XMS DONATE wird aus einer Spende ein sichtbarer Beitrag, den Menschen teilen können.",
    ],
    view: "Beispiel ansehen",
    contact: "Dein Projekt besprechen",
  },
  fr: {
    title: "Que souhaitez-vous changer ?",
    options: ["Affirmer notre marque", "Simplifier le travail quotidien", "Donner envie de participer"],
    descriptions: [
      "MAINGLÜCKSKIND décline son identité de marque sur un site et des outils numériques pour les familles.",
      "SinoScan simplifie les demandes d’approvisionnement complexes grâce à des plateformes dédiées.",
      "Avec XMS DONATE, chaque don devient une contribution visible que l’on peut partager.",
    ],
    view: "Voir l’exemple",
    contact: "Parler de votre projet",
  },
};

export function ProjectFinder({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const text = copy[locale];
  const choice = choices[selected];

  return (
    <section id="project-finder" className="section-block project-finder" aria-labelledby="finder-title">
      <div className="project-finder-controls">
        <h2 id="finder-title">{text.title}</h2>
        <div className="project-finder-options" role="group" aria-labelledby="finder-title">
          {choices.map(({ id }, index) => (
            <button key={id} type="button" aria-pressed={selected === index} aria-controls="finder-result" onClick={() => setSelected(index)}>
              {text.options[index]} <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </div>
      <article id="finder-result" className="project-finder-result">
        <CmsImage url={choice.image.url} alt={choice.image.alt[locale]} sizes="(max-width: 700px) 92vw, 47vw" />
        <div className="project-finder-details">
          <div aria-live="polite">
            <h3>{choice.name}</h3>
            <p>{text.descriptions[selected]}</p>
          </div>
          <div className="project-finder-links">
            <a className="pill" href={choice.path.startsWith("#") ? choice.path : `/${locale}${choice.path}`}>
              {text.view} <span aria-hidden="true">→</span>
            </a>
            <a href="#kontakt">{text.contact}</a>
          </div>
        </div>
      </article>
    </section>
  );
}
