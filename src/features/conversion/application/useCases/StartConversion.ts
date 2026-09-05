import { ConversionJob } from '../../domain/entities/ConversionJob';
import { ConversionStatus } from '../../domain/enums/ConversionStatus';
import { NativeBridgeService } from '../../../../shared/services/nativeBridge.service';

export class StartConversion {
  static async execute(job: ConversionJob): Promise<ConversionJob> {
    const updatedJob = {
      ...job,
      status: ConversionStatus.PROCESSING,
      progressPercent: 10,
      currentStageText: 'Starting native engine execution...',
    };

    if (job.type === 'merge-pdf') {
      await NativeBridgeService.mergePdfs([job.inputFileName], 'Merged.pdf');
    } else if (job.type === 'pdf-to-word') {
      await NativeBridgeService.convertPdfToDocx(job.inputFileName, 'Converted.docx');
    }

    return {
      ...updatedJob,
      status: ConversionStatus.COMPLETED,
      progressPercent: 100,
      currentStageText: 'Conversion complete',
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }
}
