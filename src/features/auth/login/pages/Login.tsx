import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { PathConstants } from '../../../../core/constants/path.constants.ts';
import { useAuth } from '../../../../core/authentication/hooks/useAuth.tsx';
import { useSpinner } from '../../../../shared/spinner/hooks/useSpinner.tsx';
import { useSnackbar } from '../../../../shared/snackbar/hooks/useSnackBar.tsx';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();
  const { showSpinner, hideSpinner } = useSpinner();
  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async data => {
    showSpinner();

    try {
      await login(data.email, data.password);
      navigate(PathConstants.HOME_PATH);
      showSnackbar('Login successful', 'success');
    } finally {
      hideSpinner();
    }
  };

  return (
    <div className='form-page'>
      <Box className='headlines-wrapper'>
        <Typography component='h2' variant='h2' className='headline'>
          Clinic system
        </Typography>
      </Box>
      <Box className='form-card-wrapper'>
        <Box className='form-card-child'>
          <Card className='login-card'>
            <CardHeader title='Login' />
            <CardContent className='card-content'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth margin='normal'>
                  <TextField
                    label='Email'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    variant='outlined'
                    type='text'
                  />
                </FormControl>
                <FormControl fullWidth margin='normal' variant='outlined'>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <OutlinedInput
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    error={!!errors.password}
                    endAdornment={
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                    label='Password'
                  />
                  <FormHelperText error={!!errors.password}>
                    {errors?.password?.message ?? ''}
                  </FormHelperText>
                  <Box className='forget-password'>
                    <Button
                      onClick={() => navigate('/forgot-password')}
                      type='button'
                    >
                      Forgot password?
                    </Button>
                  </Box>
                </FormControl>
                <Box className='container'>
                  <Box className='button-container'>
                    <Button type='submit' variant='contained' color='primary'>
                      Login
                    </Button>
                  </Box>
                </Box>
                <Box className='sign-up'>
                  <Button
                    onClick={() => navigate(PathConstants.REGISTER_PATH)}
                    type='button'
                    color='primary'
                  >
                    Don't have an account? Sign up
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
