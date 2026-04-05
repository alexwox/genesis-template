import type { ReactNode } from "react";

type OrganizationShellHeroProps = {
  aside: ReactNode;
  description: string;
  kicker: string;
  title: string;
};

export function OrganizationShellHero({
  aside,
  description,
  kicker,
  title,
}: OrganizationShellHeroProps) {
  return (
    <section className="rounded-4xl border border-border/60 bg-background/90 p-8 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">{kicker}</p>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
