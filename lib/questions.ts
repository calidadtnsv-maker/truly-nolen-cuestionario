export type MCQuestion = {
  id: string;
  type: "mc";
  text: string;
  options: string[];
  correctIndex: number;
};

export type OrderQuestion = {
  id: string;
  type: "order";
  text: string;
  steps: string[]; // steps[i] es el paso que va en la posición i
};

export type Question = MCQuestion | OrderQuestion;

export type Section = {
  id: string;
  title: string;
  colorLabel: string; // color departamental del manual
  tip: string; // consejo de reentrenamiento si esta sección sale débil
  questions: Question[];
};

export const DEPARTMENTS = [
  "Planificación",
  "Operaciones",
  "Coordinación",
  "Facturación / Admin",
  "Campo",
  "Ventas / Contratos",
];

export const SECTIONS: Section[] = [
  {
    id: "planificacion",
    title: "Planificación de Carga Diaria",
    colorLabel: "Azul · Planificación",
    tip: "Repasar el orden A → B → Consolidados → Programación Mensual → C, la regla de los 23 días, y los plazos de recuperación de clientes D e inactivos con casos reales.",
    questions: [
      {
        id: "1.1",
        type: "mc",
        text: "¿Cuál es el orden correcto para armar la cartera del día?",
        options: [
          "A → B → Consolidados → Programación Mensual → C",
          "C → B → A → Consolidados",
          "Programación Mensual → A → B → C",
          "Orden alfabético",
        ],
        correctIndex: 0,
      },
      {
        id: "1.2",
        type: "mc",
        text: "Los clientes A y B deben programarse obligatoriamente en:",
        options: ["Cualquier momento del mes", "Los primeros 23 días del mes", "Solo los lunes", "Después de los clientes C"],
        correctIndex: 1,
      },
      {
        id: "1.3",
        type: "mc",
        text: "Si una base diaria no lleva la categoría del cliente:",
        options: ["No se procesa", "Se asume categoría C", "Se envía a Ventas", "Se procesa igual"],
        correctIndex: 0,
      },
      {
        id: "1.order",
        type: "order",
        text: "Ordena los pasos para gestionar un cliente D que pide cancelar.",
        steps: [
          "Planificación envía la solicitud de cancelación a Contratos",
          "El asesor tiene 72 horas para recotizar con el cliente",
          "Si no gestiona en 24 horas, pasa a un gestor de cartera",
        ],
      },
    ],
  },
  {
    id: "asignacion",
    title: "Asignación de Servicios",
    colorLabel: "Verde · Operaciones",
    tip: "Reforzar la meta diaria de 240 servicios asignados, los tres criterios de asignación (cantidad, zona/horario, tiempo de servicio) y la regla de las 48 horas.",
    questions: [
      {
        id: "2.1",
        type: "mc",
        text: "¿Cuál es la meta diaria de servicios asignados?",
        options: ["100", "150", "240", "300"],
        correctIndex: 2,
      },
      {
        id: "2.2",
        type: "mc",
        text: "La 'Regla de las 48 horas' significa que al cierre del lunes:",
        options: [
          "Ya debe estar cobrado el mes",
          "Deben estar asignadas las rutas de martes y miércoles",
          "Debe cerrar la facturación",
          "Deben confirmarse todos los clientes C",
        ],
        correctIndex: 1,
      },
      {
        id: "2.3",
        type: "mc",
        text: "¿Mínimo de servicios por técnico al día?",
        options: ["2–3", "4–5, o su equivalente en 5 horas efectivas", "8–10", "No hay mínimo"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "confirmacion",
    title: "Confirmación de Servicios",
    colorLabel: "Naranja · Coordinación",
    tip: "Practicar la diferencia entre los 4 estados de contacto (confirmado, reprogramado, no aceptado, incontactable) y la regla de las 48 horas para reprogramaciones.",
    questions: [
      {
        id: "3.1",
        type: "mc",
        text: "Antes de contactar al cliente, el coordinador debe revisar:",
        options: ["Solo el número de teléfono", "El expediente completo (créditos, calidad, refuerzos)", "Nada, se contacta directo", "Solo si es cliente A"],
        correctIndex: 1,
      },
      {
        id: "3.2",
        type: "mc",
        text: "Si el cliente pide reprogramar con menos de 48 horas de anticipación:",
        options: ["Se coloca directo en TEC 0002", "Se pide el espacio a Operaciones", "Se rechaza la reprogramación", "Se espera a que pasen las 48 horas"],
        correctIndex: 1,
      },
      {
        id: "3.3",
        type: "mc",
        text: "'Incontactable' significa:",
        options: [
          "El cliente no contestó una sola vez",
          "Se agotaron todos los medios (llamadas y WhatsApp) sin respuesta",
          "El cliente rechazó el servicio",
          "El cliente canceló",
        ],
        correctIndex: 1,
      },
      {
        id: "3.order",
        type: "order",
        text: "Ordena los pasos del proceso de confirmación de un servicio.",
        steps: [
          "Revisar el expediente del cliente",
          "Contactar priorizando WhatsApp",
          "Registrar el resultado del contacto",
          "Si aplica, notificar el cambio a Operaciones",
        ],
      },
    ],
  },
  {
    id: "capacidad",
    title: "Ajuste de Capacidad Instalada",
    colorLabel: "Verde · Operaciones",
    tip: "Reforzar los horarios fijos (8:00 am novedades, 1:30 pm segundo cierre) y quién llena los espacios libres cuando hay depuración de ruta.",
    questions: [
      {
        id: "4.1",
        type: "mc",
        text: "¿A qué hora Operaciones informa incapacidades, permisos o emergencias?",
        options: ["7:00 am", "8:00 am", "10:30 am", "1:30 pm"],
        correctIndex: 1,
      },
      {
        id: "4.2",
        type: "mc",
        text: "Los espacios libres tras la depuración de Coordinación los llenan primero:",
        options: ["El cliente directamente", "Calidad (callbacks) y Coordinación (recuperados)", "Contabilidad", "Nadie, quedan vacíos"],
        correctIndex: 1,
      },
      {
        id: "4.3",
        type: "mc",
        text: "El segundo cierre de ruta (1:30 pm) es clave porque:",
        options: ["Ahí empieza el día", "Desbloquea la Facturación", "Se factura antes de este cierre", "No tiene relación con Facturación"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "tec",
    title: "Glosario TEC y Ciclo Semanal",
    colorLabel: "Multi-departamental",
    tip: "Practicar el glosario TEC completo (0001–0004) con ejemplos reales; es la parte donde más se confunden los equipos nuevos.",
    questions: [
      {
        id: "5.1",
        type: "mc",
        text: "TEC 0001 significa:",
        options: ["Base pendiente de asignar o confirmar", "Reprogramado por el cliente", "Venta nueva", "Alerta"],
        correctIndex: 0,
      },
      {
        id: "5.2",
        type: "mc",
        text: "TEC 0002 (la 'red line') es:",
        options: ["Venta nueva", "Un servicio reprogramado por el cliente que debe reasignarse", "Una alerta genérica", "La base semanal"],
        correctIndex: 1,
      },
      {
        id: "5.3",
        type: "mc",
        text: "TEC 0003 se usa para:",
        options: ["Alertas urgentes", "Clientes inactivos", "Ventas nuevas (clientes iniciales)", "Reprogramaciones"],
        correctIndex: 2,
      },
      {
        id: "5.4",
        type: "mc",
        text: "¿Por qué Operaciones deja un 'bolsón sin asignar'?",
        options: ["Por error", "Para que Coordinación pueda hacer ajustes de última hora", "Porque faltan técnicos", "Es obligatorio dejarlo vacío siempre"],
        correctIndex: 1,
      },
      {
        id: "5.order",
        type: "order",
        text: "Ordena los 4 pasos del ciclo semanal TEC.",
        steps: [
          "Planificador genera TEC 0001 + TEC BASE",
          "Operaciones asigna técnicos",
          "Coordinación confirma y clasifica cada servicio",
          "Planificador revisa y cierra el ciclo",
        ],
      },
    ],
  },
  {
    id: "facturacion",
    title: "Facturación de Servicios",
    colorLabel: "Rojo · Facturación / Admin",
    tip: "Insistir en el bloqueo estricto: nunca facturar antes de validar el segundo cierre de ruta (1:30 pm).",
    questions: [
      {
        id: "6.1",
        type: "mc",
        text: "¿Cuál es el bloqueo estricto para poder facturar?",
        options: ["Que el cliente pague antes", "Que el cierre de ruta de la 1:30 pm esté validado", "Que el técnico firme", "Que pase una semana"],
        correctIndex: 1,
      },
      {
        id: "6.2",
        type: "mc",
        text: "Facturación entrega los comprobantes físicos a:",
        options: ["El cliente", "El técnico, vía Coordinación", "Contratos", "Ventas"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "documentacion",
    title: "Documentación y Notas de Remisión",
    colorLabel: "Naranja · Coordinación",
    tip: "Reforzar la regla de las 7:00 am (nota en Bodega) y que en Oriente/Occidente la nota siempre va al técnico líder, nunca al de ruta regular.",
    questions: [
      {
        id: "7.1",
        type: "mc",
        text: "Si un servicio es a las 7:00 am o antes, la nota de remisión se deja en:",
        options: ["El kit de documentos", "Bodega", "Con el cliente", "En Coordinación"],
        correctIndex: 1,
      },
      {
        id: "7.2",
        type: "mc",
        text: "En Oriente y Occidente, la nota de remisión se entrega siempre a:",
        options: ["Cualquier técnico disponible", "El técnico líder", "El cliente", "Bodega directamente"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "campo",
    title: "Ejecución de Servicios en Campo",
    colorLabel: "Gris · Campo",
    tip: "Recordar el protocolo de escalamiento del Sistema SOS (coordinador → Jefatura de Coordinación) y no salir sin papelería completa.",
    questions: [
      {
        id: "8.1",
        type: "mc",
        text: "Un técnico nunca debe salir a ruta sin:",
        options: ["Su almuerzo", "La papelería completa verificada", "Su teléfono personal", "Un compañero"],
        correctIndex: 1,
      },
      {
        id: "8.2",
        type: "mc",
        text: "Sistema SOS: si el coordinador no responde, el técnico escala a:",
        options: ["El cliente", "La Jefatura de Coordinación", "Facturación", "Ventas"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "callbacks",
    title: "Callbacks, Seguimientos y Refuerzos",
    colorLabel: "Naranja · Coordinación",
    tip: "Reforzar el SLA de 4 horas para callbacks urgentes y que la gestión nunca empieza antes de las 10:00 am.",
    questions: [
      {
        id: "9.1",
        type: "mc",
        text: "¿Cuál es el SLA para gestionar un callback urgente?",
        options: ["24 horas", "Menos de 4 horas", "48 horas", "1 semana"],
        correctIndex: 1,
      },
      {
        id: "9.2",
        type: "mc",
        text: "La gestión de callbacks y garantías se abre:",
        options: ["A primera hora", "Siempre después de las 10:00 am", "Solo los viernes", "Al cierre del día"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "reprogramaciones",
    title: "Reprogramaciones de Servicio",
    colorLabel: "Rojo / Magenta · Admin y Ventas",
    tip: "Distinguir claramente la vía de servicio regular (cuadro de reprogramación) de la vía de venta nueva (asesor → Contratos).",
    questions: [
      {
        id: "10.1",
        type: "mc",
        text: "En venta nueva, si el asesor no gestiona la nueva fecha en 24 horas:",
        options: ["Se cancela la venta", "La gestión se reasigna a otro asesor", "Pasa a Contabilidad", "El cliente pierde la garantía"],
        correctIndex: 1,
      },
      {
        id: "10.2",
        type: "mc",
        text: "¿Cuál es la meta del proceso de reprogramaciones?",
        options: ["80% de casos resueltos", "100%, sin pendientes diarios", "50% semanal", "No hay meta"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "incumplimientos",
    title: "Régimen de Incumplimientos",
    colorLabel: "Compromiso con la excelencia",
    tip: "Repasar con ejemplos reales la diferencia entre leve, grave y muy grave, y la cláusula de reincidencia.",
    questions: [
      {
        id: "11.1",
        type: "mc",
        text: "¿Qué determina la gravedad de un incumplimiento?",
        options: ["La antigüedad del empleado", "Su cercanía al riesgo o daño al cliente", "El departamento", "El monto económico"],
        correctIndex: 1,
      },
      {
        id: "11.2",
        type: "mc",
        text: "Una falla de registro interno, sin riesgo al cliente, corregida el mismo día, es:",
        options: ["Grave", "Muy grave", "Leve", "No se clasifica"],
        correctIndex: 2,
      },
      {
        id: "11.3",
        type: "mc",
        text: "La repetición de una falta Grave se convierte automáticamente en:",
        options: ["Leve", "Sigue siendo Grave", "Muy grave", "Se ignora"],
        correctIndex: 2,
      },
    ],
  },
];

export const ALL_QUESTIONS: ((MCQuestion & { sectionId: string; sectionTitle: string }) | (OrderQuestion & { sectionId: string; sectionTitle: string }))[] =
  SECTIONS.flatMap((s) =>
    s.questions.map((q) => {
      if (q.type === "mc") {
        return { ...q, sectionId: s.id, sectionTitle: s.title };
      }
      return { ...q, sectionId: s.id, sectionTitle: s.title };
    })
  );
