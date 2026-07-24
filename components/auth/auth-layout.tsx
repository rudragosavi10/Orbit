import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.10),transparent_55%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid-small-black/[0.04] dark:bg-grid-small-white/[0.04]"
      />

      {/* Content */}
      <section className="relative w-full max-w-md">
        {children}
      </section>
    </main>
  );
}