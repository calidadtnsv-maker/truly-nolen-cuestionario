import { Section, Quiz } from "@/lib/quiz-types";

export const ROEDORES_SECTIONS: Section[] = [
  {
    id: "roe-diagnostico",
    title: "Bloque 1 · Matriz de Diagnóstico Rápido en Campo",
    tip: "Repasar la Matriz de Diagnóstico de la presentación: forma de heces, cola vs. cuerpo, orejas y hábitat típico de rata de tejado, rata noruega y ratón doméstico — son los rasgos que permiten identificar la especie en segundos.",
    questions: [
      {
        id: "roe-1",
        type: "mc",
        text: "Según la Matriz de Diagnóstico Rápido en Campo, ¿qué especie deja heces en forma de cápsula, de punta redondeada, de ~1.5 a 2.5 cm?",
        options: ["Rata de Tejado", "Rata Noruega", "Ratón Doméstico", "Las tres dejan el mismo tipo de heces"],
        correctIndex: 1,
      },
      {
        id: "roe-2",
        type: "mc",
        text: "¿Cómo se diferencia la cola de la Rata de Tejado frente a la de la Rata Noruega?",
        options: [
          "En ambas la cola es igual de larga que el cuerpo",
          "La Rata de Tejado tiene cola más larga que su cuerpo; la Rata Noruega tiene cola más corta que su cuerpo",
          "La Rata de Tejado tiene cola más corta que su cuerpo; la Rata Noruega tiene cola más larga que su cuerpo",
          "Ninguna de las dos especies tiene cola visible",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-3",
        type: "mc",
        text: "Según la matriz de diagnóstico, ¿en qué hábitat se concentra típicamente la actividad de la Rata de Tejado?",
        options: [
          "Madrigueras y alcantarillas a nivel de suelo",
          "Interiores, gabinetes y cajas de bodega",
          "Áticos, árboles y alturas en general",
          "Exclusivamente drenajes pluviales",
        ],
        correctIndex: 2,
      },
      {
        id: "roe-4",
        type: "mc",
        text: "¿Qué caracteriza el hábitat típico de la Rata Noruega según la matriz de diagnóstico?",
        options: [
          "Interiores, gabinetes y paredes huecas",
          "Madrigueras, alcantarillas y nivel de suelo",
          "Áticos y copas de árboles",
          "Cajas y empaques de proveedores únicamente",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-5",
        type: "mc",
        text: "Dentro de una colonia de Rata Noruega, ¿qué comportamiento tiene el macho alfa respecto a las trampas nuevas?",
        options: [
          "Es siempre el primero en caer, porque domina el territorio",
          "Suele probar las trampas de último; al eliminarlo, los subordinados caen con más facilidad",
          "Nunca interactúa con dispositivos nuevos bajo ninguna circunstancia",
          "Abandona la colonia apenas se coloca una trampa",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "roe-sentidos",
    title: "Bloque 2 · Radar Sensorial, Neofobia y Pre-cebado",
    tip: "Repasar por qué fallan las 'trampas humanas': la vista pobre del roedor hace irrelevante el color del dispositivo, mientras que olfato, tacto y gusto son extremos. Repasar también la diferencia entre la curiosidad del ratón y la neofobia de las ratas, y cuándo activar el pre-cebado.",
    questions: [
      {
        id: "roe-6",
        type: "mc",
        text: "Según el 'Radar Sensorial', ¿cuál es el sentido más débil del roedor y qué regla operativa se deriva de eso?",
        options: [
          "El olfato; por eso no importa usar guantes",
          "La vista, que es pobre y sin color; el color de la trampa o el cebo es irrelevante",
          "El tacto; por eso las trampas pueden colocarse en cualquier posición",
          "El gusto; por eso no importa la frescura del cebo",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-7",
        type: "mc",
        text: "El olfato del roedor es extremo. ¿Cuáles son las dos reglas operativas que se derivan de esto?",
        options: [
          "Usar cualquier color de trampa y cambiar el cebo cada mes",
          "Trabajar siempre de noche y evitar el uso de guantes",
          "Usar guantes obligatoriamente (detecta el olor humano) y nunca lavar con químicos fuertes una trampa exitosa, porque el olor a roedor atrae a otros",
          "Aplicar perfume sobre las trampas para disimular el olor humano",
        ],
        correctIndex: 2,
      },
      {
        id: "roe-8",
        type: "mc",
        text: "Por el sentido del tacto (vibrisas en movimiento constante), ¿qué regla de colocación de dispositivos se deriva?",
        options: [
          "Los dispositivos deben ir en el centro de los espacios abiertos",
          "El roedor casi nunca cruza espacios abiertos: se desplaza pegado a las paredes, así que los dispositivos van pegados al muro",
          "Los dispositivos deben colgarse del techo siempre",
          "El tacto no influye en la colocación de trampas",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-9",
        type: "mc",
        text: "Según el cronograma 'Curiosidad vs. Neofobia', ¿cómo se comporta el Ratón Doméstico frente a un dispositivo nuevo?",
        options: [
          "Lo evita durante toda la primera semana, igual que las ratas",
          "Investiga el objeto nuevo en minutos y cae en trampa rápido; si no hay captura en 48 horas, debe reevaluarse la ubicación",
          "Nunca interactúa con dispositivos nuevos",
          "Solo se acerca al dispositivo después del día 7",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-10",
        type: "mc",
        text: "¿Cuándo se recomienda activar el gatillo de una trampa que fue pre-cebada para una infestación mediana o grande de ratas?",
        options: [
          "Inmediatamente al colocarla, sin esperar",
          "Nunca; el pre-cebado sustituye por completo a la trampa activa",
          "Al ver 50–80% de consumo del cebo, aproximadamente entre el día 3 y 4",
          "Solo después de 30 días de observación",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "roe-tacticas",
    title: "Bloque 3 · Manual Táctico Sí/Entonces por Especie",
    tip: "Repasar las 'tarjetas de perfil del enemigo' y las acciones tácticas específicas para cada especie: trampas en altura y cebo de fruta/nuez para la rata de tejado; sellado de drenajes y la Regla del Macho Alfa para la rata noruega; la Regla de los 3 Metros y la Regla de la Moneda para el ratón.",
    questions: [
      {
        id: "roe-11",
        type: "mc",
        text: "Según el Manual Táctico de Acción, si hay actividad en el ático o en tuberías altas, ¿qué especie se determina y cuál es la primera acción?",
        options: [
          "Ratón Doméstico; colocar trampas de golpe pequeñas a nivel de piso",
          "Rata de Tejado; colocar trampas en altura (sobre vigas, atadas a tuberías), no a nivel de piso",
          "Rata Noruega; sellar alcantarillas con malla",
          "Cualquier especie; el protocolo es el mismo sin importar la altura",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-12",
        type: "mc",
        text: "Para la Rata de Tejado, ¿qué tipo de cebo indica el Manual Táctico y por qué?",
        options: [
          "Cebo de carne, porque es su preferencia principal",
          "Cebo de fruta o nuez, no carne, acorde a su preferencia alimenticia",
          "Ningún cebo; solo se usa exclusión",
          "Cebo con agua, porque necesita hidratarse constantemente",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-13",
        type: "mc",
        text: "Si en la inspección se encuentran madrigueras a nivel de suelo o actividad en drenajes, ¿qué determina el Manual Táctico Sí/Entonces y cuál es la primera acción?",
        options: [
          "Ratón Doméstico; sellar huecos del tamaño de una moneda",
          "Rata de Tejado; colocar trampas en altura",
          "Rata Noruega; inspeccionar a ras de suelo y sellar alcantarillas con malla menor a 1/4 de pulgada, porque es excelente nadadora",
          "Ninguna especie roedora; se trata de otra plaga",
        ],
        correctIndex: 2,
      },
      {
        id: "roe-14",
        type: "mc",
        text: "La 'Regla del Macho Alfa' para Rata Noruega indica que las primeras trampas deben colocarse:",
        options: [
          "En cualquier punto aleatorio del predio",
          "Sobre las rutas principales de la colonia, apuntando al macho dominante",
          "Únicamente en el interior de la vivienda",
          "Solo después de eliminar a todos los subordinados",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-15",
        type: "mc",
        text: "Para el Ratón Doméstico, ¿qué establecen la 'Regla de los 3 Metros' y la 'Regla de la Moneda'?",
        options: [
          "Que el nido casi siempre está a menos de 3 m del avistamiento, y que el ratón comprime su esqueleto para pasar por espacios de 6 mm (tamaño de una moneda), por lo que hay que sellar todo",
          "Que el ratón nunca se aleja más de 3 km de su nido y que necesita huecos de al menos 3 cm para entrar",
          "Que se deben colocar exactamente 3 trampas por cada moneda de distancia",
          "Que el ratón solo puede ser detectado a más de 3 metros de distancia",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "roe-exclusion",
    title: "Bloque 4 · Anatomía de la Exclusión",
    tip: "Repasar la 'Abertura máxima permitida' y la especificación de cada material de exclusión: malla metálica calibre 19+, lámina galvanizada calibre 26 para bordes de puertas, mortero 1:3 para mampostería, y los materiales que están terminantemente prohibidos.",
    questions: [
      {
        id: "roe-16",
        type: "mc",
        text: "Según la 'Anatomía de la Exclusión', ¿cuál es la abertura máxima permitida como regla general de exclusión?",
        options: ["1/2 pulgada (12 mm)", "1/4 pulgada (6 mm)", "1 pulgada (25 mm)", "2 pulgadas (50 mm)"],
        correctIndex: 1,
      },
      {
        id: "roe-17",
        type: "mc",
        text: "¿Cuál es la especificación correcta de la malla metálica (hardware cloth) usada en ventilas y rejillas?",
        options: [
          "Malla plástica de cualquier calibre",
          "Malla galvanizada con aberturas menores a 1/4 de pulgada, calibre 19 o más grueso, con tornillos autorroscantes horizontales en techos",
          "Malla de nylon reforzada con silicón",
          "Cualquier malla, siempre que sea de color oscuro",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-18",
        type: "mc",
        text: "¿Qué materiales están terminantemente prohibidos ('Zona Prohibida') para la exclusión de roedores?",
        options: [
          "Lámina galvanizada y mortero de cemento",
          "Malla metálica y lana de acero inoxidable",
          "Plástico, madera sin refuerzo o espuma expansiva usada por sí sola, porque el roedor puede roerlos",
          "Concreto reforzado y acero calibre 19",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "roe-marco",
    title: "Bloque 5 · 5 Pasos, 3 Zonas y Geometría de Trampas",
    tip: "Repasar el orden exacto de los 5 Pasos, el enfoque de cada zona (Verde: saneamiento; Amarilla: exclusión y monitoreo; Roja: cero químicos, solo control mecánico) y los 4 patrones de colocación de trampas: en V, en caja, triple estándar y espalda con espalda.",
    questions: [
      {
        id: "roe-19",
        type: "mc",
        text: "¿Cuál es el orden correcto de los 5 Pasos del Marco Estratégico aplicado a roedores?",
        options: [
          "Identificación → Inspección → Comunicación → Determinación → Prevención/Control",
          "Inspección → Identificación → Determinación → Prevención/Control → Comunicación",
          "Determinación → Prevención/Control → Inspección → Identificación → Comunicación",
          "Comunicación → Inspección → Control → Identificación → Determinación",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-20",
        type: "mc",
        text: "Según el Marco Estratégico de 3 Zonas, ¿cuál es el 'spec' (especificación) de la Zona Roja?",
        options: [
          "Saneamiento y reducción de presión",
          "Exclusión y monitoreo",
          "Cero químicos, solo control mecánico",
          "Cebo rodenticida en cebaderas numeradas",
        ],
        correctIndex: 2,
      },
      {
        id: "roe-21",
        type: "mc",
        text: "En la 'Geometría Táctica' de colocación de trampas, ¿qué patrón se usa para empujar al roedor contra la pared y forzarlo a pisar un disparador?",
        options: ["Triple Estándar", "Espalda con Espalda", "En Caja (Esquina)", "Patrón en V"],
        correctIndex: 3,
      },
      {
        id: "roe-22",
        type: "mc",
        text: "¿Cuál es la 'Regla de Oro' de la Geometría Táctica para la colocación de cualquier trampa?",
        options: [
          "El disparador siempre debe apuntar hacia la superficie de desplazamiento del roedor; nunca se coloca en medio de un espacio abierto",
          "Las trampas deben colocarse siempre en el centro de la habitación para mayor visibilidad",
          "El disparador debe apuntar siempre hacia la puerta principal",
          "Nunca se deben colocar más de dos trampas por habitación",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "roe-arsenal",
    title: "Bloque 6 · El Arsenal: Dispositivos y Químicos por Zona",
    tip: "Repasar qué dispositivo corresponde a cada zona y especie: cebo rodenticida/Liquatox solo en Zona Verde (acción lenta 3–7 días), T-Rex revisado cada 24–48h, multicaptura en zonas Amarilla y Roja, y la regla de oro que prohíbe el rodenticida en Zona Roja.",
    questions: [
      {
        id: "roe-23",
        type: "mc",
        text: "Según 'El Arsenal', ¿en qué zona se usa el cebo rodenticida en cebaderas y cuánto tarda en actuar?",
        options: [
          "Únicamente en Zona Roja; actúa de forma inmediata",
          "Zona Verde únicamente (o perímetro de Zona Amarilla); es de acción lenta, 3 a 7 días",
          "En cualquier zona sin restricción; actúa en 24 horas",
          "Solo en interiores residenciales; actúa en minutos",
        ],
        correctIndex: 1,
      },
      {
        id: "roe-24",
        type: "mc",
        text: "Según las 'Reglas de Despliegue de Dispositivos', ¿cada cuánto debe revisarse una Trampa T-Rex (golpe) instalada dentro de un cebadero sobre una ruta transitada?",
        options: ["Cada 7 días", "Cada 24 a 48 horas", "Una sola vez, al finalizar el servicio", "Cada 30 días"],
        correctIndex: 1,
      },
      {
        id: "roe-25",
        type: "mc",
        text: "¿Cuál es la 'Regla de Oro' del Arsenal respecto al cebo rodenticida?",
        options: [
          "Puede usarse en cualquier zona si el cliente lo autoriza por escrito",
          "Nunca debe usarse cebo rodenticida en Zona Roja ni en áreas de manipulación de alimentos",
          "Debe usarse siempre junto con Liquatox para reforzar el efecto",
          "Solo puede usarse en cuentas industriales auditables",
        ],
        correctIndex: 1,
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
    "Capacitación técnica para el manejo y control de rata de tejado, rata noruega y ratón doméstico — 25 preguntas, basado en la Guía Táctica de Campo.",
  classification: { type: "select", label: "Departamento / Turno / Zona", options: ROEDORES_ZONAS },
  sections: ROEDORES_SECTIONS,
};
