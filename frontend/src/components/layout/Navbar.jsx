import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';


const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <div>
        <Link to="/" className="text-2xl font-bold text-primary-600">
          
          <span>Crack</span><span className='text-blue-600'>G</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">Hello, {user.profile?.fullName}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/register')}>
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
