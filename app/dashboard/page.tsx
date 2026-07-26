"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";

import OnboardingOverlay from "@/components/onboarding/onboarding-overlay";
import OnboardingCard from "@/components/onboarding/onboarding-card";
import OnboardingForm from "@/components/onboarding/onboarding-form";

import { useUserProfile } from "@/hooks/use-user-profile";

export default function DashboardPage() {
  const { profile, loading } = useUserProfile();

  const [showOverlay, setShowOverlay] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (profile?.onboardingCompleted) {
      setIsClosing(true);

      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 800);

      return () => clearTimeout(timer);
    }

    setShowOverlay(true);
    setIsClosing(false);
  }, [loading, profile]);

  if (loading) {
    return null;
  }

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

      {showOverlay && (
        <OnboardingOverlay closing={isClosing}>
          <OnboardingCard closing={isClosing}>
            <OnboardingForm />
          </OnboardingCard>
        </OnboardingOverlay>
      )}
    </AppShell>
  );
}