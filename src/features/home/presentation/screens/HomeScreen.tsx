import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../../../config/theme';
import { useConversionStore } from '../../../../store/conversion.store';
import { ConversionType } from '../../../conversion/domain/enums/ConversionType';
import { ToolCard } from '../components/ToolCard';
import { QuickActionCard } from '../components/QuickActionCard';
import { RecentFileCard } from '../components/RecentFileCard';

export const HomeScreen = ({ navigation }: any) => {
  const { setActiveType, historyJobs } = useConversionStore();

  const handleToolPress = (type: ConversionType) => {
    setActiveType(type);
    navigation.navigate('ConversionTool');
  };

  const handleScanPress = () => {
    navigation.navigate('ScanCamera');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />

      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoIcon}>⇄</Text>
          </View>
          <View>
            <Text style={styles.brandSub}>DOCFLOW</Text>
            <Text style={styles.brandTitle}>Home Tools</Text>
          </View>
        </View>

        {/* Scan Shortcut Button in Header */}
        <TouchableOpacity style={styles.scanHeaderBtn} onPress={handleScanPress}>
          <Text style={styles.scanHeaderIcon}>📷</Text>
          <Text style={styles.scanHeaderText}>Scan Document</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <QuickActionCard onChooseDocument={() => handleToolPress(ConversionType.PDF_TO_WORD)} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Primary Tools & Scanner</Text>
          <Text style={styles.sectionSub}>7 Services</Text>
        </View>

        <View style={styles.grid}>
          {/* Document Scanner Tool */}
          <ToolCard
            title="Scan Document"
            description="Camera scan with filters & multi-format export"
            icon="📷"
            isPopular
            onPress={handleScanPress}
          />

          <ToolCard
            title="PDF to Word"
            description="Editable DOCX with preserved layout"
            icon="⇄"
            onPress={() => handleToolPress(ConversionType.PDF_TO_WORD)}
          />

          <ToolCard
            title="Word to PDF"
            description="Universal vector document rendering"
            icon="📄"
            onPress={() => handleToolPress(ConversionType.WORD_TO_PDF)}
          />

          <ToolCard
            title="Merge PDF"
            description="Combine multiple files into one PDF"
            icon="⑂"
            onPress={() => handleToolPress(ConversionType.MERGE_PDF)}
          />

          <ToolCard
            title="Split PDF"
            description="Extract specific page ranges"
            icon="✂"
            onPress={() => handleToolPress(ConversionType.SPLIT_PDF)}
          />

          <ToolCard
            title="Images to PDF"
            description="Batch convert JPG/PNG scans"
            icon="🖼"
            onPress={() => handleToolPress(ConversionType.IMAGES_TO_PDF)}
          />

          <ToolCard
            title="Compress PDF"
            description="Shrink file size up to 80%"
            icon="🗜"
            onPress={() => handleToolPress(ConversionType.COMPRESS_PDF)}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Files</Text>
        </View>

        {historyJobs.map((item) => (
          <RecentFileCard
            key={item.id}
            fileName={item.outputFileName || item.inputFileName}
            fileInfo={`${item.outputFormat || 'PDF'} · ${item.outputFileSize || item.inputFileSize}`}
            status="Done"
          />
        ))}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceContainerHigh,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandSub: {
    fontSize: 10,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  brandTitle: {
    fontSize: 16,
    color: theme.colors.onSurface,
    fontWeight: '700',
  },
  scanHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scanHeaderIcon: {
    fontSize: 14,
  },
  scanHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  sectionSub: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
