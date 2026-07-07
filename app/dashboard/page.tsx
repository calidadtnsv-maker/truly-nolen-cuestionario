"use client";

import { useState, useEffect } from "react";
import { ALL_QUESTIONS } from "@/lib/questions";

const BRAND_RED = "#FF0000";
const BRAND_YELLOW = "#FFD62B";
const BRAND_BLACK = "#000000";
const GOOD = "#1B7A3D";
const MID = "#C9A400";
const BAD = "#FF0000";

type WeakQuestion = {
  question_id: string;
  section_title: string;
  total_answers: number;
  correct_answers: number;
  weakest_department: string | null;
  weakest_department_ratio: number | null;
};
type DeptStat = { department: string; submissions: number; avg_ratio: number };
type DeptSectionStat = { department: string; section_id: string; section_title: string; total_answers: number; correct_answers: number };
type PersonStat = { employee_name: string; department: string; attempts: number; avg_ratio: number; last_attempt: string };
type TipRank = { sectionId: string; sectionTitle: string; accuracy: number; tip: string };
type SubmissionRow = { id: number; employee_name: string; department: string; score: number; total: number; created_at: string };

type Results = {
  overall: { total_submissions: number; avg_ratio: number };
  weakestQuestions: WeakQuestion[];
  byDepartment: DeptStat[];
  byDepartmentSection: DeptSectionStat[];
  topPerformers: PersonStat[];
  bottomPerformers: PersonStat[];
  reinforcementRanking: TipRank[];
  recent: SubmissionRow[];
  allSubmissions: SubmissionRow[];
};

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<Results | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewingId, setViewingId] = useState<number | null>(null);

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

  async function deleteSubmission(id: number) {
    if (!confirm("¿Borrar esta respuesta? Esta acción no se puede deshacer.")) return;
    try {
      const res = await fetch("/api/delete-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });
      if (!res.ok) throw new Error("No se pudo borrar");
      load();
    } catch {
      alert("No se pudo borrar la respuesta.");
    }
  }

  if (!data) {
    return (
      <div style={{ maxWidth: 420, margin: "80px auto", padding: 20 }}>
        <img src="/logo.jpg" alt="Truly Nolen" style={{ height: 100, display: "block", marginBottom: 20 }} />
        <h2 style={{ color: BRAND_BLACK, fontWeight: 700 }}>Panel de resultados</h2>
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
          style={{ marginTop: 12, background: BRAND_RED, color: "white", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontWeight: 700 }}
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px 80px" }}>
      <img src="/logo.jpg" alt="Truly Nolen" style={{ height: 100, display: "block", marginBottom: 16 }} />
      <h1 style={{ color: BRAND_BLACK, fontWeight: 700 }}>Panel de resultados — dónde reforzar</h1>
      <p style={{ color: "#556" }}>
        {data.overall.total_submissions} cuestionarios respondidos · promedio general{" "}
        {Math.round((data.overall.avg_ratio || 0) * 100)}%
      </p>

      <Card title="1. Preguntas con más errores">
        {data.weakestQuestions.length === 0 ? (
          <p style={{ fontSize: 14, color: "#556" }}>Ninguna pregunta tiene errores todavía. 🎉</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#667" }}>
                <th style={{ padding: 6 }}>Pregunta</th>
                <th style={{ padding: 6 }}>Sección</th>
                <th style={{ padding: 6 }}>% acierto general</th>
                <th style={{ padding: 6 }}>Departamento que más falla</th>
              </tr>
            </thead>
            <tbody>
              {data.weakestQuestions.map((q) => (
                <tr key={q.question_id} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: 6 }}>{q.question_id}</td>
                  <td style={{ padding: 6 }}>{q.section_title}</td>
                  <td style={{ padding: 6 }}>{Math.round((q.correct_answers / q.total_answers) * 100)}%</td>
                  <td style={{ padding: 6, color: BRAND_RED }}>
                    {q.weakest_department
                      ? `${q.weakest_department} (${Math.round((q.weakest_department_ratio || 0) * 100)}%)`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card title="2. Ranking por departamento">
        <VerticalBarChart
          bars={data.byDepartment.map((d) => ({ label: d.department, pct: Math.round((d.avg_ratio || 0) * 100), sub: `${d.submissions} resp.` }))}
        />
        <p style={{ fontSize: 13, color: "#667", marginTop: 20, marginBottom: 8 }}>Procesos más débiles por departamento:</p>
        {Object.entries(groupByDept(data.byDepartmentSection)).map(([dep, rows]) => (
          <div key={dep} style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 6px" }}>{dep}</p>
            <VerticalBarChart
              small
              bars={rows.slice(0, 3).map((row) => ({ label: row.section_title, pct: Math.round((row.correct_answers / row.total_answers) * 100) }))}
            />
          </div>
        ))}
      </Card>

      <div style={{ position: "relative" }}>
        <Card title="3. Ranking por usuario — Top 10">
          <RankTable rows={data.topPerformers} highlight="green" />
        </Card>
        <span style={badgeStyle}>⭐</span>
      </div>

      <div style={{ position: "relative" }}>
        <Card title="3. Ranking por usuario — Bottom 10">
          <RankTable rows={data.bottomPerformers} highlight="red" />
        </Card>
        <span style={badgeStyle}>😞</span>
      </div>

      <Card title="4. Top 10 — Consejos de reentrenamiento">
        {data.reinforcementRanking.length === 0 ? (
          <p style={{ color: "#556", fontSize: 14 }}>Ningún proceso está por debajo del 100%. 🎉</p>
        ) : (
          data.reinforcementRanking.map((t, i) => (
            <div key={t.sectionId} style={tipBox}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: BRAND_RED, fontSize: 14 }}>
                <span>{i + 1}. {t.sectionTitle}</span>
                <span>{Math.round(t.accuracy * 100)}% de acierto</span>
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#334" }}>{t.tip}</p>
            </div>
          ))
        )}
      </Card>

      <Card title="5. Respuestas recientes">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#667" }}>
              <th style={{ padding: 6 }}>Empleado</th>
              <th style={{ padding: 6 }}>Departamento</th>
              <th style={{ padding: 6 }}>Nota</th>
              <th style={{ padding: 6 }}>Fecha</th>
              <th style={{ padding: 6 }}></th>
            </tr>
          </thead>
          <tbody>
            {data.recent.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 6 }}>{r.employee_name}</td>
                <td style={{ padding: 6 }}>{r.department}</td>
                <td style={{ padding: 6 }}>{r.score}/{r.total}</td>
                <td style={{ padding: 6 }}>{new Date(r.created_at).toLocaleString("es-SV")}</td>
                <td style={{ padding: 6 }}>
                  <button onClick={() => deleteSubmission(r.id)} style={deleteBtnStyle}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card title="6. Evaluaciones por usuario">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#667" }}>
              <th style={{ padding: 6 }}>Empleado</th>
              <th style={{ padding: 6 }}>Departamento</th>
              <th style={{ padding: 6 }}>Nota</th>
              <th style={{ padding: 6 }}>Fecha</th>
              <th style={{ padding: 6 }}></th>
            </tr>
          </thead>
          <tbody>
            {data.allSubmissions.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 6 }}>{r.employee_name}</td>
                <td style={{ padding: 6 }}>{r.department}</td>
                <td style={{ padding: 6 }}>{r.score}/{r.total} ({Math.round((r.score / r.total) * 100)}%)</td>
                <td style={{ padding: 6 }}>{new Date(r.created_at).toLocaleString("es-SV")}</td>
                <td style={{ padding: 6 }}>
                  <button onClick={() => setViewingId(r.id)} style={viewBtnStyle}>Ver evaluación</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {viewingId !== null && (
        <SubmissionDetailModal id={viewingId} password={password} onClose={() => setViewingId(null)} />
      )}
    </div>
  );
}

function SubmissionDetailModal({ id, password, onClose }: { id: number; password: string; onClose: () => void }) {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/submission?id=${id}&password=${encodeURIComponent(password)}`)
      .then((r) => r.json())
      .then((json) => {
        setDetail(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, password]);

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontWeight: 700, color: BRAND_BLACK }}>
            {detail ? `${detail.submission.employee_name} — ${detail.submission.department}` : "Cargando..."}
          </h3>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>
        {loading && <p>Cargando evaluación...</p>}
        {detail && (
          <>
            <p style={{ fontSize: 14, color: "#556", marginTop: 0 }}>
              Nota: <strong>{detail.submission.score}/{detail.submission.total}</strong> ·{" "}
              {new Date(detail.submission.created_at).toLocaleString("es-SV")}
            </p>
            {detail.answers.map((a: any) => {
              const q: any = ALL_QUESTIONS.find((qq) => qq.id === a.question_id);
              if (!q) return null;
              const answerData = typeof a.answer_data === "string" ? JSON.parse(a.answer_data) : a.answer_data;
              return (
                <div key={a.question_id} style={{ ...questionDetailBox, borderColor: a.is_correct ? "#bfe3c9" : "#f3bcbc" }}>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 8px" }}>
                    {a.is_correct ? "✅" : "❌"} {q.text}
                  </p>
                  {q.type === "mc" ? (
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13 }}>
                      {q.options.map((opt: string, oi: number) => {
                        const isSelected = answerData?.selectedIndex === oi;
                        const isCorrectOpt = q.correctIndex === oi;
                        return (
                          <li
                            key={oi}
                            style={{
                              color: isCorrectOpt ? GOOD : isSelected ? BAD : "#334",
                              fontWeight: isSelected || isCorrectOpt ? 700 : 400,
                            }}
                          >
                            {opt} {isCorrectOpt ? "(correcta)" : ""} {isSelected && !isCorrectOpt ? "(su respuesta)" : ""}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div style={{ fontSize: 13 }}>
                      <p style={{ margin: "4px 0" }}><strong>Su orden:</strong></p>
                      <ol style={{ margin: "0 0 8px", paddingLeft: 18 }}>
                        {(answerData?.order || []).map((stepIdx: number, i: number) => (
                          <li key={i}>{q.steps[stepIdx]}</li>
                        ))}
                      </ol>
                      <p style={{ margin: "4px 0" }}><strong>Orden correcto:</strong></p>
                      <ol style={{ margin: 0, paddingLeft: 18, color: GOOD }}>
                        {q.steps.map((step: string, i: number) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

function groupByDept(rows: DeptSectionStat[]) {
  const map: Record<string, DeptSectionStat[]> = {};
  for (const row of rows) {
    if (!map[row.department]) map[row.department] = [];
    map[row.department].push(row);
  }
  return map;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: 24, marginTop: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      <h3 style={{ marginTop: 0, color: BRAND_BLACK, fontWeight: 700 }}>{title}</h3>
      {children}
    </div>
  );
}

function VerticalBarChart({ bars, small }: { bars: { label: string; pct: number; sub?: string }[]; small?: boolean }) {
  const height = small ? 80 : 140;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: height + 50, overflowX: "auto", paddingTop: 8 }}>
      {bars.map((b) => {
        const color = b.pct >= 80 ? GOOD : b.pct >= 60 ? MID : BAD;
        return (
          <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: small ? 60 : 80 }}>
            <span style={{ fontSize: small ? 11 : 13, fontWeight: 700, marginBottom: 4 }}>{b.pct}%</span>
            <div style={{ width: small ? 28 : 40, height, display: "flex", alignItems: "flex-end", background: "#f0f0f0", borderRadius: 4 }}>
              <div style={{ width: "100%", height: `${b.pct}%`, background: color, borderRadius: 4 }} />
            </div>
            <span style={{ fontSize: small ? 10 : 12, textAlign: "center", marginTop: 6, maxWidth: small ? 70 : 90, color: "#445" }}>
              {b.label}
            </span>
            {b.sub && <span style={{ fontSize: 10, color: "#889" }}>{b.sub}</span>}
          </div>
        );
      })}
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

const tipBox: React.CSSProperties = { background: "#fffbe8", border: `1px solid ${BRAND_YELLOW}`, borderRadius: 8, padding: 14, marginBottom: 10 };
const badgeStyle: React.CSSProperties = { position: "absolute", top: 16, right: 16, fontSize: 26 };
const deleteBtnStyle: React.CSSProperties = { background: "white", color: BRAND_RED, border: `1px solid ${BRAND_RED}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", fontWeight: 700 };
const viewBtnStyle: React.CSSProperties = { background: BRAND_BLACK, color: "white", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", fontWeight: 700 };
const closeBtnStyle: React.CSSProperties = { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#556" };
const overlayStyle: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 };
const modalStyle: React.CSSProperties = { background: "white", borderRadius: 12, padding: 24, maxWidth: 640, width: "100%", maxHeight: "85vh", overflowY: "auto" };
const questionDetailBox: React.CSSProperties = { border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 10 };
