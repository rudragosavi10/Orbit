"use client";

import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  X,
  type LucideIcon,
} from "lucide-react";

export type SidebarSection =
  | "dashboard"
  | "classrooms"
  | "assignments";

interface SidebarProps {
  isOpen: boolean;
  activeSection: SidebarSection;
  onClose: () => void;
  onSectionChange: (section: SidebarSection) => void;
}

interface NavigationItem {
  label: string;
  section: SidebarSection;
  icon: LucideIcon;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    section: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Classrooms",
    section: "classrooms",
    icon: BookOpen,
  },
  {
    label: "Assignments",
    section: "assignments",
    icon: ClipboardList,
  },
];

export function Sidebar({
  isOpen,
  activeSection,
  onClose,
  onSectionChange,
}: SidebarProps) {
  function handleNavigation(section: SidebarSection) {
    onSectionChange(section);

    if (window.innerWidth < 768) {
      onClose();
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar overlay"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 bottom-0 top-12 z-50 w-52 border-r border-border bg-background transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-12 items-center justify-between border-b border-border px-3 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
              O
            </div>

            <span className="text-sm font-semibold tracking-tight text-foreground">
              Orbit
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="space-y-1 p-3">
          {navigationItems.map(({ label, section, icon: Icon }) => {
            const isActive = activeSection === section;

            return (
              <button
                key={section}
                type="button"
                onClick={() => handleNavigation(section)}
                className={`flex h-9 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}