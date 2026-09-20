"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { submitEnrollment } from "@/lib/actions";
import { saveEnrollmentSubmission } from "@/lib/save-submission";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight } from "lucide-react";
import { courses } from "@/lib/courses";
import { StepIndicator } from "./enroll/step-indicator";
import { Step1 } from "./enroll/step1-program";
import { Step2 } from "./enroll/step2-info";
import { Step3 } from "./enroll/step3-preferences";
import { Step4 } from "./enroll/step4-review";
import { SuccessState } from "./enroll/success-state";
import { INITIAL_FORM, TOTAL_STEPS, type FormData } from "./enroll/types";

export function EnrollPage() {
  const t = useTranslations("enroll_page");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const STORAGE_KEY = "lika-enroll-wizard";
  const mounted = useRef(false);

  // Restore state from sessionStorage on mount, then check URL param.
  // sessionStorage is a client-only external system — it can't be read
  // during the lazy useState initializer without causing an SSR/hydration
  // mismatch, so restoring it here (post-mount) is the correct pattern.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (parsed.step) setStep(parsed.step);
        if (parsed.formData) setFormData(parsed.formData);
      }
    } catch {}

    // Pre-select course from URL param (?course=python-fullstack)
    const courseParam = searchParams.get("course");
    if (courseParam) {
      const validSlugs = courses.map((c) => c.slug);
      if (validSlugs.includes(courseParam)) {
        setFormData((prev) => ({ ...prev, courseSlug: courseParam }));
      }
    }

    mounted.current = true;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save state to sessionStorage on changes (but not on first mount)
  useEffect(() => {
    if (!mounted.current) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, formData }));
    } catch {}
  }, [step, formData]);

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, val: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: val }));
    },
    []
  );

  const canAdvance = useCallback(() => {
    if (step === 1) return formData.courseSlug !== "";
    if (step === 2)
      return (
        formData.fullName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.dob !== ""
      );
    return true;
  }, [step, formData]);

  const go = useCallback(
    (targetStep: number) => {
      if (animating) return;
      setDirection(targetStep > step ? "forward" : "back");
      setAnimating(true);
      setTimeout(() => {
        setStep(targetStep);
        setAnimating(false);
      }, 200);
    },
    [animating, step]
  );

  const handleNext = () => {
    if (step < TOTAL_STEPS && canAdvance()) go(step + 1);
  };

  const handleBack = () => {
    if (step > 1) go(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    const result = await submitEnrollment({ ...formData, locale });
    setIsSubmitting(false);
    if (result.success) {
      saveEnrollmentSubmission({
        courseSlug: formData.courseSlug,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        experience: formData.experience,
        format: formData.format,
        message: formData.message,
      });
      sessionStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[220px] w-[220px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            Lika Academy
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-xl text-primary font-semibold">
            {t("subtitle")}
          </p>
        </div>

        {/* Glass card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            {submitted ? (
              <SuccessState t={t} />
            ) : (
              <>
                <StepIndicator currentStep={step} t={t} />

                {/* Step content with fade transition */}
                <div
                  className="transition-all duration-200"
                  style={{
                    opacity: animating ? 0 : 1,
                    transform: animating
                      ? `translateX(${direction === "forward" ? "12px" : "-12px"})`
                      : "translateX(0)",
                  }}
                >
                  {step === 1 && (
                    <Step1
                      data={formData}
                      onChange={(slug) => updateField("courseSlug", slug)}
                    />
                  )}
                  {step === 2 && (
                    <Step2 data={formData} onChange={updateField} t={t} />
                  )}
                  {step === 3 && (
                    <Step3 data={formData} onChange={updateField} t={t} />
                  )}
                  {step === 4 && (
                    <Step4
                      data={formData}
                      onEdit={go}
                      onSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      submitError={submitError}
                      t={t}
                    />
                  )}
                </div>

                {/* Navigation buttons (not shown on step 4 which has its own submit) */}
                {step < 4 && (
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={handleBack}
                      disabled={step === 1}
                      className="min-w-[100px]"
                    >
                      {t("back")}
                    </Button>

                    <Button
                      type="button"
                      size="lg"
                      onClick={handleNext}
                      disabled={!canAdvance()}
                      className="min-w-[120px] glow"
                    >
                      {t("next")}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
