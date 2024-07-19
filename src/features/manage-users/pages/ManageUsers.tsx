import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData.ts';
import { UserPageRequestParams } from '@/shared/model/UserPageRequestParams.ts';
import { User } from '@/core/models/user/User.ts';
import { useUser } from '@/core/hooks/useUser.tsx';
import { TableHelper } from '@/shared/helpers/tableHelper.ts';
import { UserRole } from '@/core/enums/UserRole.ts';
import './ManageUsers.scss';
import { useSpinner } from '@/shared/spinner/hooks/useSpinner.tsx';
import EditUserComponent from '../components/edit-user/EditUser.tsx';
import PaginatorComponent from '@/shared/components/paginator/Paginator.tsx';
import withAuth from '@/core/authentication/hoc/withAuth.tsx';
import AddUserComponent from '@/features/manage-users/components/add-user/AddUser.tsx';

const ManageUsersPage: React.FC = () => {
  const { getPagedUsers } = useUser();
  const tableHelper = useMemo(() => new TableHelper(), []);
  const { showSpinner, hideSpinner } = useSpinner();

  const [dataSource, setDataSource] = useState<User[]>([]);
  const [pageUserResponseData, setPageUserResponseData] =
    useState<PageRequestResponseData<User>>();
  const [requestParams, setRequestParams] = useState<UserPageRequestParams>({});
  const [showDisabled, setShowDisabled] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchPagedUsers = useCallback(async () => {
    showSpinner();
    try {
      const data = await getPagedUsers(requestParams);
      setDataSource(data.content);
      setPageUserResponseData(data);
      tableHelper.setSpecifiedBaseColumnNamesFromRequestData(
        data,
        [
          'id',
          'name',
          'surname',
          'email',
          'role',
          'phoneNumber',
          'pesel',
          'address.country',
          'address.city',
          'address.street',
          'address.postalCode',
          'address.houseNumber',
          'address.apartmentNumber',
          'isEnabled',
          'createdAt',
          'updatedAt',
          'lastLogin',
        ],
        {
          id: 'Id',
          name: 'Name',
          surname: 'Surname',
          email: 'Email',
          role: 'Role',
          phoneNumber: 'Phone Number',
          pesel: 'Pesel',
          'address.country': 'Country',
          'address.city': 'City',
          'address.street': 'Street',
          'address.postalCode': 'Postal Code',
          'address.houseNumber': 'House Number',
          'address.apartmentNumber': 'Apartment Number',
          isEnabled: 'Is Enabled',
          createdAt: 'Created At',
          updatedAt: 'Updated At',
          lastLogin: 'Last Login',
        },
      );
      tableHelper.setAllColumnNames(['edit']);
    } finally {
      hideSpinner();
    }
  }, [getPagedUsers, hideSpinner, requestParams, showSpinner, tableHelper]);

  useEffect(() => {
    const showDisabled = localStorage.getItem('show-disabled');
    if (showDisabled) {
      setRequestParams(prevParams => ({
        ...prevParams,
        'show-disabled': showDisabled === 'true',
      }));
    }
  }, []);

  useEffect(() => {
    fetchPagedUsers();
  }, [fetchPagedUsers, requestParams]);

  const handlePageChange = useCallback((params?: UserPageRequestParams) => {
    if (params) {
      setRequestParams(params);
    }
  }, []);

  const handleToggleDisabled = () => {
    const newShowDisabled = !showDisabled;
    setShowDisabled(newShowDisabled);
    localStorage.setItem('show-disabled', String(newShowDisabled));
    const newRequestParams = {
      ...requestParams,
      'show-disabled': newShowDisabled,
    };
    setRequestParams(newRequestParams);
  };

  const handleOpenEditDialog = (user: User) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setSelectedUser(null);
    setOpenEditDialog(false);
    fetchPagedUsers();
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    fetchPagedUsers();
  };

  return (
    <Container maxWidth='xl'>
      <Typography variant='h2'>Manage Users</Typography>
      <Box className='actions-section'>
        <Box>
          <Button
            onClick={handleOpenAddDialog}
            color='primary'
            variant='contained'
            startIcon={<Add />}
            id='add-user-button'
          >
            Add user
          </Button>
        </Box>

        <Checkbox
          onClick={handleToggleDisabled}
          checked={showDisabled}
          color='primary'
          title='Show disabled users'
        />
      </Box>

      {!dataSource ? (
        <Typography variant='h6' mt={4}>
          No users found
        </Typography>
      ) : (
        <Box>
          <TableContainer className='table-wrapper'>
            <Table className='mat-elevation-z8'>
              <TableHead>
                <TableRow>
                  {tableHelper.baseColumnNames.map((column, i) => (
                    <TableCell key={column}>
                      {tableHelper.baseColumnTitles[i]}
                    </TableCell>
                  ))}
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataSource?.map((row: User) => (
                  <TableRow key={row.id}>
                    {tableHelper.baseColumnNames.map(column => (
                      <TableCell key={column}>
                        {String(
                          tableHelper.nestedPropertyAccessor(row, column),
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenEditDialog(row)}
                        color='primary'
                        className='edit-user-button'
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <PaginatorComponent
            onPageChange={handlePageChange}
            data={pageUserResponseData}
            requestParams={requestParams}
          />
          <EditUserComponent
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            user={selectedUser}
            key={selectedUser?.id}
          />
          <AddUserComponent
            open={openAddDialog}
            onClose={handleCloseAddDialog}
          />
        </Box>
      )}
    </Container>
  );
};

const ManageUsers = withAuth(ManageUsersPage, [
  UserRole.ADMIN,
  UserRole.DOCTOR,
  UserRole.REGISTRAR,
]);

export default ManageUsers;
