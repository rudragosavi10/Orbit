"use client";

import { useState } from "react";

interface UsernameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function UsernameInput({
  value,
  onChange,
}: UsernameInputProps) {
  const [focused, setFocused] = useState(false);

  const floating = focused || value.length > 0;

  return (
    <div className="space-y-3">
      <div className="relative">
        <label
          htmlFor="username"
          className={`
            pointer-events-none
            absolute
            z-20
            bg-white
            px-3
            font-semibold
            tracking-wide
            transition-all
            duration-300
            ease-out

            ${
              floating
                ? "left-1/2 -top-2 -translate-x-1/2 text-[13px] text-indigo-600"
                : "left-12 top-1/2 -translate-y-1/2 text-sm text-slate-500"
            }
          `}
        >
          Username
        </label>

        <span
          className={`
            pointer-events-none
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-lg
            font-medium
            transition-colors
            duration-300
            ${
              focused
                ? "text-indigo-500"
                : "text-slate-400"
            }
          `}
        >
          @
        </span>

        <input
          id="username"
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={value}
          placeholder={floating ? "Choose a username" : ""}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-[60px]
            w-full
            rounded-2xl
            border-2
            border-slate-200
            bg-white
            pl-12
            pr-5
            text-[15px]
            font-medium
            text-slate-900
            placeholder:text-slate-400
            transition-all
            duration-300
            outline-none

            hover:border-slate-300

            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-500/10
          "
        />
      </div>

      <p className="px-1 text-xs text-slate-500">
        This will be your unique identity across Orbit.
      </p>
    </div>
  );
}