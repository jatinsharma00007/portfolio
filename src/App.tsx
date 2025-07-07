import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
import NotFound from './pages/NotFound';
import ResetPassword from './pages/auth/ResetPassword';

// Meta data for each route
const routeMeta = {
  home: {
    title: 'Jatin Sharma – Game Developer & Hackathon Enthusiast',
    description: 'Portfolio showcasing game projects, hackathon wins, and web tools built by Jatin Sharma.'
  },
  about: {
    title: 'About Jatin Sharma – My Journey & Skills',
    description: 'Learn about my background, skills, and passion for game development, web technologies, and hackathons.'
  },
  games: {
    title: 'Game Development Portfolio – Jatin Sharma',
    description: 'Explore my game projects including Unity games, WebGL experiences, and game design experiments.'
  },
  hackathons: {
    title: 'Hackathon Achievements – Jatin Sharma',
    description: 'Discover my hackathon projects, awards, and innovative solutions built under pressure.'
  },
  webapps: {
    title: 'Web & App Projects – Jatin Sharma',
    description: 'Browse my collection of web applications, tools, and productivity solutions.'
  },
  contact: {
    title: 'Contact Jatin Sharma – Let\'s Connect',
    description: 'Get in touch for collaboration, job opportunities, or just to say hello!'
  },
  notFound: {
    title: 'Page Not Found – Jatin Sharma',
    description: 'The page you are looking for does not exist or has been moved.'
  },
  admin: {
    title: 'Admin Dashboard – Jatin Sharma',
    description: 'Portfolio administration area.'
  }
};

function App() {
  const location = useLocation();
  
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
  
  // Handle smooth scrolling to hash fragments
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Get the element with the id that matches the hash
      const element = document.getElementById(location.hash.slice(1));
      
      if (element) {
        // Wait a bit for the page to fully render
        setTimeout(() => {
          // Scroll to the element smoothly
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    } else {
      // Scroll to top when navigating to a new page without hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // Determine current route for meta tags
  const getMetaForCurrentRoute = () => {
    const path = location.pathname;
    
    if (path === '/') return routeMeta.home;
    if (path === '/about') return routeMeta.about;
    if (path === '/games') return routeMeta.games;
    if (path === '/hackathons') return routeMeta.hackathons;
    if (path === '/webapps') return routeMeta.webapps;
    if (path === '/contact') return routeMeta.contact;
    if (path.startsWith('/admin')) return routeMeta.admin;
    
    return routeMeta.notFound;
  };

  const meta = getMetaForCurrentRoute();

  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <link rel="canonical" href={`https://jatin.dev${location.pathname}`} />
        </Helmet>
        
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          
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
          
          {/* 404 Not Found Route - Will match when no other routes match */}
          <Route path="*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <NotFound />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App;
