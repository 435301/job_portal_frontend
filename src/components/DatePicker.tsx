
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder, minDate, maxDate }) => {
  return (
    <ReactDatePicker
      selected={value}
      onChange={onChange}
      placeholderText={placeholder}
      className="form-control"
      minDate={minDate}
      maxDate={maxDate}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      dateFormat="MM/dd/yyyy"
    />
  );
};

export default DatePicker;
