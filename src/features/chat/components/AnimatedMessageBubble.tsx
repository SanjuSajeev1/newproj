import { ReactNode, useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

type Props = {
  children: ReactNode;
  /** When true, skip mount animation (e.g. history + list recycling). */
  skipAnimation?: boolean;
};

export function AnimatedMessageBubble({ children, skipAnimation }: Props) {
  const opacity = useRef(new Animated.Value(skipAnimation ? 1 : 0)).current;
  const translateY = useRef(new Animated.Value(skipAnimation ? 0 : 10)).current;

  useEffect(() => {
    if (skipAnimation) return;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 140,
      }),
    ]).start();
  }, [skipAnimation, opacity, translateY]);

  return (
    <Animated.View style={[styles.wrap, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    maxWidth: '100%',
  },
});
