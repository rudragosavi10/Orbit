"use client";

import Image from "next/image";
import { LogOut, UserRound, X } from "lucide-react";
import { signOut, type User } from "firebase/auth";

import { auth } from "@/firebase/config";

interface ProfileMenuProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenu({
  user,
  isOpen,
  onClose,
}: ProfileMenuProps) {
  const username =
    user?.displayName?.trim() ||
    user?.email?.split("@")[0] ||
    "Orbit User";

  const email = user?.email || "Email unavailable";
  const avatar = user?.photoURL;

  async function handleSignOut() {
    try {
      await signOut(auth);
      onClose();
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close profile menu"
        onClick={onClose}
        className="fixed inset-0 z-40 cursor-default bg-black/10"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label="User profile"
        className="fixed right-3 top-24 z-50 w-[calc(100%-1.5rem)] max-w-[390px] rounded-[2rem] bg-slate-100 p-6 shadow-2xl sm:right-6 md:right-8"
      >
        <div className="relative flex min-h-10 items-center justify-center px-12">
          <p className="break-all text-center text-sm font-semibold text-slate-800 sm:text-base">
            {email}
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile menu"
            className="absolute right-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-950"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-7 flex flex-col items-center text-center">
          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-white shadow-md">
            {avatar ? (
              <Image
                src={avatar}
                alt={`${username} avatar`}
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <UserRound className="h-16 w-16 fill-current" />
            )}
          </div>

          <h2 className="mt-5 text-2xl font-semibold text-slate-950">
            {username}
          </h2>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white text-base font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign out</span>
          </button>
        </div>
      </section>
    </>
  );
}