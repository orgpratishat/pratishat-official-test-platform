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
//     fullName: ''
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
//       username: { required: true, username: true },
//       email: { required: true, email: true },
//       password: { required: true, password: true },
//       fullName: { required: true, min: 2 }
//     });

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setLoading(true);
//     try {
//       await registerService(formData);
//       toast.success('Account created successfully!');
//       navigate('/dashboard');
//     } catch (err) {
//       toast.error(err.message || 'Registration failed');
//       if (err.errors) {
//         setErrors(err.errors);
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
//                 Full Name
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
//                 Username
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
//               <Button
//                 type="submit"
//                 className="w-full bg-black"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <div className="flex items-center">
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
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import { validateForm } from '../../utils/validators';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    role: 'user' // Default role
  });
  const [errors, setErrors] = useState({});

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              sign in to existing account
            </button>
          </p>
        </div>

        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <div className="mt-1">
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username *
              </label>
              <div className="mt-1">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className={errors.username ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address *
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
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Choose a password"
                  className={errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 6 characters long
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role *
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                    errors.role ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Spinner size={16} className="mr-2" />
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;