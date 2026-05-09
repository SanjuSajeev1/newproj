import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../components/ui';
import { colors, radius, spacing, typography } from '../../../constants/theme';

type Props = {
  priceFrom: number;
  availability: string;
  location?: string;
  email?: string;
};

export const ProfileInfoCard = memo(function ProfileInfoCard({
  priceFrom,
  availability,
  location,
  email,
}: Props) {
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
        <View style={[styles.metaRow, styles.metaAfterGrid]}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.metaText} numberOfLines={1}>
            {location}
          </Text>
        </View>
      ) : null}

      {email ? (
        <View style={[styles.metaRow, location ? styles.metaRowSpaced : styles.metaAfterGrid]}>
          <Ionicons name="mail-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.metaText} numberOfLines={2} selectable>
            {email}
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
  metaAfterGrid: {
    marginTop: spacing.md,
  },
  metaRow: {
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
  metaRowSpaced: {
    marginTop: spacing.sm,
  },
  metaText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '700',
    flex: 1,
  },
});

