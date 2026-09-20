"use client";

import { useIsMounted } from "@/lib/use-mounted";

export default function Template({ children }: { children: React.ReactNode }) {
  const mounted = useIsMounted();

  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {children}
    </div>
  );
}
