import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { FormType } from '@/shared/enums/FormType.ts';
import UserForm from '@/shared/components/user-form/UserForm';

interface AddUserComponentProps {
  open: boolean;
  onClose: () => void;
}

const AddUserComponent: React.FC<AddUserComponentProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='lg' fullWidth>
      <DialogContent sx={{ padding: 0, margin: 0 }}>
        <UserForm
          action='Add User'
          formType={FormType.PopupForm}
          onClose={onClose}
        >
          <DialogActions>
            <Button onClick={onClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' form='userForm' color='primary'>
              Save
            </Button>
          </DialogActions>
        </UserForm>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserComponent;
