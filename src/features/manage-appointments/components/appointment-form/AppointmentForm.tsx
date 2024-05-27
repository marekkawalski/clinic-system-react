import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from '@/shared/snackbar/hooks/useSnackBar.tsx';
import { useAppointment } from '@/shared/hooks/useAppointment.tsx';
import { Appointment } from '@/core/models/appointment/Appointment.ts';
import { AppointmentStatus } from '@/core/enums/AppointmentStatus.ts';
import { Medicine } from '@/core/models/appointment/Medicine.ts';
import { AppointmentToAddOrUpdate } from '@/core/models/appointment/AppointmentToAddOrUpdate.ts';

interface AppointmentFormProps {
  appointment: Appointment;
  action?: string;
  formType: 'PopupForm' | 'WholePageForm';
  formRef?: React.RefObject<HTMLFormElement>;
  onClose: (result: boolean) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  action,
  formType,
  formRef,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AppointmentToAddOrUpdate>({
    defaultValues: {
      date: new Date(),
      status: AppointmentStatus.BOOKED,
      description: '',
      medicines: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'medicines',
  });

  const { showSnackbar } = useSnackbar();
  const { updateAppointment } = useAppointment();

  useEffect(() => {
    if (appointment) {
      setValue('date', appointment.date);
      setValue('status', appointment.status);
      setValue('description', appointment.description);
      setValue('medicines', appointment.medicines || []);
    }
  }, [appointment, setValue]);

  const onSubmit = async (data: AppointmentToAddOrUpdate) => {
    try {
      const appointmentToAddOrUpdate: AppointmentToAddOrUpdate = {
        description: data.description,
        status: data.status,
        date: appointment.date,
        doctorId: appointment.doctor.id,
        patientId: appointment.patient.id,
        examinationId: appointment.examination.id,
      };
      console.log(appointmentToAddOrUpdate);
      await updateAppointment(appointmentToAddOrUpdate, appointment.id);
      onClose(true);
      showSnackbar('Appointment updated successfully.', 'success');
    } catch {
      onClose(false);
      showSnackbar('Appointment update failed.', 'error');
    }
  };

  return (
    <Card
      className={
        formType === 'WholePageForm' ? 'whole-page-form' : 'popup-form'
      }
    >
      {action && <CardHeader title={action} />}
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <Box display='grid' gap={2}>
            <Controller
              name='status'
              control={control}
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label='Status' error={!!errors.status}>
                    <MenuItem value={AppointmentStatus.BOOKED}>
                      {AppointmentStatus.BOOKED}
                    </MenuItem>
                    <MenuItem value={AppointmentStatus.CANCELLED}>
                      {AppointmentStatus.CANCELLED}
                    </MenuItem>
                    <MenuItem value={AppointmentStatus.FINISHED}>
                      {AppointmentStatus.FINISHED}
                    </MenuItem>
                  </Select>
                  {errors.status && (
                    <Typography color='error'>
                      {errors.status.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Description'
                  multiline
                  rows={4}
                  fullWidth
                />
              )}
            />
            {fields.map((medicine, index) => (
              <Box key={medicine.id} display='grid' gap={2}>
                <Typography>Medicine {index + 1}</Typography>
                <Controller
                  name={`medicines.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label='Name' fullWidth />
                  )}
                />
                <Controller
                  name={`medicines.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label='Quantity' fullWidth />
                  )}
                />
                <Controller
                  name={`medicines.${index}.numberOfDays`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label='Number Of Days' fullWidth />
                  )}
                />
                <Controller
                  name={`medicines.${index}.dosage`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label='Dosage' fullWidth />
                  )}
                />
              </Box>
            ))}
            <Button type='button' onClick={() => append({} as Medicine)}>
              <AddIcon /> Add Medicine
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
