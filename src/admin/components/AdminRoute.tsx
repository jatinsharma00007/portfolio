import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminGuard } from '../../hooks/useAdminGuard';

const AdminRoute: React.FC = () => {
  // Use the admin guard hook
  useAdminGuard();
  
  return <Outlet />;
};

export default AdminRoute; 