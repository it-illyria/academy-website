export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-zinc-800" />
        <div className="mb-6 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 w-24 animate-pulse rounded-lg bg-zinc-800" />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-zinc-900 border border-zinc-800" />
          ))}
        </div>
        <div className="mt-8 h-96 animate-pulse rounded-xl bg-zinc-900 border border-zinc-800" />
      </div>
    </div>
  );
}
