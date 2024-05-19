import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { useGamesWon } from '../context/GamesWonContext';


const gameSize = 500;
const shooterSize = 10;
const objectSize = 20;
const objectMargin = 15;
const totalObjectWidth = objectSize + objectMargin; 

const gameStartOffset = 60; 
function SpaceInvaders() {
  const { decrementGamesWon } = useGamesWon();
  const [shooterPosition, setShooterPosition] = useState(0);
  const [objects, setObjects] = useState(Array.from({ length: 20 }, (_, index) => ({
    id: index,
    visible: true
  })));

  const shoot = useCallback(() => {
    const shooterCenter = shooterPosition + shooterSize / 2;
    setObjects(objects => {
      const updatedObjects = objects.map(obj => {
        const colIndex = obj.id % 10;
        const objectLeft = colIndex * totalObjectWidth + gameStartOffset; 
        const objectRight = objectLeft + objectSize;
        
        if (obj.visible && shooterCenter >= objectLeft && shooterCenter <= objectRight) {
          return { ...obj, visible: false };
        }
        return obj;
      });
      checkGameStatus(updatedObjects);
      return updatedObjects;
    });
  }, [shooterPosition]);

  const checkGameStatus = (updatedObjects) => {
    if (updatedObjects.every(obj => !obj.visible)) {
      decrementGamesWon();
      alert("Congratulations, you have won!");
      restartGame();
    }
  };

  const restartGame = () => {
    setObjects(objects.map(obj => ({ ...obj, visible: true })));
    setShooterPosition(0);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        setShooterPosition(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setShooterPosition(prev => Math.min(gameSize - shooterSize, prev + 1));
      } else if (e.key === ' ') {
        e.preventDefault();  
        shoot();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [shoot]);

  return (
    <Box sx={{ width: gameSize, height: gameSize, border: '1px solid black', position: 'relative' }}>
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: shooterPosition,
        width: shooterSize,
        height: shooterSize,
        backgroundColor: 'red'
      }} />
      {objects.map((obj, index) => (
        obj.visible && (
          <Box key={index} sx={{
            position: 'absolute',
            top: Math.floor(index / 10) * totalObjectWidth,
            left: (index % 10) * totalObjectWidth,
            width: objectSize,
            height: objectSize,
            backgroundColor: 'black',
            margin: objectMargin / 2
          }} />
        )
      ))}
    </Box>
  );
}

export default SpaceInvaders;
