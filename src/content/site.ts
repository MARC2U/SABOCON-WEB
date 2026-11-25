import french from "./fr.json";
// Confirmed: opening line, project names, supplied logo assets. All other copy is an editorial proposal.
export const hero = { opening: "Hey, we’re SABOCON.", paragraphs: ["We’re a creative technology, graphic design and branding agency based in Frankfurt, Germany.", "A team of designers, technologists, musicians and futurists – rooted in narrative and driven by collaboration.", "We create digital products, brands and experiences that connect. From visualidentities to websites, apps, motion design, events and interactive installations.", "💡 If you’re looking for smart ideas and bold design, we’d love to hear from you."], isDraft: false };
export const services = [
 { title: "Strategy & Brand", items: ["Beratung", "Markenstrategie", "Corporate Identity", "Design", "Kommunikation"], image: "/visuals/strategy-brand.webp" },
 { title: "Digital Experiences", items: ["Websites", "Headless CMS", "UX/UI", "E-Commerce", "Digitale Anwendungen"], image: "/visuals/digital-experiences.webp" },
 { title: "AI & Intelligent Systems", items: ["KI-Integration", "Automatisierung", "Workflows", "Wissenssysteme", "Prozessoptimierung"], image: "/visuals/ai-systems.webp" },
 { title: "Content & Communication", items: ["Social Media", "Kampagnen", "Content", "SEO & GEO", "LLM-Optimierung"], image: "/visuals/content-communication.webp" },
 { title: "Sound & Experience", items: ["SABOCON SOUND SCOUTS", "Audio Branding", "Sonic Logos", "Musikproduktion", "Sounddesign"], image: "/visuals/sound-experience.webp" }
];
export const projects = [
 { name: "Rieger-Hofmann", categories: ["Websites", "Brands", "Systems"], crop: [234, 1136, 187, 120] },
 { name: "XMS DONATE", categories: [] },
 { name: "SinoScan", categories: ["Websites", "Brands"], crop: [35, 1136, 187, 120] },
 { name: "GerneGrün", categories: ["Websites", "Brands"] },
 { name: "DREIEICHHÖRNCHEN", categories: ["Websites", "Brands", "Systems"] },
 { name: "Fahrgasse18", categories: ["Websites", "Brands"], crop: [433, 1136, 185, 120] },
 { name: "PAMPERS ROAD SHOW", categories: [] },
 { name: "TINY HOUSE PROJECT", categories: [] },
 { name: "XCC", categories: ["Brands"], url: "https://xcc-connect.com" },
 { name: "SABOCON SOUND SCOUTS", categories: [] },
 { name: "BAGTAP", categories: [] },
 { name: "MAINPLOTT", categories: ["Websites", "Brands", "Systems"] },
 { name: "BODY SOUL MIND", categories: ["Websites", "Brands"] },
 { name: "HUGO CLUB NIGHTS", categories: [] },
 { name: "MAINGLÜCKSKIND", categories: ["Websites", "Brands", "Systems"] },
 { name: "DOGTAP", categories: ["Systems"] },
 { name: "CONNECTED PENS", categories: ["Brands", "Systems"] },
 { name: "DR WERNER", categories: [] }
];
export const insights = [
 { title: "KI als Werkzeug, nicht als Selbstzweck", crop: [300, 1349, 125, 83], body: "Technologie sollte ein konkretes Problem lösen. Dieser Artikel ist noch als redaktioneller Originalbeitrag zu ergänzen." },
 { title: "EU AI Act – was jetzt wichtig ist", crop: [436, 1349, 121, 83], body: "Themenvorschlag aus dem Entwurf. Ein fachlich geprüfter Artikel wird hier vor Veröffentlichung ergänzt." },
 { title: "Warum Marken wieder Persönlichkeit brauchen", crop: [568, 1349, 124, 83], body: "Themenvorschlag aus dem Entwurf. Der finale Beitrag folgt." },
 { title: "SEO im Zeitalter generativer Suchmaschinen", crop: [703, 1349, 121, 83], body: "Themenvorschlag aus dem Entwurf. Der finale Beitrag folgt." }
];
export const steps = [["Verstehen", "Ziele, Menschen, Möglichkeiten"], ["Konzipieren", "Strategie, Idee, Lösung"], ["Umsetzen", "Design, Technologie, Content"], ["Weiterentwickeln", "Optimieren, Skalieren, Begleiten"]];

