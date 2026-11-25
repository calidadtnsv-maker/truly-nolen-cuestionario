import { Section, Quiz } from "@/lib/quiz-types";

export const CEBOS_SECTIONS: Section[] = [
  {
    id: "cebos-doctrina",
    title: "Bloque 1 · Doctrina general y las 4 Reglas de Oro",
    tip: "Repasar las 4 Reglas de Oro de la Operación (Etiqueta es la Ley, Seguridad Primero, Producto correcto/lugar correcto, Siempre comunicar), la tabla de Zonas por Ambiente (Verde/Amarilla/Roja según tipo de cuenta) y los 5 Pasos del Motor Táctico (Inspección, Identificación, Determinación, Prevención y Control, Comunicación).",
    questions: [
      {
        id: "cebos-1",
        type: "mc",
        text: "Según la Regla de Oro #1 ('La etiqueta es la ley'), si tienes una duda sobre cómo aplicar un producto, ¿qué debe mandar?",
        options: [
          "La costumbre del equipo",
          "La etiqueta del producto, no la opinión del técnico",
          "Lo que pida el cliente, siempre",
          "La forma más rápida de terminar el servicio",
        ],
        correctIndex: 1,
      },
      {
        id: "cebos-2",
        type: "mc-multi",
        text: "Según la Regla de Oro #2 ('Seguridad primero'), ¿cuáles de los siguientes van siempre antes que la plaga al decidir si y cómo aplicar un producto?",
        options: [
          "Los niños presentes en el lugar",
          "Las mascotas",
          "Las personas mayores",
          "El precio acordado del servicio",
          "El propio EPP (equipo de protección) del técnico",
        ],
        correctIndices: [0, 1, 2, 4],
      },
      {
        id: "cebos-3",
        type: "mc",
        text: "En una cuenta comercial, la Zona Amarilla (puntos de ingreso/focales) corresponde a:",
        options: [
          "Todo el interior del local",
          "El perímetro exterior de 4.5 m alrededor del edificio",
          "Puntos focales interiores, siendo las cocinas el riesgo #1, además de bodegas y cuartos de basura",
          "Únicamente las áreas de acceso público",
        ],
        correctIndex: 2,
      },
      {
        id: "cebos-4",
        type: "mc",
        text: "En una cuenta industrial, la Zona Roja son las plantas de alimentos. ¿Cuál es la regla asociada a esa zona?",
        options: [
          "Servicio invisible: aplicar sin que el público lo note",
          "Seguridad familiar primero",
          "Auditorías estrictas: cero raticidas adentro",
          "No se necesita ninguna precaución especial",
        ],
        correctIndex: 2,
      },
      {
        id: "cebos-5",
        type: "order",
        text: "Ordena los 5 pasos del Motor Táctico que se repiten en cada zona, en cada visita.",
        steps: [
          "Inspección: preguntar y revisar físicamente escondites con linterna, espejos y trampas",
          "Identificación: definir la plaga exacta, su etapa y el nivel de actividad real",
          "Determinación: seleccionar el método menos tóxico que resuelva, evaluando riesgos (mascotas, alimentos)",
          "Prevención y Control: aplicar el producto con precisión quirúrgica, a la dosis de etiqueta, directo a la fuente",
          "Comunicación: cerrar el ciclo informando al cliente los hallazgos, las acciones tomadas y los resultados esperados",
        ],
      },
      {
        id: "cebos-6",
        type: "mc",
        text: "Según la Regla de Oro #4 ('Siempre comunicar'), ¿cuál es la regla de salida que nunca se debe romper?",
        options: [
          "Cobrar el servicio antes de retirarse",
          "Nunca retirarse sin decirle al cliente qué se encontró, qué se hizo y qué debe esperar",
          "Dejar un reporte escrito únicamente si el cliente lo solicita",
          "Avisar solo si hubo algún incidente durante el servicio",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "cebos-advion",
    title: "Bloque 2 · Advion Cucarachas y Advion Hormigas",
    tip: "Reforzar el mecanismo del Efecto Cascada y el Síntoma del Desbordamiento en cucarachas, las líneas rojas de Advion Cucarachas, y en hormigas el porqué de la Trofalaxia y la Advertencia Faraón.",
    questions: [
      {
        id: "cebos-7",
        type: "mc",
        text: "¿Por qué la cucaracha come el gel Advion (Indoxacarb 0.6%) sin detectarlo, a pesar de no ser repelente?",
        options: [
          "Porque el gel no tiene ningún ingrediente activo",
          "Porque al ser no repelente la cucaracha no lo detecta, y son las propias enzimas del insecto las que activan el veneno en su interior",
          "Porque el gel se aplica como aerosol en toda la habitación",
          "Porque la cucaracha necesita beber agua para activar el veneno",
        ],
        correctIndex: 1,
      },
      {
        id: "cebos-8",
        type: "mc",
        text: "En el 'Efecto Cascada' de Advion Cucarachas, ¿qué ocurre después de que una cucaracha come el gel y muere dentro del nido?",
        options: [
          "El producto pierde su efecto inmediatamente",
          "Otras cucarachas comen sus heces o restos contaminados, y por cada cucaracha que comió gel pueden morir hasta 60 más",
          "Las demás cucarachas abandonan el nido de inmediato",
          "No hay ningún efecto sobre el resto de la colonia",
        ],
        correctIndex: 1,
      },
      {
        id: "cebos-9",
        type: "mc",
        text: "El 'Fenómeno del Desbordamiento' explica por qué se ven cucarachas de día. Normalmente, ¿qué porcentaje de su tiempo pasan escondidas (tigmotropismo) y qué significa verlas de día en número alto?",
        options: [
          "Pasan 25% del tiempo escondidas; verlas de día es irrelevante",
          "Pasan 75% de su tiempo escondidas; verlas de día en número alto significa que el nido colapsó por sobrepoblación y los refugios ya no dan abasto",
          "Pasan 95% del tiempo escondidas; verlas de día significa que no hay infestación",
          "El tigmotropismo no tiene relación con que salgan de día",
        ],
        correctIndex: 1,
      },
      {
        id: "cebos-10",
        type: "mc-multi",
        text: "¿Cuáles son líneas rojas (errores graves) al aplicar Advion Cucarachas?",
        options: [
          "Aplicar sobre superficies calientes (>49°C a 54°C, como estufas, hornos o tuberías), porque el gel se derrite y falla",
          "Aplicar sobre superficies expuestas o que se lavan a diario",
          "Poner el gel donde hubo aspersión residual reciente de insecticida, o rociar insecticida sobre el gel",
          "En infestación fuerte, aumentar el tamaño de cada punto de gel para que rinda más",
        ],
        correctIndices: [0, 1, 2],
      },
      {
        id: "cebos-11",
        type: "order",
        text: "Ordena el proceso por el cual Advion Hormigas (Indoxacarb 0.05%, acción retardada) elimina a toda la colonia incluida la reina.",
        steps: [
          "Las obreras forrajeras recolectan el cebo y lo transportan vivo hacia el nido, sin morir de inmediato",
          "Pasan el cebo boca a boca entre ellas (trofalaxia)",
          "Alimentan con el cebo a las larvas y a la Reina",
          "Al morir la Reina, colapsa la colonia entera",
        ],
      },
      {
        id: "cebos-12",
        type: "mc",
        text: "Si identificas Hormiga Faraón, ¿qué nunca debes aplicar y por qué?",
        options: [
          "Nunca cebo en gel, porque no lo aceptan",
          "Nunca repelentes (como aerosoles en aspersión), porque hacen que la colonia se divida (gemación) en múltiples nidos nuevos; se debe usar exclusivamente cebo",
          "Nunca agua, porque no la necesitan",
          "Nunca polvo inorgánico, porque es inofensivo para esta especie",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "cebos-liquatox-raticidas",
    title: "Bloque 3 · Liqua-Tox II y preparación de raticidas",
    tip: "Reforzar cuándo usar Liqua-Tox II (cebo líquido, Difacinona 0.106%) frente a su política estricta de restricción, los 3 pasos de preparación y aseguramiento del raticida, y el protocolo específico para Rata de Tejado (Rattus rattus).",
    questions: [
      {
        id: "cebos-13",
        type: "mc",
        text: "¿En qué escenario tiene ventaja táctica usar Liqua-Tox II (cebo líquido, Difacinona 0.106%, anticoagulante de dosis múltiple)?",
        options: [
          "En cualquier vivienda con niños y mascotas",
          "En bodegas secas con abundancia de granos o alimentos sólidos, porque el roedor necesita agua a diario y el cebo líquido destruye la competencia frente al alimento sólido disponible",
          "Únicamente en exteriores y jardines",
          "Solo cuando ya no queda ningún otro cebo disponible",
        ],
        correctIndex: 1,
      },
      {
        id: "cebos-14",
        type: "mc-multi",
        text: "¿Cuáles de las siguientes forman parte de la política estricta de Truly Nolen para el uso de Liqua-Tox II?",
        options: [
          "Cero viviendas: terminantemente prohibido su uso en residencias y exteriores",
          "Cero auditorías: prohibido en interiores de plantas de alimentos auditadas (AIB, HACCP, ISO 22000)",
          "Solo interiores comerciales/industriales: bodegas secas, silos o cuartos de máquinas sin acceso, siempre en dispensadores cerrados",
          "Puede colocarse en el jardín o patio si el recipiente queda tapado",
        ],
        correctIndices: [0, 1, 2],
      },
      {
        id: "cebos-15",
        type: "order",
        text: "Ordena los 3 pasos de preparación y aseguramiento del raticida líquido.",
        steps: [
          "Paso 1 — Mezcla exacta: diluir solo la dosis del día, 1 sobre completo (50 ml) en 946 ml (1 cuarto de galón) de agua limpia, sin nunca mojar pan, galletas o granos con el líquido",
          "Paso 2 — Distribución en dispensadores: para ratas, un mínimo de 473 ml por estación, junto a madrigueras o roeduras",
          "Paso 3 — Seguridad física: la estación debe estar cerrada, anclada si hay riesgo de volcarse, etiquetada y con el área señalizada, con revisión diaria obligatoria al inicio",
        ],
      },
      {
        id: "cebos-16",
        type: "mc",
        text: "Para la Rata de Tejado (Rattus rattus), cuyo objetivo está en las alturas, ¿cuál es la acción táctica correcta?",
        options: [
          "Colocar trampas a nivel de piso con cebo de carne",
          "Colocar trampas en altura (sobre vigas, atadas a tuberías), usar cebo de fruta o nuez (no carne), y por su extrema cautela dejar la trampa inactiva con cebo varios días (pre-cebado) hasta ver consumo",
          "Aplicar únicamente raticida líquido en el ático",
          "Rociar aerosol PT 565 directamente en las vigas del techo",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "cebos-pt565-seguridad",
    title: "Bloque 4 · PT 565 Plus XLO y seguridad alimentaria",
    tip: "Reforzar qué significa 'Cero Residuo' en PT 565 Plus XLO, su regla de incompatibilidad con los geles de cebo, las técnicas y tiempos de disparo según la zona (grietas, huecos, nebulización) y la Matriz de Seguridad Alimentaria (regla maestra y restricciones de Advion y Liqua-Tox en áreas de alimentos).",
    questions: [
      {
        id: "cebos-17",
        type: "mc",
        text: "¿Qué significa que PT 565 Plus XLO (Piretrinas 0.5%) sea 'Cero Residuo'?",
        options: [
          "Que protege la zona tratada durante varias semanas",
          "Que una vez que el producto se seca, deja de matar; no es una barrera, sino una herramienta de inspección y alivio inmediato (derribo y desalojo)",
          "Que no requiere ninguna precaución de seguridad",
          "Que puede reemplazar a Advion como tratamiento de fondo",
        ],
        correctIndex: 1,
      },
      {
        id: "cebos-18",
        type: "mc",
        text: "¿Cuál es la Regla de Incompatibilidad de PT 565 Plus XLO con los cebos en gel?",
        options: [
          "Se puede rociar sobre el gel para reforzar el efecto",
          "Las piretrinas repelen; nunca se debe rociar sobre puntos de gel Advion ni en zonas donde se planea colocar cebo, porque los insectos rechazarán la comida",
          "No existe ninguna incompatibilidad entre ambos productos",
          "Solo es incompatible con Liqua-Tox II, no con los geles",
        ],
        correctIndex: 1,
      },
      {
        id: "cebos-19",
        type: "mc-multi",
        text: "¿Cuáles de las siguientes son técnicas y tiempos correctos de disparo para PT 565 Plus XLO?",
        options: [
          "En grietas y hendiduras: usar tubo inyector con disparos cortos, máximo 1 segundo por cada 30×30 cm",
          "En huecos de paredes o equipos: aplicar de 3 a 5 segundos por cada 85 litros de volumen",
          "En aplicación espacial (nebulización): usar respirador NIOSH, apagar el A/C, y dejar el área cerrada 15 minutos sin que nadie entre sin ventilar",
          "Puede aplicarse directamente sobre tableros eléctricos o tomacorrientes si el técnico usa guantes de hule",
        ],
        correctIndices: [0, 1, 2],
      },
      {
        id: "cebos-20",
        type: "mc",
        text: "Según la Matriz de Seguridad Alimentaria, ¿cuál es la regla maestra y cómo aplica a Advion y Liqua-Tox II en áreas de alimentos (cocinas, empaque, recepción)?",
        options: [
          "Si la comida, los utensilios o las superficies de preparación pueden tocar el producto, ahí no se aplica; por eso en áreas de alimentos Advion queda extremadamente restringido (solo inyectado profundo en grietas, ningún punto visible) y Liqua-Tox II queda estrictamente prohibido",
          "En áreas de alimentos se puede aplicar cualquier producto si se hace de noche",
          "La regla maestra solo aplica a PT 565, no a los geles ni al raticida líquido",
          "Advion y Liqua-Tox II se aplican igual en áreas con y sin alimentos",
        ],
        correctIndex: 0,
      },
    ],
  },
];

export const CEBOS_ZONAS = [
  "Operaciones central AM",
  "Operaciones central PM",
  "Operaciones Paracentral",
  "Operaciones Oriental",
  "Operaciones Occidental",
  "Ventas",
];

export const CEBOS_QUIZ: Quiz = {
  id: "cebos",
  title: "Guía Táctica de Campo: Advion, Liqua-Tox II y PT 565",
  description:
    "Capacitación técnica sobre el uso correcto de cebos en gel, raticida líquido y aerosol de derribo (Advion Cucarachas/Hormigas, Liqua-Tox II, PT 565 Plus XLO) — 20 preguntas.",
  classification: { type: "select", label: "Departamento / Turno / Zona", options: CEBOS_ZONAS },
  sections: CEBOS_SECTIONS,
};
