import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);  // Add username state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const storedUsername = localStorage.getItem('username');  // Retrieve username from localStorage
    if (token) {
      setAuthToken(token);
      setUserRole(role);
      setUsername(storedUsername);  // Set username in state
    }
  }, []);

  const cambiarContrasenia = (token, role, username) => {
    setAuthToken(token);
    setUserRole(role);
    setUsername(username);  // Store username
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);  // Save username to localStorage
    navigate('/CambiarContrasenia');
  };

  const login = (token, role, username) => {
    setAuthToken(token);
    setUserRole(role);
    setUsername(username);  // Store username
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);  // Save username to localStorage
    navigate('/');
  };

  const logout = () => {
    setAuthToken(null);
    setUserRole(null);
    setUsername(null);  // Clear username
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');  // Remove username from localStorage
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authToken, userRole, username, login, logout, cambiarContrasenia }}>
      {children}
    </AuthContext.Provider>
  );
};
