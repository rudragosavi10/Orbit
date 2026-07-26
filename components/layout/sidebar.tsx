"use client";

import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
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
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      onClose();

      window.setTimeout(() => {
        onSectionChange(section);
      }, 250);

      return;
    }

    onSectionChange(section);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar overlay"
        onClick={onClose}
        className={`fixed bottom-0 left-0 right-0 top-20 z-40 bg-black/30 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed bottom-0 left-0 top-20 z-50 bg-slate-50 transition-transform duration-300 ease-in-out md:z-30 md:translate-x-0 md:transition-[width] ${
          isOpen
            ? "w-80 translate-x-0"
            : "-translate-x-full w-80 md:w-20"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="flex flex-col gap-3 pt-3"
        >
          {navigationItems.map(({ label, section, icon: Icon }) => {
            const isActive = activeSection === section;

            return (
              <button
                key={section}
                type="button"
                title={!isOpen ? label : undefined}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                onClick={() => handleNavigation(section)}
                className={`ml-3 flex h-14 items-center overflow-hidden rounded-2xl text-base font-semibold transition-[width,background-color,color,box-shadow] duration-300 ${
                  isOpen
                    ? "w-[calc(100%-1.5rem)] gap-4 px-4 text-left"
                    : "w-14 gap-4 px-4 text-left"
                } ${
                  isActive
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <Icon className="h-6 w-6 shrink-0" />

                <span
                  className={`whitespace-nowrap transition-opacity duration-200 ${
                    isOpen
                      ? "visible opacity-100"
                      : "invisible w-0 opacity-0"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}