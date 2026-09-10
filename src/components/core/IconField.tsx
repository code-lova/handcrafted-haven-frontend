import React from "react";
import { Field, ErrorMessage } from "formik";
import { LucideIcon } from "lucide-react";

interface IconFieldProps {
  name: string;
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon: LucideIcon;
}

const IconField = ({
  name,
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
}: IconFieldProps) => {
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
        <Icon
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
        <Field
          type={type}
          name={name}
          id={fieldId}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent"
        />
      </div>
      <ErrorMessage name={name} component="div" className="text-red-600 text-sm mt-1" />
    </div>
  );
};

export default IconField;
