import { useAuthStore } from '../store/authStore';
import { isAuthenticated } from '../services/auth';

export const useAuth = () => {
  const { user, loading, error, login, logout } = useAuthStore();
  
  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: isAuthenticated()
  };
};
