import { Address } from '../Address';
import { DoctorDetails } from '../DoctorDetails';
import { UserRole } from '@/core/enums/UserRole.ts';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  pesel: string;
  address: Address;
  doctorDetails: DoctorDetails;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}
