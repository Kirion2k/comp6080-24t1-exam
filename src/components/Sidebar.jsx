import React from 'react';
import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      position: 'fixed',
      right: 0,
      top: 0,
      bottom: 0,
      width: isSmall ? '30px' : isMedium ? '60px' : '100px',
      backgroundColor: '#eee',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '15px 0',
      zIndex: '1200'  
    }}>
      {!isSmall && (
        <img
          src="logo.png" 
          alt="Logo"
          style={{
            width: '50px', 
            height: '50px', 
            marginBottom: '15px',
            marginTop: '15px'
          }}
        />
      )}
      <Typography variant="body2">
        <Link href="/home">{isSmall || isMedium ? 'H' : 'Home'}</Link>
      </Typography>
      <Typography variant="body2">
        <Link href="/operations">{isSmall || isMedium ? 'Op' : 'Operations'}</Link>
      </Typography>
      <Typography variant="body2">
        <Link href="/memory">{isSmall || isMedium ? 'Me' : 'Memory'}</Link>
      </Typography>
      <Typography variant="body2">
        <Link href="/space">{isSmall || isMedium ? 'S' : 'Space'}</Link>
      </Typography>
    </Box>
  );
};

export default Sidebar;
