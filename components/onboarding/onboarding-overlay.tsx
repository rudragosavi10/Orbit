"use client";

import { ReactNode } from "react";

interface OnboardingOverlayProps {
  children: ReactNode;
  closing?: boolean;
}

export default function OnboardingOverlay({
  children,
  closing = false,
}: OnboardingOverlayProps) {
  return (
    <div
      className={`
        fixed inset-0 z-50
        flex items-center justify-center
        px-6
        transition-all
        duration-700
        ease-out

        ${
          closing
            ? "opacity-0 backdrop-blur-none"
            : "opacity-100 backdrop-blur-2xl"
        }
      `}
    >
      {children}
    </div>
  );
}