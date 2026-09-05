import { NativeModules, Platform } from 'react-native';

const { DocFlowNativeModule } = NativeModules;

export interface ScanResult {
  imagePath: string;
  detectedEdges: { x: number; y: number }[];
  extractedText?: string;
}

export class NativeBridgeService {
  /**
   * Performs OpenCV edge detection and perspective transform on device
   */
  static async processScanImage(
    imagePath: string,
    filterType: string
  ): Promise<ScanResult> {
    if (Platform.OS === 'android' && DocFlowNativeModule) {
      return await DocFlowNativeModule.processScanImage(imagePath, filterType);
    }
    // Fallback for JS mock
    return {
      imagePath,
      detectedEdges: [
        { x: 10, y: 10 },
        { x: 300, y: 10 },
        { x: 300, y: 400 },
        { x: 10, y: 400 },
      ],
      extractedText: 'Sample extracted text via ML Kit OCR',
    };
  }

  /**
   * Runs Google ML Kit Text Recognition 100% offline
   */
  static async runMlKitOcr(imagePath: string): Promise<string> {
    if (Platform.OS === 'android' && DocFlowNativeModule) {
      return await DocFlowNativeModule.runMlKitOcr(imagePath);
    }
    return 'Extracted OCR text layer via Google ML Kit Text Recognition';
  }

  /**
   * Executes Apache PDFBox Merge operation on-device
   */
  static async mergePdfs(pdfPaths: string[], outputPath: string): Promise<boolean> {
    if (Platform.OS === 'android' && DocFlowNativeModule) {
      return await DocFlowNativeModule.mergePdfs(pdfPaths, outputPath);
    }
    return true;
  }

  /**
   * Executes Chaquopy Python pdf2docx converter on-device
   */
  static async convertPdfToDocx(
    pdfPath: string,
    outputPath: string
  ): Promise<boolean> {
    if (Platform.OS === 'android' && DocFlowNativeModule) {
      return await DocFlowNativeModule.convertPdfToDocx(pdfPath, outputPath);
    }
    return true;
  }
}
