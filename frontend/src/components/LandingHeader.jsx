
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact-us');
  };

  const handleAboutClick = () => {
    navigate('/about-us');
  };

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-100 bg-white sticky top-0 z-50 overflow-hidden">
      {/* Logo and About Us on the left */}
      <div className="flex items-center gap-4 sm:gap-8">
        {/* Logo */}
        <div 
          onClick={() => navigate('/landing')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            <span className="text-white font-bold text-lg">≋</span>
          </div>
          <span className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
            Med<span className="text-purple-600">Destiny</span>
          </span>
        </div>
      </div>

      {/* Home and Contact Us on the right */}
      <div className="flex items-center gap-3 sm:gap-4 relative">
        {/* Home Button - Hidden on mobile, visible on md and larger */}
        <button
          onClick={() => navigate('/landing')}
          className="hidden md:block px-4 py-2 bg-black text-white rounded-full text-sm font-medium
                   transition-all duration-300 ease-out
                   hover:scale-105 hover:shadow-lg hover:bg-gray-900 hover:shadow-black/20
                   active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                   relative overflow-hidden group"
        >
          <span className="relative z-10">Home</span>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        </button>

        {/* Contact Us Button */}
        <button
          onClick={handleContactClick}
          className="px-4 sm:px-5 py-2.5 border border-gray-300 text-black rounded-full text-sm font-medium
                   transition-all duration-400 ease-out
                   hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-transparent
                   hover:shadow-xl hover:shadow-purple-500/25
                   active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                   flex items-center gap-2 group relative overflow-hidden"
        >
          <span className="relative z-10 transition-transform duration-400 group-hover:-translate-x-0.5">
            Contact Us
          </span>
          <ArrowUpRight className="w-3 h-3 relative z-10 transition-all duration-400 ease-out
                                 group-hover:translate-x-0.5 group-hover:translate-y-[-2px]
                                 group-hover:scale-125" />
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
        </button>
      </div>
    </header>
  );
}