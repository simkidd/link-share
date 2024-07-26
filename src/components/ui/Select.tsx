import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative w-full" ref={selectRef}>
      <button
        type="button"
        className="p-2 px-4 mt-1 border border-gray-300 bg-white rounded-lg w-full text-left flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <>
            <span className="flex items-center">
              {selectedOption.icon && (
                <span className="mr-2">{selectedOption.icon}</span>
              )}
              {selectedOption.label}
            </span>
          </>
        ) : (
          placeholder
        )}
        {isOpen ? (
          <FaChevronUp className="ml-2 text-gray-600" size={13} />
        ) : (
          <FaChevronDown className="ml-2 text-gray-600" size={13} />
        )}
      </button>
      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              className="p-2 px-4 flex items-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
