// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
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
//   { to: '/dashboard', icon: PieChart, label: 'Dashboard' },
//   { to: '/tests', icon: ClipboardList, label: 'Tests' },
//   { to: '/chapterwise', icon: BookOpen, label: 'Chapterwise' },
//   { to: '/pyq', icon: BookOpen, label: 'PYQ' },
//   { to: '/dpp', icon: BookOpen, label: 'DPP' },
//   { to: '/memories', icon: ClipboardList, label: 'Memories' },
//   { to: '/admin', icon: PieChart, label: 'Admin Panel' },
//   {to:'/admin/rank-range', icon:BookOpen, label:'Rank'}
// ];

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

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
//         bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
//         ${isCollapsed ? 'w-16' : 'w-64'}
//         hidden md:flex flex-col fixed h-screen left-0 top-0 z-30
//       `}
//     >
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
//         {!isCollapsed && (
//           <h2 className="text-xl font-semibold text-primary-600 whitespace-nowrap">Menu</h2>
//         )}
//         <button
//           onClick={toggleSidebar}
//           className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//         >
//           {isCollapsed ? (
//             <ChevronRight className="w-5 h-5 text-gray-600" />
//           ) : (
//             <ChevronLeft className="w-5 h-5 text-gray-600" />
//           )}
//         </button>
//       </div>

//       {/* Navigation - Fixed height with scrolling */}
//       <nav className="flex-1 flex flex-col p-2 space-y-1 overflow-y-auto">
//         {links.map(({ to, icon: Icon, label }) => (
//           <NavLink
//             key={to}
//             to={to}
//             className={({ isActive }) =>
//               `flex items-center rounded-lg transition-colors duration-200 group relative flex-shrink-0
//               ${isActive 
//                 ? 'bg-primary-100 text-primary-600 border-r-2 border-primary-600' 
//                 : 'text-gray-700 hover:bg-gray-100'
//               }
//               ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-2'}`
//             }
//             title={isCollapsed ? label : ''}
//           >
//             <Icon className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'}`} />
//             {!isCollapsed && (
//               <span className="whitespace-nowrap">{label}</span>
//             )}
            
//             {/* Tooltip for collapsed state */}
//             {isCollapsed && (
//               <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
//                 {label}
//                 <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
//               </div>
//             )}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Footer section - Fixed at bottom */}
//       <div className="p-2 border-t border-gray-200 flex-shrink-0">
//         <button
//           className={`
//             flex items-center w-full rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100
//             ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-2'}
//           `}
//         >
//           <LogOut className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'}`} />
//           {!isCollapsed && <span>Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );

//   // Mobile sidebar overlay and sidebar
//   const MobileSidebar = () => (
//     <>
//       {/* Overlay */}
//       {isMobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
//           onClick={closeMobileSidebar}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50
//           transition-transform duration-300 ease-in-out
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
//           w-64 md:hidden flex flex-col
//         `}
//       >
//         {/* Mobile Header */}
//         <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
//           <h2 className="text-xl font-semibold text-primary-600">Menu</h2>
//           <button
//             onClick={closeMobileSidebar}
//             className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//             aria-label="Close sidebar"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         <nav className="flex-1 flex flex-col p-2 space-y-1 overflow-y-auto">
//           {links.map(({ to, icon: Icon, label }) => (
//             <NavLink
//               key={to}
//               to={to}
//               onClick={closeMobileSidebar}
//               className={({ isActive }) =>
//                 `flex items-center px-4 py-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
//                   isActive 
//                     ? 'bg-primary-100 text-primary-600 border-r-2 border-primary-600' 
//                     : 'text-gray-700 hover:bg-gray-100'
//                 }`
//               }
//             >
//               <Icon className="w-5 h-5 mr-3" />
//               <span>{label}</span>
//             </NavLink>
//           ))}
//         </nav>

//         {/* Mobile Footer */}
//         <div className="p-2 border-t border-gray-200 flex-shrink-0">
//           <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
//             <LogOut className="w-5 h-5 mr-3" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );

//   return (
//     <>
//       {/* Mobile menu button */}
//       <button
//         onClick={toggleMobileSidebar}
//         className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm md:hidden transition-colors duration-200 hover:bg-gray-50"
//         aria-label="Open menu"
//       >
//         <Menu className="w-5 h-5 text-gray-600" />
//       </button>

//       {/* Desktop Sidebar */}
//       <DesktopSidebar />
      
//       {/* Mobile Sidebar */}
//       <MobileSidebar />

//       {/* Main content spacer - This ensures content doesn't go behind sidebar */}
//       <div className={`
//         transition-all duration-300 ease-in-out
//         ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}
//         min-h-screen
//       `}>
//         {/* Your main content will go here */}
//       </div>
//     </>
//   );
// };

// export default Sidebar;





// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
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
//       {/* Header with gradient accent */}
//       <div className="relative p-6 flex items-center justify-between">
//         <div className="flex items-center gap-3 overflow-hidden">
//           {!isCollapsed && (
//             <>
//               <div className="relative">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
//                   <Activity className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 border-2 border-white"></div>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent whitespace-nowrap">
//                   PrepPortal
//                 </h2>
//                 <p className="text-xs text-gray-500 font-medium mt-0.5">Student Dashboard</p>
//               </div>
//             </>
//           )}
//           {isCollapsed && (
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 mx-auto">
//               <Activity className="w-5 h-5 text-white" />
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
//               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-purple-500 to-indigo-500"></div>
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
//         {/* Mobile Header with gradient */}
//         <div className="relative p-6 border-b border-gray-200/50">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
//                   <Activity className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 border-2 border-white"></div>
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                   PrepPortal
//                 </h2>
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
//         className="fixed top-6 left-6 z-50 w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 shadow-2xl md:hidden transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center group"
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
                <p className="text-xs text-gray-500 font-medium mt-0.5">Student Dashboard</p>
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
          className={`
            group flex items-center w-full rounded-xl transition-all duration-300
            hover:shadow-md active:scale-95
            bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50
            ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'}
          `}
        >
          <div className="relative">
            <LogOut className={`${isCollapsed ? 'w-5 h-5 text-gray-600' : 'w-5 h-5 mr-3 text-gray-600'}`} />
          </div>
          {!isCollapsed && (
            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
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
                <p className="text-xs text-gray-500 font-medium">Student Dashboard</p>
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

        {/* User info in mobile */}
        <div className="px-6 py-4 border-b border-gray-200/50">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-gray-900">Student</h3>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
        </div>

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
          <button className="flex items-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-rose-50 to-rose-100/50 hover:from-rose-100 hover:to-rose-200/50 transition-all duration-300 active:scale-95">
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