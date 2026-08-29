import type { Locale } from '../i18n/locales';

// Vacantes abiertas de Construdepot by Quiles. Fuente única para el listado
// de /empleo/ en los 4 idiomas — mismo patrón que grupos/marcas en
// marcas.ts para /proveedores/. Para publicar una vacante real, añadir un
// objeto al array de abajo con su texto en los 4 idiomas; para retirarla,
// quitarlo. Cada cambio requiere redesplegar la web (no hay panel de
// administración).
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
  ubicacion: Record<Locale, string>;
  titulo: Record<Locale, string>;
  descripcion: Record<Locale, string>;
  requisitos?: Record<Locale, string[]>;
  etiqueta?: Record<Locale, string>;
}

export const vacantes: Vacante[] = [
  {
    id: 'atencion-exposicion',
    ubicacion: { es: 'Elche', en: 'Elche', fr: 'Elche', ar: 'إلتشي' },
    titulo: {
      es: 'Atención al cliente',
      en: 'Customer service',
      fr: 'Service client',
      ar: 'خدمة العملاء',
    },
    descripcion: {
      es: 'Atiendes a quienes visitan la exposición: dudas de producto, presupuestos y seguimiento de pedidos.',
      en: 'You assist visitors to the showroom: product questions, quotes and order follow-up.',
      fr: "Vous accueillez les visiteurs de l'exposition : questions sur les produits, devis et suivi des commandes.",
      ar: 'تستقبل زوار صالة العرض: تجيب عن استفسارات المنتجات، وتعدّ عروض الأسعار، وتتابع الطلبات.',
    },
    requisitos: {
      es: [
        'Entusiasmo y ganas de trabajar',
        'Dotes comerciales',
        'Buen manejo del ordenador',
        'Capacidad para trabajar en equipo',
        'Disponibilidad horaria',
        'Dominio de español e inglés (valorable otros idiomas)',
      ],
      en: [
        'Enthusiasm and a strong work ethic',
        'Sales skills',
        'Good computer skills',
        'Ability to work in a team',
        'Schedule flexibility',
        'Fluent Spanish and English (other languages a plus)',
      ],
      fr: [
        'Enthousiasme et envie de travailler',
        'Sens commercial',
        "Bonne maîtrise de l'informatique",
        'Capacité à travailler en équipe',
        'Disponibilité horaire',
        "Maîtrise de l'espagnol et de l'anglais (autres langues appréciées)",
      ],
      ar: [
        'حماس ورغبة في العمل',
        'مهارات بيعية',
        'إجادة استخدام الحاسوب',
        'القدرة على العمل ضمن فريق',
        'مرونة في أوقات العمل',
        'إتقان الإسبانية والإنجليزية (معرفة لغات أخرى ميزة إضافية)',
      ],
    },
  },
  {
    id: 'mozo-almacen',
    ubicacion: { es: 'Elche', en: 'Elche', fr: 'Elche', ar: 'إلتشي' },
    titulo: {
      es: 'Mozo de almacén',
      en: 'Warehouse assistant',
      fr: "Employé d'entrepôt",
      ar: 'عامل مستودع',
    },
    descripcion: {
      es: 'Recepción y ubicación de mercancía, preparación de pedidos y apoyo en carga y descarga.',
      en: 'Receiving and stocking goods, preparing orders and helping with loading and unloading.',
      fr: 'Réception et rangement des marchandises, préparation des commandes et aide au chargement et déchargement.',
      ar: 'استلام البضائع وتخزينها، وتجهيز الطلبات، والمساعدة في التحميل والتفريغ.',
    },
    requisitos: {
      es: [
        'Entusiasmo y ganas de trabajar',
        'Buen manejo del ordenador',
        'Manejo de carretilla',
        'Capacidad para trabajar en equipo',
        'Disponibilidad horaria',
        'Carnet de conducir tipo B',
        'Valorable carnet C1/C para conducción de camiones',
      ],
      en: [
        'Enthusiasm and a strong work ethic',
        'Good computer skills',
        'Forklift operation',
        'Ability to work in a team',
        'Schedule flexibility',
        'Category B driving licence',
        'C1/C licence for driving trucks is a plus',
      ],
      fr: [
        'Enthousiasme et envie de travailler',
        "Bonne maîtrise de l'informatique",
        'Conduite de chariot élévateur',
        'Capacité à travailler en équipe',
        'Disponibilité horaire',
        'Permis de conduire catégorie B',
        'Permis C1/C pour la conduite de camions apprécié',
      ],
      ar: [
        'حماس ورغبة في العمل',
        'إجادة استخدام الحاسوب',
        'القدرة على تشغيل الرافعة الشوكية',
        'القدرة على العمل ضمن فريق',
        'مرونة في أوقات العمل',
        'رخصة قيادة من الفئة B',
        'يُفضَّل رخصة من الفئة C1/C لقيادة الشاحنات',
      ],
    },
  },
  {
    id: 'practicas',
    ubicacion: { es: 'Elche', en: 'Elche', fr: 'Elche', ar: 'إلتشي' },
    etiqueta: { es: 'Prácticas', en: 'Internship', fr: 'Stage', ar: 'تدريب' },
    titulo: {
      es: 'Prácticas de formación',
      en: 'Training internship',
      fr: 'Stage de formation',
      ar: 'تدريب تكويني',
    },
    descripcion: {
      es: 'Formamos a estudiantes en prácticas. El área no está cerrada: puede ser almacén, exposición o administración según tu perfil. Es una colaboración con tu centro educativo a través de su convenio y no un contrato laboral.',
      en: "We train students on work placements. The area isn't fixed — it could be the warehouse, the showroom or administration, depending on your profile. This is a collaboration with your school through its placement agreement, not an employment contract.",
      fr: "Nous formons des étudiants en stage. Le domaine n'est pas fixé à l'avance : cela peut être l'entrepôt, l'exposition ou l'administration, selon votre profil. Il s'agit d'une collaboration avec votre établissement via sa convention de stage, et non d'un contrat de travail.",
      ar: 'ندرّب طلابًا في فترة تدريب. المجال غير محدد مسبقًا: قد يكون المستودع أو صالة العرض أو الإدارة، حسب ملفك الشخصي. هذا تعاون مع مركزك التعليمي عبر اتفاقية التدريب الخاصة به، وليس عقد عمل.',
    },
    requisitos: {
      es: [
        'Estar cursando FP o un grado universitario relacionado con alguna de estas áreas',
        'Que tu centro educativo pueda formalizar el convenio de prácticas',
        'Ganas de aprender y actitud proactiva',
      ],
      en: [
        'Currently studying vocational training (FP) or a university degree related to one of these areas',
        'Your school must be able to formalise the placement agreement',
        'Eagerness to learn and a proactive attitude',
      ],
      fr: [
        'Être actuellement en formation professionnelle ou en cursus universitaire lié à l’un de ces domaines',
        'Votre établissement doit pouvoir formaliser la convention de stage',
        'Envie d’apprendre et attitude proactive',
      ],
      ar: [
        'أن تكون ملتحقًا بتعليم مهني (FP) أو تخصص جامعي متعلق بأحد هذه المجالات',
        'أن يتمكن مركزك التعليمي من إتمام اتفاقية التدريب رسميًا',
        'الرغبة في التعلم وروح المبادرة',
      ],
    },
  },
];
