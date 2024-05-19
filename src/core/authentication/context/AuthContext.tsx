import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getAuthData } from '../utilities/authUtils';
import { useNavigate } from 'react-router-dom';
import { AuthData } from '../../models/AuthData.ts';
import { UserRole } from '../../enums/UserRole.ts';
import { PathConstants } from '../../constants/path.constants.ts';
import {
  checkAccess as checkAccessUtil,
  login as loginUtil,
  logout as logoutUtil,
} from '../utilities/authUtils.ts';
import { AuthContextProps } from '../model/AuthContextProps.ts';

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
