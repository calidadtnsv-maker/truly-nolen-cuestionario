import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";
import { ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, password } = body as { id: number | string; password: string };

    if (password !== process.env.DASHBOARD_PASSWORD) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (!id) {
      return NextResponse.json({ error: "Falta el id" }, { status: 400 });
    }

    await ensureSchema();

    await sql`DELETE FROM submissions WHERE id = ${id};`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al borrar" }, { status: 500 });
  }
}