export type Locale = "en" | "de" | "fr";
export const locales: Locale[] = ["en", "de", "fr"];
export const company = { name: "SABOCON GmbH", email: "contact@sabocon.com", personalEmail: "marc.w@sabocon.com", phone: "+49 6103 984937", mobile: "+49 171 3144784", street: "Alte Bogengasse 25", postalCode: "63303", city: "Dreieich", country: "Germany", register: "HRB 34388", court: "Amtsgericht Offenbach", vat: "DE204691339", director: "Marc Werner", booking: "https://calendly.com/sabocon/15minsabocon", review: "https://g.page/r/CWfaPVPT0USgEBM/review" };
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.sabocon.com").replace(/\/$/, "");
export const isPublished = process.env.PUBLISH_SITE === "true";
export const translate = (locale: Locale, en: string, de: string) => locale === "fr" ? (french as Record<string,string>)[en] || en : locale === "en" ? en : de;
export function content(locale: Locale) {
 const en = locale === "en";
 if(locale === "fr") return frenchContent();
 return {
 hero: en ? hero.paragraphs : ["Wir sind eine Agentur für Creative Technology, Grafikdesign und Branding mit Sitz im Raum Frankfurt, Deutschland.", "Ein Team aus Designern, Technologen, Musikern und Futuristen – verwurzelt im Erzählen von Geschichten und getragen von Zusammenarbeit.", "Wir schaffen digitale Produkte, Marken und Erlebnisse, die verbinden. Von visuellen Identitäten über Websites, Apps und Motion Design bis hin zu Events und interaktiven Installationen.", "💡 Wenn du kluge Ideen und mutiges Design suchst, freuen wir uns, von dir zu hören."],
 services: services.map((s,i)=> ({...s, title: en ? s.title : ["Strategie & Marke", "Digitale Erlebnisse", "KI & intelligente Systeme", "Inhalte & Kommunikation", "Klang & Erlebnis"][i], items: en ? [["Consulting", "Brand strategy", "Corporate identity", "Design", "Communication"], ["Websites", "Headless CMS", "UX/UI", "E-commerce", "Digital applications"], ["AI integration", "Automation", "Workflows", "Knowledge systems", "Process optimisation"], ["Social media", "Campaigns", "Content", "SEO & GEO", "LLM optimisation"], ["SABOCON SOUND SCOUTS", "Audio branding", "Sonic logos", "Music production", "Sound design"]][i] : s.items })),
 insights: insights.map((s,i)=>({...s, title: en ? ["AI as a tool, not an end in itself", "EU AI Act – what matters now", "Why brands need personality again", "SEO in the age of generative search"][i] : s.title, body: en ? "Topic preview from the design concept. The final editorial article will be added before publication." : "Themenvorschau aus dem Designentwurf. Der finale redaktionelle Beitrag wird vor Veröffentlichung ergänzt."})),
 steps: en ? [["Understand", "Goals, people, possibilities"], ["Concept", "Strategy, idea, solution"], ["Build", "Design, technology, content"], ["Evolve", "Optimise, scale, support"]] : steps
 };
}

function frenchContent(){return {hero:["Nous sommes une agence de technologie créative, de design graphique et de branding basée dans la région de Francfort, en Allemagne.","Une équipe de designers, de technologues, de musiciens et de visionnaires — ancrée dans le récit et portée par la collaboration.","Nous créons des produits numériques, des marques et des expériences qui créent du lien. Identités visuelles, sites web, applications, motion design, événements et installations interactives.","💡 Vous cherchez des idées ingénieuses et un design audacieux ? Parlons-en."],services:services.map((s,i)=>({...s,title:["Stratégie & marque","Expériences numériques","IA & systèmes intelligents","Contenu & communication","Son & expérience"][i],items:[["Conseil","Stratégie de marque","Identité de marque","Design","Communication"],["Sites web","CMS headless","UX/UI","E-commerce","Applications numériques"],["Intégration de l’IA","Automatisation","Flux de travail","Systèmes de connaissances","Optimisation des processus"],["Réseaux sociaux","Campagnes","Contenu","SEO & GEO","Optimisation pour les LLM"],["SABOCON SOUND SCOUTS","Identité sonore","Logos sonores","Production musicale","Design sonore"]][i]})),insights:insights.map((s,i)=>({...s,title:["L’IA comme outil, pas comme finalité","Règlement européen sur l’IA : les enjeux actuels","Pourquoi les marques ont besoin de personnalité","Le SEO à l’ère des moteurs génératifs"][i],body:"Aperçu du sujet issu du concept graphique. L’article définitif sera ajouté avant publication."})),steps:[["Comprendre","Objectifs, personnes, possibilités"],["Concevoir","Stratégie, idée, solution"],["Réaliser","Design, technologie, contenu"],["Faire évoluer","Optimiser, développer, accompagner"]]};}
