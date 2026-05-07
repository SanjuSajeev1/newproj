import { memo, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { gs } from '../constants/glassTheme';
import type { HomeServiceCategory } from '../data/homeDashboardMock';
import { useGlassPressScale } from './glass/useGlassPressScale';

type Props = {
  categories: HomeServiceCategory[]; // expects: events, arts-creative, digital-services, beauty-styling
  onPressEvents: () => void;
  onPressArtsCreative: () => void;
  onPressDigitalServices: () => void;
  onPressBeautyStyling: () => void;
};

function EditorialCard({
  title,
  subtitle,
  imageUrl,
  height,
  variant,
  width,
  onPress,
}: {
  title: string;
  subtitle?: string;
  imageUrl: string;
  height: number;
  variant: 'hero' | 'small';
  width: number | string;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.96);
  const titleSize = variant === 'hero' ? 28 : 18;
  const subLines = variant === 'hero' ? 2 : 1;
  const padX = variant === 'hero' ? gs.lg : gs.md;
  const padY = variant === 'hero' ? gs.lg : gs.md;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={{ width }}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <ImageBackground source={{ uri: imageUrl }} style={[styles.bg, { height }]} resizeMode="cover">
          <LinearGradient
            colors={
              variant === 'hero'
                ? ['rgba(2,6,23,0.02)', 'rgba(2,6,23,0.40)', 'rgba(2,6,23,0.86)']
                : ['rgba(2,6,23,0.06)', 'rgba(2,6,23,0.44)', 'rgba(2,6,23,0.84)']
            }
            locations={[0, 0.58, 1]}
            start={{ x: 0.25, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.content, { paddingHorizontal: padX, paddingVertical: padY }]}>
            <Text style={[styles.title, { fontSize: titleSize }]} numberOfLines={1}>
              {title}
            </Text>
            {subtitle ? (
              <Text style={styles.subtitle} numberOfLines={subLines}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
}

export const OurServicesSection = memo(function OurServicesSection({
  categories,
  onPressEvents,
  onPressArtsCreative,
  onPressDigitalServices,
  onPressBeautyStyling,
}: Props) {
  const { width: winW } = useWindowDimensions();

  const c = useMemo(() => {
    const byId = new Map(categories.map((x) => [x.id, x] as const));
    return {
      events: byId.get('events')!,
      arts: byId.get('arts-creative')!,
      digital: byId.get('digital-services')!,
      beauty: byId.get('beauty-styling')!,
    };
  }, [categories]);

  const gap = gs.md;
  const available = winW - gs.md * 2;
  const half = (available - gap) / 2;

  return (
    <View style={styles.shell}>
      <Text style={styles.sectionTitle}>Our Services</Text>

      <Animated.View entering={FadeInDown.duration(420).springify().damping(16)} style={styles.stack}>
        <EditorialCard
          title={c.events.title}
          subtitle={c.events.subtitle}
          imageUrl={c.events.imageUrl}
          height={212}
          variant="hero"
          width="100%"
          onPress={onPressEvents}
        />

        <View style={[styles.row, { gap }]}>
          <EditorialCard
            title={c.arts.title}
            subtitle={c.arts.subtitle}
            imageUrl={c.arts.imageUrl}
            height={156}
            variant="small"
            width={half}
            onPress={onPressArtsCreative}
          />
          <EditorialCard
            title={c.digital.title}
            subtitle={c.digital.subtitle}
            imageUrl={c.digital.imageUrl}
            height={156}
            variant="small"
            width={half}
            onPress={onPressDigitalServices}
          />
        </View>

        <EditorialCard
          title={c.beauty.title}
          subtitle={c.beauty.subtitle}
          imageUrl={c.beauty.imageUrl}
          height={204}
          variant="hero"
          width="100%"
          onPress={onPressBeautyStyling}
        />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  shell: {
    marginHorizontal: -gs.md,
    paddingHorizontal: gs.md,
    paddingTop: gs.md,
    paddingBottom: gs.md,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: gs.md,
    letterSpacing: -0.4,
  },
  stack: {
    gap: gs.md,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#0B1220',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 6,
  },
  bg: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  content: {
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 20,
  },
});

