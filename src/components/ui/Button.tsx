import { ActivityIndicator, Animated, Pressable, StyleSheet, Text } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';
import { usePressScale } from './usePressScale';

type Variant = 'primary' | 'secondary';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  accessibilityLabel,
}: Props) {
  const isDisabled = disabled || loading;
  const { animatedStyle, onPressIn, onPressOut } = usePressScale(isDisabled);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      onPress={onPress}
      disabled={isDisabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.base,
          variant === 'primary' && styles.primary,
          variant === 'secondary' && styles.secondary,
          isDisabled && styles.disabled,
          animatedStyle,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === 'secondary' ? colors.primary : colors.surface}
          />
        ) : (
          <Text
            style={[
              styles.label,
              variant === 'secondary' && styles.labelSecondary,
              isDisabled && styles.labelDisabled,
            ]}
          >
            {title}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  labelSecondary: {
    color: colors.primary,
  },
  labelDisabled: {
    color: colors.textSecondary,
  },
});
