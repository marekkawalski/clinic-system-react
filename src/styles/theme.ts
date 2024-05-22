import { createTheme } from '@mui/material/styles';
import { colors } from './colors'; // Adjust the path as needed

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary,
      contrastText: '#ffffff',
    },
  },
});

export const setCssVariables = () => {
  document.documentElement.style.setProperty('--primary-color', colors.primary);
  document.documentElement.style.setProperty(
    '--secondary-color',
    colors.secondary,
  );
};

export default theme;
