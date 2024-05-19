import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import GameOne from './pages/GameOne';
import GameTwo from './pages/GameTwo';
import GameThree from './pages/GameThree';
import Box from '@mui/material/Box';

import { GamesWonProvider } from './context/GamesWonContext'; 

function App() {
  return (
    <Router>
      <GamesWonProvider>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Box component="main" sx={{ flexGrow: 1, pb: '50px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/operations" element={<GameOne />} />
              <Route path="/memory" element={<GameTwo />} />
              <Route path="/space" element={<GameThree />} />
            </Routes>
          </Box>
          <Sidebar />
          <Footer />
        </Box>
      </GamesWonProvider>
    </Router>
  );
}

export default App;
