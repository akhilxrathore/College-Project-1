import { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('shopsphere_token') || null);
  const [loading, setLoading] = useState(true);

  // Verify active session on app load
  const loadUser = useCallback(async () => {
    try {
      const response = await authService.getMe();
      if (response && response.data) {
        setUser(response.data);
      }
    } catch {
      // Token or cookie expired/invalid
      setUser(null);
      setToken(null);
      localStorage.removeItem('shopsphere_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response && response.data) {
      setUser(response.data);
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('shopsphere_token', response.data.token);
      }
    }
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    if (response && response.data) {
      setUser(response.data);
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('shopsphere_token', response.data.token);
      }
    }
    return response;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('shopsphere_token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
