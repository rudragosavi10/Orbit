import { AppShell } from "@/components/layout/app-shell";

import OnboardingOverlay from "@/components/onboarding/onboarding-overlay";
import OnboardingCard from "@/components/onboarding/onboarding-card";
import OnboardingForm from "@/components/onboarding/onboarding-form";

export default function DashboardPage() {
  const firstLogin = true;

  return (
    <AppShell>
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome to Orbit
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Your dashboard content will appear here.
        </p>
      </section>

      {firstLogin && (
        <OnboardingOverlay>
          <OnboardingCard>
            <OnboardingForm />
          </OnboardingCard>
        </OnboardingOverlay>
      )}
    </AppShell>
  );
}