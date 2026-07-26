"use client";

import { useState } from "react";
import { updateProfile } from "firebase/auth";

import { auth } from "@/firebase/config";
import { useUserProfile } from "@/hooks/use-user-profile";
import { avatars } from "@/lib/avatars";
import { createUserProfile } from "@/lib/services/user.service";

import AvatarCarousel from "./avatar-carousel";
import ContinueButton from "./continue-button";
import UsernameInput from "./username-input";

function generateUsername(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function getAvatarUrl(avatar: unknown): string {
  if (typeof avatar === "string") {
    return avatar;
  }

  if (typeof avatar !== "object" || avatar === null) {
    throw new Error("The selected avatar is invalid.");
  }

  const avatarRecord = avatar as Record<string, unknown>;

  const possibleUrl =
    avatarRecord.src ??
    avatarRecord.url ??
    avatarRecord.path ??
    avatarRecord.image;

  if (typeof possibleUrl !== "string" || !possibleUrl.trim()) {
    throw new Error(
      "The selected avatar does not contain a valid image path.",
    );
  }

  return possibleUrl;
}

export default function OnboardingForm() {
  const { refreshProfile } = useUserProfile();

  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const [username, setUsername] = useState(() => {
    const displayName = auth.currentUser?.displayName;

    return displayName ? generateUsername(displayName) : "";
  });

  const [loading, setLoading] = useState(false);

  const canContinue = username.trim().length >= 3;

  async function handleContinue() {
    const user = auth.currentUser;

    if (!user || loading || !canContinue) {
      return;
    }

    try {
      setLoading(true);

      const avatar = avatars[selectedAvatar];

      if (!avatar) {
        throw new Error("Please select a valid avatar.");
      }

      const avatarUrl = getAvatarUrl(avatar);
      const trimmedUsername = username.trim();

      await createUserProfile({
        uid: user.uid,
        email: user.email ?? "",
        fullName: user.displayName ?? "",
        username: trimmedUsername,
        avatar,
        onboardingCompleted: true,
      });

      await updateProfile(user, {
        displayName: trimmedUsername,
        photoURL: avatarUrl,
      });

      await user.reload();
      await refreshProfile();

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Unable to complete onboarding:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Welcome to Orbit 👋
        </h1>

        <p className="mx-auto max-w-md text-base leading-7 text-slate-500">
          Personalize your profile to start your learning journey.
        </p>
      </div>

      <div className="mt-10">
        <AvatarCarousel
          value={selectedAvatar}
          onChange={setSelectedAvatar}
        />
      </div>

      <div className="mt-10 w-full max-w-md">
        <UsernameInput
          value={username}
          onChange={setUsername}
        />
      </div>

      <div className="mt-8 w-full max-w-md">
        <ContinueButton
          disabled={!canContinue || loading}
          loading={loading}
          onClick={handleContinue}
        />
      </div>
    </div>
  );
}