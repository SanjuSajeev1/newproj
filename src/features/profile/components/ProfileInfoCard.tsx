import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../components/ui';
import { colors, radius, spacing, typography } from '../../../constants/theme';

type Props = {
  priceFrom: number;
  availability: string;
  location?: string;
};

export const ProfileInfoCard = memo(function ProfileInfoCard({ priceFrom, availability, location }: Props) {
  return (
    <Card padded style={styles.card}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Ionicons name="cash-outline" size={16} color={colors.primary} />
          <Text style={styles.label}>Starting price</Text>
          <Text style={styles.value}>₹{priceFrom}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.item}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.label}>Availability</Text>
          <Text style={styles.value} numberOfLines={1}>
            {availability}
          </Text>
        </View>
      </View>

      {location ? (
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {location}
          </Text>
        </View>
      ) : null}
    </Card>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  item: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  divider: {
    width: 1,
    height: 44,
    backgroundColor: colors.border,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  value: {
    ...typography.title,
    fontSize: 16,
  },
  locationRow: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  locationText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '700',
    flex: 1,
  },
});

