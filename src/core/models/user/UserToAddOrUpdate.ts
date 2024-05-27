import { Address } from '../Address';
import { DoctorDetails } from '../DoctorDetails';
import { UserRole } from '@/core/enums/UserRole.ts';

export interface UserToAddOrUpdate {
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  pesel: string;
  address: Address;
  doctorDetails?: DoctorDetails;
  password?: string;
  isEnabled?: boolean;
}
