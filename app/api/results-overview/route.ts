import { NextResponse } from "next/server";
import { getClient } from "@/lib/neon";
import { ensureSchema } from "@/lib/db";
import { QUIZZES } from "@/lib/quizzes/registry";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pass = searchParams.get("password");

  if (pass !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  await ensureSchema();
  const sql = getClient();

  const rows = await sql`
    SELECT quiz_id, COUNT(*)::int AS total_submissions, AVG(score::float / total)::float AS avg_ratio
    FROM submissions
    GROUP BY quiz_id;
  `;
  const statsByQuiz: Record<string, { total_submissions: number; avg_ratio: number }> = {};
  for (const r of rows as any[]) {
    statsByQuiz[r.quiz_id] = { total_submissions: r.total_submissions, avg_ratio: r.avg_ratio };
  }

  const quizzes = QUIZZES.map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    totalQuestions: q.sections.reduce((sum, s) => sum + s.questions.length, 0),
    stats: statsByQuiz[q.id] || { total_submissions: 0, avg_ratio: 0 },
  }));

  return NextResponse.json(
    { quizzes },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
  );
}
