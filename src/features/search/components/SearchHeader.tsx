import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors, radius, shadows, spacing } from '../../../constants/theme';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onOpenFilters: () => void;
  onOpenSort: () => void;
};

export const SearchHeader = memo(function SearchHeader({
  placeholder,
  value,
  onChangeText,
  onOpenFilters,
  onOpenSort,
}: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.searchShell}>
          <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            returnKeyType="search"
          />
        </View>
        <Pressable
          onPress={onOpenFilters}
          style={styles.iconBtn}
          accessibilityRole="button"
          accessibilityLabel="Filters"
        >
          <Ionicons name="options-outline" size={22} color={colors.textPrimary} />
        </Pressable>
        <Pressable
          onPress={onOpenSort}
          style={styles.iconBtn}
          accessibilityRole="button"
          accessibilityLabel="Sort"
        >
          <Ionicons name="swap-vertical-outline" size={22} color={colors.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.background,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  searchShell: {
    flex: 1,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.button,
    borderWidth: 0,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.md,
    ...shadows.card,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
    fontWeight: '600',
  },
  iconBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 0,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
});

