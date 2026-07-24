import Link from "next/link";

import { Button } from "@/components/ui/button";

interface AuthStatusCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonHref: string;
  secondaryText?: string;
  secondaryAction?: React.ReactNode;
}

export function AuthStatusCard({
  title,
  description,
  icon,
  buttonText,
  buttonHref,
  secondaryText,
  secondaryAction,
}: AuthStatusCardProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border">
        {icon}
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <Link href={buttonHref}>
  <Button className="w-full">
    {buttonText}
  </Button>
</Link>

      {secondaryText && (
        <p className="text-sm text-muted-foreground">
          {secondaryText} {secondaryAction}
        </p>
      )}
    </div>
  );
}