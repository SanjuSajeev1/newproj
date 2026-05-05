import { memo, useCallback, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { interpolate, type SharedValue } from 'react-native-reanimated';
import type { HomeHeroSlide } from '../../data/homeDashboardMock';

type Props = {
  data: HomeHeroSlide[];
  autoPlay?: boolean;
};

const CARD_HEIGHT = 160;
const RADIUS = 16;

export const HeroCarousel = memo(function HeroCarousel({
  data,
  autoPlay = true,
}: Props) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselWidth = useMemo(() => width - 32, [width]);
  const itemWidth = useMemo(() => carouselWidth * 0.94, [carouselWidth]);

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: HomeHeroSlide;
      index: number;
      animationValue: SharedValue<number>;
    }) => {
      return (
        <View style={styles.itemWrap}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
          <View style={styles.overlay} />
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
        </View>
      );
    },
    [],
  );

  return (
    <View style={styles.wrap}>
      <Carousel
        loop
        width={itemWidth}
        height={CARD_HEIGHT}
        data={data}
        autoPlay={autoPlay}
        autoPlayInterval={3000}
        enabled
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 46,
          parallaxAdjacentItemScale: 0.9,
        }}
        customAnimation={(value) => {
          'worklet';
          return {
            transform: [
              { translateX: interpolate(value, [-1, 0, 1], [-20, 0, 20]) },
              { scale: interpolate(value, [-1, 0, 1], [0.9, 1, 0.9]) },
              { rotateZ: `${interpolate(value, [-1, 0, 1], [-4, 0, 4])}deg` },
            ],
            opacity: interpolate(value, [-1, 0, 1], [0.7, 1, 0.7]),
          };
        }}
        onSnapToItem={setActiveIndex}
        renderItem={renderItem}
      />

      <View style={styles.pagination}>
        {data.map((slide, index) => (
          <View key={slide.id} style={[styles.dot, index === activeIndex ? styles.dotActive : styles.dotIdle]} />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
  },
  itemWrap: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: RADIUS,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.28)',
  },
  title: {
    position: 'absolute',
    left: 14,
    bottom: 12,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },
  dot: {
    height: 7,
    borderRadius: 999,
  },
  dotActive: {
    width: 18,
    backgroundColor: '#0F172A',
  },
  dotIdle: {
    width: 7,
    backgroundColor: '#CBD5E1',
  },
});
