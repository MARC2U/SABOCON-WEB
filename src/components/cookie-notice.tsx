"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/content/site";

const storageKey = "sabocon-cookie-notice-dismissed";

const copy = {
  en: {
    title: "Cookies & external content",
    body: "The optional Facebook feed may use cookies. It loads only if you choose to enable it in the Social section.",
    privacy: "Privacy information",
    dismiss: "Got it",
  },
  de: {
    title: "Cookies und externe Inhalte",
    body: "Der optionale Facebook-Feed kann Cookies verwenden. Er wird erst geladen, wenn du ihn im Social-Bereich aktivierst.",
    privacy: "Datenschutzhinweise",
    dismiss: "Verstanden",
  },
  fr: {
    title: "Cookies et contenus externes",
    body: "Le fil Facebook facultatif peut utiliser des cookies. Il se charge uniquement si vous l’activez dans la rubrique Réseaux sociaux.",
    privacy: "Informations sur la confidentialité",
    dismiss: "Compris",
  },
};

export function CookieNotice({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const text = copy[locale];

  useEffect(() => {
    try {
      setVisible(sessionStorage.getItem(storageKey) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // Dismiss this instance even when the browser blocks storage.
    }
    setVisible(false);
    document.getElementById("main")?.focus();
  }

  if (!visible) return null;

  return (
    <aside className="cookie-notice" aria-labelledby="cookie-notice-title">
      <div>
        <strong id="cookie-notice-title">{text.title}</strong>
        <p>{text.body} <a href={`/${locale}/privacy#cookies`}>{text.privacy}</a></p>
      </div>
      <button type="button" onClick={dismiss}>{text.dismiss}</button>
    </aside>
  );
}
