"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import CursorGlow from "./CursorGlow";
import QuillCursor from "./QuillCursor";

/* ── layout shell ── */
export default function LayoutShell({ children }: { children: ReactNode }) {
  // pathname is wired up now so NavBar/Footer can read it when added
  usePathname();

  return (
    <>
      <CursorGlow />
      <QuillCursor />
      {children}
    </>
  );
}
