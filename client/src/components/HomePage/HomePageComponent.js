  import React, { useState } from "react";
  import Header from "./Header";
  import Hero from "./Hero";
  import AccentLines from "./AccentLines";
  import Mountains from "./Mountains";
  import ContentSection from "./ContentSection";
  import ParticleBackground from "./ParticleBackground";
  import AnimatedCube from "./AnimatedCube";  // Import the cube
import EventsGrid from "./EventsGrid";
import InstagramGrid from "./InstagramGrid";
import AnnouncementBar from "./AnnouncementBar";
import Sponsors from "./Sponsors";

  function Homepage() {
    const [goldMode, setGoldMode] = useState(false);

    const toggleGoldMode = () => {
      setGoldMode(!goldMode);
    };

    return (
      <div className={`${goldMode ? "gold" : ""} relative min-h-screen bg-gray-900`}>


        <ParticleBackground />
        {/* <AccentLines /> */}
        
        <Hero />
        <AnimatedCube className = "fixed top-0"/>  {/* Add the animated cube */}

        <Mountains /> 
        
        <EventsGrid/>
        <Sponsors />
        <InstagramGrid/>
        <ContentSection />
        {/* <AnnouncementBar/> */}
      </div>
    );
  }

  export default Homepage;
