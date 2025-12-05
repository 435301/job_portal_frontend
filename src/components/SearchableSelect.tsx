import React from "react";
import Select from "react-select";
import "../assets/css/login.css";

interface Option {
  value: any;
  label: string;
}

interface SearchableSelectProps {
  options: Option[]; // Array of { value, label }
  value: any;        // Currently selected value
  onChange: (value: any) => void; // Called when selection changes
  placeholder?: string;
  isClearable?: boolean;
  error?: string | any;
  name?: string;     // Optional, useful for forms
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isClearable = true,
  error,
  name,
}) => {
  const selectedOption = options.find(opt => opt.value === value) || null;

  const handleChange = (selected: any) => {
    onChange(name ? { target: { name, value: selected?.value || "" } } : selected?.value);
  };

  return (
    <div className={error ? "has-error" : ""}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isClearable={isClearable}
        classNamePrefix="react-select"
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default SearchableSelect;
