import OnboardingOverlay from "@/components/onboarding/onboarding-overlay";
import OnboardingCard from "@/components/onboarding/onboarding-card";
import AvatarCarousel from "@/components/onboarding/avatar-carousel";

export default function DashboardPage() {
  const firstLogin = true;

  return (
    <div className="relative min-h-screen bg-slate-100">
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-5xl font-bold">Orbit Dashboard</h1>
      </div>

      {firstLogin && (
        <OnboardingOverlay>
          <OnboardingCard>
            <h1 className="text-3xl font-bold">Welcome to Orbit</h1>

            <p className="mt-2 text-gray-500">
              Personalize your profile.
            </p>

            <div className="mt-8">
              <AvatarCarousel />
            </div>

          </OnboardingCard>
        </OnboardingOverlay>
      )}
    </div>
  );
}