import { ClickButtonProps } from "@/types";
import React from "react";

const Clickbutton: React.FC<ClickButtonProps> = ({ text, color, type, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className={`text-white bg-olive cursor-pointer ${color} hover:bg-gold font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
      >
        {text}
      </button>
    </div>
  );
};

export default Clickbutton;
