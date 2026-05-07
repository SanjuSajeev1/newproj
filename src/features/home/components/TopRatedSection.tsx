import { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { gs } from '../constants/glassTheme';
import type { HomeDiscoveryProvider } from '../data/homeDashboardMock';
import { useGlassPressScale } from './glass/useGlassPressScale';

type Props = {
  title?: string;
  data: HomeDiscoveryProvider[];
  onPressProvider: (providerId: string) => void;
};

function TopRatedCard({
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
      accessibilityLabel={`${item.name}, ${item.category}`}
      style={styles.cardPress}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.category} numberOfLines={1}>
            {item.category}
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.priceText}>From ₹{item.startingPrice}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export const TopRatedSection = memo(function TopRatedSection({
  title = 'Top Rated Professionals',
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
          <TopRatedCard key={p.id} item={p} onPress={() => onPressProvider(p.id)} />
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
    width: 252,
  },
  card: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 132,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    paddingHorizontal: gs.md,
    paddingVertical: gs.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: gs.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: gs.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  priceText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2563EB',
  },
});

