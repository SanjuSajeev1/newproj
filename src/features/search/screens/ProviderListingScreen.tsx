import { useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../../../constants/theme';
import { MOCK_PROVIDERS, type ServiceProvider } from '../../../constants/mockData';
import { SearchStackParamList } from '../../../shell/navigation/types';
import { ProviderCard } from '../components/ProviderCard';

type Nav = NativeStackNavigationProp<SearchStackParamList, 'ProviderListing'>;

function titleCase(s: string) {
  return s.replace(/\s+/g, ' ').trim();
}

export function ProviderListingScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProp<SearchStackParamList, 'ProviderListing'>>();

  const serviceName = titleCase(route.params.serviceName);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: serviceName,
      headerStyle: { backgroundColor: '#FFFFFF' },
    });
  }, [navigation, serviceName]);

  const list = useMemo(() => {
    const base = [...MOCK_PROVIDERS];
    const needle = serviceName.toLowerCase();

    let out = base.filter((p) => {
      const inServices = p.services?.some((s) => s.toLowerCase().includes(needle)) ?? false;
      const inCategory = p.category.toLowerCase().includes(needle);
      return inServices || inCategory;
    });

    out.sort((a, b) => b.rating - a.rating);

    return out;
  }, [serviceName]);

  const renderItem: ListRenderItem<ServiceProvider> = useCallback(
    ({ item, index }) => (
      <ProviderCard
        item={item}
        index={index}
        onPress={() => navigation.navigate('ProviderProfile', { providerId: item.id })}
      />
    ),
    [navigation],
  );

  const keyExtractor = useCallback((item: ServiceProvider) => item.id, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No providers found</Text>
            <Text style={styles.emptySub}>Try exploring a different service.</Text>
          </View>
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
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl + spacing.lg,
    paddingTop: spacing.md,
  },
  gap: {
    height: spacing.md,
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
});

