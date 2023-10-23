import { createTheme } from '@mui/material/styles';

export const Colors = {
  dark: '#0a0a0a',
  accent: '#7E0019',
  light: '#fff',
  green: '#014322',
};

const theme = createTheme({
  palette: {
    primary: { main: Colors.accent },
    success: { main: Colors.green }
  },
  typography: {
    fontFamily: 'lato',
    h1: {
      fontSize: '56px',
      lineHeight: 1,
      fontWeight: 700,
    },
    h2: {
      fontSize: '48px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '42px',
      textAlign: 'center',
      fontWeight: 700,
    },
    h4: {
      fontSize: '36px',
      lineHeight: 1,
    },
    h5: {
      fontSize: '27px',
    }
  }
});

export default theme;