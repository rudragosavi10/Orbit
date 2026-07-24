"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({
  title,
  description,
}: AuthHeaderProps) {
  const { resolvedTheme } = useTheme();

  const logo =
    resolvedTheme === "dark"
      ? "/branding/logo-dark.png"
      : "/branding/logo-light.png";

  return (
    <header className="mb-8 flex flex-col items-center text-center">
      <Image
        src={logo}
        alt="Orbit"
        width={180}
        height={60}
        priority
        className="mb-8 h-auto w-auto"
      />

      <h1 className="text-3xl font-bold tracking-tight">
        {title}
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </header>
  );
}