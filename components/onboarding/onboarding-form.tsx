"use client";

import { useEffect, useState } from "react";

import { auth } from "@/firebase/config";

import { avatars } from "@/lib/avatars";
import { createUserProfile } from "@/lib/services/user.service";
import { useUserProfile } from "@/hooks/use-user-profile";

import AvatarCarousel from "./avatar-carousel";
import UsernameInput from "./username-input";
import ContinueButton from "./continue-button";

function generateUsername(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

export default function OnboardingForm() {
  const { refreshProfile } = useUserProfile();

  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const displayName = auth.currentUser?.displayName;

    if (!displayName) return;

    setUsername(generateUsername(displayName));
  }, []);

  const canContinue = username.trim().length >= 3;

  async function handleContinue() {
    const user = auth.currentUser;

    if (!user || loading) return;

    try {
      setLoading(true);

      const avatar = avatars[selectedAvatar];

      await createUserProfile({
        uid: user.uid,
        email: user.email ?? "",
        fullName: user.displayName ?? "",
        username: username.trim(),
        avatar,
        onboardingCompleted: true,
      });

      await refreshProfile();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center text-center">

      {/* Heading */}

      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Welcome to Orbit 👋
        </h1>

        <p className="mx-auto max-w-md text-base leading-7 text-slate-500">
          Personalize your profile to start your learning journey.
        </p>
      </div>

      {/* Avatar */}

      <div className="mt-10">
        <AvatarCarousel
          value={selectedAvatar}
          onChange={setSelectedAvatar}
        />
      </div>

      {/* Username */}

      <div className="mt-10 w-full max-w-md">
        <UsernameInput
          value={username}
          onChange={setUsername}
        />
      </div>

      {/* Button */}

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