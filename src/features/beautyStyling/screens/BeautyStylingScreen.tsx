import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList, SearchStackParamList } from '../../../shell/navigation/types';
import { gs } from '../../home/constants/glassTheme';
import { CategoryHero } from '../../services/components/CategoryHero';
import { SubCategorySection } from '../../services/components/SubCategorySection';
import { SERVICE_CATALOG } from '../../services/data/serviceCatalog';

type HomeNav = NativeStackNavigationProp<HomeStackParamList, 'BeautyStyling'>;

const cfg = SERVICE_CATALOG.beauty;
const BRIDAL_BEAUTY = cfg.subcategories.find((s) => s.id === 'beauty_bridal')!;
const FASHION_STYLING = cfg.subcategories.find((s) => s.id === 'beauty_fashion')!;

export function BeautyStylingScreen() {
  const navigation = useNavigation<HomeNav>();

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
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <CategoryHero
        title="Beauty & Styling"
        subtitle={cfg.heroSubtitle}
        imageUrl={cfg.heroImageUrl}
      />

      <View style={styles.sections}>
        <SubCategorySection
          title={BRIDAL_BEAUTY.title}
          items={BRIDAL_BEAUTY.items}
          gradient={BRIDAL_BEAUTY.gradient}
          onPressItem={openService}
          onViewAll={() => navigation.navigate('SubCategoryFull', { main: 'beauty', sub: BRIDAL_BEAUTY.id })}
        />
        <SubCategorySection
          title={FASHION_STYLING.title}
          items={FASHION_STYLING.items}
          gradient={FASHION_STYLING.gradient}
          onPressItem={openService}
          onViewAll={() => navigation.navigate('SubCategoryFull', { main: 'beauty', sub: FASHION_STYLING.id })}
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

