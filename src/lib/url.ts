// Antepone el base path del sitio (import.meta.env.BASE_URL) a una ruta interna
// absoluta. BASE_URL es '/' en local y con el dominio final, y '/ConstruDEPOT/'
// solo en el despliegue temporal de GitHub Pages (ver astro.config.mjs).
export function withBase(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}
