import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { glass, gs } from '../../constants/glassTheme';

type Props = {
  children: ReactNode;
  style?: object;
  /** Optional reanimated wrapper style (e.g. press scale). */
  animatedStyle?: object;
};

export function GlassCard({ children, style, animatedStyle }: Props) {
  const body = (
    <View style={[styles.wrap, style]}>
      <BlurView
        intensity={glass.blur}
        tint="light"
        style={StyleSheet.absoluteFillObject}
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
      />
      <View style={styles.tint} />
      <View style={styles.inner}>{children}</View>
    </View>
  );

  if (animatedStyle) {
    return <Animated.View style={animatedStyle}>{body}</Animated.View>;
  }

  return body;
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    borderRadius: glass.radius,
    borderWidth: 1,
    borderColor: glass.border,
    overflow: 'hidden',
    backgroundColor: glass.fill,
    shadowColor: glass.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  inner: {
    padding: gs.md,
    zIndex: 1,
  },
});
