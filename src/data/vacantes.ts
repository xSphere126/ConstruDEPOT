// Vacantes abiertas de Construdepot by Quiles. Fuente única para el listado
// de /empleo/ — mismo patrón que grupos/marcas en marcas.ts para
// /proveedores/. Para publicar una vacante real, añadir un objeto al array
// de abajo; para retirarla, quitarlo. Cada cambio requiere redesplegar la
// web (no hay panel de administración).
//
// Sin campo de jornada a propósito: el cliente confirmó que casi cualquier
// disponibilidad encaja ("nos sirve prácticamente cualquier perfil que
// tenga ganas de trabajar"), así que no aporta información real filtrar por
// jornada puesto a puesto.
export interface Vacante {
  id: string;
  titulo: string;
  ubicacion: string;
  descripcion: string;
  requisitos?: string[];
}

export const vacantes: Vacante[] = [
  {
    id: 'atencion-exposicion',
    titulo: 'Atención al cliente — Exposición',
    ubicacion: 'Elche',
    descripcion: 'Atiendes a quienes visitan la exposición: dudas de producto, presupuestos y seguimiento de pedidos.',
    requisitos: ['Atención al cliente cara a cara', 'Manejo de ofimática básica', 'Valorable experiencia en construcción, reforma o decoración'],
  },
  {
    id: 'mozo-almacen',
    titulo: 'Mozo/a de almacén',
    ubicacion: 'Elche',
    descripcion: 'Recepción y ubicación de mercancía, preparación de pedidos y apoyo en carga y descarga.',
    requisitos: ['Buena condición física', 'Ganas de aprender el oficio', 'Valorable experiencia en almacén o construcción'],
  },
];
