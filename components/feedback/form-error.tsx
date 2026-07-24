import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export function FormError({
  message,
}: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}