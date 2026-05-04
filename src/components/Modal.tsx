import { ReactNode } from 'react';
import { Modal as RNModal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../constants/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
};

export function Modal({ visible, onClose, title, children }: Props) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          {title ? <Text style={[typography.title, styles.title]}>{title}</Text> : null}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
});
