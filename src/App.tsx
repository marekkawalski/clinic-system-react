import './App.scss';
import Router from './Router.tsx';
import { setCssVariables } from './styles/theme.ts';

setCssVariables();

export default function App() {
  return <Router />;
}
