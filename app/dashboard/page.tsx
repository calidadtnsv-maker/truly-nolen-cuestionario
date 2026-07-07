"use client";

import { useState, useMemo } from "react";

const BRAND_RED = "#FF0000";
const BRAND_YELLOW = "#FFD62B";
const BRAND_BLACK = "#000000";
// Semáforo funcional para % de acierto (no son colores de marca, son indicadores)
const GOOD = "#1B7A3D";
const MID = "#FFD62B";
const BAD = "#FF0000";

type SectionStat = { section_id: string; section_title: string; total_answers: number; correct_answers: number };
type DeptStat = { department: string; submissions: number; avg_ratio: number };
type DeptSectionStat = { department: string; section_id: string; section_title: string; total_answers: number; correct_answers: number };
type PersonStat = { employee_name: string; department: string; attempts: number; avg_ratio: number; last_attempt: string };
type Tip = { sectionId: string; sectionTitle: string; accuracy: number; tip: string };

type Results = {
  overall: { total_submissions: number; avg_ratio: number };
  bySection: SectionStat[];
  byDepartment: DeptStat[];
  byDepartmentSection: DeptSectionStat[];
  byPerson: PersonStat[];
  topPerformers: PersonStat[];
  bottomPerformers: PersonStat[];
  weakestQuestions: { question_id: string; section_title: string; total_answers: number; correct_answers: number }[];
  reinforcementTips: Tip[];
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

  const departmentOpportunities = useMemo(() => {
    if (!data) return {};
    const map: Record<string, DeptSectionStat[]> = {};
    for (const row of data.byDepartmentSection) {
      if (!map[row.department]) map[row.department] = [];
      map[row.department].push(row);
    }
    // Ya vienen ordenadas por acierto ascendente desde la API; nos quedamos con las 2 más débiles
    Object.keys(map).forEach((dep) => {
      map[dep] = map[dep].slice(0, 2);
    });
    return map;
  }, [data]);

  if (!data) {
    return (
      <div style={{ maxWidth: 420, margin: "80px auto", padding: 20 }}>
        <h2 style={{ color: BRAND_BLACK }}>Panel de resultados</h2>
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
          style={{ marginTop: 12, background: BRAND_RED, color: "white", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer" }}
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px 80px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.jpg" alt="Truly Nolen" style={{ height: 56, display: "block", marginBottom: 16 }} />
      <h1 style={{ color: BRAND_BLACK }}>Panel de resultados — dónde reforzar</h1>
      <p style={{ color: "#556" }}>
        {data.overall.total_submissions} cuestionarios respondidos · promedio general{" "}
        {Math.round((data.overall.avg_ratio || 0) * 100)}%
      </p>

      <Card title="Consejos de reentrenamiento">
        {data.reinforcementTips.length === 0 ? (
          <p style={{ color: "#556", fontSize: 14 }}>
            Ningún proceso está por debajo del 70% de acierto general. Sin focos rojos por ahora.
          </p>
        ) : (
          data.reinforcementTips.map((t) => (
            <div key={t.sectionId} style={tipBox}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: BRAND_RED, fontSize: 14 }}>
                <span>{t.sectionTitle}</span>
                <span>{Math.round(t.accuracy * 100)}% de acierto</span>
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#334" }}>{t.tip}</p>
            </div>
          ))
        )}
      </Card>

      <Card title="Oportunidades de mejora — general (por proceso)">
        {data.bySection.map((s) => (
          <BarRow key={s.section_id} label={s.section_title} pct={Math.round((s.correct_answers / s.total_answers) * 100)} />
        ))}
      </Card>

      <Card title="Oportunidades de mejora — por departamento">
        <p style={{ fontSize: 13, color: "#667", marginTop: -8 }}>
          Nivel general y los 2 procesos más débiles de cada departamento.
        </p>
        {data.byDepartment.map((d) => (
          <div key={d.department} style={{ marginBottom: 18 }}>
            <BarRow label={`${d.department} — general (${d.submissions} resp.)`} pct={Math.round((d.avg_ratio || 0) * 100)} bold />
            {(departmentOpportunities[d.department] || []).map((row) => (
              <div key={row.section_id} style={{ paddingLeft: 16 }}>
                <BarRow
                  label={row.section_title}
                  pct={Math.round((row.correct_answers / row.total_answers) * 100)}
                  small
                />
              </div>
            ))}
          </div>
        ))}
      </Card>

      <Card title="Top calificados (general)">
        <RankTable rows={data.topPerformers} highlight="green" />
      </Card>

      <Card title="Necesitan más apoyo (general)">
        <RankTable rows={data.bottomPerformers} highlight="red" />
      </Card>

      <Card title="Resultados por persona">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#667" }}>
              <th style={{ padding: 6 }}>Empleado</th>
              <th style={{ padding: 6 }}>Departamento</th>
              <th style={{ padding: 6 }}>Intentos</th>
              <th style={{ padding: 6 }}>Promedio</th>
            </tr>
          </thead>
          <tbody>
            {data.byPerson.map((p) => (
              <tr key={p.employee_name} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 6 }}>{p.employee_name}</td>
                <td style={{ padding: 6 }}>{p.department}</td>
                <td style={{ padding: 6 }}>{p.attempts}</td>
                <td style={{ padding: 6, fontWeight: 600 }}>{Math.round((p.avg_ratio || 0) * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
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
                <td style={{ padding: 6 }}>{Math.round((q.correct_answers / q.total_answers) * 100)}%</td>
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
                <td style={{ padding: 6 }}>{r.score}/{r.total}</td>
                <td style={{ padding: 6 }}>{new Date(r.created_at).toLocaleString("es-SV")}</td>
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
    <div style={{ background: "white", borderRadius: 12, padding: 24, marginTop: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      <h3 style={{ marginTop: 0, color: BRAND_BLACK }}>{title}</h3>
      {children}
    </div>
  );
}

function BarRow({ label, pct, bold, small }: { label: string; pct: number; bold?: boolean; small?: boolean }) {
  const color = pct >= 80 ? GOOD : pct >= 60 ? MID : BAD;
  return (
    <div style={{ marginBottom: small ? 6 : 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: small ? 12 : 13, marginBottom: 4, fontWeight: bold ? 700 : 400, color: bold ? "#223" : "#445" }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ background: "#eee", borderRadius: 6, height: small ? 6 : 10 }}>
        <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: 6 }} />
      </div>
    </div>
  );
}

function RankTable({ rows, highlight }: { rows: PersonStat[]; highlight: "green" | "red" }) {
  const color = highlight === "green" ? GOOD : BAD;
  if (rows.length === 0) return <p style={{ fontSize: 14, color: "#667" }}>Sin datos suficientes todavía.</p>;
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
      <thead>
        <tr style={{ textAlign: "left", color: "#667" }}>
          <th style={{ padding: 6 }}>#</th>
          <th style={{ padding: 6 }}>Empleado</th>
          <th style={{ padding: 6 }}>Departamento</th>
          <th style={{ padding: 6 }}>Promedio</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((p, i) => (
          <tr key={p.employee_name} style={{ borderTop: "1px solid #eee" }}>
            <td style={{ padding: 6 }}>{i + 1}</td>
            <td style={{ padding: 6 }}>{p.employee_name}</td>
            <td style={{ padding: 6 }}>{p.department}</td>
            <td style={{ padding: 6, fontWeight: 700, color }}>{Math.round((p.avg_ratio || 0) * 100)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const tipBox: React.CSSProperties = {
  background: "#fffbe8",
  border: `1px solid ${BRAND_YELLOW}`,
  borderRadius: 8,
  padding: 14,
  marginBottom: 10,
};
