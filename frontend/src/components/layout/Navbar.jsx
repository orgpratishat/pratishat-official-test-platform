// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../../store/authStore';
// import Button from '../ui/Button';


// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuthStore();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
//       <div>
//         <Link to="/" className="text-2xl font-bold text-primary-600">
          
//           <div className='flex flex-col'>
//          <div className='flex'>
//              <span>Crack</span><span className='text-blue-600'>G</span>
//          </div>
//           <span className='text-sm'>Mentor Dashboard</span>
//           </div>
//         </Link>
//       </div>
//       <div className="flex items-center space-x-4">
//         {user ? (
//           <>
//             <span className="text-gray-700">Hello, {user.profile?.fullName}</span>
//             <Button variant="outline" size="sm" onClick={handleLogout}>
//               Logout
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
//               Login
//             </Button>
//             <Button variant="outline" size="sm" onClick={() => navigate('/register')}>
//               Register
//             </Button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import { 
  User, 
  LogOut, 
  Bell, 
  Search, 
  Settings, 
  ChevronDown, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-white to-gray-50/80 backdrop-blur-xl border-b border-gray-200/50 px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => navigate('/landing')} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                <span className="text-white font-bold text-xl">≋</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  Med<span className="text-purple-600">Destiny</span>
                </div>
                <span className="text-xs text-gray-500 font-medium block mt-0.5">Mentor Dashboard</span>
              </div>
            </div>
          </div>

          {/* Center: Search Bar - Desktop Only */}
          {/* <div className="hidden lg:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-300"
                placeholder="Search for tests, questions, or topics..."
              />
            </div>
          </div> */}

          {/* Right: User Actions */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            
            {/* User Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl hover:bg-gray-100/50 transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-sm">
                      {user.profile?.fullName ? (
                        <span className="text-white font-semibold text-sm">
                          {user.profile.fullName.charAt(0)}
                        </span>
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white"></div>
                  </div>
                  
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {user.profile?.fullName || user.username}
                    </div>
                    <div className="text-xs text-gray-500">Mentor</div>
                  </div>
                  
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsProfileMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-gray-200/50 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200/50">
                        <div className="text-sm font-semibold text-gray-900">{user.profile?.fullName || user.username}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                      
                      <div className="py-1">
                        <button
                          onClick={() => navigate('/profile')}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3"
                        >
                          <User className="h-4 w-4" />
                          Your Profile
                        </button>
                        <button
                          onClick={() => navigate('/settings')}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </button>
                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3">
                          <Bell className="h-4 w-4" />
                          Notifications
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-200/50 py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 transition-colors duration-200 flex items-center gap-3"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="border-gray-300 hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Register
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden ml-2 p-2 rounded-xl hover:bg-gray-100/50 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-3 border-t border-gray-200/50 pt-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            {user ? (
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100/50 transition-colors">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Notifications</span>
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100/50 transition-colors"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100/50 transition-colors">
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full border-gray-300 hover:border-purple-500 hover:text-purple-600"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>

    
    </>
  );
};

export default Navbar;