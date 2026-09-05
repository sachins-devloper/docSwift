import { ConversionJob } from '../../domain/entities/ConversionJob';
import { ConversionType } from '../../domain/enums/ConversionType';
import { ConversionStatus } from '../../domain/enums/ConversionStatus';

export class CreateConversion {
  static execute(
    type: ConversionType,
    fileName: string,
    fileSize: string,
    pages: number
  ): ConversionJob {
    return {
      id: `job-${Date.now()}`,
      type,
      inputFileName: fileName,
      inputFileSize: fileSize,
      inputFilePages: pages,
      status: ConversionStatus.PENDING,
      progressPercent: 0,
      currentStageText: 'Job created',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ocrEnabled: true,
      retainTables: true,
    };
  }
}
