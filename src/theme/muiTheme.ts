import { createTheme, ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#0f766e' : '#2dd4bf',
      dark: mode === 'light' ? '#115e59' : '#14b8a6',
      contrastText: mode === 'light' ? '#FFFFFF' : '#0b1f1d',
    },
    secondary: {
      main: mode === 'light' ? '#455a64' : '#607d8b',
    },
    background: {
      default: mode === 'light' ? '#FFFFFF' : '#10171b',
      paper: mode === 'light' ? '#f1f4f6' : '#1a2429',
    },
    text: {
      primary: mode === 'light' ? '#1c262b' : '#F5F7F8',
      secondary: mode === 'light' ? '#546e7a' : '#a9b8bf',
    },
    divider: mode === 'light' ? '#cfd8dc' : '#3b4f58',
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
          backgroundColor: mode === 'light' ? '#FFFFFF' : '#243238',
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
