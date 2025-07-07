import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFakeAuth } from '../../hooks/useFakeAuth';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useFakeAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <nav className="bg-gunmetal-gray border-b border-cool-cyan/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex-shrink-0 flex items-center">
              <span className="text-cool-cyan font-bold text-xl">Admin Panel</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-chrome-silver hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-ember-red/80 hover:bg-ember-red text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-chrome-silver hover:text-white hover:bg-gunmetal-gray focus:outline-none"
              aria-expanded="false"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gunmetal-gray border-t border-cool-cyan/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-chrome-silver hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left bg-ember-red/80 hover:bg-ember-red text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar; 