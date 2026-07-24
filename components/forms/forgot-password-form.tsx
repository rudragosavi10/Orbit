"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "@/firebase/config";
import { loginSchema } from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AuthFooter } from "@/components/auth/auth-footer";
import { FormError } from "@/components/feedback/form-error";

type ForgotPasswordFormData = {
  email: string;
};

function getResetPasswordErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Something went wrong. Please try again.";
  }

  switch (error.code) {
    case "auth/invalid-email":
      return "Enter a valid email address.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "auth/too-many-requests":
      return "Too many requests. Please wait and try again.";

    case "auth/network-request-failed":
      return "Check your internet connection and try again.";

    case "auth/operation-not-allowed":
      return "Password reset is currently unavailable.";

    default:
      return "Unable to send the reset link. Please try again.";
  }
}

export function ForgotPasswordForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  async function onSubmit(
    data: ForgotPasswordFormData,
  ): Promise<void> {
    setFormError(null);
    setSuccessMessage(null);

    try {
      await sendPasswordResetEmail(
        auth,
        data.email.trim(),
      );

      setSuccessMessage(
        "Password reset link sent. Please check your email inbox and spam folder.",
      );
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/user-not-found"
      ) {
        setSuccessMessage(
          "If an account exists for this email, a password reset link has been sent.",
        );
        return;
      }

      setFormError(getResetPasswordErrorMessage(error));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {formError ? (
        <FormError message={formError} />
      ) : null}

      {successMessage ? (
        <div
          role="status"
          className="rounded-md border border-green-600/30 bg-green-600/10 p-3 text-sm text-green-700 dark:text-green-400"
        >
          {successMessage}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isSubmitting}
          {...register("email")}
        />

        <FormError message={errors.email?.message} />
      </div>

      <p className="text-sm text-muted-foreground">
        We&apos;ll email you a secure password reset link if an
        account exists for this email address.
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