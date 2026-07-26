"use client";

import Image from "next/image";
import { Menu, UserRound } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-20 bg-slate-50">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <div className="flex h-full items-center">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
            className="mr-3 inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-950"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Image
            src="/orbit-logo.png.jpeg"
            alt="Orbit logo"
            width={320}
            height={90}
            priority
            className="h-16 w-auto object-contain"
          />
        </div>

        <button
          type="button"
          aria-label="User profile"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-black"
        >
          <UserRound className="h-7 w-7 fill-current" />
        </button>
      </div>
    </header>
  );
}