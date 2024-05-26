import React, { ReactNode, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

interface DialogOptions {
  title: string;
  width?: string;
  height?: string;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface DialogProps {
  component: ReactNode;
  props: any;
  options: DialogOptions;
}

export const useFormDialog = () => {
  const [open, setOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogProps | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const openDialog = (props: DialogProps) => {
    setDialogProps(props);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setDialogProps(null);
  };

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const DialogComponent = () => (
    <Dialog
      open={open}
      onClose={() => closeDialog()}
      maxWidth={dialogProps?.options.maxWidth || 'md'}
      fullWidth={dialogProps?.options.fullWidth || true}
      PaperProps={{
        style: {
          width: dialogProps?.options.width,
          height: dialogProps?.options.height,
        },
      }}
    >
      {dialogProps && (
        <>
          <DialogTitle>{dialogProps.options.title}</DialogTitle>
          <DialogContent>
            {React.cloneElement(dialogProps.component as React.ReactElement, {
              formRef,
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeDialog()}>Cancel</Button>
            <Button type='button' onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );

  return { openDialog, closeDialog, DialogComponent };
};
