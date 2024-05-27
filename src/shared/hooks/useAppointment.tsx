import { useCallback, useMemo } from 'react';
import { HttpParamsHelper } from '../helpers/httpParamsHelper';
import { AppointmentToAddOrUpdate } from '@/core/models/appointment/AppointmentToAddOrUpdate.ts';
import { Appointment } from '@/core/models/appointment/Appointment.ts';
import { AppointmentPageRequestParams } from '../model/AppointmentPageRequestParams.ts';
import { PageRequestResponseData } from '../model/PageRequestResponseData.ts';
import useAxiosInstance from '@/core/authentication/axiosInstance.tsx';

export const useAppointment = () => {
  const httpParamsHelper = useMemo(() => new HttpParamsHelper(), []);
  const { axiosInstance } = useAxiosInstance();

  const createAppointment = useCallback(
    async (appointment: AppointmentToAddOrUpdate): Promise<Appointment> => {
      const response = await axiosInstance.post<Appointment>(
        `/appointments`,
        appointment,
      );
      return response.data;
    },
    [axiosInstance],
  );

  const updateAppointment = useCallback(
    async (
      appointment: AppointmentToAddOrUpdate,
      appointmentId: string,
    ): Promise<Appointment> => {
      const response = await axiosInstance.put<Appointment>(
        `/appointments/${appointmentId}`,
        appointment,
      );
      return response.data;
    },
    [axiosInstance],
  );

  const getPagedDoctorAppointments = useCallback(
    async (
      appointmentPageRequestParams: AppointmentPageRequestParams,
      doctorId: string,
    ): Promise<PageRequestResponseData<Appointment>> => {
      const response = await axiosInstance.get<
        PageRequestResponseData<Appointment>
      >(`/appointments/doctors/${doctorId}`, {
        params: httpParamsHelper.setupHttpParams(appointmentPageRequestParams),
      });
      response.data.content.forEach(appointment => {
        appointment.date = new Date(appointment.date);
      });
      return response.data;
    },
    [axiosInstance, httpParamsHelper],
  );

  const getPagedPatientAppointments = useCallback(
    async (
      params: AppointmentPageRequestParams,
      userId: string,
    ): Promise<PageRequestResponseData<Appointment>> => {
      const response = await axiosInstance.get<
        PageRequestResponseData<Appointment>
      >(`/appointments/patients/${userId}`, {
        params: httpParamsHelper.setupHttpParams(params),
      });
      response.data.content.forEach(appointment => {
        appointment.date = new Date(appointment.date);
      });
      return response.data;
    },
    [axiosInstance, httpParamsHelper],
  );

  return {
    createAppointment,
    updateAppointment,
    getPagedDoctorAppointments,
    getPagedPatientAppointments,
  };
};
