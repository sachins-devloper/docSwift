import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../../../config/theme';
import { useConversionStore } from '../../../../store/conversion.store';

export const RecentScreen = ({ navigation }: any) => {
  const { historyJobs, clearHistory } = useConversionStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Conversions</Text>
        <TouchableOpacity onPress={clearHistory}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {historyJobs.map((item) => (
          <View key={item.id} style={styles.fileItem}>
            <Text style={styles.fileIcon}>📄</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.fileName}>{item.outputFileName || item.inputFileName}</Text>
              <Text style={styles.fileInfo}>
                {item.outputFormat || 'PDF'} · {item.outputFileSize || item.inputFileSize}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Done</Text>
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
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceContainerHigh,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  clearText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.error,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainerLowest,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 12,
  },
  fileIcon: {
    fontSize: 18,
  },
  fileName: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  fileInfo: {
    fontSize: 11,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  badge: {
    backgroundColor: theme.colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
