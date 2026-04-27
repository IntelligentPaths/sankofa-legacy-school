"use client";

import { useState, useMemo } from "react";
import type { FormEvent } from "react";

/* ── Interest form — six required fields ──
 *
 * parentName, childName, email, phone, childGrade, howHeard
 * Lenient phone validation — accepts US-style with +/(/-/space variants.
 * Submit disabled while any required field is empty.
 * ──────────────────────────────────────────────────────────────── */

type SubmitState = "idle" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts 5551234567, 555-123-4567, (555) 123-4567, +1 555 123 4567 etc.
const PHONE_RE = /^\+?\d[\d\s().\-]{8,17}\d$/;

const GRADES = [
  "Pre-K",
  "K",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "Not Sure Yet",
];

/* Inherit color (var(--text-primary) on dark bg, var(--near-black) on cream)
 * from the surface PageShell sets via .data-bg. The form doesn't hardcode a
 * background color the way it used to — it's transparent and reads context. */

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Montserrat', system-ui, sans-serif",
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "var(--gold-deep)",
  marginBottom: "0.5rem",
  fontWeight: 600,
};

const requiredStarStyle: React.CSSProperties = {
  color: "var(--rust)",
  marginLeft: 4,
  fontWeight: 700,
};

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.55)",
  border: "1px solid rgba(56,31,0,0.2)",
  color: "inherit",
  padding: "0.85rem 1rem",
  fontFamily: "'Montserrat', system-ui, sans-serif",
  fontSize: "0.95rem",
  borderRadius: 2,
  outline: "none",
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
};

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--gold-deep)";
  e.currentTarget.style.background = "rgba(255,255,255,0.85)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(251,205,50,0.18)";
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(56,31,0,0.2)";
  e.currentTarget.style.background = "rgba(255,255,255,0.55)";
  e.currentTarget.style.boxShadow = "none";
}

export default function InterestForm() {
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childGrade, setChildGrade] = useState("");
  const [howHeard, setHowHeard] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // disable submit until every required field is filled
  const allFilled = useMemo(
    () =>
      parentName.trim() !== "" &&
      childName.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      childGrade.trim() !== "" &&
      howHeard.trim() !== "",
    [parentName, childName, email, phone, childGrade, howHeard]
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!allFilled) {
      setSubmitState("error");
      setErrorMessage("Please fill out every field before submitting.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setSubmitState("error");
      setErrorMessage("That email doesn't look right — please double-check it.");
      return;
    }
    if (!PHONE_RE.test(phone.trim())) {
      setSubmitState("error");
      setErrorMessage("Please enter a valid phone number.");
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
          childName: childName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          childGrade,
          howHeard: howHeard.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmitState("success");
        setParentName("");
        setChildName("");
        setEmail("");
        setPhone("");
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

  const submitDisabled = isSubmitting || !allFilled;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: "grid", gap: "1.25rem" }}>
        {/* ── parent name ── */}
        <div>
          <label htmlFor="parentName" style={labelStyle}>
            Your Name<span style={requiredStarStyle} aria-hidden>*</span>
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

        {/* ── child name ── */}
        <div>
          <label htmlFor="childName" style={labelStyle}>
            Child&rsquo;s Name<span style={requiredStarStyle} aria-hidden>*</span>
          </label>
          <input
            id="childName"
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            style={inputBaseStyle}
            autoComplete="off"
          />
        </div>

        {/* ── email ── */}
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email Address<span style={requiredStarStyle} aria-hidden>*</span>
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
            inputMode="email"
          />
        </div>

        {/* ── phone ── */}
        <div>
          <label htmlFor="phone" style={labelStyle}>
            Phone Number<span style={requiredStarStyle} aria-hidden>*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            style={inputBaseStyle}
            autoComplete="tel"
            inputMode="tel"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* ── child grade ── */}
        <div>
          <label htmlFor="childGrade" style={labelStyle}>
            Child&rsquo;s Current Grade<span style={requiredStarStyle} aria-hidden>*</span>
          </label>
          <select
            id="childGrade"
            value={childGrade}
            onChange={(e) => setChildGrade(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            style={inputBaseStyle}
          >
            <option value="" disabled>
              Select grade
            </option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* ── how heard (now required) ── */}
        <div>
          <label htmlFor="howHeard" style={labelStyle}>
            How did you hear about Sankofa?
            <span style={requiredStarStyle} aria-hidden>*</span>
          </label>
          <input
            id="howHeard"
            type="text"
            value={howHeard}
            onChange={(e) => setHowHeard(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            required
            style={inputBaseStyle}
            placeholder="Friend, social media, school, event, etc."
          />
        </div>

        {/* ── submit ── */}
        <button
          type="submit"
          disabled={submitDisabled}
          style={{
            width: "100%",
            padding: "1rem 2rem",
            background: submitDisabled
              ? "linear-gradient(135deg, rgba(251,205,50,0.45), rgba(245,166,35,0.45))"
              : "linear-gradient(135deg, var(--gold-primary), var(--gold-warm))",
            color: "var(--near-black)",
            border: "none",
            fontFamily: "'Montserrat', system-ui, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: "0.85rem",
            borderRadius: 2,
            cursor: submitDisabled ? "not-allowed" : "pointer",
            boxShadow: submitDisabled
              ? "none"
              : "0 4px 32px rgba(251,205,50,0.25)",
            opacity: submitDisabled ? 0.7 : 1,
            transition: "opacity 0.2s, box-shadow 0.2s, background 0.2s",
            marginTop: "0.5rem",
          }}
        >
          {isSubmitting ? "Submitting..." : "Request Next Steps →"}
        </button>

        {/* ── status ── */}
        {submitState === "success" && (
          <p
            className="font-body"
            style={{
              color: "var(--gold-deep)",
              fontSize: "0.95rem",
              textAlign: "center",
              margin: 0,
              lineHeight: 1.5,
              fontWeight: 600,
            }}
          >
            Thank you! We&rsquo;ll be in touch about the founding cohort.
          </p>
        )}
        {submitState === "error" && (
          <p
            className="font-body"
            style={{
              color: "var(--rust)",
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
