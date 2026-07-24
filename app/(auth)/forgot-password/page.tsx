import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthHeader } from "@/components/auth/auth-header";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Forgot Password?"
          description="Enter your email and we'll send you a password reset link."
        />

        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}