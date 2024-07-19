import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
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
  const value = useMemo(
    () => ({ showSpinner, hideSpinner }),
    [showSpinner, hideSpinner],
  );
  return (
    <SpinnerContext.Provider value={value}>
      {children}
      <Backdrop style={{ zIndex: 13000000000 }} open={loading} id={'spinner'}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </SpinnerContext.Provider>
  );
};
