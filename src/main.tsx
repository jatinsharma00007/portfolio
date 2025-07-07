import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import './i18n'

// Declare global gtag function
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
const initGA = () => {
  const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
  
  if (!TRACKING_ID) {
    console.warn('Google Analytics Tracking ID not found. Analytics will not be initialized.');
    return;
  }
  
  // Add Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
  document.head.appendChild(script);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', TRACKING_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });
};

// Call GA initialization
if (import.meta.env.PROD) {
  initGA();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
