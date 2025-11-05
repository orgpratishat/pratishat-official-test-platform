import React, { useState, useRef, memo } from 'react';
import { Plus, X } from 'lucide-react';

const MultiTopicInput = memo(({ 
  label, 
  value = [], 
  onChange, 
  options = [], 
  placeholder = "Add topics...",
  required = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  const addTopic = (topic) => {
    const trimmedTopic = topic.trim();
    if (trimmedTopic && !value.includes(trimmedTopic)) {
      const newTopics = [...value, trimmedTopic];
      onChange(newTopics);
    }
    setInputValue('');
    setShowDropdown(false);
  };

  const removeTopic = (index) => {
    const newTopics = value.filter((_, i) => i !== index);
    onChange(newTopics);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTopic(inputValue.trim());
    }
  };

  const handleOptionClick = (option) => {
    addTopic(option);
  };

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(inputValue.toLowerCase()) && 
    !value.includes(option)
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
        />
        <button
          type="button"
          onClick={() => inputValue.trim() && addTopic(inputValue.trim())}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title="Add topic"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Selected Topics */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((topic, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {topic}
              <button
                type="button"
                onClick={() => removeTopic(index)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dropdown */}
      {showDropdown && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default MultiTopicInput;