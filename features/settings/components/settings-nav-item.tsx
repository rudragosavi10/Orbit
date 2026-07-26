"use client";

import type { LucideIcon } from "lucide-react";

import type { SettingsSection } from "../types";

interface SettingsNavItemProps {
  label: string;
  icon: LucideIcon;
  section: SettingsSection;
  activeSection: SettingsSection;
  onClick: (section: SettingsSection) => void;
}

export function SettingsNavItem({
  label,
  icon: Icon,
  section,
  activeSection,
  onClick,
}: SettingsNavItemProps) {
  const isActive = activeSection === section;

  return (
    <button
      type="button"
      onClick={() => onClick(section)}
      className={`flex h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-sm font-semibold transition-all duration-200 ${
        isActive
          ? "bg-white text-slate-950 shadow-sm"
          : "text-slate-600 hover:bg-white hover:text-slate-950"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />

      <span>{label}</span>
    </button>
  );
}