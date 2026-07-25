"use client";

import Image from "next/image";
import { Menu, CircleUserRound } from "lucide-react";
interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-12 bg-background/95 backdrop-blur">
      <div className="relative z-10 flex h-full items-center justify-between">
        <div className="flex h-full w-52 items-center px-3 md:px-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Image
            src="/orbit-logo.png.jpeg"
            alt="Orbit logo"
            width={230}
            height={60}
            priority
            className="h-13 w-auto object-contain"
          />
        </div>

        <div className="flex items-center px-3 md:px-4">
          <button
  type="button"
  aria-label="User profile"
  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
>
  <CircleUserRound className="h-6 w-6" />
</button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-border" />
    </header>
  );
}