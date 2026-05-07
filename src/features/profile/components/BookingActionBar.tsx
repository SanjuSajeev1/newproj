import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Button } from '../../../components/ui';
import { colors, radius, shadows, spacing } from '../../../constants/theme';

type Props = {
  bottomInset: number;
  tabBarHeight?: number;
  onMessage: () => void;
  onBookNow: () => void;
};

export const BookingActionBar = memo(function BookingActionBar({
  bottomInset,
  tabBarHeight = 0,
  onMessage,
  onBookNow,
}: Props) {
  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          bottom: tabBarHeight,
          paddingBottom: Math.max(12, bottomInset),
        },
      ]}
    >
      <View style={styles.inner}>
        <Button title="Message" onPress={onMessage} variant="secondary" style={styles.msgBtn} />
        <Button title="Book Now" onPress={onBookNow} style={styles.bookBtn} />
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingTop: 12,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  msgBtn: {
    flex: 1,
    borderRadius: radius.button,
  },
  bookBtn: {
    flex: 1.2,
    borderRadius: radius.button,
  },
});

