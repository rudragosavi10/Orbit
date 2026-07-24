import { AuthCard } from "@/components/auth/auth-card";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupForm } from "@/components/forms/signup-form";

export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create your account"
          description="Join Orbit and start learning smarter."
        />

        <SignupForm />
      </AuthCard>
    </AuthLayout>
  );
}