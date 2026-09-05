import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { theme } from '../../../../config/theme';

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

export const OnboardingScreen = ({ navigation }: any) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < slides.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      navigation.replace('Main');
    }
  };

  const currentSlide = slides[activeStep];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <View style={styles.content}>
        <View style={styles.graphicBox}>
          <Text style={styles.graphicIcon}>{currentSlide.icon}</Text>
        </View>

        <View style={styles.textGroup}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{currentSlide.step}</Text>
          </View>
          <Text style={styles.title}>{currentSlide.title}</Text>
          <Text style={styles.desc}>{currentSlide.desc}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>
              {activeStep === slides.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
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
    backgroundColor: theme.colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  graphicIcon: {
    fontSize: 70,
    color: theme.colors.primary,
  },
  textGroup: {
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: theme.colors.primaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.onPrimaryFixed,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  desc: {
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
  actions: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  nextBtn: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
