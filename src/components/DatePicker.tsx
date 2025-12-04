import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function safeParseDate(dateString: string | null | undefined) {
  if (!dateString) return null;
  if (dateString === "0000-00-00") return null;

  const d = new Date(dateString);
  return isNaN(d.getTime()) ? null : d;
}

interface Props {
  form: any;
  handleChange: (e: { target: { name: string; value: string } }) => void;
}

const DobPicker: React.FC<Props> = ({ form, handleChange }) => {
  const selectedDate = safeParseDate(form?.dob);

  const onChange = (date: Date | null) => {
    handleChange({
      target: {
        name: "dob",
        value: date ? date.toISOString().split("T")[0] : "",
      },
    });
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="MM-dd-yyyy"
      placeholderText="Select Date of Birth"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      className="form-control"
    />
  );
};

export default DobPicker;
