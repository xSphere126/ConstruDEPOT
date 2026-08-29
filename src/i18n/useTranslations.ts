import { getRelativeLocaleUrl } from 'astro:i18n';
import { DEFAULT_LOCALE, type Locale } from './locales';
import { PAGE_PATHS, TRANSLATED_LOCALES, type PageKey } from './pages';
import { es } from './dictionaries/es';
import { en } from './dictionaries/en';
import { fr } from './dictionaries/fr';
import { ar } from './dictionaries/ar';

export type Dictionary = typeof es;

const DICTIONARIES: Record<Locale, Partial<Dictionary>> = { es, en, fr, ar };

// Diccionario del idioma activo, con fallback a español clave a clave para
// que una traducción puntual que falte no rompa la página ni deje un hueco
// en blanco.
export function t(locale: Locale): Dictionary {
  const dict = DICTIONARIES[locale] ?? {};
  return { ...es, ...dict } as Dictionary;
}

// URL a `pageKey` en `locale`. Si esa página no existe todavía en ese
// idioma, cae en silencio a la versión española en vez de enlazar a una
// ruta inexistente.
export function localizedHref(pageKey: PageKey, locale: Locale): string {
  const resolvedLocale = TRANSLATED_LOCALES[pageKey].includes(locale) ? locale : DEFAULT_LOCALE;
  return getRelativeLocaleUrl(resolvedLocale, PAGE_PATHS[pageKey]);
}
