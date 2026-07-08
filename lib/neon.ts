import { neon, NeonQueryFunction } from "@neondatabase/serverless";

// Vercel + Neon integration injects DATABASE_URL / POSTGRES_URL automatically
// once you connect a Postgres database from the Storage tab.
// Initialized lazily so `next build` doesn't fail before that env var exists.
let client: NeonQueryFunction<false, false> | null = null;

export function getClient() {
  if (!client) {
    const connectionString =
      process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
    if (!connectionString) {
      throw new Error(
        "Falta la variable de entorno DATABASE_URL / POSTGRES_URL. Conecta una base de datos Postgres desde la pestaña Storage en Vercel."
      );
    }
    client = neon(connectionString);
  }
  return client;
}

// Proxy so existing `sql\`...\`` call sites keep working unchanged.
export const sql: NeonQueryFunction<false, false> = ((...args: Parameters<NeonQueryFunction<false, false>>) =>
  getClient()(...args)) as NeonQueryFunction<false, false>;
