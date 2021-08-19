import './App.css';

import { CssBaseline } from '@material-ui/core';


import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import darkScrollbar from '@material-ui/core/darkScrollbar';
import CharacterSheet from './components/20th/CharacterSheet';

let darkMode = true;

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkMode ? darkScrollbar() : null,
      },
    },
  },
  palette: {
    mode: (darkMode ? "dark" : "light"),
    primary: {
      main: '#e2e236',
    },
    secondary: {
      main: '#ff003d',
    },
    text: {
      primary: '#ded6d8',
    },
    background: {
      default: '#333b3b',
      paper: '#424242',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />   
      <CharacterSheet />
    </ThemeProvider>
  );
}

export default App;