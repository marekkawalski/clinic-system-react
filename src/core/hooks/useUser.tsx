import { useCallback, useMemo, useState } from 'react';

import { HttpParamsHelper } from '../../shared/helpers/httpParamsHelper';
import useAxiosInstance from '../authentication/axiosInstance.tsx';
import { User } from '../models/user/User.ts';
import { PageRequestResponseData } from '../../shared/model/PageRequestResponseData.ts';
import { UserToAddOrUpdate } from '../models/user/UserToAddOrUpdate.ts';
import { UserPageRequestParams } from '../../shared/model/UserPageRequestParams.ts';
import { useSpinner } from '../../shared/spinner/hooks/useSpinner.tsx';
import { DateHelper } from '../../shared/helpers/dateHelper.ts';

export const useUser = () => {
  const { showSpinner, hideSpinner } = useSpinner();
  const { axiosInstance } = useAxiosInstance();
  const dateHelper = useMemo(() => new DateHelper<User>(), []);
  const httpParamsHelper = useMemo(() => new HttpParamsHelper(), []);

  const [user, setUser] = useState<User | null>(null);
  const [pagedUsers, setPagedUsers] =
    useState<PageRequestResponseData<User> | null>(null);

  const updateUser = useCallback(
    async (user: UserToAddOrUpdate, userId: string) => {
      showSpinner();
      try {
        const response = await axiosInstance.put<User>(
          `/users/${userId}`,
          user,
        );
        setUser(response.data);
        return response.data;
      } finally {
        hideSpinner();
      }
    },
    [axiosInstance, showSpinner, hideSpinner],
  );

  const getUserById = useCallback(
    async (userId: string) => {
      showSpinner();
      try {
        const response = await axiosInstance.get<User>(`/users/${userId}`);
        setUser(response.data);
        return response.data;
      } finally {
        hideSpinner();
      }
    },
    [axiosInstance, showSpinner, hideSpinner],
  );

  const getUserByEmail = useCallback(
    async (email: string) => {
      showSpinner();
      try {
        const response = await axiosInstance.get<User>(`/users/email/${email}`);
        setUser(response.data);
        return response.data;
      } finally {
        hideSpinner();
      }
    },
    [axiosInstance, showSpinner, hideSpinner],
  );

  const getPagedUsers = useCallback(
    async (params?: UserPageRequestParams) => {
      showSpinner();
      try {
        const response = await axiosInstance.get<PageRequestResponseData<User>>(
          `/users/paged`,
          { params: httpParamsHelper.setupHttpParams(params) },
        );
        const dataWithConvertedDates = dateHelper.convertDateStringsToDates(
          response.data,
          ['createdAt', 'updatedAt', 'lastLogin'],
        );
        setPagedUsers(dataWithConvertedDates);
        return dataWithConvertedDates;
      } finally {
        hideSpinner();
      }
    },
    [axiosInstance, showSpinner, hideSpinner, httpParamsHelper, dateHelper],
  );

  return {
    updateUser,
    getUserById,
    getUserByEmail,
    getPagedUsers,
    user,
    pagedUsers,
  };
};
