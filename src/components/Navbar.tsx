import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gunmetal-gray text-chrome-silver shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-cool-cyan">
              My Portfolio
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                Home
              </NavLink>
              <NavLink to="/about" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                About
              </NavLink>
              <NavLink to="/games" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                Games
              </NavLink>
              <NavLink to="/hackathons" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                Hackathons
              </NavLink>
              <NavLink to="/webapps" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                Web Apps
              </NavLink>
              <NavLink to="/contact" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-forge-black focus:outline-none"
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
        <div className="md:hidden bg-forge-black border-t border-cool-cyan/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink 
              to="/games" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Games
            </NavLink>
            <NavLink 
              to="/hackathons" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Hackathons
            </NavLink>
            <NavLink 
              to="/webapps" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Web Apps
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 