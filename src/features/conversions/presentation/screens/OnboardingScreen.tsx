import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors } from '../../../../shared/theme/colors';

interface OnboardingScreenProps {
  navigation: any;
}

const slides = [
  {
    step: 'Step 1 of 3',
    icon: '⇄',
    title: 'Convert Documents Easily',
    desc: 'Transform PDFs into editable Word documents, Excel sheets, and images with 100% layout retention.',
  },
  {
    step: 'Step 2 of 3',
    icon: '🔒',
    title: 'Simple and Secure',
    desc: 'Your files are processed with end-to-end TLS 1.3 encryption and automatically wiped after download.',
  },
  {
    step: 'Step 3 of 3',
    icon: '⚡',
    title: 'Everything in One Place',
    desc: 'Merge, split, compress, and perform OCR extraction seamlessly on any mobile device.',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < slides.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      navigation.replace('Home');
    }
  };

  const currentSlide = slides[activeStep];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />

      <View style={styles.content}>
        {/* Slide Graphic */}
        <View style={styles.graphicBox}>
          <Text style={styles.graphicIcon}>{currentSlide.icon}</Text>
        </View>

        {/* Text */}
        <View style={styles.textGroup}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{currentSlide.step}</Text>
          </View>
          <Text style={styles.title}>{currentSlide.title}</Text>
          <Text style={styles.desc}>{currentSlide.desc}</Text>
        </View>

        {/* Action Controls */}
        <View style={styles.actions}>
          <View style={styles.dotsRow}>
            {slides.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  idx === activeStep ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>
              {activeStep === slides.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.replace('Home')}>
            <Text style={styles.skipText}>Skip Onboarding</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  graphicBox: {
    width: 180,
    height: 180,
    borderRadius: 30,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  graphicIcon: {
    fontSize: 70,
    color: Colors.primary,
  },
  textGroup: {
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: Colors.primaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onPrimaryFixed,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.onSurface,
    textAlign: 'center',
  },
  desc: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
  actions: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  dotInactive: {
    width: 8,
    backgroundColor: Colors.surfaceContainerHighest,
  },
  nextBtn: {
    width: '100%',
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  skipText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontWeight: '600',
  },
});
