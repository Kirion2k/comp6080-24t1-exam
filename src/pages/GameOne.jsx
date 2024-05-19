import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useGamesWon } from '../context/GamesWonContext'; 

const operations = ['+', '-', 'x', '÷'];

const numbersSets = [
  [1, 2, 2],
  [3, 6, -3],
  [8, 3, 11],
  [9, 8, 17],
  [5, 4, 9],
];

const GameOne = () => {
  const [index, setIndex] = useState(0);
  const [inputs, setInputs] = useState(numbersSets[index]);
  const { gamesWon, decrementGamesWon } = useGamesWon(); 

  const handleOperation = (operation) => {
    const [num1, num2, result] = inputs;
    let isValid = false;
    switch(operation) {
      case '+':
        isValid = num1 + num2 === result;
        break;
      case '-':
        isValid = num1 - num2 === result;
        break;
      case 'x':
        isValid = num1 * num2 === result;
        break;
      case '÷':
        isValid = num2 !== 0 && num1 / num2 === result;
        break;
      default:
        isValid = false;
    }

    if (isValid) {
      alert('You have won the game!');
      decrementGamesWon();  
      setIndex((prevIndex) => (prevIndex + 1) % numbersSets.length);
      setInputs(numbersSets[(index + 1) % numbersSets.length]);
    } else {
      alert('Your answer was incorrect. Try again!');
    }
  };

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      height: '100px', backgroundColor: 'rgb(200,255,255)', margin: '20% 0'
    }}>
      <Typography variant="h6">{inputs[0]}</Typography>
      <Box>
        {operations.map((op, idx) => (
          <Button key={idx} onClick={() => handleOperation(op)}>{op}</Button>
        ))}
      </Box>
      <Typography variant="h6">{inputs[1]}</Typography>
      <Typography variant="h6">=</Typography>
      <Typography variant="h6">{inputs[2]}</Typography>
    </Box>
  );
};

export default GameOne;
