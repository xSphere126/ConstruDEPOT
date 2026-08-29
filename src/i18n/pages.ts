import type { Locale } from './locales';

export type PageKey =
  | 'home'
  | 'productos'
  | 'contacto'
  | 'sobre-nosotros'
  | 'empleo'
  | 'aviso-legal'
  | 'politica-privacidad'
  | 'politica-cookies';

export const PAGE_PATHS: Record<PageKey, string> = {
  home: '',
  productos: 'productos/',
  contacto: 'contacto/',
  'sobre-nosotros': 'sobre-nosotros/',
  empleo: 'empleo/',
  'aviso-legal': 'aviso-legal/',
  'politica-privacidad': 'politica-privacidad/',
  'politica-cookies': 'politica-cookies/',
};

// Única fuente de verdad de qué páginas existen en qué idiomas — de aquí
// salen los hreflang, los enlaces del selector de idioma y el fallback
// silencioso a español de nav/footer cuando una página no está traducida.
export const TRANSLATED_LOCALES: Record<PageKey, Locale[]> = {
  home: ['es', 'en', 'fr', 'ar'],
  productos: ['es', 'en', 'fr', 'ar'],
  contacto: ['es', 'en', 'fr', 'ar'],
  'sobre-nosotros': ['es'],
  empleo: ['es'],
  'aviso-legal': ['es'],
  'politica-privacidad': ['es'],
  'politica-cookies': ['es'],
};
