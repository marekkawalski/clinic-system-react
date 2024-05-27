import React, { createContext, ReactNode, useEffect, useState } from 'react';
import {
  checkAccess as checkAccessUtil,
  getAuthData,
  login as loginUtil,
  logout as logoutUtil,
} from '@/core/authentication/utilities/authUtils.ts';
import { AuthData } from '@/core/models/AuthData.ts';
import { useNavigate } from 'react-router-dom';
import { PathConstants } from '@/core/constants/path.constants.ts';
import { UserRole } from '@/core/enums/UserRole.ts';
import { AuthContextProps } from '@/core/authentication/models/AuthContextProps.ts';

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthDataState] = useState<AuthData | null>(getAuthData());
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuthData = getAuthData();
    if (savedAuthData) {
      setAuthDataState(savedAuthData);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const user = await loginUtil(email, password);
    setAuthDataState({ ...user, password });
    return user;
  };

  const logout = () => {
    logoutUtil();
    setAuthDataState(null);
    navigate(PathConstants.LOGIN_PATH);
  };

  const checkAccess = (allowedRoles: UserRole[]): boolean => {
    return checkAccessUtil(allowedRoles);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, checkAccess }}>
      {children}
    </AuthContext.Provider>
  );
};
