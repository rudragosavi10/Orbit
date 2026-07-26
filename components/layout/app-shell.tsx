"use client";

import { useEffect, useState } from "react";

import { Navbar } from "@/components/layout/navbar";
import {
  Sidebar,
  type SidebarSection,
} from "@/components/layout/sidebar";
import { AssignmentsContent } from "@/features/assignments/assignments-content";
import { ClassroomsContent } from "@/features/classrooms/classrooms-content";
import { DashboardContent } from "@/features/dashboard/dashboard-content";

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<SidebarSection>("dashboard");

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  function renderActiveContent() {
    switch (activeSection) {
      case "classrooms":
        return <ClassroomsContent />;

      case "assignments":
        return <AssignmentsContent />;

      case "dashboard":
      default:
        return <DashboardContent />;
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <Sidebar
        isOpen={isSidebarOpen}
        activeSection={activeSection}
        onClose={() => setIsSidebarOpen(false)}
        onSectionChange={setActiveSection}
      />

      <main className="min-h-screen bg-white pt-20 md:pl-80">
        <div className="mx-auto w-full max-w-7xl p-6 md:p-10 lg:p-12">
          {renderActiveContent()}
        </div>
      </main>
    </div>
  );
}