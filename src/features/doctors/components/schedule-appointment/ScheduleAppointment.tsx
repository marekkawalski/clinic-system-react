import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useSnackbar } from '@/shared/snackbar/hooks/useSnackBar.tsx';
import { useAppointment } from '@/shared/hooks/useAppointment.tsx';
import { Doctor } from '@/core/models/Doctor.ts';
import { Examination } from '@/core/models/Examination.ts';
import { AvailableAppointments } from '../../model/AvailableAppointments';
import { AppointmentToAddOrUpdate } from '@/core/models/appointment/AppointmentToAddOrUpdate.ts';
import { AppointmentStatus } from '@/core/enums/AppointmentStatus.ts';
import { useAuth } from '@/core/authentication/hooks/useAuth.tsx';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './ScheduleAppointment.scss';
import { useDoctor } from '@/features/doctors/hooks/useDoctor.tsx';
import { useExamination } from '@/features/doctors/hooks/useExamination.tsx';

interface ScheduleAppointmentProps {
  doctor: Doctor;
}

interface ScheduleAppointmentFormProps {
  date: string | null;
  examinationId: string;
}

const ScheduleAppointment: React.FC<ScheduleAppointmentProps> = ({
  doctor,
}) => {
  const { authData } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { fetchDoctorExaminations: getDoctorExaminations } = useExamination();
  const { createAppointment } = useAppointment();
  const { fetchAvailableAppointments: fetchAvailableAppointments } =
    useDoctor();

  const [doctorExaminations, setDoctorExaminations] = useState<Examination[]>(
    [],
  );
  const [availableAppointmentDates, setAvailableAppointmentDates] = useState<
    AvailableAppointments[]
  >([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ScheduleAppointmentFormProps>({
    defaultValues: {
      date: null,
      examinationId: '',
    },
  });

  const loadDoctorExaminations = useCallback(
    async (doctorId: string) => {
      try {
        const examinations = await getDoctorExaminations(doctorId);
        setDoctorExaminations(examinations);
      } catch {
        showSnackbar('Failed to load doctor examinations.', 'error');
      }
    },
    [getDoctorExaminations, showSnackbar],
  );

  const loadAvailableAppointments = useCallback(
    async (examinationId: string, date: string) => {
      try {
        const formattedDate = format(new Date(date), 'yyyy-MM-dd') + 'T23:59';
        const appointments = await fetchAvailableAppointments(
          doctor.id,
          examinationId,
          formattedDate,
        );
        setAvailableAppointmentDates(appointments);
      } catch {
        showSnackbar('No available appointments for this date.', 'error');
      }
    },
    [doctor.id, fetchAvailableAppointments, showSnackbar],
  );

  const onSubmit = useCallback(() => {
    const values = getValues();
    if (!values.date || !values.examinationId) return;

    loadAvailableAppointments(values.examinationId, values.date).then(() => {});
  }, [loadAvailableAppointments, getValues]);

  const handleScheduleAppointment = useCallback(
    async (appointmentDate: Date) => {
      if (
        !doctor?.id ||
        !authData?.id ||
        !getValues('date') ||
        !getValues('examinationId')
      )
        return;

      const examinationId = getValues('examinationId');
      const date = getValues('date');

      if (!doctor?.id || !authData?.id || !date || !examinationId) {
        showSnackbar(
          'All fields are required to schedule an appointment.',
          'error',
        );
        return;
      }

      const appointment: AppointmentToAddOrUpdate = {
        date: appointmentDate,
        status: AppointmentStatus.BOOKED,
        doctorId: doctor.id,
        patientId: authData.id,
        examinationId: getValues('examinationId'),
      };

      try {
        await createAppointment(appointment);
        showSnackbar('Appointment scheduled successfully.', 'success');
        await loadAvailableAppointments(examinationId, date);
      } catch {
        showSnackbar('Failed to schedule appointment.', 'error');
      }
    },
    [
      authData?.id,
      createAppointment,
      doctor?.id,
      loadAvailableAppointments,
      getValues,
      showSnackbar,
    ],
  );

  useEffect(() => {
    if (doctor) {
      loadDoctorExaminations(doctor.id).then(() => {});
    }
  }, [doctor, loadDoctorExaminations]);

  return (
    <>
      {authData ? (
        <Box className='appointment-wrapper'>
          <Typography variant='h3'>Schedule an appointment</Typography>
          <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <FormControl fullWidth margin='normal'>
              <Controller
                name='date'
                control={control}
                rules={{ required: 'Appointment date is required' }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    slotProps={{
                      textField: {
                        label: 'Appointment date',
                        error: !!errors.date,
                        helperText: errors.date?.message,
                      },
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='examination-label'>Examination</InputLabel>
              <Controller
                name='examinationId'
                control={control}
                rules={{ required: 'Examination is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId='examination-label'
                    label='Examination'
                    error={!!errors.examinationId}
                  >
                    {doctorExaminations.map(examination => (
                      <MenuItem key={examination.id} value={examination.id}>
                        {examination.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <Button type='submit' variant='contained' color='primary'>
              Find
            </Button>
          </form>
          {availableAppointmentDates.length > 0 && (
            <Box className='appointments-parent'>
              <Typography variant='h3'>Available appointments</Typography>
              <Box className='appointments'>
                {availableAppointmentDates.map((appointment, key) => (
                  <Button
                    key={key}
                    variant='outlined'
                    onClick={() => handleScheduleAppointment(appointment.date)}
                  >
                    {format(new Date(appointment.date), 'HH:mm')}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Typography>You need to login to schedule an appointment</Typography>
      )}
    </>
  );
};

export default ScheduleAppointment;
