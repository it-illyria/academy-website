export default function PlaygroundLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-64 animate-pulse rounded-xl bg-muted/30" />
          <div className="mx-auto mt-4 h-6 w-[55%] max-w-lg animate-pulse rounded-lg bg-muted/20" />
        </div>

        {/* Editor + preview layout */}
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {/* Code editor panel */}
          <div className="overflow-hidden rounded-xl border border-border/30 bg-card/20">
            {/* Editor toolbar */}
            <div className="flex items-center gap-2 border-b border-border/30 bg-card/30 px-4 py-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-muted/30" />
              <div className="h-3 w-3 animate-pulse rounded-full bg-muted/25" />
              <div className="h-3 w-3 animate-pulse rounded-full bg-muted/20" />
              <div className="ml-4 h-5 w-24 animate-pulse rounded bg-muted/20" />
            </div>
            {/* Code lines */}
            <div className="p-5 space-y-2 font-mono">
              {[100, 70, 85, 55, 90, 65, 75, 50, 80, 60, 45, 70].map((w, i) => (
                <div
                  key={i}
                  className="h-4 animate-pulse rounded bg-muted/10"
                  style={{ width: `${w}%`, animationDelay: `${i * 40}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Preview panel */}
          <div className="overflow-hidden rounded-xl border border-border/30 bg-card/20">
            {/* Preview toolbar */}
            <div className="flex items-center gap-3 border-b border-border/30 bg-card/30 px-4 py-3">
              <div className="h-5 w-16 animate-pulse rounded bg-muted/20" />
              <div className="ml-auto h-7 w-24 animate-pulse rounded-lg bg-primary/10" />
            </div>
            {/* Preview content placeholder */}
            <div className="p-5 space-y-4">
              <div className="h-8 w-3/4 animate-pulse rounded-lg bg-muted/15" />
              <div className="h-4 w-full animate-pulse rounded bg-muted/10" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted/10" />
              <div className="mt-4 h-32 w-full animate-pulse rounded-lg bg-muted/10" />
            </div>
          </div>
        </div>

        {/* Run button */}
        <div className="mt-4 flex justify-end">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-primary/10" />
        </div>
      </div>
    </div>
  );
}
