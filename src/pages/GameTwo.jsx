import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useGamesWon } from '../context/GamesWonContext';  

const characters = ['A', 'B', 'C', 'D'];

function FlashingMemoryGame() {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showCharacter, setShowCharacter] = useState('');
  const [gameActive, setGameActive] = useState(false);
  const { decrementGamesWon } = useGamesWon();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));
  const sidebarWidth = isSmall ? '30px' : isMedium ? '60px' : '100px';

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    setSequence([]);
    setUserInput([]);
    setCurrentStep(1);
    setGameActive(false);
    runSequence(1);
  };

  const runSequence = (length) => {
    let newSequence = [];
    for (let i = 0; i < length; i++) {
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      newSequence.push(randomChar);
    }
    setSequence(newSequence);
    displaySequence(newSequence);
  };

  const displaySequence = (sequence) => {
    let index = 0;
    setUserInput([]);
    setGameActive(true);
    const interval = setInterval(() => {
      if (index < sequence.length) {
        setShowCharacter(sequence[index]);
        setTimeout(() => setShowCharacter(''), 900);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setGameActive(false), 1000);
      }
    }, 1000);
  };

  const handleButtonClick = (char) => {
    if (!gameActive) {
      const newInputs = [...userInput, char];
      setUserInput(newInputs);
      if (newInputs.length === sequence.length) {
        if (newInputs.every((input, index) => input === sequence[index])) {
          if (sequence.length === 5) {
            alert('Congratulations, you have won the game!');
            decrementGamesWon();
            startGame();
          } else {
            setCurrentStep(prev => prev + 1);
            runSequence(currentStep + 1);
          }
        } else {
          alert('Incorrect sequence, try again!');
          startGame();
        }
      }
    }
  };

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginRight: sidebarWidth, 
    }}>
      <Box sx={{ flex: 1, display: 'flex' }}>
        {characters.map((char) => (
          <Button key={char} disabled={gameActive} onClick={() => handleButtonClick(char)} sx={{ flex: 1, height: '50%', fontSize: '1.5em', border: '2px solid', borderColor: 'primary.main' }}>
            {char}
          </Button>
        ))}
      </Box>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '40px', height: '40px', backgroundColor: '#cccccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>{showCharacter}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default FlashingMemoryGame;
