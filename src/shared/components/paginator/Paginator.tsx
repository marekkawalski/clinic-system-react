import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { PageRequestParams } from '../../model/PageRequestParams';

interface PaginatorComponentProps {
  onPageChange: (params: PageRequestParams) => void;
  data: { totalPages: number };
  requestParams: PageRequestParams;
}

const PaginatorComponent: React.FC<PaginatorComponentProps> = ({
  onPageChange,
  data,
  requestParams = { 'page-size': 10, 'page-num': 0 },
}) => {
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    onPageChange({ ...requestParams, 'page-num': value });
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    onPageChange({
      ...requestParams,
      'page-size': event.target.value as number,
      'page-num': 0,
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
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
        </Select>
      </FormControl>
      <Pagination
        count={data.totalPages - 1}
        page={requestParams['page-num'] ?? 0}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginatorComponent;
