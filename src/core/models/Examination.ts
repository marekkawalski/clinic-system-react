import { ExaminationStatus } from '@/core/enums/ExaminationStatus.ts';

export interface Examination {
  readonly id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  status: ExaminationStatus;
}
