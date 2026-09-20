export default function BlogLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-56 animate-pulse rounded-xl bg-muted/30" />
          <div className="mx-auto mt-4 h-6 w-[55%] max-w-lg animate-pulse rounded-lg bg-muted/20" />
        </div>

        {/* Blog card grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border/30 bg-card/30"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Thumbnail area */}
              <div className="h-48 w-full animate-pulse bg-muted/20" />
              <div className="p-5">
                {/* Category tag + read time */}
                <div className="flex items-center gap-3">
                  <div className="h-5 w-20 animate-pulse rounded-full bg-primary/10" />
                  <div className="h-4 w-16 animate-pulse rounded bg-muted/15" />
                </div>
                {/* Title */}
                <div className="mt-3 h-6 w-5/6 animate-pulse rounded-md bg-muted/25" />
                <div className="mt-2 h-6 w-3/4 animate-pulse rounded-md bg-muted/20" />
                {/* Excerpt */}
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-muted/10" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-muted/10" />
                </div>
                {/* Author + date */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-muted/20" />
                  <div className="h-4 w-28 animate-pulse rounded bg-muted/15" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
