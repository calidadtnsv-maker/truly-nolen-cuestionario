"use client";

import { useState } from "react";

const BRAND_GREEN = "#1B5E3F";

type Results = {
  overall: { total_submissions: number; avg_ratio: number };
  bySection: { section_id: string; section_title: string; total_answers: number; correct_answers: number }[];
  byDepartment: { department: string; submissions: number; avg_ratio: number }[];
  weakestQuestions: { question_id: string; section_title: string; total_answers: number; correct_answers: number }[];
  recent: { employee_name: string; department: string; score: number; total: number; created_at: string }[];
};

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<Results | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/results?password=${encodeURIComponent(password)}`);
      if (!res.ok) throw new Error("No autorizado");
      const json = await res.json();
      setData(json);
    } catch {
      setError("Contraseña incorrecta");
    } finally {
      setLoading(false);
    }
  }

  if (!data) {
    return (
      <div style={{ maxWidth: 420, margin: "80px auto", padding: 20 }}>
        <h2 style={{ color: BRAND_GREEN }}>Panel de resultados</h2>
        <input
          type="password"
          placeholder="Contraseña del panel"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          onKeyDown={(e) => e.key === "Enter" && load()}
        />
        <button
          onClick={load}
          disabled={loading}
          style={{
            marginTop: 12,
            background: BRAND_GREEN,
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 80px" }}>
      <h1 style={{ color: BRAND_GREEN }}>Panel de resultados — dónde reforzar</h1>
      <p style={{ color: "#556" }}>
        {data.overall.total_submissions} cuestionarios respondidos · promedio general{" "}
        {Math.round((data.overall.avg_ratio || 0) * 100)}%
      </p>

      <Card title="Procesos con más errores (por sección)">
        {data.bySection.map((s) => {
          const pct = Math.round((s.correct_answers / s.total_answers) * 100);
          return <BarRow key={s.section_id} label={s.section_title} pct={pct} />;
        })}
      </Card>

      <Card title="Departamentos con más errores">
        {data.byDepartment.map((d) => (
          <BarRow
            key={d.department}
            label={`${d.department} (${d.submissions} resp.)`}
            pct={Math.round((d.avg_ratio || 0) * 100)}
          />
        ))}
      </Card>

      <Card title="Preguntas específicas más falladas">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#667" }}>
              <th style={{ padding: 6 }}>Pregunta</th>
              <th style={{ padding: 6 }}>Sección</th>
              <th style={{ padding: 6 }}>% acierto</th>
            </tr>
          </thead>
          <tbody>
            {data.weakestQuestions.map((q) => (
              <tr key={q.question_id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 6 }}>{q.question_id}</td>
                <td style={{ padding: 6 }}>{q.section_title}</td>
                <td style={{ padding: 6 }}>
                  {Math.round((q.correct_answers / q.total_answers) * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card title="Respuestas recientes">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#667" }}>
              <th style={{ padding: 6 }}>Empleado</th>
              <th style={{ padding: 6 }}>Departamento</th>
              <th style={{ padding: 6 }}>Nota</th>
              <th style={{ padding: 6 }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {data.recent.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 6 }}>{r.employee_name}</td>
                <td style={{ padding: 6 }}>{r.department}</td>
                <td style={{ padding: 6 }}>
                  {r.score}/{r.total}
                </td>
                <td style={{ padding: 6 }}>
                  {new Date(r.created_at).toLocaleString("es-SV")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        padding: 24,
        marginTop: 20,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ marginTop: 0, color: BRAND_GREEN }}>{title}</h3>
      {children}
    </div>
  );
}

function BarRow({ label, pct }: { label: string; pct: number }) {
  const color = pct >= 80 ? "#1B5E3F" : pct >= 60 ? "#F2A93B" : "#D0483C";
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ background: "#eee", borderRadius: 6, height: 10 }}>
        <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: 6 }} />
      </div>
    </div>
  );
}
