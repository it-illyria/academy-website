import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courses";
import { CATEGORY_LABELS, COURSE_NAMES, type FormData } from "./types";

export function Step4({
  data,
  onEdit,
  onSubmit,
  isSubmitting,
  submitError,
  t,
}: {
  data: FormData;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const course = courses.find((c) => c.slug === data.courseSlug);

  const experienceMap: Record<string, string> = {
    none: t("experience_none"),
    basic: t("experience_basic"),
    intermediate: t("experience_intermediate"),
    advanced: t("experience_advanced"),
  };
  const formatMap: Record<string, string> = {
    online: t("format_online"),
    physical: t("format_physical"),
    hybrid: t("format_hybrid"),
  };

  return (
    <div className="space-y-4">
      {/* Program section */}
      <div className="rounded-xl border border-border/40 bg-card/40 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t("review_program")}
          </span>
          <button
            type="button"
            onClick={() => onEdit(1)}
            className="text-xs font-medium text-primary hover:underline"
          >
            {t("edit")}
          </button>
        </div>
        {course && (
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold">{COURSE_NAMES[course.slug]}</p>
              <p className="text-sm text-muted-foreground">
                {CATEGORY_LABELS[course.category]}
                {course.price !== undefined && ` · ${course.price}€`} ·{" "}
                {course.totalHours}h
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Personal information section */}
      <div className="rounded-xl border border-border/40 bg-card/40 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t("review_info")}
          </span>
          <button
            type="button"
            onClick={() => onEdit(2)}
            className="text-xs font-medium text-primary hover:underline"
          >
            {t("edit")}
          </button>
        </div>
        <dl className="grid gap-1.5 sm:grid-cols-2 text-sm">
          <div>
            <dt className="text-muted-foreground">{t("name")}</dt>
            <dd className="font-medium">{data.fullName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t("email")}</dt>
            <dd className="font-medium">{data.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t("phone")}</dt>
            <dd className="font-medium">{data.phone}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t("dob")}</dt>
            <dd className="font-medium">{data.dob}</dd>
          </div>
        </dl>
      </div>

      {/* Preferences section */}
      <div className="rounded-xl border border-border/40 bg-card/40 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t("review_prefs")}
          </span>
          <button
            type="button"
            onClick={() => onEdit(3)}
            className="text-xs font-medium text-primary hover:underline"
          >
            {t("edit")}
          </button>
        </div>
        <dl className="grid gap-1.5 sm:grid-cols-2 text-sm">
          <div>
            <dt className="text-muted-foreground">{t("experience")}</dt>
            <dd className="font-medium">{experienceMap[data.experience]}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t("format_pref")}</dt>
            <dd className="font-medium">{formatMap[data.format]}</dd>
          </div>
          {data.message && (
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">{t("message")}</dt>
              <dd className="font-medium">{data.message}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Submit button */}
      {submitError && (
        <p role="alert" aria-live="assertive" className="text-sm text-destructive text-center">{submitError}</p>
      )}
      <Button
        type="button"
        size="lg"
        className="w-full glow mt-2"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? t("submitting") : t("confirm_submit")}
      </Button>

      <p className="text-center text-xs text-muted-foreground">{t("terms")}</p>
    </div>
  );
}
