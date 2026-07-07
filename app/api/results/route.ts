import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { ensureSchema } from "@/lib/db";
import { SECTIONS } from "@/lib/questions";

export const dynamic = "force-dynamic";

const WEAK_THRESHOLD = 0.7; // debajo de 70% de acierto se considera oportunidad de mejora

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

  const bySection = await sql`
    SELECT section_id, section_title,
           COUNT(*)::int AS total_answers,
           SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::int AS correct_answers
    FROM answers
    GROUP BY section_id, section_title
    ORDER BY (SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::float / COUNT(*)) ASC;
  `;

  const byDepartment = await sql`
    SELECT department,
           COUNT(*)::int AS submissions,
           AVG(score::float / total)::float AS avg_ratio
    FROM submissions
    GROUP BY department
    ORDER BY avg_ratio ASC;
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

  const byQuestion = await sql`
    SELECT question_id, section_title,
           COUNT(*)::int AS total_answers,
           SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::int AS correct_answers
    FROM answers
    GROUP BY question_id, section_title
    ORDER BY (SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::float / COUNT(*)) ASC
    LIMIT 10;
  `;

  const recent = await sql`
    SELECT employee_name, department, score, total, created_at
    FROM submissions
    ORDER BY created_at DESC
    LIMIT 25;
  `;

  // Consejos de reentrenamiento: secciones con acierto general debajo del umbral
  const sectionTips: Record<string, string> = {};
  SECTIONS.forEach((s) => (sectionTips[s.id] = s.tip));

  const reinforcementTips = (bySection as any[])
    .filter((s) => s.total_answers > 0 && s.correct_answers / s.total_answers < WEAK_THRESHOLD)
    .map((s) => ({
      sectionId: s.section_id,
      sectionTitle: s.section_title,
      accuracy: s.correct_answers / s.total_answers,
      tip: sectionTips[s.section_id] || "Reforzar este proceso con el manual y casos prácticos.",
    }));

  const personRows = byPerson as any[];
  const topPerformers = [...personRows].slice(0, 5);
  const bottomPerformers = [...personRows].slice(-5).reverse();

  return NextResponse.json({
    overall: (overall as any[])[0],
    bySection,
    byDepartment,
    byDepartmentSection,
    byPerson,
    topPerformers,
    bottomPerformers,
    weakestQuestions: byQuestion,
    reinforcementTips,
    recent,
  });
}
