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
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from '../../../shared/snackbar/hooks/useSnackBar';
import { useAppointment } from '../../../shared/hooks/useAppointment';
import { useParams } from 'react-router-dom';
import { TableHelper } from '../../../shared/helpers/tableHelper';
import { useFormDialog } from '../../../shared/hooks/useFormDialog.tsx';
import { AppointmentPageRequestParams } from '../../../shared/model/AppointmentPageRequestParams.ts';
import { PageRequestResponseData } from '../../../shared/model/PageRequestResponseData.ts';
import { Appointment } from '../../../core/models/appointment/Appointment.ts';
import AppointmentForm from '../components/appointment-form/AppointmentForm.tsx';
import PaginatorComponent from '../../../shared/components/paginator/Paginator.tsx';

const ManageAppointments: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const { getPagedDoctorAppointments } = useAppointment();
  const { openDialog, closeDialog, DialogComponent } = useFormDialog();
  const { id: doctorId } = useParams<{ id: string }>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pageAppointmentResponseData, setPageAppointmentResponseData] =
    useState<PageRequestResponseData<Appointment> | undefined>(undefined);
  const [requestParams, setRequestParams] =
    useState<AppointmentPageRequestParams>({});
  const tableHelper = useMemo(() => new TableHelper(), []);

  const loadAppointments = useCallback(async () => {
    if (!doctorId) return;
    try {
      const response = await getPagedDoctorAppointments(
        requestParams,
        doctorId,
      );
      setAppointments(response.content);
      setPageAppointmentResponseData(response);

      tableHelper.setSpecifiedBaseColumnNamesFromRequestData(
        response,
        [
          'id',
          'status',
          'patient.email',
          'doctor.email',
          'examination.name',
          'examination.price',
          'examination.duration',
        ],
        {
          'patient.email': 'Patient',
          'doctor.email': 'Doctor',
          'examination.name': 'Examination',
          'examination.price': 'Price',
          'examination.duration': 'Duration',
        },
      );
      tableHelper.setAllColumnNames(['edit']);
    } catch {
      showSnackbar('No appointments found.', 'info');
    }
  }, [
    doctorId,
    getPagedDoctorAppointments,
    requestParams,
    showSnackbar,
    tableHelper,
  ]);

  const handleClose = useCallback(async () => {
    closeDialog();
    await loadAppointments();
  }, [closeDialog, loadAppointments]);

  const openEditAppointmentDialog = useCallback(
    (appointment: Appointment) => {
      openDialog({
        component: (
          <AppointmentForm
            appointment={appointment}
            formType='PopupForm'
            onClose={handleClose}
          />
        ),
        props: { appointment },
        options: { title: 'Edit Appointment', width: '700px', height: '700px' },
      });
    },
    [openDialog, loadAppointments],
  );

  useEffect(() => {
    loadAppointments().then(() => {});
  }, [loadAppointments]);

  const handlePageChange = useCallback(
    (params: AppointmentPageRequestParams) => {
      setRequestParams(params);
    },
    [],
  );

  return (
    <Box>
      <Typography variant='h2'>Manage Appointments</Typography>
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
                <TableCell>Edit</TableCell>
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
                      onClick={() => openEditAppointmentDialog(appointment)}
                      aria-label='edit'
                    >
                      <EditIcon color='primary' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginatorComponent
            data={pageAppointmentResponseData}
            onPageChange={handlePageChange}
            requestParams={requestParams}
          />
        </TableContainer>
      ) : (
        <Box className='no-data'>
          <Typography>No appointments found</Typography>
        </Box>
      )}
      <DialogComponent />
    </Box>
  );
};

export default ManageAppointments;
