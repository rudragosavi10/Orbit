"use client";

import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-12 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-full items-center">
        <div className="flex h-full w-52 items-center gap-2 px-3 md:px-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
              O
            </div>

            <span className="text-sm font-semibold tracking-tight text-foreground">
              Orbit
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end px-3 md:px-4">
          <button
            type="button"
            aria-label="User profile"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-muted text-[10px] font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            U
          </button>
        </div>
      </div>
    </header>
  );
}