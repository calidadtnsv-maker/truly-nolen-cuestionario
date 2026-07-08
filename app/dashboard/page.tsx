"use client";

import { useState, useEffect } from "react";
import { ALL_QUESTIONS, SECTIONS } from "@/lib/questions";

const BRAND_RED = "#E30613";
const BRAND_YELLOW = "#FFD62B";
const BRAND_BLACK = "#111111";
const GOOD = "#1B7A3D";
const MID = "#C9A400";
const BAD = "#E30613";

const DEPARTMENT_COLORS: Record<string, string> = {
  "Planificación": "#1F4E9C",
  "Operaciones": "#2E9E4F",
  "Coordinación": "#F5821F",
  "Facturación / Admin": "#E53935",
  "Campo": "#757575",
  "Ventas / Contratos": "#C2185B",
};
function deptColor(name: string) {
  return DEPARTMENT_COLORS[name] || "#555555";
}

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

// ---- Lógica compartida: refuerzos por evaluación individual ----
function buildUserReinforcement(answers: any[]) {
  const bySection: Record<string, { title: string; correct: number; total: number }> = {};
  for (const a of answers) {
    const q = ALL_QUESTIONS.find((qq) => qq.id === a.question_id);
    if (!q) continue;
    if (!bySection[q.sectionId]) bySection[q.sectionId] = { title: q.sectionTitle, correct: 0, total: 0 };
    bySection[q.sectionId].total += 1;
    if (a.is_correct) bySection[q.sectionId].correct += 1;
  }
  const tips: Record<string, string> = {};
  SECTIONS.forEach((s) => (tips[s.id] = s.tip));
  return Object.entries(bySection)
    .filter(([, v]) => v.correct < v.total)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .map(([id, v]) => ({
      sectionId: id,
      sectionTitle: v.title,
      correct: v.correct,
      total: v.total,
      tip: tips[id] || "Repasar este proceso en el manual.",
    }));
}

// PDF individual con formato fluido (espejo del modal): sin tablas que se desborden.
function pdfSafe(s: string) {
  // La fuente interna del PDF no soporta flechas ni algunos símbolos: los convertimos.
  return s
    .replace(/→/g, "->")
    .replace(/·/g, "-")
    .replace(/—/g, "-")
    .replace(/[⭐😞✅❌📚⠿]/g, "");
}

