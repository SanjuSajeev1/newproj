import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../constants/theme';

const DOT = 7;

function useDotPulse(delayMs: number) {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delayMs),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 360,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 360,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [delayMs, opacity]);

  return opacity;
}

export function TypingIndicator() {
  const o1 = useDotPulse(0);
  const o2 = useDotPulse(180);
  const o3 = useDotPulse(360);

  return (
    <View style={styles.wrap} accessibilityLabel="Typing">
      <View style={styles.bubble}>
        <Animated.View style={[styles.dot, { opacity: o1 }]} />
        <Animated.View style={[styles.dot, { opacity: o2 }]} />
        <Animated.View style={[styles.dot, { opacity: o3 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
    maxWidth: '80%',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: 18,
    borderBottomLeftRadius: 6,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: colors.textSecondary,
  },
});
