import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Superscript, 
  Subscript, 
  SquareRadical, 
  Divide, 
  Type, 
  Plus 
} from 'lucide-react';
import { formatTextWithHTML } from '../../../utils/formatters';

const RichTextEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
  const [showGreekMenu, setShowGreekMenu] = useState(false);
  const textareaRef = useRef(null);

  const greekLetters = [
    { symbol: 'α', name: 'alpha' }, { symbol: 'β', name: 'beta' }, { symbol: 'γ', name: 'gamma' },
    { symbol: 'δ', name: 'delta' }, { symbol: 'ε', name: 'epsilon' }, { symbol: 'ζ', name: 'zeta' },
    { symbol: 'η', name: 'eta' }, { symbol: 'θ', name: 'theta' }, { symbol: 'ι', name: 'iota' },
    { symbol: 'κ', name: 'kappa' }, { symbol: 'λ', name: 'lambda' }, { symbol: 'μ', name: 'mu' },
    { symbol: 'ν', name: 'nu' }, { symbol: 'ξ', name: 'xi' }, { symbol: 'ο', name: 'omicron' },
    { symbol: 'π', name: 'pi' }, { symbol: 'ρ', name: 'rho' }, { symbol: 'σ', name: 'sigma' },
    { symbol: 'τ', name: 'tau' }, { symbol: 'υ', name: 'upsilon' }, { symbol: 'φ', name: 'phi' },
    { symbol: 'χ', name: 'chi' }, { symbol: 'ψ', name: 'psi' }, { symbol: 'ω', name: 'omega' },
    { symbol: 'Α', name: 'Alpha' }, { symbol: 'Β', name: 'Beta' }, { symbol: 'Γ', name: 'Gamma' },
    { symbol: 'Δ', name: 'Delta' }, { symbol: 'Ε', name: 'Epsilon' }, { symbol: 'Ζ', name: 'Zeta' },
    { symbol: 'Η', name: 'Eta' }, { symbol: 'Θ', name: 'Theta' }, { symbol: 'Ι', name: 'Iota' },
    { symbol: 'Κ', name: 'Kappa' }, { symbol: 'Λ', name: 'Lambda' }, { symbol: 'Μ', name: 'Mu' },
    { symbol: 'Ν', name: 'Nu' }, { symbol: 'Ξ', name: 'Xi' }, { symbol: 'Ο', name: 'Omicron' },
    { symbol: 'Π', name: 'Pi' }, { symbol: 'Ρ', name: 'Rho' }, { symbol: 'Σ', name: 'Sigma' },
    { symbol: 'Τ', name: 'Tau' }, { symbol: 'Υ', name: 'Upsilon' }, { symbol: 'Φ', name: 'Phi' },
    { symbol: 'Χ', name: 'Chi' }, { symbol: 'Ψ', name: 'Psi' }, { symbol: 'Ω', name: 'Omega' }
  ];

  const insertText = (text) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + text.length, start + text.length);
      }
    }, 0);
  };

  const wrapSelection = (prefix, suffix = '') => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = prefix + selectedText + suffix;
    const newValue = value.substring(0, start) + newText + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        if (selectedText) {
          textareaRef.current.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
        } else {
          textareaRef.current.setSelectionRange(start + prefix.length, start + prefix.length);
        }
      }
    }, 0);
  };

  const insertSquareRadical = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText;
    if (selectedText) {
      newText = `√{${selectedText}}`;
    } else {
      newText = '√{content}';
    }
    
    const newValue = value.substring(0, start) + newText + value.substring(end);
    onChange(newValue);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        if (selectedText) {
          textareaRef.current.setSelectionRange(
            start + newText.length, 
            start + newText.length
          );
        } else {
          textareaRef.current.setSelectionRange(
            start + 2, 
            start + 9
          );
        }
      }
    }, 0);
  };

  const insertDivision = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText;
    if (selectedText) {
      newText = `{{${selectedText}|denominator}}`;
    } else {
      newText = '{{numerator|denominator}}';
    }
    
    const newValue = value.substring(0, start) + newText + value.substring(end);
    onChange(newValue);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        if (selectedText) {
          textareaRef.current.setSelectionRange(
            start + newText.indexOf('denominator'), 
            start + newText.indexOf('denominator') + 'denominator'.length
          );
        } else {
          textareaRef.current.setSelectionRange(
            start + newText.indexOf('numerator'), 
            start + newText.indexOf('numerator') + 'numerator'.length
          );
        }
      }
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showGreekMenu && !event.target.closest('.greek-menu-container')) {
        setShowGreekMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGreekMenu]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
        {/* Bold */}
        <button
          type="button"
          onClick={() => wrapSelection('<b>', '</b>')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => wrapSelection('<i>', '</i>')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        {/* Superscript */}
        <button
          type="button"
          onClick={() => wrapSelection('<sup>', '</sup>')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200"
          title="Superscript"
        >
          <Superscript className="w-4 h-4" />
        </button>

        {/* Subscript */}
        <button
          type="button"
          onClick={() => wrapSelection('<sub>', '</sub>')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200"
          title="Subscript"
        >
          <Subscript className="w-4 h-4" />
        </button>

        {/* Square Root */}
        <button
          type="button"
          onClick={insertSquareRadical}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200"
          title="Square Root"
        >
          <SquareRadical className="w-4 h-4" />
        </button>

        {/* Division */}
        <button
          type="button"
          onClick={insertDivision}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200"
          title="Insert Division/Fraction"
        >
          <Divide className="w-4 h-4" />
        </button>

        {/* Greek Letters Dropdown */}
        <div className="relative greek-menu-container">
          <button
            type="button"
            onClick={() => setShowGreekMenu(!showGreekMenu)}
            className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1"
            title="Greek Letters"
          >
            <Type className="w-4 h-4" />
            <span className="text-xs font-medium">Greek</span>
          </button>

          {showGreekMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-w-64 max-h-64 overflow-y-auto">
              <div className="p-2">
                <div className="grid grid-cols-6 gap-1">
                  {greekLetters.map((letter, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        insertText(letter.symbol);
                        setShowGreekMenu(false);
                      }}
                      className="p-2 rounded hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
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
          Use {'<b>text</b>'} for bold, {'<i>text</i>'} for italic, {'√{content}'} for square root, {'{{numerator|denominator}}'} for fractions
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
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
          <div 
            className="text-sm text-gray-800 min-h-6 whitespace-pre-wrap rich-text-preview"
            dangerouslySetInnerHTML={{ __html: formatTextWithHTML(value) }}
          />
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;