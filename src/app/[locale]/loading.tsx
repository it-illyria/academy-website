export default function Loading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero skeleton */}
        <div className="flex flex-col items-center gap-6 py-16">
          <div className="h-8 w-48 animate-pulse rounded-full bg-primary/10" />
          <div className="h-14 w-[80%] max-w-2xl animate-pulse rounded-xl bg-muted/30" />
          <div className="h-14 w-[60%] max-w-xl animate-pulse rounded-xl bg-muted/20" />
          <div className="h-6 w-[70%] max-w-lg animate-pulse rounded-lg bg-muted/15" />
          <div className="mt-4 flex gap-4">
            <div className="h-11 w-36 animate-pulse rounded-lg bg-primary/10" />
            <div className="h-11 w-36 animate-pulse rounded-lg bg-muted/20" />
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/30 bg-card/30 p-6"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 animate-pulse rounded-xl bg-muted/20" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-muted/15" />
              </div>
              <div className="mt-4 h-5 w-3/4 animate-pulse rounded-md bg-muted/20" />
              <div className="mt-3 h-4 w-1/2 animate-pulse rounded-md bg-muted/15" />
              <div className="mt-4 h-4 w-full animate-pulse rounded-md bg-muted/10" />
              <div className="mt-2 h-4 w-5/6 animate-pulse rounded-md bg-muted/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
