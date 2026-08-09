// Vacantes abiertas de Construdepot by Quiles. Fuente única para el listado
// de /empleo/ — mismo patrón que grupos/marcas en marcas.ts para
// /proveedores/. Para publicar una vacante real, añadir un objeto al array
// de abajo; para retirarla, quitarlo. Cada cambio requiere redesplegar la
// web (no hay panel de administración).
export interface Vacante {
  id: string;
  titulo: string;
  ubicacion: string;
  jornada: string;
  descripcion: string;
  requisitos?: string[];
  // Vacante de ejemplo para maquetar el diseño de /empleo/, todavía no
  // confirmada por el cliente como oferta real — se marca con la nota
  // "Ejemplo" en la propia tarjeta (mismo patrón que placeholder-note en
  // sobre-nosotros.astro/contacto.astro) para no publicarla como si fuera
  // una vacante real sin querer. Al confirmar una vacante de verdad, quitar
  // este campo (o ponerlo a false) y ajustar el contenido con los datos
  // reales del puesto.
  placeholder?: boolean;
}

export const vacantes: Vacante[] = [
  {
    id: 'atencion-exposicion',
    titulo: 'Atención al cliente — Exposición',
    ubicacion: 'Elche',
    jornada: 'Jornada completa',
    descripcion: 'Atiendes a quienes visitan la exposición: dudas de producto, presupuestos y seguimiento de pedidos.',
    requisitos: ['Atención al cliente cara a cara', 'Manejo de ofimática básica', 'Valorable experiencia en construcción, reforma o decoración'],
    placeholder: true,
  },
  {
    id: 'conductor-torito',
    titulo: 'Conductor/a de carretilla elevadora (torito)',
    ubicacion: 'Elche',
    jornada: 'Jornada completa',
    descripcion: 'Carga y descarga de palets, organización del patio y apoyo en la preparación de pedidos.',
    requisitos: ['Carnet de carretillero en vigor', 'Experiencia previa manejando carretilla elevadora', 'Carnet de conducir B valorable'],
    placeholder: true,
  },
  {
    id: 'mozo-almacen',
    titulo: 'Mozo/a de almacén',
    ubicacion: 'Elche',
    jornada: 'Jornada completa',
    descripcion: 'Recepción y ubicación de mercancía, preparación de pedidos y apoyo en carga y descarga.',
    requisitos: ['Buena condición física', 'Ganas de aprender el oficio', 'Valorable experiencia en almacén o construcción'],
    placeholder: true,
  },
];
