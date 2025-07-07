import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  // Update current language state when i18n language changes
  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
      .then(() => {
        console.log(`Language changed to ${code}`);
        setCurrentLang(code);
      })
      .catch(err => console.error('Error changing language:', err));
  };

  const languages = [
    { code: 'en', label: '🇺🇸' },
    { code: 'hi', label: '🇮🇳' },
    { code: 'ja', label: '🇯🇵' }
  ];

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
                {t('navigation.home')}
              </NavLink>
              <NavLink to="/about" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                {t('navigation.about')}
              </NavLink>
              <NavLink to="/games" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                {t('navigation.games')}
              </NavLink>
              <NavLink to="/hackathons" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                {t('navigation.hackathons')}
              </NavLink>
              <NavLink to="/webapps" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                {t('navigation.webapps')}
              </NavLink>
              <NavLink to="/contact" 
                className={({isActive}) => 
                  isActive ? "text-molten-orange" : "hover:text-molten-orange transition"
                }
              >
                {t('navigation.contact')}
              </NavLink>
              
              {/* Language switcher - Desktop */}
              <div className="flex gap-2 ml-4 border-l border-cool-cyan/30 pl-4">
                {languages.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className={`px-2 py-1 rounded transition-all ${
                      currentLang === code 
                        ? 'bg-molten-orange text-forge-black' 
                        : 'text-cool-cyan hover:bg-forge-black/30'
                    }`}
                    aria-label={`Switch to ${code} language`}
                  >
                    {label}
                  </button>
                ))}
              </div>
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
              {t('navigation.home')}
            </NavLink>
            <NavLink 
              to="/about" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.about')}
            </NavLink>
            <NavLink 
              to="/games" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.games')}
            </NavLink>
            <NavLink 
              to="/hackathons" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.hackathons')}
            </NavLink>
            <NavLink 
              to="/webapps" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.webapps')}
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md ${isActive ? "text-molten-orange" : "hover:text-molten-orange transition"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.contact')}
            </NavLink>
            
            {/* Language switcher - Mobile */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-cool-cyan/30">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`px-3 py-2 rounded flex-1 transition-all ${
                    currentLang === code 
                      ? 'bg-molten-orange text-forge-black' 
                      : 'text-cool-cyan hover:bg-forge-black/30'
                  }`}
                  aria-label={`Switch to ${code} language`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 