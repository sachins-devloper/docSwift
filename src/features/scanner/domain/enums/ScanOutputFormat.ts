export enum ScanOutputFormat {
  PDF = 'PDF',
  DOCX = 'DOCX',
  JPG = 'JPG',
  PNG = 'PNG',
  TXT = 'TXT',
}

export interface FormatOption {
  format: ScanOutputFormat;
  label: string;
  extension: string;
  description: string;
  icon: string;
}

export const SCAN_OUTPUT_FORMATS: FormatOption[] = [
  {
    format: ScanOutputFormat.PDF,
    label: 'PDF Document',
    extension: '.pdf',
    description: 'Multi-page standard vector PDF',
    icon: '📕',
  },
  {
    format: ScanOutputFormat.DOCX,
    label: 'Word Document',
    extension: '.docx',
    description: 'Editable Microsoft Word text document',
    icon: '📘',
  },
  {
    format: ScanOutputFormat.JPG,
    label: 'JPEG Image',
    extension: '.jpg',
    description: 'High compression photo image',
    icon: '🖼️',
  },
  {
    format: ScanOutputFormat.PNG,
    label: 'PNG Image',
    extension: '.png',
    description: 'Lossless crisp graphic image',
    icon: '🎨',
  },
  {
    format: ScanOutputFormat.TXT,
    label: 'Text File (OCR)',
    extension: '.txt',
    description: 'Extracted plain text file via OCR',
    icon: '📝',
  },
];
