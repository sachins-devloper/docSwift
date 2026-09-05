import React from 'react';
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
import { Colors } from '../../../../shared/theme/colors';
import { useConversionStore } from '../store/useConversionStore';

interface CompleteScreenProps {
  navigation: any;
}

export const CompleteScreen: React.FC<CompleteScreenProps> = ({ navigation }) => {
  const { currentJob } = useConversionStore();

  const handleDownload = () => {
    Alert.alert(
      'Download Started',
      `Downloading ${currentJob?.outputFileName || 'Converted_File.docx'} to device downloads.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Icon Badge */}
        <View style={styles.heroBadgeGroup}>
          <View style={styles.successCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.completeTitle}>Conversion Complete!</Text>
          <Text style={styles.completeSub}>Your converted document is ready to download.</Text>
        </View>

        {/* Output File Card */}
        <View style={styles.outputCard}>
          <View style={styles.fileIconBox}>
            <Text style={styles.fileIcon}>📄</Text>
            <Text style={styles.extTag}>DOCX</Text>
          </View>
          <View style={styles.fileMeta}>
            <Text style={styles.fileName} numberOfLines={1}>
              {currentJob?.outputFileName || 'Document_Converted.docx'}
            </Text>
            <Text style={styles.fileSub}>
              Word Document · {currentJob?.outputFileSize || '3.1 MB'}
            </Text>
          </View>
        </View>

        {/* Inspection Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Inspection Preview</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Pages Reconstructed</Text>
            <Text style={styles.statVal}>{currentJob?.inputFilePages || 14}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Word Count</Text>
            <Text style={styles.statVal}>{(currentJob?.inputFilePages || 14) * 245}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Tables Preserved</Text>
            <Text style={[styles.statVal, { color: Colors.primary }]}>
              {Math.floor((currentJob?.inputFilePages || 14) * 0.8)}
            </Text>
          </View>
        </View>

        {/* Primary Download Button */}
        <TouchableOpacity
          style={styles.downloadBtn}
          activeOpacity={0.8}
          onPress={handleDownload}
        >
          <Text style={styles.downloadIcon}>⬇</Text>
          <Text style={styles.downloadText}>Download Converted File</Text>
        </TouchableOpacity>

        {/* Convert Another Button */}
        <TouchableOpacity
          style={styles.anotherBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.anotherText}>Convert Another Document</Text>
        </TouchableOpacity>

        {/* Retention Banner */}
        <View style={styles.retentionBanner}>
          <Text style={styles.retentionText}>
            ⏳ Auto-wiped in <Text style={{ fontWeight: '700' }}>23h 59m</Text>
          </Text>
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
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  heroBadgeGroup: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  checkMark: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  completeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  completeSub: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  outputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  fileIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: Colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIcon: {
    fontSize: 18,
  },
  extTag: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: -2,
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
  statsCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  statsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 8,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.onSurface,
  },
  statVal: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  downloadBtn: {
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  downloadIcon: {
    color: '#fff',
    fontSize: 18,
  },
  downloadText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  anotherBtn: {
    height: 46,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anotherText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  retentionBanner: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  retentionText: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
});
