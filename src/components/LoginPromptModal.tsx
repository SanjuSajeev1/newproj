import { StyleSheet, Text } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';
import { useAuthStore } from '../store/authStore';
import { Button } from './Button';
import { Modal } from './Modal';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export function LoginPromptModal({
  visible,
  onClose,
  title = 'Login required',
  message = 'Create an account or sign in to use this feature.',
}: Props) {
  const beginLogin = useAuthStore((s) => s.beginLogin);

  const goLogin = () => {
    onClose();
    beginLogin();
  };

  return (
    <Modal visible={visible} onClose={onClose} title={title}>
      <Text style={[typography.body, styles.message]}>{message}</Text>
      <Button title="Login / Sign up" onPress={goLogin} />
      <Button title="Not now" variant="secondary" onPress={onClose} style={styles.secondary} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  message: {
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  secondary: {
    marginTop: spacing.sm,
  },
});
