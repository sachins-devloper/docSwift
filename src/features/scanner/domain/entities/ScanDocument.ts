import { ScanFilterType } from '../enums/ScanFilterType';
import { ScanOutputFormat } from '../enums/ScanOutputFormat';

export interface ScanPage {
  id: string;
  imageUri: string;
  filter: ScanFilterType;
  brightness: number;
  contrast: number;
  rotationAngle: number;
}

export interface ScanDocument {
  id: string;
  title: string;
  pages: ScanPage[];
  targetFormat: ScanOutputFormat;
  createdAt: string;
  fileSize?: string;
}
