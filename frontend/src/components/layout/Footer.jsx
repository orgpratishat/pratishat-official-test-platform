// import React from 'react';

// const Footer = () => (
//   <footer className="bg-white border-t border-gray-200 text-center py-4 mt-auto">
//     <p className="text-gray-500 text-sm">
//       © {new Date().getFullYear()} Directorium Humane Vatae. All rights reserved.
//     </p>
//   </footer>
// );

// export default Footer;



import React from 'react';

const Footer = () => (
  <footer className="mt-auto">
    <div className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Directorium Humane Vatae. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;