import axios, { AxiosInstance } from 'axios';
import { useMemo } from 'react';
import { useSnackbar } from '@/shared/snackbar/hooks/useSnackBar.tsx';
import { useAuth } from '@/core/authentication/hooks/useAuth.tsx';
import { logout } from '@/core/authentication/utilities/authUtils.ts';

const API_URL = import.meta.env.VITE_API_URL;

const useAxiosInstance = () => {
  const { showSnackbar } = useSnackbar();
  const { authData } = useAuth();

  const axiosInstance: AxiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.request.use(
      config => {
        const newConfig = { ...config };
        if (authData) {
          newConfig.headers.Authorization = `Basic ${window.btoa(authData.email + ':' + authData.password)}`;
        } else {
          delete newConfig.headers.Authorization;
        }
        return newConfig;
      },
      error => {
        // Handle request errors
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          // Handle HTTP errors
          if (error.response.status === 401) {
            console.error('Unauthorized request!');
            showSnackbar('Unauthorized request!', 'error');
            logout();
          } else {
            const errorMessage = error.response.data?.message || error.message;
            showSnackbar(`HTTP error: ${errorMessage}`, 'error');
          }
        } else {
          const errorMessage = error.message;
          console.error('An error occurred:', errorMessage);
          showSnackbar(`An error occurred: ${errorMessage}`, 'error');
        }

        return Promise.reject(error);
      },
    );

    return instance;
  }, [authData, showSnackbar]);

  return { axiosInstance };
};

export default useAxiosInstance;
