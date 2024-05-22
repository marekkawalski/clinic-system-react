import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './shared/components/nav/Nav.tsx';
import Homepage from './features/homepage/pages/Homepage.tsx';
import MyAppointments from './features/my-appointments/pages/MyAppointments.tsx';
import { AuthProvider } from './core/authentication/context/AuthContext.tsx';
import { PathConstants } from './core/constants/path.constants.ts';
import SnackbarProvider from './shared/snackbar/context/SnackBarContext.tsx';
import Doctors from './features/doctors/pages/doctors/Doctors.tsx';
import { SpinnerProvider } from './shared/spinner/context/SpinnerContext.tsx';
import Login from './features/auth/login/pages/Login.tsx';
import theme from './styles/theme.ts';
import { CssBaseline, ThemeProvider } from '@mui/material';

export default function Router() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SpinnerProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path='/' element={<Nav />}>
                  <Route index element={<Homepage />} />
                  <Route path={PathConstants.LOGIN_PATH} element={<Login />} />
                  <Route
                    path={PathConstants.MY_APPOINTMENTS_PATH}
                    element={<MyAppointments />}
                  />
                  <Route
                    path={PathConstants.DOCTORS_PATH}
                    element={<Doctors />}
                  />
                </Route>
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </SpinnerProvider>
    </ThemeProvider>
  );
}
