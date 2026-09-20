import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary glow-text">404</h1>
        <div className="mt-4 text-4xl font-mono text-muted-foreground">&lt;/not-found&gt;</div>
        <p className="mt-6 text-lg text-muted-foreground max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 glow"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
