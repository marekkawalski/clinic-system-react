import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <div className='page-wrapper footer'>
      <Typography variant='h2'>Contact Us</Typography>
      <Typography>
        If you have any questions or need help, feel free to contact us. We are
        always ready to help you.
      </Typography>
      <div className='container'>
        <img
          alt='line'
          className='line doctor-img'
          height='4812'
          src='src/assets/images/medical-doctor.png'
          width='2863'
        />
        <div className='contact-info'>
          <Box className='contact-info-item'>
            <PlaceIcon />
            <Typography variant='h5'>Address</Typography>
            <p>Wijttenbachstraat 36</p>
            <p>1093 JC Amsterdam</p>
          </Box>
          <Box className='contact-info-item'>
            <PhoneIcon />
            <Typography variant='h5'>Phones</Typography>
            <p>020 665 63 33</p>
            <p>020 665 63 32</p>
          </Box>
          <Box className='contact-info-item'>
            <EmailIcon />
            <Typography variant='h5'>Email</Typography>
            <p>clinic&#64;clinic-system.com</p>
          </Box>
          <Box className='contact-info-item'>
            <ScheduleIcon />
            <Typography variant='h5'>Opening hours</Typography>
            <p>Monday - Friday: 09:00 - 17:00</p>
            <p>Saturday - Sunday: Closed</p>
          </Box>
          <Box className='contact-info-item'>
            <PersonAddIcon />
            <Typography variant='h5'>Follow us</Typography>
            <p>
              Join us on social media to stay up to date with our latest news
              and events.
            </p>
            <div className='social-media'>
              <Link href='https://www.facebook.com' target='_blank'>
                Facebook
              </Link>
              <Link href='https://www.instagram.com' target='_blank'>
                Instagram
              </Link>
              <Link href='https://www.linkedin.com' target='_blank'>
                LinkedIn
              </Link>
              <Link href='https://www.twitter.com' target='_blank'>
                Twitter
              </Link>
            </div>
          </Box>
        </div>
      </div>
      <div className='page-info'>
        <Typography>
          <strong>Disclaimer:</strong> This website is for educational purposes
          only. It is not intended to provide medical advice or to take the
          place of medical advice or treatment from a personal physician. All
          readers/viewers of this content are advised to consult their doctors
          or qualified health professionals regarding specific health questions.
          Clinic System does not take responsibility for possible health
          consequences of any person or persons reading or following the
          information in this educational content. All viewers of this content,
          especially those taking prescription or over-the-counter medications,
          should consult their physicians before beginning any nutrition,
          supplement or lifestyle program.
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
