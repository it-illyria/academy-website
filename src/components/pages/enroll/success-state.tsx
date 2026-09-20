import { useTranslations } from "next-intl";
import { PartyPopper } from "lucide-react";

export function SuccessState({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center py-12 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-[0_0_40px_oklch(var(--primary)/0.3)]">
        <PartyPopper className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mb-2 text-2xl font-bold">{t("subtitle")}</h2>
      <p className="max-w-sm text-muted-foreground">{t("desc")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className="text-2xl animate-bounce"
            style={{ animationDelay: `${n * 0.15}s` }}
          >
            🎉
          </span>
        ))}
      </div>
    </div>
  );
}
