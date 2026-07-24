interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({
  title,
  description,
}: AuthHeaderProps) {
  return (
    <header className="mb-8 space-y-3 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-primary text-primary-foreground shadow-lg">
        <span className="text-2xl font-bold">O</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </header>
  );
}