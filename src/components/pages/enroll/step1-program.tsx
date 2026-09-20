import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { courses } from "@/lib/courses";
import { CATEGORY_LABELS, COURSE_NAMES, type FormData } from "./types";

export function Step1({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {courses.map((course) => {
        const isSelected = data.courseSlug === course.slug;
        return (
          <button
            key={course.slug}
            type="button"
            onClick={() => onChange(course.slug)}
            className={[
              "group relative rounded-xl border-2 p-4 text-left transition-all duration-200",
              isSelected
                ? "border-primary bg-primary/5 shadow-[0_0_20px_oklch(var(--primary)/0.25)]"
                : "border-border/40 bg-card/40 hover:border-primary/40 hover:bg-primary/5",
            ].join(" ")}
          >
            {/* Category badge */}
            <div className="mb-3 flex items-start justify-between gap-2">
              <Badge
                variant="outline"
                className={[
                  "text-xs",
                  course.category === "webdev"
                    ? "border-cyber/40 bg-cyber/10 text-cyber"
                    : "border-[oklch(0.7_0.15_320)]/40 bg-[oklch(0.7_0.15_320)]/10 text-[oklch(0.7_0.15_320)]",
                ].join(" ")}
              >
                {CATEGORY_LABELS[course.category]}
              </Badge>
              {/* Checkmark */}
              <div
                className={[
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/50",
                ].join(" ")}
              >
                {isSelected && <Check className="h-3 w-3" />}
              </div>
            </div>

            {/* Course name */}
            <p className="font-semibold text-foreground leading-snug">
              {COURSE_NAMES[course.slug]}
            </p>

            {/* Price & hours */}
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              {course.price !== undefined && (
                <>
                  <span className="font-medium text-foreground">
                    {course.price}€
                  </span>
                  <span>•</span>
                </>
              )}
              <span>{course.totalHours}h</span>
              <span>•</span>
              <span>{course.weeks}w</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
