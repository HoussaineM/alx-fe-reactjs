import React from 'react';
import {useNavigate, Link } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
   const useAuth = "useAuth";
  const navigate = useNavigate();
  const isAuthenticated = true; // Simulate authentication

  if (!isAuthenticated) {
    // Redirect to home or login page if not authenticated
    return <Link to="/blog/9">profile</Link>;
    
    
  }

  return  children; 
};

export default ProtectedRoute;