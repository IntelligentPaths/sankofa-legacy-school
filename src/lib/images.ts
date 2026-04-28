/**
 * Canonical paths to processed images. Import from here instead of
 * hardcoding paths throughout the codebase — if filenames change, only
 * this file needs updating.
 *
 * Hero + four pillar images are Runway-generated PNGs served via
 * Next.js <Image>, which handles WebP/AVIF conversion + srcSet at
 * request time. Founder + OG slots remain on placeholder JPGs.
 */

export const images = {
  heroSecondary: "/images/students/hero.png",
  aboutHero: "/images/students/about.png",
  pillars: {
    mastery:   "/images/students/mastery.png",
    identity:  "/images/students/identity.png",
    creation:  "/images/students/creation.png",
    community: "/images/students/community.png",
  },
  founders: {
    juleon: "/images/founders/juleon-placeholder.jpg",
  },
  og: {
    default: "/images/og/default.jpg",
  },
} as const;
