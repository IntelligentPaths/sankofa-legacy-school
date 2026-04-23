/**
 * Canonical paths to processed images. Import from here instead of
 * hardcoding paths throughout the codebase — if filenames change, only
 * this file needs updating.
 */

export const images = {
  students: {
    identityAfrican: "/images/students/identity-african.jpg",
    identityLatino: "/images/students/identity-latino.jpg",
    creationRobotics: "/images/students/creation-robotics.jpg",
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
