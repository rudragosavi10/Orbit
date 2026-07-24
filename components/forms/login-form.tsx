"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  reload,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { SocialLoginButton } from "@/components/auth/social-login-button";
import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthFooter } from "@/components/auth/auth-footer";
import { PasswordInput } from "@/components/auth/password-input";
import { GoogleIcon } from "@/components/icons/google-icon";
import { FormError } from "@/components/feedback/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/config";
import {
  loginSchema,
  type LoginFormData,
} from "@/lib/validations/auth";

function getLoginErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Something went wrong. Please try again.";
  }

  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "The email or password is incorrect.";

    case "auth/invalid-email":
      return "Enter a valid email address.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "auth/too-many-requests":
      return "Too many login attempts. Please wait and try again.";

    case "auth/network-request-failed":
      return "Check your internet connection and try again.";

    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";

    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in popup.";

    case "auth/cancelled-popup-request":
      return "Another Google sign-in request is already open.";

    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using another sign-in method.";

    default:
      return "Unable to sign in. Please try again.";
  }
}

export function LoginForm() {
  const router = useRouter();

  const [formError, setFormError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData): Promise<void> {
    setFormError(null);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password,
      );

      await reload(credential.user);

      if (!credential.user.emailVerified) {
        router.replace("/verify-email");
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      setFormError(getLoginErrorMessage(error));
    }
  }

  async function handleGoogleSignIn(): Promise<void> {
    setFormError(null);
    setIsGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      await signInWithPopup(auth, provider);

      router.replace("/dashboard");
    } catch (error) {
      setFormError(getLoginErrorMessage(error));
    } finally {
      setIsGoogleLoading(false);
    }
  }

  const isLoading = isSubmitting || isGoogleLoading;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {formError ? <FormError message={formError} /> : null}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          disabled={isLoading}
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
          autoComplete="current-password"
          disabled={isLoading}
          {...register("password")}
        />

        <FormError message={errors.password?.message} />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>

      <AuthDivider />

      <SocialLoginButton
        icon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        {isGoogleLoading
          ? "Connecting to Google..."
          : "Continue with Google"}
      </SocialLoginButton>

      <AuthFooter
        text="Don't have an account?"
        linkText="Create one"
        href="/signup"
      />
    </form>
  );
}