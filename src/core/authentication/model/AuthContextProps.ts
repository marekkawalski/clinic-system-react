import { AuthData } from '../../models/AuthData.ts';
import { User } from '../../models/user/User.ts';
import { UserRole } from '../../enums/UserRole.ts';

export interface AuthContextProps {
  authData: AuthData | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  checkAccess: (allowedRoles: UserRole[]) => boolean;
}
