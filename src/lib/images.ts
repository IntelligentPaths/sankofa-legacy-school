/**
 * Canonical paths to processed images. Import from here instead of
 * hardcoding paths throughout the codebase — if filenames change, only
 * this file needs updating. All student imagery is duotone-processed
 * to the brand palette (near-black shadows → gold highlights).
 */

export const images = {
  students: {
    // Portraits + key emotional moments
    portraitJoy:       "/images/students/portrait-joy.jpg",
    portraitLatino:    "/images/students/portrait-latino.jpg",
    communityEngaged:  "/images/students/community-engaged.jpg",
    mentorship:        "/images/students/mentorship.jpg",
    // Pillar-aligned
    masteryReading:    "/images/students/mastery-reading.jpg",
    masteryAlgorithms: "/images/students/mastery-algorithms.jpg",
    creationTech:      "/images/students/creation-tech.jpg",
    creationArt:       "/images/students/creation-art.jpg",
    readingGroup:      "/images/students/reading-group.jpg",
  },
  founders: {
    juleon: "/images/founders/juleon.jpg",
  },
  campus: {
    exterior: "/images/campus/exterior.jpg",
  },
  og: {
    default: "/images/og/default.jpg",
  },
} as const;
