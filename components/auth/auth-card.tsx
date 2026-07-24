import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({
  children,
  className,
}: AuthCardProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border/60 bg-card/90 backdrop-blur-xl shadow-2xl",
        "p-8 sm:p-10",
        className
      )}
    >
      {children}
    </section>
  );
}