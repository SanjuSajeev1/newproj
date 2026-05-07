import { LinearGradient } from 'expo-linear-gradient';
import { memo, useCallback, useMemo, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, spacing, typography } from '../../../constants/theme';

export type OnboardingSlide = {
  key: string;
  title: string;
  subtitle: string;
  imageUrl: string;
};

type Props = {
  slides: OnboardingSlide[];
  onDone: () => void;
};

export const OnboardingCarousel = memo(function OnboardingCarousel({ slides, onDone }: Props) {
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const isLast = index === slides.length - 1;
  const heroH = Math.min(820, Math.max(680, height));

  const dots = useMemo(() => slides.map((s) => s.key), [slides]);

  const onSnap = useCallback((i: number) => setIndex(i), []);

  return (
    <View style={{ width, height: heroH }}>
      <Carousel
        width={width}
        height={heroH}
        data={slides}
        onSnapToItem={onSnap}
        loop={false}
        panGestureHandlerProps={{ activeOffsetX: [-12, 12] }}
        renderItem={({ item }) => (
          <ImageBackground source={{ uri: item.imageUrl }} style={styles.slide} resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.72)']}
              locations={[0, 0.55, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.content}>
              <Animated.Text entering={FadeInDown.duration(520)} style={styles.title}>
                {item.title}
              </Animated.Text>
              <Animated.Text entering={FadeInDown.delay(60).duration(520)} style={styles.sub}>
                {item.subtitle}
              </Animated.Text>
            </View>
          </ImageBackground>
        )}
      />

      <View style={styles.bottomOverlay}>
        <View style={styles.dotsRow} accessibilityRole="tablist">
          {dots.map((k, i) => {
            const active = i === index;
            return <View key={k} style={[styles.dot, active && styles.dotActive]} />;
          })}
        </View>

        <Pressable onPress={onDone} accessibilityRole="button" accessibilityLabel={isLast ? 'Get started' : 'Continue'}>
          <View style={styles.cta}>
            <Text style={styles.ctaText}>{isLast ? 'Get started' : 'Continue'}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 116,
  },
  title: {
    ...typography.heading,
    fontSize: 34,
    color: '#FFFFFF',
    letterSpacing: -0.8,
  },
  sub: {
    ...typography.body,
    color: 'rgba(255,255,255,0.85)',
    marginTop: spacing.sm,
    lineHeight: 22,
    maxWidth: 320,
  },
  bottomOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: {
    width: 22,
    backgroundColor: '#FFFFFF',
  },
  cta: {
    height: 54,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    ...typography.body,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.2,
  },
});

