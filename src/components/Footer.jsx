import React from 'react';
import { Box } from '@mui/material';

const Footer = ({ sidebarWidth }) => {
  return (
    <Box sx={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      height: '50px',
      backgroundColor: '#999',
      zIndex: 1, 
      width: `calc(100% - ${sidebarWidth}px)`, 
      marginLeft: `${sidebarWidth}px` 
    }} />
  );
};

export default Footer;