import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LiveChat from './LiveChat';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage(t('contact.form.errors.allFields'));
      setIsSubmitting(false);
      setSubmitSuccess(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(t('contact.form.errors.validEmail'));
      setIsSubmitting(false);
      setSubmitSuccess(false);
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="w-full bg-gunmetal-gray text-chrome-silver py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-molten-orange text-center">{t('contact.heading')}</h2>
        <p className="text-center max-w-2xl mx-auto text-steel-blue">
          {t('contact.description')}
        </p>
        
        <div className="flex flex-col lg:flex-row gap-12 mt-10">
          {/* Contact Form (Left) */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-xl font-semibold text-cool-cyan">{t('contact.form.title')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-steel-blue mb-1">{t('contact.form.name')}</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.form.namePlaceholder')}
                  className="w-full px-4 py-3 bg-forge-black border border-cool-cyan rounded-lg text-chrome-silver focus:outline-none focus:ring-1 focus:ring-molten-orange" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-steel-blue mb-1">{t('contact.form.email')}</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.form.emailPlaceholder')}
                  className="w-full px-4 py-3 bg-forge-black border border-cool-cyan rounded-lg text-chrome-silver focus:outline-none focus:ring-1 focus:ring-molten-orange" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm text-steel-blue mb-1">{t('contact.form.message')}</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={5} 
                  className="w-full px-4 py-3 bg-forge-black border border-cool-cyan rounded-lg text-chrome-silver focus:outline-none focus:ring-1 focus:ring-molten-orange" 
                />
              </div>
              
              {errorMessage && (
                <p className="text-ember-red text-sm">{errorMessage}</p>
              )}
              
              {submitSuccess && (
                <p className="text-cool-cyan text-sm">{t('contact.form.success')}</p>
              )}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`bg-molten-orange px-6 py-3 rounded-lg text-white hover:bg-ember-red transition flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('contact.form.sending')}
                  </>
                ) : t('contact.form.send')}
              </button>
            </form>
            
            <div className="pt-6 border-t border-gunmetal-gray">
              <p className="text-sm text-steel-blue">{t('contact.alternate.text')}</p>
              <div className="flex items-center gap-2 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cool-cyan" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:contact@jatin.dev" className="text-cool-cyan hover:text-molten-orange transition">{t('contact.alternate.email')}</a>
              </div>
            </div>
          </div>
          
          {/* Live Chat (Right) */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-xl font-semibold text-cool-cyan mb-6">{t('contact.chat.title')}</h3>
            <LiveChat />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 