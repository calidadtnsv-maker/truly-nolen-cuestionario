import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { ensureSchema } from "@/lib/db";
import { ALL_QUESTIONS } from "@/lib/questions";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { employeeName, department, responses } = body as {
      employeeName: string;
      department: string;
      responses: Record<string, number>; // questionId -> selectedIndex
    };

    if (!employeeName || !department || !responses) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    await ensureSchema();

    let score = 0;
    const total = ALL_QUESTIONS.length;

    const graded = ALL_QUESTIONS.map((q) => {
      const selected = responses[q.id];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) score += 1;
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

    return NextResponse.json({ score, total, submissionId });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
