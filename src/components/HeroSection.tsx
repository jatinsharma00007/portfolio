import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  
  // Log current language (for testing)
  console.log("Current language:", i18n.language);
  
  // Function to change language (for testing)
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <section className="relative w-full bg-forge-black text-chrome-silver py-16 px-6 md:px-12">
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 space-x-2 text-sm font-semibold text-cool-cyan">
        <button 
          onClick={() => changeLanguage('en')} 
          className={`hover:text-molten-orange ${i18n.language === 'en' ? 'text-molten-orange' : ''}`}
        >
          EN
        </button>
        <span>|</span>
        <button 
          onClick={() => changeLanguage('hi')} 
          className={`hover:text-molten-orange ${i18n.language === 'hi' ? 'text-molten-orange' : ''}`}
        >
          HI
        </button>
        <span>|</span>
        <button 
          onClick={() => changeLanguage('ja')} 
          className={`hover:text-molten-orange ${i18n.language === 'ja' ? 'text-molten-orange' : ''}`}
        >
          JA
        </button>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Side Content */}
        <div className="w-full md:w-1/2 space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-chrome-silver">
            {t('home.greeting')} 👋
          </h1>
          <p className="text-lg text-steel-blue max-w-md">
            {t('home.description')}
          </p>
          <p className="text-sm uppercase tracking-wider text-cool-cyan font-medium">
            Game Developer &nbsp;•&nbsp; Hackathonist &nbsp;•&nbsp; Web & App Builder
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a href="#projects" className="px-5 py-3 rounded-xl bg-molten-orange text-white font-semibold hover:bg-ember-red transition">
              {t('home.cta.projects')}
            </a>
            <a href="/resume.pdf" download className="px-5 py-3 rounded-xl border border-cool-cyan text-cool-cyan hover:bg-cool-cyan hover:text-forge-black transition">
              {t('home.cta.resume')}
            </a>
            <a href="#contact" className="px-5 py-3 rounded-xl bg-steel-blue text-white hover:bg-cool-cyan hover:text-forge-black transition">
              {t('home.cta.contact')}
            </a>
          </div>
        </div>

        {/* Right Side Graphic */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/hero-avatar.svg"
            alt="Game Developer"
            className="w-64 md:w-80 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 