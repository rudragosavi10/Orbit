import { MailCheck } from "lucide-react";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthStatusCard } from "@/components/auth/auth-status-card";

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthStatusCard
          icon={<MailCheck className="h-8 w-8" />}
          title="Verify your email"
          description="We've sent a verification link to your email address. Please verify your account before signing in."
          buttonText="Back to Login"
          buttonHref="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
}