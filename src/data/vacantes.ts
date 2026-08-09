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
//
// Los requisitos vienen del cartel real "SE BUSCA PERSONAL" que el cliente
// ya reparte (WhatsApp/email de contacto: 607 224 454 e info@construdepot.es,
// coherentes con el resto del sitio). El cartel no distingue por puesto — es
// una lista única de requisitos para la contratación en general — así que se
// ha repartido entre las dos vacantes según a cuál encaja cada uno (p. ej.
// "dotes comerciales" e idiomas a Exposición, "manejo de carretilla" y
// carnet de conducir a Almacén), conservando los que aplican a ambas
// (entusiasmo, trabajo en equipo, disponibilidad horaria).
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
    requisitos: [
      'Entusiasmo y ganas de trabajar',
      'Dotes comerciales',
      'Buen manejo del ordenador',
      'Capacidad para trabajar en equipo',
      'Disponibilidad horaria',
      'Dominio de español e inglés (valorable otros idiomas)',
    ],
  },
  {
    id: 'mozo-almacen',
    titulo: 'Mozo/a de almacén',
    ubicacion: 'Elche',
    descripcion: 'Recepción y ubicación de mercancía, preparación de pedidos y apoyo en carga y descarga.',
    requisitos: [
      'Entusiasmo y ganas de trabajar',
      'Manejo de carretilla',
      'Capacidad para trabajar en equipo',
      'Disponibilidad horaria',
      'Carnet de conducir tipo B',
      'Valorable carnet C1/C para conducción de camiones',
    ],
  },
];
