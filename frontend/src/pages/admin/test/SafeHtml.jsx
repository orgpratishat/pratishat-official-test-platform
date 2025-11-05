// components/SafeHTML.js
import React from 'react';

// Format text for display - CRITICAL FUNCTION for showing formatted text
export const formatTextWithHTML = (text) => {
  if (!text) return '';
  
  return text
    .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
    .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>');
};

// Safe HTML component for rendering formatted text
const SafeHTML = ({ html, className = '' }) => {
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: formatTextWithHTML(html) }}
    />
  );
};

export default SafeHTML;