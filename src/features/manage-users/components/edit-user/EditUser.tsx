import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { User } from '@/core/models/user/User.ts';
import { FormType } from '@/shared/enums/FormType.ts';
import UserForm from '@/shared/components/user-form/UserForm';

interface EditUserComponentProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const EditUserComponent: React.FC<EditUserComponentProps> = ({
  open,
  onClose,
  user,
}) => {
  if (!user) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='lg'
      fullWidth
      id='edit-user-popup'
    >
      <DialogContent sx={{ padding: 0, margin: 0 }}>
        <UserForm
          key={user.id}
          userId={user.id}
          action='Edit User'
          formType={FormType.PopupForm}
          onClose={onClose}
        >
          <DialogActions>
            <Button onClick={onClose} color='primary'>
              Cancel
            </Button>
            <Button
              type='submit'
              form='userForm'
              color='primary'
              id='submit-button'
            >
              Save
            </Button>
          </DialogActions>
        </UserForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserComponent;
