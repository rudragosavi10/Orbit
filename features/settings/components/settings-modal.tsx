"use client";

import { useEffect, useState } from "react";
import { Settings, X } from "lucide-react";

import { SettingsSidebar } from "./settings-sidebar";
import { ProfileSettings } from "../sections/profile-settings";
import type { SettingsSection } from "../types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
}: SettingsModalProps) {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setActiveSection("profile");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function renderContent() {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings />;

      case "appearance":
        return (
          <ComingSoon
            title="Appearance"
            description="Customize the look and feel of Orbit."
          />
        );

      case "notifications":
        return (
          <ComingSoon
            title="Notifications"
            description="Manage how Orbit notifies you."
          />
        );

      case "security":
        return (
          <ComingSoon
            title="Security"
            description="Manage your account security."
          />
        );

      case "about":
        return (
          <ComingSoon
            title="About"
            description="Information about Orbit."
          />
        );

      default:
        return <ProfileSettings />;
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close settings"
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-md"
      />

      {/* Modal */}
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        className="relative z-10 flex h-[720px] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <header className="absolute inset-x-0 top-0 flex h-16 items-center justify-between border-b border-slate-200 bg-slate-100 px-6">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-slate-700" />

            <h2 className="text-lg font-semibold text-slate-900">
              Settings
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-950"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Sidebar */}
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Content */}
        <main className="mt-16 flex-1 overflow-y-auto bg-slate-100 p-8">
          {renderContent()}
        </main>
      </section>
    </div>
  );
}

interface ComingSoonProps {
  title: string;
  description: string;
}

function ComingSoon({
  title,
  description,
}: ComingSoonProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-950">
          {title}
        </h2>

        <p className="mt-3 text-slate-500">
          {description}
        </p>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-10">
          <p className="font-medium text-slate-600">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}