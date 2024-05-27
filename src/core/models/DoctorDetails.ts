import { Schedule } from '@/core/models/user/Schedule.ts';

export interface DoctorDetails {
  specialization?: string;
  education?: string;
  description?: string;
  schedule?: Schedule;
}
