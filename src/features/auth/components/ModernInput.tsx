import { Ionicons } from '@expo/vector-icons';
import { memo, useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import type { KeyboardTypeOptions, StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';

type Props = Omit<TextInputProps, 'style'> & {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  keyboardType?: KeyboardTypeOptions;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ModernInput = memo(function ModernInput({
  value,
  onChangeText,
  placeholder,
  leftIcon = 'call-outline',
  keyboardType,
  containerStyle,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);
  const shellStyle = useMemo(() => (focused ? styles.shellFocused : undefined), [focused]);

  return (
    <View style={[styles.shell, shellStyle, containerStyle]}>
      <Ionicons name={leftIcon} size={18} color={colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        keyboardType={keyboardType}
        returnKeyType="done"
        selectionColor={colors.accentBlue}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        style={styles.input}
        {...rest}
      />
      {value.length > 0 ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={10} accessibilityLabel="Clear">
          <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
        </Pressable>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  shell: {
    minHeight: 54,
    borderRadius: radius.button,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.card,
  },
  shellFocused: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
  },
  input: {
    flex: 1,
    ...typography.body,
    fontWeight: '700',
    paddingVertical: spacing.sm,
  },
});

