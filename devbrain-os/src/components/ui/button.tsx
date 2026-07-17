import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent/90 focus-visible:outline-accent",
  secondary:
    "bg-surface text-foreground border border-line hover:border-accent/60 focus-visible:outline-accent",
  ghost:
    "bg-transparent text-foreground hover:bg-surface focus-visible:outline-accent",
};

/**
 * Button is our first design-system primitive.
 *
 * It lives in components/ui because it is a "dumb", reusable building
 * block with no knowledge of DevBrain OS features — auth, projects,
 * the Engineering Brain, etc. Feature components (which WILL know about
 * those things) will compose primitives like this one instead of each
 * re-implementing button styles. That's the line we'll keep drawing as
 * the project grows: components/ui = generic + reusable,
 * components/<feature> = specific to a product area.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
