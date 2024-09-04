import { createContext, useContext, useState } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// AuthProvider component to wrap your app and provide auth state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate login and saving token
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'your-jwt-token');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
