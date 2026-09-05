import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide === 0) {
      setCurrentSlide(1);
    } else {
      navigation.replace('Main');
    }
  };

  const handleSkip = () => {
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* App Branding */}
      <View style={styles.brandRow}>
        <Image
          source={require('../../../../assets/img/app_logo.png')}
          style={styles.brandLogo}
          resizeMode="contain"
        />
        <Text style={styles.brandTitle}>
          <Text style={styles.titleDoc}>Doc</Text>
          <Text style={styles.titleSwift}>Swift</Text>
        </Text>
      </View>

      {/* Slide Content */}
      <View style={styles.contentArea}>
        {currentSlide === 0 ? (
          /* SLIDE 1: Convert Documents Easily */
          <View style={styles.slideContainer}>
            <Text style={styles.heading}>Convert Documents Easily</Text>
            <Text style={styles.description}>
              Convert your files quickly and securely in just a few steps.
            </Text>

            {/* Slide 1 Custom Illustration */}
            <View style={styles.illustrationBox}>
              <View style={styles.illustrationGlow} />

              {/* PDF Card */}
              <View style={[styles.docCard, styles.pdfCardPosition]}>
                <View style={styles.pdfBadge}>
                  <Text style={styles.pdfBadgeText}>PDF</Text>
                </View>
                <View style={styles.docLineLong} />
                <View style={styles.docLineShort} />
              </View>

              {/* Conversion Curved Arrows */}
              <View style={styles.arrowTop}>
                <Text style={styles.arrowText}>➔</Text>
              </View>
              <View style={styles.arrowBottom}>
                <Text style={styles.arrowText}>⬅</Text>
              </View>

              {/* Word Card */}
              <View style={[styles.docCard, styles.wordCardPosition]}>
                <View style={styles.wordBadge}>
                  <Text style={styles.wordBadgeText}>W</Text>
                </View>
                <View style={styles.docLineLong} />
                <View style={styles.docLineShort} />
              </View>
            </View>
          </View>
        ) : (
          /* SLIDE 2: Scan, Manage & More */
          <View style={styles.slideContainer}>
            <Text style={styles.heading}>Scan, Manage & More</Text>
            <Text style={styles.description}>
              Scan documents, merge, compress and manage all your files in one place.
            </Text>

            {/* Slide 2 Custom Illustration */}
            <View style={styles.illustrationBox}>
              <View style={styles.illustrationGlow} />

              {/* Phone Frame */}
              <View style={styles.phoneFrame}>
                <View style={styles.phoneNotch} />
                <View style={styles.scanTargetArea}>
                  <View style={[styles.targetCorner, styles.cornerTL]} />
                  <View style={[styles.targetCorner, styles.cornerTR]} />
                  <View style={[styles.targetCorner, styles.cornerBL]} />
                  <View style={[styles.targetCorner, styles.cornerBR]} />
                  <View style={styles.docLinesGroup}>
                    <View style={styles.phoneLine} />
                    <View style={styles.phoneLine} />
                    <View style={styles.phoneLine} />
                    <View style={styles.phoneLineShort} />
                  </View>
                </View>
              </View>

              {/* Floating Tool Cards */}
              <View style={[styles.toolFloatCard, styles.floatScan]}>
                <Text style={[styles.toolIcon, { color: '#8B5CF6' }]}>⛶</Text>
                <Text style={styles.toolLabel}>Scan</Text>
              </View>

              <View style={[styles.toolFloatCard, styles.floatMerge]}>
                <Text style={[styles.toolIcon, { color: '#EF4444' }]}>📋</Text>
                <Text style={styles.toolLabel}>Merge</Text>
              </View>

              <View style={[styles.toolFloatCard, styles.floatCompress]}>
                <Text style={[styles.toolIcon, { color: '#10B981' }]}>⇊</Text>
                <Text style={styles.toolLabel}>Compress</Text>
              </View>

              <View style={[styles.toolFloatCard, styles.floatSplit]}>
                <Text style={[styles.toolIcon, { color: '#F59E0B' }]}>❚❚</Text>
                <Text style={styles.toolLabel}>Split</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Footer Navigation & CTA */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.paginationDots}>
          <View style={[styles.dot, currentSlide === 0 ? styles.dotActive : styles.dotInactive]} />
          <View style={[styles.dot, currentSlide === 1 ? styles.dotActive : styles.dotInactive]} />
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
          <Text style={styles.primaryBtnText}>
            {currentSlide === 0 ? 'Next  ➔' : 'Get Started'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: 12,
    alignItems: 'flex-end',
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  brandRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  brandLogo: {
    width: 64,
    height: 64,
    marginBottom: 6,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  titleDoc: {
    color: '#0F172A',
  },
  titleSwift: {
    color: '#0066FF',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  slideContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
    marginBottom: 30,
  },
  illustrationBox: {
    width: width - 48,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  illustrationGlow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#F0F7FF',
  },
  docCard: {
    width: 120,
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    elevation: 6,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    position: 'absolute',
  },
  pdfCardPosition: {
    left: 24,
    top: 50,
    transform: [{ rotate: '-8deg' }],
  },
  wordCardPosition: {
    right: 24,
    top: 70,
    transform: [{ rotate: '6deg' }],
  },
  pdfBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  pdfBadgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  wordBadge: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  wordBadgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  docLineLong: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 8,
  },
  docLineShort: {
    height: 6,
    width: '65%',
    backgroundColor: '#CBD5E1',
    borderRadius: 3,
  },
  arrowTop: {
    position: 'absolute',
    top: 30,
    backgroundColor: '#0066FF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  arrowBottom: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#0066FF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  arrowText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  phoneFrame: {
    width: 140,
    height: 220,
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  phoneNotch: {
    width: 40,
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    marginBottom: 10,
  },
  scanTargetArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    position: 'relative',
    padding: 10,
    justifyContent: 'center',
  },
  targetCorner: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderColor: '#0066FF',
  },
  cornerTL: { top: 8, left: 8, borderTopWidth: 2, borderLeftWidth: 2 },
  cornerTR: { top: 8, right: 8, borderTopWidth: 2, borderRightWidth: 2 },
  cornerBL: { bottom: 8, left: 8, borderBottomWidth: 2, borderLeftWidth: 2 },
  cornerBR: { bottom: 8, right: 8, borderBottomWidth: 2, borderRightWidth: 2 },
  docLinesGroup: {
    gap: 6,
  },
  phoneLine: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  phoneLineShort: {
    height: 4,
    width: '60%',
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  toolFloatCard: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  floatScan: { top: 20, left: 10 },
  floatMerge: { top: 20, right: 10 },
  floatCompress: { bottom: 20, left: 10 },
  floatSplit: { bottom: 20, right: 10 },
  toolIcon: {
    fontSize: 16,
    fontWeight: '800',
  },
  toolLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    alignItems: 'center',
    gap: 24,
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#0066FF',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#E2E8F0',
  },
  primaryBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#0066FF',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
