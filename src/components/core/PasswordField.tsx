"use client";
import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldProps {
  name: string;
  id?: string;
  label: string;
  placeholder?: string;
}

const PasswordField = ({ name, id, label, placeholder }: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);
  const fieldId = id ?? name;

  return (
    <div className="mb-5">
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-rich-brown mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <Lock
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
        <Field
          type={visible ? "text" : "password"}
          name={name}
          id={fieldId}
          placeholder={placeholder}
          className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-rich-brown cursor-pointer"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <ErrorMessage name={name} component="div" className="text-red-600 text-sm mt-1" />
    </div>
  );
};

export default PasswordField;
