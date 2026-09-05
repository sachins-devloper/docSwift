import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors } from '../../../../shared/theme/colors';
import { useConversionStore } from '../store/useConversionStore';

interface ProgressScreenProps {
  navigation: any;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ navigation }) => {
  const { currentJob, updateJobProgress, completeJob } = useConversionStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stages = [
      { percent: 25, text: 'Preparing payload & memory buffer...' },
      { percent: 50, text: 'Extracting text geometry & OCR scanning...' },
      { percent: 75, text: 'Reconstructing layout tree & native tables...' },
      { percent: 95, text: 'Packaging output archive...' },
      { percent: 100, text: 'Finalizing encryption handshake...' },
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 5;
        if (next >= stages[currentIdx]?.percent && currentIdx < stages.length - 1) {
          currentIdx++;
          updateJobProgress(next, stages[currentIdx].text);
        }

        if (next >= 100) {
          clearInterval(interval);
          completeJob(
            currentJob?.inputFileName.replace(/\.[^/.]+$/, '') + '_Converted.docx',
            '3.1 MB'
          );
          setTimeout(() => {
            navigation.replace('Complete');
          }, 400);
          return 100;
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />

      <View style={styles.content}>
        {/* Security Pill */}
        <View style={styles.securityPill}>
          <Text style={styles.securityText}>🔒 Direct Local Pipeline • TLS 1.3 Active</Text>
        </View>

        {/* Transformation Card */}
        <View style={styles.heroCard}>
          <View style={styles.fileIconBox}>
            <Text style={styles.fileIcon}>📄</Text>
          </View>
          <View style={styles.fileMeta}>
            <Text style={styles.fileName} numberOfLines={1}>
              {currentJob?.inputFileName || 'Document.pdf'}
            </Text>
            <Text style={styles.fileSub}>
              {currentJob?.inputFileSize || '3.8 MB'} · Processing in sandbox
            </Text>
          </View>
        </View>

        {/* Progress Display */}
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.stageTitle}>STAGE PROGRESS</Text>
              <Text style={styles.stageText}>
                {currentJob?.currentStageText || 'Initializing engine...'}
              </Text>
            </View>
            <Text style={styles.percentText}>{progress}%</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>

          {/* Metrics Grid */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Pages</Text>
              <Text style={styles.metricVal}>
                {Math.floor((progress / 100) * (currentJob?.inputFilePages || 14))} / {currentJob?.inputFilePages || 14}
              </Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Speed</Text>
              <Text style={styles.metricVal}>2.4 MB/s</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>ETA</Text>
              <Text style={styles.metricVal}>~ {Math.max(0, Math.ceil((100 - progress) / 20))}s</Text>
            </View>
          </View>
        </View>

        {/* Cancel Button */}
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.cancelText}>Cancel Conversion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    padding: 16,
    gap: 16,
    justifyContent: 'center',
    flex: 1,
  },
  securityPill: {
    alignSelf: 'center',
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  securityText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.onSecondaryContainer,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  fileIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIcon: {
    fontSize: 24,
  },
  fileMeta: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  fileSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  stageText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
    marginTop: 2,
  },
  percentText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  metricBox: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  metricVal: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
    marginTop: 2,
  },
  cancelBtn: {
    height: 44,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: Colors.error,
    fontSize: 13,
    fontWeight: '700',
  },
});
