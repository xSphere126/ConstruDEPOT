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
// (entusiasmo, manejo del ordenador, trabajo en equipo, disponibilidad
// horaria — el cliente confirmó que Almacén también necesita ordenador).
//
// La entrada "practicas" es distinta a una vacante remunerada normal: el
// cliente confirmó que se refiere a alumnado en prácticas a través del
// convenio de su propio centro educativo (FP/universidad), no a un
// contrato en prácticas remunerado — así que no lleva promesas de salario
// ni requisitos de titulación concretos que no se han confirmado, solo la
// condición real (que el centro pueda formalizar el convenio). El área no
// se fija de antemano, a propósito, ya que el cliente prefiere valorarla
// según el perfil que llegue. El campo `etiqueta` la distingue visualmente
// de las vacantes normales en el listado.
export interface Vacante {
  id: string;
  titulo: string;
  ubicacion: string;
  descripcion: string;
  requisitos?: string[];
  etiqueta?: string;
}

export const vacantes: Vacante[] = [
  {
    id: 'atencion-exposicion',
    titulo: 'Atención al cliente',
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
    titulo: 'Mozo de almacén',
    ubicacion: 'Elche',
    descripcion: 'Recepción y ubicación de mercancía, preparación de pedidos y apoyo en carga y descarga.',
    requisitos: [
      'Entusiasmo y ganas de trabajar',
      'Buen manejo del ordenador',
      'Manejo de carretilla',
      'Capacidad para trabajar en equipo',
      'Disponibilidad horaria',
      'Carnet de conducir tipo B',
      'Valorable carnet C1/C para conducción de camiones',
    ],
  },
  {
    id: 'practicas',
    titulo: 'Prácticas de formación',
    ubicacion: 'Elche',
    etiqueta: 'Prácticas',
    descripcion: 'Formamos a estudiantes en prácticas. El área no está cerrada: puede ser almacén, exposición o administración según tu perfil. Es una colaboración con tu centro educativo a través de su convenio y no un contrato laboral.',
    requisitos: [
      'Estar cursando FP o un grado universitario relacionado con alguna de estas áreas',
      'Que tu centro educativo pueda formalizar el convenio de prácticas',
      'Ganas de aprender y actitud proactiva',
    ],
  },
];
