import { AuthData } from '@/core/models/AuthData.ts';
import { User } from '@/core/models/user/User.ts';
import { UserRole } from '@/core/enums/UserRole.ts';

export interface AuthContextProps {
  authData: AuthData | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  checkAccess: (allowedRoles: UserRole[]) => boolean;
}
