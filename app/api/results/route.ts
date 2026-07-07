import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { ensureSchema } from "@/lib/db";

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

  return NextResponse.json({
    overall: (overall as any[])[0],
    bySection,
    byDepartment,
    weakestQuestions: byQuestion,
    recent,
  });
}
