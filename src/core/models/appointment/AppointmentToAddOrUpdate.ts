import { Medicine } from './Medicine';
import { AppointmentStatus } from '@/core/enums/AppointmentStatus.ts';

export interface AppointmentToAddOrUpdate {
  date: Date;
  status: AppointmentStatus;
  description?: string;
  doctorId: string;
  patientId: string;
  examinationId: string;
  medicines?: Medicine[];
}
