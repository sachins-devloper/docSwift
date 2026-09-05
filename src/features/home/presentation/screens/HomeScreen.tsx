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
            <Text style={styles.logoIcon}>⚡</Text>
          </View>
          <View>
            <Text style={styles.brandSub}>DOCSWIFT</Text>
            <Text style={styles.brandTitle}>Document Suite</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.scanHeaderBtn} onPress={handleScanPress}>
          <Text style={styles.scanHeaderIcon}>📷</Text>
          <Text style={styles.scanHeaderText}>Quick Scan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <QuickActionCard onChooseDocument={() => handleToolPress(ConversionType.PDF_TO_WORD)} />

        {/* SECTION 1: SHORTCUTS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shortcuts</Text>
          <Text style={styles.sectionSub}>5 Tools</Text>
        </View>

        <View style={styles.grid}>
          <ToolCard
            title="ID Card"
            description="Front & back dual-side A4 scan"
            icon="🪪"
            isPopular
            onPress={handleScanPress}
          />
          <ToolCard
            title="Scan Docs"
            description="Camera scan with filters & PDF export"
            icon="📷"
            onPress={handleScanPress}
          />
          <ToolCard
            title="Book"
            description="Dual-page book scan & auto split"
            icon="📖"
            onPress={handleScanPress}
          />
          <ToolCard
            title="QR Code"
            description="Offline QR reader & code generator"
            icon="🔳"
            onPress={() => handleToolPress(ConversionType.QR_CODE)}
          />
          <ToolCard
            title="To Text"
            description="Extract text from scan using offline OCR"
            icon="🔤"
            onPress={() => handleToolPress(ConversionType.TO_TEXT)}
          />
        </View>

        {/* SECTION 2: PROCESS FILES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Process Files</Text>
          <Text style={styles.sectionSub}>5 Tools</Text>
        </View>

        <View style={styles.grid}>
          <ToolCard
            title="Import Files"
            description="Batch import files from storage/gallery"
            icon="📥"
            onPress={() => handleToolPress(ConversionType.IMPORT_FILES)}
          />
          <ToolCard
            title="Collage Images"
            description="Stitch multiple scans onto 1 page grid"
            icon="🖼"
            onPress={() => handleToolPress(ConversionType.COLLAGE_IMAGES)}
          />
          <ToolCard
            title="PDF Watermark"
            description="Add custom text or logo watermark"
            icon="👤"
            onPress={() => handleToolPress(ConversionType.WATERMARK_PDF)}
          />
          <ToolCard
            title="PDF Merge"
            description="Combine multiple files into one PDF"
            icon="⑂"
            onPress={() => handleToolPress(ConversionType.MERGE_PDF)}
          />
          <ToolCard
            title="Compression"
            description="Shrink file size up to 80%"
            icon="🗜"
            onPress={() => handleToolPress(ConversionType.COMPRESS_PDF)}
          />
        </View>

        {/* SECTION 3: PDF TOOLS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PDF Tools</Text>
          <Text style={styles.sectionSub}>6 Tools</Text>
        </View>

        <View style={styles.grid}>
          <ToolCard
            title="PDF Signature"
            description="Draw e-signature & stamp on PDF"
            icon="✍️"
            onPress={() => handleToolPress(ConversionType.PDF_SIGNATURE)}
          />
          <ToolCard
            title="PDF Password"
            description="Protect with AES encryption or unlock"
            icon="🔒"
            onPress={() => handleToolPress(ConversionType.PDF_PASSWORD)}
          />
          <ToolCard
            title="Page Reorder"
            description="Reorder, rotate, & delete PDF pages"
            icon="📑"
            onPress={() => handleToolPress(ConversionType.PAGE_REORDER)}
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
            title="Split PDF"
            description="Extract specific page ranges"
            icon="✂"
            onPress={() => handleToolPress(ConversionType.SPLIT_PDF)}
          />
        </View>

        {/* RECENT FILES */}
        {historyJobs.length > 0 && (
          <>
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
          </>
        )}
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
    fontSize: 18,
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
    paddingHorizontal: 12,
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
    marginTop: 8,
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

