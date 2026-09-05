export enum ScanFilterType {
  ORIGINAL = 'ORIGINAL',
  MAGIC_COLOR = 'MAGIC_COLOR',
  GRAYSCALE = 'GRAYSCALE',
  BLACK_WHITE = 'BLACK_WHITE',
  WARM = 'WARM',
}

export interface FilterOption {
  type: ScanFilterType;
  label: string;
  icon: string;
  description: string;
}

export const SCAN_FILTERS: FilterOption[] = [
  {
    type: ScanFilterType.ORIGINAL,
    label: 'Original',
    icon: '📷',
    description: 'Full original photo colors',
  },
  {
    type: ScanFilterType.MAGIC_COLOR,
    label: 'Magic Color',
    icon: '✨',
    description: 'Vivid contrast & text clarity boost',
  },
  {
    type: ScanFilterType.GRAYSCALE,
    label: 'Grayscale',
    icon: '🌓',
    description: 'Smooth monochrome tone for reading',
  },
  {
    type: ScanFilterType.BLACK_WHITE,
    label: 'B&W Scan',
    icon: '📄',
    description: 'Sharp binary document scanner filter',
  },
  {
    type: ScanFilterType.WARM,
    label: 'Warm Tone',
    icon: '🔆',
    description: 'Soft eye-friendly lighting contrast',
  },
];
