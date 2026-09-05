import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { theme } from '../../../../config/theme';
import { ScanFilterType } from '../../domain/enums/ScanFilterType';

interface ScanCameraScreenProps {
  navigation: any;
}

export const ScanCameraScreen: React.FC<ScanCameraScreenProps> = ({ navigation }) => {
  const [capturedPages, setCapturedPages] = useState<string[]>([
    'sample_page_1.png',
  ]);

  const handleCapture = () => {
    const newPage = `sample_page_${capturedPages.length + 1}.png`;
    setCapturedPages((prev) => [...prev, newPage]);
  };

  const handleProceed = () => {
    if (capturedPages.length === 0) {
      Alert.alert('No Pages Scanned', 'Please capture at least one page to proceed.');
      return;
    }
    navigation.navigate('ScanFilter', { pages: capturedPages });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Camera Viewfinder Mock */}
      <View style={styles.viewfinder}>
        <View style={styles.frameCornerTL} />
        <View style={styles.frameCornerTR} />
        <View style={styles.frameCornerBL} />
        <View style={styles.frameCornerBR} />

        <View style={styles.guideBadge}>
          <Text style={styles.guideText}>Align document within frame</Text>
        </View>
      </View>

      {/* Control Bar */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.galleryBtn} onPress={handleCapture}>
          <Text style={styles.galleryIcon}>🖼️</Text>
          <Text style={styles.countText}>{capturedPages.length} Scanned</Text>
        </TouchableOpacity>

        {/* Shutter Button */}
        <TouchableOpacity style={styles.shutterBtn} onPress={handleCapture}>
          <View style={styles.shutterInner} />
        </TouchableOpacity>

        {/* Proceed Button */}
        <TouchableOpacity
          style={[
            styles.proceedBtn,
            capturedPages.length === 0 && { opacity: 0.5 },
          ]}
          onPress={handleProceed}
        >
          <Text style={styles.proceedText}>Done →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewfinder: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#111',
  },
  frameCornerTL: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: theme.colors.primaryFixed,
  },
  frameCornerTR: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: theme.colors.primaryFixed,
  },
  frameCornerBL: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: theme.colors.primaryFixed,
  },
  frameCornerBR: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: theme.colors.primaryFixed,
  },
  guideBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  guideText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  controls: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  galleryBtn: {
    alignItems: 'center',
  },
  galleryIcon: {
    fontSize: 24,
  },
  countText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
  },
  shutterBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.primary,
  },
  proceedBtn: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  proceedText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});
