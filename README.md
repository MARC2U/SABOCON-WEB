# SABOCON — Homepage-Prototyp

Next.js App Router, TypeScript (strict), Tailwind CSS 4. Responsiver lokaler Prototyp nach dem am 8. Oktober 2026 bereitgestellten Entwurf und Wireframe. Keine öffentliche Veröffentlichung.

## Lokal starten

Voraussetzung: Node.js 20.9 oder neuer und npm.

```sh
cd sabocon-prototype
npm ci
npm run dev
```

http://127.0.0.1:3000 öffnen. Wenn der Port belegt ist, den vom Server ausgegebenen Port verwenden.

```sh
npm run typecheck
npm run build
npm start
```

Build und Entwicklung verwenden explizit Webpack, weil Turbopack in dieser eingeschränkten Laufzeitumgebung keine internen Ports öffnen konnte.

## Aufbau

- `src/app/`: Homepage, Metadaten, Icon und responsive Styles.
- `src/components/header.tsx`: Navigation und zugängliches Menü.
- `src/components/sections.tsx`: Hero, Positionierung, Leistungen, Insights, Prozess, Kontakt, Footer.
- `src/components/work.tsx`: Selected Work mit Filter-Demonstration und Projektinformationen.
- `src/components/reference-art.tsx`: SVG-Viewports für die Bildausschnitte der Designvorlage.
- `src/content/site.ts`: Hero-Originaltext, Leistungslisten, Projekt-/Artikelmotive, Prozessschritte.
- `public/reference/`: unveränderte Kopien des hochgeladenen Entwurfs und Wireframes.
- `public/brand/`: unveränderte Kopien der SABOCON-Originalassets.

Alle Homepage-Texte und Bedienelemente sind HTML/React, nicht ein Screenshot der gesamten Seite. Die Motive werden über SVG-Viewports aus dem bereitgestellten Designbild dargestellt. Die Auflösung der Vorlage ist begrenzt; das ist eine Zwischenlösung für den Prototyp. Für eine finale Veröffentlichung die Motive als separate Originalbilder bereitstellen und die Referenzdarstellung ersetzen. Die Referenzdateien unter `../sources/` wurden nicht verändert.

## Designabgleich

Heller Hero mit dreizeiligem Titel und orangefarbener Porträt-/Architekturcollage; schwarze Belief-Sektion mit Mondmotiv; fünf bebilderte Leistungsspalten; Selected Work auf Schwarz; kompakte vierteilige Insights; vier Prozessschritte; orangefarbener Kontaktabschluss; kompakter Footer. Orange #ff5100 folgt dem Designentwurf. Die leicht andere Orange-Farbe der Logoassets bleibt in den Originaldateien erhalten.

Die Seitentypografie nutzt Arial/Helvetica als kontrollierten Fallback zur Vorlage. Eine lizenzierte Panton-Webfontdatei ist nicht enthalten. Bei Bereitstellung über next/font/local einbinden. Die Wortmarke ist typografisch rekonstruiert; für finale Genauigkeit eine eigenständige Wortmarkendatei ergänzen. Die gelieferten grafischen Logoassets stehen unter public/brand bereit.

## Redaktioneller Status

Der vollständige Hero-Text ist vom Nutzer bestätigt und wortgetreu eingebunden (einschließlich „visualidentities“). Die fünf Leistungsbereiche, Leistungslisten, Belief-Copy, Insights-Titel und Prozessschritte stammen aus der nun gelieferten Vorlage.

Projektbilder stammen aus dem Designentwurf und sind keine unabhängig bestätigten Projektoriginale. Kategorien demonstrieren die Filterfunktion und sind noch zu bestätigen. Projektleistungen und Kennzahlen werden nicht erfunden. Die Artikelvorschauen sind ausdrücklich Platzhalter, keine veröffentlichten oder fachlich geprüften Beiträge.

Frankfurt, Germany stammt aus dem bestätigten Hero-Originaltext. E-Mail und Telefonnummer aus dem Mockup wurden nicht als echte Daten übernommen. Kontakt, Impressum und Datenschutz bleiben klar markierte Platzhalter. Es werden keine Anfragen versendet. Nicht bestätigte Jobs, Social-Media-Profile und Sprachumschalter sind nicht als funktionslose Links umgesetzt.

## Accessibility und SEO

Semantische Bereiche, eine H1, deutsche Dokumentsprache und englische Hero-Copy, Sprunglink, Fokuszustände, native Buttons/Links/details, aria-expanded am Menü, aria-pressed an Filtern, live region für Projektauswahl und Reduced-Motion-Unterstützung. Kein vollständiger Konformitätsnachweis.

Titel, Beschreibung, Open-Graph-Metadaten und Icon vorhanden. Der Prototyp nutzt noindex/nofollow. Vor Veröffentlichung robots freigeben, bestätigte Produktionsdomain für metadataBase/canonical konfigurieren, Sitemap und finale Social-Vorschaugrafik ergänzen.

## Vorschau und Prüfung

Die Vorschau läuft über den lokalen Next.js-Server. Nach dessen Beendigung mit `npm run dev` erneut starten. Die Umsetzung wurde auf Desktop und Smartphone geprüft; Produktionsbuild und TypeScript-Prüfung sind erfolgreich.

## Wiederkehrendes Logo

Das originale Signet ist im Header, als grafischer Akzent neben „Think. Create. Build. Evolve.“ und im Footer integriert. `BrandMark` verwendet die unveränderte freistehende runde Originaldatei `sabocon-round-orange.png` (aus „Logo_with-01b white.png“) und färbt ausschließlich deren Form beim Rendern per SVG-Filter in #ff5100. Die Quelldatei bleibt erhalten. Größe und Platzierung passen sich an mobile Ansichten an.

