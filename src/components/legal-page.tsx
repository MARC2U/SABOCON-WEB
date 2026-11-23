import { Header } from "./header";
import { Footer } from "./sections";
import { translate as t, type Locale } from "@/content/site";
export function LegalPage({locale,title,children,availableLocales}:{locale:Locale;title:string;children:React.ReactNode;availableLocales?:Locale[]}) {return <><a href="#main" className="skip-link">{t(locale,"Skip to content","Zum Inhalt springen")}</a><Header locale={locale} availableLocales={availableLocales}/><main id="main" tabIndex={-1} className="legal-page"><a className="plain-link" href={`/${locale}`}>← {t(locale,"Back to home","Zur Startseite")}</a><h1>{title}</h1>{children}</main><Footer locale={locale}/></>;}
