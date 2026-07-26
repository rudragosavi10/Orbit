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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] =
    useState<SidebarSection>("dashboard");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    const isMobile = window.innerWidth < 768;

    document.body.style.overflow =
      isMobile && isSidebarOpen ? "hidden" : "";

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
      <Navbar
        onMenuClick={() => {
          setIsSidebarOpen((currentState) => !currentState);
        }}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        activeSection={activeSection}
        onClose={() => setIsSidebarOpen(false)}
        onSectionChange={setActiveSection}
      />

      <main
        className={`min-h-screen bg-white pt-20 transition-[padding] duration-300 ${
          isSidebarOpen ? "md:pl-80" : "md:pl-0"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 md:p-10 lg:p-12">
          {renderActiveContent()}
        </div>
      </main>
    </div>
  );
}