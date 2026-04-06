export default function OrganizationLoading() {
  return (
    <>
      <section className="rounded-4xl border border-border/60 bg-background/90 p-8 shadow-sm">
        <div className="h-5 w-28 animate-pulse rounded-full bg-muted/60" />
        <div className="mt-4 h-10 w-64 animate-pulse rounded bg-muted/60" />
        <div className="mt-3 h-5 w-full max-w-xl animate-pulse rounded bg-muted/50" />
        <div className="mt-2 h-5 w-full max-w-lg animate-pulse rounded bg-muted/50" />
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-4xl border border-border/60 bg-background/90 p-8 shadow-sm">
          <div className="h-6 w-44 animate-pulse rounded bg-muted/60" />
          <div className="mt-5 h-5 w-full animate-pulse rounded bg-muted/50" />
          <div className="mt-3 h-5 w-5/6 animate-pulse rounded bg-muted/50" />
          <div className="mt-8 h-11 w-40 animate-pulse rounded-full bg-muted/60" />
        </div>

        <div className="rounded-4xl border border-border/60 bg-background/90 p-8 shadow-sm">
          <div className="h-6 w-48 animate-pulse rounded bg-muted/60" />
          <div className="mt-6 space-y-4">
            <div className="h-20 animate-pulse rounded-3xl border border-border/70 bg-muted/40" />
            <div className="h-20 animate-pulse rounded-3xl border border-border/70 bg-muted/40" />
            <div className="h-20 animate-pulse rounded-3xl border border-border/70 bg-muted/40" />
          </div>
        </div>
      </section>
    </>
  );
}
