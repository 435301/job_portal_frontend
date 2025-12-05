import React from "react";
import "../assets/css/login.css";

interface TextAreaProps {
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  className?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  placeholder,
  rows = 4,
  required = false,
  className = "",
  error,
  onChange,
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label fw-semibold">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        className={`form-control rounded-3 textarea-large ${error ? "is-invalid" : ""} ${className}`}
      />

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default TextArea;
