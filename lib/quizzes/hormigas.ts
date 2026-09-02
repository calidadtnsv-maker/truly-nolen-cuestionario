import { Section, Quiz } from "@/lib/quiz-types";

export const HORMIGAS_SECTIONS: Section[] = [
  {
    id: "horm-biologia",
    title: "Bloque 1 · Biología, comportamiento e identificación",
    tip: "Repasar la Parte 1 y 4 del manual: por qué las obreras forrajeras son solo el 5% del problema, qué es la gemación y qué la provoca, la diferencia hormiga/termita, las 3 subfamilias urbanas por número de nudos y terminación del gáster, y las 7 fichas de especie (en especial carpintera, faraona y zompopo).",
    questions: [
      {
        id: "horm-1",
        type: "mc",
        text: "¿Qué porcentaje del problema representan las obreras forrajeras que normalmente se ven en campo?",
        options: ["95%", "50%", "5%", "25%"],
        correctIndex: 2,
      },
      {
        id: "horm-2",
        type: "mc",
        text: "¿Qué es la 'gemación' y qué la provoca típicamente?",
        options: [
          "La reproducción normal por enjambrazón alada",
          "La división de la colonia en varios nidos, provocada por rociar un repelente (piretroide) sobre las obreras",
          "El proceso de trofalaxis entre obreras",
          "La muerte natural de la reina por vejez",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-3",
        type: "mc",
        text: "¿Cuál es una diferencia clave entre hormiga y termita?",
        options: [
          "La hormiga tiene antenas moniliformes y la termita geniculadas",
          "La hormiga tiene 'cintura' marcada (nudos) y antenas con codo; la termita tiene antenas en forma de cuentas y cuerpo sin cintura",
          "Ambas tienen el mismo tipo de antena, difieren solo en color",
          "La termita tiene aguijón y la hormiga no",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-4",
        type: "mc",
        text: "¿Qué subfamilia se identifica por tener acidoporo (ano redondo con flecos, rocía ácido fórmico) y 1 nudo?",
        options: ["Myrmicinae", "Dolichoderinae", "Formicinae", "Ninguna, todas tienen 2 nudos"],
        correctIndex: 2,
      },
      {
        id: "horm-5",
        type: "mc",
        text: "Encuentras viruta/aserrín en el piso de una habitación y obreras negruzcas de tamaños variados. ¿Qué especie sospechas y qué NO hace esa hormiga?",
        options: [
          "Zompopo — no come el material vegetal que corta",
          "Carpintera — no come la madera, solo excava galerías para alojar crías",
          "Faraona — no come tela",
          "Fantasma — no anida en madera húmeda",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-6",
        type: "mc",
        text: "¿Por qué el nido de interior de una hormiga carpintera normalmente no tiene reina?",
        options: [
          "Porque la reina muere al fundar el nido",
          "Porque suele ser un nido satélite; el nido principal con la reina suele estar lejos de la estructura",
          "Porque las carpinteras no tienen reina",
          "Porque la reina se traslada cada semana entre nidos",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-7",
        type: "mc",
        text: "¿Qué especie es clásica en habitaciones de hospital y cuál es su método de control casi exclusivo?",
        options: [
          "Hormiga de fuego — destrucción de montículo",
          "Faraona — cebado",
          "Zompopo — rociado de plantas",
          "Argentina — barrera perimetral",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-8",
        type: "mc",
        text: "El zompopo (Atta/Acromyrmex) en realidad se alimenta de:",
        options: [
          "Las hojas que corta directamente",
          "Un hongo que cultiva bajo tierra con el material vegetal cortado",
          "Solo néctar de flores",
          "Insectos vivos exclusivamente",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "horm-metodologia",
    title: "Bloque 2 · Metodología de tratamiento",
    tip: "Reforzar la Parte 8: tratamiento de montículo de hormiga de fuego (regadera vs. pulverizador), ingredientes activos no repelentes, ancho y precauciones de la barrera perimetral, alcance del polvo inorgánico en interior, y el caso único del cebo en gel.",
    questions: [
      {
        id: "horm-9",
        type: "mc",
        text: "Para tratar un montículo de hormiga de fuego, ¿qué herramienta se recomienda y por qué?",
        options: [
          "Pulverizador, porque da mayor presión",
          "Regadera, porque entrega el volumen necesario para saturar sin alborotar la colonia",
          "Polvo seco directamente sobre el montículo sin abrirlo",
          "Ningún líquido, solo destrucción física",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-10",
        type: "mc",
        text: "¿Qué grupo de ingredientes activos tiene baja o nula repelencia y es correcto usar contra hormigas?",
        options: [
          "Piretroides",
          "Fenilpirazol (fipronil) y neonicotinoides (imidacloprid, tiametoxam)",
          "Solo ácido bórico",
          "Organofosforados clásicos",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-11",
        type: "mc",
        text: "En una barrera perimetral para hormigas, ¿cuál es el ancho de banda y una precaución ambiental obligatoria?",
        options: [
          "10 m; puede escurrir a drenajes sin problema",
          "Hasta 3 m; no debe escurrir a drenajes/zanjas ni aplicarse sobre plantas en flor con abejas forrajeando",
          "1 m; se puede aplicar sobre plantas en flor",
          "5 m; solo evitar contacto con mascotas",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-12",
        type: "mc",
        text: "¿Por qué los polvos mojables (PM) y microencapsulados se usan solo en exterior?",
        options: [
          "Porque no son efectivos en interior",
          "Porque pueden dejar residuo visible",
          "Porque son ilegales en interior",
          "Porque atraen más hormigas en interior",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-13",
        type: "mc",
        text: "Al aplicar polvo inorgánico en interior para una especie que anida adentro, ¿qué tan lejos del punto señalado por el cliente debes tratar?",
        options: [
          "Solo el punto exacto señalado",
          "Varios metros a cada lado, incluso más allá del cuarto afectado",
          "Únicamente dentro del mismo mueble",
          "No es necesario extender el tratamiento",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-14",
        type: "mc",
        text: "¿En qué caso se usa el cebo en gel, y qué nunca se debe hacer con él?",
        options: [
          "Es el método general para todas las especies; se aplica directamente en componentes eléctricos",
          "Solo como medida especial en equipos eléctricos/electrónicos donde no puede aplicarse polvo ni líquido; nunca sobre componentes eléctricos ni donde haya humedad",
          "Se usa únicamente en el jardín, en cordones continuos",
          "Se usa en cualquier lugar, pero nunca en zonas ocultas",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "horm-cebado-diagnostico",
    title: "Bloque 3 · Cebado y diagnóstico en campo",
    tip: "Repasar la Parte 8 (reglas de colocación y lectura del cebo) y la Parte 10: qué significa cebo intacto vs. consumido, y las dos causas más probables cuando un tratamiento se repite sin éxito.",
    questions: [
      {
        id: "horm-15",
        type: "mc",
        text: "En la visita de seguimiento, un punto de cebo está intacto. ¿Qué significa y qué debes hacer?",
        options: [
          "Hay mucha actividad; hay que reponer inmediatamente",
          "No hay actividad ahí, o el vehículo elegido no le interesa a la especie; considerar cambiar el vehículo (dulce/graso/proteico)",
          "El nido ya fue eliminado por completo",
          "Se debe aplicar un repelente en ese punto",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-16",
        type: "mc",
        text: "Si tienes que repetir el mismo tratamiento visita tras visita sin éxito, ¿cuáles son las dos causas más probables?",
        options: [
          "El cliente no cooperó y el clima cambió",
          "El nido (o todos los nidos) no fue localizado y tratado adecuadamente, o no se detectó una fuente de infestación externa",
          "El producto venció y el técnico llegó tarde",
          "La especie cambió de comportamiento",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-17",
        type: "mc",
        text: "¿Por qué se trata primero el nido y se hace la exclusión/sellado al final?",
        options: [
          "Porque el sellado es más barato al final",
          "Porque sellar antes de tratar el nido puede encerrar una colonia activa dentro de la estructura en vez de eliminarla",
          "Porque el cliente lo pide así",
          "No importa el orden, es solo convención",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "horm-cuentas-comunicacion",
    title: "Bloque 4 · Protocolo por tipo de cuenta y comunicación al cliente",
    tip: "Reforzar la Parte 5 (cómo cambia la Zona Roja entre cuenta residencial, comercial y auditable) y la Parte 7 (la fórmula de comunicación y la instrucción del aerosol, que es 'el 50% de que el trabajo sobreviva hasta la siguiente visita').",
    questions: [
      {
        id: "horm-18",
        type: "mc",
        text: "¿En qué se diferencia la Zona Roja entre cuenta residencial, comercial y auditable?",
        options: [
          "Es exactamente igual en las tres",
          "Residencial = interior del hogar; Comercial = áreas con acceso a clientes; Auditable = áreas de proceso/estériles, con reglas de documentación y autorización más estrictas",
          "Solo cambia el nombre, se puede aplicar lo mismo en todas",
          "En cuenta auditable no existe Zona Roja",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-19",
        type: "mc",
        text: "¿Cuál es la instrucción más importante que siempre debes dar al cliente al cerrar el servicio?",
        options: [
          "Que aplique un aerosol de refuerzo cada semana",
          "Que no use aerosoles en lata contra las hormigas, porque puede dividir la colonia (gemación) y hacer fracasar el tratamiento",
          "Que llame inmediatamente si ve una sola hormiga",
          "Que mueva las macetas de lugar cada mes",
        ],
        correctIndex: 1,
      },
      {
        id: "horm-20",
        type: "mc",
        text: "¿Cuáles son las dos únicas formas de llegar a la reina de una colonia?",
        options: [
          "Rociar la fila y sellar el ingreso",
          "Tratar el nido directamente con formulación líquida, o hacer que las obreras lleven el cebo hasta ella",
          "Usar un aerosol en lata y esperar",
          "Destruir el montículo y aplicar polvo repelente",
        ],
        correctIndex: 1,
      },
    ],
  },
];

export const HORMIGAS_ZONAS = [
  "Operaciones central AM",
  "Operaciones central PM",
  "Operaciones Paracentral",
  "Operaciones Oriental",
  "Operaciones Occidental",
  "Ventas",
];

export const HORMIGAS_QUIZ: Quiz = {
  id: "hormigas",
  title: "Control de Hormigas",
  description:
    "Capacitación técnica para el manejo y control de hormigas urbanas (familia Formicidae) — 20 preguntas.",
  classification: { type: "select", label: "Departamento / Turno / Zona", options: HORMIGAS_ZONAS },
  sections: HORMIGAS_SECTIONS,
};
