"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BRAND_RED = "#E30613";
const BRAND_BLACK = "#111111";
const GOOD = "#1B7A3D";

type QuizOverview = {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  stats: { total_submissions: number; avg_ratio: number };
};

export default function DashboardOverview() {
  const [password, setPassword] = useState("");
  const [quizzes, setQuizzes] = useState<QuizOverview[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(pw: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/results-overview?password=${encodeURIComponent(pw)}&t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("No autorizado");
      const json = await res.json();
      setQuizzes(json.quizzes);
      sessionStorage.setItem("dashboardPassword", pw);
    } catch {
      setError("Contraseña incorrecta");
      sessionStorage.removeItem("dashboardPassword");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("dashboardPassword");
    if (saved) {
      setPassword(saved);
      load(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!quizzes) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "white", borderRadius: 16, padding: 40, maxWidth: 400, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", borderTop: `5px solid ${BRAND_RED}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Truly Nolen" style={{ height: 90, display: "block", margin: "0 auto 20px" }} />
          <h2 style={{ color: BRAND_BLACK, fontWeight: 700, textAlign: "center", marginTop: 0 }}>Panel de resultados</h2>
          <input
            type="password"
            placeholder="Contraseña del panel"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", boxSizing: "border-box", fontSize: 15 }}
            onKeyDown={(e) => e.key === "Enter" && load(password)}
          />
          <button
            onClick={() => load(password)}
            disabled={loading}
            style={{ marginTop: 14, width: "100%", background: BRAND_RED, color: "white", border: "none", borderRadius: 8, padding: "12px 20px", cursor: "pointer", fontWeight: 700, fontSize: 15 }}
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
          {error && <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 20px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Truly Nolen" style={{ height: 110, display: "inline-block" }} />
        <h1 style={{ color: BRAND_BLACK, fontWeight: 700, marginTop: 16 }}>Panel de resultados</h1>
        <p style={{ color: "#556" }}>Elige la evaluación que quieres revisar.</p>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {quizzes.map((quiz) => (
          <Link
            key={quiz.id}
            href={`/dashboard/${quiz.id}`}
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ margin: "0 0 6px", color: BRAND_BLACK, fontWeight: 700, fontSize: 19 }}>{quiz.title}</h2>
                <p style={{ margin: 0, color: "#556", fontSize: 14 }}>{quiz.description}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: quiz.stats.total_submissions > 0 ? GOOD : "#aaa" }}>
                  {Math.round((quiz.stats.avg_ratio || 0) * 100)}%
                </div>
                <div style={{ fontSize: 12, color: "#889" }}>{quiz.stats.total_submissions} respuestas</div>
              </div>
            </div>
            <span style={{ display: "inline-block", marginTop: 12, color: BRAND_RED, fontWeight: 700, fontSize: 14 }}>
              Ver panel completo →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
