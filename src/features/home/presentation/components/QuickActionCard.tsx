import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../../config/theme';

interface QuickActionCardProps {
  onChooseDocument: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({ onChooseDocument }) => {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeIcon}>⚡</Text>
        <Text style={styles.badgeText}>INSTANT CONVERSION</Text>
      </View>
      <Text style={styles.title}>Convert a File</Text>
      <Text style={styles.sub}>
        Select any PDF, Word, or Image document to get started immediately.
      </Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onChooseDocument}>
        <Text style={styles.buttonIcon}>📁</Text>
        <Text style={styles.buttonText}>Choose Document</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: theme.radius.xxl,
    padding: theme.spacing.xl,
    gap: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeIcon: {
    color: '#fff',
    fontSize: 12,
  },
  badgeText: {
    color: theme.colors.primaryFixed,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  sub: {
    fontSize: 12,
    color: theme.colors.primaryFixed,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  buttonIcon: {
    fontSize: 18,
  },
  buttonText: {
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
