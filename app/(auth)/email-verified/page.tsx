import { CheckCircle2 } from "lucide-react";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthStatusCard } from "@/components/auth/auth-status-card";

export default function EmailVerifiedPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthStatusCard
          icon={<CheckCircle2 className="h-8 w-8 text-green-500" />}
          title="Email Verified"
          description="Your email has been successfully verified."
          buttonText="Continue to Login"
          buttonHref="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
}