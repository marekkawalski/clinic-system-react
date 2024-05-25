import { useCallback, useMemo } from 'react';
import useAxiosInstance from '../../../core/authentication/axiosInstance.tsx';
import { Doctor } from '../../../core/models/Doctor.ts';
import { DailySchedule } from '../../../core/models/user/Schedule.ts';
import { UserPageRequestParams } from '../../../shared/model/UserPageRequestParams.ts';
import { PageRequestResponseData } from '../../../shared/model/PageRequestResponseData.ts';
import { HttpParamsHelper } from '../../../shared/helpers/httpParamsHelper.ts';
import { AvailableAppointments } from '../model/AvailableAppointments.ts';

const apiUrl = import.meta.env.VITE_API_URL;

export const useDoctor = () => {
  const httpParamsHelper = useMemo(() => new HttpParamsHelper(), []);
  const { axiosInstance } = useAxiosInstance();

  const fetchPagedDoctors = useCallback(
    async (
      params?: UserPageRequestParams,
    ): Promise<PageRequestResponseData<Doctor>> => {
      const response = await axiosInstance.get<PageRequestResponseData<Doctor>>(
        `/doctors/paged`,
        { params: httpParamsHelper.setupHttpParams(params) },
      );
      return response.data;
    },
    [axiosInstance, httpParamsHelper],
  );

  const fetchDoctorByEmail = useCallback(
    async (email: string): Promise<Doctor> => {
      const response = await axiosInstance.get<Doctor>(
        `${apiUrl}/doctors/email/${email}`,
      );
      const doctor = response.data;

      if (doctor.doctorDetails?.schedule?.dailySchedules) {
        const entries: [string, DailySchedule][] = Object.entries(
          doctor.doctorDetails.schedule.dailySchedules,
        );
        doctor.doctorDetails.schedule.dailySchedules = new Map<
          string,
          DailySchedule
        >(
          entries.map(([key, value]) => {
            const startDate = new Date();
            const endDate = new Date();
            const [sh, sm] = value.startTime.split(':');
            const [eh, em] = value.endTime.split(':');

            startDate.setUTCHours(+sh, +sm, 0, 0);
            endDate.setUTCHours(+eh, +em, 0, 0);

            value.startTime = startDate.toLocaleTimeString();
            value.endTime = endDate.toLocaleTimeString();

            return [key, value];
          }),
        );
      }

      return doctor;
    },
    [axiosInstance],
  );

  const fetchAvailableAppointments = useCallback(
    async (
      doctorId: string,
      examinationId: string,
      date: string,
    ): Promise<AvailableAppointments[]> => {
      const response = await axiosInstance.get<AvailableAppointments[]>(
        `/doctors/${doctorId}/examinations/${examinationId}/available-appointments/date/${date}`,
      );
      return response.data.map(appointment => {
        appointment.date = new Date(appointment.date);
        return appointment;
      });
    },
    [axiosInstance],
  );

  return {
    fetchPagedDoctors,
    fetchDoctorByEmail,
    fetchAvailableAppointments,
  };
};
