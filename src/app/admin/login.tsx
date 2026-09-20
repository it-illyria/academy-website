"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function AdminLogin({ onLogin }: { onLogin: (password: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (res.ok) {
      sessionStorage.setItem("lika-admin-auth", password);
      onLogin(password);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <Image
              src="/logo-icon-192.png"
              alt="Lika Academy"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <h1 className="text-xl font-bold">Lika Academy Admin</h1>
            <p className="text-sm text-muted-foreground">Enter password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                Wrong password
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading || !password}>
              {loading ? "..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
