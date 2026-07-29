import Link from "next/link";
import { QUIZZES } from "@/lib/quizzes/registry";

const BRAND_RED = "#E30613";
const BRAND_BLACK = "#111111";

export default function Home() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Truly Nolen" style={{ height: 130, display: "inline-block" }} />
        <h1 style={{ color: BRAND_BLACK, fontWeight: 700, marginTop: 16 }}>Evaluaciones de Capacitación</h1>
        <p style={{ color: "#556" }}>Elige la evaluación que vas a responder.</p>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {QUIZZES.map((quiz) => (
          <Link
            key={quiz.id}
            href={`/cuestionario/${quiz.id}`}
            style={{
              display: "block",
              background: "white",
              borderRadius: 16,
              padding: "24px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              borderLeft: `5px solid ${BRAND_RED}`,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h2 style={{ margin: "0 0 6px", color: BRAND_BLACK, fontWeight: 700, fontSize: 19 }}>{quiz.title}</h2>
            <p style={{ margin: 0, color: "#556", fontSize: 14 }}>{quiz.description}</p>
            <span style={{ display: "inline-block", marginTop: 12, color: BRAND_RED, fontWeight: 700, fontSize: 14 }}>
              Comenzar →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
