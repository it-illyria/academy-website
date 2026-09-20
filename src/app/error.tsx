"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function RootError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[Root Error]", error);
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
        padding: "2rem"
      }}>
        <div style={{ textAlign: "center", maxWidth: "400px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          {error.digest && (
            <p style={{ color: "#666", fontSize: "0.75rem", fontFamily: "monospace", marginBottom: "1rem" }}>
              Error: {error.digest}
            </p>
          )}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button
              onClick={unstable_retry}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "0.5rem",
                border: "1px solid #333",
                backgroundColor: "transparent",
                color: "#e0e0e0",
                cursor: "pointer",
                fontSize: "0.875rem"
              }}
            >
              Try Again
            </button>
            <Link
              href="/"
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "0.5rem",
                border: "none",
                backgroundColor: "#ee3533",
                color: "#fff",
                cursor: "pointer",
                fontSize: "0.875rem",
                textDecoration: "none"
              }}
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
