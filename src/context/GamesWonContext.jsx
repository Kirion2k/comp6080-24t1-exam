import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
const GamesWonContext = createContext();

export const useGamesWon = () => useContext(GamesWonContext);

export const GamesWonProvider = ({ children }) => {
  const [gamesWon, setGamesWon] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchInitialScore = async () => {
      const storedWins = localStorage.getItem('gamesWon');
      if (storedWins !== null) {
        setGamesWon(parseInt(storedWins, 10));
      } else {
        try {
          const response = await fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/score.json');
          const data = await response.json();
          localStorage.setItem('gamesWon', data.score);
          setGamesWon(data.score);
        } catch (error) {
          console.error("Failed to fetch initial games count", error);
        }
      }
    };

    fetchInitialScore();
  }, []);

  useEffect(() => {
    if (gamesWon === 0) {
      if (location.pathname === '/home') {
        alert('Congratulations!');
        resetGamesWon(); 
      }
    }
  }, [gamesWon, location.pathname]); 

  const decrementGamesWon = () => {
    const newWins = Math.max(0, gamesWon - 1);
    localStorage.setItem('gamesWon', newWins);
    setGamesWon(newWins);
  };

  const resetGamesWon = async () => {
    try {
      const response = await fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/score.json');
      const data = await response.json();
      localStorage.setItem('gamesWon', data.score);
      setGamesWon(data.score);
    } catch (error) {
      console.error("Failed to reset games count", error);
    }
  };

  return (
    <GamesWonContext.Provider value={{ gamesWon, decrementGamesWon, resetGamesWon }}>
      {children}
    </GamesWonContext.Provider>
  );
};
