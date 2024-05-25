import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { TableHelper } from '../../../../shared/helpers/tableHelper';
import { useSpinner } from '../../../../shared/spinner/hooks/useSpinner';
import { useExamination } from '../../hooks/useExamination';
import { Examination } from '../../../../core/models/Examination';
import { useSnackbar } from '../../../../shared/snackbar/hooks/useSnackBar';

import PaginatorComponent from '../../../../shared/components/paginator/Paginator.tsx';
import { PageRequestResponseData } from '../../../../shared/model/PageRequestResponseData.ts';
import { ExaminationPageRequestParams } from '../../../../shared/model/ExaminationPageRequestParams.ts';
import './Examinations.scss';

interface ExaminationsProps {
  doctor: Doctor;
}

const Examinations: React.FC<ExaminationsProps> = ({ doctor }) => {
  const tableHelper = useMemo(() => new TableHelper(), []);
  const { showSpinner, hideSpinner } = useSpinner();
  const { fetchPagedDoctorExaminations } = useExamination();
  const { showSnackbar } = useSnackbar();

  const [examinations, setExaminations] = useState<Examination[]>([]);
  const [pageExaminationResponseData, setPageExaminationResponseData] =
    useState<PageRequestResponseData<Examination>>();
  const [requestParams, setRequestParams] =
    useState<ExaminationPageRequestParams>({
      'doctor-ids': [doctor.id],
    });

  const loadDoctorExaminations = useCallback(
    async (params: ExaminationPageRequestParams) => {
      showSpinner();
      try {
        const response = await fetchPagedDoctorExaminations(params);
        setPageExaminationResponseData(response);
        setExaminations(response.content);
        tableHelper.setSpecifiedBaseColumnNamesFromRequestData(
          response,
          ['name', 'duration', 'price', 'status'],
          {
            name: 'Name',
            duration: 'Duration',
            price: 'Price',
            status: 'Status',
          },
        );
      } catch (error) {
        showSnackbar('Failed to load examination data', 'error');
      } finally {
        hideSpinner();
      }
    },
    [
      fetchPagedDoctorExaminations,
      hideSpinner,
      showSnackbar,
      showSpinner,
      tableHelper,
    ],
  );

  useEffect(() => {
    loadDoctorExaminations(requestParams).then(() => {});
  }, [loadDoctorExaminations, requestParams]);

  const handlePageChange = (params: ExaminationPageRequestParams) => {
    setRequestParams(params);
  };

  if (!examinations.length) return <div>No examinations available</div>;

  return (
    <Box className='examinations-wrapper'>
      <TableContainer
        component={Paper}
        className='mat-elevation-z8 examinations'
      >
        <Table aria-label='examinations table'>
          <TableHead>
            <TableRow>
              {tableHelper.baseColumnNames.map((column, index) => (
                <TableCell key={column}>
                  {tableHelper.baseColumnTitles[index]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {examinations.map((element, index) => (
              <TableRow key={index}>
                {tableHelper.baseColumnNames.map(column => (
                  <TableCell key={column}>
                    {
                      tableHelper.nestedPropertyAccessor(
                        element,
                        column,
                      ) as React.ReactNode
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginatorComponent
        onPageChange={handlePageChange}
        data={pageExaminationResponseData}
        requestParams={requestParams}
      />
    </Box>
  );
};

export default Examinations;
