// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// Despliegue temporal en GitHub Pages (repo ConstruDEPOT) mientras no hay dominio
// propio. Un repo de proyecto se sirve bajo una subruta (usuario.github.io/ConstruDEPOT/),
// así que base/site solo se activan cuando el workflow de despliegue pone
// GITHUB_PAGES=true. En local y al construir con el dominio final no se activa,
// y BASE_URL vuelve a '/' automáticamente sin tocar nada más.
const isGithubPages = process.env.GITHUB_PAGES === 'true';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',

  // Esto activa canonical/OG absolutos en BaseLayout.astro apuntando al
  // dominio real. Si más adelante se sirve también bajo www.construdepot.es,
  // configurar la redirección 301 en IONOS hacia el dominio sin "www" (el
  // que está aquí), para que no haya dos versiones indexables por Google.
  ...(isGithubPages
    ? { site: 'https://xsphere126.github.io', base: '/ConstruDEPOT' }
    : { site: 'https://construdepot.es' }),

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr', 'ar'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es', en: 'en', fr: 'fr', ar: 'ar' },
      },
    }),
  ],
});