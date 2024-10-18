import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setAuthToken(token);
      setUserRole(role);
    }
  }, []);


  const cambiarContrasenia = (token, role) => {

    setAuthToken(token);
    setUserRole(role);
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    navigate('/CambiarContrasenia');
    
  };
 

  const login = (token, role) => {

    setAuthToken(token);
    setUserRole(role);
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    navigate('/');
    
  };

  const logout = () => {
    setAuthToken(null);
    setUserRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authToken, userRole, login, logout ,cambiarContrasenia }}>
      {children}
    </AuthContext.Provider>
  );
};
