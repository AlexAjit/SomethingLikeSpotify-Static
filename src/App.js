// import React, { useContext } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { MusicProvider, MusicContext } from './context/MusicContext';
// import LeftSidebar from './components/LeftSidebar';
// import MainContent from './components/MainContent';
// import NowPlaying from './components/NowPlaying';
// import './App.css';

// const AppContent = () => {
//   const { currentTrack } = useContext(MusicContext);
  
//   return (
//     <Container fluid className="app-container">
//       <Row className="h-100">
//         <Col md={2} className="sidebar-container">
//           <LeftSidebar />
//         </Col>
//         <Col md={6} className="main-container">
//           <MainContent />
//         </Col>
//         <Col md={4} className="now-playing-container">
//           {currentTrack && <NowPlaying />}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// function App() {
//   return (
//     <MusicProvider>
//       <AppContent />
//     </MusicProvider>
//   );
// }

// export default App;

import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MusicProvider, MusicContext } from './context/MusicContext';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import NowPlaying from './components/NowPlaying';
import { extractDominantColor, getGradientStyle} from './utils/colorExtractor';
import './App.css';

const AppContent = () => {
  const { currentTrack } = useContext(MusicContext);
  const [backgroundColor, setBackgroundColor] = useState('#121212');
  
  useEffect(() => {
    if (currentTrack) {
      const dominantColor = extractDominantColor(currentTrack);
      setBackgroundColor(dominantColor);
    }
  }, [currentTrack]);
  
  // Create gradient styles for main container and sidebar
  const mainGradientStyle = getGradientStyle(backgroundColor);
  
  // Create a slightly darker gradient for the sidebar
  const darkenColor = (color) => {
    // Simple darkening for hex colors
    if (color.startsWith('#')) {
      // Convert to RGB to darken
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      // Darken by reducing values
      const darkerR = Math.max(0, r - 40).toString(16).padStart(2, '0');
      const darkerG = Math.max(0, g - 40).toString(16).padStart(2, '0');
      const darkerB = Math.max(0, b - 40).toString(16).padStart(2, '0');
      
      return `#${darkerR}${darkerG}${darkerB}`;
    }
    return color;
  };
  
  const sidebarGradientStyle = getGradientStyle(darkenColor(backgroundColor));
  
  return (
    <Container fluid className="app-container" style={{ backgroundColor: 'transparent' }}>
      <Row className="h-100">
        <Col md={2} className="sidebar-container" style={sidebarGradientStyle}>
          <LeftSidebar />
        </Col>
        <Col md={6} className="main-container" style={mainGradientStyle}>
          <MainContent />
        </Col>
        <Col md={4} className="now-playing-container" style={mainGradientStyle}>
          {currentTrack && <NowPlaying />}
        </Col>
      </Row>
    </Container>
  );
};

function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}

export default App;