import React, { ComponentType, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../../enums/UserRole.ts';
import { useSnackbar } from '../../../shared/snackbar/hooks/useSnackBar.tsx';
import { PathConstants } from '../../constants/path.constants.ts';

interface WithAuthProps {
  expectedRoles?: UserRole[];
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  expectedRoles?: UserRole[],
): React.FC<P & WithAuthProps> => {
  const AuthWrapper: React.FC<P & WithAuthProps> = props => {
    const { authData, checkAccess } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [redirectPath, setRedirectPath] = useState<string | null>(null);

    useEffect(() => {
      if (!authData) {
        showSnackbar('You must login to enter this route!', 'error');
        setRedirectPath(PathConstants.LOGIN_PATH);
      } else if (expectedRoles && !checkAccess(expectedRoles)) {
        showSnackbar(
          'You do not have permission to enter this route!',
          'error',
        );
        setRedirectPath(PathConstants.LOGIN_PATH);
      }
    }, [authData, checkAccess, showSnackbar]);

    if (redirectPath) {
      return <Navigate to={redirectPath} replace />;
    }

    return <WrappedComponent {...props} />;
  };

  AuthWrapper.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthWrapper;
};

export default withAuth;
