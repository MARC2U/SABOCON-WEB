"use client";

import Image from "next/image";
import type { Locale } from "@/content/site";

const sounds = [
  { id: "sonic-signature", rhythm: [28, 52, 78, 47, 84, 62, 37, 20] },
  { id: "interaction-sound", rhythm: [16, 60, 30, 12, 86, 42, 19, 12] },
  { id: "sound-atmosphere", rhythm: [22, 36, 53, 68, 78, 65, 47, 30] },
] as const;

const copy = {
  en: {
    title: "Hear what a brand can sound like.",
    intro: "Three original sound sketches for this demo.",
    contact: "Talk to us about sound",
    poster: "Sound Scouts poster. A DJ with headphones and turntables, an orange waveform and references to audio productions for ADIDAS, PAMPERS, HUGO BOSS, MARLBORO and COTY.",
    services: "Music composition, voice production, sound design and sonic branding, music research and rights clearance, and audio production from concept to final master.",
    labels: ["Sonic signature", "Interaction sound", "Sound atmosphere"],
    descriptions: [
      "Four bright tones and a warm ending. A short opening or sign-off.",
      "A crisp two-part chime. Feedback for a successful action.",
      "Soft, overlapping tones. A quieter mood for a space or experience.",
    ],
  },
  de: {
    title: "Hör, wie eine Marke klingen kann.",
    intro: "Drei eigens für diese Demo erstellte Klangskizzen.",
    contact: "Über Klang sprechen",
    poster: "Sound-Scouts-Plakat mit einem DJ an Plattenspielern, einer orangefarbenen Schallwelle und den Referenzen ADIDAS, PAMPERS, HUGO BOSS, MARLBORO und COTY.",
    services: "Musikkomposition, Sprachproduktionen, Sounddesign und Sonic Branding, Musikrecherche und Rechteklärung sowie Audioproduktion von der Idee bis zum finalen Master.",
    labels: ["Sonic Logo", "Interaktionsklang", "Klangatmosphäre"],
    descriptions: [
      "Vier helle Töne mit warmem Ausklang. Ein kurzer Auftakt oder Abschluss.",
      "Ein kurzer, zweiteiliger Klang. Eine hörbare Bestätigung für eine erfolgreiche Aktion.",
      "Weiche Töne, die sich überlagern. Eine ruhige Stimmung für Räume oder Erlebnisse.",
    ],
  },
  fr: {
    title: "Écoutez comment une marque peut sonner.",
    intro: "Trois esquisses sonores originales créées pour cette démo.",
    contact: "Parlons de votre projet sonore",
    poster: "Affiche Sound Scouts avec un DJ aux platines, une onde sonore orange et des références à ADIDAS, PAMPERS, HUGO BOSS, MARLBORO et COTY.",
    services: "Composition musicale, production de voix, design et identité sonores, recherche musicale et gestion des droits, de la première idée au master final.",
    labels: ["Signature sonore", "Son d’interaction", "Ambiance sonore"],
    descriptions: [
      "Quatre notes claires et une fin chaleureuse. Pour ouvrir ou conclure.",
      "Un carillon bref en deux temps. Pour confirmer une action réussie.",
      "Des sons doux qui se superposent. Une ambiance calme pour un lieu ou une expérience.",
    ],
  },
};

export function SoundExamples({ locale }: { locale: Locale }) {
  const text = copy[locale];

  function pauseOtherExamples(current: HTMLAudioElement) {
    for (const player of current.closest("section")?.querySelectorAll("audio") ?? []) {
      if (player !== current) player.pause();
    }
  }

  return (
    <section id="sound" className="section-block sound-examples" aria-labelledby="sound-title">
      <div className="sound-example-intro">
        <div>
          <p className="eyebrow">SABOCON SOUND SCOUTS</p>
          <h2 id="sound-title">{text.title}</h2>
          <p>{text.services}</p>
          <a className="sound-contact" href="#kontakt">{text.contact} <span aria-hidden="true">→</span></a>
        </div>
        <div className="sound-example-poster">
          <Image
            src="/visuals/sound-scouts-poster.webp"
            alt={text.poster}
            width={1086}
            height={1448}
            sizes="(max-width: 640px) 92vw, 420px"
          />
        </div>
      </div>
      <p className="sound-example-caption">{text.intro}</p>
      <div className="sound-example-grid">
        {sounds.map(({ id, rhythm }, index) => (
          <article key={id}>
            <div className="sound-example-wave" aria-hidden="true">
              {rhythm.map((height, bar) => <span key={bar} style={{ height: `${height}%` }} />)}
            </div>
            <h3 id={`sound-${id}-title`}>{text.labels[index]}</h3>
            <p id={`sound-${id}-description`}>{text.descriptions[index]}</p>
            <audio
              controls
              preload="none"
              src={`/audio/${id}.wav`}
              aria-labelledby={`sound-${id}-title`}
              aria-describedby={`sound-${id}-description`}
              onPlay={(event) => pauseOtherExamples(event.currentTarget)}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
