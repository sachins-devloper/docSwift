export type JobStatus = 
  | 'PENDING' 
  | 'UPLOADING' 
  | 'QUEUED' 
  | 'PROCESSING' 
  | 'COMPLETED' 
  | 'FAILED' 
  | 'EXPIRED';

export type ToolType = 
  | 'pdf-to-word' 
  | 'word-to-pdf' 
  | 'merge-pdf' 
  | 'split-pdf' 
  | 'images-to-pdf' 
  | 'compress-pdf';

export interface ConversionJob {
  id: string;
  userId?: string;
  toolType: ToolType;
  inputFileName: string;
  inputFileSize: string;
  inputFilePages: number;
  outputFileName?: string;
  outputFileSize?: string;
  status: JobStatus;
  progressPercent: number;
  currentStageText: string;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  ocrEnabled: boolean;
  retainTables: boolean;
  outputFormat: string;
}
