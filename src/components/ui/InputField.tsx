import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../constants/theme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function InputField({ label, error, containerStyle, style, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const shellStyle = useMemo(() => {
    if (error) return styles.shellError;
    if (focused) return styles.shellFocused;
    return undefined;
  }, [error, focused]);

  return (
    <View style={[styles.wrap, containerStyle]}>
      {label ? (
        <Text style={styles.label} accessibilityRole="header">
          {label}
        </Text>
      ) : null}
      <View style={[styles.shell, shellStyle]}>
        <TextInput
          placeholderTextColor={colors.textTertiary}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[styles.input, style]}
          selectionColor={colors.accentBlue}
          {...rest}
        />
      </View>
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  shell: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.button,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceMuted,
    ...shadows.card,
  },
  shellFocused: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
  },
  shellError: {
    borderColor: colors.danger,
  },
  input: {
    minHeight: 48,
    fontSize: typography.body.fontSize,
    fontWeight: '500',
    color: colors.textPrimary,
    paddingVertical: spacing.sm + 2,
  },
  error: {
    marginTop: spacing.xs,
    fontSize: 12,
    fontWeight: '500',
    color: colors.danger,
  },
});
