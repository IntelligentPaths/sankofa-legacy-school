export const PORTAL_SESSION_KEY = "sankofa_portal_seen";

/* ── session gate: first load vs returning ── */
export function hasSeenPortal(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(PORTAL_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markPortalSeen(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PORTAL_SESSION_KEY, "1");
  } catch {
    /* storage unavailable */
  }
}
