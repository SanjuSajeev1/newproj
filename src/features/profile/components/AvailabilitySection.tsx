import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../components/ui';
import { colors, radius, spacing, typography } from '../../../constants/theme';

type Props = {
  title?: string;
  nextAvailable: string;
  slots: string[];
  onOpenCalendar?: () => void;
};

export const AvailabilitySection = memo(function AvailabilitySection({
  title = 'Availability',
  nextAvailable,
  slots,
  onOpenCalendar,
}: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {onOpenCalendar ? (
          <Pressable onPress={onOpenCalendar} accessibilityRole="button" accessibilityLabel="Open calendar">
            <View style={styles.link}>
              <Text style={styles.linkText}>Calendar</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </View>
          </Pressable>
        ) : null}
      </View>

      <Card padded style={styles.card}>
        <View style={styles.nextRow}>
          <View style={styles.nextPill}>
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <Text style={styles.nextText}>Next available</Text>
          </View>
          <Text style={styles.nextValue}>{nextAvailable}</Text>
        </View>

        <View style={styles.slotRow}>
          {slots.slice(0, 5).map((s) => (
            <View key={s} style={styles.slotPill}>
              <Text style={styles.slotText}>{s}</Text>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
});

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    fontSize: 18,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkText: {
    ...typography.caption,
    fontWeight: '800',
    color: colors.primary,
  },
  card: {},
  nextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  nextPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.button,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nextText: {
    ...typography.caption,
    fontWeight: '800',
    color: colors.primary,
  },
  nextValue: {
    ...typography.title,
    fontSize: 16,
  },
  slotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  slotPill: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.button,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  slotText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
  },
});

