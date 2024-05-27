import { useState } from 'react';
import { useSpinner } from '@/shared/spinner/hooks/useSpinner.tsx';
import { User } from '@/core/models/user/User.ts';
import useAxiosInstance from '@/core/authentication/axiosInstance.tsx';
import { UserToAddOrUpdate } from '@/core/models/user/UserToAddOrUpdate.ts';

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
