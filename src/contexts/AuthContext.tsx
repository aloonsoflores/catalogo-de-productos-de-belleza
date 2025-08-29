import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, LoginCredentials, AuthState } from '../types/Auth';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials (in production, this should be handled by a backend)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'beauty2025'
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: false,
    error: null
  });

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('beauty-admin-auth');
    if (savedAuth === 'true') {
      setAuthState(prev => ({ ...prev, isAuthenticated: true }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem('beauty-admin-auth', 'true');
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      toast.success('¡Bienvenido al panel de administración!');
    } else {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: 'Credenciales incorrectas. Verifica tu usuario y contraseña.'
      });
      toast.error('Credenciales incorrectas');
    }
  };

  const logout = () => {
    localStorage.removeItem('beauty-admin-auth');
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    toast.success('Sesión cerrada correctamente');
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};