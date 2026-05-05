import { LinearGradient } from 'expo-linear-gradient';
import { memo, useMemo } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import type { HomeHeroSlide } from '../../data/homeDashboardMock';

type Props = {
  data: HomeHeroSlide[];
  height: number;
};

function BackgroundSlide({
  item,
  animationValue,
}: {
  item: HomeHeroSlide;
  animationValue: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationValue.value, [-1, 0, 1], [1.02, 1.05, 1.02], Extrapolation.CLAMP);
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [0.85, 1, 0.85], Extrapolation.CLAMP);
    return {
      transform: [{ scale }],
      opacity,
    };
  }, []);

  return (
    <Animated.View style={[styles.slide, animatedStyle]}>
      <Image source={{ uri: item.imageUrl }} resizeMode="cover" style={styles.image} />
    </Animated.View>
  );
}

export const HeaderBackgroundCarousel = memo(function HeaderBackgroundCarousel({
  data,
  height,
}: Props) {
  const { width } = useWindowDimensions();
  const safeData = useMemo(() => (data.length > 0 ? data : []), [data]);

  if (safeData.length === 0) {
    return <View style={[styles.fallback, { height }]} />;
  }

  return (
    <View style={[styles.wrap, { height }]}>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={3400}
        width={width}
        height={height}
        data={safeData}
        enabled={false}
        scrollAnimationDuration={900}
        renderItem={({ item, animationValue }) => (
          <BackgroundSlide item={item} animationValue={animationValue} />
        )}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.30)', 'rgba(0,0,0,0.50)']}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
  },
  fallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#334155',
  },
  slide: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
