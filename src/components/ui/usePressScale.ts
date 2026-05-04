import { useCallback, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

const SCALE_DOWN = 0.97;

export function usePressScale(disabled: boolean) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: SCALE_DOWN,
      useNativeDriver: true,
      friction: 5,
      tension: 300,
    }).start();
  }, [disabled, scale]);

  const onPressOut = useCallback(() => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 300,
    }).start();
  }, [disabled, scale]);

  const animatedStyle: ViewStyle = {
    transform: [{ scale }],
  };

  return { animatedStyle, onPressIn, onPressOut };
}
