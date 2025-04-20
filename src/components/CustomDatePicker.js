import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react"; // Optional icon
import "./custom-datepicker.css"; // Optional for extra custom styling

const CustomDatePicker = ({ selectedDate, onChange }) => {
  return (
    <div className="relative w-full">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        className="w-full border border-gray-300 rounded-md p-2 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
        placeholderText="Select date"
      />
      <CalendarDays className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default CustomDatePicker;
