import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { theme } from '../../../../config/theme';
import { SCAN_OUTPUT_FORMATS, ScanOutputFormat } from '../../domain/enums/ScanOutputFormat';
import { ScanProcessingService } from '../../application/services/ScanProcessingService';

interface ScanExportScreenProps {
  navigation: any;
  route: any;
}

export const ScanExportScreen: React.FC<ScanExportScreenProps> = ({
  navigation,
  route,
}) => {
  const pages = route.params?.pages || ['page_1.png'];
  const filter = route.params?.filter || 'MAGIC_COLOR';

  const [selectedFormat, setSelectedFormat] = useState<ScanOutputFormat>(
    ScanOutputFormat.PDF
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExport = async () => {
    setIsProcessing(true);
    const result = await ScanProcessingService.exportDocument(
      {
        id: `scan-${Date.now()}`,
        title: 'Document_Scan',
        pages: pages.map((p: string, idx: number) => ({
          id: `p-${idx}`,
          imageUri: p,
          filter,
          brightness: 1,
          contrast: 1,
          rotationAngle: 0,
        })),
        targetFormat: selectedFormat,
        createdAt: 'Just Now',
      },
      selectedFormat
    );
    setIsProcessing(false);

    Alert.alert(
      'Export Successful',
      `Exported scanned document as ${result.fileName} (${result.fileSize}) to device downloads.`,
      [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Export Format Options</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Document Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Document_Scan_2026</Text>
          <Text style={styles.summarySub}>
            {pages.length} Pages · Filter: {filter} · 100% Offline Sandbox
          </Text>
        </View>

        {/* Format Options List */}
        <Text style={styles.sectionTitle}>Choose Export File Format</Text>

        <View style={styles.formatList}>
          {SCAN_OUTPUT_FORMATS.map((item) => (
            <TouchableOpacity
              key={item.format}
              style={[
                styles.formatItem,
                selectedFormat === item.format && styles.formatItemActive,
              ]}
              onPress={() => setSelectedFormat(item.format)}
            >
              <Text style={styles.formatIcon}>{item.icon}</Text>
              <View style={styles.formatMeta}>
                <View style={styles.rowBetween}>
                  <Text style={styles.formatLabel}>{item.label}</Text>
                  <Text style={styles.extBadge}>{item.extension}</Text>
                </View>
                <Text style={styles.formatDesc}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Export Button */}
        <TouchableOpacity
          style={styles.exportBtn}
          activeOpacity={0.8}
          onPress={handleExport}
          disabled={isProcessing}
        >
          <Text style={styles.exportBtnIcon}>💾</Text>
          <Text style={styles.exportBtnText}>
            {isProcessing ? 'Processing Document...' : 'Save & Download File'}
          </Text>
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
  summaryCard: {
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  summarySub: {
    fontSize: 11,
    color: theme.colors.primaryFixed,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  formatList: {
    gap: 10,
  },
  formatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 12,
  },
  formatItemActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surfaceContainerLow,
  },
  formatIcon: {
    fontSize: 24,
  },
  formatMeta: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formatLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  extBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.primary,
    backgroundColor: theme.colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  formatDesc: {
    fontSize: 11,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  exportBtn: {
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  exportBtnIcon: {
    fontSize: 18,
    color: '#fff',
  },
  exportBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
