// Los 5 ids/nombres de categoría de /productos/, extraídos aquí para que
// tanto productos.astro como proveedores.astro (y marcas.ts) puedan
// referenciarlos sin duplicar los nombres a mano en cada sitio.
export interface CategoriaId {
  id: string;
  nombre: string;
}

export const categoriasProductos: CategoriaId[] = [
  { id: 'estructura-y-obra', nombre: 'Estructura y Obra' },
  { id: 'acabados-y-revestimientos', nombre: 'Acabados y Revestimientos' },
  { id: 'decoracion-y-pintura', nombre: 'Decoración y Pintura' },
  { id: 'fontaneria-y-climatizacion', nombre: 'Fontanería y Climatización' },
  { id: 'jardin-y-exterior', nombre: 'Jardín y Exterior' },
];
