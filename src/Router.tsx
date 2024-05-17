import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidenav from './shared/components/sidenav/Sidenav.tsx';
import Homepage from './features/homepage/pages/Homepage.tsx';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Sidenav />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
