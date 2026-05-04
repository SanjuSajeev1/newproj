import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../../constants/theme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function InputField({ label, error, containerStyle, style, ...rest }: Props) {
  return (
    <View style={[styles.wrap, containerStyle]}>
      {label ? (
        <Text style={styles.label} accessibilityRole="header">
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...rest}
      />
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
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.button,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.body.fontSize,
    fontWeight: '400',
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    minHeight: 48,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  error: {
    marginTop: spacing.xs,
    fontSize: 12,
    fontWeight: '500',
    color: '#DC2626',
  },
});
