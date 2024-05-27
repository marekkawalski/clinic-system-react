import { PageRequestParams } from './PageRequestParams.ts';
import { AppointmentStatus } from '@/core/enums/AppointmentStatus.ts';

export interface AppointmentPageRequestParams extends PageRequestParams {
  ['status']?: AppointmentStatus;
  ['start-date']?: string;
  ['end-date']?: string;
}
