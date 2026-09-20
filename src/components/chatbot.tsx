"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ZanaMascot, ZanaAvatar } from "@/components/zana-mascot";
import { getResponse, WELCOME } from "@/lib/chatbot-data";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <ZanaAvatar size={32} />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border/50 bg-card px-4 py-3">
        <span
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}

function ChatBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex items-end gap-2", isUser && "flex-row-reverse")}>
      {!isUser && <ZanaAvatar size={32} />}
      <div
        className={cn(
          "max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm border border-border/50 bg-card text-card-foreground"
        )}
      >
        {msg.text}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function Chatbot() {
  const locale = useLocale();
  const lang = locale === "sq" ? "sq" : "en";

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: WELCOME[lang] },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  // Auto-scroll on new messages or typing indicator change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when panel opens + lock body scroll on mobile
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // Lock body scroll on mobile when chat is open
      if (window.innerWidth < 640) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: nextId.current++, role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botText = getResponse(trimmed, locale);
      const botMsg: Message = { id: nextId.current++, role: "bot", text: botText };
      setTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const title = "Zana";
  const placeholder = lang === "sq" ? "Shkruaj një pyetje..." : "Type a question...";

  return (
    <>
      {/* ── Backdrop (mobile: blocks page scroll when chat open) ──────── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Chat panel ────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "fixed z-50 flex flex-col",
          // Mobile: full screen with safe insets
          "inset-2 sm:inset-auto",
          // Desktop: positioned bottom-right
          "sm:bottom-24 sm:right-4 sm:w-[380px] sm:h-[min(500px,calc(100vh-7rem))]",
          "rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl",
          "transition-all duration-300 origin-bottom-right",
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-90 opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <ZanaAvatar size={36} className="glow" />
            <div>
              <p className="text-sm font-semibold leading-none">{title}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {lang === "sq" ? "Gjithmonë në dispozicion" : "Always available"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} msg={msg} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="shrink-0 border-t border-border/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                "flex-1 rounded-lg border border-border/50 bg-input px-3 py-2",
                "text-sm text-foreground placeholder:text-muted-foreground",
                "outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                "transition-colors"
              )}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              aria-label="Send"
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                "bg-primary text-primary-foreground glow",
                "transition-all hover:bg-primary/90 active:scale-95",
                "disabled:opacity-40 disabled:pointer-events-none"
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Floating trigger ─────────────────────────────────────────────── */}
      <div className="fixed bottom-4 right-4 z-50 flex items-end gap-2 sm:gap-3">
        {/* Tooltip bubble — hidden on very small screens */}
        {!open && (
          <div className="hidden sm:block animate-in fade-in slide-in-from-right-2 duration-500 mb-2">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-2xl rounded-br-sm border border-border/50 bg-background/95 backdrop-blur-xl px-4 py-2.5 shadow-lg transition-all hover:shadow-xl hover:border-primary/30"
            >
              <span className="text-sm text-foreground">
                {lang === "sq"
                  ? "Bisedo me Zanën"
                  : "Chat with Zana"}
              </span>
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
            </button>
          </div>
        )}

        {/* Avatar button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat"}
          className={cn(
            "size-16 rounded-full overflow-hidden",
            "flex items-center justify-center",
            "transition-all duration-300",
            "hover:scale-110 active:scale-95",
            "ring-2 ring-primary/40 ring-offset-2 ring-offset-background",
            "shadow-lg shadow-primary/20",
            open && "ring-primary/60"
          )}
        >
          <ZanaMascot size={64} />
        </button>
      </div>
    </>
  );
}
