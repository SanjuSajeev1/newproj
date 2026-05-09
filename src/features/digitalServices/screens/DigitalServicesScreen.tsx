import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../../shell/navigation/types';
import { gs } from '../../home/constants/glassTheme';
import { CategoryHero } from '../../services/components/CategoryHero';
import { SubCategorySection } from '../../services/components/SubCategorySection';
import { SERVICE_CATALOG } from '../../services/data/serviceCatalog';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'DigitalServices'>;

const cfg = SERVICE_CATALOG.digital;

const DEVELOPMENT = cfg.subcategories.find((s) => s.id === 'digital_development')!.items;
const MARKETING = cfg.subcategories.find((s) => s.id === 'digital_marketing')!.items;

export function DigitalServicesScreen() {
  const navigation = useNavigation<Nav>();

  const openService = useCallback(
    (serviceName: string) => {
      navigation.navigate('Search', {
        screen: 'ProviderListing',
        params: { serviceName, initialChip: 'Tech', initialQuery: '' },
      });
    },
    [navigation],
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <CategoryHero
        title="Digital Services"
        subtitle={cfg.heroSubtitle}
        imageUrl={cfg.heroImageUrl}
      />

      <View style={styles.sections}>
        <SubCategorySection
          title="Development"
          items={DEVELOPMENT}
          onPressItem={openService}
          onViewAll={() => navigation.navigate('SubCategoryFull', { main: 'digital', sub: 'digital_development' })}
        />
        <SubCategorySection
          title="Marketing"
          items={MARKETING}
          onPressItem={openService}
          onViewAll={() => navigation.navigate('SubCategoryFull', { main: 'digital', sub: 'digital_marketing' })}
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

