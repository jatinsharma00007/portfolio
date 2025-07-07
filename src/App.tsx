import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import i18n from './i18n';
import Home from './pages/Home';
import About from './pages/About';
import Games from './pages/Games';
import Hackathons from './pages/Hackathons';
import WebApps from './pages/WebApps';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';

function App() {
  // Set HTML lang attribute for SEO and accessibility
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    
    // Update lang attribute whenever language changes
    const handleLanguageChanged = () => {
      document.documentElement.lang = i18n.language;
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <About />
            </main>
            <Footer />
          </>
        } />
        <Route path="/games" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Games />
            </main>
            <Footer />
          </>
        } />
        <Route path="/hackathons" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Hackathons />
            </main>
            <Footer />
          </>
        } />
        <Route path="/webapps" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <WebApps />
            </main>
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Contact />
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
