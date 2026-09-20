import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { TOTAL_STEPS } from "./types";

export function StepIndicator({
  currentStep,
  t,
}: {
  currentStep: number;
  t: ReturnType<typeof useTranslations>;
}) {
  const steps = [
    { title: t("step1_title") },
    { title: t("step2_title") },
    { title: t("step3_title") },
    { title: t("step4_title") },
  ];

  return (
    <div className="mb-8">
      {/* Step label */}
      <p className="mb-4 text-center text-sm text-muted-foreground">
        {t("step")} {currentStep} {t("of")} {TOTAL_STEPS}
      </p>

      {/* Progress bar */}
      <div className="relative mb-6">
        <div className="absolute top-5 left-0 h-0.5 w-full bg-border/50" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary to-[oklch(0.75_0.18_195)] transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%`,
          }}
        />
        <div className="relative z-10 flex justify-between">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isDone = stepNum < currentStep;
            const isActive = stepNum === currentStep;
            return (
              <div key={stepNum} className="flex flex-col items-center gap-2">
                <div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                    isDone
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_0_12px_oklch(var(--primary)/0.4)]"
                      : isActive
                        ? "border-primary bg-primary/10 text-primary shadow-[0_0_16px_oklch(var(--primary)/0.35)]"
                        : "border-border/50 bg-card/50 text-muted-foreground",
                  ].join(" ")}
                >
                  {isDone ? <Check className="h-4 w-4" /> : stepNum}
                </div>
                <span
                  className={[
                    "hidden text-xs font-medium sm:block",
                    isActive
                      ? "text-foreground"
                      : isDone
                        ? "text-primary/70"
                        : "text-muted-foreground/60",
                  ].join(" ")}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active step description */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">
          {steps[currentStep - 1].title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(`step${currentStep}_desc` as Parameters<typeof t>[0])}
        </p>
      </div>
    </div>
  );
}
