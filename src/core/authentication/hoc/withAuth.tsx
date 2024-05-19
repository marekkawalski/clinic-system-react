import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PathConstants } from '../../constants/path.constants.ts';
import { UserRole } from '../../enums/UserRole.ts';

interface WithAuthProps {
  expectedRoles?: UserRole[];
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  expectedRoles?: UserRole[],
): React.FC<P & WithAuthProps> => {
  const AuthWrapper: React.FC<P & WithAuthProps> = props => {
    const { authData, checkAccess } = useAuth();

    if (!authData) {
      // User is not authenticated
      return <Navigate to={PathConstants.LOGIN_PATH} replace />;
    }

    if (expectedRoles && !checkAccess(expectedRoles)) {
      // User is authenticated but does not have the required role
      return <Navigate to={PathConstants.LOGIN_PATH} replace />;
    }

    // User is authenticated and has the required role
    return <WrappedComponent {...props} />;
  };

  AuthWrapper.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthWrapper;
};

export default withAuth;
