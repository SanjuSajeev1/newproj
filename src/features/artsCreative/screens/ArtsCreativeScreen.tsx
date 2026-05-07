import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList, SearchStackParamList } from '../../../shell/navigation/types';
import { gs } from '../../home/constants/glassTheme';
import { CategoryHero } from '../../services/components/CategoryHero';
import { SubCategorySection } from '../../services/components/SubCategorySection';
import { SERVICE_CATALOG } from '../../services/data/serviceCatalog';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'ArtsCreative'>;

const cfg = SERVICE_CATALOG.arts;

const PERFORMING_ARTS = cfg.subcategories.find((s) => s.id === 'arts_performing')!.items;
const CREATIVE_DESIGN = cfg.subcategories.find((s) => s.id === 'arts_design')!.items;

export function ArtsCreativeScreen() {
  const navigation = useNavigation<Nav>();

  const openService = useCallback(
    (serviceName: string) => {
      const tab = navigation.getParent();
      if (!tab) return;
      tab.navigate(
        'SearchTab' as never,
        {
          screen: 'ProviderListing',
          params: { serviceName, initialQuery: '' },
        } as never,
      );
    },
    [navigation],
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <CategoryHero
        title="Arts & Creative"
        subtitle="Performers and creators for shoots, shows, brands, and storytelling."
        imageUrl={cfg.heroImageUrl}
      />

      <View style={styles.sections}>
        <SubCategorySection
          title="Performing Arts"
          items={PERFORMING_ARTS}
          onPressItem={openService}
          onViewAll={() => navigation.navigate('SubCategoryFull', { main: 'arts', sub: 'arts_performing' })}
        />
        <SubCategorySection
          title="Creative Design"
          items={CREATIVE_DESIGN}
          onPressItem={openService}
          onViewAll={() => navigation.navigate('SubCategoryFull', { main: 'arts', sub: 'arts_design' })}
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

