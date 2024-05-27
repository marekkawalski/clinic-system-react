import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { z } from 'zod';
import { useUser } from '@/core/hooks/useUser.tsx';
import { useRegister } from '@/core/authentication/hooks/useRegister.tsx';
import { UserRole } from '@/core/enums/UserRole.ts';
import { UserFormData } from './models/UserFormData.ts';
import { UserToAddOrUpdate } from '@/core/models/user/UserToAddOrUpdate.ts';
import './UserForm.scss';
import { useAuth } from '@/core/authentication/hooks/useAuth.tsx';
import { userFormSchema } from './validation/userFormSchema.tsx';
import { FormType } from '@/shared/enums/FormType.ts';
import { useSnackbar } from '@/shared/snackbar/hooks/useSnackBar.tsx';

type UserFormSchema = ReturnType<typeof userFormSchema>;
type userFormInputs = z.infer<UserFormSchema>;

const UserForm: React.FC<{
  userId?: string;
  action: string;
  children?: React.ReactNode;
  formType: FormType;
  onClose?: () => void;
}> = ({ userId, action, children, formType = FormType.PopupForm, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<userFormInputs>({
    resolver: zodResolver(userFormSchema(!userId)),
    defaultValues: {
      basicData: {
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        pesel: '',
        password: '',
        confirmPassword: '',
      },
      address: {
        country: '',
        city: '',
        street: '',
        postalCode: '',
        houseNumber: '',
        apartmentNumber: '',
      },
      adminManagedData: {
        role: UserRole.PATIENT,
        enabled: true,
      },
      doctorDetails: {
        specialization: '',
        education: '',
        description: '',
      },
    },
  });

  const { updateUser, getUserById } = useUser();
  const { register } = useRegister();
  const { showSnackbar } = useSnackbar();
  const { checkAccess } = useAuth();
  const role = watch('adminManagedData.role');

  useEffect(() => {
    if (userId) {
      getUserById(userId).then(user => {
        const initialValues: UserFormData = {
          basicData: {
            name: user.name,
            surname: user.surname,
            email: user.email,
            phoneNumber: user?.phoneNumber ?? undefined,
            pesel: user.pesel,
            password: undefined,
            confirmPassword: undefined,
          },
          address: user.address,
          adminManagedData: {
            role: user.role,
            enabled: user.isEnabled,
          },
        };

        if (user.doctorDetails) {
          initialValues.doctorDetails = {
            specialization: user.doctorDetails.specialization,
            education: user.doctorDetails.education,
            description: user.doctorDetails.description,
          };
        }
        reset(initialValues);
      });
    }
  }, [userId, getUserById, reset]);

  const onSubmit: SubmitHandler<UserFormData> = async (
    formData,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();

    const data: UserToAddOrUpdate = {
      name: formData.basicData.name,
      surname: formData.basicData.surname,
      email: formData.basicData.email,
      pesel: formData.basicData.pesel,
      address: formData.address,
      role: formData.adminManagedData.role,
      isEnabled: formData.adminManagedData.enabled,
    };

    if (formData.basicData.password) {
      data.password = formData.basicData.password;
    }
    if (formData.basicData.phoneNumber) {
      data.phoneNumber = formData.basicData.phoneNumber;
    }
    if (
      formData.doctorDetails?.description ||
      formData.doctorDetails?.education ||
      formData.doctorDetails?.specialization
    ) {
      data.doctorDetails = formData.doctorDetails;
    }

    if (userId) {
      const response = await updateUser(data, userId);
      if (response) {
        showSnackbar(
          `User ${response.name} ${response.surname} updated successfully`,
          'success',
        );
      }
      if (formType === FormType.PopupForm && onClose) {
        onClose();
      }
      return;
    }
    const response = await register(data);
    if (response) {
      showSnackbar(
        `User ${response.name} ${response.surname} registered successfully`,
        'success',
      );
    }
    if (formType === FormType.PopupForm && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={
        formType === FormType.PopupForm ? 'popup-form' : 'whole-page-form'
      }
    >
      <Card>
        <Box m={2}>
          <CardHeader title={action} />
          <CardContent>
            <form id='userForm' onSubmit={handleSubmit(onSubmit)}>
              <div className='form-grid '>
                <div>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='basicData.name'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Name'
                          error={!!errors.basicData?.name}
                          helperText={errors.basicData?.name?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='basicData.surname'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Surname'
                          error={!!errors.basicData?.surname}
                          helperText={errors.basicData?.surname?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='basicData.email'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Email'
                          error={!!errors.basicData?.email}
                          helperText={errors.basicData?.email?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='basicData.phoneNumber'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Phone Number'
                          error={!!errors.basicData?.phoneNumber}
                          helperText={errors.basicData?.phoneNumber?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='basicData.pesel'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='PESEL'
                          error={!!errors.basicData?.pesel}
                          helperText={errors.basicData?.pesel?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='basicData.password'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Password'
                          type='password'
                          error={!!errors.basicData?.password}
                          helperText={errors.basicData?.password?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='basicData.confirmPassword'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Confirm Password'
                          type='password'
                          error={!!errors.basicData?.confirmPassword}
                          helperText={
                            errors.basicData?.confirmPassword?.message
                          }
                        />
                      )}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='address.country'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Country'
                          error={!!errors.address?.country}
                          helperText={errors.address?.country?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='address.city'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='City'
                          error={!!errors.address?.city}
                          helperText={errors.address?.city?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='address.street'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Street'
                          error={!!errors.address?.street}
                          helperText={errors.address?.street?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='address.postalCode'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Postal Code'
                          error={!!errors.address?.postalCode}
                          helperText={errors.address?.postalCode?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='address.houseNumber'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='House Number'
                          error={!!errors.address?.houseNumber}
                          helperText={errors.address?.houseNumber?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth margin='normal'>
                    <Controller
                      name='address.apartmentNumber'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Apartment Number'
                          error={!!errors.address?.apartmentNumber}
                          helperText={errors.address?.apartmentNumber?.message}
                        />
                      )}
                    />
                  </FormControl>
                </div>
                <div>
                  {checkAccess([UserRole.ADMIN]) && (
                    <div>
                      <FormControl fullWidth margin='normal'>
                        <Controller
                          name='adminManagedData.enabled'
                          control={control}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox {...field} checked={!!field.value} />
                              }
                              label='Enabled'
                            />
                          )}
                        />
                      </FormControl>
                      <FormControl fullWidth margin='normal'>
                        <InputLabel id='role-label'>Role</InputLabel>
                        <Controller
                          name='adminManagedData.role'
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              labelId='role-label'
                              label='Role'
                              value={field.value || UserRole.PATIENT}
                            >
                              <MenuItem value={UserRole.PATIENT}>
                                Patient
                              </MenuItem>
                              <MenuItem value={UserRole.DOCTOR}>
                                Doctor
                              </MenuItem>
                              <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                              <MenuItem value={UserRole.REGISTRAR}>
                                Registrar
                              </MenuItem>
                            </Select>
                          )}
                        />
                      </FormControl>
                    </div>
                  )}
                  {role === UserRole.DOCTOR && (
                    <Box>
                      <FormControl fullWidth margin='normal'>
                        <Controller
                          name='doctorDetails.specialization'
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label='Specialization'
                              error={!!errors.doctorDetails?.specialization}
                              helperText={
                                errors.doctorDetails?.specialization?.message
                              }
                            />
                          )}
                        />
                      </FormControl>
                      <FormControl fullWidth margin='normal'>
                        <Controller
                          name='doctorDetails.education'
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label='Education'
                              error={!!errors.doctorDetails?.education}
                              helperText={
                                errors.doctorDetails?.education?.message
                              }
                            />
                          )}
                        />
                      </FormControl>
                      <FormControl fullWidth margin='normal'>
                        <Controller
                          name='doctorDetails.description'
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label='Description'
                              error={!!errors.doctorDetails?.description}
                              helperText={
                                errors.doctorDetails?.description?.message
                              }
                            />
                          )}
                        />
                      </FormControl>
                    </Box>
                  )}
                </div>
              </div>
              <Box mt={4}>
                {children || (
                  <Button type='submit' variant='contained' color='primary'>
                    Submit
                  </Button>
                )}
              </Box>
            </form>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default UserForm;
