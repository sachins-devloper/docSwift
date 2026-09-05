import { ConversionJob } from '../../domain/entities/ConversionJob';
import { ConversionType } from '../../domain/enums/ConversionType';
import { CreateConversion } from '../useCases/CreateConversion';
import { StartConversion } from '../useCases/StartConversion';

export class ConversionService {
  static createJob(
    type: ConversionType,
    fileName: string,
    fileSize: string,
    pages: number
  ): ConversionJob {
    return CreateConversion.execute(type, fileName, fileSize, pages);
  }

  static async processJob(job: ConversionJob): Promise<ConversionJob> {
    return await StartConversion.execute(job);
  }
}
