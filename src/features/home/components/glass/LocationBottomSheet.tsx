import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomSheetModal } from '../../../../components/ui';
import { colors, spacing, typography } from '../../../../constants/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export function LocationBottomSheet({
  visible,
  onClose,
  options,
  selected,
  onSelect,
}: Props) {
  return (
    <BottomSheetModal visible={visible} onClose={onClose} title="Select location">
      <View style={styles.list}>
        {options.map((item) => {
          const active = item === selected;
          return (
            <Pressable
              key={item}
              onPress={() => onSelect(item)}
              style={({ pressed }) => [
                styles.row,
                active && styles.rowActive,
                pressed && styles.rowPressed,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <View style={styles.rowLeft}>
                <Ionicons
                  name="location-sharp"
                  size={16}
                  color={active ? colors.primary : colors.textSecondary}
                />
                <Text style={[styles.name, active && styles.nameActive]}>{item}</Text>
              </View>
              {active ? (
                <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing.md,
  },
  row: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowActive: {
    borderColor: 'rgba(99,102,241,0.35)',
    backgroundColor: '#EEF2FF',
  },
  rowPressed: {
    opacity: 0.9,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  nameActive: {
    color: colors.primary,
  },
});
