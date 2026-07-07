"use client";

import { useState } from "react";
import { ALL_QUESTIONS, DEPARTMENTS, Question } from "@/lib/questions";

const BRAND_RED = "#FF0000";
const BRAND_YELLOW = "#FFD62B";
const BRAND_BLACK = "#000000";

type Step = "intro" | "quiz" | "done";
type MCResponse = { type: "mc"; selectedIndex: number };
type OrderResponse = { type: "order"; order: number[] };
type ResponseValue = MCResponse | OrderResponse;
type ReinforceTip = { sectionId: string; sectionTitle: string; correct: number; total: number; tip: string };

function shuffledIndices(n: number) {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Home() {
  const [step, setStep] = useState<Step>("intro");
  const [employeeName, setEmployeeName] = useState("");
  const [department, setDepartment] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, ResponseValue>>({});
  const [orderDraft, setOrderDraft] = useState<number[] | null>(null);
  const [result, setResult] = useState<{ score: number; total: number; reinforce: ReinforceTip[] } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const q = ALL_QUESTIONS[qIndex];
  const isLast = qIndex === ALL_QUESTIONS.length - 1;

  function currentOrderDraft(question: Question & { id: string }) {
    if (orderDraft) return orderDraft;
    const existing = responses[question.id];
    if (existing && existing.type === "order") return existing.order;
    return shuffledIndices((question as any).steps.length);
  }

  function selectMC(optionIndex: number) {
    setResponses((prev) => ({ ...prev, [q.id]: { type: "mc", selectedIndex: optionIndex } }));
  }

  function confirmOrderAndNext(draft: number[]) {
    setResponses((prev) => ({ ...prev, [q.id]: { type: "order", order: draft } }));
    setOrderDraft(null);
    goNext();
  }

  function answered() {
    const r = responses[q.id];
    return !!r;
  }

  function goNext() {
    if (isLast) {
      handleFinish();
    } else {
      setQIndex((i) => i + 1);
      setOrderDraft(null);
    }
  }

  function goBack() {
    if (qIndex > 0) {
      setQIndex((i) => i - 1);
      setOrderDraft(null);
    }
  }

  async function handleFinish() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeName, department, responses }),
      });
      if (!res.ok) throw new Error("No se pudo guardar");
      const data = await res.json();
      setResult({ score: data.score, total: data.total, reinforce: data.reinforce || [] });
      setStep("done");
    } catch {
      setError("Hubo un problema al guardar tus respuestas. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "intro") {
    return (
      <Shell>
        <Logo />
        <h1 style={{ color: BRAND_BLACK, marginTop: 20 }}>Cuestionario de Procesos</h1>
        <p>
          {ALL_QUESTIONS.length} preguntas, una por pantalla, organizadas por tema del
          Manual de Procesos. Al finalizar verás tu calificación y en qué reforzar.
        </p>
        <label style={labelStyle}>Nombre o código de empleado</label>
        <input style={inputStyle} value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} placeholder="Ej. Juan Pérez" />
        <label style={labelStyle}>Departamento</label>
        <select style={inputStyle} value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Selecciona tu departamento</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <button
          style={{ ...buttonStyle, opacity: employeeName && department ? 1 : 0.5 }}
          disabled={!employeeName || !department}
          onClick={() => setStep("quiz")}
        >
          Comenzar
        </button>
      </Shell>
    );
  }

  if (step === "quiz") {
    return (
      <Shell>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: BRAND_RED, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {q.sectionTitle}
          </span>
          <span style={{ color: "#667", fontSize: 13 }}>
            {qIndex + 1} / {ALL_QUESTIONS.length}
          </span>
        </div>
        <ProgressBar current={qIndex + 1} total={ALL_QUESTIONS.length} />

        <div style={questionCard}>
          <p style={{ fontWeight: 700, fontSize: 17, marginTop: 0 }}>{q.text}</p>

          {q.type === "mc" && (
            <div>
              {q.options.map((opt, oi) => {
                const r = responses[q.id];
                const selected = r && r.type === "mc" && r.selectedIndex === oi;
                return (
                  <label
                    key={oi}
                    style={{
                      ...optionLabel,
                      background: selected ? "#fff0f0" : "transparent",
                      border: selected ? `1px solid ${BRAND_RED}` : "1px solid #e6e6e6",
                    }}
                  >
                    <input type="radio" name={q.id} checked={!!selected} onChange={() => selectMC(oi)} style={{ marginRight: 8 }} />
                    {opt}
                  </label>
                );
              })}
            </div>
          )}

          {q.type === "order" && (
            <OrderQuestionUI steps={q.steps} draft={currentOrderDraft(q)} onChange={(d) => setOrderDraft(d)} />
          )}
        </div>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          {qIndex > 0 && (
            <button style={secondaryButtonStyle} onClick={goBack}>Atrás</button>
          )}
          {q.type === "mc" ? (
            <button
              style={{ ...buttonStyle, opacity: answered() && !submitting ? 1 : 0.5 }}
              disabled={!answered() || submitting}
              onClick={goNext}
            >
              {isLast ? (submitting ? "Guardando..." : "Finalizar y calificar") : "Siguiente"}
            </button>
          ) : (
            <button
              style={{ ...buttonStyle, opacity: submitting ? 0.5 : 1 }}
              disabled={submitting}
              onClick={() => confirmOrderAndNext(currentOrderDraft(q))}
            >
              {isLast ? (submitting ? "Guardando..." : "Confirmar orden y finalizar") : "Confirmar orden y siguiente"}
            </button>
          )}
        </div>
      </Shell>
    );
  }

  const pct = result ? Math.round((result.score / result.total) * 100) : 0;
  return (
    <Shell>
      <Logo />
      <h1 style={{ color: BRAND_BLACK, marginTop: 20 }}>¡Listo, {employeeName.split(" ")[0]}!</h1>
      <p style={{ fontSize: 18 }}>
        Obtuviste <strong>{result?.score}</strong> de <strong>{result?.total}</strong> ({pct}%)
      </p>
      <div style={{ background: "#eee", borderRadius: 8, height: 16, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, background: pct >= 70 ? BRAND_RED : BRAND_YELLOW, height: "100%" }} />
      </div>

      {result && result.reinforce.length > 0 ? (
        <div style={{ marginTop: 28 }}>
          <h3 style={{ color: BRAND_BLACK, marginBottom: 10 }}>Temas que te conviene reforzar</h3>
          {result.reinforce.map((r) => (
            <div key={r.sectionId} style={tipBox}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 14 }}>
                <span>{r.sectionTitle}</span>
                <span style={{ color: BRAND_RED }}>{r.correct}/{r.total} correctas</span>
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#334" }}>{r.tip}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: 24, color: "#227722", fontWeight: 700 }}>
          ¡Respondiste todo correctamente! No hay temas pendientes de reforzar.
        </p>
      )}

      <p style={{ marginTop: 24, color: "#556", fontSize: 13 }}>Tus respuestas quedaron registradas.</p>
    </Shell>
  );
}

