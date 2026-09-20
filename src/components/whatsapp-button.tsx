"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useIsMounted } from "@/lib/use-mounted";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const mounted = useIsMounted();

  useEffect(() => {
    if (!mounted) return;
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, [mounted]);

  if (!mounted) return null;

  const phoneNumber = "355690000000"; // TODO: Replace with real number
  const message = encodeURIComponent("Përshëndetje! Dua të di më shumë për kurset e Lika Academy.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <div className="relative flex items-center gap-2 rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl px-4 py-2.5 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-destructive hover:text-white transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
          <span className="text-sm text-foreground">
            Na shkruaj në WhatsApp!
          </span>
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/40"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
}
