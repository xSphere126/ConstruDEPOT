// Vacantes abiertas de Construdepot by Quiles. Fuente única para la sección
// "Vacantes abiertas" de /empleo/ — mismo patrón que grupos/marcas en
// marcas.ts para /proveedores/. Para publicar una vacante real, añadir un
// objeto al array de abajo; para retirarla, quitarlo. Cada cambio requiere
// redesplegar la web (no hay panel de administración).
//
// El array empieza vacío a propósito: no hay ninguna vacante real
// confirmada por el cliente todavía. La página de empleo está preparada
// para mostrarse bien tanto vacía (candidatura espontánea) como con
// vacantes reales.
export interface Vacante {
  id: string;
  titulo: string;
  ubicacion: string;
  jornada: string;
  descripcion: string;
  requisitos?: string[];
}

export const vacantes: Vacante[] = [];
