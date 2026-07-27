// @ts-check
import { defineConfig } from 'astro/config';

// Despliegue temporal en GitHub Pages (repo ConstruDEPOT) mientras no hay dominio
// propio. Un repo de proyecto se sirve bajo una subruta (usuario.github.io/ConstruDEPOT/),
// así que base/site solo se activan cuando el workflow de despliegue pone
// GITHUB_PAGES=true. En local y al construir con el dominio final no se activa,
// y BASE_URL vuelve a '/' automáticamente sin tocar nada más.
const isGithubPages = process.env.GITHUB_PAGES === 'true';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',
  ...(isGithubPages
    ? { site: 'https://xsphere126.github.io', base: '/ConstruDEPOT' }
    : {}),
  // Cuando se elija el dominio definitivo, descomentar y ajustar:
  // site: 'https://www.construdepot-real-domain.es',
  // Esto activa automáticamente canonical/OG absolutos en BaseLayout.astro.
  // Añadir también la integración de sitemap: npx astro add sitemap
});
