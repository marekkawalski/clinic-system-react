import { useState } from 'react';
import { UserToAddOrUpdate } from '../../models/user/UserToAddOrUpdate.ts';
import { User } from '../../models/user/User.ts';
import { useSpinner } from '../../../shared/spinner/hooks/useSpinner.tsx';
import useAxiosInstance from '../axiosInstance.tsx';

export const useRegister = () => {
  const [data, setData] = useState<User | null>(null);
  const { showSpinner, hideSpinner } = useSpinner();
  const { axiosInstance } = useAxiosInstance();

  const register = async (user: UserToAddOrUpdate) => {
    showSpinner();
    try {
      const response = await axiosInstance.post<User>(`/registration`, user);
      setData(response.data);
      return response.data;
    } finally {
      hideSpinner();
    }
  };

  return { register, data };
};
