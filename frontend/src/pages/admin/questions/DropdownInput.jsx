import React, { useState, useRef, useEffect, memo } from 'react';

const DropdownInput = memo(({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = "Select or type...",
  required = false
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSelect = (option) => {
    setInputValue(option);
    onChange(option);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = (e) => {
    setTimeout(() => {
      if (!e.relatedTarget || !e.relatedTarget.closest('.dropdown-options')) {
        setShowDropdown(false);
      }
    }, 200);
  };

  const handleOptionMouseDown = (e, option) => {
    e.preventDefault();
    handleSelect(option);
  };

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          required={required}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {showDropdown && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto dropdown-options">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onMouseDown={(e) => handleOptionMouseDown(e, option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default DropdownInput;