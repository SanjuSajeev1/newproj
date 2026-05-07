import { memo, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, Button } from '../../../components/ui';
import { colors, radius, spacing, typography } from '../../../constants/theme';

export type ProviderFilters = {
  minRating: number | null;
  verifiedOnly: boolean;
  priceBucket: 'any' | 'budget' | 'mid' | 'premium';
};

type Props = {
  visible: boolean;
  onClose: () => void;
  value: ProviderFilters;
  onApply: (next: ProviderFilters) => void;
};

export const FilterBottomSheet = memo(function FilterBottomSheet({ visible, onClose, value, onApply }: Props) {
  const [draft, setDraft] = useState<ProviderFilters>(value);

  const pills = useMemo(
    () => [
      { id: 'any', label: 'Any price' },
      { id: 'budget', label: 'Budget' },
      { id: 'mid', label: 'Mid' },
      { id: 'premium', label: 'Premium' },
    ] as const,
    [],
  );

  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      title="Filters"
      sheetStyle={styles.sheet}
    >
      <Text style={styles.sectionLabel}>Rating</Text>
      <View style={styles.pillRow}>
        {[null, 4.0, 4.5, 4.8].map((r) => {
          const active = draft.minRating === r;
          const label = r === null ? 'Any' : `${r.toFixed(1)}+`;
          return (
            <Pressable
              key={label}
              onPress={() => setDraft((d) => ({ ...d, minRating: r }))}
              style={[styles.pill, active && styles.pillActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionLabel}>Price range</Text>
      <View style={styles.pillRow}>
        {pills.map((p) => {
          const active = draft.priceBucket === p.id;
          return (
            <Pressable
              key={p.id}
              onPress={() => setDraft((d) => ({ ...d, priceBucket: p.id }))}
              style={[styles.pill, active && styles.pillActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>{p.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionLabel}>Verified</Text>
      <Pressable
        onPress={() => setDraft((d) => ({ ...d, verifiedOnly: !d.verifiedOnly }))}
        style={[styles.toggleRow, draft.verifiedOnly && styles.toggleRowActive]}
        accessibilityRole="button"
        accessibilityState={{ selected: draft.verifiedOnly }}
      >
        <View style={styles.toggleLeft}>
          <Ionicons name="shield-checkmark-outline" size={20} color={draft.verifiedOnly ? colors.primary : colors.textSecondary} />
          <Text style={styles.toggleText}>Verified only</Text>
        </View>
        {draft.verifiedOnly ? (
          <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
        ) : (
          <View style={styles.toggleSpacer} />
        )}
      </Pressable>

      <View style={styles.actions}>
        <Button
          title="Apply"
          onPress={() => {
            onApply(draft);
            onClose();
          }}
        />
        <Button
          title="Reset"
          variant="secondary"
          onPress={() => {
            const reset: ProviderFilters = { minRating: null, verifiedOnly: false, priceBucket: 'any' };
            setDraft(reset);
            onApply(reset);
            onClose();
          }}
          style={styles.reset}
        />
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#FFFFFF',
  },
  sectionLabel: {
    ...typography.caption,
    fontWeight: '800',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pillActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  pillText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  pillTextActive: {
    color: colors.primary,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
  },
  toggleRowActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  toggleText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  toggleSpacer: {
    width: 22,
    height: 22,
  },
  actions: {
    marginTop: spacing.sm,
  },
  reset: {
    marginTop: spacing.sm,
  },
});

