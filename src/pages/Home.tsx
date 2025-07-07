import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import HackathonsSection from '../components/HackathonsSection';
import ContactSection from '../components/ContactSection';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <HackathonsSection />
      <ContactSection />
    </>
  );
};

export default Home; 