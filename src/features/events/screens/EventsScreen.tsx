import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { gs } from '../../home/constants/glassTheme';
import type { HomeStackParamList, SearchStackParamList } from '../../../shell/navigation/types';
import { CategoryHero } from '../../services/components/CategoryHero';
import { SubCategorySection } from '../../services/components/SubCategorySection';
import { SERVICE_CATALOG } from '../../services/data/serviceCatalog';

type HomeNav = NativeStackNavigationProp<HomeStackParamList, 'Events'>;

const cfg = SERVICE_CATALOG.events;

const MUSIC_ENTERTAINMENT = [
  { id: 'ev-dj', name: 'DJ', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=85' },
  { id: 'ev-live-band', name: 'Live Band', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=85' },
  { id: 'ev-singer', name: 'Singer', imageUrl: 'https://images.unsplash.com/photo-1520975691309-5d3cfd9b0f0b?w=1200&q=85' },
  { id: 'ev-rapper', name: 'Rapper', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=85' },
  { id: 'ev-musician', name: 'Musician', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=85' },
  { id: 'ev-instrumentalist', name: 'Instrumentalist', imageUrl: 'https://images.unsplash.com/photo-1521334726092-b509a19597c3?w=1200&q=85' },
  { id: 'ev-sound', name: 'Sound Engineer', imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=85' },
  { id: 'ev-karaoke', name: 'Karaoke Host', imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&q=85' },
  { id: 'ev-mc', name: 'Anchor / MC', imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85' },
  { id: 'ev-standup', name: 'Stand-up Comedian', imageUrl: 'https://images.unsplash.com/photo-1520975693411-bf55f4a10b57?w=1200&q=85' },
  { id: 'ev-magician', name: 'Magician', imageUrl: 'https://images.unsplash.com/photo-1520976004341-6a4a8b52d32a?w=1200&q=85' },
  { id: 'ev-dancer', name: 'Dancer', imageUrl: 'https://images.unsplash.com/photo-1520975691309-5d3cfd9b0f0b?w=1200&q=85' },
  { id: 'ev-dance-crew', name: 'Dance Crew', imageUrl: 'https://images.unsplash.com/photo-1520975693411-bf55f4a10b57?w=1200&q=85' },
  { id: 'ev-celebrity', name: 'Celebrity Appearance', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85' },
];

const PHOTO_MEDIA = [
  { id: 'ev-photographer', name: 'Photographer', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=85' },
  { id: 'ev-videographer', name: 'Videographer', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=85' },
  { id: 'ev-drone', name: 'Drone Operator', imageUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=1200&q=85' },
  { id: 'ev-editor', name: 'Cinematic Editor', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=85' },
  { id: 'ev-live', name: 'Live Streaming Team', imageUrl: 'https://images.unsplash.com/photo-1520976004341-6a4a8b52d32a?w=1200&q=85' },
  { id: 'ev-booth', name: 'Photo Booth Setup', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=85' },
];

const FOOD_CATERING = [
  { id: 'ev-catering', name: 'Catering Service', imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85' },
  { id: 'ev-chef', name: 'Private Chef', imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1200&q=85' },
  { id: 'ev-bartender', name: 'Bartender', imageUrl: 'https://images.unsplash.com/photo-1520975693411-bf55f4a10b57?w=1200&q=85' },
  { id: 'ev-dessert', name: 'Dessert Counter', imageUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=85' },
  { id: 'ev-cake', name: 'Cake Designer', imageUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1200&q=85' },
  { id: 'ev-beverage', name: 'Beverage Service', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=85' },
  { id: 'ev-food-truck', name: 'Food Truck', imageUrl: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?w=1200&q=85' },
];

const DECOR_SETUP = [
  { id: 'ev-decorator', name: 'Event Decorator', imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85' },
  { id: 'ev-balloons', name: 'Balloon Decor', imageUrl: 'https://images.unsplash.com/photo-1549045337-967927d923c0?w=1200&q=85' },
  { id: 'ev-floral', name: 'Floral Decor', imageUrl: 'https://images.unsplash.com/photo-1524292332709-b33366e086ff?w=1200&q=85' },
  { id: 'ev-stage', name: 'Stage Designer', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85' },
  { id: 'ev-lighting', name: 'Lighting Setup', imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&q=85' },
  { id: 'ev-led', name: 'LED Wall Provider', imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=85' },
  { id: 'ev-wedding-decor', name: 'Wedding Decor', imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85' },
  { id: 'ev-furniture', name: 'Furniture Rental', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=85' },
];

export function EventsScreen() {
  const navigation = useNavigation<HomeNav>();

  const openService = useCallback(
    (serviceName: string) => {
      const tab = navigation.getParent();
      if (!tab) return;
      tab.navigate(
        'SearchTab' as never,
        {
          screen: 'ProviderListing',
          params: {
            serviceName,
            initialChip: 'Events',
            initialQuery: '',
          },
        } as never,
      );
    },
    [navigation],
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <CategoryHero
        title="Events"
        subtitle={cfg.heroSubtitle}
        imageUrl={cfg.heroImageUrl}
      />

      <View style={styles.sections}>
        <SubCategorySection
          title="Music & Entertainment"
          items={MUSIC_ENTERTAINMENT}
          onPressItem={openService}
          onViewAll={() => navigation.navigate('SubCategoryFull', { main: 'events', sub: 'events_music' })}
        />
        <SubCategorySection
          title="Photography & Media"
          items={PHOTO_MEDIA}
          onPressItem={openService}
          onViewAll={() => navigation.navigate('SubCategoryFull', { main: 'events', sub: 'events_media' })}
        />
        <SubCategorySection
          title="Food & Catering"
          items={FOOD_CATERING}
          onPressItem={openService}
          onViewAll={() => navigation.navigate('SubCategoryFull', { main: 'events', sub: 'events_food' })}
        />
        <SubCategorySection
          title="Decoration & Setup"
          items={DECOR_SETUP}
          onPressItem={openService}
          onViewAll={() => navigation.navigate('SubCategoryFull', { main: 'events', sub: 'events_decor' })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: gs.md,
    paddingTop: gs.md,
    paddingBottom: gs.xl + 8,
  },
  sections: {
    paddingTop: gs.xs,
  },
});

