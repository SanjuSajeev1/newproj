import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '../../../components/ui';
import { colors, radius, spacing, typography } from '../../../constants/theme';

export type ProviderSortKey = 'top_rated' | 'popular' | 'price_low' | 'price_high' | 'recent';

const OPTIONS: { key: ProviderSortKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'top_rated', label: 'Top Rated', icon: 'star-outline' },
  { key: 'popular', label: 'Most Popular', icon: 'trending-up-outline' },
  { key: 'price_low', label: 'Lowest Price', icon: 'arrow-down-outline' },
  { key: 'price_high', label: 'Highest Price', icon: 'arrow-up-outline' },
  { key: 'recent', label: 'Recently Added', icon: 'time-outline' },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  value: ProviderSortKey;
  onSelect: (next: ProviderSortKey) => void;
};

export const SortBottomSheet = memo(function SortBottomSheet({ visible, onClose, value, onSelect }: Props) {
  return (
    <BottomSheetModal visible={visible} onClose={onClose} title="Sort by" sheetStyle={styles.sheet}>
      {OPTIONS.map((opt) => {
        const active = opt.key === value;
        return (
          <Pressable
            key={opt.key}
            onPress={() => {
              onSelect(opt.key);
              onClose();
            }}
            style={[styles.row, active && styles.rowActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <View style={styles.left}>
              <Ionicons name={opt.icon} size={20} color={active ? colors.primary : colors.textSecondary} />
              <Text style={[styles.label, active && styles.labelActive]}>{opt.label}</Text>
            </View>
            {active ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : <View style={styles.spacer} />}
          </Pressable>
        );
      })}
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.button,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  rowActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  label: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
  },
  labelActive: {
    color: colors.primary,
  },
  spacer: {
    width: 22,
    height: 22,
  },
});

