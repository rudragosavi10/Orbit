interface AuthDividerProps {
  label?: string;
}

export function AuthDivider({
  label = "or continue with",
}: AuthDividerProps) {
  return (
    <div className="flex items-center gap-4 py-6">
      <div className="h-px flex-1 bg-border" />

      <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>

      <div className="h-px flex-1 bg-border" />
    </div>
  );
}