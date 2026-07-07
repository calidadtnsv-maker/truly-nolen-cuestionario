export type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
};

export type Section = {
  id: string;
  title: string;
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
    questions: [
      {
        id: "1.1",
        text: "Al cargar los clientes del día, ¿cuál es el orden de prioridad correcto?",
        options: [
          "C → B → A → Consolidados",
          "A → B → Consolidados → Programación mensual → C",
          "Programación mensual → A → B → C",
          "Por orden alfabético del cliente",
        ],
        correctIndex: 1,
      },
      {
        id: "1.2",
        text: "Un cliente D solicita cancelación. ¿Cuánto tiempo tiene el asesor para recotizar antes de que el caso pase a un gestor de cartera?",
        options: [
          "24 horas",
          "48 horas",
          "72 horas para recotizar; si no gestiona en 24 horas, pasa a gestor de cartera",
          "No tiene límite de tiempo",
        ],
        correctIndex: 2,
      },
      {
        id: "1.3",
        text: "¿Qué pasa si una base diaria no lleva la categoría de cada cliente?",
        options: [
          "Se trabaja igual y se corrige después",
          "No se trabaja esa base",
          "Se asigna automáticamente categoría C",
          "Se envía a Contabilidad para revisión",
        ],
        correctIndex: 1,
      },
      {
        id: "1.4",
        text: "Un servicio confirmado con anticipación debe marcarse en:",
        options: ["TEC 0001", "TEC 0002, como alta prioridad", "TEC 0003", "TEC 0004"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "operaciones-rutas",
    title: "Operaciones — Asignación de rutas",
    questions: [
      {
        id: "2.1",
        text: "Según el criterio 'por cantidad', ¿cuántos servicios mínimo debe llevar un técnico en su ruta diaria (o su equivalente en tiempo)?",
        options: [
          "2–3 servicios",
          "4–5 servicios, o su equivalente en 5 horas efectivas",
          "8–10 servicios",
          "No hay mínimo establecido",
        ],
        correctIndex: 1,
      },
      {
        id: "2.2",
        text: "¿Cuál es la regla crítica de Operaciones respecto a TEC 0002?",
        options: [
          "Debe estar vacío al cierre del día",
          "No debe haber servicios sin técnico asignado",
          "Solo pueden ir servicios de venta nueva",
          "Se revisa una vez por semana",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "coordinacion",
    title: "Coordinación — Confirmación",
    questions: [
      {
        id: "3.1",
        text: "Antes de contactar a un cliente para confirmar, ¿qué debe revisar el coordinador?",
        options: [
          "Solo el historial de pagos",
          "El estado del contrato y el expediente completo (créditos y cobros, calidad, refuerzos/seguimientos pendientes)",
          "Nada, se contacta directamente",
          "Solo si el cliente es categoría A",
        ],
        correctIndex: 1,
      },
      {
        id: "3.2",
        text: "Un cliente pide reprogramar con menos de 48 horas de anticipación. ¿Qué corresponde hacer?",
        options: [
          "Colocarlo en TEC 0002 sin más trámite",
          "Pedir el espacio directamente a Operaciones",
          "Rechazar la reprogramación",
          "Esperar a que pasen las 48 horas",
        ],
        correctIndex: 1,
      },
      {
        id: "3.3",
        text: "¿Cuál es la diferencia entre 'NO ATENDIDO' e 'INCONTACTABLE'?",
        options: [
          "Son lo mismo, se usan indistintamente",
          "NO ATENDIDO = se intentó y no contestó; INCONTACTABLE = se agotaron todos los medios sin respuesta",
          "INCONTACTABLE aplica solo a clientes categoría D",
          "NO ATENDIDO solo se usa para clientes nuevos",
        ],
        correctIndex: 1,
      },
      {
        id: "3.4",
        text: "Una orden con fecha presente o pasada, ¿quién debe verificarla antes de moverse?",
        options: [
          "Solo el coordinador a cargo",
          "Revisión documental (Muriel) y Cobros (Iris), con respaldo por correo",
          "El técnico asignado",
          "No requiere verificación adicional",
        ],
        correctIndex: 1,
      },
      {
        id: "3.5",
        text: "¿A qué hora es el primer cierre de ruta de Coordinación?",
        options: ["8:00 am", "10:30 am", "1:30 pm", "5:00 pm"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "operaciones-aprovechamiento",
    title: "Operaciones — Cuadro de aprovechamiento",
    questions: [
      {
        id: "4.1",
        text: "Si Calidad y Coordinación no llenan los espacios libres del cuadro de aprovechamiento, ¿quién los alimenta?",
        options: [
          "Se dejan vacíos",
          "Operaciones, con la base de clientes de Planificación",
          "Contabilidad",
          "El cliente directamente",
        ],
        correctIndex: 1,
      },
      {
        id: "4.2",
        text: "¿A qué hora debe informarse cualquier desviación de la capacidad instalada (renuncias, incapacidades, permisos, etc.)?",
        options: ["7:00 am", "8:00 am", "10:30 am", "Al cierre del día"],
        correctIndex: 1,
      },
      {
        id: "4.3",
        text: "El segundo cierre de ruta (1:30 pm) solo puede cerrarse si:",
        options: [
          "Ya pasaron las 48 horas",
          "Se llegó a la meta de confirmados; si no, regresa al punto 4.1",
          "Todos los técnicos terminaron su ruta",
          "Contabilidad ya facturó",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "tecnicos",
    title: "Técnicos y cierre de ruta",
    questions: [
      {
        id: "5.1",
        text: "¿Qué NO puede hacer un técnico antes de salir a ruta?",
        options: [
          "Revisar el clima",
          "Salir con el kit de papelería incompleto",
          "Confirmar con su coordinador",
          "Revisar la zona asignada",
        ],
        correctIndex: 1,
      },
      {
        id: "5.2",
        text: "Si el coordinador no responde durante un servicio, ¿a quién escala el técnico?",
        options: [
          "Directamente al cliente",
          "A la Jefatura de Coordinación",
          "A Contabilidad",
          "A Recursos Humanos",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "documentacion-contabilidad",
    title: "Documentación y Contabilidad",
    questions: [
      {
        id: "6.1",
        text: "¿Cuál es el 'candado de entrada' para poder facturar?",
        options: [
          "Que el cliente haya pagado",
          "Que el cierre del Proceso 4.3 (segundo cierre de ruta) esté validado",
          "Que Contratos haya autorizado",
          "Que el técnico haya llegado",
        ],
        correctIndex: 1,
      },
      {
        id: "6.2",
        text: "Una nota de remisión para un pedido especial (ej. Campero) debe generarse siempre con:",
        options: [
          "Autorización de Contabilidad",
          "Envío previo del cliente",
          "Firma del gerente general",
          "72 horas de anticipación",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "administracion",
    title: "Administración — Reprogramación y trazabilidad",
    questions: [
      {
        id: "7.1",
        text: "¿Quién NO puede mover programación en fecha presente o pasada sin la verificación correspondiente?",
        options: [
          "Solo Coordinación",
          "Ningún gestor, sin la verificación de Muriel e Iris",
          "Solo Operaciones",
          "Cualquiera puede moverla si es urgente",
        ],
        correctIndex: 1,
      },
      {
        id: "7.2",
        text: "El cuadro de reprogramación:",
        options: [
          "Se revisa una vez por semana",
          "No se deja con pendientes: se trabaja todos los días",
          "Solo aplica a clientes nuevos",
          "Lo gestiona directamente el cliente",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "ventas",
    title: "Ventas — Recuperación y venta nueva",
    questions: [
      {
        id: "8.1",
        text: "En la recuperación de un cliente D, si el asesor no gestiona en 24 horas, ¿qué sucede?",
        options: [
          "El cliente se cancela automáticamente",
          "El caso pasa al gestor de cartera y queda como ticket en Odoo",
          "Se reasigna a otro asesor de inmediato",
          "Se envía a Contabilidad",
        ],
        correctIndex: 1,
      },
      {
        id: "8.2",
        text: "Si al cierre un TEC 0003 no tiene técnico o fecha correcta, ¿quién debe avisar a Ventas?",
        options: ["Coordinación", "Operaciones", "Contratos", "Administración"],
        correctIndex: 1,
      },
      {
        id: "8.3",
        text: "En la reprogramación de venta nueva, si el asesor no gestiona la nueva fecha en 24 horas, ¿qué ocurre?",
        options: [
          "Se cancela la venta",
          "La gestión se reasigna a otro asesor",
          "Pasa automáticamente a Contratos",
          "El cliente pierde la garantía",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "ciclo-tec",
    title: "Ciclo semanal TEC",
    questions: [
      {
        id: "9.1",
        text: "¿Qué genera el Planificador para abrir el ciclo semanal?",
        options: [
          "Solo TEC 0001",
          "TEC 0001 + TEC BASE",
          "TEC 0002 + TEC 0003",
          "El reporte de facturación",
        ],
        correctIndex: 1,
      },
      {
        id: "9.2",
        text: "¿Qué es TEC 0002?",
        options: [
          "La base semanal de clientes pendientes de confirmar",
          "Un servicio reprogramado por el cliente (ya tenía técnico/fecha/hora y fue modificado)",
          "Los servicios de venta nueva",
          "Una alerta para el Planificador",
        ],
        correctIndex: 1,
      },
      {
        id: "9.3",
        text: "¿Qué es TEC BASE?",
        options: [
          "La lista de clientes categoría A",
          "La referencia de zonas: distribución geográfica y capacidad instalada por zona",
          "El histórico de facturación",
          "El registro de incumplimientos",
        ],
        correctIndex: 1,
      },
      {
        id: "9.4",
        text: "Si Coordinación confirma un servicio que está en TEC 0001, ¿qué debe hacer?",
        options: [
          "Nada, queda confirmado automáticamente",
          "Notificar a Operaciones para que le dé disponibilidad de técnico",
          "Moverlo directamente a TEC 0004",
          "Esperar al cierre semanal",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "incumplimientos",
    title: "Régimen de incumplimientos",
    questions: [
      {
        id: "10.1",
        text: "¿Cuál es el principio que determina la severidad de un incumplimiento?",
        options: [
          "El tiempo que lleva el empleado en la empresa",
          "Su cercanía al cliente: mientras más directo el riesgo o daño al cliente, más grave la falta",
          "El departamento donde ocurre",
          "El monto económico involucrado",
        ],
        correctIndex: 1,
      },
      {
        id: "10.2",
        text: "Una falla interna de forma o de registro, sin riesgo para el cliente, detectada y corregida el mismo día, se clasifica como:",
        options: ["Grave", "Muy grave", "Leve", "No se clasifica"],
        correctIndex: 2,
      },
      {
        id: "10.3",
        text: "Un incumplimiento que pone en riesgo el servicio al cliente o rompe la trazabilidad, aunque se corrija antes de afectarlo, se clasifica como:",
        options: ["Leve", "Grave", "Muy grave", "No se clasifica"],
        correctIndex: 1,
      },
      {
        id: "10.4",
        text: "La afectación directa al cliente, la negligencia comprobada o la reincidencia de faltas graves se clasifica como:",
        options: ["Leve", "Grave", "Muy grave", "Depende del departamento"],
        correctIndex: 2,
      },
    ],
  },
];

export const ALL_QUESTIONS: (Question & { sectionId: string; sectionTitle: string })[] =
  SECTIONS.flatMap((s) =>
    s.questions.map((q) => ({ ...q, sectionId: s.id, sectionTitle: s.title }))
  );
