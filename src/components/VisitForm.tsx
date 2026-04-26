"use client";

import { useState, useMemo } from "react";
import type { FormEvent } from "react";

/* ── VisitForm — light 3-field variant for the /visit page.
 *
 * Posts to /api/interest with synthetic placeholder values for the
 * required fields the route still expects (childName, phone, childGrade).
 * The route stays the strict source of truth for enrollment intake on
 * /admissions; this is only a low-friction "I'd like to visit" inquiry.
 *
 * Note: the form labels the visitor's optional message rather than
 * forcing them through a 6-field form just to ask "can I come visit."
 * ──────────────────────────────────────────────────────────────── */

type SubmitState = "idle" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "var(--gold-deep)";
  e.currentTarget.style.background = "rgba(255,255,255,0.85)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(251,205,50,0.18)";
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "rgba(56,31,0,0.2)";
  e.currentTarget.style.background = "rgba(255,255,255,0.55)";
  e.currentTarget.style.boxShadow = "none";
}

export default function VisitForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const allFilled = useMemo(
    () => name.trim() !== "" && email.trim() !== "" && message.trim() !== "",
    [name, email, message]
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!allFilled) {
      setSubmitState("error");
      setErrorMessage("Please fill out every field.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setSubmitState("error");
      setErrorMessage("That email doesn't look right — please check it.");
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");
    setErrorMessage("");

    try {
      // Compose payload matching /api/interest's required shape;
      // visit-specific fields ride along in `howHeard`.
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: name.trim(),
          childName: "(visit inquiry)",
          email: email.trim(),
          phone: "(visit inquiry)",
          childGrade: "(visit inquiry)",
          howHeard: `[VISIT INQUIRY] ${message.trim()}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSubmitState("success");
        setName("");
        setEmail("");
        setMessage("");
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
        <div>
          <label htmlFor="visit-name" style={labelStyle}>
            Your Name<span style={requiredStarStyle} aria-hidden>*</span>
          </label>
          <input
            id="visit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            style={inputBaseStyle}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor="visit-email" style={labelStyle}>
            Email<span style={requiredStarStyle} aria-hidden>*</span>
          </label>
          <input
            id="visit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            style={inputBaseStyle}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="visit-message" style={labelStyle}>
            What would you like to know?
            <span style={requiredStarStyle} aria-hidden>*</span>
          </label>
          <textarea
            id="visit-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            rows={4}
            style={{ ...inputBaseStyle, resize: "vertical", minHeight: 110 }}
            required
          />
        </div>

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
          {isSubmitting ? "Sending..." : "Send"}
        </button>

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
            Thank you! We&rsquo;ll respond within a few days.
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
