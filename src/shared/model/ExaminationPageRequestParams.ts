import { PageRequestParams } from './PageRequestParams.ts';

export interface ExaminationPageRequestParams extends PageRequestParams {
  ['doctor-ids']?: string[];
}
