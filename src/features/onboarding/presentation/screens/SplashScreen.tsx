import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import BootSplash from 'react-native-bootsplash';

const { width } = Dimensions.get('window');

export const SplashScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hide native bootsplash on mount
    BootSplash.hide({ fade: true });

    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: false,
      }),
    ]).start();

    // Auto navigate to main after splash duration
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, progressAnim, navigation]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Decorative Background Waves */}
      <View style={styles.topWaveContainer}>
        <View style={styles.topWaveLayer1} />
        <View style={styles.topWaveLayer2} />
      </View>

      {/* Main Content Area */}
      <Animated.View
        style={[
          styles.mainContent,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Official App Logo */}
        <Image
          source={require('../../../../assets/img/app_logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />

        {/* Brand Name: DocSwift */}
        <Text style={styles.brandTitle}>
          <Text style={styles.titleDoc}>Doc</Text>
          <Text style={styles.titleSwift}>Swift</Text>
        </Text>

        {/* Brand Tagline */}
        <Text style={styles.tagline}>Convert. Manage. Simplify.</Text>

        {/* Workspace Loading Section */}
        <View style={styles.loaderSection}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
          <Text style={styles.loadingText}>Loading your workspace...</Text>
        </View>
      </Animated.View>

      {/* Bottom Multi-layered Curved Blue Waves */}
      <View style={styles.bottomWaveContainer}>
        <View style={styles.bottomWaveLayer1} />
        <View style={styles.bottomWaveLayer2} />
        <View style={styles.bottomWaveLayer3} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topWaveContainer: {
    position: 'absolute',
    top: -60,
    left: -40,
    right: -40,
    height: 180,
  },
  topWaveLayer1: {
    position: 'absolute',
    width: width * 1.3,
    height: 150,
    borderRadius: 180,
    backgroundColor: 'rgba(224, 242, 254, 0.6)',
    top: -40,
    left: -30,
  },
  topWaveLayer2: {
    position: 'absolute',
    width: width * 1.2,
    height: 120,
    borderRadius: 150,
    backgroundColor: 'rgba(186, 230, 253, 0.4)',
    top: -50,
    right: -40,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  logoImage: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  titleDoc: {
    color: '#0F172A',
  },
  titleSwift: {
    color: '#0066FF',
  },
  tagline: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
    letterSpacing: 0.3,
    marginBottom: 50,
  },
  loaderSection: {
    alignItems: 'center',
  },
  progressTrack: {
    width: 160,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066FF',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  bottomWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
    overflow: 'hidden',
  },
  bottomWaveLayer1: {
    position: 'absolute',
    bottom: -70,
    left: -40,
    width: width * 1.3,
    height: 180,
    borderRadius: 160,
    backgroundColor: '#93C5FD',
    opacity: 0.5,
    transform: [{ rotate: '-8deg' }],
  },
  bottomWaveLayer2: {
    position: 'absolute',
    bottom: -80,
    left: -20,
    width: width * 1.25,
    height: 170,
    borderRadius: 150,
    backgroundColor: '#3B82F6',
    opacity: 0.75,
    transform: [{ rotate: '5deg' }],
  },
  bottomWaveLayer3: {
    position: 'absolute',
    bottom: -90,
    left: -30,
    width: width * 1.3,
    height: 160,
    borderRadius: 140,
    backgroundColor: '#0066FF',
  },
});
