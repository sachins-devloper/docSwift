import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { theme } from '../../../../config/theme';
import { useConversionStore } from '../../../../store/conversion.store';

export const ConversionToolScreen = ({ navigation }: any) => {
  const {
    activeType,
    selectedFile,
    ocrEnabled,
    retainTables,
    setOcrEnabled,
    setRetainTables,
    setCurrentJob,
  } = useConversionStore();

  const handleStart = () => {
    if (!selectedFile) return;
    const newJob = {
      id: `job-${Date.now()}`,
      type: activeType,
      inputFileName: selectedFile.name,
      inputFileSize: selectedFile.size,
      inputFilePages: selectedFile.pages,
      status: 'PROCESSING' as any,
      progressPercent: 0,
      currentStageText: 'Initializing secure sandbox memory...',
      createdAt: 'Just Now',
      ocrEnabled,
      retainTables,
    };
    setCurrentJob(newJob);
    navigation.navigate('ConversionProgress');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Document Converter</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.toolHero}>
          <View style={styles.iconCircle}>
            <Text style={styles.toolHeroIcon}>⇄</Text>
          </View>
          <Text style={styles.toolTitle}>Convert {activeType.toUpperCase()}</Text>
          <Text style={styles.toolDesc}>
            Transform your file into a clean, editable format with high accuracy.
          </Text>
        </View>

        {selectedFile && (
          <View style={styles.fileCard}>
            <View style={styles.fileRow}>
              <View style={styles.fileIconBox}>
                <Text style={styles.fileIcon}>📄</Text>
              </View>
              <View style={styles.fileMeta}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {selectedFile.name}
                </Text>
                <Text style={styles.fileSub}>
                  {selectedFile.size} · {selectedFile.pages} Pages · <Text style={{ color: theme.colors.primary }}>Ready</Text>
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.configCard}>
          <Text style={styles.configTitle}>Configuration</Text>

          <View style={styles.switchRow}>
            <View style={styles.switchMeta}>
              <Text style={styles.switchTitle}>Extract Text with OCR</Text>
              <Text style={styles.switchSub}>Best for scanned pages & images</Text>
            </View>
            <Switch
              value={ocrEnabled}
              onValueChange={setOcrEnabled}
              trackColor={{ false: '#cbd5e1', true: theme.colors.primary }}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchMeta}>
              <Text style={styles.switchTitle}>Retain Complex Tables</Text>
              <Text style={styles.switchSub}>Converts grid boxes into native editable tables</Text>
            </View>
            <Switch
              value={retainTables}
              onValueChange={setRetainTables}
              trackColor={{ false: '#cbd5e1', true: theme.colors.primary }}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.convertBtn} activeOpacity={0.8} onPress={handleStart}>
          <Text style={styles.convertBtnIcon}>⚡</Text>
          <Text style={styles.convertBtnText}>Convert File Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceContainerHigh,
  },
  backBtn: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    fontSize: 22,
    color: theme.colors.onSurface,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  toolHero: {
    alignItems: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolHeroIcon: {
    fontSize: 26,
    color: theme.colors.primary,
  },
  toolTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.onSurface,
  },
  toolDesc: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  fileCard: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: theme.colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIcon: {
    fontSize: 22,
  },
  fileMeta: {
    flex: 1,
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
  configCard: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 12,
  },
  configTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 12,
  },
  switchMeta: {
    flex: 1,
    paddingRight: 10,
  },
  switchTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  switchSub: {
    fontSize: 10,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  convertBtn: {
    height: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  convertBtnIcon: {
    color: '#fff',
    fontSize: 18,
  },
  convertBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
