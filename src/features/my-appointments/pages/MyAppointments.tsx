import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Appointment } from '../../../core/models/appointment/Appointment';
import { AppointmentStatus } from '../../../core/enums/AppointmentStatus';
import withAuth from '../../../core/authentication/hoc/withAuth.tsx';
import { useAuth } from '../../../core/authentication/hooks/useAuth.tsx';
import { useSnackbar } from '../../../shared/snackbar/hooks/useSnackBar.tsx';
import { useAppointment } from '../../../shared/hooks/useAppointment.tsx';
import { PageRequestParams } from '../../../shared/model/PageRequestParams.ts';
import { PageRequestResponseData } from '../../../shared/model/PageRequestResponseData.ts';
import { TableHelper } from '../../../shared/helpers/tableHelper.ts';
import PaginatorComponent from '../../../shared/components/paginator/Paginator.tsx';
import { ExaminationPageRequestParams } from '../../../shared/model/ExaminationPageRequestParams.ts';

const MyAppointments: React.FC = () => {
  const { authData } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { getPagedPatientAppointments, updateAppointment } = useAppointment();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pageAppointmentResponseData, setPageAppointmentResponseData] =
    useState<PageRequestResponseData<Appointment> | undefined>(undefined);
  const [requestParams, setRequestParams] = useState<PageRequestParams>({});
  const tableHelper = useMemo(() => new TableHelper(), []);

  const loadAppointments = useCallback(async () => {
    if (!authData?.id) return;
    try {
      const response = await getPagedPatientAppointments(
        requestParams,
        authData.id,
      );
      setAppointments(response.content);
      setPageAppointmentResponseData(response);

      tableHelper.setSpecifiedBaseColumnNamesFromRequestData(
        response,
        [
          'examination.name',
          'date',
          'doctor.email',
          'status',
          'examination.price',
          'examination.duration',
        ],
        {
          'examination.name': 'Examination',
          date: 'Date',
          'doctor.email': 'Doctor',
          status: 'Status',
          'examination.price': 'Price',
          'examination.duration': 'Duration',
        },
      );
    } catch {
      showSnackbar('No appointments found.', 'info');
    }
  }, [
    authData?.id,
    getPagedPatientAppointments,
    requestParams,
    showSnackbar,
    tableHelper,
  ]);

  const cancelAppointment = useCallback(
    async (appointment: Appointment) => {
      if (new Date(appointment.date) < new Date()) {
        showSnackbar(
          'You cannot cancel an appointment that has already passed.',
          'error',
        );
        return;
      }
      try {
        await updateAppointment(
          {
            date: appointment.date,
            status: AppointmentStatus.CANCELLED,
            doctorId: appointment.doctor.id,
            patientId: appointment.patient.id,
            examinationId: appointment.examination.id,
          },
          appointment.id,
        );
        showSnackbar('Appointment cancelled successfully.', 'success');
        await loadAppointments();
      } catch {
        showSnackbar('Failed to cancel appointment.', 'error');
      }
    },
    [updateAppointment, loadAppointments, showSnackbar],
  );

  useEffect(() => {
    loadAppointments().then(() => {});
  }, [loadAppointments]);

  const handlePageChange = (params: ExaminationPageRequestParams) => {
    setRequestParams(params);
  };

  return (
    <Box>
      <Typography variant='h2'>My appointments</Typography>
      {appointments.length ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableHelper.baseColumnTitles.map((title, index) => (
                  <TableCell key={tableHelper.baseColumnNames[index]}>
                    {title}
                  </TableCell>
                ))}
                <TableCell>Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map(appointment => (
                <TableRow key={appointment.id}>
                  {tableHelper.baseColumnNames.map(column => (
                    <TableCell key={column}>
                      {tableHelper.nestedPropertyAccessor<Appointment>(
                        appointment,
                        column,
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton
                      onClick={() => cancelAppointment(appointment)}
                      aria-label='cancel'
                    >
                      <CancelIcon color='primary' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginatorComponent
            onPageChange={handlePageChange}
            data={pageAppointmentResponseData}
            requestParams={requestParams}
          />
        </TableContainer>
      ) : (
        <Box className='no-data'>
          <Typography>No appointments found</Typography>
        </Box>
      )}
    </Box>
  );
};

const MyAppointmentsWithAuth = withAuth(MyAppointments);

export default MyAppointmentsWithAuth;
