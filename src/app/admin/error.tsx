"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[Admin Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-xl font-bold text-zinc-100">Admin Error</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Something went wrong in the admin panel.
        </p>
        {error.message && (
          <pre className="mt-3 rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-xs text-red-400 text-left overflow-auto max-h-32">
            {error.message}
          </pre>
        )}
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={unstable_retry}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/admin"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 transition-colors"
          >
            Admin Home
          </Link>
        </div>
      </div>
    </div>
  );
}
