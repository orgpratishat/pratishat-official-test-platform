import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { updateProfile, getCurrentUser } from '../services/auth';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { validateForm } from '../utils/validators';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, fetchCurrentUser, loading: authLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: user?.profile?.fullName || '',
    phone: user?.profile?.phone || '',
    avatar: user?.profile?.avatar || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
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
        toast.success('Profile updated');
      } else {
        toast.error(res.message || 'Update failed');
      }
    } catch {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'border-red-300 focus:ring-red-500' : ''}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
            <Input
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
