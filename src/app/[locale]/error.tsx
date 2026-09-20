"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[Page Error]", error);
  }, [error]);

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-destructive/5 blur-[200px]" />

      <div className="relative text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="text-2xl font-bold text-foreground">
          Diçka shkoi keq
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ndodhi një gabim i papritur. Provo të rifreskosh faqen ose kthehu në kryefaqje.
        </p>

        {error.digest && (
          <p className="mt-2 text-xs text-muted-foreground/60 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex gap-3 justify-center">
          <Button onClick={unstable_retry} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Provo Përsëri
          </Button>
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Kryefaqja
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
