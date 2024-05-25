import React from 'react';
import { Doctor } from '../../../../core/models/Doctor';
import { Box, Typography } from '@mui/material';
import StethoscopeCheckIcon from '@mui/icons-material/MedicalServices';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';
import './DoctorInfo.scss';

interface DoctorInfoProps {
  doctor: Doctor;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {
  return (
    <Box className='doctor-info-wrapper'>
      {doctor.doctorDetails && (
        <Box className='doctor-info'>
          <Box className='basic-info'>
            {doctor.doctorDetails.specialization && (
              <Typography component='p'>
                <span className='header'>
                  <StethoscopeCheckIcon />
                  <strong>Specialization:</strong>
                </span>
                <span>{doctor.doctorDetails.specialization}</span>
              </Typography>
            )}
            {doctor.doctorDetails.education && (
              <Typography component='p'>
                <span className='header'>
                  <SchoolIcon />
                  <strong>Education:</strong>
                </span>
                <span>{doctor.doctorDetails.education}</span>
              </Typography>
            )}
            <Typography component='p'>
              <span className='header'>
                <LanguageIcon />
                <strong>Languages:</strong>
              </span>
              English, Spanish
            </Typography>
            <Typography component='p'>
              <span className='header'>
                <HistoryEduIcon />
                <strong>Experience:</strong>
              </span>
              10 years of experience
            </Typography>
          </Box>
          <Box className='contact-info'>
            <Typography component='p'>
              <span className='header'>
                <PlaceIcon />
                <strong>Location:</strong>
              </span>
              <span>Wijttenbachstraat 36, 1093 JC Amsterdam</span>
            </Typography>
            <Typography component='p'>
              <span className='header'>
                <EmailIcon />
                <strong>Email:</strong>
              </span>
              <span>{doctor.email}</span>
            </Typography>
            <Typography component='p'>
              <span className='header'>
                <PhoneIcon />
                <strong>Phone:</strong>
              </span>
              <span>{doctor.phoneNumber}</span>
            </Typography>
          </Box>
          {doctor.doctorDetails?.description && (
            <Typography component='p' className='description'>
              <span className='header'>
                <DescriptionIcon />
                <strong>About me:</strong>
              </span>
              <span>{doctor.doctorDetails.description}</span>
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DoctorInfo;
