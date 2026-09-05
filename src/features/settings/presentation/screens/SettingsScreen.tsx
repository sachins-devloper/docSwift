import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { theme } from '../../../../config/theme';

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Account Plan</Text>
          <Text style={styles.itemSub}>DocuMorph Pro (Unlimited Sandbox)</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Security & Privacy</Text>
          <Text style={styles.itemSub}>TLS 1.3 Local Processing Active</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>App Version</Text>
          <Text style={styles.itemSub}>v1.0.0 (Build 102)</Text>
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
  header: {
    paddingHorizontal: 16,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceContainerHigh,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  item: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  itemSub: {
    fontSize: 11,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
});
