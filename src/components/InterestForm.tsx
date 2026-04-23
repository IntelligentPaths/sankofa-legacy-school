"use client";

import { useState } from "react";
import type { FormEvent } from "react";

/* ── interest form ── */

type SubmitState = "idle" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GRADES = [
  "Pre-K",
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "Not Sure Yet",
];

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Montserrat', system-ui, sans-serif",
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "var(--gold-primary)",
  marginBottom: "0.5rem",
  fontWeight: 500,
};

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(251,205,50,0.04)",
  border: "1px solid rgba(251,205,50,0.25)",
  color: "var(--text-primary)",
  padding: "0.85rem 1rem",
  fontFamily: "'Montserrat', system-ui, sans-serif",
  fontSize: "0.95rem",
  borderRadius: 2,
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
};

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--gold-primary)";
  e.currentTarget.style.background = "rgba(251,205,50,0.07)";
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(251,205,50,0.25)";
  e.currentTarget.style.background = "rgba(251,205,50,0.04)";
}

export default function InterestForm() {
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [childGrade, setChildGrade] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ── client-side validation ──
    if (!parentName.trim() || !childGrade.trim() || !EMAIL_RE.test(email.trim())) {
      setSubmitState("error");
      setErrorMessage("Please fill out all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: parentName.trim(),
          email: email.trim(),
          childGrade,
          howHeard: howHeard.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmitState("success");
        setParentName("");
        setEmail("");
        setChildGrade("");
        setHowHeard("");
      } else {
        setSubmitState("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      setSubmitState("error");
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: "grid", gap: "1.25rem" }}>
        {/* ── parent name ── */}
        <div>
          <label htmlFor="parentName" style={labelStyle}>
            Parent Name
          </label>
          <input
            id="parentName"
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            style={inputBaseStyle}
            autoComplete="name"
          />
        </div>

        {/* ── email ── */}
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            style={inputBaseStyle}
            autoComplete="email"
          />
        </div>

        {/* ── child grade ── */}
        <div>
          <label htmlFor="childGrade" style={labelStyle}>
            Child&rsquo;s Grade
          </label>
          <select
            id="childGrade"
            value={childGrade}
            onChange={(e) => setChildGrade(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            style={{ ...inputBaseStyle, colorScheme: "dark" }}
          >
            <option value="" disabled>
              Select a grade
            </option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* ── how heard ── */}
        <div>
          <label htmlFor="howHeard" style={labelStyle}>
            How did you hear about us? (optional)
          </label>
          <input
            id="howHeard"
            type="text"
            value={howHeard}
            onChange={(e) => setHowHeard(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            style={inputBaseStyle}
          />
        </div>

        {/* ── submit ── */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "1rem 2rem",
            background:
              "linear-gradient(135deg, var(--gold-primary), var(--gold-warm))",
            color: "var(--near-black)",
            border: "none",
            fontFamily: "'Montserrat', system-ui, sans-serif",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: "0.85rem",
            borderRadius: 2,
            cursor: isSubmitting ? "wait" : "pointer",
            boxShadow: "0 4px 32px rgba(251,205,50,0.2)",
            opacity: isSubmitting ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {isSubmitting ? "Submitting..." : "Join the Founding Cohort"}
        </button>

        {/* ── status ── */}
        {submitState === "success" && (
          <p
            className="font-body"
            style={{
              color: "var(--gold-primary)",
              fontSize: "0.95rem",
              textAlign: "center",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Thank you! We&rsquo;ll be in touch about the founding cohort.
          </p>
        )}
        {submitState === "error" && (
          <p
            className="font-body"
            style={{
              color: "rgba(178, 39, 20, 0.9)",
              fontSize: "0.9rem",
              textAlign: "center",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
