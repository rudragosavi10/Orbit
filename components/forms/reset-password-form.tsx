"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { PasswordInput } from "@/components/auth/password-input";
import { AuthFooter } from "@/components/auth/auth-footer";

export function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: ResetPasswordFormData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>

        <PasswordInput
          id="password"
          autoComplete="new-password"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>

        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Updating Password..."
          : "Update Password"}
      </Button>

      <AuthFooter
        text="Remember your password?"
        linkText="Back to Sign In"
        href="/login"
      />
    </form>
  );
}