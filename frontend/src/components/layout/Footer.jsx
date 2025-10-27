import React from 'react';

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 text-center py-4 mt-auto">
    <p className="text-gray-500 text-sm">
      © {new Date().getFullYear()} Directorium Humane Vatae. All rights reserved.
    </p>
  </footer>
);

export default Footer;
