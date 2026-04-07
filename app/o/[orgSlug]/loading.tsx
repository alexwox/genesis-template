export default function OrganizationLoading() {
  return (
    <>
      <section className="surface-shell-muted">
        <div className="h-5 w-28 surface-skeleton-bar rounded-full" />
        <div className="mt-4 h-10 w-64 surface-skeleton-bar" />
        <div className="mt-3 h-5 w-full max-w-xl surface-skeleton-line" />
        <div className="mt-2 h-5 w-full max-w-lg surface-skeleton-line" />
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-shell-muted">
          <div className="h-6 w-44 surface-skeleton-bar" />
          <div className="mt-5 h-5 w-full surface-skeleton-line" />
          <div className="mt-3 h-5 w-5/6 surface-skeleton-line" />
          <div className="mt-8 h-11 w-40 surface-skeleton-bar rounded-full" />
        </div>

        <div className="surface-shell-muted">
          <div className="h-6 w-48 surface-skeleton-bar" />
          <div className="mt-6 space-y-4">
            <div className="surface-skeleton-card" />
            <div className="surface-skeleton-card" />
            <div className="surface-skeleton-card" />
          </div>
        </div>
      </section>
    </>
  );
}
