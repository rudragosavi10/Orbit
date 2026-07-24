import { CheckCircle2 } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({
  message,
}: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm text-green-600 dark:text-green-400">
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}