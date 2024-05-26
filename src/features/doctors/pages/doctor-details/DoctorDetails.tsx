import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Doctor } from '../../../../core/models/Doctor';
import { useDoctor } from '../../hooks/useDoctor';
import { useSpinner } from '../../../../shared/spinner/hooks/useSpinner';
import DoctorInfo from '../../components/doctor-info/DoctorInfo.tsx';
import DoctorSchedule from '../../components/doctor-schedule/DoctorSchedule.tsx';
import Examinations from '../../components/examinations/Examinations.tsx';
import './DoctorDetails.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import ScheduleAppointment from '../../components/schedule-appointment/ScheduleAppointment.tsx';

const DoctorDetails: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const { fetchDoctorByEmail } = useDoctor();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const { showSpinner, hideSpinner } = useSpinner();
  const [tabValue, setTabValue] = useState<number>(0);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (email) {
        try {
          showSpinner();
          const doctorData = await fetchDoctorByEmail(email);
          setDoctor(doctorData);
        } catch (error) {
          console.error('Failed to fetch doctor:', error);
        } finally {
          hideSpinner();
        }
      }
    };
    fetchDoctor().then(() => {});
  }, [email, fetchDoctorByEmail, hideSpinner, showSpinner]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!doctor) return <div>No doctor found</div>;

  return (
    <Box className='doctor-details-wrapper'>
      <Box className='doctors'>
        <Box className='doctor'>
          <Box className='doctor-image'>
            <img
              alt={`${doctor.name} ${doctor.surname}`}
              src='/src/assets/images/female-doctor.webp'
            />
          </Box>

          <Typography variant='h3' className='name'>
            {doctor.name} {doctor.surname}
          </Typography>

          <Box className='tab-group-wrapper'>
            <Box className='tab-group'>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label='doctor details tabs'
              >
                <Tab label='Info' />
                <Tab label='Examinations' />
                <Tab label='Doctor Schedule' />
              </Tabs>
            </Box>

            <Box className='tab-content'>
              {tabValue === 0 && <DoctorInfo doctor={doctor} />}
              {tabValue === 1 && <Examinations doctor={doctor} />}
              {tabValue === 2 && <DoctorSchedule doctor={doctor} />}
            </Box>
          </Box>

          <Box className='schedule-appointment'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ScheduleAppointment doctor={doctor} />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorDetails;
