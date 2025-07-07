import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFakeAuth } from '../../hooks/useFakeAuth';
import AdminNavbar from '../../components/admin/Navbar';
import MessageManager from '../../components/admin/MessageManager';
import ProjectManager from '../../components/admin/ProjectManager';
import HackathonManager from '../../components/admin/HackathonManager';
import VisitorStats from '../../components/admin/VisitorStats';

const Dashboard = () => {
  const { isAuthenticated, loading } = useFakeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-forge-black flex justify-center items-center">
        <div className="text-cool-cyan">Loading...</div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-forge-black">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-cool-cyan">Admin Dashboard</h1>
          <p className="text-chrome-silver/70">Manage your portfolio content</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MessageManager />
          <ProjectManager />
          <HackathonManager />
          <VisitorStats />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 