import { AuthCard } from "@/components/auth/auth-card";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <AuthLayout>
  <AuthCard>
    <AuthHeader
      title="Welcome Back"
      description="Sign in to continue to Orbit."
    />

    <LoginForm />
  </AuthCard>
</AuthLayout>
  );
}