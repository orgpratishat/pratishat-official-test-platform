import React from 'react'

const Header = () => {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo/Title */}
          <div className="flex items-center space-x-4">
            <div className="text-gray-900 font-medium tracking-tight text-lg">
              SSspineEdoe
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-gray-600 font-normal text-sm">0</span>
              <span className="text-gray-400 text-sm">rs</span>
            </div>
          </div>
          
          {/* Right side - User info */}
          <div className="flex items-center">
            <span className="text-gray-900 font-normal text-sm">
              comerus A
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;