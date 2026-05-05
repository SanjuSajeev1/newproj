import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { gs } from '../../constants/glassTheme';

type Props = {
  children: ReactNode;
  style?: object;
  /** Optional reanimated wrapper style (e.g. press scale). */
  animatedStyle?: object;
};

export function GlassCard({ children, style, animatedStyle }: Props) {
  const body = (
    <View style={[styles.wrap, style]}>
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inner: {
    padding: gs.md,
    zIndex: 1,
  },
});
