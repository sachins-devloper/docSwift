import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { theme } from '../../../../config/theme';
import { useConversionStore } from '../../../../store/conversion.store';

export const ConversionProgressScreen = ({ navigation }: any) => {
  const { currentJob, setCurrentJob, addHistoryJob } = useConversionStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stages = [
      'Preparing payload & memory buffer...',
      'Extracting text geometry & OCR scanning...',
      'Reconstructing layout tree & native tables...',
      'Packaging output archive...',
      'Finalizing encryption handshake...',
    ];

    let stageIdx = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 6;
        if (next >= 20 * (stageIdx + 1) && stageIdx < stages.length - 1) {
          stageIdx++;
        }

        if (next >= 100) {
          clearInterval(interval);
          const completed = {
            ...(currentJob || {}),
            id: currentJob?.id || `job-${Date.now()}`,
            type: currentJob?.type || ('pdf-to-word' as any),
            inputFileName: currentJob?.inputFileName || 'Document.pdf',
            inputFileSize: currentJob?.inputFileSize || '3.8 MB',
            inputFilePages: currentJob?.inputFilePages || 14,
            outputFileName: (currentJob?.inputFileName || 'Document.pdf').replace(/\.[^/.]+$/, '') + '_Converted.docx',
            outputFileSize: '3.1 MB',
            status: 'COMPLETED' as any,
            progressPercent: 100,
            currentStageText: 'Conversion completed',
            createdAt: 'Just Now',
            ocrEnabled: true,
            retainTables: true,
          };
          setCurrentJob(completed);
          addHistoryJob(completed);

          setTimeout(() => {
            navigation.replace('ConversionSuccess');
          }, 300);
          return 100;
        }

        if (currentJob) {
          setCurrentJob({
            ...currentJob,
            progressPercent: next,
            currentStageText: stages[stageIdx],
          });
        }
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.securityPill}>
          <Text style={styles.securityText}>🔒 Direct Local Pipeline • TLS 1.3 Active</Text>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.fileIcon}>📄</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.fileName}>{currentJob?.inputFileName || 'Document.pdf'}</Text>
            <Text style={styles.fileSub}>{currentJob?.inputFileSize || '3.8 MB'} · Processing in sandbox</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.stageTitle}>STAGE PROGRESS</Text>
              <Text style={styles.stageText}>{currentJob?.currentStageText || 'Initializing...'}</Text>
            </View>
            <Text style={styles.percentText}>{progress}%</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.cancelText}>Cancel Conversion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: 16,
    gap: 16,
    justifyContent: 'center',
    flex: 1,
  },
  securityPill: {
    alignSelf: 'center',
    backgroundColor: theme.colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  securityText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.onSecondaryContainer,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainerLowest,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 12,
  },
  fileIcon: {
    fontSize: 24,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  fileSub: {
    fontSize: 11,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 14,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  stageTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.onSurfaceVariant,
  },
  stageText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginTop: 2,
  },
  percentText: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: theme.colors.surfaceContainerHigh,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  cancelBtn: {
    height: 44,
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: theme.colors.error,
    fontSize: 13,
    fontWeight: '700',
  },
});
