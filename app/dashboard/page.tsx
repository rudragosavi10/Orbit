"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";

import OnboardingOverlay from "@/components/onboarding/onboarding-overlay";
import OnboardingCard from "@/components/onboarding/onboarding-card";
import OnboardingForm from "@/components/onboarding/onboarding-form";

import { useUserProfile } from "@/hooks/use-user-profile";

export default function DashboardPage() {
  const { profile, loading } = useUserProfile();

  const [showOverlay, setShowOverlay] = useState<boolean | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (loading) return;

    // New user or no profile -> show onboarding
    if (!profile || !profile.onboardingCompleted) {
      setShowOverlay(true);
      setIsClosing(false);
      return;
    }

    // Existing onboarded user
    setIsClosing(true);

    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [loading, profile]);

  if (loading || showOverlay === null) {
    return null;
  }

  return (
    <>
      <AppShell />

      {showOverlay && (
        <OnboardingOverlay closing={isClosing}>
          <OnboardingCard closing={isClosing}>
            <OnboardingForm />
          </OnboardingCard>
        </OnboardingOverlay>
      )}
    </>
  );
}