function OrderQuestionUI({ steps, draft, onChange }: { steps: string[]; draft: number[]; onChange: (d: number[]) => void }) {
  function move(from: number, to: number) {
    if (to < 0 || to >= draft.length) return;
    const copy = [...draft];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    onChange(copy);
  }
  return (
    <div>
      <p style={{ fontSize: 13, color: "#667", marginTop: -4 }}>
        Usa las flechas para poner los pasos en el orden correcto (de arriba hacia abajo).
      </p>
      {draft.map((stepIdx, pos) => (
        <div key={stepIdx} style={orderRow}>
          <span style={orderNum}>{pos + 1}</span>
          <span style={{ flex: 1 }}>{steps[stepIdx]}</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <button type="button" onClick={() => move(pos, pos - 1)} disabled={pos === 0} style={arrowBtn}>↑</button>
            <button type="button" onClick={() => move(pos, pos + 1)} disabled={pos === draft.length - 1} style={arrowBtn}>↓</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ background: "#eee", borderRadius: 8, height: 8, margin: "12px 0 20px" }}>
      <div style={{ width: `${(current / total) * 100}%`, background: BRAND_RED, height: "100%", borderRadius: 8, transition: "width 0.2s" }} />
    </div>
  );
}

function Logo() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo.jpg" alt="Truly Nolen" style={{ height: 140, display: "block" }} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px 80px" }}>
      <div style={{ background: "white", borderRadius: 12, padding: 32, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", borderTop: `5px solid ${BRAND_RED}` }}>
        {children}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", marginTop: 16, marginBottom: 6, fontSize: 14, fontWeight: 400, color: "#334" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cdcdcd", fontSize: 15, boxSizing: "border-box" };
const buttonStyle: React.CSSProperties = { marginTop: 24, background: BRAND_RED, color: "white", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" };
const secondaryButtonStyle: React.CSSProperties = { marginTop: 24, background: "white", color: BRAND_BLACK, border: `1px solid ${BRAND_BLACK}`, borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer" };
const questionCard: React.CSSProperties = { background: "#fafafa", border: "1px solid #eee", borderRadius: 10, padding: 20, marginTop: 8 };
const optionLabel: React.CSSProperties = { display: "block", padding: "10px 12px", fontSize: 14, cursor: "pointer", borderRadius: 8, marginBottom: 8 };
const orderRow: React.CSSProperties = { display: "flex", alignItems: "center", gap: 10, background: "white", border: "1px solid #eee", borderRadius: 8, padding: "10px 12px", marginBottom: 8, fontSize: 14 };
const orderNum: React.CSSProperties = { background: BRAND_RED, color: "white", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 400, flexShrink: 0 };
const arrowBtn: React.CSSProperties = { border: "1px solid #cdcdcd", background: "white", borderRadius: 4, width: 24, height: 20, cursor: "pointer", fontSize: 11, lineHeight: 1 };
const tipBox: React.CSSProperties = { background: "#fffbe8", border: `1px solid ${BRAND_YELLOW}`, borderRadius: 8, padding: 14, marginBottom: 10 };
