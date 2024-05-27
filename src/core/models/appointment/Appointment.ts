import { Examination } from '../Examination';
import { Medicine } from './Medicine';
import { User } from '@/core/models/user/User.ts';
import { AppointmentStatus } from '@/core/enums/AppointmentStatus.ts';

export interface Appointment {
  readonly id: string;
  date: Date;
  status: AppointmentStatus;
  description: string;
  doctor: User;
  patient: User;
  examination: Examination;
  medicines?: Medicine[];
}
