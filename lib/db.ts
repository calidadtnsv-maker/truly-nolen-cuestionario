import { sql } from "@/lib/neon";

let initialized = false;

export async function ensureSchema() {
  if (initialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      employee_name TEXT NOT NULL,
      department TEXT NOT NULL,
      score INTEGER NOT NULL,
      total INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS answers (
      id SERIAL PRIMARY KEY,
      submission_id INTEGER NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
      question_id TEXT NOT NULL,
      section_id TEXT NOT NULL,
      section_title TEXT NOT NULL,
      is_correct BOOLEAN NOT NULL
    );
  `;

  // Guarda la respuesta real de la persona (para poder ver el detalle de su evaluación)
  await sql`ALTER TABLE answers ADD COLUMN IF NOT EXISTS answer_data JSONB;`;

  initialized = true;
}
