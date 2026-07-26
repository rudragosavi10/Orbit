"use client";

import { ReactNode } from "react";

interface OnboardingCardProps {
  children: ReactNode;
  closing?: boolean;
}

export default function OnboardingCard({
  children,
  closing = false,
}: OnboardingCardProps) {
  return (
    <div
      className={`
        relative
        w-full
        max-w-xl
        rounded-[32px]
        border
        border-white/30
        bg-white/75
        backdrop-blur-3xl
        shadow-[0_25px_80px_rgba(15,23,42,0.18)]
        px-10
        py-10
        transition-all
        duration-700
        ease-out

        ${
          closing
            ? "opacity-0 scale-95 translate-y-6"
            : "opacity-100 scale-100 translate-y-0"
        }
      `}
    >
      {/* Soft gradient glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/50 via-transparent to-slate-100/40" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}