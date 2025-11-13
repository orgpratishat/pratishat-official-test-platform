import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  ClipboardList, 
  PieChart, 
  BookOpen, 
  User, 
  Activity, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const links = [
  { to: '/dashboard', icon: PieChart, label: 'Dashboard' },
  { to: '/tests', icon: ClipboardList, label: 'Tests' },
  { to: '/chapterwise', icon: BookOpen, label: 'Chapterwise' },
  { to: '/pyq', icon: BookOpen, label: 'PYQ' },
  { to: '/dpp', icon: BookOpen, label: 'DPP' },
  { to: '/memories', icon: ClipboardList, label: 'Memories' },
  { to: '/admin', icon: PieChart, label: 'Admin Panel' },
  {to:'/admin/rank-range', icon:BookOpen, label:'Rank'}
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  // Desktop sidebar
  const DesktopSidebar = () => (
    <aside
      className={`
        bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
        hidden md:flex flex-col fixed h-screen left-0 top-0 z-30
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        {!isCollapsed && (
          <h2 className="text-xl font-semibold text-primary-600 whitespace-nowrap">Menu</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation - Fixed height with scrolling */}
      <nav className="flex-1 flex flex-col p-2 space-y-1 overflow-y-auto">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center rounded-lg transition-colors duration-200 group relative flex-shrink-0
              ${isActive 
                ? 'bg-primary-100 text-primary-600 border-r-2 border-primary-600' 
                : 'text-gray-700 hover:bg-gray-100'
              }
              ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-2'}`
            }
            title={isCollapsed ? label : ''}
          >
            <Icon className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'}`} />
            {!isCollapsed && (
              <span className="whitespace-nowrap">{label}</span>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                {label}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer section - Fixed at bottom */}
      <div className="p-2 border-t border-gray-200 flex-shrink-0">
        <button
          className={`
            flex items-center w-full rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100
            ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-2'}
          `}
        >
          <LogOut className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'}`} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );

  // Mobile sidebar overlay and sidebar
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileSidebar}
        />
      )}
      
      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 md:hidden flex flex-col
        `}
      >
        {/* Mobile Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-semibold text-primary-600">Menu</h2>
          <button
            onClick={closeMobileSidebar}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 flex flex-col p-2 space-y-1 overflow-y-auto">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
                  isActive 
                    ? 'bg-primary-100 text-primary-600 border-r-2 border-primary-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Footer */}
        <div className="p-2 border-t border-gray-200 flex-shrink-0">
          <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm md:hidden transition-colors duration-200 hover:bg-gray-50"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main content spacer - This ensures content doesn't go behind sidebar */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}
        min-h-screen
      `}>
        {/* Your main content will go here */}
      </div>
    </>
  );
};

export default Sidebar;