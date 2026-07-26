"use client";

import {
  Bell,
  Info,
  Palette,
  Shield,
  UserRound,
} from "lucide-react";

import { SettingsNavItem } from "./settings-nav-item";
import type { SettingsSection } from "../types";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const navigation = [
  {
    label: "Profile",
    section: "profile",
    icon: UserRound,
  },
  {
    label: "Appearance",
    section: "appearance",
    icon: Palette,
  },
  {
    label: "Notifications",
    section: "notifications",
    icon: Bell,
  },
  {
    label: "Security",
    section: "security",
    icon: Shield,
  },
  {
    label: "About",
    section: "about",
    icon: Info,
  },
] satisfies {
  label: string;
  section: SettingsSection;
  icon: typeof UserRound;
}[];

export function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <aside className="mt-16 w-72 border-r border-slate-200 bg-slate-50 p-4">
      <div className="space-y-2">
        {navigation.map((item) => (
          <SettingsNavItem
            key={item.section}
            {...item}
            activeSection={activeSection}
            onClick={onSectionChange}
          />
        ))}
      </div>
    </aside>
  );
}