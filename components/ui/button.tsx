import * as React from "react";

type ButtonVariant = "default" | "secondary" | "outline";
type ButtonSize = "sm" | "default" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-slate-950 text-white hover:bg-slate-800",
  secondary: "bg-cyan-50 text-cyan-950 hover:bg-cyan-100",
  outline: "border border-slate-200 bg-white text-slate-950 hover:bg-slate-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3",
  default: "h-10 px-4 py-2",
  lg: "h-11 px-5",
};

function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      type={type}
      {...props}
    />
  );
}

export { Button };
