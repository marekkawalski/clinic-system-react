import axios from 'axios';
import { AuthData } from '../../models/AuthData.ts';
import { UserRole } from '../../enums/UserRole.ts';
import { User } from '../../models/user/User.ts';

const AUTH_DATA_KEY = 'authData';
const API_URL = import.meta.env.API_URL;

export const getAuthData = (): AuthData | null => {
  const authData = sessionStorage.getItem(AUTH_DATA_KEY);
  return authData ? JSON.parse(authData) : null;
};

export const setAuthData = (authData: AuthData | null) => {
  if (authData) {
    sessionStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData));
  } else {
    sessionStorage.removeItem(AUTH_DATA_KEY);
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  const token = `Basic ${window.btoa(email + ':' + password)}`;
  const response = await axios.post<User>(`${API_URL}/auth/login`, null, {
    headers: {
      Authorization: token,
    },
  });
  const authData = { ...response.data, password };
  setAuthData(authData);
  return response.data;
};

export const logout = () => {
  setAuthData(null);
};

export const checkAccess = (allowedRoles: UserRole[]): boolean => {
  const authData = getAuthData();
  return authData ? allowedRoles.includes(authData.role) : false;
};
