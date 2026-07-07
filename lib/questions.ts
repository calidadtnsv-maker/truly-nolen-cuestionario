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
  steps: string[]; // steps[i] is the step that belongs at position i
};

export type Question = MCQuestion | OrderQuestion;

export type Section = {
  id: string;
  title: string;
  tip: string; // consejo de reentrenamiento si esta sección sale débil
  questions: Question[];
};

export const DEPARTMENTS = [
  "Planificación de cartera",
  "Operaciones",
  "Coordinación",
  "Contabilidad",
  "Administración",
  "Ventas",
  "Técnico",
];

export const SECTIONS: Section[] = [
  {
    id: "planificacion",
    title: "Planificación de cartera",
    tip: "Repasar con el equipo el orden de prioridad de carga (A → B → Consolidados → Programación mensual → C) y los tiempos de 24/72 horas en clientes D e inactivos, usando casos reales de la semana.",
    questions: [
      {
        id: "1.1",
        type: "mc",
        text: "¿Cuál es el orden correcto para cargar clientes del día?",
        options: [
          "C → B → A → Consolidados",
          "A → B → Consolidados → Programación mensual → C",
          "Programación mensual → A → B → C",
          "Orden alfabético",
        ],
        correctIndex: 1,
      },
      {
        id: "1.2",
        type: "mc",
        text: "Un cliente D pide cancelar. ¿Qué plazo tiene el asesor antes de que pase a gestor de cartera?",
        options: [
          "72 h para recotizar; si no gestiona en 24 h, pasa a gestor de cartera",
          "24 h en total",
          "48 h en total",
          "No hay plazo",
        ],
        correctIndex: 0,
      },
      {
        id: "1.order",
        type: "order",
        text: "Ordena los pasos del proceso de recuperación de un cliente D.",
        steps: [
          "Planificación envía la solicitud de cancelación a Contratos y avisa al asesor",
          "El asesor tiene 72 horas para recotizar con el cliente",
          "Si no gestiona en 24 horas, el caso pasa a un gestor de cartera",
          "El seguimiento queda como ticket en Odoo",
        ],
      },
    ],
  },
  {
    id: "operaciones-rutas",
    title: "Operaciones — Asignación de rutas",
    tip: "Reforzar los mínimos de servicios por técnico (4–5 o 5 horas efectivas) y la regla de que TEC 0002 nunca debe quedar con servicios sin técnico asignado.",
    questions: [
      {
        id: "2.1",
        type: "mc",
        text: "¿Cuántos servicios mínimo lleva un técnico en su ruta diaria?",
        options: ["2–3", "4–5, o su equivalente en 5 horas efectivas", "8–10", "No hay mínimo"],
        correctIndex: 1,
      },
      {
        id: "2.2",
        type: "mc",
        text: "Regla crítica de Operaciones sobre TEC 0002:",
        options: [
          "Debe estar vacío al cierre",
          "No debe haber servicios sin técnico asignado",
          "Solo lleva venta nueva",
          "Se revisa semanal",
        ],
        correctIndex: 1,
      },
      {
        id: "2.order",
        type: "order",
        text: "Ordena los pasos de Operaciones al armar la ruta diaria.",
        steps: [
          "Recibe de Planificación la cartera priorizada y los TEC 0002",
          "Asigna servicios por cantidad (4–5 por técnico) y por zona/horario",
          "Considera el tiempo de servicio y técnicos requeridos",
          "Entrega a Coordinación la ruta lista para confirmar",
        ],
      },
    ],
  },
  {
    id: "coordinacion",
    title: "Coordinación — Confirmación",
    tip: "Practicar con Coordinación la diferencia entre NO ATENDIDO e INCONTACTABLE, y recordar que ninguna orden con fecha presente/pasada se mueve sin el visto bueno de Muriel e Iris.",
    questions: [
      {
        id: "3.1",
        type: "mc",
        text: "Antes de contactar a un cliente, ¿qué debe revisar el coordinador?",
        options: [
          "Solo el historial de pagos",
          "El contrato y el expediente completo (cobros, calidad, seguimientos)",
          "Nada, se contacta directo",
          "Solo si es categoría A",
        ],
        correctIndex: 1,
      },
      {
        id: "3.2",
        type: "mc",
        text: "¿Diferencia entre NO ATENDIDO e INCONTACTABLE?",
        options: [
          "Son lo mismo",
          "NO ATENDIDO = se intentó y no contestó · INCONTACTABLE = se agotaron todos los medios",
          "INCONTACTABLE solo aplica a categoría D",
          "NO ATENDIDO solo a clientes nuevos",
        ],
        correctIndex: 1,
      },
      {
        id: "3.order",
        type: "order",
        text: "Ordena los pasos de confirmación de un servicio.",
        steps: [
          "Revisar contrato y expediente del cliente",
          "Contactar priorizando WhatsApp",
          "Registrar el resultado (confirmado, reprogramado, no aceptado o incontactable)",
          "Dejar todo plasmado en el sistema e informar a Operaciones si hay cambios",
        ],
      },
    ],
  },
  {
    id: "operaciones-aprovechamiento",
    title: "Operaciones — Cuadro de aprovechamiento",
    tip: "Reforzar los horarios fijos del ciclo diario (8:00 am capacidad, 1:30 pm segundo cierre) y quién llena los espacios libres cuando Calidad y Coordinación no lo hacen.",
    questions: [
      {
        id: "4.1",
        type: "mc",
        text: "Si Calidad y Coordinación no llenan los espacios libres, ¿quién los alimenta?",
        options: ["Se dejan vacíos", "Operaciones, con la base de Planificación", "Contabilidad", "El cliente"],
        correctIndex: 1,
      },
      {
        id: "4.2",
        type: "mc",
        text: "¿A qué hora se informa cualquier desviación de capacidad instalada?",
        options: ["7:00 am", "8:00 am", "10:30 am", "Al cierre del día"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "tecnicos",
    title: "Técnicos y cierre de ruta",
    tip: "Recordar a los técnicos el protocolo de escalamiento (coordinador → Jefatura de Coordinación) y la regla de no salir con kit incompleto.",
    questions: [
      {
        id: "5.1",
        type: "mc",
        text: "¿Qué NO puede hacer un técnico antes de salir a ruta?",
        options: ["Revisar el clima", "Salir con el kit incompleto", "Confirmar con su coordinador", "Revisar su zona"],
        correctIndex: 1,
      },
      {
        id: "5.2",
        type: "mc",
        text: "Si el coordinador no responde durante un servicio, ¿a quién escala el técnico?",
        options: ["Al cliente", "A la Jefatura de Coordinación", "A Contabilidad", "A RRHH"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "documentacion-contabilidad",
    title: "Documentación y Contabilidad",
    tip: "Reforzar el 'candado de entrada' para facturar: nunca antes de validar el cierre del Proceso 4.3.",
    questions: [
      {
        id: "6.1",
        type: "mc",
        text: "¿Cuál es el candado de entrada para poder facturar?",
        options: [
          "Que el cliente haya pagado",
          "Que el cierre del Proceso 4.3 esté validado",
          "Que Contratos autorice",
          "Que llegue el técnico",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "administracion",
    title: "Administración — Reprogramación y trazabilidad",
    tip: "Insistir en que el cuadro de reprogramación no se deja con pendientes: se trabaja todos los días, sin excepción.",
    questions: [
      {
        id: "7.1",
        type: "mc",
        text: "¿Quién no puede mover programación en fecha presente/pasada sin verificación?",
        options: ["Solo Coordinación", "Ningún gestor, sin Muriel e Iris", "Solo Operaciones", "Cualquiera si es urgente"],
        correctIndex: 1,
      },
      {
        id: "7.2",
        type: "mc",
        text: "El cuadro de reprogramación:",
        options: ["Se revisa semanal", "No se deja con pendientes, se trabaja a diario", "Solo aplica a nuevos", "Lo gestiona el cliente"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "ventas",
    title: "Ventas — Recuperación y venta nueva",
    tip: "Reforzar con Ventas los plazos de 24 horas: tanto en recuperación de clientes D como en reprogramación de venta nueva, la gestión se reasigna si el asesor no actúa a tiempo.",
    questions: [
      {
        id: "8.1",
        type: "mc",
        text: "Cliente D: si el asesor no gestiona en 24 h, ¿qué pasa?",
        options: ["Se cancela solo", "Pasa al gestor de cartera y queda ticket en Odoo", "Se reasigna de inmediato", "Va a Contabilidad"],
        correctIndex: 1,
      },
      {
        id: "8.2",
        type: "mc",
        text: "Si un TEC 0003 no tiene técnico o fecha al cierre, ¿quién avisa a Ventas?",
        options: ["Coordinación", "Operaciones", "Contratos", "Administración"],
        correctIndex: 1,
      },
      {
        id: "8.order",
        type: "order",
        text: "Ordena el proceso de reprogramación de venta nueva.",
        steps: [
          "Se devuelve la ficha de ingreso al asesor que hizo la venta",
          "El asesor gestiona con el cliente la nueva fecha (24 horas)",
          "El asesor pasa la ficha al jefe de Contratos",
          "Contratos reagenda en sistema y marca 'realizado'",
        ],
      },
    ],
  },
  {
    id: "ciclo-tec",
    title: "Ciclo semanal TEC",
    tip: "Practicar el glosario TEC completo (0001–0004) con ejemplos reales; es la parte donde más se confunden los equipos nuevos.",
    questions: [
      {
        id: "9.1",
        type: "mc",
        text: "¿Qué genera el Planificador para abrir el ciclo semanal?",
        options: ["Solo TEC 0001", "TEC 0001 + TEC BASE", "TEC 0002 + TEC 0003", "El reporte de facturación"],
        correctIndex: 1,
      },
      {
        id: "9.2",
        type: "mc",
        text: "¿Qué es TEC 0002?",
        options: [
          "Base semanal pendiente de confirmar",
          "Servicio reprogramado por el cliente",
          "Servicios de venta nueva",
          "Una alerta",
        ],
        correctIndex: 1,
      },
      {
        id: "9.order",
        type: "order",
        text: "Ordena los 4 pasos del ciclo semanal TEC.",
        steps: [
          "Planificador genera TEC 0001 + TEC BASE y los envía a Operaciones",
          "Operaciones asigna técnicos por zona y capacidad",
          "Coordinación confirma cada servicio y lo clasifica (0001/0002/0004)",
          "Planificador revisa los 4 formularios y cierra el ciclo",
        ],
      },
    ],
  },
  {
    id: "incumplimientos",
    title: "Régimen de incumplimientos",
    tip: "Reforzar el criterio central con ejemplos concretos: la gravedad se mide por la cercanía del riesgo o daño al cliente, no por el departamento ni el monto involucrado.",
    questions: [
      {
        id: "10.1",
        type: "mc",
        text: "¿Qué determina la severidad de un incumplimiento?",
        options: [
          "La antigüedad del empleado",
          "Su cercanía al cliente: a mayor riesgo o daño, más grave",
          "El departamento",
          "El monto económico",
        ],
        correctIndex: 1,
      },
      {
        id: "10.2",
        type: "mc",
        text: "Falla interna sin riesgo para el cliente, corregida el mismo día:",
        options: ["Grave", "Muy grave", "Leve", "No se clasifica"],
        correctIndex: 2,
      },
      {
        id: "10.3",
        type: "mc",
        text: "Afectación directa al cliente, negligencia comprobada o reincidencia:",
        options: ["Leve", "Grave", "Muy grave", "Depende del departamento"],
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
