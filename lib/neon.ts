import { neon, NeonQueryFunction } from "@neondatabase/serverless";

// Vercel + Neon integration injects DATABASE_URL / POSTGRES_URL automatically
// once you connect a Postgres database from the Storage tab.
// Initialized lazily so `next build` doesn't fail before that env var exists.
let client: NeonQueryFunction<false, false> | null = null;

export function getClient() {
  if (!client) {
    // Preferimos la conexión SIN pooler (directa) para evitar cualquier
    // posibilidad de lectura atrasada a través de PgBouncer.
    const connectionString =
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL_UNPOOLED ||
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL ||
      "";
    if (!connectionString) {
      throw new Error(
        "Falta la variable de entorno DATABASE_URL / POSTGRES_URL. Conecta una base de datos Postgres desde la pestaña Storage en Vercel."
      );
    }
    client = neon(connectionString, {
      // Next.js parchea fetch() globalmente y puede cachear llamadas internas
      // de librerías de terceros (como el driver de Neon) si no se le indica
      // explícitamente que no lo haga.
      fetchOptions: { cache: "no-store" },
    });
  }
  return client;
}

// Proxy so existing `sql\`...\`` call sites keep working unchanged.
export const sql: NeonQueryFunction<false, false> = ((...args: Parameters<NeonQueryFunction<false, false>>) =>
  getClient()(...args)) as NeonQueryFunction<false, false>;
