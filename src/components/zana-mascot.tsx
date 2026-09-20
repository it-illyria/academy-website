"use client";

import Image from "next/image";

/** Floating button mascot — always visible, use smallest version */
export function ZanaMascot({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/zana/avatar-sm.webp"
      alt="Zana — Lika Academy AI Assistant"
      width={size}
      height={size}
      className={className}
      sizes="64px"
      priority
    />
  );
}

/** Small avatar for chat bubbles and headers */
export function ZanaAvatar({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/zana/avatar-sm.webp"
        alt="Zana"
        width={size}
        height={size}
        className="object-contain"
        sizes={size <= 32 ? "32px" : "64px"}
        loading="lazy"
      />
    </div>
  );
}

/** Large bust version for banners */
export function ZanaBust({
  size = 120,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/zana/bust-sm.webp"
      alt="Zana — Lika Academy AI Assistant"
      width={size}
      height={Math.round(size * 0.75)}
      className={`object-contain ${className ?? ""}`}
      sizes="(max-width: 640px) 80vw, 400px"
      loading="lazy"
    />
  );
}
