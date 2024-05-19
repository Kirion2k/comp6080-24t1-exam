import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useGamesWon } from '../context/GamesWonContext'; 

const Dashboard = () => {
  const { gamesWon, resetGamesWon } = useGamesWon();

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" color="primary" sx={{ fontSize: '2em' }}>
        Please choose an option from the sidebar.
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Games left to win: {gamesWon}
        <Button onClick={resetGamesWon} variant="outlined">reset</Button>
      </Typography>
    </Box>
  );
};

export default Dashboard;
