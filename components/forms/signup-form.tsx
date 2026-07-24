"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import {
  signupSchema,
  type SignupFormData,
} from "@/lib/validations/auth";

import { auth } from "@/firebase/config";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PasswordInput } from "@/components/auth/password-input";
import { AuthDivider } from "@/components/auth/auth-divider";
import { SocialLoginButton } from "@/components/auth/social-login-button";
import { AuthFooter } from "@/components/auth/auth-footer";

import { FormError } from "@/components/feedback/form-error";
import { GoogleIcon } from "@/components/icons/google-icon";

function getSignupErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Something went wrong. Please try again.";
  }

  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account already exists with this email.";

    case "auth/invalid-email":
      return "Enter a valid email address.";

    case "auth/weak-password":
      return "The password is too weak. Please use a stronger password.";

    case "auth/operation-not-allowed":
      return "Email and password signup is not enabled.";

    case "auth/network-request-failed":
      return "Check your internet connection and try again.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";

    case "auth/popup-closed-by-user":
      return "Google signup was cancelled.";

    case "auth/popup-blocked":
      return "Your browser blocked the Google signup popup.";

    case "auth/cancelled-popup-request":
      return "Another Google signup request is already open.";

    case "auth/account-exists-with-different-credential":
      return "This email is already connected to another sign-in method.";

    default:
      return "Unable to create your account. Please try again.";
  }
}

export function SignupForm() {
  const router = useRouter();

  const [formError, setFormError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupFormData): Promise<void> {
    setFormError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password,
      );

      await updateProfile(userCredential.user, {
        displayName: data.fullName.trim(),
      });

      await sendEmailVerification(userCredential.user);

      router.replace("/verify-email");
    } catch (error) {
      setFormError(getSignupErrorMessage(error));
    }
  }

  async function handleGoogleSignup(): Promise<void> {
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
      setFormError(getSignupErrorMessage(error));
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
        <Label htmlFor="fullName">Full Name</Label>

        <Input
          id="fullName"
          placeholder="John Doe"
          autoComplete="name"
          disabled={isLoading}
          {...register("fullName")}
        />

        <FormError message={errors.fullName?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
          {...register("email")}
        />

        <FormError message={errors.email?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <PasswordInput
          id="password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register("password")}
        />

        <FormError message={errors.password?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>

        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          disabled={isLoading}
          {...register("confirmPassword")}
        />

        <FormError message={errors.confirmPassword?.message} />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>

      <AuthDivider />

      <SocialLoginButton
        icon={<GoogleIcon />}
        onClick={handleGoogleSignup}
        disabled={isLoading}
      >
        {isGoogleLoading
          ? "Connecting to Google..."
          : "Continue with Google"}
      </SocialLoginButton>

      <AuthFooter
        text="Already have an account?"
        linkText="Sign In"
        href="/login"
      />
    </form>
  );
}