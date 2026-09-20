export default function ContactLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="h-12 w-56 animate-pulse rounded-xl bg-muted/30" />
        <div className="mt-3 h-6 w-[50%] animate-pulse rounded-lg bg-muted/20" />

        {/* Two-column layout */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Left — contact info cards */}
          <div className="space-y-5">
            {/* Contact method cards */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-4"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-10 w-10 animate-pulse rounded-lg bg-primary/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted/20" />
                  <div className="h-3 w-40 animate-pulse rounded bg-muted/15" />
                </div>
              </div>
            ))}

            {/* Map / address block */}
            <div className="mt-4 h-40 animate-pulse rounded-xl bg-muted/10 border border-border/30" />
          </div>

          {/* Right — form skeleton */}
          <div className="rounded-xl border border-border/30 bg-card/20 p-8">
            <div className="h-7 w-40 animate-pulse rounded-lg bg-muted/25" />
            <div className="mt-6 space-y-5">
              {/* Name + email row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 w-16 animate-pulse rounded bg-muted/20" />
                  <div className="h-10 w-full animate-pulse rounded-lg bg-muted/10" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted/20" />
                  <div className="h-10 w-full animate-pulse rounded-lg bg-muted/10" />
                </div>
              </div>
              {/* Subject */}
              <div className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted/20" />
                <div className="h-10 w-full animate-pulse rounded-lg bg-muted/10" />
              </div>
              {/* Message */}
              <div className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-muted/20" />
                <div className="h-32 w-full animate-pulse rounded-lg bg-muted/10" />
              </div>
              {/* Submit */}
              <div className="h-11 w-full animate-pulse rounded-lg bg-primary/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
