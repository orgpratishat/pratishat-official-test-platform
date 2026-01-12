


// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { 
//   Home, 
//   ClipboardList, 
//   PieChart, 
//   BookOpen, 
//   User, 
//   Activity, 
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Menu,
//   X
// } from 'lucide-react';

// const links = [
//   { to: '/dashboard', icon: PieChart, label: 'Dashboard', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
//   { to: '/tests', icon: ClipboardList, label: 'Tests', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
//   { to: '/chapterwise', icon: BookOpen, label: 'Chapterwise', color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
//   { to: '/pyq', icon: BookOpen, label: 'PYQ', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
//   { to: '/dpp', icon: BookOpen, label: 'DPP', color: 'text-rose-500', bgColor: 'bg-rose-500/10' },
//   { to: '/memories', icon: ClipboardList, label: 'Memories', color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
//   { to: '/admin', icon: PieChart, label: 'Admin Panel', color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
//   { to: '/admin/rank-range', icon: BookOpen, label: 'Rank', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
// ];

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [activeHover, setActiveHover] = useState(null);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const toggleMobileSidebar = () => {
//     setIsMobileOpen(!isMobileOpen);
//   };

//   const closeMobileSidebar = () => {
//     setIsMobileOpen(false);
//   };

//   // Desktop sidebar
//   const DesktopSidebar = () => (
//     <aside
//       className={`
//         bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-xl
//         border-r border-gray-200/50 transition-all duration-300 ease-in-out
//         shadow-soft-xl
//         ${isCollapsed ? 'w-20' : 'w-72'}
//         hidden md:flex flex-col fixed h-screen left-0 top-0 z-40
//         overflow-hidden
//       `}
//       style={{
//         background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.98) 100%)'
//       }}
//     >
//       {/* Header with MedDestiny logo */}
//       <div className="relative p-6 flex items-center justify-between">
//         <div className="flex items-center gap-3 overflow-hidden">
//           {!isCollapsed && (
//             <div 
//               onClick={() => navigate('/landing')} 
//               className="flex items-center gap-3 cursor-pointer group"
//             >
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-500/30">
//                 <span className="text-white font-bold text-xl">≋</span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 whitespace-nowrap">
//                   Med<span className="text-purple-600">Destiny</span>
//                 </div>
//                 <p className="text-xs text-gray-500 font-medium mt-0.5">Student Dashboard</p>
//               </div>
//             </div>
//           )}
//           {isCollapsed && (
//             <div 
//               onClick={() => navigate('/landing')} 
//               className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
//             >
//               <span className="text-white font-bold text-xl">≋</span>
//             </div>
//           )}
//         </div>
        
//         <button
//           onClick={toggleSidebar}
//           className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
//           aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//         >
//           {isCollapsed ? (
//             <ChevronRight className="w-3 h-3 text-gray-600" />
//           ) : (
//             <ChevronLeft className="w-3 h-3 text-gray-600" />
//           )}
//         </button>
//       </div>

//       {/* Navigation with animated hover effects */}
//       <nav className="flex-1 flex flex-col px-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-6">
//         {links.map(({ to, icon: Icon, label, color, bgColor }) => (
//           <NavLink
//             key={to}
//             to={to}
//             className={({ isActive }) =>
//               `group relative flex items-center rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95
//               ${isActive 
//                 ? `shadow-md ${bgColor} border-l-4 border-l-transparent` 
//                 : 'hover:bg-gray-100/50'
//               }
//               ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'}`
//             }
//             title={isCollapsed ? label : ''}
//             onMouseEnter={() => setActiveHover(label)}
//             onMouseLeave={() => setActiveHover(null)}
//           >
//             {/* Active indicator */}
//             {({ isActive }) => isActive && (
//               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-blue-600 to-purple-600"></div>
//             )}
            
//             {/* Icon with gradient background */}
//             <div className={`relative ${isCollapsed ? '' : 'mr-3'}`}>
//               <div className={`
//                 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
//                 ${isCollapsed ? 'w-10 h-10' : 'w-10 h-10'}
//                 ${activeHover === label ? 'scale-110' : ''}
//               `}>
//                 <Icon className={`w-5 h-5 ${color}`} />
//               </div>
//             </div>
            
//             {/* Label with gradient text */}
//             {!isCollapsed && (
//               <div className="flex-1 min-w-0">
//                 <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
//                   {label}
//                 </span>
//               </div>
//             )}
            
//             {/* Tooltip for collapsed state */}
//             {isCollapsed && (
//               <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-2xl">
//                 <div className="relative">
//                   {label}
//                   <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
//                 </div>
//               </div>
//             )}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Logout button */}
//       <div className="p-4 border-t border-gray-200/50">
//         <button
//           className={`
//             group flex items-center w-full rounded-xl transition-all duration-300
//             hover:shadow-md active:scale-95
//             bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50
//             ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'}
//           `}
//         >
//           <div className="relative">
//             <LogOut className={`${isCollapsed ? 'w-5 h-5 text-gray-600' : 'w-5 h-5 mr-3 text-gray-600'}`} />
//           </div>
//           {!isCollapsed && (
//             <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
//               Logout
//             </span>
//           )}
//           {isCollapsed && (
//             <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-2xl">
//               <div className="relative">
//                 Logout
//                 <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
//               </div>
//             </div>
//           )}
//         </button>
//       </div>
//     </aside>
//   );

//   // Mobile sidebar overlay and sidebar
//   const MobileSidebar = () => (
//     <>
//       {/* Overlay with blur effect */}
//       {isMobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
//           onClick={closeMobileSidebar}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-full z-50
//           transition-all duration-300 ease-in-out
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
//           w-80 md:hidden flex flex-col
//         `}
//         style={{
//           background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.99) 100%)'
//         }}
//       >
//         {/* Mobile Header with MedDestiny logo */}
//         <div className="relative p-6 border-b border-gray-200/50">
//           <div className="flex items-center justify-between">
//             <div 
//               onClick={() => {
//                 navigate('/landing');
//                 closeMobileSidebar();
//               }} 
//               className="flex items-center gap-3 cursor-pointer group"
//             >
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-500/30">
//                 <span className="text-white font-bold text-xl">≋</span>
//               </div>
//               <div>
//                 <div className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
//                   Med<span className="text-purple-600">Destiny</span>
//                 </div>
//                 <p className="text-xs text-gray-500 font-medium">Student Dashboard</p>
//               </div>
//             </div>
//             <button
//               onClick={closeMobileSidebar}
//               className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
//               aria-label="Close sidebar"
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         </div>

//         {/* User info in mobile */}
//         <div className="px-6 py-4 border-b border-gray-200/50">
//           <div className="flex items-center">
//             <div className="relative">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
//                 <User className="w-6 h-6 text-white" />
//               </div>
//               <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
//                 <div className="w-2 h-2 rounded-full bg-white"></div>
//               </div>
//             </div>
//             <div className="ml-4">
//               <h3 className="font-bold text-gray-900">Student</h3>
//               <p className="text-sm text-gray-500">Online</p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <nav className="flex-1 flex flex-col px-4 space-y-1 overflow-y-auto py-4">
//           {links.map(({ to, icon: Icon, label, color, bgColor }) => (
//             <NavLink
//               key={to}
//               to={to}
//               onClick={closeMobileSidebar}
//               className={({ isActive }) =>
//                 `group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 active:scale-95
//                 ${isActive 
//                   ? `${bgColor} shadow-sm border-l-4 border-l-transparent` 
//                   : 'hover:bg-gray-100/50'
//                 }`
//               }
//             >
//               <div className="relative">
//                 <div className={`
//                   w-10 h-10 rounded-xl flex items-center justify-center
//                 `}>
//                   <Icon className={`w-5 h-5 ${color}`} />
//                 </div>
//               </div>
//               <div className="ml-3 flex-1 min-w-0">
//                 <span className="text-sm font-semibold text-gray-800">{label}</span>
//               </div>
//               <ChevronRight className="w-4 h-4 text-gray-400" />
//             </NavLink>
//           ))}
//         </nav>

//         {/* Mobile Footer */}
//         <div className="p-4 border-t border-gray-200/50 mt-auto">
//           <button className="flex items-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-rose-50 to-rose-100/50 hover:from-rose-100 hover:to-rose-200/50 transition-all duration-300 active:scale-95">
//             <LogOut className="w-5 h-5 text-rose-500 mr-3" />
//             <span className="text-sm font-semibold text-rose-600">Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );

//   return (
//     <>
//       {/* Floating mobile menu button */}
//       <button
//         onClick={toggleMobileSidebar}
//         className="fixed top-4 left-6 z-50 w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 shadow-2xl md:hidden transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center group"
//         aria-label="Open menu"
//         style={{
//           backdropFilter: 'blur(10px)'
//         }}
//       >
//         <div className="relative">
//           <Menu className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
//           <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
//         </div>
//       </button>

//       {/* Desktop Sidebar */}
//       <DesktopSidebar />
      
//       {/* Mobile Sidebar */}
//       <MobileSidebar />

//       {/* Main content spacer with smooth transition */}
//       <div className={`
//         transition-all duration-500 ease-out
//         ${isCollapsed ? 'md:ml-20' : 'md:ml-72'}
//         min-h-screen relative
//       `}>
//         {/* Your main content will go here */}
//       </div>
//     </>
//   );
// };

// export default Sidebar;




import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore'; // Import auth store
import { 
  Home, 
  ClipboardList, 
  PieChart, 
  BookOpen, 
  User as UserIcon, 
  Activity, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const links = [
  { to: '/dashboard', icon: PieChart, label: 'Dashboard', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  { to: '/tests', icon: ClipboardList, label: 'Tests', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { to: '/chapterwise', icon: BookOpen, label: 'Chapterwise', color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
  { to: '/pyq', icon: BookOpen, label: 'PYQ', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  { to: '/dpp', icon: BookOpen, label: 'DPP', color: 'text-rose-500', bgColor: 'bg-rose-500/10' },
  { to: '/memories', icon: ClipboardList, label: 'Memories', color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
  { to: '/admin', icon: PieChart, label: 'Admin Panel', color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
  { to: '/admin/rank-range', icon: BookOpen, label: 'Rank', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); // Get user and logout from auth store

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    closeMobileSidebar();
  };

  // Get user's first name or display name
  const getUserName = () => {
    if (!user) return 'Student';
    
    // Try to get full name from profile
    if (user.profile?.fullName) {
      const nameParts = user.profile.fullName.split(' ');
      return nameParts[0]; // Return first name only
    }
    
    // Fallback to username or email
    return user.username || user.email?.split('@')[0] || 'Student';
  };

  // Desktop sidebar
  const DesktopSidebar = () => (
    <aside
      className={`
        bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-xl
        border-r border-gray-200/50 transition-all duration-300 ease-in-out
        shadow-soft-xl
        ${isCollapsed ? 'w-20' : 'w-72'}
        hidden md:flex flex-col fixed h-screen left-0 top-0 z-40
        overflow-hidden
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.98) 100%)'
      }}
    >
      {/* Header with MedDestiny logo */}
      <div className="relative p-6 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          {!isCollapsed && (
            <div 
              onClick={() => navigate('/landing')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                <span className="text-white font-bold text-xl">≋</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 whitespace-nowrap">
                  Med<span className="text-purple-600">Destiny</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {user?.role === 'mentor' ? 'Mentor Dashboard' : 'Student Dashboard'}
                </p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div 
              onClick={() => navigate('/landing')} 
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
            >
              <span className="text-white font-bold text-xl">≋</span>
            </div>
          )}
        </div>
        
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-gray-600" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-gray-600" />
          )}
        </button>
      </div>

      {/* User info section - Only show if user exists */}
      {user && !isCollapsed && (
        <div className="px-6 py-4 border-b border-gray-200/50">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                {user.profile?.fullName ? (
                  <span className="text-white font-semibold text-lg">
                    {user.profile.fullName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <UserIcon className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="ml-4 flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate">
                {user.profile?.fullName || getUserName()}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-500 truncate">
                  {user.email || user.username}
                </p>
                <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-600 font-medium">
                  {user.role === 'mentor' ? 'Mentor' : 'Student'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation with animated hover effects */}
      <nav className="flex-1 flex flex-col px-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-6">
        {links.map(({ to, icon: Icon, label, color, bgColor }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative flex items-center rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95
              ${isActive 
                ? `shadow-md ${bgColor} border-l-4 border-l-transparent` 
                : 'hover:bg-gray-100/50'
              }
              ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'}`
            }
            title={isCollapsed ? label : ''}
            onMouseEnter={() => setActiveHover(label)}
            onMouseLeave={() => setActiveHover(null)}
          >
            {/* Active indicator */}
            {({ isActive }) => isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-blue-600 to-purple-600"></div>
            )}
            
            {/* Icon with gradient background */}
            <div className={`relative ${isCollapsed ? '' : 'mr-3'}`}>
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${isCollapsed ? 'w-10 h-10' : 'w-10 h-10'}
                ${activeHover === label ? 'scale-110' : ''}
              `}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
            
            {/* Label with gradient text */}
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                  {label}
                </span>
              </div>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-2xl">
                <div className="relative">
                  {label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-200/50">
        <button
          onClick={handleLogout}
          className={`
            group flex items-center w-full rounded-xl transition-all duration-300
            hover:shadow-md active:scale-95
            bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-rose-50 hover:to-rose-100/50
            hover:border-rose-200
            ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'}
          `}
        >
          <div className="relative">
            <LogOut className={`${isCollapsed ? 'w-5 h-5 text-gray-600 group-hover:text-rose-600' : 'w-5 h-5 mr-3 text-gray-600 group-hover:text-rose-600'}`} />
          </div>
          {!isCollapsed && (
            <span className="text-sm font-semibold text-gray-700 group-hover:text-rose-600">
              Logout
            </span>
          )}
          {isCollapsed && (
            <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-2xl">
              <div className="relative">
                Logout
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );

  // Mobile sidebar overlay and sidebar
  const MobileSidebar = () => (
    <>
      {/* Overlay with blur effect */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={closeMobileSidebar}
        />
      )}
      
      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          w-80 md:hidden flex flex-col
        `}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.99) 100%)'
        }}
      >
        {/* Mobile Header with MedDestiny logo */}
        <div className="relative p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => {
                navigate('/landing');
                closeMobileSidebar();
              }} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                <span className="text-white font-bold text-xl">≋</span>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  Med<span className="text-purple-600">Destiny</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  {user?.role === 'mentor' ? 'Mentor Dashboard' : 'Student Dashboard'}
                </p>
              </div>
            </div>
            <button
              onClick={closeMobileSidebar}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* User info in mobile - Only show if user exists */}
        {user && (
          <div className="px-6 py-4 border-b border-gray-200/50">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  {user.profile?.fullName ? (
                    <span className="text-white font-semibold text-lg">
                      {user.profile.fullName.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <UserIcon className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900">
                  {user.profile?.fullName || getUserName()}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-500">
                    {user.email || user.username}
                  </p>
                  <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-600 font-medium">
                    {user.role === 'mentor' ? 'Mentor' : 'Student'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        <nav className="flex-1 flex flex-col px-4 space-y-1 overflow-y-auto py-4">
          {links.map(({ to, icon: Icon, label, color, bgColor }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                `group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 active:scale-95
                ${isActive 
                  ? `${bgColor} shadow-sm border-l-4 border-l-transparent` 
                  : 'hover:bg-gray-100/50'
                }`
              }
            >
              <div className="relative">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                `}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <span className="text-sm font-semibold text-gray-800">{label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </NavLink>
          ))}
        </nav>

        {/* Mobile Footer */}
        <div className="p-4 border-t border-gray-200/50 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-rose-50 to-rose-100/50 hover:from-rose-100 hover:to-rose-200/50 transition-all duration-300 active:scale-95"
          >
            <LogOut className="w-5 h-5 text-rose-500 mr-3" />
            <span className="text-sm font-semibold text-rose-600">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );

  return (
    <>
      {/* Floating mobile menu button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-6 z-50 w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 shadow-2xl md:hidden transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center group"
        aria-label="Open menu"
        style={{
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="relative">
          <Menu className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
        </div>
      </button>

      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main content spacer with smooth transition */}
      <div className={`
        transition-all duration-500 ease-out
        ${isCollapsed ? 'md:ml-20' : 'md:ml-72'}
        min-h-screen relative
      `}>
        {/* Your main content will go here */}
      </div>
    </>
  );
};

export default Sidebar;