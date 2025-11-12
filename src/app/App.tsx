import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { BirthdaysPage } from '../pages/birthdays';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <BirthdaysPage />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
