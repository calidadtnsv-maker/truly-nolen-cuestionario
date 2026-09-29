import { Section, Quiz } from "@/lib/quiz-types";

export const ROEDORES_SECTIONS: Section[] = [
  {
    id: "roe-identificacion",
    title: "Bloque 1 · Identificación y Biología de las 3 Especies",
    tip: "Repasar la tabla comparativa (Sección 2) de rata de tejado, rata noruega y ratón doméstico: peso, forma de heces, hábitat típico, dieta preferida y comportamiento social de cada una.",
    questions: [
      {
        id: "roe-1",
        type: "mc",
        text: "Según la tabla comparativa del manual, ¿cuál es el rango de peso adulto de la Rata de Tejado (Rattus rattus)?",
        options: ["12 a 30 gramos", "150 a 340 gramos", "200 a 500 gramos", "500 a 700 gramos"],
        correctIndex: 1,
      },
      {
        id: "roe-2",
        type: "mc",
        text: "¿Cómo se describen técnicamente las heces de la Rata Noruega (Rattus norvegicus)?",
        options: [
          "Forma de espina, de punta afilada, ~1–1.25 cm",
          "Forma de cápsula, de punta redondeada, ~1.5–2.5 cm",
          "Forma de bastón, muy pequeñas, 3–6 mm",
          "Forma esférica, ~0.5 cm",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-3",
        type: "mc",
        text: "¿Cuál de las tres especies puede sobrevivir sin beber agua directamente, obteniendo la humedad de los granos y semillas que consume?",
        options: ["Rata de Tejado", "Rata Noruega", "Ratón Doméstico", "Ninguna; las tres necesitan agua diaria"],
        correctIndex: 2,
      },
      {
        id: "roe-4",
        type: "mc",
        text: "¿Cuál es el radio de acción típico del Ratón Doméstico según la tabla comparativa?",
        options: ["3 a 10 metros", "30 a 45 metros", "Hasta 100 metros", "15 a 30 metros"],
        correctIndex: 0,
      },
      {
        id: "roe-5",
        type: "mc",
        text: "¿Cuál especie es la mejor escaladora de las tres, con actividad que casi siempre se concentra en alturas (áticos, cielos rasos, árboles)?",
        options: ["Rata Noruega", "Rata de Tejado", "Ratón Doméstico", "Las tres escalan por igual"],
        correctIndex: 1,
      },
      {
        id: "roe-6",
        type: "mc",
        text: "Según la tabla comparativa, ¿qué caracteriza el comportamiento social de la Rata Noruega respecto al macho dominante?",
        options: [
          "Vive en solitario y no forma colonias",
          "Vive en colonias jerárquicas; el macho alfa suele ser el último en caer en trampa",
          "El macho alfa siempre es el primero en caer en trampa",
          "No existe jerarquía social en esta especie",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-7",
        type: "mc",
        text: "¿Cuál es la dieta preferida de la Rata Noruega, a diferencia de la Rata de Tejado?",
        options: ["Frutas, vegetales, nueces y granos", "Carne, pescado y alimentos de origen animal", "Exclusivamente granos secos", "Únicamente insectos"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "roe-comportamiento",
    title: "Bloque 2 · Comportamiento General Aplicado al Control",
    tip: "Repasar la Sección 6: neofobia y pre-cebado, por qué no se lavan las trampas usadas con químicos fuertes, la pobre agudeza visual de los roedores, y el efecto de eliminar al macho alfa en una colonia.",
    questions: [
      {
        id: "roe-8",
        type: "mc",
        text: "¿Qué es la neofobia y qué técnica de campo se deriva directamente de ella?",
        options: [
          "Es el miedo a la luz; se resuelve trabajando de noche",
          "Es la desconfianza ante objetos nuevos; de ahí se deriva el pre-cebado, dejando el dispositivo inactivo hasta ver alto consumo",
          "Es el miedo al agua; se resuelve evitando zonas húmedas",
          "Es la atracción hacia olores nuevos; se resuelve cambiando el cebo cada día",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-9",
        type: "mc",
        text: "¿Por qué el manual indica que nunca se debe lavar con químicos fuertes una trampa que ya capturó un roedor?",
        options: [
          "Porque daña el mecanismo metálico de la trampa",
          "Porque el olor a roedor que queda puede atraer a otros miembros de la colonia",
          "Porque es un requisito de bioseguridad para el técnico",
          "Porque elimina por completo el cebo remanente",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-10",
        type: "mc",
        text: "Sobre el sentido de la vista en los roedores, ¿qué implicación práctica señala el manual?",
        options: [
          "Ven en color a larga distancia, por lo que el color del cebo es determinante",
          "Su vista es pobre, sin color y con campo de ~1 m, por lo que el color del cebo o la trampa es irrelevante",
          "Es su sentido más desarrollado y guía todo su desplazamiento",
          "Detectan movimiento humano a más de 50 metros",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-11",
        type: "mc",
        text: "¿Qué efecto técnico se genera al eliminar al macho alfa de una colonia de Rata Noruega?",
        options: [
          "La colonia completa abandona el predio de inmediato",
          "Los subordinados se vuelven más cautelosos y difíciles de capturar",
          "Se genera competencia entre los subordinados, que se vuelven menos cautelosos y más fáciles de capturar",
          "No se observa ningún cambio en el comportamiento de la colonia",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "roe-protocolo",
    title: "Bloque 3 · Protocolo de 5 Pasos y Sistema de 3 Zonas",
    tip: "Repasar la Sección 7 (Determinación por zona, tiempos de acción del rodenticida, seguimiento cada 48h) y la Sección 8 (distancias de referencia de monitoreo exterior e interior).",
    questions: [
      {
        id: "roe-12",
        type: "mc",
        text: "Según el Paso 3 (Determinación) aplicado a roedores, ¿qué corresponde hacer en la Zona Roja?",
        options: [
          "Instalar cebaderas de rodenticida de forma permanente",
          "Aplicar control sanitario y captura/remoción con trampas; nunca cebo rodenticida en áreas de alimentos",
          "Únicamente exclusión, sin ningún dispositivo de captura",
          "Colocar cebaderas exteriores aseguradas cada 15–30 m",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-13",
        type: "mc",
        text: "Según el Paso 5 (Comunicación), ¿cuánto tiempo tardan en actuar los rodenticidas de acción lenta?",
        options: ["24 horas", "3 a 7 días", "2 semanas", "Actúan de forma inmediata"],
        correctIndex: 1,
      },
      {
        id: "roe-14",
        type: "mc",
        text: "¿Cada cuánto tiempo se debe revisar y retirar los roedores capturados, como parte del seguimiento?",
        options: ["Cada 24 horas", "Cada 48 horas", "Cada semana", "Cada mes"],
        correctIndex: 1,
      },
      {
        id: "roe-15",
        type: "mc",
        text: "¿Cuál es la distancia de referencia para el monitoreo exterior en Zona Verde?",
        options: [
          "6 a 12 metros entre sí",
          "15 a 30 metros entre sí, o uno en cada lado de la estructura",
          "3 a 10 metros entre sí",
          "50 metros entre sí",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-16",
        type: "mc",
        text: "¿Cuál es la distancia de referencia para el monitoreo interior en Zona Amarilla?",
        options: ["15 a 30 metros", "6 a 12 metros; en cada lado de puertas al exterior", "1 a 2 metros", "50 a 100 metros"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "roe-exclusion",
    title: "Bloque 4 · Exclusión, Trampas y Dispositivos",
    tip: "Repasar la Sección 9 (materiales y especificaciones de exclusión) y la Sección 10 (regla de oro de colocación de trampas y patrones: en V, en caja, triple estándar, espalda con espalda).",
    questions: [
      {
        id: "roe-17",
        type: "mc",
        text: "¿Cuál es la abertura máxima que debe considerarse para excluir el ingreso de un ratón doméstico?",
        options: ["1/2 pulgada", "1/4 pulgada", "1 pulgada", "2 pulgadas"],
        correctIndex: 1,
      },
      {
        id: "roe-18",
        type: "mc",
        text: "¿Cuál es la especificación técnica correcta del material recomendado para sellar ventilas y aberturas grandes?",
        options: [
          "Espuma expansiva aplicada sola, sin refuerzo",
          "Malla metálica (hardware cloth) con aberturas menores a 1/4″, calibre 19 o más grueso, galvanizada",
          "Plástico rígido resistente al agua",
          "Madera contrachapada sin refuerzo metálico",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-19",
        type: "mc",
        text: "Al reparar techos e instalar una lámina de protección contra roedores, ¿cuánto debe extenderse la lámina más allá del borde existente?",
        options: ["1 pulgada", "Al menos 3 pulgadas", "6 pulgadas", "No es necesario extenderla"],
        correctIndex: 1,
      },
      {
        id: "roe-20",
        type: "mc",
        text: "¿Cuál es la 'regla de oro' para la colocación de trampas de golpe según el manual?",
        options: [
          "Colocarlas en medio de espacios abiertos, donde sean más visibles",
          "Colocarlas pegadas a la pared o a un elemento estructural, con el disparador hacia la superficie por donde se desplaza el roedor",
          "Colocarlas siempre en el centro de la habitación",
          "Colocarlas únicamente bajo luz directa para facilitar la revisión",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-21",
        type: "mc",
        text: "¿Qué patrón de colocación de trampas busca empujar al roedor contra la pared para activar uno de los disparadores?",
        options: ["Triple estándar", "Espalda con espalda", "Patrón en V", "En caja"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "roe-saneamiento",
    title: "Bloque 5 · Saneamiento, Bioseguridad, Enfermedades y Tipos de Cuenta",
    tip: "Repasar la Sección 12 (bioseguridad en el manejo de roedores), la Sección 13 (riesgos sanitarios), la Sección 10 (uso de cebaderas) y la Sección 14.3 (protocolo en cuenta auditable/industrial).",
    questions: [
      {
        id: "roe-22",
        type: "mc",
        text: "Antes de limpiar heces u orina seca de roedor, ¿qué indica el protocolo de bioseguridad?",
        options: [
          "Barrerlas directamente para retirarlas rápido",
          "Aspirarlas en seco con una aspiradora convencional",
          "Rociarlas primero con desinfectante para no dispersar partículas en el aire",
          "Lavarlas con agua a presión sin protección personal",
        ],
        correctIndex: 2,
      },
      {
        id: "roe-23",
        type: "mc",
        text: "¿Qué enfermedad se transmite por inhalación de polvo con orina o heces secas de roedor y exige el uso de mascarilla en espacios cerrados con acumulación?",
        options: ["Leptospirosis", "Hantavirus", "Salmonelosis", "Peste"],
        correctIndex: 1,
      },
      {
        id: "roe-24",
        type: "mc",
        text: "Sobre las cebaderas de rodenticida en exterior, ¿qué exige el manual respecto a su instalación?",
        options: [
          "Pueden colocarse libremente en la Zona Roja",
          "Deben estar aseguradas (estaca o cadena), etiquetadas con fecha, y se usan principalmente en el exterior (Zona Verde)",
          "No requieren ningún tipo de anclaje ni etiquetado",
          "Se usan solo en interiores residenciales, cerca de las áreas de cocina",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-25",
        type: "mc",
        text: "En una Cuenta Auditable (Industrial), dentro de la Zona Roja (áreas de producción y manipulación de alimentos), ¿qué tipo de control está permitido?",
        options: [
          "Cebo rodenticida documentado y numerado",
          "Liquatox aplicado según etiqueta por personal capacitado",
          "Únicamente dispositivos mecánicos numerados, con trazabilidad; nunca control químico",
          "El técnico decide libremente el método según la infestación",
        ],
        correctIndex: 2,
      },
    ],
  },
];

export const ROEDORES_ZONAS = [
  "Operaciones central AM",
  "Operaciones central PM",
  "Operaciones Paracentral",
  "Operaciones Oriental",
  "Operaciones Occidental",
  "Ventas",
];

export const ROEDORES_QUIZ: Quiz = {
  id: "roedores",
  title: "Control de Roedores",
  description:
    "Capacitación técnica para el manejo y control de rata de tejado, rata noruega y ratón doméstico — 25 preguntas.",
  classification: { type: "select", label: "Departamento / Turno / Zona", options: ROEDORES_ZONAS },
  sections: ROEDORES_SECTIONS,
};
