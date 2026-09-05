import { ConversionJob } from '../../domain/entities/ConversionJob';
import { ConversionType } from '../../domain/enums/ConversionType';
import { ConversionStatus } from '../../domain/enums/ConversionStatus';
import { NativeBridgeService } from '../../../../shared/services/nativeBridge.service';

export class ConversionRepositoryImpl {
  async executeJob(job: ConversionJob): Promise<ConversionJob> {
    switch (job.type) {
      case ConversionType.MERGE_PDF:
        await NativeBridgeService.mergePdfs(
          [job.inputFileName],
          job.outputFileName || 'Merged.pdf'
        );
        break;

      case ConversionType.PDF_TO_WORD:
        await NativeBridgeService.convertPdfToDocx(
          job.inputFileName,
          job.outputFileName || 'Converted.docx'
        );
        break;

      default:
        break;
    }

    return {
      ...job,
      status: ConversionStatus.COMPLETED,
      progressPercent: 100,
      currentStageText: 'Job completed via Native Android Engine',
    };
  }
}
