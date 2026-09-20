"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={cn(
        "fixed z-40 flex h-10 w-10 items-center justify-center rounded-full",
        "border border-border/50 bg-background/90 backdrop-blur-sm",
        "text-muted-foreground shadow-lg",
        "transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-primary/10",
        // Position: bottom-right but ABOVE the chatbot (which is bottom-4 right-4, size-16)
        "bottom-24 right-5",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
