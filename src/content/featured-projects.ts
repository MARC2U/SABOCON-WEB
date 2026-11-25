import { projectImages } from "./project-images";
import { projectPreviews } from "./project-previews";

export const featuredProjects = [
  {
    slug: "rieger-hofmann",
    name: "Rieger-Hofmann",
    line: {
      en: "A visual identity, website and interactive tools.",
      de: "Visuelle Identität, Website und interaktive Werkzeuge.",
      fr: "Identité visuelle, site web et outils interactifs.",
    },
  },
  {
    slug: "sinoscan",
    name: "SinoScan",
    line: {
      en: "Social media communication and inquiry platforms for international manufacturing.",
      de: "Social-Media-Kommunikation und Anfrageplattformen für die internationale Fertigung.",
      fr: "Communication sur les réseaux sociaux et plateformes de demande pour la production internationale.",
    },
  },
  {
    slug: "mainglueckskind",
    name: "MAINGLÜCKSKIND",
    line: {
      en: "Brand design, website and digital tools for families.",
      de: "Markendesign, Website und digitale Werkzeuge für Familien.",
      fr: "Identité de marque, site web et outils numériques pour les familles.",
    },
  },
].map((project) => ({
  ...project,
  image: projectImages[project.name],
  description: projectPreviews[project.name],
}));
