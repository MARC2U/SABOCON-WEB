# SABOCON – Redaktion einrichten und bedienen

## Stand

Die Website enthält die Sanity-Anbindung, Eingabeformulare und zweisprachige Blogseiten. Ohne Projekt-ID zeigt /studio eine Einrichtungsseite. Es existiert noch kein verbundenes Sanity-Konto. LinkedIn wird noch nicht automatisch abgerufen. Es wurden keine Beiträge auf LinkedIn oder extern veröffentlicht.

## Einmalige Einrichtung (Marc und technische Betreuung)

1. Bei https://www.sanity.io/manage mit einem Unternehmenskonto ein Projekt anlegen. Dataset `production` erstellen. Für diese Konfiguration ein öffentlich lesbares Dataset verwenden; Entwürfe bleiben zugriffsgeschützt. Veröffentlichte Datensätze sind öffentlich abrufbar und dürfen keine internen Informationen enthalten.
2. Projekt-ID notieren. `.env.example` als `.env.local` kopieren; `NEXT_PUBLIC_SANITY_PROJECT_ID` und `NEXT_PUBLIC_SANITY_DATASET` ergänzen.
3. Im Sanity-Projekt unter API / CORS Origins `http://127.0.0.1:3000` mit Credentials zulassen. Später auch die endgültige Website-Adresse ergänzen, keine pauschalen Wildcards.
4. Mitglieder einladen und geeignete Rechte vergeben. Redaktion meldet sich mit eigenem Konto an; keine geteilten Passwörter.
5. Website neu starten. http://127.0.0.1:3000/studio öffnen und bei Sanity anmelden.
6. Optional für Entwurfsvorschau einen Read-Token mit passenden Leserechten erstellen und serverseitig als SANITY_API_READ_TOKEN hinterlegen. Einen langen zufälligen CMS_PREVIEW_SECRET erzeugen. Keine Tokens im Chat, Repository oder NEXT_PUBLIC-Variablen speichern.
7. In Produktion dieselben Variablen im Hosting setzen; nach Änderung der öffentlichen Projekt-ID neu bauen. Hosting und CMS in Datenschutzhinweisen berücksichtigen.

## Projekte bearbeiten (Praktikant)

1. /studio öffnen und anmelden.
2. „Projekte / Selected Work“ öffnen; neuen Eintrag erstellen.
3. Projektname eintragen. URL-Name einmalig setzen, z. B. sinoscan.
4. Kategorie wählen und Reihenfolge eintragen: 10, 20, 30, 40.
5. Titelbild hochladen; den Bildfokus bei Bedarf einstellen. Die Website verwendet derzeit einen zentrierten Ausschnitt; Sanity-Fokusauswertung ist noch nicht integriert. Bei wichtigen Motiven deshalb einen passenden 3:2-Ausschnitt hochladen.
6. Bildbeschreibung und Kurzbeschreibung auf Englisch und Deutsch eintragen. Bildquelle ergänzen.
7. Aufgabenstellung, Beitrag und Projektlink ergänzen.
8. Entwurf gemeinsam mit Marc prüfen. Erst nach Inhalts- und Bildrechtefreigabe „Publish“ wählen.
9. Website nach spätestens etwa einer Minute neu laden. Die Website verwendet veröffentlichte CMS-Projekte, sobald welche vorliegen. Ohne CMS-Projekte bleiben die vier bisherigen Konzeptkarten sichtbar.

## Blog bearbeiten

1. „Blog / LinkedIn-Beiträge“ öffnen; Eintrag erstellen.
2. URL-Name, Titel, Kurzbeschreibung, Text und Datum ergänzen.
3. Titel und Text in mindestens einer Sprache vollständig ausfüllen. Ein englischer Beitrag ohne deutsche Übersetzung erscheint nur im englischen Blog. Keine automatische Übersetzung.
4. Optional Titelbild mit Bildbeschreibung in derselben Sprache und Quellenlink ergänzen.
5. Nach Prüfung veröffentlichen. Zukunftsdatierte Beiträge erscheinen erst nach ihrem Datum und nächster Aktualisierung.
6. Beiträge finden sich unter /en/blog bzw. /de/blog; die vier neuesten passenden Beiträge erscheinen auf der Homepage.

## Startseite

