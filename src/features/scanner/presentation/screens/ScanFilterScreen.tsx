import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { theme } from '../../../../config/theme';
import { SCAN_FILTERS, ScanFilterType } from '../../domain/enums/ScanFilterType';

interface ScanFilterScreenProps {
  navigation: any;
  route: any;
}

export const ScanFilterScreen: React.FC<ScanFilterScreenProps> = ({
  navigation,
  route,
}) => {
  const pages = route.params?.pages || ['sample_page_1.png'];
  const [activeFilter, setActiveFilter] = useState<ScanFilterType>(
    ScanFilterType.MAGIC_COLOR
  );

  const handleNext = () => {
    navigation.navigate('ScanExport', {
      pages,
      filter: activeFilter,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Filters & Adjustments</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Scanned Document Page Canvas Preview */}
        <View style={styles.canvasPreview}>
          <View style={styles.pageMock}>
            <View style={styles.mockHeaderBar} />
            <Text style={styles.mockTitle}>SCANNED DOCUMENT</Text>
            <View style={styles.mockLine} />
            <View style={styles.mockLineShort} />
            <View style={styles.mockBox} />

            <View style={styles.filterTag}>
              <Text style={styles.filterTagText}>Filter: {activeFilter}</Text>
            </View>
          </View>
        </View>

        {/* Filter Selection Row */}
        <Text style={styles.sectionTitle}>Select Filter Option</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {SCAN_FILTERS.map((item) => (
            <TouchableOpacity
              key={item.type}
              style={[
                styles.filterChip,
                activeFilter === item.type && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(item.type)}
            >
              <Text style={styles.filterIcon}>{item.icon}</Text>
              <Text
                style={[
                  styles.filterLabel,
                  activeFilter === item.type && styles.filterLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Next Action Button */}
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>Export Options →</Text>
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
  canvasPreview: {
    height: 280,
    backgroundColor: theme.colors.surfaceContainerLow,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pageMock: {
    width: 170,
    height: 230,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  mockHeaderBar: {
    height: 6,
    width: '40%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  mockTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: theme.colors.onSurface,
  },
  mockLine: {
    height: 4,
    width: '100%',
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
  },
  mockLineShort: {
    height: 4,
    width: '70%',
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
  },
  mockBox: {
    height: 40,
    width: '100%',
    backgroundColor: theme.colors.surfaceContainerHigh,
    borderRadius: 4,
    marginTop: 6,
  },
  filterTag: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  filterTagText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  filterRow: {
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    gap: 4,
    minWidth: 90,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primaryContainer,
    borderColor: theme.colors.primary,
  },
  filterIcon: {
    fontSize: 20,
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  filterLabelActive: {
    color: '#fff',
    fontWeight: '700',
  },
  nextBtn: {
    height: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  nextText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
