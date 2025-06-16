import { ClickButtonProps } from "@/types";
import React from "react";

const Clickbutton: React.FC<ClickButtonProps> = ({
  text,
  className = "",
  disabled = false,
  type,
  onClick,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition ${
          disabled
            ? "cursor-not-allowed bg-gray-400"
            : "cursor-pointer hover:bg-gold bg-olive "
        } ${className}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Clickbutton;
