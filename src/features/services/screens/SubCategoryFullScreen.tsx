import { useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../../../constants/theme';
import { MOCK_PROVIDERS } from '../../../constants/mockData';
import type { SearchStackParamList } from '../../../shell/navigation/types';
import type { HomeStackParamList } from '../../../shell/navigation/types';
import { useGlassPressScale } from '../../home/components/glass/useGlassPressScale';
import { getSubCategory, SERVICE_CATALOG } from '../data/serviceCatalog';
import Animated from 'react-native-reanimated';
import { ProviderCard } from '../../search/components/ProviderCard';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'SubCategoryFull'>;

function ServiceTile({
  name,
  imageUrl,
  onPress,
}: {
  name: string;
  imageUrl: string;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.96);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={name}
      style={styles.tilePress}
    >
      <Animated.View style={[styles.tile, animatedStyle]}>
        <ImageBackground source={{ uri: imageUrl }} style={styles.tileBg} resizeMode="cover">
          <LinearGradient
            colors={['rgba(2,6,23,0.06)', 'rgba(2,6,23,0.44)', 'rgba(2,6,23,0.86)']}
            locations={[0, 0.62, 1]}
            start={{ x: 0.25, y: 0 }}
            end={{ x: 0.55, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.tileLabelWrap}>
            <Text style={styles.tileLabel} numberOfLines={2}>
              {name}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
}

export function SubCategoryFullScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProp<HomeStackParamList, 'SubCategoryFull'>>();

  const sub = useMemo(() => getSubCategory(route.params.main, route.params.sub), [route.params.main, route.params.sub]);
  const hero = SERVICE_CATALOG[route.params.main].heroImageUrl;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: sub.title,
      headerStyle: { backgroundColor: '#FFFFFF' },
      headerShadowVisible: false,
    });
  }, [navigation, sub.title]);

  const list = sub.items;

  const topProviders = useMemo(() => {
    const serviceNames = new Set(sub.items.map((s) => s.name.toLowerCase()));
    const matches = MOCK_PROVIDERS.filter((p) => {
      const tags = p.services?.map((s) => s.toLowerCase()) ?? [];
      return tags.some((t) => serviceNames.has(t));
    });
    matches.sort((a, b) => b.rating - a.rating);
    return matches.slice(0, 3);
  }, [sub.items]);

  const openProviderListing = useCallback(
    (serviceName: string) => {
      const tab = navigation.getParent();
      if (!tab) return;
      const chip = sub.providerListingChip;
      tab.navigate(
        'SearchTab' as never,
        {
          screen: 'ProviderListing',
          params: chip ? ({ serviceName, initialChip: chip, initialQuery: '' } satisfies SearchStackParamList['ProviderListing']) : ({ serviceName, initialQuery: '' } satisfies SearchStackParamList['ProviderListing']),
        } as never,
      );
    },
    [navigation, sub.providerListingChip],
  );

  const renderItem: ListRenderItem<(typeof list)[number]> = useCallback(
    ({ item }) => (
      <ServiceTile name={item.name} imageUrl={item.imageUrl} onPress={() => openProviderListing(item.name)} />
    ),
    [openProviderListing],
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.colWrap}
        ItemSeparatorComponent={() => <View style={styles.rowGap} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{sub.title}</Text>
            <Text style={styles.count}>{list.length} services</Text>
          </View>
        }
        ListFooterComponent={
          topProviders.length > 0 ? (
            <View style={styles.providersBlock}>
              <Text style={styles.providersTitle}>Top providers</Text>
              <View style={styles.providersList}>
                {topProviders.map((p, i) => (
                  <ProviderCard
                    key={p.id}
                    item={p}
                    index={i}
                    onPress={() => {
                      const tab = navigation.getParent();
                      if (!tab) return;
                      tab.navigate(
                        'SearchTab' as never,
                        { screen: 'ProviderProfile', params: { providerId: p.id } } as never,
                      );
                    }}
                  />
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.footerSpacer} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    ...typography.title,
    fontSize: 20,
    marginBottom: 6,
  },
  count: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl + spacing.lg,
  },
  colWrap: {
    gap: spacing.md,
  },
  rowGap: {
    height: spacing.md,
  },
  tilePress: {
    flex: 1,
  },
  tile: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0B1220',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 18,
    elevation: 5,
  },
  tileBg: {
    width: '100%',
    height: 168,
    justifyContent: 'flex-end',
  },
  tileLabelWrap: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    paddingTop: spacing.md,
  },
  tileLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.1,
    lineHeight: 18,
  },
  empty: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  emptyTitle: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
  emptySub: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  providersBlock: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  providersTitle: {
    ...typography.title,
    fontSize: 18,
    marginBottom: spacing.sm,
  },
  providersList: {
    gap: spacing.md,
  },
  footerSpacer: {
    height: spacing.xl,
  },
});

