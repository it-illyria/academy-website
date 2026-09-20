export default function EnrollLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Page header */}
        <div className="text-center">
          <div className="mx-auto h-10 w-48 animate-pulse rounded-xl bg-muted/30" />
          <div className="mx-auto mt-3 h-5 w-[70%] animate-pulse rounded-lg bg-muted/20" />
        </div>

        {/* Step indicator */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="flex h-9 w-9 animate-pulse items-center justify-center rounded-full bg-muted/20"
                style={{ animationDelay: `${i * 80}ms` }}
              />
              {i < 3 && (
                <div className="h-1 w-10 animate-pulse rounded bg-muted/15" />
              )}
            </div>
          ))}
        </div>
        {/* Step label */}
        <div className="mt-3 flex justify-center">
          <div className="h-4 w-32 animate-pulse rounded bg-muted/15" />
        </div>

        {/* Form card */}
        <div className="mt-8 rounded-xl border border-border/30 bg-card/20 p-8">
          {/* Step title */}
          <div className="h-7 w-52 animate-pulse rounded-lg bg-muted/25" />
          <div className="mt-2 h-4 w-[65%] animate-pulse rounded bg-muted/15" />

          {/* Choice cards grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/40 bg-card/30 p-5"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-10 w-10 animate-pulse rounded-lg bg-muted/20" />
                <div className="mt-3 h-5 w-3/4 animate-pulse rounded-md bg-muted/20" />
                <div className="mt-2 h-3 w-full animate-pulse rounded bg-muted/10" />
                <div className="mt-1 h-3 w-5/6 animate-pulse rounded bg-muted/10" />
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            <div className="h-10 w-24 animate-pulse rounded-lg bg-muted/20" />
            <div className="h-10 w-28 animate-pulse rounded-lg bg-primary/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
