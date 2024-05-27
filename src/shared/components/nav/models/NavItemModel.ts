import { UserRole } from '@/core/enums/UserRole.ts';

export interface NavItemModel {
  listItemText: string;
  listItemPath: string;
  allowedRoles?: UserRole[];
  requireLogin?: boolean;
}