„Startseite – Texte“ ist ein fester Eintrag. Vier Hero-Absätze und Positionierung sind bearbeitbar. Leere Sprachfelder verwenden die bisherige Fassung. Navigation, Leistungen, Prozess, Kontakt und Layout werden weiterhin im Code gepflegt; nicht sämtliche Bereiche sind bereits CMS-Felder.

## Entwurfsvorschau (technische Betreuung)

Nach Konfiguration von Read-Token und Preview-Secret privat aufrufen:
`/api/preview?secret=DEIN_SECRET&path=/en`
oder als path `/de`, `/en/blog` bzw. `/en/blog/URL-NAME`.

Die URL enthält das Vorschau-Geheimnis: nicht öffentlich teilen. Ein Banner kennzeichnet die Vorschau. „Vorschau beenden“ schaltet auf veröffentlichte Inhalte zurück. Keine eingebettete visuelle Bearbeitung eingerichtet. Zukünftige Artikel bleiben auch in der Vorschau derzeit bis zu ihrem Datum ausgeblendet.

## LinkedIn-Vorbereitung

Die geschützte POST-Schnittstelle /api/linkedin/import akzeptiert normalisierte eigene Posts. Sie ist für einen späteren zugelassenen serverseitigen Adapter vorgesehen, nicht für öffentliche Formulare. Ohne Geheimnis und Write-Token ist sie deaktiviert. Kein Scheduler, OAuth-Login oder Live-Abruf ist bisher eingerichtet.

Servervariablen: SANITY_API_WRITE_TOKEN mit geeigneten Schreibrechten, LINKEDIN_IMPORT_SECRET und optional LINKEDIN_IMPORT_PUBLISH=true. Standard ist Entwurfsimport. Direkte Veröffentlichung erst aktivieren, wenn LinkedIn den Verwendungszweck erlaubt und Text-/Medienimport geprüft wurden.

Payload: id (stabile LinkedIn-Post-ID), text, language (`en` oder `de`), publishedAt (ISO-Datum), url (HTTPS-LinkedIn-Original), optional title.

Stabile Dokument-IDs verhindern doppelte Importe. Bestehende Beiträge werden nicht überschrieben; bearbeitete oder gelöschte LinkedIn-Posts werden noch nicht synchronisiert. Der vorbereitete Import übernimmt Text, Datum und Quelle. Bilder, Videos, Karussells und fremde Reposts benötigen gesonderte Behandlung. Nicht behaupten, dass der vollständige LinkedIn-Feed bereits verbunden ist.

## Vor Veröffentlichung

Originalbilder und bestätigte Inhalte ergänzen; CMS mit echtem Konto testen; Entwurfsvorschau und Nutzerrollen testen; Datenschutzhinweise und ggf. redaktionelle Benennung prüfen. PUBLISH_SITE bleibt bis zur abschließenden Freigabe false. Domain/DNS wurden nicht verändert.

## Paketprüfung / offener Veröffentlichungspunkt

Am 8. Oktober 2026 meldet npm audit 17 Findings (10 high, 7 moderate), überwiegend aus Sanity-CLI, Codegenerierung und deren Abhängigkeiten (Archiv-, Muster- und YAML-Verarbeitung). Kompatible Korrekturen und die empfohlenen Versionskombinationen wurden geprüft; pauschale automatische Downgrades lösen die Abhängigkeitsketten nicht zuverlässig. Aktuell festgelegte Versionen: sanity 5.31.2 und next-sanity 13.3.4. Die lokale Vorbereitung ist nutzbar, der öffentliche Betrieb ist noch nicht freigegeben. Vor Veröffentlichung verbleibende Findings mit aktuellen Herstellerversionen beheben bzw. ihre tatsächliche Erreichbarkeit im Produktionsbundle bewerten. Kein ZIP-Import oder Sanity-CLI-Import wurde verwendet.

## Französisch (23. November 2026)

Französische Website unter /fr; Sprachwechsel EN / DE / FR. Projektvorschauen, Bildbeschreibungen und die drei lokalen Blogbeiträge sind übersetzt. Im Studio sind französische Felder für Texte, Bildbeschreibungen, Blogtext und Hero ergänzt. Neue CMS-Beiträge erscheinen nur in Sprachen mit Titel und Text. Für Projekte verlangt die Validierung Kurz- und Bildbeschreibungen in allen drei Sprachen. Spätere neue Inhalte müssen auch auf Französisch gepflegt werden.
