import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface SpinnerContextType {
  showSpinner: () => void;
  hideSpinner: () => void;
}

export const SpinnerContext = createContext<SpinnerContextType | undefined>(
  undefined,
);

export const SpinnerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const showSpinner = useCallback(() => {
    setLoading(true);
  }, []);

  const hideSpinner = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      {children}
      <Backdrop style={{ zIndex: 1300 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </SpinnerContext.Provider>
  );
};
