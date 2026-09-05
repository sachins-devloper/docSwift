import { ConversionJob } from '../entities/ConversionJob';

export interface ConversionRepository {
  executeJob(job: ConversionJob): Promise<ConversionJob>;
  getJobStatus(jobId: string): Promise<ConversionJob>;
  cancelJob(jobId: string): Promise<boolean>;
}
