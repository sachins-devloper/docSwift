import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { theme } from '../../../../config/theme';
import { useConversionStore } from '../../../../store/conversion.store';

export const ConversionSuccessScreen = ({ navigation }: any) => {
  const { currentJob } = useConversionStore();

  const handleDownload = () => {
    Alert.alert('Download Started', `Downloading ${currentJob?.outputFileName || 'Converted_File.docx'}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroGroup}>
          <View style={styles.circle}>
            <Text style={styles.check}>✓</Text>
          </View>
          <Text style={styles.title}>Conversion Complete!</Text>
          <Text style={styles.sub}>Your converted document is ready to download.</Text>
        </View>

        <View style={styles.outputCard}>
          <Text style={styles.fileIcon}>📄</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.fileName}>{currentJob?.outputFileName || 'Document_Converted.docx'}</Text>
            <Text style={styles.fileSub}>Word Document · {currentJob?.outputFileSize || '3.1 MB'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8} onPress={handleDownload}>
          <Text style={styles.downloadIcon}>⬇</Text>
          <Text style={styles.downloadText}>Download Converted File</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.anotherBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.anotherText}>Convert Another Document</Text>
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
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  heroGroup: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.onSurface,
  },
  sub: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  outputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainerLowest,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 12,
  },
  fileIcon: {
    fontSize: 22,
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
  downloadBtn: {
    height: 50,
    backgroundColor: theme.colors.primary,
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
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anotherText: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});
