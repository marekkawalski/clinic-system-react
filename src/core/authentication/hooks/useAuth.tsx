import { useContext } from 'react';
import { AuthContextProps } from '@/core/authentication/models/AuthContextProps.ts';
import { AuthContext } from '@/core/authentication/context/AuthContext.tsx';

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
