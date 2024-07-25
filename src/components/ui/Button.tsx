import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "solid",
  ...props
}) => {
  const baseClasses =
    "px-[27px] py-[11px] rounded-lg transition-colors duration-300 ease-in-out";
  let variantClasses;

  switch (variant) {
    case "solid":
      variantClasses = "bg-primary text-white hover:bg-primary-200 disabled:bg-opacity-50  active:bg-primary-200";
      break;
    case "outline":
      variantClasses =
        "bg-transparent text-primary border border-primary hover:bg-primary-100 disabled:bg-primary-100 active:bg-primary-200";
      break;
    default:
      variantClasses = "bg-primary text-white hover:bg-primary-200";
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;