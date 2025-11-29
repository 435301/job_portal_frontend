import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
  required
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`form-control ${error ? "is-invalid" : ""}`}
        onChange={onChange}
      />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
    
  );
};

export default InputField;
