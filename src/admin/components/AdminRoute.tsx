import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAdminLoggedIn } from '../../hooks/useAuth';

const AdminRoute: React.FC = () => {
  const isLoggedIn = isAdminLoggedIn();
  
  // If not authenticated, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // If authenticated, render the child routes
  return <Outlet />;
};

export default AdminRoute; 