async function generateEvaluationPdf(detail: any) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const maxW = 180;
  let y = 18;

  function ensureSpace(needed: number) {
    if (y + needed > pageH - 15) {
      doc.addPage();
      y = 18;
    }
  }
  function writeWrapped(text: string, size: number, opts: { bold?: boolean; color?: [number, number, number]; indent?: number } = {}) {
    doc.setFontSize(size);
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setTextColor(...(opts.color || [17, 17, 17]));
    const lines = doc.splitTextToSize(pdfSafe(text), maxW - (opts.indent || 0));
    const lineH = size * 0.45;
    for (const line of lines) {
      ensureSpace(lineH + 2);
      doc.text(line, marginX + (opts.indent || 0), y);
      y += lineH + 1.5;
    }
  }

  const sub = detail.submission;
  writeWrapped("Evaluación individual - Cuestionario de Procesos", 15, { bold: true });
  y += 1;
  writeWrapped(`${sub.employee_name} - ${sub.department}`, 12, { bold: true });
  writeWrapped(
    `Nota: ${sub.score}/${sub.total} (${Math.round((sub.score / sub.total) * 100)}%) - ${new Date(sub.created_at).toLocaleString("es-SV")}`,
    10,
    { color: [90, 90, 90] }
  );
  y += 4;

  // Puntos de mejora
  const reinforce = buildUserReinforcement(detail.answers);
  writeWrapped("Puntos de mejora recomendados", 13, { bold: true });
  y += 1;
  if (reinforce.length === 0) {
    writeWrapped("Respondió todo correctamente - sin puntos de mejora.", 10, { color: [27, 122, 61], bold: true });
  } else {
    for (const r of reinforce) {
      writeWrapped(`${r.sectionTitle} (${r.correct}/${r.total} correctas)`, 11, { bold: true, color: [227, 6, 19] });
      writeWrapped(r.tip, 10, { indent: 4 });
      y += 2;
    }
  }
  y += 4;

  // Preguntas: falladas primero
  const sorted = detail.answers.slice().sort((a: any, b: any) => Number(a.is_correct) - Number(b.is_correct));
  const failedCount = sorted.filter((a: any) => !a.is_correct).length;
  writeWrapped(`Detalle de respuestas (${failedCount} falladas de ${detail.answers.length})`, 13, { bold: true });
  y += 2;

  for (const a of sorted) {
    const q: any = ALL_QUESTIONS.find((qq) => qq.id === a.question_id);
    if (!q) continue;
    const answerData = typeof a.answer_data === "string" ? JSON.parse(a.answer_data) : a.answer_data;

    ensureSpace(14);
    writeWrapped(`${a.is_correct ? "[CORRECTA]" : "[FALLADA]"} ${q.text}`, 11, {
      bold: true,
      color: a.is_correct ? [27, 122, 61] : [227, 6, 19],
    });

    if (q.type === "mc") {
      const given = answerData && answerData.selectedIndex != null ? q.options[answerData.selectedIndex] : "Sin respuesta";
      writeWrapped(`Su respuesta: ${given}`, 10, { indent: 4 });
      if (!a.is_correct) {
        writeWrapped(`Respuesta correcta: ${q.options[q.correctIndex]}`, 10, { indent: 4, color: [27, 122, 61] });
      }
    } else {
      if (answerData && answerData.order) {
        writeWrapped("Su orden:", 10, { indent: 4, bold: true });
        answerData.order.forEach((stepIdx: number, i: number) => {
          writeWrapped(`${i + 1}. ${q.steps[stepIdx]}`, 10, { indent: 8 });
        });
      } else {
        writeWrapped("Su orden: sin respuesta", 10, { indent: 4 });
      }
      if (!a.is_correct) {
        writeWrapped("Orden correcto:", 10, { indent: 4, bold: true, color: [27, 122, 61] });
        q.steps.forEach((step: string, i: number) => {
          writeWrapped(`${i + 1}. ${step}`, 10, { indent: 8, color: [27, 122, 61] });
        });
      }
    }
    y += 3;
  }

  doc.save(`evaluacion-${sub.employee_name.replace(/\s+/g, "-")}-${sub.id}.pdf`);
}

