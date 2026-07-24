"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AuthFooter } from "@/components/auth/auth-footer";

type ForgotPasswordFormData = {
  email: string;
};

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(loginSchema.pick({ email: true })),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordFormData) {
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
          placeholder="name@example.com"
          autoComplete="email"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        We&apos;ll email you a secure password reset link if an account
exists for this email address.
      </p>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </Button>

      <AuthFooter
        text="Remember your password?"
        linkText="Back to Sign In"
        href="/login"
      />
    </form>
  );
}