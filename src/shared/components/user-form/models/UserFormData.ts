import { UserRole } from '../../../../core/enums/UserRole.ts';

export interface UserFormData {
  basicData: {
    name: string;
    surname: string;
    email: string;
    pesel: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
  };
  adminManagedData: {
    enabled: boolean;
    role: UserRole;
  };
  address: {
    country: string;
    city: string;
    street: string;
    postalCode: string;
    houseNumber: string;
    apartmentNumber?: string;
  };
  doctorDetails?: {
    specialization?: string;
    education?: string;
    description?: string;
  };
}
