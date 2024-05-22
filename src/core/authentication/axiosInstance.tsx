import axios, { AxiosInstance } from 'axios';
import { PathConstants } from '../constants/path.constants';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from '../../shared/snackbar/hooks/useSnackBar';
import { getAuthData, logout } from './utilities/authUtils.ts';

const API_URL = import.meta.env.VITE_API_URL;

const useAxiosInstance = () => {
  const { showSnackbar } = useSnackbar();
  const authData = getAuthData();

  const axiosInstance: AxiosInstance = useMemo(() => {
    return axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: authData
          ? `Basic ${window.btoa(authData.email + ':' + authData.password)}`
          : '',
      },
    });
  }, [authData]);

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      response => {
        console.log('Response:', response); // Log response details
        return response;
      },
      error => {
        if (error.response) {
          // Handle HTTP errors
          if (error.response.status === 401) {
            console.error('Unauthorized request!');
            setTimeout(() => showSnackbar('Unauthorized request!', 'error'), 0);
            logout();
            window.location.href = PathConstants.LOGIN_PATH; // Redirect to login page
          } else {
            const errorMessage = error.response.data?.message || error.message;
            setTimeout(
              () => showSnackbar(`HTTP error: ${errorMessage}`, 'error'),
              0,
            );
          }
        } else {
          const errorMessage = error.message;
          console.error('An error occurred:', errorMessage);
          setTimeout(
            () => showSnackbar(`An error occurred: ${errorMessage}`, 'error'),
            0,
          );
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance, showSnackbar]);

  return { axiosInstance };
};

export default useAxiosInstance;
