import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto bg-forge-black rounded-lg shadow-lg p-8 border border-cool-cyan/20">
        <h1 className="text-5xl font-bold text-molten-orange mb-6">404</h1>
        <h2 className="text-3xl font-semibold text-cool-cyan mb-4">{t('notFound.title', 'Page Not Found')}</h2>
        
        <div className="my-8">
          <p className="text-chrome-silver text-lg mb-4">
            {t('notFound.message', 'The page you are looking for does not exist or has been moved.')}
          </p>
          
          <div className="flex justify-center items-center mt-8">
            <svg 
              className="w-24 h-24 text-molten-orange opacity-80" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>
        
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-cool-cyan text-forge-black font-semibold rounded-md hover:bg-molten-orange transition-colors duration-300"
        >
          {t('notFound.goHome', 'Go Back Home')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 