export default function Dashboard() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<Results | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewingId, setViewingId] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/results?password=${encodeURIComponent(password)}&t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("No autorizado");
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
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
      // Quitarla de la vista de inmediato, sin esperar la recarga
      setData((prev) =>
        prev
          ? {
              ...prev,
              recent: prev.recent.filter((r) => r.id !== id),
              allSubmissions: prev.allSubmissions.filter((r) => r.id !== id),
            }
          : prev
      );
      load();
    } catch {
      alert("No se pudo borrar la respuesta.");
    }
  }

  async function fetchSubmissionDetail(id: number) {
    const res = await fetch(`/api/submission?id=${id}&password=${encodeURIComponent(password)}&t=${Date.now()}`, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("error");
    return res.json();
  }

  async function downloadUserPdf(row: SubmissionRow) {
    setDownloadingId(row.id);
    try {
      const detail = await fetchSubmissionDetail(row.id);
      if (!detail || !detail.submission || !Array.isArray(detail.answers)) {
        alert("Esta evaluación ya no existe — probablemente fue borrada. Dale a Actualizar para refrescar el listado.");
        return;
      }
      await generateEvaluationPdf(detail);
    } catch {
      alert("No se pudo generar el PDF de esta evaluación.");
    } finally {
      setDownloadingId(null);
    }
  }

  async function downloadPdf() {
    if (!data) return;
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Cuestionario de Procesos - Truly Nolen", 14, 18);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado: ${new Date().toLocaleString("es-SV")}`, 14, 24);
    doc.text(
      `${data.overall.total_submissions} cuestionarios respondidos - promedio general ${Math.round((data.overall.avg_ratio || 0) * 100)}%`,
      14,
      30
    );

    // Agrupar evaluaciones por departamento
    const byDept: Record<string, SubmissionRow[]> = {};
    for (const r of data.allSubmissions) {
      if (!byDept[r.department]) byDept[r.department] = [];
      byDept[r.department].push(r);
    }

    let y = 38;
    for (const [dept, rows] of Object.entries(byDept)) {
      const avg = Math.round((rows.reduce((s, r) => s + r.score / r.total, 0) / rows.length) * 100);
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`${dept} - promedio ${avg}% (${rows.length} evaluaciones)`, 14, y);
      autoTable(doc, {
        startY: y + 3,
        head: [["Empleado", "Nota", "%", "Fecha"]],
        body: rows.map((r) => [
          r.employee_name,
          `${r.score}/${r.total}`,
          `${Math.round((r.score / r.total) * 100)}%`,
          new Date(r.created_at).toLocaleString("es-SV"),
        ]),
        headStyles: { fillColor: [227, 6, 19] },
        styles: { fontSize: 9 },
        margin: { left: 14, right: 14 },
      });
      y = (doc as any).lastAutoTable.finalY + 12;
    }

    doc.save(`respuestas-por-departamento-${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "white", borderRadius: 16, padding: 40, maxWidth: 400, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", borderTop: `5px solid ${BRAND_RED}` }}>
          <img src="/logo.png" alt="Truly Nolen" style={{ height: 90, display: "block", margin: "0 auto 20px" }} />
          <h2 style={{ color: BRAND_BLACK, fontWeight: 700, textAlign: "center", marginTop: 0 }}>Panel de resultados</h2>
          <input
            type="password"
            placeholder="Contraseña del panel"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", boxSizing: "border-box", fontSize: 15 }}
            onKeyDown={(e) => e.key === "Enter" && load()}
          />
          <button
            onClick={load}
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
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 20px 80px" }}>
      {/* Encabezado */}
      <div style={{ background: "white", borderRadius: 16, padding: "24px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderTop: `5px solid ${BRAND_RED}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src="/logo.png" alt="Truly Nolen" style={{ height: 80, display: "block" }} />
          <div>
            <h1 style={{ color: BRAND_BLACK, fontWeight: 700, margin: 0, fontSize: 24 }}>Panel de resultados</h1>
            <p style={{ color: "#667", margin: "4px 0 0", fontSize: 14 }}>
              {data.overall.total_submissions} cuestionarios · promedio general{" "}
              <strong style={{ color: BRAND_BLACK }}>{Math.round((data.overall.avg_ratio || 0) * 100)}%</strong>
              {lastUpdated && <span style={{ color: "#99a" }}> · actualizado {lastUpdated.toLocaleTimeString("es-SV")}</span>}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={load} disabled={loading} style={refreshBtnStyle}>{loading ? "Actualizando..." : "🔄 Actualizar"}</button>
          <button onClick={downloadPdf} style={pdfBtnStyle}>⬇ PDF por departamentos</button>
        </div>
      </div>

      <Card title="1 · Preguntas con más errores" icon="⚠️">
        {data.weakestQuestions.length === 0 ? (
          <p style={{ fontSize: 14, color: "#556" }}>Ninguna pregunta tiene errores todavía. 🎉</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={theadRow}>
                <th style={thStyle}>Pregunta</th>
                <th style={thStyle}>Sección</th>
                <th style={thStyle}>% acierto general</th>
                <th style={thStyle}>Departamento que más falla</th>
              </tr>
            </thead>
            <tbody>
              {data.weakestQuestions.map((q) => (
                <tr key={q.question_id} style={{ borderTop: "1px solid #f0f0f0" }}>
                  <td style={tdStyle}>{q.question_id}</td>
                  <td style={tdStyle}>{q.section_title}</td>
                  <td style={tdStyle}>
                    <PctPill pct={Math.round((q.correct_answers / q.total_answers) * 100)} /> ({q.correct_answers}/{q.total_answers})
                  </td>
                  <td style={{ ...tdStyle, color: BRAND_RED, fontWeight: 700 }}>
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

      <Card title="2 · Ranking por departamento" icon="🏢">
        <VerticalBarChart
          bars={data.byDepartment.map((d) => ({
            label: d.department,
            pct: Math.round((d.avg_ratio || 0) * 100),
            sub: `${d.submissions} resp.`,
            color: deptColor(d.department),
          }))}
        />
        <p style={{ fontSize: 13, color: "#667", marginTop: 24, marginBottom: 8, fontWeight: 700 }}>Procesos más débiles por departamento</p>
        {Object.entries(groupByDept(data.byDepartmentSection)).map(([dep, rows]) => (
          <div key={dep} style={{ marginBottom: 16, background: "#fafafa", borderRadius: 10, padding: "12px 16px", borderLeft: `4px solid ${deptColor(dep)}` }}>
            <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 6px", color: deptColor(dep) }}>{dep}</p>
            <VerticalBarChart
              small
              bars={rows.slice(0, 3).map((row) => ({ label: row.section_title, pct: Math.round((row.correct_answers / row.total_answers) * 100) }))}
            />
          </div>
        ))}
      </Card>

      <div style={{ position: "relative" }}>
        <Card title="3 · Ranking por usuario — Top 10" icon="">
          <RankTable rows={data.topPerformers} highlight="green" />
        </Card>
        <span style={badgeStyle}>⭐</span>
      </div>

      <div style={{ position: "relative" }}>
        <Card title="3 · Ranking por usuario — Bottom 10" icon="">
          <RankTable rows={data.bottomPerformers} highlight="red" />
        </Card>
        <span style={badgeStyle}>😞</span>
      </div>

      <Card title="4 · Top 10 — Consejos de reentrenamiento" icon="📚">
        {data.reinforcementRanking.length === 0 ? (
          <p style={{ color: "#556", fontSize: 14 }}>Ningún proceso está por debajo del 100%. 🎉</p>
        ) : (
          data.reinforcementRanking.map((t, i) => (
            <div key={t.sectionId} style={tipBox}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: BRAND_BLACK, fontSize: 14 }}>
                <span>{i + 1}. {t.sectionTitle}</span>
                <PctPill pct={Math.round(t.accuracy * 100)} />
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#334" }}>{t.tip}</p>
            </div>
          ))
        )}
      </Card>

      <Card title="5 · Respuestas recientes" icon="🕘">
        <table style={tableStyle}>
          <thead>
            <tr style={theadRow}>
              <th style={thStyle}>Empleado</th>
              <th style={thStyle}>Departamento</th>
              <th style={thStyle}>Nota</th>
              <th style={thStyle}>Fecha</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {data.recent.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid #f0f0f0" }}>
                <td style={tdStyle}>{r.employee_name}</td>
                <td style={tdStyle}><DeptTag name={r.department} /></td>
                <td style={tdStyle}>{r.score}/{r.total}</td>
                <td style={tdStyle}>{new Date(r.created_at).toLocaleString("es-SV")}</td>
                <td style={tdStyle}>
                  <button onClick={() => deleteSubmission(r.id)} style={deleteBtnStyle}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card title="6 · Evaluaciones por usuario" icon="👤">
        <table style={tableStyle}>
          <thead>
            <tr style={theadRow}>
              <th style={thStyle}>Empleado</th>
              <th style={thStyle}>Departamento</th>
              <th style={thStyle}>Nota</th>
              <th style={thStyle}>Fecha</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {data.allSubmissions.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid #f0f0f0" }}>
                <td style={tdStyle}>{r.employee_name}</td>
                <td style={tdStyle}><DeptTag name={r.department} /></td>
                <td style={tdStyle}>{r.score}/{r.total} ({Math.round((r.score / r.total) * 100)}%)</td>
                <td style={tdStyle}>{new Date(r.created_at).toLocaleString("es-SV")}</td>
                <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                  <button onClick={() => setViewingId(r.id)} style={viewBtnStyle}>Ver evaluación</button>{" "}
                  <button onClick={() => downloadUserPdf(r)} disabled={downloadingId === r.id} style={userPdfBtnStyle}>
                    {downloadingId === r.id ? "Generando..." : "⬇ PDF"}
                  </button>
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
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/submission?id=${id}&password=${encodeURIComponent(password)}&t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        // Si la evaluación ya no existe (fue borrada), no la tratamos como detalle válido
        if (json && json.submission && Array.isArray(json.answers)) {
          setDetail(json);
        } else {
          setDetail(null);
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id, password]);

  const reinforce = detail ? buildUserReinforcement(detail.answers) : [];
  const failedAnswers = detail ? detail.answers.filter((a: any) => !a.is_correct) : [];

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontWeight: 700, color: BRAND_BLACK }}>
            {detail ? `${detail.submission.employee_name} — ${detail.submission.department}` : "Cargando..."}
          </h3>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {detail && (
              <button onClick={() => generateEvaluationPdf(detail)} style={modalPdfBtnStyle}>⬇ Descargar PDF</button>
            )}
            <button onClick={onClose} style={closeBtnStyle}>✕</button>
          </div>
        </div>
        {loading && <p>Cargando evaluación...</p>}
        {!loading && notFound && (
          <p style={{ color: "#556" }}>
            Esta evaluación ya no existe — probablemente fue borrada. Dale a "🔄 Actualizar" en el panel para refrescar el listado.
          </p>
        )}
        {detail && (
          <>
            <p style={{ fontSize: 14, color: "#556", marginTop: 0 }}>
              Nota: <strong>{detail.submission.score}/{detail.submission.total}</strong> ·{" "}
              {new Date(detail.submission.created_at).toLocaleString("es-SV")}
            </p>

            {/* Puntos de mejora del usuario */}
            <div style={{ background: "#fffbe8", border: `1px solid ${BRAND_YELLOW}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <p style={{ fontWeight: 700, margin: "0 0 8px", fontSize: 14 }}>📚 Puntos de mejora recomendados</p>
              {reinforce.length === 0 ? (
                <p style={{ margin: 0, fontSize: 13, color: GOOD, fontWeight: 700 }}>Respondió todo correctamente — sin puntos de mejora.</p>
              ) : (
                reinforce.map((r) => (
                  <div key={r.sectionId} style={{ marginBottom: 8 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>
                      {r.sectionTitle} <span style={{ color: BRAND_RED }}>({r.correct}/{r.total} correctas)</span>
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: 13, color: "#334" }}>{r.tip}</p>
                  </div>
                ))
              )}
            </div>

            {/* Preguntas falladas primero */}
            {failedAnswers.length > 0 && (
              <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 8px", color: BRAND_RED }}>
                ❌ Preguntas falladas ({failedAnswers.length})
              </p>
            )}
            {detail.answers
              .slice()
              .sort((a: any, b: any) => Number(a.is_correct) - Number(b.is_correct))
              .map((a: any) => {
                const q: any = ALL_QUESTIONS.find((qq) => qq.id === a.question_id);
                if (!q) return null;
                const answerData = typeof a.answer_data === "string" ? JSON.parse(a.answer_data) : a.answer_data;
                return (
                  <div key={a.question_id} style={{ ...questionDetailBox, borderColor: a.is_correct ? "#cde8d4" : "#f3bcbc", background: a.is_correct ? "#fbfefb" : "#fffafa" }}>
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

function Card({ title, icon, children }: { title: string; icon?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: 28, marginTop: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <h3 style={{ marginTop: 0, marginBottom: 18, color: BRAND_BLACK, fontWeight: 700, fontSize: 17, display: "flex", alignItems: "center", gap: 8 }}>
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
}

function PctPill({ pct }: { pct: number }) {
  const color = pct >= 80 ? GOOD : pct >= 60 ? MID : BAD;
  return (
    <span style={{ background: color, color: "white", borderRadius: 12, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>
      {pct}%
    </span>
  );
}

function DeptTag({ name }: { name: string }) {
  const color = deptColor(name);
  return (
    <span style={{ borderLeft: `3px solid ${color}`, paddingLeft: 8, color: "#334" }}>{name}</span>
  );
}

function VerticalBarChart({ bars, small }: { bars: { label: string; pct: number; sub?: string; color?: string }[]; small?: boolean }) {
  const trackHeight = small ? 80 : 140;
  const colWidth = small ? 72 : 92;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, overflowX: "auto", paddingTop: 24 }}>
      {bars.map((b) => {
        const color = b.color || (b.pct >= 80 ? GOOD : b.pct >= 60 ? MID : BAD);
        return (
          <div key={b.label} style={{ width: colWidth, flexShrink: 0 }}>
            <div style={{ position: "relative", height: trackHeight, width: small ? 28 : 40, margin: "0 auto", background: "#f0f0f0", borderRadius: 6 }}>
              <span style={{ position: "absolute", top: -22, left: -30, right: -30, textAlign: "center", fontSize: small ? 11 : 13, fontWeight: 700 }}>
                {b.pct}%
              </span>
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: `${b.pct}%`, background: color, borderRadius: 6, transition: "height 0.4s" }} />
            </div>
            <div style={{ minHeight: small ? 28 : 32, marginTop: 8, fontSize: small ? 10 : 12, textAlign: "center", color: "#445", lineHeight: 1.3 }}>
              {b.label}
            </div>
            {b.sub && <div style={{ fontSize: 10, color: "#889", textAlign: "center" }}>{b.sub}</div>}
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
    <table style={tableStyle}>
      <thead>
        <tr style={theadRow}>
          <th style={thStyle}>#</th>
          <th style={thStyle}>Empleado</th>
          <th style={thStyle}>Departamento</th>
          <th style={thStyle}>Promedio</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((p, i) => (
          <tr key={p.employee_name} style={{ borderTop: "1px solid #f0f0f0" }}>
            <td style={tdStyle}>{i + 1}</td>
            <td style={tdStyle}>{p.employee_name}</td>
            <td style={tdStyle}><DeptTag name={p.department} /></td>
            <td style={{ ...tdStyle, fontWeight: 700, color }}>{Math.round((p.avg_ratio || 0) * 100)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", fontSize: 14 };
const theadRow: React.CSSProperties = { textAlign: "left", color: "#667" };
const thStyle: React.CSSProperties = { padding: "8px 6px", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.4 };
const tdStyle: React.CSSProperties = { padding: "10px 6px" };
const tipBox: React.CSSProperties = { background: "#fffbe8", border: `1px solid ${BRAND_YELLOW}`, borderRadius: 10, padding: 14, marginBottom: 10 };
const badgeStyle: React.CSSProperties = { position: "absolute", top: 24, right: 24, fontSize: 26 };
const refreshBtnStyle: React.CSSProperties = { background: "white", color: BRAND_BLACK, border: `1px solid #ccc`, borderRadius: 8, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" };
const pdfBtnStyle: React.CSSProperties = { background: BRAND_BLACK, color: "white", border: "none", borderRadius: 8, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" };
const deleteBtnStyle: React.CSSProperties = { background: "white", color: BRAND_RED, border: `1px solid ${BRAND_RED}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", fontWeight: 700 };
const viewBtnStyle: React.CSSProperties = { background: BRAND_BLACK, color: "white", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", fontWeight: 700 };
const userPdfBtnStyle: React.CSSProperties = { background: "white", color: BRAND_BLACK, border: "1px solid #ccc", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", fontWeight: 700 };
const modalPdfBtnStyle: React.CSSProperties = { background: BRAND_BLACK, color: "white", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontWeight: 700 };
const closeBtnStyle: React.CSSProperties = { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#556" };
const overlayStyle: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 };
const modalStyle: React.CSSProperties = { background: "white", borderRadius: 16, padding: 24, maxWidth: 680, width: "100%", maxHeight: "85vh", overflowY: "auto" };
const questionDetailBox: React.CSSProperties = { border: "1px solid #eee", borderRadius: 10, padding: 12, marginBottom: 10 };
