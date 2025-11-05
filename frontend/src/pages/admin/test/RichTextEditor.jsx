// components/RichTextEditor.js
import React, { useState } from 'react';
import { Superscript, Subscript, Type } from 'lucide-react';
import { formatTextWithHTML } from './SafeHTML';

const RichTextEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
  const [showGreekMenu, setShowGreekMenu] = useState(false);

  const greekLetters = [
    { symbol: 'α', name: 'alpha' }, { symbol: 'β', name: 'beta' }, { symbol: 'γ', name: 'gamma' },
    // ... rest of Greek letters
  ];

  const insertText = (text) => {
    const textarea = document.getElementById('rich-text-area');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const wrapSelection = (prefix, suffix = '') => {
    const textarea = document.getElementById('rich-text-area');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = prefix + selectedText + suffix;
    const newValue = value.substring(0, start) + newText + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
      } else {
        textarea.setSelectionRange(start + prefix.length, start + prefix.length);
      }
    }, 0);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
        <button
          type="button"
          onClick={() => wrapSelection('<sup>', '</sup>')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 tooltip"
          title="Superscript"
        >
          <Superscript className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => wrapSelection('<sub>', '</sub>')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 tooltip"
          title="Subscript"
        >
          <Subscript className="w-4 h-4" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowGreekMenu(!showGreekMenu)}
            className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1 tooltip"
            title="Greek Letters"
          >
            <Type className="w-4 h-4" />
            <span className="text-xs font-medium">Greek</span>
          </button>

          {showGreekMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 max-w-64 overflow-y-auto">
              <div className="p-2 ">
                <div className="grid grid-cols-6">
                  {greekLetters.map((letter, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        insertText(letter.symbol);
                        setShowGreekMenu(false);
                      }}
                      className="p-2 rounded hover:bg-blue-100 transition-colors duration-200 text-sm font-medium tooltip"
                      title={letter.name}
                    >
                      {letter.symbol}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="ml-2 text-xs text-gray-500">
          Use {'<sup>text</sup>'} for superscript, {'<sub>text</sub>'} for subscript
        </div>
      </div>

      {/* Textarea */}
      <textarea
        id="rich-text-area"
        rows={4}
        className="w-full px-3 py-2 focus:outline-none resize-vertical bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {/* Preview */}
      {value && (
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <div className="text-xs text-gray-600 font-medium mb-1">Preview:</div>
          <div className="text-sm text-gray-800 min-h-6">
            {formatTextWithHTML(value)}
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;