import { SnackbarSeverity } from './SnackbarSeverity.ts';

export interface SnackbarContextProps {
  showSnackbar: (message: string, severity: SnackbarSeverity) => void;
}
