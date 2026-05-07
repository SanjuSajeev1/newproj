import { memo } from 'react';
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

function RecentlyAddedCard({
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
      accessibilityLabel={`${item.name}, new`}
      style={styles.cardPress}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
        <View style={styles.textCol}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.newPill}>
              <Text style={styles.newText}>New</Text>
            </View>
          </View>
          <Text style={styles.category} numberOfLines={1}>
            {item.category}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export const RecentlyAddedSection = memo(function RecentlyAddedSection({
  title = 'Recently Added',
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
          <RecentlyAddedCard key={p.id} item={p} onPress={() => onPressProvider(p.id)} />
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
    width: 220,
  },
  card: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    padding: gs.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: gs.sm,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  category: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  newPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  newText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#047857',
    letterSpacing: 0.2,
  },
});

