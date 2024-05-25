import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Doctor } from '../../../../core/models/Doctor';
import { TableHelper } from '../../../../shared/helpers/tableHelper.ts';
import { DailySchedule } from '../../../../core/models/user/Schedule.ts';
import './DoctorSchedule.scss';

interface DoctorScheduleProps {
  doctor: Doctor;
}

const DoctorSchedule: React.FC<DoctorScheduleProps> = ({ doctor }) => {
  const [scheduleDataSource, setScheduleDataSource] = useState<Map<
    string,
    DailySchedule
  > | null>(null);
  const tableHelper = useMemo(() => new TableHelper(), []);

  useEffect(() => {
    if (doctor?.doctorDetails?.schedule?.dailySchedules) {
      setScheduleDataSource(doctor.doctorDetails.schedule.dailySchedules);
      tableHelper.setBaseColumnNames([
        ...doctor.doctorDetails.schedule.dailySchedules.keys(),
      ]);
    }
    console.log('scheduleDataSource:', scheduleDataSource);
  }, [doctor, tableHelper]);

  if (!scheduleDataSource) return <div>No schedule data available</div>;

  return (
    <Box>
      <TableContainer component={Paper} className='mat-elevation-z8 schedule'>
        <Table aria-label='doctor schedule'>
          <TableHead>
            <TableRow>
              {tableHelper.allColumnNames.map(column => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {tableHelper.allColumnNames.map(column => {
                const schedule = scheduleDataSource.get(column);
                return (
                  <TableCell key={column}>
                    {schedule
                      ? `${schedule.startTime} - ${schedule.endTime}`
                      : 'N/A'}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DoctorSchedule;
