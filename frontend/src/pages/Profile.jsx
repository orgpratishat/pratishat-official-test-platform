// import React, { useEffect, useState } from 'react';
// import { useAuthStore } from '../store/authStore';
// import { updateProfile, getCurrentUser } from '../services/auth';
// import Card from '../components/ui/Card';
// import Input from '../components/ui/Input';
// import Button from '../components/ui/Button';
// import Spinner from '../components/ui/Spinner';
// import { validateForm } from '../utils/validators';
// import toast from 'react-hot-toast';

// const Profile = () => {
//   const { user, fetchCurrentUser, loading: authLoading } = useAuthStore();
//   const [formData, setFormData] = useState({
//     fullName: user?.profile?.fullName || '',
//     phone: user?.profile?.phone || '',
//     avatar: user?.profile?.avatar || ''
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!user) {
//       fetchCurrentUser();
//     }
//   }, []);

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         fullName: user.profile.fullName || '',
//         phone: user.profile.phone || '',
//         avatar: user.profile.avatar || ''
//       });
//     }
//   }, [user]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const validation = validateForm(formData, {
//       fullName: { required: true, min: 2 },
//       phone: { required: false },
//       avatar: { required: false }
//     });
//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await updateProfile(formData);
//       if (res.success) {
//         toast.success('Profile updated');
//       } else {
//         toast.error(res.message || 'Update failed');
//       }
//     } catch {
//       toast.error('Update failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (authLoading || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-lg mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
//       <Card className="p-6">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <Input
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className={errors.fullName ? 'border-red-300 focus:ring-red-500' : ''}
//             />
//             {errors.fullName && (
//               <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//             <Input
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
//             <Input
//               name="avatar"
//               value={formData.avatar}
//               onChange={handleChange}
//             />
//           </div>
//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? 'Saving...' : 'Save Changes'}
//           </Button>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default Profile;




import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { updateProfile } from '../services/auth';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { validateForm } from '../utils/validators';
import toast from 'react-hot-toast';
import { 
  User, 
  Phone, 
  Image as ImageIcon,
  ArrowLeft,
  Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { user, fetchCurrentUser, loading: authLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: user?.profile?.fullName || '',
    phone: user?.profile?.phone || '',
    avatar: user?.profile?.avatar || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (!user) {
      fetchCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.profile.fullName || '',
        phone: user.profile.phone || '',
        avatar: user.profile.avatar || ''
      });
      setAvatarPreview(user.profile.avatar || '');
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    
    if (name === 'avatar') {
      setAvatarPreview(value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validation = validateForm(formData, {
      fullName: { required: true, min: 2 },
      phone: { required: false },
      avatar: { required: false }
    });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setLoading(true);
    try {
      const res = await updateProfile(formData);
      if (res.success) {
        toast.success('Profile updated successfully!');
        fetchCurrentUser();
      } else {
        toast.error(res.message || 'Update failed');
      }
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Spinner size={48} />
          <p className="text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
        <span>Back to Dashboard</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
          Your Profile
        </h1>
        <p className="text-gray-500 mt-2">Update your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 border border-gray-200/50 shadow-soft-xl">
            {/* Profile Picture */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/20 mx-auto overflow-hidden">
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><User class="w-16 h-16 text-white" /></div>';
                      }}
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-1">{formData.fullName || user.username}</h2>
              <p className="text-gray-500">Mentor</p>
            </div>

            {/* User Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500">Username</div>
                  <div className="font-medium text-gray-900">{user.username}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500">Profile Status</div>
                  <div className="font-medium text-gray-900">
                    {formData.avatar ? 'Custom Avatar' : 'Default Avatar'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/50 shadow-soft-xl overflow-hidden">
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100/30">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Full Name Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <User className="w-4 h-4 text-blue-600" />
                    Full Name
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full transition-all duration-300 rounded-xl px-4 py-3 border ${
                      errors.fullName 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <Phone className="w-4 h-4 text-purple-600" />
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full transition-all duration-300 rounded-xl px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Avatar URL Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    Profile Picture URL
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        className="w-full transition-all duration-300 rounded-xl px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="https://example.com/avatar.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Enter a direct image URL for your profile picture
                      </p>
                    </div>
                    {avatarPreview && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={avatarPreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-100"><ImageIcon class="w-6 h-6 text-gray-400" /></div>';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner size={20} className="text-white" />
                      <span>Saving Changes...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;