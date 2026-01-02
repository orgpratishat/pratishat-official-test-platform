// LandingFooter.jsx
import React from 'react';
import { Sparkles, ChevronRight, CheckCircle2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Heart } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
             


 <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          <span className="text-white font-bold text-lg">≋</span>
        </div>


              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MedDestiny
                </h2>
                <p className="text-sm text-gray-400">AI-Powered Learning Platform</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering medical aspirants with AI-driven learning, expert mentorship, and comprehensive college counseling services.
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 hover:bg-gray-800/80 transition-colors duration-300 cursor-pointer group">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300 group-hover:text-white">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Courses', 'Test Series', 'Mentorship', 'Counseling', 'About Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm">
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                'NEET UG/PG Preparation',
                'MBBS Abroad Counseling',
                'Central Asia Admissions',
                'Indian College Counseling',
                'Documentation Support',
                'Visa Assistance',
                'Pre-departure Guidance'
              ].map((service) => (
                <li key={service} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white text-sm">support@meddestiny.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white text-sm">+7 99691 64036</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Office</p>
                  <p className="text-white text-sm">Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Follow Us</h4>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-500/20 hover:text-blue-400' },
                  { icon: Twitter, color: 'hover:bg-cyan-500/20 hover:text-cyan-400' },
                  { icon: Instagram, color: 'hover:bg-pink-500/20 hover:text-pink-400' },
                  { icon: Linkedin, color: 'hover:bg-blue-600/20 hover:text-blue-400' },
                  { icon: Youtube, color: 'hover:bg-red-500/20 hover:text-red-400' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© {new Date().getFullYear()} MedDestiny. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <span>Made with</span>
                <Heart
                  className="w-4 h-4 text-red-500"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <span>for medical aspirants</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-xs">24/7 Support Available</span>
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-800/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">1000+</div>
              <div className="text-xs text-gray-400">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">50+</div>
              <div className="text-xs text-gray-400">Partner Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">10+</div>
              <div className="text-xs text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-xs text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;