import React from 'react';
import Homepage from './components/HomePage/HomePageComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu';
import FooterCard from './components/FooterCard';
import AnnouncementModal from './components/AnnouncementModal';
import DiscordEmbedForm from './components/Discord/DiscordEmbedForm';


const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Background and general layout */}
        <div className="w-full absolute bg-wavy-background flex flex-col -z-50"></div>
        
        {/* Components */}
        <HamburgerMenu />
        
        {/* Main routes */}
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/timeline" element={<React.Fragment />} />
          <Route path="/events" element={<React.Fragment />} />
          <Route path="/footer" element={<React.Fragment />} />
          <Route path="/discord" element={<DiscordEmbedForm/>}/>
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
