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
  colorLabel?: string; // color departamental de referencia (opcional, usado por 'procesos')
  tip: string; // consejo de reentrenamiento si esta sección sale débil
  questions: Question[];
};

export type AnyQuestion =
  | (MCQuestion & { sectionId: string; sectionTitle: string })
  | (OrderQuestion & { sectionId: string; sectionTitle: string });

// Campo de clasificación del respondedor: puede ser una lista fija (ej. Departamento)
// o un campo de texto libre (ej. Sucursal), según lo que tenga sentido por evaluación.
export type ClassificationField =
  | { type: "select"; label: string; options: string[] }
  | { type: "text"; label: string; placeholder?: string };

export type Quiz = {
  id: string;
  title: string;
  description: string;
  classification: ClassificationField;
  sections: Section[];
};

export function buildAllQuestions(sections: Section[]): AnyQuestion[] {
  return sections.flatMap((s) =>
    s.questions.map((q) => {
      if (q.type === "mc") {
        return { ...q, sectionId: s.id, sectionTitle: s.title };
      }
      return { ...q, sectionId: s.id, sectionTitle: s.title };
    })
  ) as AnyQuestion[];
}
