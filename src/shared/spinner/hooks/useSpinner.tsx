import { useContext } from 'react';
import { SpinnerContext } from '../context/SpinnerContext.tsx';

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error('useSpinnerContext must be used within a SpinnerProvider');
  }
  return context;
};
