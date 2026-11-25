"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { ExternalLink } from "./external-link";
import type { Locale } from "@/content/site";

const ornaments = [[49, 26], [41, 43], [59, 46], [34, 62], [52, 61], [65, 69]] as const;
const occasions = ["christmas", "easter", "valentine"] as const;
const occasionIcons = {
  christmas: (
    <>
      <path d="M16 4 9.5 12h3L7 19h4l-6 7h22l-6-7h4l-5.5-7h3L16 4Z" fill="#111" />
      <path d="M16 25v4" stroke="#111" strokeWidth="3" />
      <path d="M13 15h.1m5 4h.1m-6 4h.1m9 0h.1" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  easter: (
    <>
      <path d="M16 4C11 4 7 13 7 20a9 9 0 0 0 18 0c0-7-4-16-9-16Z" fill="#111" />
      <path d="m9.5 16.5 3 2.5 3.5-3 3.5 3 3-2.5M13 23h.1m6 0h.1" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  valentine: (
    <>
      <path d="M16 26.5 6.4 17a6.6 6.6 0 0 1 9.3-9.3l.3.3.3-.3a6.6 6.6 0 0 1 9.3 9.3L16 26.5Z" fill="#111" />
      <path d="M8 13a3 3 0 0 1 3-3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
};
const campaignMockups = ["summer-halloween", "forest-gifts", "forest-harvest"] as const;

const donation = 5;
const goal = ornaments.length * donation;

const translations = {
  en: {
    title: "A tree that grows with every donation.",
    intro: "Add a test donation and see the campaign move closer to its goal. At Christmas, each donation adds a decoration to the tree.",
    notice: "Interactive preview. No payment or personal data.",
    add: "Add €5 test donation",
    reset: "Reset demo",
    progress: "Demo fundraising progress",
    of: "of",
    reached: "Demo goal reached.",
    themeLabel: "Choose an occasion",
    themes: { christmas: "Christmas", easter: "Easter", valentine: "Valentine’s Day" },
    mockupAlt: { easter: "Easter eggs and butterflies in a spring meadow", valentine: "Red heart balloons on a faceted pink background" },
    galleryCaptions: ["Summer campaign with beach balls and Halloween campaign with pumpkins", "Tree-planting campaign and a campaign with floating gift boxes", "Tree-planting campaign and a grape harvest campaign"],
    flexibility: "Adapt it to your campaign",
    details: [
      "Campaign design: colours, imagery, branding and the charity’s story can match the occasion and your organisation.",
      "Personal recognition: virtual gifts can carry a donor’s name, message, photo or logo if the campaign enables it.",
      "Campaign setup: embed the experience on a website or landing page and choose suitable payment options and optional PDF receipts.",
    ],
    product: "Explore XMSdonate",
    demo: "Open full demo",
    example: "See the Monikahaus campaign",
    contact: "Discuss your own campaign",
  },
  de: {
    title: "Ein Baum, der mit jeder Spende wächst.",
    intro: "Füge eine Testspende hinzu und sieh, wie die Kampagne ihrem Spendenziel näherkommt. Zu Weihnachten schmückt jede Spende den Baum.",
    notice: "Interaktive Vorschau ohne Zahlung oder persönliche Daten.",
    add: "5 € Testspende hinzufügen",
    reset: "Demo zurücksetzen",
    progress: "Spendenfortschritt der Demo",
    of: "von",
    reached: "Demo-Ziel erreicht.",
    themeLabel: "Spendenanlass wählen",
    themes: { christmas: "Weihnachten", easter: "Ostern", valentine: "Valentinstag" },
    mockupAlt: { easter: "Bunte Ostereier und Schmetterlinge auf einer Frühlingswiese", valentine: "Rote Herzballons vor einem facettierten rosa Hintergrund" },
    galleryCaptions: ["Sommerkampagne mit Wasserbällen und Halloween-Kampagne mit Kürbissen", "Baumpflanzaktion und Kampagne mit schwebenden Geschenken", "Baumpflanzaktion und Kampagne zur Weinlese"],
    flexibility: "So lässt sich die Kampagne anpassen",
    details: [
      "Corporate Design: Farben, Motive, Markenauftritt und die Vorstellung des Spendenzwecks werden auf eure Organisation und den Anlass abgestimmt.",
      "Persönliche Spendenmotive: Je nach Konfiguration lassen sich Name, Nachricht, Foto oder Logo ergänzen.",
      "Einbindung und Funktionen: Die Aktion lässt sich in eine Website oder Landingpage integrieren. Zahlungsarten und optionale PDF-Spendenbescheinigungen werden je nach Kampagne eingerichtet.",
    ],
    product: "XMSdonate entdecken",
    demo: "Vollständige Demo öffnen",
    example: "Monikahaus-Spendenaktion ansehen",
    contact: "Eigene Kampagne besprechen",
  },
  fr: {
    title: "Un sapin qui grandit avec chaque don.",
    intro: "Ajoutez un don fictif pour faire avancer la collecte. À Noël, chaque don ajoute une décoration au sapin.",
    notice: "Aperçu interactif sans paiement ni données personnelles.",
    add: "Ajouter un don fictif de 5 €",
    reset: "Réinitialiser la démo",
    progress: "Progression de la collecte fictive",
    of: "sur",
    reached: "Objectif de la démo atteint.",
    themeLabel: "Choisir une occasion",
    themes: { christmas: "Noël", easter: "Pâques", valentine: "Saint-Valentin" },
    mockupAlt: { easter: "Œufs de Pâques et papillons dans une prairie printanière", valentine: "Ballons rouges en forme de cœur sur un fond rose à facettes" },
    galleryCaptions: ["Campagne estivale avec des ballons de plage et campagne d’Halloween avec des citrouilles", "Campagne de plantation d’arbres et campagne avec des coffrets cadeaux flottants", "Campagne de plantation d’arbres et campagne sur les vendanges"],
    flexibility: "Adapter la plateforme à votre campagne",
    details: [
      "Identité visuelle : couleurs, motifs, image de marque et présentation de la cause s’adaptent à votre organisation et à l’occasion.",
      "Dons personnalisés : selon la configuration, un don peut porter un nom, un message, une photo ou un logo.",
      "Intégration et fonctionnalités : la campagne peut être intégrée à un site ou à une page dédiée, avec des modes de paiement adaptés et des reçus PDF en option.",
    ],
    product: "Découvrir XMSdonate",
    demo: "Ouvrir la démo complète",
    example: "Voir la collecte du Monikahaus",
    contact: "Parler de votre campagne",
  },
};

export function FundraisingDemo({ locale }: { locale: Locale }) {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState<(typeof occasions)[number]>("christmas");
  const copy = translations[locale];
  const amount = count * donation;
  const complete = amount === goal;
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <section id="xmsdonate" className="fundraising" aria-labelledby="fundraising-title">
      <div className="fundraising-copy">
        <p className="eyebrow">XMSDONATE</p>
        <h3 id="fundraising-title">{copy.title}</h3>
        <p>{copy.intro}</p>
        <p className="fundraising-notice" id="fundraising-notice">{copy.notice}</p>
        <div className="fundraising-themes" role="group" aria-label={copy.themeLabel}>
          {occasions.map((occasion) => (
            <button key={occasion} type="button" aria-pressed={theme === occasion} onClick={() => setTheme(occasion)}>
              <span className="fundraising-theme-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" focusable="false">{occasionIcons[occasion]}</svg>
              </span>
              <span>{copy.themes[occasion]}</span>
            </button>
          ))}
        </div>
        <div className="fundraising-actions">
          <button
            type="button"
            aria-describedby="fundraising-notice"
            aria-disabled={complete}
            className="pill"
            onClick={() => setCount((previous) => Math.min(previous + 1, ornaments.length))}
          >
            {copy.add}
          </button>
          <button type="button" className="fundraising-reset" aria-disabled={count === 0} onClick={() => setCount(0)}>
            {copy.reset}
          </button>
        </div>
        <ul className="fundraising-links" role="list">
          <li><ExternalLink href="https://www.xmsdonate.de/" locale={locale}>{copy.product} ↗</ExternalLink></li>
          <li><ExternalLink href="https://xms.sabocon.com/" locale={locale}>{copy.demo} ↗</ExternalLink></li>
          <li><ExternalLink href="https://monikahaus.xmsdonate.de/" locale={locale}>{copy.example} ↗</ExternalLink></li>
        </ul>
        <a className="fundraising-contact" href="#kontakt">{copy.contact} <span aria-hidden="true">→</span></a>
      </div>
      <div className="fundraising-scene" data-theme={theme}>
        {theme === "christmas" ? (
          <div className="fundraising-tree" aria-hidden="true">
            <div className="fundraising-tree-grow" style={{ "--tree-scale": .85 + .15 * amount / goal } as CSSProperties}>
              <span className="fundraising-tree-shape" />
              {ornaments.slice(0, count).map(([x, y]) => (
                <span key={x} className="fundraising-ornament" style={{ "--x": `${x}%`, "--y": `${y}%` } as CSSProperties} />
              ))}
            </div>
          </div>
        ) : (
          <div className="fundraising-mockup">
            <Image
              src={`/projects/xmsdonate/${theme}.webp`}
              alt={copy.mockupAlt[theme]}
              width={1200}
              height={1200}
              sizes="(max-width: 700px) 90vw, 400px"
            />
          </div>
        )}
        <progress className="fundraising-progress" value={amount} max={goal} aria-label={copy.progress} />
        <p className="fundraising-total" role="status">
          <strong>{currency.format(amount)}</strong> {copy.of} {currency.format(goal)}
          {complete && <span className="sr-only">. {copy.reached}</span>}
        </p>
      </div>
      <details className="fundraising-details">
        <summary>{copy.flexibility}</summary>
        <ul>{copy.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        <div className="fundraising-gallery">
          {campaignMockups.map((mockup, index) => (
            <figure key={mockup}>
              <Image
                src={`/projects/xmsdonate/${mockup}.webp`}
                alt=""
                width={1440}
                height={960}
                sizes="(max-width: 700px) 90vw, 30vw"
              />
              <figcaption>{copy.galleryCaptions[index]}</figcaption>
            </figure>
          ))}
        </div>
      </details>
    </section>
  );
}
