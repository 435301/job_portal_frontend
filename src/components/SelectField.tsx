import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string | number;
  options: Option[];
  error?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  error,
  placeholder,
  onChange,
  required
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`form-select ${error ? "is-invalid" : ""}`}
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
