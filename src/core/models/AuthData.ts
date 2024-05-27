import { User } from '@/core/models/user/User.ts';

export interface AuthData extends User {
  password: string;
}
