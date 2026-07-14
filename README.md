# Construdepot by Quiles

Web de Construdepot by Quiles, almacén de materiales de construcción, reforma
y decoración en Elche, Alicante. Construida con [Astro](https://astro.build).

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
├── components/    Header, Footer, Logo, SignatureMark (isotipo de marca)
├── layouts/       BaseLayout.astro — <head>, Header y Footer comunes
├── pages/         una ruta por archivo (inicio, sobre-nosotros, productos, contacto, profesionales)
└── styles/        global.css — tokens de marca, tipografía y todos los estilos
```

Cada página usa `BaseLayout` pasando `headerVariant` (`transparent` en Inicio,
`solid` en el resto) y `active` para resaltar el ítem de navegación actual.

`profesionales.astro` es una redirección estática a `/contacto/#profesionales`
— ese contenido se fusionó dentro de la página de Contacto.

## Variables de entorno

Copiar `.env.example` a `.env` y rellenar cuando estén disponibles:

| Variable | Para qué | Cómo se obtiene |
|---|---|---|
| `PUBLIC_FORMSPREE_ID` | Envío real del formulario de Contacto | Crear formulario gratuito en [formspree.io](https://formspree.io) |
| `PUBLIC_SNAPWIDGET_ID` | Feed de Instagram en Inicio | Crear widget gratuito en [snapwidget.com](https://snapwidget.com), conectar `@construdepot_by_quiles` |

Sin estas variables, el sitio sigue funcionando: el formulario muestra un
aviso en vez de enviar, y el feed de Instagram muestra un mosaico de
marcador de posición.

## Contenido pendiente

Los bloques marcados con la clase `.pending` (⚑ en pantalla) necesitan un
dato real del cliente antes de publicar — historia de la empresa, equipo,
dirección exacta, condiciones de suministro a profesionales, etc. No rellenar
con datos inventados: son placeholders intencionados.

## Antes de publicar: dominio, canonical y sitemap

`BaseLayout.astro` solo emite `<link rel="canonical">` y las URLs absolutas de
Open Graph cuando `site` está configurado en `astro.config.mjs` — así se evita
publicar una URL inventada mientras no haya dominio elegido. Cuando lo haya:

1. Descomentar y rellenar `site: 'https://tu-dominio.es'` en `astro.config.mjs`.
2. `npx astro add sitemap` para generar `sitemap-index.xml` automáticamente.
3. Descomentar la línea `Sitemap:` en `public/robots.txt`.

## SEO técnico ya incluido

- Meta tags Open Graph y Twitter Card (título/descripción se completan solos
  por página; la imagen y la URL canónica se activan al fijar `site`, ver
  arriba).
- Datos estructurados JSON-LD (`schema.org/HardwareStore`) con nombre,
  teléfono, horario y redes sociales. **No incluye valoración/reseñas**: la
  valoración de 4,8/5 que se ve en Inicio está marcada en el propio texto
  como dato de directorio externo sin confirmar, y publicarla en datos
  estructurados no verificados incumple las políticas de rich results de
  Google — añadirla en cuanto se confirme la ficha real de Google Business.
- `robots.txt`, favicon con el isotipo real de marca (antes era el de Astro
  por defecto), página 404 personalizada, enlace "saltar al contenido" para
  navegación por teclado.

## Comandos

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Previsualiza el build de producción |
| `npx astro check` | Comprueba tipos en los archivos `.astro` |
