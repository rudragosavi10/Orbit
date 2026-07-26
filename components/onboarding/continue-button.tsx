"use client";

import { ArrowRight, Loader2 } from "lucide-react";

interface ContinueButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export default function ContinueButton({
  disabled = false,
  loading = false,
  onClick,
}: ContinueButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className="
        group
        relative
        flex
        h-14
        w-full
        items-center
        justify-center
        gap-2
        overflow-hidden
        rounded-2xl

        bg-gradient-to-r
        from-indigo-600
        via-indigo-600
        to-violet-600

        px-6

        text-base
        font-semibold
        text-white

        shadow-[0_12px_35px_rgba(79,70,229,0.28)]

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:from-indigo-500
        hover:to-violet-500
        hover:shadow-[0_18px_45px_rgba(79,70,229,0.38)]

        active:scale-[0.985]

        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:hover:translate-y-0
      "
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white/10" />

      <span className="relative flex items-center gap-2">
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            Continue
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </>
        )}
      </span>
    </button>
  );
}