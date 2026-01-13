
// Landing.jsx
import { Users, BookOpen, BarChart3, Award, TrendingUp, Star, ChevronRight, Sparkles, Target, Clock, CheckCircle2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Globe, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';
export default function Landing() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/student-registration');
  };

  const features = [
    {
      icon: Users,
      title: "1-to-1 Mentorship",
      description: "Get personalized guidance from experienced MBBS students who've cracked the exams",
      color: "from-blue-500 to-purple-600",
      badge: "Premium",
      badgeColor: "bg-blue-50 text-blue-600",
      items: ['Weekly personal sessions', 'Study plan customization', 'Doubt resolution', 'Exam strategy guidance'],
      linkColor: "text-purple-600"
    },
    {
      icon: BookOpen,
      title: "Free Test Series",
      description: "Comprehensive test series covering all topics with detailed solutions",
      color: "from-green-500 to-emerald-600",
      badge: "Free Access",
      badgeColor: "bg-green-50 text-green-600",
      iconBadge: <Award className="w-4 h-4 text-yellow-500 animate-spin-slow" />,
      items: ['2000+ practice questions', 'Chapter-wise tests', 'Full syllabus mock tests', 'Previous year papers'],
      linkColor: "text-green-600"
    },
    {
      icon: BarChart3,
      title: "In-depth Test Analysis",
      description: "Get detailed insights into your performance with AI-powered analytics",
      color: "from-orange-500 to-red-600",
      badge: "AI Powered",
      badgeColor: "bg-orange-50 text-orange-600",
      iconBadge: <TrendingUp className="w-4 h-4 text-red-500 animate-pulse" />,
      items: ['Performance tracking', 'Weak area identification', 'Comparative analysis', 'Improvement suggestions'],
      linkColor: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Component */}
      <LandingHeader />

      {/* Main Content */}
      <div className="max-w-full">
        {/* Hero Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          {/* Left Section */}
          <div className="flex-1 w-full text-center lg:text-left relative z-10">
           
         

            {/* Main Heading with Animation */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6 lg:mb-8 animate-fade-in-up">
              Unlock Learning with
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Expert-Led Courses
              </span>
            </h1>

            {/* Stats and AI Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6 lg:mb-8">
              {/* Animated Avatars */}
              <div className="flex items-center -space-x-3">
                {['A', 'B', 'C'].map((letter, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm transition-transform duration-300 hover:scale-110 hover:z-10"
                    style={{
                      background: `linear-gradient(45deg, ${index === 0 ? '#ec4899' : index === 1 ? '#f97316' : '#8b5cf6'}, ${index === 0 ? '#db2777' : index === 1 ? '#ea580c' : '#7c3aed'})`,
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {letter}
                  </div>
                ))}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 border-2 border-white shadow-lg flex items-center justify-center text-gray-600 font-bold text-xs sm:text-sm hover:scale-110 transition-transform duration-300">
                  +999
                </div>
              </div>
              
              {/* AI Badge with Animation */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 group">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                  ⚡
                </div>
                <span className="text-orange-700 font-medium text-xs sm:text-sm group-hover:text-orange-800 transition-colors duration-300">
                  AI Powered Learning
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 lg:mb-8 max-w-sm mx-auto lg:mx-0 leading-relaxed text-sm sm:text-base animate-fade-in-up animation-delay-300">
              Join <span className="font-semibold text-purple-600">thousands of learners</span> gaining new skills through engaging, flexible online courses.
            </p>

            {/* CTA Button with Micro-interaction */}
            <button 
              onClick={handleRegister} 
              className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 sm:px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base
                       hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105
                       active:scale-95
                       transition-all duration-300 ease-out
                       overflow-hidden cursor-pointer w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started Free
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          {/* Right Section - Hero Image */}
          <div className="flex-1 w-full lg:w-auto relative flex flex-col items-center justify-center mt-8 lg:mt-0 animate-fade-in-up animation-delay-500">
            {/* Hero Image Container */}
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-800">
                  {/* Placeholder for actual image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-white text-xl font-bold mb-2">Interactive Learning</h3>
                      <p className="text-gray-300 text-sm">Test series + Live Mentorship</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-3 -right-3 bg-white rounded-full p-3 shadow-lg animate-float">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">95%</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-3 -left-3 bg-white rounded-full p-3 shadow-lg animate-float animation-delay-2000">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">AI</span>
                  </div>
                </div>
              </div>

              {/* Decorative Blur */}
              <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-10"></div>
            </div>

            {/* Scroll Indicator */}
            <div className="hidden lg:flex absolute right-0 top-1/2 transform translate-x-32 -translate-y-1/2 flex-col items-center animate-bounce-slow">
              <div className="w-0.5 h-24 bg-gradient-to-b from-purple-500 to-transparent mb-2"></div>
              <span className="text-gray-500 font-semibold text-sm rotate-90 origin-left whitespace-nowrap tracking-wider">
                EXPLORE MORE
              </span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-b from-white to-gray-50/50 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to
                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Succeed in Medicine
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Comprehensive learning solutions designed specifically for medical aspirants
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-purple-200 relative overflow-hidden"
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-purple-50/30 group-hover:to-blue-50/30 transition-all duration-500"></div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2">
                      <span className={`px-3 py-1 ${feature.badgeColor} rounded-full text-xs font-semibold`}>
                        {feature.badge}
                      </span>
                    </div>
                    
                    {/* Animated Icon Badge */}
                    {feature.iconBadge && (
                      <div className="absolute -bottom-2 -right-2">
                        {feature.iconBadge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      {feature.description}
                    </p>
                    
                    {/* Feature List */}
                    <ul className="space-y-3 mb-8">
                      {feature.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center gap-3 text-sm text-gray-700 group/item hover:text-gray-900 transition-colors duration-200"
                        >
                          <div className="w-2 h-2 bg-current rounded-full flex-shrink-0 opacity-60 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More Link */}
                    <div className="inline-flex items-center gap-2 font-semibold text-sm group/link cursor-pointer">
                      <span className={`${feature.linkColor} group-hover/link:underline`}>
                        Learn more
                      </span>
                      <ChevronRight className={`w-4 h-4 ${feature.linkColor} group-hover/link:translate-x-1 transition-transform duration-300`} />
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-current to-transparent opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced College Counseling Section */}
            <div className="mt-12 sm:mt-16">
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 rounded-2xl p-8 shadow-xl border border-indigo-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                {/* Animated Background */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <Globe className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -top-3 -right-3 animate-bounce">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xs">FREE</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg">
                          Global Admissions Support
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold">
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                          Zero Cost Counseling
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Complete Medical College Counseling
                        <span className="block text-lg font-normal text-gray-600 mt-2">
                          India & Central Asian Countries
                        </span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Indian Colleges Section */}
                        <div className="bg-white/90 rounded-xl p-5 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold">IN</span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg">
                              Indian Medical Colleges
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Complete guidance for both Government and Private medical colleges in India
                          </p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>NEET UG/PG Counseling</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>College Selection & Ranking</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>Documentation Assistance</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>Admission Process Guidance</span>
                            </li>
                          </ul>
                        </div>

                        {/* International Section */}
                        <div className="bg-white/90 rounded-xl p-5 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold">🌍</span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg">
                              Central Asia & Foreign Universities
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            We have students placed in Indian and foreign universities across Central Asia
                          </p>
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-gray-800 text-sm mb-1">Countries We Cover:</h5>
                              <p className="text-xs text-gray-600">Uzbekistan, Kazakhstan, Kyrgyzstan, Georgia, Russia, Philippines, Bangladesh</p>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-800 text-sm mb-1">Our Services Include:</h5>
                              <ul className="grid grid-cols-2 gap-1 text-xs">
                                <li className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                  <span>University Selection</span>
                                </li>
                                <li className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                  <span>Documentation</span>
                                </li>
                                <li className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                  <span>Visa Processing</span>
                                </li>
                                <li className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                  <span>Pre-departure</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Success Stats */}
                      <div className="bg-gradient-to-r from-white to-indigo-50/50 rounded-xl p-4 mb-6 border border-indigo-100">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">500+</div>
                            <div className="text-xs text-gray-600">Students Placed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">50+</div>
                            <div className="text-xs text-gray-600">Universities</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">10+</div>
                            <div className="text-xs text-gray-600">Countries</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">100%</div>
                            <div className="text-xs text-gray-600">Visa Success</div>
                          </div>
                        </div>
                      </div>

                      <button 
  onClick={handleRegister}
  className="group/btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
>
  <span className="flex items-center gap-2">
    Get Free Counseling Session
    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
  </span>
</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Footer */}
     <LandingFooter/>
      </div>

      {/* Add these styles to your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}