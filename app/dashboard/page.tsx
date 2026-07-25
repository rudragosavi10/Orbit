import { AppShell } from "@/components/layout/app-shell";

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-card-foreground">
          Welcome to Orbit
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Your dashboard content will appear here.
        </p>
      </section>
    </AppShell>
  );
}