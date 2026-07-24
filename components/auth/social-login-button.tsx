import { Button } from "@/components/ui/button";

interface SocialLoginButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function SocialLoginButton({
  icon,
  children,
  onClick,
  disabled,
}: SocialLoginButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-12 w-full gap-3"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span>{children}</span>
    </Button>
  );
}