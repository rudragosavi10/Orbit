"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import {
  Camera,
  Pencil,
} from "lucide-react";

import AvatarCarousel from "@/components/onboarding/avatar-carousel";

import { avatars } from "@/lib/avatars";
import { updateAccountProfile } from "@/lib/services/account.service";

import { useUserProfile } from "@/hooks/use-user-profile";

export function ProfileSettings() {
  const {
    profile,
    loading,
    refreshProfile,
  } = useUserProfile();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);

  const [saving, setSaving] = useState(false);
const [editingUsername, setEditingUsername] =
  useState(false);

const [editingFullName, setEditingFullName] =
  useState(false);

const [editingAvatar, setEditingAvatar] =
  useState(false);

  useEffect(() => {
    if (!profile) return;

    setUsername(profile.username);
    setFullName(profile.fullName);

    const index = avatars.findIndex(
      (avatar) => avatar.id === profile.avatar.id
    );

    setAvatarIndex(index === -1 ? 0 : index);
  }, [profile]);

  const selectedAvatar = useMemo(
    () => avatars[avatarIndex],
    [avatarIndex]
  );

  const hasChanges = useMemo(() => {
    if (!profile) return false;

    return (
      username !== profile.username ||
      fullName !== profile.fullName ||
      selectedAvatar.id !== profile.avatar.id
    );
  }, [
    profile,
    username,
    fullName,
    selectedAvatar,
  ]);

  async function handleSave() {
    if (!profile || saving) {
      return;
    }

    try {
      setSaving(true);

      await updateAccountProfile({
        username: username.trim(),
        fullName: fullName.trim(),
        avatar: selectedAvatar,
      });

      await refreshProfile();
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

return (
  <div className="mx-auto max-w-4xl">

    <section className="flex flex-col">

      <div className="flex flex-col items-center py-12">

        <div className="flex flex-col items-center">

  {!editingAvatar ? (

    <button
      type="button"
      onClick={() => setEditingAvatar(true)}
      className="group relative h-32 w-32 overflow-hidden rounded-full transition-transform hover:scale-105"
    >

      <Image
        src={selectedAvatar.image}
        alt={profile.username}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">

        <Camera
          size={22}
          className="translate-y-2 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        />

        <span className="mt-1 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          Change
        </span>

      </div>

    </button>

  ) : (

    <div className="w-full max-w-xl">

      <AvatarCarousel
        value={avatarIndex}
        onChange={setAvatarIndex}
      />

      <div className="mt-6 flex justify-center gap-3">

        <button
          onClick={() => {
            if (profile) {
              const index = avatars.findIndex(
                (a) => a.id === profile.avatar.id
              );

              setAvatarIndex(index === -1 ? 0 : index);
            }

            setEditingAvatar(false);
          }}
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            await handleSave();
            setEditingAvatar(false);
          }}
          disabled={saving}
          className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Avatar"}
        </button>

      </div>

    </div>

  )}

  <h2 className="mt-6 text-3xl font-bold text-slate-900">
    {fullName}
  </h2>

  <p className="mt-2 text-slate-500">
    @{username}
  </p>

</div>

      </div>

      <div className="border-t border-slate-200">

        <div className="px-8 py-6">

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">

            Personal Information

          </p>

        </div>        {/* Username */}

        <div className="border-t border-slate-200 px-8 py-6">

          <div className="flex items-start justify-between">

            <div className="flex-1">

              <p className="text-sm font-medium text-slate-500">
                Username
              </p>

              {!editingUsername ? (
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  @{username}
                </p>
              ) : (
                <div className="mt-4 space-y-4">

                  <input
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-indigo-500"
                  />

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        setEditingUsername(false)
                      }
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={async () => {
                        await handleSave();
                        setEditingUsername(false);
                      }}
                      disabled={saving}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>

                  </div>

                </div>
              )}

            </div>

            {!editingUsername && (
              <button
                onClick={() =>
                  setEditingUsername(true)
                }
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <Pencil size={16} />
                Edit
              </button>
            )}

          </div>

        </div>        {/* Full Name */}

        <div className="border-t border-slate-200 px-8 py-6">

          <div className="flex items-start justify-between">

            <div className="flex-1">

              <p className="text-sm font-medium text-slate-500">
                Full Name
              </p>

              {!editingFullName ? (
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {fullName}
                </p>
              ) : (
                <div className="mt-4 space-y-4">

                  <input
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-indigo-500"
                  />

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        setEditingFullName(false)
                      }
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={async () => {
                        await handleSave();
                        setEditingFullName(false);
                      }}
                      disabled={saving}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>

                  </div>

                </div>
              )}

            </div>

            {!editingFullName && (
              <button
                onClick={() =>
                  setEditingFullName(true)
                }
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <Pencil size={16} />
                Edit
              </button>
            )}

          </div>

        </div>        {/* Email */}

        <div className="border-t border-slate-200 px-8 py-6">

          <p className="text-sm font-medium text-slate-500">
            Email
          </p>

          <p className="mt-2 text-lg font-semibold text-slate-900">
            {profile.email}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Managed by your login provider.
          </p>

        </div>

      </div>

    </section>

  </div>
);
}