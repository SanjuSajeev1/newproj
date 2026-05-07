import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { gs } from '../../constants/glassTheme';
import { colors, radius, shadows, spacing } from '../../../../constants/theme';

type Props = {
  placeholder?: string;
  onSubmit?: (text: string) => void;
};

const spring = { damping: 20, stiffness: 260 };

export function SearchBar({
  placeholder = 'Search services...',
  onSubmit,
}: Props) {
  const [value, setValue] = useState('');
  const focused = useSharedValue(0);

  const shellStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + focused.value * 0.02 }],
  }));

  const onFocus = useCallback(() => {
    focused.value = withSpring(1, spring);
  }, [focused]);

  const onBlur = useCallback(() => {
    focused.value = withSpring(0, spring);
  }, [focused]);

  return (
    <Animated.View style={[styles.outer, shellStyle]}>
      <View style={styles.row}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.icon} />
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={() => onSubmit?.(value)}
          onFocus={onFocus}
          onBlur={onBlur}
          selectionColor={colors.accentBlue}
        />
        {value.length > 0 ? (
          <Pressable
            onPress={() => setValue('')}
            hitSlop={10}
            accessibilityLabel="Clear search"
          >
            <Ionicons name="close-circle" size={20} color={colors.textTertiary} />
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: radius.button,
    backgroundColor: colors.surfaceMuted,
    height: 52,
    paddingHorizontal: spacing.md,
    ...shadows.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
  },
  icon: {
    marginRight: gs.sm,
    opacity: 0.95,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    paddingVertical: 4,
  },
});
