import { memo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { gs } from '../constants/glassTheme';
import type { HomeDiscoveryProvider } from '../data/homeDashboardMock';
import { useGlassPressScale } from './glass/useGlassPressScale';

type Props = {
  title?: string;
  data: HomeDiscoveryProvider[];
  onPressProvider: (providerId: string) => void;
};

function TrendingCard({
  item,
  onPress,
}: {
  item: HomeDiscoveryProvider;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.96);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, trending near ${item.location}`}
      style={styles.cardPress}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <ImageBackground source={{ uri: item.imageUrl }} style={styles.bg} resizeMode="cover">
          <LinearGradient
            colors={['rgba(2,6,23,0.10)', 'rgba(2,6,23,0.45)', 'rgba(2,6,23,0.82)']}
            locations={[0, 0.55, 1]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.overlay}
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Trending</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.location} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
}

export const TrendingSection = memo(function TrendingSection({
  title = 'Trending Near You',
  data,
  onPressProvider,
}: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        contentContainerStyle={styles.row}
      >
        {data.map((p) => (
          <TrendingCard key={p.id} item={p} onPress={() => onPressProvider(p.id)} />
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  section: {
    marginTop: gs.xl,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
    marginBottom: gs.sm,
  },
  row: {
    paddingRight: gs.md,
    gap: gs.sm,
  },
  cardPress: {
    width: 208,
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0B1220',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  bg: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  badge: {
    position: 'absolute',
    top: gs.sm,
    left: gs.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  content: {
    paddingHorizontal: gs.md,
    paddingBottom: gs.md,
  },
  name: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    marginBottom: 3,
  },
  location: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.86)',
  },
});

