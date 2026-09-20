export default function ScheduleLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-64 animate-pulse rounded-xl bg-muted/30" />
          <div className="mx-auto mt-4 h-6 w-[55%] max-w-lg animate-pulse rounded-lg bg-muted/20" />
        </div>

        {/* Filter tabs */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-9 w-28 shrink-0 animate-pulse rounded-lg bg-muted/20"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>

        {/* Cohort cards */}
        <div className="mt-8 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/30 bg-card/20 p-6"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-6 w-48 animate-pulse rounded-lg bg-muted/25" />
                  <div className="flex gap-3">
                    <div className="h-4 w-32 animate-pulse rounded bg-muted/15" />
                    <div className="h-4 w-24 animate-pulse rounded bg-muted/15" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-7 w-20 animate-pulse rounded-full bg-primary/10" />
                  <div className="h-9 w-28 animate-pulse rounded-lg bg-primary/10" />
                </div>
              </div>
              {/* Schedule grid */}
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="h-14 animate-pulse rounded-lg bg-muted/10"
                    style={{ animationDelay: `${(i * 3 + j) * 60}ms` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
