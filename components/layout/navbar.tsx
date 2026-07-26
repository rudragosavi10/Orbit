"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, UserRound } from "lucide-react";
import { onAuthStateChanged, type User } from "firebase/auth";

import { auth } from "@/firebase/config";
import { ProfileMenu } from "@/features/profile";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const username =
    user?.displayName?.trim() ||
    user?.email?.split("@")[0] ||
    "Orbit User";

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
              onClick={() => {
                setIsProfileOpen((currentState) => !currentState);
              }}
              aria-label="Open user profile"
              aria-expanded={isProfileOpen}
              className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-1 transition-colors ${
                isProfileOpen
                  ? "bg-slate-200 ring-4 ring-slate-300"
                  : "hover:bg-slate-200"
              }`}
            >
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-white">
                {user?.photoURL ? (
                  <Image
                    src={user.photoURL}
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
      />
    </>
  );
}