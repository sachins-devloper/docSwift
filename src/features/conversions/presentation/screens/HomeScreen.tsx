import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '../../../../shared/theme/colors';
import { useConversionStore } from '../store/useConversionStore';
import { ToolType } from '../../domain/entities/ConversionJob';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { setActiveTool, historyJobs } = useConversionStore();

  const handleToolPress = (tool: ToolType) => {
    setActiveTool(tool);
    navigation.navigate('Convert');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />
      
      {/* App Header Bar */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoIcon}>⇄</Text>
          </View>
          <View>
            <Text style={styles.brandSub}>DOCUMORPH</Text>
            <Text style={styles.brandTitle}>Home Tools</Text>
          </View>
        </View>

        <View style={styles.securityPill}>
          <Text style={styles.securityIcon}>✓</Text>
          <Text style={styles.securityText}>Encrypted & Local</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeIcon}>⚡</Text>
            <Text style={styles.heroBadgeText}>INSTANT CONVERSION</Text>
          </View>

          <Text style={styles.heroTitle}>Convert a File</Text>
          <Text style={styles.heroSub}>
            Select any PDF, Word, or Image document to get started immediately.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            activeOpacity={0.8}
            onPress={() => handleToolPress('pdf-to-word')}
          >
            <Text style={styles.heroButtonIcon}>📁</Text>
            <Text style={styles.heroButtonText}>Choose Document</Text>
          </TouchableOpacity>
        </View>

        {/* Primary Tools Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Primary Tools</Text>
          <Text style={styles.sectionSub}>6 Services</Text>
        </View>

        <View style={styles.grid}>
          {/* Tool 1 */}
          <TouchableOpacity
            style={styles.toolCard}
            activeOpacity={0.7}
            onPress={() => handleToolPress('pdf-to-word')}
          >
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>Popular</Text>
            </View>
            <View style={styles.toolIconContainer}>
              <Text style={styles.toolIcon}>⇄</Text>
            </View>
            <Text style={styles.toolTitle}>PDF to Word</Text>
            <Text style={styles.toolDesc}>Editable DOCX with preserved layout</Text>
          </TouchableOpacity>

          {/* Tool 2 */}
          <TouchableOpacity
            style={styles.toolCard}
            activeOpacity={0.7}
            onPress={() => handleToolPress('word-to-pdf')}
          >
            <View style={[styles.toolIconContainer, styles.bgIconSecondary]}>
              <Text style={styles.toolIcon}>📄</Text>
            </View>
            <Text style={styles.toolTitle}>Word to PDF</Text>
            <Text style={styles.toolDesc}>Universal vector document rendering</Text>
          </TouchableOpacity>

          {/* Tool 3 */}
          <TouchableOpacity
            style={styles.toolCard}
            activeOpacity={0.7}
            onPress={() => handleToolPress('merge-pdf')}
          >
            <View style={[styles.toolIconContainer, styles.bgIconPrimary]}>
              <Text style={styles.toolIcon}>⑂</Text>
            </View>
            <Text style={styles.toolTitle}>Merge PDF</Text>
            <Text style={styles.toolDesc}>Combine multiple files into one PDF</Text>
          </TouchableOpacity>

          {/* Tool 4 */}
          <TouchableOpacity
            style={styles.toolCard}
            activeOpacity={0.7}
            onPress={() => handleToolPress('split-pdf')}
          >
            <View style={[styles.toolIconContainer, styles.bgIconSecondary]}>
              <Text style={styles.toolIcon}>✂</Text>
            </View>
            <Text style={styles.toolTitle}>Split PDF</Text>
            <Text style={styles.toolDesc}>Extract specific page ranges</Text>
          </TouchableOpacity>

          {/* Tool 5 */}
          <TouchableOpacity
            style={styles.toolCard}
            activeOpacity={0.7}
            onPress={() => handleToolPress('images-to-pdf')}
          >
            <View style={[styles.toolIconContainer, styles.bgIconSecondary]}>
              <Text style={styles.toolIcon}>🖼</Text>
            </View>
            <Text style={styles.toolTitle}>Images to PDF</Text>
            <Text style={styles.toolDesc}>Batch convert JPG/PNG scans</Text>
          </TouchableOpacity>

          {/* Tool 6 */}
          <TouchableOpacity
            style={styles.toolCard}
            activeOpacity={0.7}
            onPress={() => handleToolPress('compress-pdf')}
          >
            <View style={[styles.toolIconContainer, styles.bgIconPrimary]}>
              <Text style={styles.toolIcon}>🗜</Text>
            </View>
            <Text style={styles.toolTitle}>Compress PDF</Text>
            <Text style={styles.toolDesc}>Shrink file size up to 80%</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Files List */}
        <View style={styles.sectionHeader}>
          <View style={styles.rowCenter}>
            <Text style={styles.sectionTitle}>Recent Files</Text>
            <View style={styles.countTag}>
              <Text style={styles.countTagText}>{historyJobs.length}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {historyJobs.map((item) => (
          <View key={item.id} style={styles.fileItem}>
            <View style={styles.fileIconContainer}>
              <Text style={styles.fileItemIcon}>📄</Text>
            </View>
            <View style={styles.fileMeta}>
              <Text style={styles.fileName} numberOfLines={1}>
                {item.outputFileName || item.inputFileName}
              </Text>
              <Text style={styles.fileInfo}>
                {item.outputFormat || 'PDF'} · {item.outputFileSize || item.inputFileSize} · {item.createdAt}
              </Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Done</Text>
            </View>
          </View>
        ))}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerHigh,
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
    backgroundColor: Colors.primary,
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
    color: Colors.onSurfaceVariant,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  brandTitle: {
    fontSize: 16,
    color: Colors.onSurface,
    fontWeight: '700',
  },
  securityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  securityIcon: {
    color: Colors.surfaceTint,
    fontSize: 12,
    fontWeight: 'bold',
  },
  securityText: {
    fontSize: 11,
    color: Colors.onSecondaryContainer,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  heroCard: {
    backgroundColor: Colors.primaryContainer,
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  heroBadgeIcon: {
    color: '#fff',
    fontSize: 12,
  },
  heroBadgeText: {
    color: Colors.primaryFixed,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  heroSub: {
    fontSize: 12,
    color: Colors.primaryFixedDim,
    lineHeight: 18,
  },
  heroButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  heroButtonIcon: {
    fontSize: 18,
  },
  heroButtonText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  sectionSub: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  countTag: {
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  countTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    width: '48%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.primaryFixed,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  popularBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onPrimaryFixed,
  },
  toolIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bgIconPrimary: {
    backgroundColor: Colors.primaryFixed,
  },
  bgIconSecondary: {
    backgroundColor: Colors.surfaceContainerHigh,
  },
  toolIcon: {
    fontSize: 20,
    color: Colors.primary,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  toolDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 15,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  fileIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileItemIcon: {
    fontSize: 18,
  },
  fileMeta: {
    flex: 1,
  },
  fileName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  fileInfo: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
});
