import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '@/core/enums/UserRole.ts';
import { PageRequestParams } from '@/shared/model/PageRequestParams.ts';
import Typography from '@mui/material/Typography';
import { Doctor } from '@/core/models/Doctor.ts';
import { checkAccess } from '@/core/authentication/utilities/authUtils.ts';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData.ts';
import './Doctors.scss';
import { useSpinner } from '@/shared/spinner/hooks/useSpinner.tsx';
import { Button } from '@mui/material';
import { useDoctor } from '@/features/doctors/hooks/useDoctor.tsx';
import PaginatorComponent from '@/shared/components/paginator/Paginator.tsx';
import { UserPageRequestParams } from '@/shared/model/UserPageRequestParams.ts';
import femaleDoctor from '@/assets/images/female-doctor.webp';

const Doctors: React.FC = () => {
  const { fetchPagedDoctors } = useDoctor();
  const [userRequestParams, setUserRequestParams] = useState<PageRequestParams>(
    {},
  );
  const [data, setData] = useState<PageRequestResponseData<Doctor>>();
  const { showSpinner, hideSpinner } = useSpinner();

  const getDoctors = useCallback(async () => {
    showSpinner();
    try {
      const data: PageRequestResponseData<Doctor> =
        await fetchPagedDoctors(userRequestParams);
      setData(data);
    } finally {
      hideSpinner();
    }
  }, [fetchPagedDoctors, hideSpinner, showSpinner, userRequestParams]);

  useEffect(() => {
    getDoctors().then(() => {});
  }, [getDoctors]);

  const handlePageChange = useCallback(
    (userRequestParams?: UserPageRequestParams) => {
      if (!userRequestParams) return;
      setUserRequestParams(userRequestParams);
    },
    [],
  );

  return (
    <section className='doctors-wrapper'>
      <Typography variant='h2' gutterBottom>
        Meet our doctors
      </Typography>
      <div className='doctors'>
        <PaginatorComponent
          onPageChange={handlePageChange}
          data={data}
          requestParams={userRequestParams}
        />
        {data?.content.map((doctor: Doctor) => (
          <div key={doctor.id} className='doctor'>
            <div className='doctor-image'>
              <img
                alt={doctor.name}
                src={femaleDoctor}
              />
            </div>
            <div className='doctor-info'>
              <Typography variant='h5' component='h3'>
                <Link to={`${doctor.email}`}>
                  {doctor.name} {doctor.surname}
                </Link>
              </Typography>
              {doctor.doctorDetails?.specialization && (
                <Typography variant='body2' component='p'>
                  <span className='material-symbols-outlined'>
                    stethoscope_check
                  </span>
                  {doctor.doctorDetails?.specialization}
                </Typography>
              )}
              <Typography variant='body2' component='p'>
                <span className='material-symbols-outlined'>place</span>
                Wijttenbachstraat 36, 1093 JC Amsterdam
              </Typography>
              {doctor.doctorDetails?.education && (
                <Typography variant='body2' component='p'>
                  <span className='material-symbols-outlined'>school</span>
                  {doctor.doctorDetails?.education}
                </Typography>
              )}
              {doctor.doctorDetails?.description && (
                <Typography
                  variant='body2'
                  component='p'
                  className='description'
                >
                  {doctor.doctorDetails?.description}
                </Typography>
              )}
            </div>
            <div className='schedule-appointment'>
              <Button
                variant='contained'
                component={Link}
                to={`${doctor.email}`}
              >
                Schedule Appointment
              </Button>
              {checkAccess([UserRole.REGISTRAR]) && (
                <Button
                  variant='contained'
                  component={Link}
                  to={`/manage-appointments/${doctor.id}`}
                >
                  Manage appointments
                </Button>
              )}
            </div>
          </div>
        ))}
        <PaginatorComponent
          onPageChange={handlePageChange}
          data={data}
          requestParams={userRequestParams}
        />
      </div>
    </section>
  );
};

export default Doctors;
