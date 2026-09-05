import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  StatusBar,
} from 'react-native';
import { Colors } from '../../../../shared/theme/colors';
import { useConversionStore } from '../store/useConversionStore';

interface ConvertScreenProps {
  navigation: any;
}

export const ConvertScreen: React.FC<ConvertScreenProps> = ({ navigation }) => {
  const {
    activeTool,
    selectedFile,
    ocrEnabled,
    retainTables,
    setOcrEnabled,
    setRetainTables,
    startJob,
  } = useConversionStore();

  const handleStartConversion = () => {
    startJob();
    navigation.navigate('Progress');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />
      
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Document Converter</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Tool Hero Header */}
        <View style={styles.toolHero}>
          <View style={styles.iconCircle}>
            <Text style={styles.toolHeroIcon}>⇄</Text>
          </View>
          <Text style={styles.toolTitle}>Convert {activeTool.replace('-', ' ').toUpperCase()}</Text>
          <Text style={styles.toolDesc}>
            Transform your file into a clean, editable format with high accuracy and preserved formatting.
          </Text>
        </View>

        {/* Selected File Card */}
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
                {selectedFile.size} · {selectedFile.pages} Pages · <Text style={{ color: Colors.primary }}>Ready</Text>
              </Text>
            </View>
          </View>
          <View style={styles.integrityBar}>
            <Text style={styles.integrityText}>✓ Integrity verified (v1.7)</Text>
          </View>
        </View>

        {/* Configuration Section */}
        <View style={styles.configCard}>
          <Text style={styles.configTitle}>Configuration</Text>
          
          {/* Format Selector */}
          <Text style={styles.label}>Output Format</Text>
          <View style={styles.formatRow}>
            <View style={styles.formatChipActive}>
              <Text style={styles.formatChipActiveText}>
                {activeTool.includes('word') ? '.docx (Modern Word)' : '.pdf (Standard)'}
              </Text>
            </View>
          </View>

          {/* Switches */}
          <View style={styles.switchRow}>
            <View style={styles.switchMeta}>
              <Text style={styles.switchTitle}>Extract Text with OCR</Text>
              <Text style={styles.switchSub}>Best for scanned pages & images</Text>
            </View>
            <Switch
              value={ocrEnabled}
              onValueChange={setOcrEnabled}
              trackColor={{ false: '#cbd5e1', true: Colors.primary }}
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
              trackColor={{ false: '#cbd5e1', true: Colors.primary }}
            />
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.convertBtn}
          activeOpacity={0.8}
          onPress={handleStartConversion}
        >
          <Text style={styles.convertBtnIcon}>⚡</Text>
          <Text style={styles.convertBtnText}>Convert File Now</Text>
        </TouchableOpacity>

        {/* Security Banner */}
        <View style={styles.securityBanner}>
          <Text style={styles.securityBannerIcon}>🔒</Text>
          <View style={styles.securityBannerMeta}>
            <Text style={styles.securityBannerTitle}>End-to-End Encrypted (TLS 1.3)</Text>
            <Text style={styles.securityBannerDesc}>
              Processed in volatile sandbox memory and strictly destroyed after download.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerHigh,
  },
  backBtn: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    fontSize: 22,
    color: Colors.onSurface,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  toolHero: {
    alignItems: 'center',
    textAlign: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  toolHeroIcon: {
    fontSize: 26,
    color: Colors.primary,
  },
  toolTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  toolDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  fileCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
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
    backgroundColor: Colors.surfaceContainer,
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
    color: Colors.onSurface,
  },
  fileSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  integrityBar: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 8,
    borderRadius: 8,
  },
  integrityText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  configCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  configTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
    textTransform: 'uppercase',
  },
  formatRow: {
    flexDirection: 'row',
    gap: 8,
  },
  formatChipActive: {
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  formatChipActiveText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onPrimary,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLow,
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
    color: Colors.onSurface,
  },
  switchSub: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  convertBtn: {
    height: 48,
    backgroundColor: Colors.primary,
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
  securityBanner: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 12,
    gap: 10,
    alignItems: 'center',
  },
  securityBannerIcon: {
    fontSize: 20,
  },
  securityBannerMeta: {
    flex: 1,
  },
  securityBannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  securityBannerDesc: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 14,
  },
});
