import { AuthCard } from "@/components/auth/auth-card";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create a New Password"
          description="Choose a strong password for your account."
        />
        <ResetPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}