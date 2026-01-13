


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { register as registerService } from '../../services/auth';
// import Button from '../ui/Button';
// import Input from '../ui/Input';
// import Card from '../ui/Card';
// import Spinner from '../ui/Spinner';
// import { validateForm } from '../../utils/validators';
// import toast from 'react-hot-toast';

// const RegisterForm = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     fullName: '',
//     role: 'user' // Default role
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     const validation = validateForm(formData, {
//       username: { required: true, min: 3 },
//       email: { required: true, email: true },
//       password: { required: true, min: 6 },
//       fullName: { required: true, min: 2 },
//       role: { required: true }
//     });

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await registerService(formData);
//       if (result.success) {
//         toast.success('Account created successfully!');
//         navigate('/dashboard');
//       } else {
//         toast.error(result.message || 'Registration failed');
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message || 'Registration failed');
//       if (err.response?.data?.errors) {
//         setErrors(err.response.data.errors);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{' '}
//             <button
//               onClick={() => navigate('/login')}
//               className="font-medium text-primary-600 hover:text-primary-500"
//             >
//               sign in to existing account
//             </button>
//           </p>
//         </div>

//         <Card className="p-8">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//                 Full Name *
//               </label>
//               <div className="mt-1">
//                 <Input
//                   id="fullName"
//                   name="fullName"
//                   type="text"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Enter your full name"
//                   className={errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
//                 />
//                 {errors.fullName && (
//                   <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                 Username *
//               </label>
//               <div className="mt-1">
//                 <Input
//                   id="username"
//                   name="username"
//                   type="text"
//                   value={formData.username}
//                   onChange={handleChange}
//                   placeholder="Choose a username"
//                   className={errors.username ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
//                 />
//                 {errors.username && (
//                   <p className="mt-1 text-sm text-red-600">{errors.username}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address *
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
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password *
//               </label>
//               <div className="mt-1">
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Choose a password"
//                   className={errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
//                 />
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//                 )}
//                 <p className="mt-1 text-xs text-gray-500">
//                   Must be at least 6 characters long
//                 </p>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                 Role *
//               </label>
//               <div className="mt-1">
//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
//                     errors.role ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
//                   }`}
//                 >
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                 </select>
//                 {errors.role && (
//                   <p className="mt-1 text-sm text-red-600">{errors.role}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <Button
//                 type="submit"
//                 className="w-full bg-black text-white hover:bg-gray-800"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <Spinner size={16} className="mr-2" />
//                     Creating account...
//                   </div>
//                 ) : (
//                   'Create account'
//                 )}
//               </Button>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerService } from '../../services/auth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';
import { validateForm } from '../../utils/validators';
import toast from 'react-hot-toast';
import LandingHeader from '../../components/LandingHeader';
import LandingFooter from '../../components/LandingFooter';
import { User, Mail, Lock, Eye, EyeOff, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm(formData, {
      username: { required: true, min: 3 },
      email: { required: true, email: true },
      password: { required: true, min: 6 },
      fullName: { required: true, min: 2 },
      role: { required: true }
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      const result = await registerService(formData);
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed');
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <LandingHeader />

      {/* Main Content - Same as login form */}
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
              className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mb-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer mt-3"
              onClick={() => navigate('/landing')}
            >
              <span className="text-white font-bold text-2xl">≋</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 ">
              Create Your Account
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Start Your Journey
              </span>
            </h2>
           
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
              {/* Full Name */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-600" />
                  </div>
                  <label htmlFor="fullName" className="text-sm font-semibold text-gray-700 tracking-wide">
                    Full Name *
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`
                      w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                      ${errors.fullName 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50' 
                        : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                      }
                      bg-white/50
                      text-gray-900 placeholder-gray-400
                      focus:shadow-lg
                    `}
                  />
                  {errors.fullName && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.fullName && (
                  <p className="text-sm text-red-600 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <label htmlFor="username" className="text-sm font-semibold text-gray-700 tracking-wide">
                    Username *
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className={`
                      w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                      ${errors.username 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                      }
                      bg-white/50
                      text-gray-900 placeholder-gray-400
                      focus:shadow-lg
                    `}
                  />
                  {errors.username && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.username && (
                  <p className="text-sm text-red-600 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-purple-600" />
                  </div>
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 tracking-wide">
                    Email Address *
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`
                      w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                      ${errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50' 
                        : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                      }
                      bg-white/50
                      text-gray-900 placeholder-gray-400
                      focus:shadow-lg
                    `}
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

              {/* Password */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-green-600" />
                  </div>
                  <label htmlFor="password" className="text-sm font-semibold text-gray-700 tracking-wide">
                    Password *
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Choose a password"
                    className={`
                      w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                      ${errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50' 
                        : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100'
                      }
                      bg-white/50
                      text-gray-900 placeholder-gray-400
                      focus:shadow-lg
                      pr-10
                    `}
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
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  Must be at least 6 characters long
                </p>
              </div>

              {/* Role */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <label htmlFor="role" className="text-sm font-semibold text-gray-700 tracking-wide">
                    Account Type *
                  </label>
                </div>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`
                      w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                      ${errors.role 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50' 
                        : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                      }
                      bg-white/50
                      text-gray-900
                      focus:shadow-lg
                      appearance-none
                    `}
                  >
                    <option value="user">Student (Free Access)</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                {errors.role && (
                  <p className="text-sm text-red-600 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.role}
                  </p>
                )}
              </div>

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
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Create Account</span>
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
                <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-800 font-semibold
                hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700
                active:bg-purple-100
                transform transition-all duration-300
                hover:scale-[1.02] active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-purple-200
                flex items-center justify-center space-x-2"
            >
              <span>Sign in to existing account</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500 font-medium">
              By creating an account, you agree to our
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

export default RegisterForm;



