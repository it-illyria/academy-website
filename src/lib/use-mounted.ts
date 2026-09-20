"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns `true` once the component has hydrated on the client, `false`
 * during server rendering and the initial client render. This avoids the
 * `react-hooks/set-state-in-effect` anti-pattern of calling `setState`
 * synchronously inside a `useEffect` body just to flip a "mounted" flag —
 * `useSyncExternalStore` lets React know the value differs between the
 * server snapshot and the client snapshot without an extra render/setState
 * cycle, while still avoiding SSR/hydration mismatches.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    // No external store to subscribe to — the value never changes after
    // the initial client render, so there's nothing to notify.
    () => () => {},
    () => true,
    () => false
  );
}
