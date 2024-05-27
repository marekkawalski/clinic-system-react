import { PageRequestParams } from './PageRequestParams.ts';
import { UserRole } from '@/core/enums/UserRole.ts';

export interface UserPageRequestParams extends PageRequestParams {
  ['roles']?: UserRole[];
  ['show-disabled']?: boolean;
}
