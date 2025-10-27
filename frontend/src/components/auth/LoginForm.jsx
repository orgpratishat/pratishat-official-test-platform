// import React, { useState } from 'react';
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
//   const { login, loading, error } = useAuthStore();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
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
//       email: { required: true, email: true },
//       password: { required: true, min: 6 }
//     });

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     try {
//       await login(formData);
//       toast.success('Login successful!');
//       navigate('/dashboard');
//     } catch (err) {
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
//                 />
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//                 )}
//               </div>
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//                 {error}
//               </div>
//             )}

//             <div>
//               <Button
//                 type="submit"
//                 className="w-full bg-gray-200"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <div className="flex items-center">
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

//         {/* Demo Credentials */}
//         <Card className="p-4 bg-blue-50 border-blue-200">
//           <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
//           <div className="text-xs text-blue-700 space-y-1">
//             <p><strong>User:</strong> user@neetplatform.com / user123</p>
//             <p><strong>Admin:</strong> admin@neetplatform.com / admin123</p>
//           </div>
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
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import { validateForm } from '../../utils/validators';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading, error, user, clearError } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              create a new account
            </button>
          </p>
        </div>

        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                  required
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                
                className="w-full bg-primary-600 hover:bg-primary-700  py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-black border-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Spinner size={16} className="mr-2" />
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>
            </div>
          </form>
        </Card>

       
      </div>
    </div>
  );
};

export default LoginForm;