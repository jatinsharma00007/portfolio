import React, { useState, useEffect, useCallback } from 'react';
import { globalSettings } from '../../data/globalSettings';
import type { GlobalSettings as SettingsType } from '../../data/globalSettings';

// Utility function for debouncing
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const GlobalSettingsManager: React.FC = () => {
  // State for settings data
  const [settings, setSettings] = useState<SettingsType>({...globalSettings});
  const [savedSettings, setSavedSettings] = useState<SettingsType>({...globalSettings});
  
  // State for UI
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    socials: false,
    contact: false,
    navigation: false,
    i18n: false,
    misc: false
  });
  
  // Language options
  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ja', name: 'Japanese' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ru', name: 'Russian' },
  ];
  
  // Debounced settings for auto-save
  const debouncedSettings = useDebounce(settings, 2000);
  
  // Auto-save effect
  useEffect(() => {
    if (JSON.stringify(debouncedSettings) !== JSON.stringify(savedSettings)) {
      handleSave(false);
    }
  }, [debouncedSettings, savedSettings]);
  
  // Save function
  const handleSave = useCallback((showNotification = true) => {
    // In a real app, this would save to a database or API
    // For now, we'll just update our state
    setSavedSettings({...settings});
    console.log('Saved settings:', settings);
    
    if (showNotification) {
      // Show a success notification
      alert('Settings saved successfully!');
    }
  }, [settings]);
  
  // Toggle section expansion
  const toggleSection = useCallback((section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);
  
  // Handle form input changes
  const handleInputChange = useCallback((
    section: keyof SettingsType,
    field: string,
    value: string | boolean
  ) => {
    setSettings(prev => {
      const sectionObj = {...prev[section]};
      // Type assertion to allow string indexing
      (sectionObj as any)[field] = value;
      return {
        ...prev,
        [section]: sectionObj
      };
    });
  }, []);
  
  // Handle nested form input changes
  const handleNestedInputChange = useCallback((
    section: keyof SettingsType,
    subsection: string,
    field: string,
    value: string | boolean
  ) => {
    setSettings(prev => {
      const sectionObj = {...prev[section]};
      const subsectionObj = {...(sectionObj as any)[subsection]};
      (subsectionObj as any)[field] = value;
      (sectionObj as any)[subsection] = subsectionObj;
      return {
        ...prev,
        [section]: sectionObj
      };
    });
  }, []);
  
  // Handle language selection
  const handleLanguageToggle = useCallback((langCode: string) => {
    const supported = [...settings.i18n.supported];
    
    if (supported.includes(langCode)) {
      // Remove the language if it's already supported
      const filtered = supported.filter(code => code !== langCode);
      setSettings(prev => ({
        ...prev,
        i18n: {
          ...prev.i18n,
          supported: filtered,
          // If we're removing the default language, set default to first available or empty
          default: langCode === prev.i18n.default ? (filtered[0] || '') : prev.i18n.default
        }
      }));
    } else {
      // Add the language if it's not already supported
      setSettings(prev => ({
        ...prev,
        i18n: {
          ...prev.i18n,
          supported: [...supported, langCode],
          // If this is the first language, make it default
          default: supported.length === 0 ? langCode : prev.i18n.default
        }
      }));
    }
  }, [settings.i18n.supported]);
  
  // Set default language
  const handleDefaultLanguageChange = useCallback((langCode: string) => {
    // Only set as default if it's in the supported list
    if (settings.i18n.supported.includes(langCode)) {
      setSettings(prev => ({
        ...prev,
        i18n: {
          ...prev.i18n,
          default: langCode
        }
      }));
    }
  }, [settings.i18n.supported]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Settings Panel - 2/3 width on large screens */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header with save button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cool-cyan">Global Settings & Localization</h1>
          <button 
            onClick={() => handleSave(true)}
            className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Settings
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden">
          <button 
            onClick={() => toggleSection('profile')}
            className="w-full p-4 flex justify-between items-center bg-forge-black/30 border-b border-cool-cyan/20"
          >
            <h2 className="text-xl font-semibold text-molten-orange flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile Info
            </h2>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-cool-cyan transition-transform ${expandedSections.profile ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.profile && (
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="profile-name" className="block text-sm font-medium text-chrome-silver mb-1">
                  Name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={settings.profile.name}
                  onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="profile-tagline" className="block text-sm font-medium text-chrome-silver mb-1">
                  Tagline
                </label>
                <input
                  id="profile-tagline"
                  type="text"
                  value={settings.profile.tagline}
                  onChange={(e) => handleInputChange('profile', 'tagline', e.target.value)}
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                  placeholder="A short tagline that appears under your name"
                />
                <p className="mt-1 text-xs text-steel-blue">
                  This short phrase appears under your name throughout the site
                </p>
              </div>
              
              <div>
                <label htmlFor="profile-shortBio" className="block text-sm font-medium text-chrome-silver mb-1">
                  Short Bio
                </label>
                <textarea
                  id="profile-shortBio"
                  rows={3}
                  value={settings.profile.shortBio}
                  onChange={(e) => handleInputChange('profile', 'shortBio', e.target.value)}
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan resize-none"
                  placeholder="A brief introduction about yourself"
                />
                <p className="mt-1 text-xs text-steel-blue">
                  This appears on the homepage and contact sections (max 160 characters recommended)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Social Links Section */}
        <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden">
          <button 
            onClick={() => toggleSection('socials')}
            className="w-full p-4 flex justify-between items-center bg-forge-black/30 border-b border-cool-cyan/20"
          >
            <h2 className="text-xl font-semibold text-molten-orange flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Social Links
            </h2>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-cool-cyan transition-transform ${expandedSections.socials ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.socials && (
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="socials-github" className="block text-sm font-medium text-chrome-silver mb-1">
                  GitHub
                </label>
                <div className="flex">
                  <div className="bg-forge-black/70 px-3 py-2 rounded-l-lg border border-cool-cyan/30 border-r-0 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cool-cyan" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <input
                    id="socials-github"
                    type="url"
                    value={settings.socials.github}
                    onChange={(e) => handleInputChange('socials', 'github', e.target.value)}
                    className="flex-1 px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-r-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="socials-linkedin" className="block text-sm font-medium text-chrome-silver mb-1">
                  LinkedIn
                </label>
                <div className="flex">
                  <div className="bg-forge-black/70 px-3 py-2 rounded-l-lg border border-cool-cyan/30 border-r-0 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cool-cyan" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <input
                    id="socials-linkedin"
                    type="url"
                    value={settings.socials.linkedin}
                    onChange={(e) => handleInputChange('socials', 'linkedin', e.target.value)}
                    className="flex-1 px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-r-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="socials-twitter" className="block text-sm font-medium text-chrome-silver mb-1">
                  Twitter/X (optional)
                </label>
                <div className="flex">
                  <div className="bg-forge-black/70 px-3 py-2 rounded-l-lg border border-cool-cyan/30 border-r-0 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cool-cyan" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <input
                    id="socials-twitter"
                    type="url"
                    value={settings.socials.twitter}
                    onChange={(e) => handleInputChange('socials', 'twitter', e.target.value)}
                    className="flex-1 px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-r-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="socials-email" className="block text-sm font-medium text-chrome-silver mb-1">
                  Email Address
                </label>
                <div className="flex">
                  <div className="bg-forge-black/70 px-3 py-2 rounded-l-lg border border-cool-cyan/30 border-r-0 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cool-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="socials-email"
                    type="email"
                    value={settings.socials.email}
                    onChange={(e) => handleInputChange('socials', 'email', e.target.value)}
                    className="flex-1 px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-r-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="socials-resume" className="block text-sm font-medium text-chrome-silver mb-1">
                  Resume Link
                </label>
                <div className="flex">
                  <div className="bg-forge-black/70 px-3 py-2 rounded-l-lg border border-cool-cyan/30 border-r-0 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cool-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <input
                    id="socials-resume"
                    type="text"
                    value={settings.socials.resume}
                    onChange={(e) => handleInputChange('socials', 'resume', e.target.value)}
                    className="flex-1 px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-r-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    placeholder="/resume.pdf or https://drive.google.com/file/..."
                  />
                </div>
                <p className="mt-1 text-xs text-steel-blue">
                  Can be a local file path or external URL
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information Section */}
        <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden">
          <button 
            onClick={() => toggleSection('contact')}
            className="w-full p-4 flex justify-between items-center bg-forge-black/30 border-b border-cool-cyan/20"
          >
            <h2 className="text-xl font-semibold text-molten-orange flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact Information
            </h2>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-cool-cyan transition-transform ${expandedSections.contact ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.contact && (
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="contact-publicEmail" className="block text-sm font-medium text-chrome-silver mb-1">
                  Public Email Address
                </label>
                <input
                  id="contact-publicEmail"
                  type="email"
                  value={settings.contact.publicEmail}
                  onChange={(e) => handleInputChange('contact', 'publicEmail', e.target.value)}
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                  placeholder="contact@example.com"
                />
                <p className="mt-1 text-xs text-steel-blue">
                  This will be displayed publicly on your contact page
                </p>
              </div>
              
              <div>
                <label htmlFor="contact-whatsapp" className="block text-sm font-medium text-chrome-silver mb-1">
                  WhatsApp Number (optional)
                </label>
                <input
                  id="contact-whatsapp"
                  type="tel"
                  value={settings.contact.whatsapp}
                  onChange={(e) => handleInputChange('contact', 'whatsapp', e.target.value)}
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                  placeholder="+1 234 567 8900"
                />
                <p className="mt-1 text-xs text-steel-blue">
                  Include country code (e.g. +1 for US, +91 for India)
                </p>
              </div>
              
              <div>
                <label htmlFor="contact-telegram" className="block text-sm font-medium text-chrome-silver mb-1">
                  Telegram Username (optional)
                </label>
                <input
                  id="contact-telegram"
                  type="text"
                  value={settings.contact.telegram}
                  onChange={(e) => handleInputChange('contact', 'telegram', e.target.value)}
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                  placeholder="@yourusername"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Settings Section */}
        <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden">
          <button 
            onClick={() => toggleSection('navigation')}
            className="w-full p-4 flex justify-between items-center bg-forge-black/30 border-b border-cool-cyan/20"
          >
            <h2 className="text-xl font-semibold text-molten-orange flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Navigation Settings
            </h2>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-cool-cyan transition-transform ${expandedSections.navigation ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.navigation && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-cool-cyan mb-4">Show/Hide Navigation Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(settings.navigation.show).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <input
                        id={`nav-show-${key}`}
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleNestedInputChange('navigation', 'show', key, e.target.checked)}
                        className="h-5 w-5 text-cool-cyan focus:ring-cool-cyan border-cool-cyan/30 rounded bg-forge-black"
                      />
                      <label htmlFor={`nav-show-${key}`} className="ml-2 block text-sm font-medium text-chrome-silver">
                        Show {key.charAt(0).toUpperCase() + key.slice(1)} Page
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium text-cool-cyan mt-6 mb-4">Custom Navigation Labels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(settings.navigation.labels).map(([key, value]) => (
                  <div key={key}>
                    <label htmlFor={`nav-label-${key}`} className="block text-sm font-medium text-chrome-silver mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)} Label
                    </label>
                    <input
                      id={`nav-label-${key}`}
                      type="text"
                      value={value}
                      onChange={(e) => handleNestedInputChange('navigation', 'labels', key, e.target.value)}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Language Manager Section */}
        <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden">
          <button 
            onClick={() => toggleSection('i18n')}
            className="w-full p-4 flex justify-between items-center bg-forge-black/30 border-b border-cool-cyan/20"
          >
            <h2 className="text-xl font-semibold text-molten-orange flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Language Manager
            </h2>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-cool-cyan transition-transform ${expandedSections.i18n ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.i18n && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-cool-cyan mb-4">Supported Languages</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableLanguages.map(lang => (
                  <div key={lang.code} className="flex items-center space-x-3">
                    <input
                      id={`lang-${lang.code}`}
                      type="checkbox"
                      checked={settings.i18n.supported.includes(lang.code)}
                      onChange={() => handleLanguageToggle(lang.code)}
                      className="h-5 w-5 text-cool-cyan focus:ring-cool-cyan border-cool-cyan/30 rounded bg-forge-black"
                    />
                    <label htmlFor={`lang-${lang.code}`} className="flex items-center">
                      <span className="text-sm font-medium text-chrome-silver">{lang.name}</span>
                      <span className="ml-1 text-xs text-steel-blue">({lang.code})</span>
                    </label>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium text-cool-cyan mt-6 mb-4">Default Language</h3>
              <div className="flex flex-wrap gap-3">
                {settings.i18n.supported.map(langCode => {
                  const langName = availableLanguages.find(l => l.code === langCode)?.name || langCode;
                  return (
                    <div key={langCode} className="flex items-center">
                      <input
                        id={`default-lang-${langCode}`}
                        type="radio"
                        name="default-language"
                        checked={settings.i18n.default === langCode}
                        onChange={() => handleDefaultLanguageChange(langCode)}
                        className="h-4 w-4 text-cool-cyan focus:ring-cool-cyan border-cool-cyan/30 bg-forge-black"
                      />
                      <label htmlFor={`default-lang-${langCode}`} className="ml-2 block text-sm font-medium text-chrome-silver">
                        {langName}
                      </label>
                    </div>
                  );
                })}
              </div>
              {settings.i18n.supported.length === 0 && (
                <p className="text-sm text-ember-red mt-2">
                  You must select at least one supported language
                </p>
              )}
            </div>
          )}
        </div>

        {/* Miscellaneous Settings Section */}
        <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden">
          <button 
            onClick={() => toggleSection('misc')}
            className="w-full p-4 flex justify-between items-center bg-forge-black/30 border-b border-cool-cyan/20"
          >
            <h2 className="text-xl font-semibold text-molten-orange flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Miscellaneous Settings
            </h2>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-cool-cyan transition-transform ${expandedSections.misc ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.misc && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="misc-darkMode" className="block text-sm font-medium text-chrome-silver">
                    Dark Mode
                  </label>
                  <p className="text-xs text-steel-blue">
                    Enable dark mode as the default theme
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                  <input
                    id="misc-darkMode"
                    type="checkbox"
                    checked={settings.misc.darkMode}
                    onChange={(e) => handleInputChange('misc', 'darkMode', e.target.checked)}
                    className="absolute w-0 h-0 opacity-0"
                  />
                  <label
                    htmlFor="misc-darkMode"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                      settings.misc.darkMode ? 'bg-cool-cyan' : 'bg-gunmetal-gray'
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full transform transition-transform duration-300 ${
                        settings.misc.darkMode ? 'translate-x-6 bg-forge-black' : 'translate-x-0 bg-chrome-silver'
                      }`}
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="misc-maintenanceMode" className="block text-sm font-medium text-chrome-silver">
                    Maintenance Mode
                  </label>
                  <p className="text-xs text-steel-blue">
                    Display a maintenance banner on all pages
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                  <input
                    id="misc-maintenanceMode"
                    type="checkbox"
                    checked={settings.misc.maintenanceMode}
                    onChange={(e) => handleInputChange('misc', 'maintenanceMode', e.target.checked)}
                    className="absolute w-0 h-0 opacity-0"
                  />
                  <label
                    htmlFor="misc-maintenanceMode"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                      settings.misc.maintenanceMode ? 'bg-cool-cyan' : 'bg-gunmetal-gray'
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full transform transition-transform duration-300 ${
                        settings.misc.maintenanceMode ? 'translate-x-6 bg-forge-black' : 'translate-x-0 bg-chrome-silver'
                      }`}
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="misc-footerText" className="block text-sm font-medium text-chrome-silver mb-1">
                  Footer Text
                </label>
                <input
                  id="misc-footerText"
                  type="text"
                  value={settings.misc.footerText}
                  onChange={(e) => handleInputChange('misc', 'footerText', e.target.value)}
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                  placeholder="Footer copyright text or message"
                />
                <p className="mt-1 text-xs text-steel-blue">
                  Text that appears in the footer of all pages
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Save Button at Bottom */}
        <div className="flex justify-end mt-8 mb-12">
          <button 
            onClick={() => handleSave(true)}
            className="px-6 py-3 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save All Settings
          </button>
        </div>
      </div>

      {/* Live Preview Panel - 1/3 width on large screens, sticky on scroll */}
      <div className="hidden lg:block">
        <div className="sticky top-6">
          <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden">
            <div className="p-4 bg-forge-black/30 border-b border-cool-cyan/20">
              <h2 className="text-xl font-semibold text-molten-orange flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Live Preview
              </h2>
            </div>
            
            {/* Profile Preview */}
            <div className="p-6 space-y-6 max-h-[calc(100vh-20rem)] overflow-y-auto">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-cool-cyan/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cool-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{settings.profile.name}</h3>
                <p className="text-cool-cyan mb-3">{settings.profile.tagline}</p>
                <p className="text-chrome-silver text-sm mb-6">{settings.profile.shortBio}</p>
              </div>
              
              {/* Social Links Preview */}
              <div className="flex justify-center space-x-4 mb-6">
                {settings.socials.github && (
                  <a href={settings.socials.github} target="_blank" rel="noopener noreferrer" className="text-cool-cyan hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                
                {settings.socials.linkedin && (
                  <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-cool-cyan hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                
                {settings.socials.twitter && (
                  <a href={settings.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-cool-cyan hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                )}
                
                {settings.socials.email && (
                  <a href={`mailto:${settings.socials.email}`} className="text-cool-cyan hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                )}
                
                {settings.socials.resume && (
                  <a href={settings.socials.resume} target="_blank" rel="noopener noreferrer" className="text-cool-cyan hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                )}
              </div>
              
              {/* Navigation Preview */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-white mb-2">Navigation Preview</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.entries(settings.navigation.show)
                    .filter(([_, isShown]) => isShown)
                    .map(([key]) => (
                      <div 
                        key={key} 
                        className="px-3 py-1 rounded-md bg-forge-black text-cool-cyan text-sm"
                      >
                        {settings.navigation.labels[key as keyof typeof settings.navigation.labels]}
                      </div>
                    ))
                  }
                </div>
              </div>
              
              {/* Language Settings Preview */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-white mb-2">Language Settings</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {settings.i18n.supported.map(lang => {
                    const langName = availableLanguages.find(l => l.code === lang)?.name || lang;
                    const isDefault = settings.i18n.default === lang;
                    return (
                      <div 
                        key={lang} 
                        className={`px-3 py-1 rounded-md text-sm ${
                          isDefault 
                            ? 'bg-cool-cyan text-forge-black font-medium' 
                            : 'bg-forge-black text-cool-cyan'
                        }`}
                      >
                        {langName} {isDefault && '(Default)'}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Contact Info Preview */}
              {(settings.contact.publicEmail || settings.contact.whatsapp || settings.contact.telegram) && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold text-white mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm text-chrome-silver">
                    {settings.contact.publicEmail && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-cool-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {settings.contact.publicEmail}
                      </div>
                    )}
                    {settings.contact.whatsapp && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-cool-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {settings.contact.whatsapp}
                      </div>
                    )}
                    {settings.contact.telegram && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-cool-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        {settings.contact.telegram}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Footer Preview */}
              <div className="pt-4 border-t border-cool-cyan/20">
                <div className="text-center text-xs text-chrome-silver">
                  {settings.misc.footerText}
                </div>
              </div>
              
              {/* Maintenance Mode Banner (if enabled) */}
              {settings.misc.maintenanceMode && (
                <div className="mt-6 p-3 bg-ember-red/20 border border-ember-red/30 rounded-lg text-center">
                  <p className="text-sm text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Site is currently in maintenance mode
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettingsManager; 