import { useEffect, useRef } from 'react';
import { Animated, DimensionValue, StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';

type Props = {
  width?: DimensionValue;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export function SkeletonBlock({ width = '100%', height = 16, style }: Props) {
  const opacity = useRef(new Animated.Value(0.38)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.92,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.38,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View style={[styles.track, { width }, style]} accessibilityLabel="Loading">
      <Animated.View style={[styles.fill, { height, opacity }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    overflow: 'hidden',
    borderRadius: radius.image,
  },
  fill: {
    width: '100%',
    borderRadius: radius.image,
    backgroundColor: colors.border,
  },
});
