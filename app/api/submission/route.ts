import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pass = searchParams.get("password");
  const id = searchParams.get("id");

  if (pass !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!id) {
    return NextResponse.json({ error: "Falta el id" }, { status: 400 });
  }

  await ensureSchema();

  const subRows = await sql`
    SELECT id, employee_name, department, score, total, created_at
    FROM submissions WHERE id = ${id};
  `;
  if ((subRows as any[]).length === 0) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const answers = await sql`
    SELECT question_id, section_title, is_correct, answer_data
    FROM answers WHERE submission_id = ${id}
    ORDER BY id ASC;
  `;

  return NextResponse.json({
    submission: (subRows as any[])[0],
    answers,
  });
}
