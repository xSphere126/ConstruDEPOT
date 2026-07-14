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

## Comandos

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Previsualiza el build de producción |
| `npx astro check` | Comprueba tipos en los archivos `.astro` |
