import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Doctor } from '@/core/models/Doctor.ts';
import { useSpinner } from '@/shared/spinner/hooks/useSpinner.tsx';
import './DoctorDetails.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useDoctor } from '@/features/doctors/hooks/useDoctor.tsx';
import DoctorInfo from '@/features/doctors/components/doctor-info/DoctorInfo.tsx';
import Examinations from '@/features/doctors/components/examinations/Examinations.tsx';
import DoctorSchedule from '@/features/doctors/components/doctor-schedule/DoctorSchedule.tsx';
import ScheduleAppointment from '@/features/doctors/components/schedule-appointment/ScheduleAppointment.tsx';
import femaleDoctor from '@/assets/images/female-doctor.webp';

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
              src={femaleDoctor}
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
