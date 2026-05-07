import { memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Button } from '../../../components/ui';
import { colors, radius } from '../../../constants/theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const AuthButton = memo(function AuthButton({ title, onPress, variant = 'primary', disabled, loading, style }: Props) {
  return (
    <Button
      title={title}
      onPress={onPress}
      variant={variant}
      disabled={disabled}
      loading={loading}
      style={[styles.btn, variant === 'primary' && styles.primary, style]}
    />
  );
});

const styles = StyleSheet.create({
  btn: {
    minHeight: 54,
    borderRadius: radius.button,
  },
  primary: {
    backgroundColor: colors.primary,
  },
});

