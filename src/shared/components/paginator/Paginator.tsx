import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from '@mui/material';
import './Paginator.scss';
import { PageRequestParams } from '@/shared/model/PageRequestParams.ts';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData.ts';

interface PaginatorComponentProps {
  onPageChange: (params?: PageRequestParams) => void;
  data?: PageRequestResponseData<unknown>;
  requestParams?: PageRequestParams;
  sx?: SxProps<Theme>;
}

const PaginatorComponent: React.FC<PaginatorComponentProps> = ({
  onPageChange,
  data,
  requestParams = { 'page-size': 10, 'page-num': 0 },
  sx,
}) => {
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    onPageChange({ ...requestParams, 'page-num': value - 1 });
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    onPageChange({
      ...requestParams,
      'page-size': event.target.value as number,
      'page-num': 0,
    });
  };

  if (!data) return <div></div>;

  return (
    <Box className='paginator-wrapper' sx={sx}>
      <FormControl
        variant='outlined'
        style={{ minWidth: 120, marginRight: 20 }}
      >
        <InputLabel id='page-size-label'>Page Size</InputLabel>
        <Select
          labelId='page-size-label'
          value={requestParams['page-size'] ?? 10}
          onChange={handlePageSizeChange}
          label='Page Size'
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <Pagination
        showFirstButton={true}
        showLastButton={true}
        count={data.totalPages}
        page={(requestParams['page-num'] ?? 0) + 1}
        onChange={handlePageChange}
        sx={{ marginTop: 5, marginBottom: 10 }}
      />
    </Box>
  );
};

export default PaginatorComponent;
