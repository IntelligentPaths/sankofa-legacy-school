/**
 * Canonical paths to processed images. Import from here instead of
 * hardcoding paths throughout the codebase — if filenames change, only
 * this file needs updating.
 *
 * Student & founder images were generated in Runway with brand-aligned
 * cinematic prompting (dark-to-amber gradient backgrounds, warm directional
 * lighting, age-appropriate subjects, subtle Adinkra pattern accents).
 */

export const images = {
  heroSecondary: "/images/students/hero-secondary.jpg",
  pillars: {
    mastery:   "/images/students/mastery.jpg",
    identity:  "/images/students/identity.jpg",
    creation:  "/images/students/creation.jpg",
    community: "/images/students/community.jpg",
  },
  founders: {
    juleon: "/images/founders/juleon-placeholder.jpg",
  },
  og: {
    default: "/images/og/default.jpg",
  },
} as const;
