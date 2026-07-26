"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, UserRound } from "lucide-react";

import { ProfileMenu } from "@/features/profile";
import { SettingsModal } from "@/features/settings/components/settings-modal";
import { useUserProfile } from "@/contexts/user-provider";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, profile } = useUserProfile();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const username =
    profile?.username ||
    user?.displayName?.trim() ||
    user?.email?.split("@")[0] ||
    "Orbit User";

const avatar = profile?.avatar?.image ?? user?.photoURL ?? null;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 h-20 bg-slate-50">
        <div className="flex h-full items-center justify-between">
          <div className="flex h-full items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center">
              <button
                type="button"
                onClick={onMenuClick}
                aria-label="Toggle sidebar"
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-950"
              >
                <Menu className="h-7 w-7" />
              </button>
            </div>

            <Image
              src="/1.svg"
              alt="Orbit logo"
              width={320}
              height={90}
              priority
              className="h-16 w-auto object-contain"
            />
          </div>

          <div className="pr-4 md:pr-8">
            <button
              type="button"
              onClick={() => setIsProfileOpen((current) => !current)}
              aria-label="Open user profile"
              aria-expanded={isProfileOpen}
              className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-1 transition-colors ${
                isProfileOpen
                  ? "bg-slate-200 ring-4 ring-slate-300"
                  : "hover:bg-slate-200"
              }`}
            >
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-white">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt={`${username} avatar`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <UserRound className="h-6 w-6 fill-current" />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      <ProfileMenu
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onSettingsClick={() => {
          setIsProfileOpen(false);

          setTimeout(() => {
            setIsSettingsOpen(true);
          }, 150);
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}