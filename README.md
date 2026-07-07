# Cuestionario de Procesos — Truly Nolen

App web para evaluar al personal contra el Manual de Procesos, con autocalificación
y un panel (`/dashboard`) que muestra en qué proceso/departamento hay más errores.

## Qué incluye

- `/` — el cuestionario (32 preguntas en 10 secciones, alineadas al manual).
- `/dashboard` — panel protegido con contraseña, con:
  - % de acierto por sección (proceso)
  - % de acierto por departamento
  - las 10 preguntas más falladas
  - las últimas respuestas registradas
- Base de datos Postgres (vía Vercel Storage) para que las respuestas queden
  centralizadas — no se pierden aunque cada persona responda desde su propio celular/PC.

## Único paso manual antes de desplegar: conectar la base de datos

Esto toma ~2 minutos y solo se hace una vez:

1. En vercel.com, entra al proyecto (después del primer deploy).
2. Pestaña **Storage** → **Create Database** → elige **Postgres** (Neon).
3. Vercel conecta automáticamente las variables de entorno (`POSTGRES_URL`, etc.)
   al proyecto — no hay que copiar nada a mano.
4. Ve a **Settings → Environment Variables** y agrega una más, manual:
   - `DASHBOARD_PASSWORD` = la contraseña que quieras usar para entrar a `/dashboard`.
5. Vuelve a desplegar (Vercel lo hace solo, o dale "Redeploy").

Sin este paso, el cuestionario carga pero falla al guardar respuestas (no hay
dónde guardarlas todavía).

## Personalización rápida

- **Preguntas**: edita `lib/questions.ts` — agrega, quita o cambia preguntas y
  secciones libremente. Cada pregunta necesita `id`, `text`, `options` (4) y
  `correctIndex` (0-3).
- **Colores de marca**: al inicio de `app/page.tsx` y `app/dashboard/page.tsx`
  están `BRAND_GREEN` y `BRAND_GOLD` — cámbialos por los tonos exactos de Truly Nolen.
- **Departamentos**: lista en `lib/questions.ts` (`DEPARTMENTS`).

## Desarrollo local (opcional)

```bash
npm install
npm run dev
```

Necesitas variables de entorno de Postgres locales (Vercel te las da con
`vercel env pull .env.local` una vez conectada la base de datos).
