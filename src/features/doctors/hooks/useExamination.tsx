import { useCallback, useMemo } from 'react';
import { HttpParamsHelper } from '@/shared/helpers/httpParamsHelper.ts';
import { Examination } from '@/core/models/Examination.ts';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData.ts';
import { ExaminationPageRequestParams } from '@/shared/model/ExaminationPageRequestParams.ts';
import useAxiosInstance from '@/core/authentication/axiosInstance.tsx';

export const useExamination = () => {
  const httpParamsHelper = useMemo(() => new HttpParamsHelper(), []);
  const { axiosInstance } = useAxiosInstance();

  const fetchDoctorExaminations = useCallback(
    async (doctorId: string): Promise<Examination[]> => {
      const response = await axiosInstance.get<Examination[]>(
        `/doctors/${doctorId}/examinations`,
      );
      return response.data;
    },
    [axiosInstance],
  );

  const fetchPagedDoctorExaminations = useCallback(
    async (
      params?: ExaminationPageRequestParams,
    ): Promise<PageRequestResponseData<Examination>> => {
      const response = await axiosInstance.get<
        PageRequestResponseData<Examination>
      >(`/examinations/paged`, {
        params: httpParamsHelper.setupHttpParams(params),
      });
      return response.data;
    },
    [axiosInstance, httpParamsHelper],
  );

  return {
    fetchDoctorExaminations,
    fetchPagedDoctorExaminations,
  };
};
