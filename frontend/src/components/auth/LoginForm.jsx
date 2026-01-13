
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../../store/authStore';
// import Button from '../ui/Button';
// import Input from '../ui/Input';
// import Card from '../ui/Card';
// import Spinner from '../ui/Spinner';
// import { validateForm } from '../../utils/validators';
// import toast from 'react-hot-toast';

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const { login, loading, error, user, clearError } = useAuthStore();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});

//   // Redirect if user is already logged in
//   useEffect(() => {
//     if (user) {
//       navigate('/dashboard');
//     }
//   }, [user, navigate]);

//   // Clear errors when component unmounts or when error changes
//   useEffect(() => {
//     return () => {
//       clearError();
//     };
//   }, [clearError]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//     // Clear global error when user starts typing
//     if (error) {
//       clearError();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Clear previous errors
//     setErrors({});
//     clearError();

//     // Validate form
//     const validation = validateForm(formData, {
//       email: { required: true, email: true },
//       password: { required: true, min: 6 }
//     });

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     try {
//       const result = await login(formData);
//       console.log("Login result:", result);
      
//       if (result && result.success) {
//         toast.success('Login successful!');
//         console.log("Redirecting to dashboard...");
        
//         // Use setTimeout to ensure state updates are processed
//         setTimeout(() => {
//           navigate('/dashboard', { replace: true });
//         }, 100);
//       } else {
//         toast.error(result?.message || 'Login failed');
//         console.log("Login failed - no success flag");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       toast.error(err.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{' '}
//             <button
//               onClick={() => navigate('/register')}
//               className="font-medium text-primary-600 hover:text-primary-500"
//             >
//               create a new account
//             </button>
//           </p>
//         </div>

//         <Card className="p-8">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   className={errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
//                   required
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   className={errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
//                   required
//                 />
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//                 )}
//               </div>
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
//                 {error}
//               </div>
//             )}

//             <div>
//               <Button
//                 type="submit"
                
//                 className="w-full bg-primary-600 hover:bg-primary-700  py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-black border-2"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <Spinner size={16} className="mr-2" />
//                     Signing in...
//                   </div>
//                 ) : (
//                   'Sign in'
//                 )}
//               </Button>
//             </div>
//           </form>
//         </Card>

       
//       </div>
//     </div>
//   );
// };

// export default LoginForm;









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';
import { validateForm } from '../../utils/validators';
import toast from 'react-hot-toast';
import LandingHeader from '../../components/LandingHeader';
import LandingFooter from '../../components/LandingFooter';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading, error, user, clearError } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Clear errors when component unmounts or when error changes
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear global error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    clearError();

    // Validate form
    const validation = validateForm(formData, {
      email: { required: true, email: true },
      password: { required: true, min: 6 }
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      const result = await login(formData);
      console.log("Login result:", result);
      
      if (result && result.success) {
        toast.success('Login successful!');
        console.log("Redirecting to dashboard...");
        
        // Use setTimeout to ensure state updates are processed
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 100);
      } else {
        toast.error(result?.message || 'Login failed');
        console.log("Login failed - no success flag");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <LandingHeader />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-md w-full space-y-8 relative z-10">
          {/* Logo/Header Section */}
          <div className="text-center">
            

            {/* Logo */}
            <div 
              className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mb-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer mt-6"
              onClick={() => navigate('/landing')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="text-white font-bold text-2xl">≋</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome Back to
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MedDestiny
              </span>
            </h2>
            <p className="text-gray-600 font-medium">
              Continue your medical learning journey
            </p>
          </div>

          {/* Main Card */}
          <div 
            className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 transform transition-all duration-500 hover:shadow-3xl"
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
            }}
          >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-t-2xl"></div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-indigo-600" />
                  </div>
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 tracking-wide">
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`
                      w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                      ${errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50' 
                        : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                      }
                      bg-white/50
                      text-gray-900 placeholder-gray-400
                      focus:shadow-lg
                    `}
                    required
                  />
                  {errors.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-purple-600" />
                  </div>
                  <label htmlFor="password" className="text-sm font-semibold text-gray-700 tracking-wide">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`
                      w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                      ${errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50' 
                        : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                      }
                      bg-white/50
                      text-gray-900 placeholder-gray-400
                      focus:shadow-lg
                    `}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </p>
                )}
                
                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300 hover:underline"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 px-4 py-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className={`
                    w-full py-3.5 px-4 rounded-xl text-white font-bold text-base
                    bg-gradient-to-r from-purple-600 to-blue-600
                    hover:from-purple-700 hover:to-blue-700
                    hover:shadow-xl hover:shadow-purple-500/30
                    transform transition-all duration-300
                    hover:scale-[1.02] active:scale-[0.98]
                    focus:outline-none focus:ring-4 focus:ring-purple-300/50
                    shadow-lg
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                  `}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Spinner size={20} className="text-white" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Continue to Dashboard</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">New to MedDestiny?</span>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-800 font-semibold
                hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700
                active:bg-purple-100
                transform transition-all duration-300
                hover:scale-[1.02] active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-purple-200
                flex items-center justify-center space-x-2"
            >
              <span>Create a new account</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>


          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500 font-medium">
              By continuing, you agree to our
              <button className="text-purple-600 hover:text-purple-800 mx-1 hover:underline" onClick={() => navigate('/terms')}>Terms</button>
              and
              <button className="text-purple-600 hover:text-purple-800 mx-1 hover:underline" onClick={() => navigate('/privacy')}>Privacy Policy</button>
            </p>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} MedDestiny. Empowering medical aspirants.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <LandingFooter />

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;