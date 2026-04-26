"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import CursorGlow from "./CursorGlow";
import GoldCursor from "./GoldCursor";
import NavBar from "./NavBar";

/* ── layout shell ── */
export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // The portal renders at z-100 covering everything until it fades, so
  // we always mount NavBar — it sits at z-40 and is naturally hidden by
  // the portal overlay during the intro on `/`.
  // We DO suppress NavBar entirely on the homepage on first visit, before
  // the portal fades, by relying on the Portal's z-index dominance instead
  // of any state plumbing — keeps this component simple.

  return (
    <>
      <CursorGlow />
      <GoldCursor />
      <NavBar key={pathname /* re-mount per route to refresh data-bg read */} />
      {children}
    </>
  );
}
