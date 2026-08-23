# Construdepot by Quiles

Web de Construdepot by Quiles, almacén de materiales de construcción, reforma
y decoración en Elche, Alicante. Construida con [Astro](https://astro.build).
Publicada en producción en [construdepot.es](https://construdepot.es) (IONOS,
subida manual por FTP) y con una copia de previsualización automática en
GitHub Pages en cada push a `main`.

## Desarrollo

```sh
npm install
npm run dev
```

El servidor de desarrollo corre en `http://localhost:4321`. También se puede
lanzar en segundo plano con `npx astro dev --background` (gestionar con
`astro dev stop` / `astro dev status` / `astro dev logs`).

## Estructura

```text
src/
├── components/    Header, Footer, Logo, CookieConsent, GatedEmbed (mapa/
│                   Instagram con aviso de cookies), IconInstagram, PerondaLogo
├── data/          marcas.ts, categorias.ts, vacantes.ts — fuentes únicas de
│                   verdad para Proveedores/Productos y las vacantes de Empleo
├── layouts/       BaseLayout.astro — <head>, Header y Footer comunes
├── lib/           url.ts (withBase, para que los enlaces funcionen igual en
│                   producción y en la subruta de GitHub Pages)
├── pages/         una ruta por archivo (inicio, sobre-nosotros, productos,
│                   proveedores, empleo, contacto, legales, 404)
└── styles/        global.css — tokens de marca, tipografía y todos los estilos

public/
├── lib/           graph-mail.php, turnstile.php — helpers PHP compartidos
├── brands/        logos reales de proveedores (ver src/data/marcas.ts)
├── images/        fotos reales de tienda/almacén/exposición
├── enviar-contacto.php, enviar-empleo.php — reciben los formularios y
│                   envían el correo vía Microsoft Graph
└── config-local.php   credenciales reales (Microsoft Graph, Turnstile) —
                    nunca en git, solo en local y en el servidor
```

Cada página usa `BaseLayout` pasando `headerVariant` (`transparent` en Inicio,
`solid` en el resto) y `active` para resaltar el ítem de navegación actual.

## Formularios (Contacto y Empleo)

Ambos formularios envían por correo a través de Microsoft 365 (API de
Microsoft Graph) usando el helper compartido `public/lib/graph-mail.php`, y
están protegidos por un honeypot más verificación anti-bot de Cloudflare
Turnstile (`public/lib/turnstile.php`). El de Empleo admite además adjuntar
un CV en PDF; el de Contacto, una foto (comprimida en el propio navegador
antes de enviarla).

Las credenciales reales viven en `public/config-local.php` (con guion, no
punto: IONOS renombra `config.local.php` a `config-local.php` al subirlo),
que **nunca se sube a git** — solo existe, ya configurado, en el servidor de
IONOS.

## Variables de entorno

Copiar `.env.example` a `.env` (si no existe, ver la plantilla documentada
más abajo) y rellenar cuando estén disponibles:

| Variable | Para qué | Cómo se obtiene |
|---|---|---|
| `PUBLIC_SNAPWIDGET_ID` | Feed de Instagram en Inicio | Crear widget gratuito en [snapwidget.com](https://snapwidget.com), conectar `@construdepot_by_quiles` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Verificación anti-bot en los formularios de Contacto y Empleo | Clave pública del sitio en el panel de [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) |

Sin `PUBLIC_SNAPWIDGET_ID`, el feed de Instagram no se muestra (queda tras el
aviso de cookies, sin cargar). Sin `PUBLIC_TURNSTILE_SITE_KEY`, el widget de
verificación simplemente no aparece y los formularios siguen funcionando
igual, sin esa capa de protección anti-bot.

## SEO técnico ya incluido

- Meta tags Open Graph y Twitter Card, canonical y sitemap (`sitemap-index.xml`,
  generado por `@astrojs/sitemap`) apuntando al dominio real.
- Datos estructurados JSON-LD (`schema.org/HardwareStore`) con nombre,
  teléfono, horario, redes sociales y valoración media — la de 4,5/5 con 247
  reseñas, verificada en vivo contra la ficha real de Google Maps antes de
  publicarla (no es una cifra de directorio de terceros sin confirmar).
- `robots.txt` con enlace al sitemap, favicon con el isotipo real de marca,
  página 404 personalizada (con `ErrorDocument 404` en `.htaccess` para que
  IONOS la sirva de verdad), enlace "saltar al contenido" para navegación
  por teclado.

## Comandos

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Previsualiza el build de producción |
| `npx astro check` | Comprueba tipos en los archivos `.astro` |

## Desplegar a IONOS

`npm run build` y subir por FTP el contenido de `dist/` — lo más seguro es
subirlo completo, **excepto `config-local.php`** (el del servidor tiene las
credenciales reales; el de `dist/` es una copia del `.php` local, que no las
tiene). Astro agrupa todo el CSS/JS en un único archivo con hash dentro de
`_astro/`, y ese hash cambia en casi cada cambio de estilos — subir solo el
HTML sin el `_astro/` correspondiente (o al revés) deja páginas rotas o sin
estilos.
