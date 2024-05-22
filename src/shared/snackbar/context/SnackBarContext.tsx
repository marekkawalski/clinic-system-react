import React, { createContext, ReactNode, useCallback, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarContextProps } from '../model/SnackbarContextProps.ts';
import { SnackbarSeverity } from '../model/SnackbarSeverity.ts';

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined,
);

const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<SnackbarSeverity>('success');

  const showSnackbar = useCallback((msg: string, sev: SnackbarSeverity) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
