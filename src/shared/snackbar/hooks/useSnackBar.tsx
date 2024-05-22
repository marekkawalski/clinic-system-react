import { useContext } from 'react';
import { SnackbarContextProps } from '../model/SnackbarContextProps.ts';
import { SnackbarContext } from '../context/SnackBarContext.tsx';

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
