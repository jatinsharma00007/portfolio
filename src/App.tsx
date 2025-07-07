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

// Admin imports
import AdminLayout from './admin/layouts/AdminLayout';
import AdminRoute from './admin/components/AdminRoute';
import AdminLogin from './admin/pages/Login';
import AdminDashboard from './admin/pages/Dashboard';
import AdminProjects from './admin/pages/Projects';
import AdminHackathons from './admin/pages/Hackathons';
import AdminGames from './admin/pages/Games';
import AdminMessages from './admin/pages/Messages';
import AdminAbout from './admin/pages/About';
import AboutEditor from './admin/pages/AboutEditor';
import WebAppsManager from './admin/pages/WebApps';
import GlobalSettingsManager from './admin/pages/GlobalSettings';

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
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/hackathons" element={<AdminHackathons />} />
            <Route path="/admin/games" element={<AdminGames />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/about-editor" element={<AboutEditor />} />
            <Route path="/admin/webapps" element={<WebAppsManager />} />
            <Route path="/admin/settings" element={<GlobalSettingsManager />} />
          </Route>
        </Route>
        
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
