import { create } from 'zustand';
import { ConversionJob } from '../features/conversion/domain/entities/ConversionJob';
import { ConversionType } from '../features/conversion/domain/enums/ConversionType';

interface ConversionStoreState {
  activeType: ConversionType;
  selectedFile: {
    name: string;
    size: string;
    pages: number;
    uri?: string;
  } | null;
  ocrEnabled: boolean;
  retainTables: boolean;
  currentJob: ConversionJob | null;
  historyJobs: ConversionJob[];

  setActiveType: (type: ConversionType) => void;
  setSelectedFile: (file: { name: string; size: string; pages: number; uri?: string } | null) => void;
  setOcrEnabled: (enabled: boolean) => void;
  setRetainTables: (enabled: boolean) => void;
  setCurrentJob: (job: ConversionJob | null) => void;
  addHistoryJob: (job: ConversionJob) => void;
  clearHistory: () => void;
}

export const useConversionStore = create<ConversionStoreState>((set) => ({
  activeType: ConversionType.PDF_TO_WORD,
  selectedFile: {
    name: 'Product_Roadmap_Q3.pdf',
    size: '3.8 MB',
    pages: 14,
  },
  ocrEnabled: true,
  retainTables: true,
  currentJob: null,
  historyJobs: [
    {
      id: 'job-001',
      type: ConversionType.PDF_TO_WORD,
      inputFileName: 'Quarterly_Report_2024.pdf',
      inputFileSize: '4.2 MB',
      inputFilePages: 18,
      outputFileName: 'Quarterly_Report_2024.docx',
      outputFileSize: '3.4 MB',
      status: 'COMPLETED' as any,
      progressPercent: 100,
      currentStageText: 'Conversion completed',
      createdAt: '10:24 AM',
      ocrEnabled: true,
      retainTables: true,
    },
  ],

  setActiveType: (type) => set({ activeType: type }),
  setSelectedFile: (file) => set({ selectedFile: file }),
  setOcrEnabled: (enabled) => set({ ocrEnabled: enabled }),
  setRetainTables: (enabled) => set({ retainTables: enabled }),
  setCurrentJob: (job) => set({ currentJob: job }),
  addHistoryJob: (job) =>
    set((state) => ({ historyJobs: [job, ...state.historyJobs] })),
  clearHistory: () => set({ historyJobs: [] }),
}));
