import React, { FC } from 'react';
import { Typography } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import BusinessIcon from '@mui/icons-material/Business';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import BadgeIcon from '@mui/icons-material/Badge';
import AccessibleIcon from '@mui/icons-material/Accessible';
import LockIcon from '@mui/icons-material/Lock';
import './FeaturesSection.scss';

interface FeaturesSectionProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const Feature: FC<FeaturesSectionProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className='feature'>
    <div>
      <Icon className='feature-icon' />
      <h3>{title}</h3>
      <div className='border' />
    </div>
    <Typography>{description}</Typography>
  </div>
);

const FeaturesSection: FC = () => {
  return (
    <div className='features-wrapper page-wrapper'>
      <Feature
        icon={ScheduleIcon}
        title='Save time'
        description='Patients are scheduled for specific times to minimize waiting time to a minimum.'
      />
      <Feature
        icon={MedicalServicesIcon}
        title='Specialists at Your Service'
        description='If you need expert care, look no further. Our clinic flaunts an array of specialists, including an otolaryngologies, ready to provide top-notch medical service.'
      />
      <Feature
        icon={BusinessIcon}
        title='A Trusted Name in Healthcare'
        description='Our clinic was established in 1987 by Tim Jones. His mission was to create a patient-focused health center providing high-quality healthcare for the community. Today, we continue his legacy, carrying forward his commitment to exceptional care, with a team of skilled professionals and state-of-the-art medical technology.'
      />
      <Feature
        icon={PlaceIcon}
        title='Where-to-find us'
        description='Easily accessible and properly situated, our clinic is located on the main thoroughfare. Convenient bus stops and dedicated car parking ensure ease of commute for patients.'
      />
      <Feature
        icon={StarIcon}
        title='State-of-the-art Examinations'
        description='Our clinic prides itself on offering a wide range of detailed ultrasound examinations. We have been honored with accreditation from the Polish Society of Ultrasonography for our excellent services.'
      />
      <Feature
        icon={BadgeIcon}
        title='Compassionate and Skilled Staff'
        description="Our team, including environmental nurses with Master's degrees and an environmental midwife, is committed to providing personalized care. Our nursing staff and medical registrars diligently handle all scheduling of patient appointments."
      />
      <Feature
        icon={AccessibleIcon}
        title='Disabled-friendly Infrastructure'
        description="Keeping the needs of all our patients in mind, we have made sure our clinic is fully accessible to the disabled. With a specially designed entrance, elevator and convenient stairs to the upper floors, we've taken every step to ensure a comfortable visit for everyone."
      />
      <Feature
        icon={LockIcon}
        title='Your Safety, Our Priority'
        description='Our clinic is furnished with advanced bactericidal lamps in each office for optimal hygiene levels. Along with that, we also have a comprehensive ventilation system in place, enhancing the safety quotient for both our patients and staff.'
      />
    </div>
  );
};

export default FeaturesSection;
