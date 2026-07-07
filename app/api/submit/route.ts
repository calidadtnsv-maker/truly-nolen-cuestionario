import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { ensureSchema } from "@/lib/db";
import { ALL_QUESTIONS, SECTIONS } from "@/lib/questions";

export const dynamic = "force-dynamic";

type MCResponse = { type: "mc"; selectedIndex: number };
type OrderResponse = { type: "order"; order: number[] };
type ResponseValue = MCResponse | OrderResponse;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { employeeName, department, responses } = body as {
      employeeName: string;
      department: string;
      responses: Record<string, ResponseValue>;
    };

    if (!employeeName || !department || !responses) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    await ensureSchema();

    let score = 0;
    const total = ALL_QUESTIONS.length;

    const sectionScores: Record<string, { correct: number; total: number; title: string }> = {};

    const graded = ALL_QUESTIONS.map((q) => {
      const r = responses[q.id];
      let isCorrect = false;
      if (r) {
        if (q.type === "mc" && r.type === "mc") {
          isCorrect = r.selectedIndex === q.correctIndex;
        } else if (q.type === "order" && r.type === "order") {
          const correctOrder = q.steps.map((_, i) => i);
          isCorrect =
            r.order.length === correctOrder.length &&
            r.order.every((v, i) => v === correctOrder[i]);
        }
      }
      if (isCorrect) score += 1;

      if (!sectionScores[q.sectionId]) {
        sectionScores[q.sectionId] = { correct: 0, total: 0, title: q.sectionTitle };
      }
      sectionScores[q.sectionId].total += 1;
      if (isCorrect) sectionScores[q.sectionId].correct += 1;

      return {
        questionId: q.id,
        sectionId: q.sectionId,
        sectionTitle: q.sectionTitle,
        isCorrect,
      };
    });

    const rows = await sql`
      INSERT INTO submissions (employee_name, department, score, total)
      VALUES (${employeeName}, ${department}, ${score}, ${total})
      RETURNING id;
    `;
    const submissionId = (rows as any[])[0].id;

    for (const g of graded) {
      await sql`
        INSERT INTO answers (submission_id, question_id, section_id, section_title, is_correct)
        VALUES (${submissionId}, ${g.questionId}, ${g.sectionId}, ${g.sectionTitle}, ${g.isCorrect});
      `;
    }

    // Consejo personalizado: cualquier sección donde falló al menos una pregunta
    const tipsBySection: Record<string, string> = {};
    SECTIONS.forEach((s) => (tipsBySection[s.id] = s.tip));

    const reinforce = Object.entries(sectionScores)
      .filter(([, v]) => v.correct < v.total)
      .map(([sectionId, v]) => ({
        sectionId,
        sectionTitle: v.title,
        correct: v.correct,
        total: v.total,
        tip: tipsBySection[sectionId] || "Repasa este proceso en el manual.",
      }));

    return NextResponse.json({ score, total, submissionId, reinforce });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
