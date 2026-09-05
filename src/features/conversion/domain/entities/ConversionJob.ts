import { ConversionType } from '../enums/ConversionType';
import { ConversionStatus } from '../enums/ConversionStatus';

export interface ConversionJob {
  id: string;
  userId?: string;
  type: ConversionType;
  inputFileName: string;
  inputFileSize: string;
  inputFilePages: number;
  outputFileName?: string;
  outputFileSize?: string;
  outputFormat?: string;
  status: ConversionStatus;
  progressPercent: number;
  currentStageText: string;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  ocrEnabled: boolean;
  retainTables: boolean;
}
