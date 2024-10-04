import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './components/HomePage/HomePageComponent';
import HamburgerMenu from './components/HamburgerMenu';
import FooterCard from './components/FooterCard';
import AnnouncementModal from './components/AnnouncementModal';
import DiscordEmbedForm from './components/Discord/DiscordEmbedForm';
import SpaceMouseScanner from './components/SpaceMouse/SpaceMouseScanner';
import SpaceMouseManager from './components/SpaceMouse/SpaceMouseManager';
import AboutPage from './components/About/AboutPage';
import SpaceMouse from './components/SpaceMouse/Spacemouse';
import ContactPage from './components/Contact/Contact';
import './App.css';

// ScrollToTop function integrated within App.js
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop /> {/* Scroll to top on route change */}
      <div className="min-h-screen flex flex-col">
        {/* Background and general layout */}
        <div className="w-full absolute bg-wavy-background flex flex-col -z-50"></div>
        
        {/* Components */}
        <HamburgerMenu />
        
        {/* Main routes */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/timeline" element={<React.Fragment />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<React.Fragment />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/discord" element={<DiscordEmbedForm />} />
          <Route path="/space-mouse/:id" element={<SpaceMouseScanner />} /> 
          <Route path="/space-mouse-manager" element={<SpaceMouseManager />} />
          <Route path="/space-mouse" element={<SpaceMouse />} />
        </Routes>
        
        {/* Footer */}
        <FooterCard />
        
        {/* Modals or other components can go here */}
        {/* <AnnouncementModal /> */}
      </div>
    </Router>
  );
};

export default App;
