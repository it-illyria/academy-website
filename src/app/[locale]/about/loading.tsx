export default function AboutLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="flex flex-col items-center gap-5 py-12 text-center">
          <div className="h-7 w-32 animate-pulse rounded-full bg-primary/10" />
          <div className="h-12 w-[70%] max-w-2xl animate-pulse rounded-xl bg-muted/30" />
          <div className="h-6 w-[60%] max-w-xl animate-pulse rounded-lg bg-muted/20" />
          <div className="h-6 w-[50%] max-w-lg animate-pulse rounded-lg bg-muted/15" />
        </div>

        {/* Two-column content */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Left column — text blocks */}
          <div className="space-y-6">
            <div className="h-7 w-40 animate-pulse rounded-lg bg-muted/25" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 animate-pulse rounded bg-muted/15"
                  style={{ width: `${85 - i * 5}%`, animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
            <div className="mt-6 h-7 w-36 animate-pulse rounded-lg bg-muted/25" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 animate-pulse rounded bg-muted/15"
                  style={{ width: `${90 - i * 8}%`, animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Right column — stat / value cards */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/30 bg-card/30 p-5"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="h-10 w-10 animate-pulse rounded-lg bg-primary/10" />
                <div className="mt-3 h-5 w-3/4 animate-pulse rounded-md bg-muted/20" />
                <div className="mt-2 h-4 w-full animate-pulse rounded bg-muted/10" />
                <div className="mt-1 h-4 w-5/6 animate-pulse rounded bg-muted/10" />
              </div>
            ))}
          </div>
        </div>

        {/* FAQ skeleton */}
        <div className="mt-20">
          <div className="mx-auto h-9 w-56 animate-pulse rounded-xl bg-muted/25" />
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-xl border border-border/30 bg-card/20"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
