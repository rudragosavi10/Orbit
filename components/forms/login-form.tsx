"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { SocialLoginButton } from "@/components/auth/social-login-button";
import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthFooter } from "@/components/auth/auth-footer";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";
import { FormError } from "@/components/feedback/form-error";
import {
  loginSchema,
  type LoginFormData,
} from "@/lib/validations/auth";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />

        <FormError message={errors.email?.message} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">
            Password
          </Label>

          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <PasswordInput
          id="password"
          placeholder="Enter your password"
          {...register("password")}
        />

        <FormError message={errors.password?.message} />
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        Sign In
      </Button>
      <AuthDivider />

<SocialLoginButton icon={<GoogleIcon />}>
  Continue with Google
</SocialLoginButton>

<AuthFooter
  text="Don't have an account?"
  linkText="Create one"
  href="/signup"
/>
    </form>
  );
}
