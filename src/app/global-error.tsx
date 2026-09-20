"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a1a",
        color: "#e0e0e0",
        fontFamily: "system-ui, sans-serif",
        margin: 0,
        padding: "2rem"
      }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>⚠️ Critical Error</h1>
          <p style={{ color: "#888", marginTop: "1rem" }}>The application encountered a critical error.</p>
          <button
            onClick={unstable_retry}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              border: "none",
              backgroundColor: "#ee3533",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
