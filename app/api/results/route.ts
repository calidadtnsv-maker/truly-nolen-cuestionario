import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { ensureSchema } from "@/lib/db";
import { SECTIONS } from "@/lib/questions";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pass = searchParams.get("password");

  if (pass !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  await ensureSchema();

  const overall = await sql`
    SELECT COUNT(*)::int AS total_submissions, AVG(score::float / total)::float AS avg_ratio
    FROM submissions;
  `;

  // 1. Preguntas con más errores (excluye las que están al 100%) + departamento que más falla
  const weakestQuestions = await sql`
    SELECT question_id, section_title,
           COUNT(*)::int AS total_answers,
           SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::int AS correct_answers
    FROM answers
    GROUP BY question_id, section_title
    HAVING SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::float / COUNT(*) < 1
    ORDER BY (SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::float / COUNT(*)) ASC
    LIMIT 10;
  `;

  const questionByDept = await sql`
    SELECT a.question_id, s.department,
           COUNT(*)::int AS total_answers,
           SUM(CASE WHEN a.is_correct THEN 1 ELSE 0 END)::int AS correct_answers
    FROM answers a
    JOIN submissions s ON a.submission_id = s.id
    GROUP BY a.question_id, s.department;
  `;

  const weakestDeptByQuestion: Record<string, { department: string; ratio: number }> = {};
  for (const row of questionByDept as any[]) {
    const ratio = row.correct_answers / row.total_answers;
    const current = weakestDeptByQuestion[row.question_id];
    if (!current || ratio < current.ratio) {
      weakestDeptByQuestion[row.question_id] = { department: row.department, ratio };
    }
  }

  const weakestQuestionsWithDept = (weakestQuestions as any[]).map((q) => ({
    ...q,
    weakest_department: weakestDeptByQuestion[q.question_id]?.department || null,
    weakest_department_ratio: weakestDeptByQuestion[q.question_id]?.ratio ?? null,
  }));

  // 2. Ranking por departamento
  const byDepartment = await sql`
    SELECT department,
           COUNT(*)::int AS submissions,
           AVG(score::float / total)::float AS avg_ratio
    FROM submissions
    GROUP BY department
    ORDER BY avg_ratio DESC;
  `;

  const byDepartmentSection = await sql`
    SELECT s.department, a.section_id, a.section_title,
           COUNT(*)::int AS total_answers,
           SUM(CASE WHEN a.is_correct THEN 1 ELSE 0 END)::int AS correct_answers
    FROM answers a
    JOIN submissions s ON a.submission_id = s.id
    GROUP BY s.department, a.section_id, a.section_title
    ORDER BY s.department, (SUM(CASE WHEN a.is_correct THEN 1 ELSE 0 END)::float / COUNT(*)) ASC;
  `;

  // 3. Ranking por usuario (Top 10 / Bottom 10)
  const byPerson = await sql`
    SELECT employee_name,
           (ARRAY_AGG(department ORDER BY created_at DESC))[1] AS department,
           COUNT(*)::int AS attempts,
           AVG(score::float / total)::float AS avg_ratio,
           MAX(created_at) AS last_attempt
    FROM submissions
    GROUP BY employee_name
    ORDER BY avg_ratio DESC;
  `;
  const personRows = byPerson as any[];
  const topPerformers = personRows.slice(0, 10);
  const bottomPerformers = [...personRows].slice(-10).reverse();

  // 4. Top 10 de consejos de reentrenamiento (excluye procesos al 100%)
  const bySection = await sql`
    SELECT section_id, section_title,
           COUNT(*)::int AS total_answers,
           SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::int AS correct_answers
    FROM answers
    GROUP BY section_id, section_title
    HAVING SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::float / COUNT(*) < 1
    ORDER BY (SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::float / COUNT(*)) ASC
    LIMIT 10;
  `;
  const tipsBySection: Record<string, string> = {};
  SECTIONS.forEach((s) => (tipsBySection[s.id] = s.tip));
  const reinforcementRanking = (bySection as any[]).map((s) => ({
    sectionId: s.section_id,
    sectionTitle: s.section_title,
    accuracy: s.correct_answers / s.total_answers,
    tip: tipsBySection[s.section_id] || "Repasar este proceso en el manual.",
  }));

  // 5. Respuestas recientes (con id para poder borrar)
  const recent = await sql`
    SELECT id, employee_name, department, score, total, created_at
    FROM submissions
    ORDER BY created_at DESC
    LIMIT 25;
  `;

  // 6. Todas las evaluaciones por usuario (para ver el detalle de cada una)
  const allSubmissions = await sql`
    SELECT id, employee_name, department, score, total, created_at
    FROM submissions
    ORDER BY employee_name ASC, created_at DESC
    LIMIT 500;
  `;

  return NextResponse.json(
    {
      overall: (overall as any[])[0],
      weakestQuestions: weakestQuestionsWithDept,
      byDepartment,
      byDepartmentSection,
      topPerformers,
      bottomPerformers,
      reinforcementRanking,
      recent,
      allSubmissions,
    },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
  );
}
