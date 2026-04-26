"use client";

import { FadeIn } from "@/lib/motion";

/* ── pillar card ── */

type Props = {
  number: string;
  name: string;
  description: string;
  tags: string[];
  outcome: string;
  accentColor: string;
  imageSrc: string;
  imageAlt: string;
  imageFirst?: boolean;
};

export default function PillarCard({
  number,
  name,
  description,
  tags,
  outcome,
  accentColor,
  imageSrc,
  imageAlt,
  imageFirst = false,
}: Props) {
  const imageBlock = (
    <div
      style={{
        position: "relative",
        aspectRatio: "4 / 3",
        overflow: "hidden",
        borderRadius: 4,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        border: "1px solid rgba(251,205,50,0.15)",
      }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, transparent, rgba(28,27,32,0.4))",
          pointerEvents: "none",
        }}
      />
    </div>
  );

  const contentBlock = (
    <div>
      <p
        className="font-display"
        style={{
          color: accentColor,
          fontSize: "3.5rem",
          lineHeight: 1,
          opacity: 0.4,
          margin: 0,
        }}
      >
        {number}
      </p>
      <h3
        className="font-display"
        style={{
          fontSize: "2.5rem",
          color: "var(--text-primary)",
          margin: "0.25rem 0 1rem",
          fontWeight: 600,
          lineHeight: 1.1,
        }}
      >
        {name}
      </h3>
      <p
        className="font-body"
        style={{
          fontSize: "1rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          margin: "0 0 1.5rem",
        }}
      >
        {description}
      </p>

      {/* ── tags ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem 0.75rem",
        }}
      >
        {tags.map((t) => (
          <span
            key={t}
            className="font-body"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.35rem 0.75rem",
              border: "1px solid rgba(251,205,50,0.3)",
              borderRadius: 100,
              color: "var(--text-secondary)",
              display: "inline-block",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* ── outcome ── */}
      <p
        className="font-display italic"
        style={{
          fontSize: "1rem",
          color: "var(--text-muted)",
          margin: "1.5rem 0 0",
          paddingLeft: "1rem",
          borderLeft: `2px solid ${accentColor}`,
          lineHeight: 1.5,
        }}
      >
        {outcome}
      </p>
    </div>
  );

  return (
    <FadeIn>
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {imageFirst ? (
          <>
            {imageBlock}
            {contentBlock}
          </>
        ) : (
          <>
            {contentBlock}
            {imageBlock}
          </>
        )}
      </div>
    </FadeIn>
  );
}
