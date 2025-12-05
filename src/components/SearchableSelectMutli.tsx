import React from "react";
import Select from "react-select";

interface Option {
  label: string;
  value: number;
}

interface Props {
  name: string;
  options: Option[];
  value: number[];
  onChange: (value: number[]) => void;
  placeholder?: string;
}

const SearchableSelectMulti: React.FC<Props> = ({ name, options, value, onChange, placeholder }) => {
  // Convert numeric array to react-select format
  const selectedOptions = options.filter(opt => value?.includes(opt.value));

  return (
    <Select
      isMulti
      name={name}
      options={options}
      value={selectedOptions}
      onChange={(selected: any) => {
        const ids = selected ? selected.map((s: any) => s.value) : [];
        onChange(ids);
      }}
      placeholder={placeholder}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};

export default SearchableSelectMulti;
