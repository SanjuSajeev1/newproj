import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows, spacing, typography } from '../../../constants/theme';

type Stat = { key: string; label: string; value: string; icon: keyof typeof Ionicons.glyphMap };

type Props = {
  completedBookings?: number;
  experienceYears?: number;
  responseRate?: string;
  repeatCustomers?: string;
  reviewCount: number;
  responseTime?: string;
};

export const QuickStatsTab = memo(function QuickStatsTab({
  completedBookings,
  experienceYears,
  responseRate,
  repeatCustomers,
  reviewCount,
  responseTime,
}: Props) {
  const stats: Stat[] = [
    { key: 'bookings', label: 'Completed', value: String(completedBookings ?? 120), icon: 'checkmark-circle-outline' },
    { key: 'exp', label: 'Experience', value: `${experienceYears ?? 5} yrs`, icon: 'sparkles-outline' },
    { key: 'reviews', label: 'Reviews', value: String(reviewCount), icon: 'star-outline' },
    { key: 'response', label: 'Response', value: responseTime ?? 'Fast', icon: 'time-outline' },
    { key: 'rate', label: 'Response rate', value: responseRate ?? '96%', icon: 'trending-up-outline' },
    { key: 'repeat', label: 'Repeat', value: repeatCustomers ?? '38%', icon: 'people-outline' },
  ];

  return (
    <View style={styles.wrap}>
      <View style={styles.grid}>
        {stats.map((s) => (
          <View key={s.key} style={styles.card}>
            <View style={styles.icon}>
              <Ionicons name={s.icon} size={18} color={colors.primary} />
            </View>
            <Text style={styles.value}>{s.value}</Text>
            <Text style={styles.label}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    width: '47.5%',
    padding: spacing.md,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  value: {
    ...typography.title,
    fontSize: 18,
    marginBottom: 2,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
  },
});

