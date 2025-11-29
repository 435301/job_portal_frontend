import React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const ButtonPrimary: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  loading,
  disabled,
  className
}) => {
  return (
    <button
      type={type}
      className={`btn btn-dark w-100 py-2 ${className}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? "loading..." : text}
    </button>
  );
};

export default ButtonPrimary;
