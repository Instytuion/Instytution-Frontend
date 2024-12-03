// // src/components/ThemeProvider/ThemeProvider.js
// import React from 'react';
// import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
// import { useSelector } from 'react-redux';

// const ThemeProvider = ({ children }) => {
//   // Access the theme mode from the Redux store
//   const mode = useSelector((state) => state.theme.mode);

//   // Create a theme instance based on the current mode
//   const theme = createTheme({
//     palette: {
//       mode: mode,
//       ...(mode === 'light'
//         ? {
//             primary: {
//               main: '#1976d2', // Blue for light mode
//             },
//             secondary: {
//               main: '#dc004e', // Pink for light mode
//             },
//             background: {
//               default: '#ffffff', // White background
//               paper: '#f5f5f5', // Light gray paper background
//             },
//             text: {
//               primary: '#000000', // Black text
//               secondary: '#333333', // Dark gray text
//             },
//           }
//         : {
//             primary: {
//               main: '#131b2f', // Dark color for dark mode
//             },
//             secondary: {
//               main: '#f48fb1', // Light pink for dark mode
//             },
//             background: {
//               default: '#121212', // Dark background
//               paper: '#1e1e1e', // Slightly lighter dark background
//             },
//             text: {
//               primary: '#ffffff', // White text
//               secondary: '#b0b0b0', // Light gray text
//               tealgreen :'#009688' // Lght Skyblue
//             },
//           }),
//     },
//     typography: {
//       // Optionally define typography styles for better consistency
//       fontFamily: [
//         'Roboto',
//         'Arial',
//         'sans-serif',
//       ].join(','),
//     },
//   });

//   return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
// };

// export default ThemeProvider;

import React, {useEffect, useMemo} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import {useSelector} from "react-redux";

const ThemeProvider = ({children}) => {
  // Access the theme mode from the Redux store
  const mode = useSelector((state) => state.theme.mode);

  // Define shared colors to avoid duplication
  const sharedColors = {
    primary: {
      light: "#1976d2", // Blue for light mode
      dark: "#131b2f", // Dark color for dark mode
    },
    secondary: {
      light: "#dc004e", // Pink for light mode
      dark: "#f48fb1", // Light pink for dark mode
    },
    background: {
      light: "#ffffff", // White background
      lightPaper: "#f5f5f5", // Light gray paper background
      dark: "#121212", // Dark background
      darkPaper: "#1e1e1e", // Slightly lighter dark background
    },
    text: {
      light: "#000000", // Black text
      lightSecondary: "#333333", // Dark gray text
      dark: "#ffffff", // White text
      darkSecondary: "#b0b0b0", // Light gray text
    },
    color: {
      dark: "#00372E", // Dark green

      light: "#008080", // light green (teal)
    },
    shadow: {
      light: "5px 5px 5px rgba(0, 0, 0, 0.1), -5px 5px 5px rgba(0, 0, 0, 0.1)",
      dark: "", 
    },
  };

  // Create a theme instance based on the current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main:
              mode === "light"
                ? sharedColors.primary.light
                : sharedColors.primary.dark,
          },
          secondary: {
            main:
              mode === "light"
                ? sharedColors.secondary.light
                : sharedColors.secondary.dark,
          },
          background: {
            default:
              mode === "light"
                ? sharedColors.background.light
                : sharedColors.background.dark,
            paper:
              mode === "light"
                ? sharedColors.background.lightPaper
                : sharedColors.background.darkPaper,
          },
          text: {
            primary:
              mode === "light"
                ? sharedColors.text.light
                : sharedColors.text.dark,
            secondary:
              mode === "light"
                ? sharedColors.text.lightSecondary
                : sharedColors.text.darkSecondary,
          },
          shadow:
            mode === "light"
              ? sharedColors.shadow.light
              : sharedColors.shadow.dark,

          customColors:
            mode === "light"
              ? sharedColors.color.light
              : sharedColors.color.dark,
        },
        typography: {
          fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
        },
      }),
    [mode]
  );
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
  }, [theme]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