## Zweisprachigkeit und Maschinenlesbarkeit

`/` leitet auf `/en` weiter. Englisch und Deutsch liegen als serverseitig vorgerenderte Seiten unter `/en` und `/de`; der Sprachwechsel hält den Seitentyp (auch Impressum/Datenschutz/Barrierefreiheit). Texte, zugängliche Beschriftungen, Kontaktangaben und Metadaten sind lokalisiert. Die HTML-Dokumentsprache entspricht der gewählten Sprache.

JSON-LD enthält ausschließlich die vom Nutzer gelieferten Unternehmens-/Kontaktdaten. Canonical-Links, hreflang, `/sitemap.xml`, `/robots.txt` und eine optionale `/llms.txt`-Übersicht sind vorhanden. llms.txt ist ein ergänzendes Textformat, keine Garantie für Aufnahme oder Sichtbarkeit in KI-Systemen. Inhalte sind bereits im initialen HTML lesbar; Navigation und Kontaktlinks funktionieren ohne JavaScript, interaktive Filter benötigen JavaScript.

`NEXT_PUBLIC_SITE_URL` konfiguriert die spätere Produktionsdomain; standardmäßig https://www.sabocon.com. `PUBLISH_SITE` bleibt standardmäßig false: Meta-Robots und robots.txt verhindern die gewünschte Indexierung während der Entwicklung. Vor Veröffentlichung Domain, Inhalte und Rechtstexte prüfen und PUBLISH_SITE=true setzen. Eine reine robots.txt-Sperre verhindert nicht garantiert jede Indexierung.

## Kontakte und rechtliche Seiten

Kontaktangaben: contact@sabocon.com, marc.w@sabocon.com, +49 6103 984937, +49 171 3144784, SABOCON GmbH, Alte Bogengasse 25, 63303 Dreieich. Calendly und Google-Bewertungsseite werden nur direkt verlinkt, nicht eingebettet. Marc Werner ist Geschäftsführer / CEO und Creative Director. Als redaktionell verantwortliches Unternehmen wird auf Nutzerwunsch SABOCON GmbH genannt, nicht Marc Werner.

Das zweisprachige Impressum übernimmt HRB 34388, Amtsgericht Offenbach und USt-ID DE204691339 aus den Nutzerangaben. Es verwendet § 5 DDG. Nach Nutzerbestätigung erklärt das Impressum die fehlende Bereitschaft zur Teilnahme an Verbraucherschlichtung; eine gesetzliche Nichtverpflichtung wird nicht ungeprüft behauptet. Der Nutzer beschreibt die Tätigkeit als ausschließlich für Geschäftskunden. Die redaktionelle Unternehmensverantwortung wird SABOCON GmbH zugeordnet. Diese Angabe wird nicht als Benennung einer natürlichen Person nach § 18 Abs. 2 MStV bezeichnet. Die Insights enthalten derzeit nur Themenvorschauen; vor Veröffentlichung journalistisch-redaktioneller Angebote ist die Benennungspflicht nach § 18 Abs. 2 MStV zu prüfen. Langen ist als Nutzerwunsch für spätere Vertragsbedingungen dokumentiert; keine unbestätigte pauschale Gerichtsstandsklausel im Impressum. Die finalen Rechtstexte sind vor Veröffentlichung fachlich zu prüfen.

Datenschutz ist ein gesondert gekennzeichneter Entwurf: Hostinganbieter, Serverlogs, Empfänger und Speicherfristen fehlen noch. Keine vollständige Produktiv-Datenschutzerklärung behauptet. Die Accessibility-Seite nennt den Entwicklungsstand und offene Prüfungen statt einer unbewiesenen Konformitätserklärung. WCAG 2.2 AA ist das technische Ziel; die BFSG-Anwendbarkeit ist nicht allein aus einer Agentur-Homepage ableitbar.

Aktuell geprüfte Grundlagen (8. Oktober 2026):
- https://www.gesetze-im-internet.de/ddg/BJNR0950B0024.html#BJNR0950B0024BJNG000300000
- https://www.gesetze-im-internet.de/vsbg/__36.html
- https://www.die-medienanstalten.de/fileadmin/user_upload/Rechtsgrundlagen/Gesetze_Staatsvertraege/Medienstaatsvertrag_MStV.pdf
- https://consumer-redress.ec.europa.eu/site-relocation_en (EU-OS-Plattform seit 20. Juli 2025 eingestellt; kein veralteter OS-Link)
- https://www.w3.org/TR/WCAG22/
- https://www.gesetze-im-internet.de/bfsg/__1.html

## CMS und Blog (8. Oktober 2026)

Sanity Studio unter `/studio`, Blog unter `/en/blog` und `/de/blog`. Noch kein echtes Sanity-Projekt verbunden; Einrichtung und Bedienung siehe [CONTENT-EDITOR.md](./CONTENT-EDITOR.md). Datenzugriff erfolgt serverseitig; veröffentlichte Inhalte werden mit 60 Sekunden Cache gelesen, Entwürfe nur in geschützter Vorschau mit Read-Token. Projekte, Blog und Hero/Positionierung haben CMS-Felder. Andere Startseitenbereiche verbleiben im Code. CMS-Projekte ersetzen die Konzeptkarten, sobald mindestens eines veröffentlicht ist.

Die LinkedIn-POST-Importschnittstelle ist vorbereitet und ohne Servergeheimnisse gesperrt. Kein OAuth, kein geplanter Abruf, kein Medienimport und keine externe Veröffentlichung eingerichtet. Standard: Entwürfe; direkte Veröffentlichung per expliziter Serverkonfiguration nach Genehmigung. Sicherheitstests: `node --test tests/linkedin-import.test.mjs` (Node 22.18+ für native TypeScript-Ausführung).
