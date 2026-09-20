export default function ProgramsLoading() {
  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page title skeleton */}
        <div className="text-center">
          <div className="mx-auto h-12 w-72 animate-pulse rounded-xl bg-muted/30" />
          <div className="mx-auto mt-4 h-6 w-[60%] max-w-xl animate-pulse rounded-lg bg-muted/20" />
        </div>

        {/* Section heading skeleton */}
        <div className="mt-16">
          <div className="h-7 w-48 animate-pulse rounded-lg bg-muted/20" />

          {/* Course card grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/30 bg-card/30 p-6"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Icon + badge row */}
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 animate-pulse rounded-xl bg-muted/20" />
                  <div className="h-6 w-20 animate-pulse rounded-full bg-primary/10" />
                </div>
                {/* Course title */}
                <div className="mt-4 h-6 w-3/4 animate-pulse rounded-md bg-muted/25" />
                {/* Subtitle */}
                <div className="mt-2 h-4 w-1/2 animate-pulse rounded-md bg-muted/15" />
                {/* Description lines */}
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-muted/10" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-muted/10" />
                  <div className="h-3 w-4/6 animate-pulse rounded bg-muted/10" />
                </div>
                {/* Price + CTA row */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="h-8 w-16 animate-pulse rounded-lg bg-muted/20" />
                  <div className="h-9 w-28 animate-pulse rounded-lg bg-primary/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
