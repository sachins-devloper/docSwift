import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { theme } from '../../../../config/theme';
import { ConversionType } from '../../../conversion/domain/enums/ConversionType';

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  isPopular?: boolean;
  onPress: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  isPopular,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {isPopular && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Popular</Text>
        </View>
      )}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.colors.primaryFixed,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: theme.colors.onPrimaryFixed,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
    color: theme.colors.primary,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  description: {
    fontSize: 11,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 15,
  },
});
