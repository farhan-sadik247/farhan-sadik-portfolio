import { createTheme, ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#607d8b' : '#78909c',
    },
    secondary: {
      main: mode === 'light' ? '#455a64' : '#607d8b',
    },
    background: {
      default: mode === 'light' ? '#FFFFFF' : '#121212',
      paper: mode === 'light' ? '#eceff1' : '#263238',
    },
    text: {
      primary: mode === 'light' ? '#263238' : '#FFFFFF',
      secondary: mode === 'light' ? '#546e7a' : '#cfd8dc',
    },
    divider: mode === 'light' ? '#cfd8dc' : '#455a64',
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), var(--font-inter), sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backgroundColor: mode === 'light' ? '#FFFFFF' : '#37474f',
          boxShadow: mode === 'light' 
            ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            : '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
        }
      }
    }
  },
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
