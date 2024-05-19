import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './shared/components/nav/Nav.tsx';
import Homepage from './features/homepage/pages/Homepage.tsx';
import MyAppointments from './features/my-appointments/pages/MyAppointments.tsx';
import { AuthProvider } from './core/authentication/context/AuthContext.tsx';
import { PathConstants } from './core/constants/path.constants.ts';

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Nav />}>
            <Route index element={<Homepage />} />
            <Route path={PathConstants.LOGIN_PATH} element={<Homepage />} />
            <Route
              path={PathConstants.MY_APPOINTMENTS_PATH}
              element={<MyAppointments />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
