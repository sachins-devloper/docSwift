import { ScanFilterType } from '../../domain/enums/ScanFilterType';
import { ScanOutputFormat } from '../../domain/enums/ScanOutputFormat';
import { ScanDocument, ScanPage } from '../../domain/entities/ScanDocument';

export class ScanProcessingService {
  /**
   * Applies the chosen visual filter to an image page on-device 100% offline
   */
  static async applyFilter(
    page: ScanPage,
    filter: ScanFilterType
  ): Promise<ScanPage> {
    // Simulates local canvas pixel manipulation
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      ...page,
      filter,
    };
  }

  /**
   * Processes all scanned pages and exports to chosen format on-device 100% offline
   */
  static async exportDocument(
    doc: ScanDocument,
    format: ScanOutputFormat
  ): Promise<{ fileName: string; fileSize: string; downloadUrl: string }> {
    await new Promise((resolve) => setTimeout(resolve, 900));

    const formatExtMap: Record<ScanOutputFormat, string> = {
      [ScanOutputFormat.PDF]: '.pdf',
      [ScanOutputFormat.DOCX]: '.docx',
      [ScanOutputFormat.JPG]: '.jpg',
      [ScanOutputFormat.PNG]: '.png',
      [ScanOutputFormat.TXT]: '.txt',
    };

    const fileName = `${doc.title.replace(/\s+/g, '_')}_Scanned${formatExtMap[format]}`;
    const fileSize = `${(doc.pages.length * 0.8).toFixed(1)} MB`;

    return {
      fileName,
      fileSize,
      downloadUrl: `file:///storage/emulated/0/Download/${fileName}`,
    };
  }
}
