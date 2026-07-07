"use client";

import { useState } from "react";
import { SECTIONS, DEPARTMENTS, ALL_QUESTIONS } from "@/lib/questions";

const BRAND_GREEN = "#1B5E3F";
const BRAND_GOLD = "#F2A93B";

type Step = "intro" | "quiz" | "done";

export default function Home() {
  const [step, setStep] = useState<Step>("intro");
  const [employeeName, setEmployeeName] = useState("");
  const [department, setDepartment] = useState("");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const section = SECTIONS[sectionIndex];
  const isLastSection = sectionIndex === SECTIONS.length - 1;

  function selectAnswer(questionId: string, optionIndex: number) {
    setResponses((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function sectionComplete() {
    return section.questions.every((q) => responses[q.id] !== undefined);
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
      setResult({ score: data.score, total: data.total });
      setStep("done");
    } catch (e) {
      setError("Hubo un problema al guardar tus respuestas. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "intro") {
    return (
      <Shell>
        <h1 style={{ color: BRAND_GREEN }}>Cuestionario de Procesos</h1>
        <p>
          Este cuestionario evalúa tu conocimiento del Manual de Procesos por Departamento.
          Tiene {ALL_QUESTIONS.length} preguntas de opción múltiple, agrupadas en{" "}
          {SECTIONS.length} secciones. Al finalizar verás tu calificación.
        </p>
        <label style={labelStyle}>Nombre o código de empleado</label>
        <input
          style={inputStyle}
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          placeholder="Ej. Juan Pérez"
        />
        <label style={labelStyle}>Departamento</label>
        <select
          style={inputStyle}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Selecciona tu departamento</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <button
          style={{
            ...buttonStyle,
            opacity: employeeName && department ? 1 : 0.5,
          }}
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
          <h2 style={{ color: BRAND_GREEN, margin: 0 }}>{section.title}</h2>
          <span style={{ color: "#667", fontSize: 14 }}>
            Sección {sectionIndex + 1} de {SECTIONS.length}
          </span>
        </div>
        <ProgressBar current={sectionIndex + 1} total={SECTIONS.length} />

        {section.questions.map((q, qi) => (
          <div key={q.id} style={questionCard}>
            <p style={{ fontWeight: 600 }}>
              {qi + 1}. {q.text}
            </p>
            {q.options.map((opt, oi) => (
              <label key={oi} style={optionLabel}>
                <input
                  type="radio"
                  name={q.id}
                  checked={responses[q.id] === oi}
                  onChange={() => selectAnswer(q.id, oi)}
                  style={{ marginRight: 8 }}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          {sectionIndex > 0 && (
            <button
              style={secondaryButtonStyle}
              onClick={() => setSectionIndex((i) => i - 1)}
            >
              Atrás
            </button>
          )}
          {!isLastSection ? (
            <button
              style={{ ...buttonStyle, opacity: sectionComplete() ? 1 : 0.5 }}
              disabled={!sectionComplete()}
              onClick={() => setSectionIndex((i) => i + 1)}
            >
              Siguiente
            </button>
          ) : (
            <button
              style={{ ...buttonStyle, opacity: sectionComplete() && !submitting ? 1 : 0.5 }}
              disabled={!sectionComplete() || submitting}
              onClick={handleFinish}
            >
              {submitting ? "Guardando..." : "Finalizar y calificar"}
            </button>
          )}
        </div>
      </Shell>
    );
  }

  // step === "done"
  const pct = result ? Math.round((result.score / result.total) * 100) : 0;
  return (
    <Shell>
      <h1 style={{ color: BRAND_GREEN }}>¡Listo, {employeeName.split(" ")[0]}!</h1>
      <p style={{ fontSize: 18 }}>
        Obtuviste <strong>{result?.score}</strong> de <strong>{result?.total}</strong> (
        {pct}%)
      </p>
      <div style={{ background: "#e6ece8", borderRadius: 8, height: 16, overflow: "hidden" }}>
        <div
          style={{
            width: `${pct}%`,
            background: pct >= 70 ? BRAND_GREEN : BRAND_GOLD,
            height: "100%",
          }}
        />
      </div>
      <p style={{ marginTop: 24, color: "#556" }}>
        Tus respuestas quedaron registradas. Gracias por completar el cuestionario.
      </p>
    </Shell>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ background: "#e6ece8", borderRadius: 8, height: 8, margin: "12px 0 20px" }}>
      <div
        style={{
          width: `${(current / total) * 100}%`,
          background: BRAND_GREEN,
          height: "100%",
          borderRadius: 8,
          transition: "width 0.2s",
        }}
      />
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px 80px" }}>
      <div
        style={{
          background: "white",
          borderRadius: 12,
          padding: 32,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginTop: 16,
  marginBottom: 6,
  fontSize: 14,
  fontWeight: 600,
  color: "#334",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #cdd6d1",
  fontSize: 15,
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  marginTop: 24,
  background: BRAND_GREEN,
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "12px 24px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  marginTop: 24,
  background: "white",
  color: BRAND_GREEN,
  border: `1px solid ${BRAND_GREEN}`,
  borderRadius: 8,
  padding: "12px 24px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};

const questionCard: React.CSSProperties = {
  background: "#fafcfb",
  border: "1px solid #e6ece8",
  borderRadius: 10,
  padding: 16,
  marginTop: 16,
};

const optionLabel: React.CSSProperties = {
  display: "block",
  padding: "8px 4px",
  fontSize: 14,
  cursor: "pointer",
};
