// src/components/ThemeProvider/ThemeProvider.js
import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const ThemeProvider = ({ children }) => {
  // Access the theme mode from the Redux store
  const mode = useSelector((state) => state.theme.mode);

  // Create a theme instance based on the current mode
  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#1976d2', // Blue for light mode
            },
            secondary: {
              main: '#dc004e', // Pink for light mode
            },
            background: {
              default: '#ffffff', // White background
              paper: '#f5f5f5', // Light gray paper background
            },
            text: {
              primary: '#000000', // Black text
              secondary: '#333333', // Dark gray text
            },
          }
        : {
            primary: {
              main: '#131b2f', // Dark color for dark mode
            },
            secondary: {
              main: '#f48fb1', // Light pink for dark mode
            },
            background: {
              default: '#121212', // Dark background
              paper: '#1e1e1e', // Slightly lighter dark background
            },
            text: {
              primary: '#ffffff', // White text
              secondary: '#b0b0b0', // Light gray text
              tealgreen :'#009688' // Lght Skyblue
            },
          }),
    },
    typography: {
      // Optionally define typography styles for better consistency
      fontFamily: [
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
