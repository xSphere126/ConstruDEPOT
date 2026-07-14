// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',
  // Cuando se elija el dominio definitivo, descomentar y ajustar:
  // site: 'https://www.construdepot-real-domain.es',
  // Esto activa automáticamente canonical/OG absolutos en BaseLayout.astro.
  // Añadir también la integración de sitemap: npx astro add sitemap
});
