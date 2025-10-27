import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, PieChart, BookOpen, User, Activity, LogOut } from 'lucide-react';

const links = [
  // { to: '/', icon: Home, label: 'Home' },
  { to: '/dashboard', icon: PieChart, label: 'Dashboard' },
  { to: '/tests', icon: ClipboardList, label: 'Tests' },
  // { to: '/analytics', icon: Activity, label: 'Analytics' },
  { to: '/chapterwise', icon: BookOpen, label: 'Chapterwise' },
  { to: '/pyq', icon: BookOpen, label: 'PYQ' },
  { to: '/dpp', icon: BookOpen, label: 'DPP' },
  { to: '/memories', icon: ClipboardList, label: 'Memories' },
  { to: '/admin', icon: PieChart, label: 'Admin Panel' }
  // { to: '/leaderboard', icon: Activity, label: 'Leaderboard' },
  // { to: '/profile', icon: User, label: 'Profile' }
   
 
];

const Sidebar = () => (
  <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
    <div className="p-4">
      <h2 className="text-xl font-semibold text-primary-600">Menu</h2>
    </div>
    <nav className="flex flex-col p-2 space-y-1">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg transition-colors ${
              isActive ? 'bg-primary-100 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <Icon className="w-5 h-5 mr-3" />
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
