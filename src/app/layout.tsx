import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "Sankofa Legacy School — Private K–5 Microschool in South Fort Worth",
  description:
    "A small, intentional elementary microschool building scholars, leaders, and legacy-makers through rigorous academics, cultural grounding, and project-based learning. Founding cohort — August 2026.",
  openGraph: {
    title: "Sankofa Legacy School — Private K–5 Microschool in South Fort Worth",
    description:
      "A small, intentional elementary microschool building scholars, leaders, and legacy-makers through rigorous academics, cultural grounding, and project-based learning. Founding cohort — August 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
