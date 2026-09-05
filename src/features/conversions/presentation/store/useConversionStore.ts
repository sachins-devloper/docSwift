import { create } from 'zustand';
import { ConversionJob, ToolType } from '../../domain/entities/ConversionJob';

interface ConversionState {
  activeTool: ToolType;
  selectedFile: {
    name: string;
    size: string;
    pages: number;
    uri?: string;
  };
  ocrEnabled: boolean;
  retainTables: boolean;
  currentJob: ConversionJob | null;
  historyJobs: ConversionJob[];

  // Actions
  setActiveTool: (tool: ToolType) => void;
  setSelectedFile: (file: { name: string; size: string; pages: number; uri?: string }) => void;
  setOcrEnabled: (enabled: boolean) => void;
  setRetainTables: (enabled: boolean) => void;
  startJob: () => void;
  updateJobProgress: (progress: number, stageText: string) => void;
  completeJob: (outputName: string, outputSize: string) => void;
  clearHistory: () => void;
}

export const useConversionStore = create<ConversionState>((set, get) => ({
  activeTool: 'pdf-to-word',
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
      id: 'job-101',
      toolType: 'pdf-to-word',
      inputFileName: 'Quarterly_Report_2024.pdf',
      inputFileSize: '4.2 MB',
      inputFilePages: 18,
      outputFileName: 'Quarterly_Report_2024.docx',
      outputFileSize: '3.4 MB',
      status: 'COMPLETED',
      progressPercent: 100,
      currentStageText: 'Conversion completed',
      createdAt: '10:24 AM',
      ocrEnabled: true,
      retainTables: true,
      outputFormat: 'DOCX',
    },
    {
      id: 'job-102',
      toolType: 'word-to-pdf',
      inputFileName: 'Contract_Signed_v2.docx',
      inputFileSize: '1.8 MB',
      inputFilePages: 6,
      outputFileName: 'Contract_Signed_v2.pdf',
      outputFileSize: '1.5 MB',
      status: 'COMPLETED',
      progressPercent: 100,
      currentStageText: 'Conversion completed',
      createdAt: '09:15 AM',
      ocrEnabled: false,
      retainTables: true,
      outputFormat: 'PDF',
    },
  ],

  setActiveTool: (tool) => set({ activeTool: tool }),
  setSelectedFile: (file) => set({ selectedFile: file }),
  setOcrEnabled: (enabled) => set({ ocrEnabled: enabled }),
  setRetainTables: (enabled) => set({ retainTables: enabled }),

  startJob: () => {
    const { activeTool, selectedFile, ocrEnabled, retainTables } = get();
    const newJob: ConversionJob = {
      id: `job-${Date.now()}`,
      toolType: activeTool,
      inputFileName: selectedFile.name,
      inputFileSize: selectedFile.size,
      inputFilePages: selectedFile.pages,
      status: 'PROCESSING',
      progressPercent: 0,
      currentStageText: 'Initializing secure sandbox memory...',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ocrEnabled,
      retainTables,
      outputFormat: activeTool.includes('word') ? 'DOCX' : 'PDF',
    };
    set({ currentJob: newJob });
  },

  updateJobProgress: (progress, stageText) => {
    const { currentJob } = get();
    if (!currentJob) return;
    set({
      currentJob: {
        ...currentJob,
        progressPercent: progress,
        currentStageText: stageText,
        status: progress >= 100 ? 'COMPLETED' : 'PROCESSING',
      },
    });
  },

  completeJob: (outputName, outputSize) => {
    const { currentJob, historyJobs } = get();
    if (!currentJob) return;

    const completed: ConversionJob = {
      ...currentJob,
      outputFileName: outputName,
      outputFileSize: outputSize,
      status: 'COMPLETED',
      progressPercent: 100,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set({
      currentJob: completed,
      historyJobs: [completed, ...historyJobs],
    });
  },

  clearHistory: () => set({ historyJobs: [] }),
}));
