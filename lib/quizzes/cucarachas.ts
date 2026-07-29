import { Section, Quiz } from "@/lib/quiz-types";

export const CUCARACHAS_SECTIONS: Section[] = [
  {
    id: "cuc-biologia",
    title: "Bloque 1 · Biología y Comportamiento",
    tip: "Repasar la ficha de identificación técnica de Blattella germanica: capacidad reproductiva por ooteca, el comportamiento del punto focal fecal y el tigmotropismo.",
    questions: [
      {
        id: "cuc-1",
        type: "mc",
        text: "Según la ficha de identificación técnica, ¿cuál es la capacidad reproductiva exacta de una sola ooteca de Blattella germanica?",
        options: ["10 a 25 huevos por cápsula", "20 a 30 huevos por cápsula", "30 a 48 huevos por cápsula", "50 a 60 huevos por cápsula"],
        correctIndex: 2,
      },
      {
        id: "cuc-2",
        type: "mc",
        text: "¿Por qué el comportamiento de acudir al 'punto focal fecal' es crítico para la efectividad del Ácido Bórico?",
        options: [
          "Porque es el área de mayor temperatura donde el producto se activa químicamente",
          "Porque las ninfas consumen las heces para obtener microflora intestinal necesaria para la digestión, permitiendo la propagación del boro",
          "Porque el olor de las heces neutraliza la repelencia de los insecticidas líquidos",
          "Porque es el único lugar donde las hembras depositan las ootecas antes de la eclosión",
        ],
        correctIndex: 1,
      },
      {
        id: "cuc-3",
        type: "mc",
        text: "La cucaracha alemana exhibe 'Tigmotropismo'. ¿Qué busca la plaga al refugiarse bajo este principio?",
        options: [
          "Lugares con alta intensidad lumínica para facilitar la búsqueda de alimento",
          "Espacios abiertos donde sus cercos detecten vibraciones de aire sin obstrucciones",
          "Refugios estrechos donde pueda sentir una superficie contra su abdomen y su espalda de forma simultánea",
          "Áreas con alta ventilación para evitar la acumulación de feromonas de agregación",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "cuc-pilares",
    title: "Bloque 2 · Los 3 Pilares y el Protocolo de Zonas",
    tip: "Reforzar la 'Regla del 95%' (un servicio inicial mediocre no se resuelve con visitas posteriores), la definición de Zona Roja en cuentas residenciales, y por qué los piretroides dispersan la colonia en vez de controlarla.",
    questions: [
      {
        id: "cuc-4",
        type: "mc",
        text: "Según 'La Regla que lo Resume Todo', ¿qué ocurre si no se logra el 95% de eliminación en el servicio inicial?",
        options: [
          "El éxito se garantiza a largo plazo con cebo en gel mensual",
          "El plan de mantenimiento va a fracasar, pues un servicio inicial mediocre no se resuelve con visitas posteriores",
          "El técnico debe cambiar de inmediato a piretroides de alta residualidad",
          "Se debe notificar al cliente que el control total es biológicamente imposible en menos de 6 meses",
        ],
        correctIndex: 1,
      },
      {
        id: "cuc-5",
        type: "mc",
        text: "Dentro del 'Protocolo de 3 Zonas', ¿cómo se define la 'Zona Roja' en una cuenta residencial?",
        options: [
          "El perímetro exterior, incluyendo jardines y estacionamiento",
          "Los puntos de ingreso como ventanas, umbrales de puertas y sellos de plomería",
          "El interior de la vivienda (especialmente cocina y baño), donde la plaga encuentra sus necesidades básicas",
          "Exclusivamente los motores de equipos de refrigeración de alta capacidad",
        ],
        correctIndex: 2,
      },
      {
        id: "cuc-6",
        type: "mc",
        text: "¿Cuál es el efecto técnico negativo inmediato de usar piretroides (líquidos repelentes) en el interior de las estructuras?",
        options: [
          "Incrementan la resistencia genética de las ninfas de primer estadio",
          "No tienen efectos negativos; son el complemento ideal del aspirado mecánico",
          "Las cucarachas los detectan, dispersan la colonia hacia otras áreas y agravan el problema",
          "Aceleran el metabolismo de las hembras, provocando eclosión prematura de ootecas",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "cuc-metodologia",
    title: "Bloque 3 · Metodología y Técnicas Base",
    tip: "Practicar el orden de ejecución según nivel de infestación, la seguridad al aplicar boro cerca de puntos eléctricos, y en qué casos excepcionales está permitido el cebo en gel.",
    questions: [
      {
        id: "cuc-7",
        type: "mc",
        text: "Durante la inspección, si hay actividad de cucarachas de día y un olor fuerte característico, ¿qué nivel de infestación se dictamina?",
        options: ["Nivel Leve", "Nivel Preventivo", "Nivel Medio", "Nivel Alto"],
        correctIndex: 3,
      },
      {
        id: "cuc-8",
        type: "mc",
        text: "En una infestación 'ALTA', ¿cuál es el primer paso obligatorio en el orden de ejecución de las técnicas?",
        options: [
          "Aplicación de cebo en gel en todas las bisagras de la cocina",
          "Aspirado mecánico con boquilla fina para remover el mayor volumen de población visible",
          "Aspersión de líquido repelente en el perímetro interior de la Zona Roja",
          "Sellado inmediato de todas las grietas con silicón",
        ],
        correctIndex: 1,
      },
      {
        id: "cuc-9",
        type: "mc",
        text: "Sobre la aplicación de Ácido Bórico, ¿cuál es la instrucción de seguridad para evitar riesgos en puntos eléctricos?",
        options: [
          "Aplicar en capa gruesa para que el polvo no sea desplazado por el viento de los motores",
          "Aplicar en capa ligera; una capa gruesa puede absorber humedad y provocar un corto circuito",
          "Mezclar el polvo con agua para crear una pasta conductora que no se disperse",
          "Aplicar únicamente en superficies externas de los tomacorrientes sin manguitos aislantes",
        ],
        correctIndex: 1,
      },
      {
        id: "cuc-10",
        type: "mc",
        text: "El cebo en gel se define como una 'MEDIDA ESPECIAL'. ¿En qué caso único está permitida su aplicación?",
        options: [
          "Como sustituto del aspirado cuando el técnico tiene poco tiempo",
          "Como tratamiento generalizado en todas las alacenas y cajones",
          "Exclusivamente en equipos eléctricos o electrónicos donde no se puede aplicar polvo ni líquido por riesgo de daño",
          "Únicamente en la Zona Verde para evitar degradación por clima",
        ],
        correctIndex: 2,
      },
      {
        id: "cuc-11",
        type: "mc",
        text: "¿Cuál es el beneficio técnico prioritario del aspirado mecánico respecto a las hembras grávidas?",
        options: [
          "El ruido de la aspiradora interrumpe su ciclo de apareamiento de forma permanente",
          "Son más lentas y vulnerables a esta técnica; aspirarlas elimina ootecas de 30-48 huevos que no eclosionarán",
          "El aspirado elimina la necesidad de saneamiento por parte del cliente",
          "La succión deshidrata la ooteca, impidiendo la maduración de las ninfas aunque no sean capturadas",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "cuc-industrial",
    title: "Bloque 4 · Inspección Industrial y Ciclo de Servicio",
    tip: "Repasar la 'Regla del Lápiz' para exclusión en Zona Amarilla, el orden exacto de los 5 Pasos Truly Care, y qué significa encontrar ninfas recién eclosionadas en la Visita 2.",
    questions: [
      {
        id: "cuc-12",
        type: "mc",
        text: "En inspecciones de 'Zona Amarilla' industrial, ¿qué establece la 'Regla del Lápiz' sobre la exclusión?",
        options: [
          "Si un lápiz cabe bajo la puerta de andén, la exclusión es aceptable según normas BPM",
          "Si un lápiz puede pasar por debajo de la puerta de andén, existe una falla de exclusión que debe reportarse y corregirse",
          "El técnico debe usar un lápiz para marcar los puntos de aplicación de Ácido Bórico",
          "Se debe dejar un lápiz dentro de cada estación de monitoreo para verificar manipulación",
        ],
        correctIndex: 1,
      },
      {
        id: "cuc-13",
        type: "mc",
        text: "¿Cuál es el orden exacto de los '5 Pasos Truly Care' que rigen el ciclo de servicio profesional?",
        options: [
          "Control → Inspección → Comunicación → Identificación → Determinación",
          "Inspección → Identificación → Determinación → Control/Prevención → Comunicación",
          "Identificación → Saneamiento → Control → Inspección → Cobro",
          "Entrevista → Aspirado → Ácido Bórico → Sellado → Comunicación",
        ],
        correctIndex: 1,
      },
      {
        id: "cuc-14",
        type: "mc",
        text: "Durante la 'Visita 2' (ventana de 28-30 días), ¿qué indica técnicamente encontrar una mayoría de ninfas recién eclosionadas?",
        options: [
          "Que el tratamiento inicial fue un fracaso total y la población ha mutado",
          "Que las ootecas protegidas en la Visita 1 ya eclosionaron; es la oportunidad crítica de cortar el ciclo antes de que maduren",
          "Que existe una reinfestación activa proveniente de una fuente externa",
          "Que el Ácido Bórico perdió residualidad por saneamiento excesivo",
        ],
        correctIndex: 1,
      },
      {
        id: "cuc-15",
        type: "mc",
        text: "¿Cuál es el procedimiento técnico correcto para tratar electrodomésticos pequeños infestados (tostadoras/microondas)?",
        options: [
          "Inundar el teclado del equipo con insecticida líquido residual",
          "Aplicar una capa gruesa de boro en todas las ranuras de ventilación",
          "Método de la bolsa: disparar aerosol de piretro no residual por 1 segundo en bolsa sellada durante 15 minutos",
          "Sumergir la base del equipo en una solución desinfectante por 30 minutos",
        ],
        correctIndex: 2,
      },
    ],
  },
];

export const CUCARACHAS_ZONAS = [
  "Operaciones central AM",
  "Operaciones central PM",
  "Operaciones Paracentral",
  "Operaciones Oriental",
  "Operaciones Occidental",
  "Ventas",
];

export const CUCARACHAS_QUIZ: Quiz = {
  id: "cucarachas",
  title: "Control de Cucaracha Alemana",
  description: "Capacitación técnica para el manejo y control de cucarachas germánicas (Blattella germanica) — 15 preguntas.",
  classification: { type: "select", label: "Departamento / Turno / Zona", options: CUCARACHAS_ZONAS },
  sections: CUCARACHAS_SECTIONS,
};
