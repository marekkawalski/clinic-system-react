import { z } from 'zod';
import { userFormValidationConstants } from './userFormValidationConstants.ts';
import { UserRole } from '../../../../core/enums/UserRole.ts';

export const userFormSchema = z.object({
  basicData: z
    .object({
      name: z
        .string()
        .min(
          userFormValidationConstants.MIN_NAME_LENGTH,
          `Name must be at least ${userFormValidationConstants.MIN_NAME_LENGTH} characters long`,
        )
        .max(
          userFormValidationConstants.MAX_NAME_LENGTH,
          `Name cannot be more than ${userFormValidationConstants.MAX_NAME_LENGTH} characters long`,
        )
        .min(1, 'Name is required'),
      surname: z
        .string()
        .min(
          userFormValidationConstants.MIN_SURNAME_LENGTH,
          `Surname must be at least ${userFormValidationConstants.MIN_SURNAME_LENGTH} characters long`,
        )
        .max(
          userFormValidationConstants.MAX_SURNAME_LENGTH,
          `Surname cannot be more than ${userFormValidationConstants.MAX_SURNAME_LENGTH} characters long`,
        )
        .min(1, 'Surname is required'),
      email: z
        .string()
        .email('Enter a valid email')
        .min(1, 'Email is required'),
      phoneNumber: z
        .string()
        .min(
          userFormValidationConstants.MIN_PHONE_NUMBER_LENGTH,
          `Phone number must be at least ${userFormValidationConstants.MIN_PHONE_NUMBER_LENGTH} characters long`,
        )
        .max(
          userFormValidationConstants.MAX_PHONE_NUMBER_LENGTH,
          `Phone number cannot be more than ${userFormValidationConstants.MAX_PHONE_NUMBER_LENGTH} characters long`,
        )
        .optional(),
      pesel: z
        .string()
        .length(
          userFormValidationConstants.PESEL_LENGTH,
          `PESEL must be ${userFormValidationConstants.PESEL_LENGTH} characters long`,
        )
        .min(1, 'PESEL is required'),
      password: z
        .string()
        .min(
          userFormValidationConstants.MIN_PASSWORD_LENGTH,
          `Password must be at least ${userFormValidationConstants.MIN_PASSWORD_LENGTH} characters long`,
        )
        .max(
          userFormValidationConstants.MAX_PASSWORD_LENGTH,
          `Password cannot be more than ${userFormValidationConstants.MAX_PASSWORD_LENGTH} characters long`,
        )
        .optional(),
      confirmPassword: z.string().optional(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Password mismatch',
      path: ['confirmPassword'],
    }),
  adminManagedData: z.object({
    enabled: z.boolean(),
    role: z.enum([
      UserRole.ADMIN,
      UserRole.DOCTOR,
      UserRole.PATIENT,
      UserRole.REGISTRAR,
    ]),
  }),
  address: z.object({
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
    street: z.string().min(1, 'Street is required'),
    postalCode: z.string().min(1, 'Postal Code is required'),
    houseNumber: z.string().min(1, 'House Number is required'),
    apartmentNumber: z.string().optional(),
  }),
  doctorDetails: z
    .object({
      specialization: z.string().optional(),
      education: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});
