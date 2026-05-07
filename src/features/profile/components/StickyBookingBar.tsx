import { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/ui';
import { colors, radius, shadows, spacing } from '../../../constants/theme';

type Props = {
  bottomInset: number;
  onBookNow: () => void;
  onMessage?: () => void;
  onSave?: () => void;
};

export const StickyBookingBar = memo(function StickyBookingBar({
  bottomInset,
  onBookNow,
  onMessage,
  onSave,
}: Props) {
  return (
    <View style={[styles.wrap, { paddingBottom: bottomInset + spacing.md, paddingTop: spacing.sm }]}>
      <View style={styles.row}>
        {onSave ? (
          <Pressable onPress={onSave} accessibilityRole="button" accessibilityLabel="Save" style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={20} color={colors.textPrimary} />
          </Pressable>
        ) : null}
        {onMessage ? (
          <Pressable onPress={onMessage} accessibilityRole="button" accessibilityLabel="Message" style={styles.iconBtn}>
            <Ionicons name="chatbubble-outline" size={20} color={colors.textPrimary} />
          </Pressable>
        ) : null}
        <Button title="Book Now" onPress={onBookNow} style={styles.book} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  book: {
    flex: 1,
  },
});

