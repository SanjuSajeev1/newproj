import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { BottomSheetModal, Button, Card } from '../../../components/ui';
import { MOCK_PROVIDERS, ServiceProvider } from '../../../constants/mockData';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';
import { SearchStackParamList } from '../../../shell/navigation/types';

type Nav = NativeStackNavigationProp<SearchStackParamList, 'SearchMain'>;

const FILTER_CHIPS = ['All', 'Catering', 'DJ', 'Photo', 'Events', 'Home', 'Tech'] as const;
type ChipId = (typeof FILTER_CHIPS)[number];

type SortKey = 'rating' | 'price_asc' | 'price_desc';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'rating', label: 'Top rated' },
  { key: 'price_asc', label: 'Price: low to high' },
  { key: 'price_desc', label: 'Price: high to low' },
];

function SearchResultCard({
  item,
  onPress,
}: {
  item: ServiceProvider;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Card padded={false} style={styles.resultCard}>
        <View style={[styles.cardImage, { backgroundColor: item.imageColor }]}>
          <Ionicons name="image-outline" size={32} color={colors.textSecondary} />
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={15} color="#F59E0B" />
            <Text style={styles.ratingText}>
              {item.rating.toFixed(1)} · {item.reviewCount} reviews
            </Text>
          </View>
          <Text style={styles.priceText}>From ${item.priceFrom}</Text>
        </View>
      </Card>
    </Pressable>
  );
}

export function SearchScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProp<SearchStackParamList, 'SearchMain'>>();
  const initialQuery = route.params?.initialQuery ?? '';
  const initialChip = route.params?.initialChip;
  const safeInitialChip: ChipId =
    initialChip && (FILTER_CHIPS as readonly string[]).includes(initialChip) ? (initialChip as ChipId) : 'All';

  const [query, setQuery] = useState(initialQuery);
  const [chip, setChip] = useState<ChipId>(safeInitialChip);
  const [sortBy, setSortBy] = useState<SortKey>('rating');
  const [draftSort, setDraftSort] = useState<SortKey>('rating');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const runFocusAnim = useCallback(
    (to: number) => {
      Animated.spring(focusAnim, {
        toValue: to,
        useNativeDriver: true,
        friction: 7,
        tension: 120,
      }).start();
    },
    [focusAnim],
  );

  const onSearchFocus = useCallback(() => {
    setInputFocused(true);
    runFocusAnim(1);
  }, [runFocusAnim]);

  const onSearchBlur = useCallback(() => {
    setInputFocused(false);
    runFocusAnim(0);
  }, [runFocusAnim]);

  const openFilterSheet = useCallback(() => {
    setDraftSort(sortBy);
    setFilterSheetOpen(true);
  }, [sortBy]);

  const closeFilterSheet = useCallback(() => {
    setFilterSheetOpen(false);
  }, []);

  const applyFilters = useCallback(() => {
    setSortBy(draftSort);
    setFilterSheetOpen(false);
  }, [draftSort]);

  const scale = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.035],
  });

  const filtered = useMemo(() => {
    let list = [...MOCK_PROVIDERS];
    if (chip !== 'All') {
      list = list.filter((p) => p.category === chip);
    }
    const q = query.trim().toLowerCase();
    if (q.length > 0) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      );
    }
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price_asc') {
      list.sort((a, b) => a.priceFrom - b.priceFrom);
    } else {
      list.sort((a, b) => b.priceFrom - a.priceFrom);
    }
    return list;
  }, [chip, query, sortBy]);

  const renderItem: ListRenderItem<ServiceProvider> = useCallback(
    ({ item }) => (
      <SearchResultCard
        item={item}
        onPress={() => navigation.navigate('ProviderProfile', { providerId: item.id })}
      />
    ),
    [navigation],
  );

  const keyExtractor = useCallback((item: ServiceProvider) => item.id, []);

  return (
    <View style={styles.screen}>
      <View style={styles.topPad}>
        <View style={styles.searchRow}>
          <Animated.View style={[styles.searchGrow, { transform: [{ scale }] }]}>
            <View style={[styles.searchShell, inputFocused && styles.searchShellFocused]}>
              <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                onFocus={onSearchFocus}
                onBlur={onSearchBlur}
                placeholder="Search services or providers"
                placeholderTextColor={colors.textSecondary}
                style={styles.searchInput}
                returnKeyType="search"
              />
            </View>
          </Animated.View>
          <Pressable
            onPress={openFilterSheet}
            style={styles.filterBtn}
            accessibilityRole="button"
            accessibilityLabel="More filters"
          >
            <Ionicons name="options-outline" size={22} color={colors.textPrimary} />
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          decelerationRate="fast"
          nestedScrollEnabled
        >
          {FILTER_CHIPS.map((id) => {
            const selected = chip === id;
            return (
              <Pressable
                key={id}
                onPress={() => setChip(id)}
                style={[styles.chip, selected && styles.chipSelected]}
                accessibilityRole="button"
                accessibilityState={{ selected }}
              >
                <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{id}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.resultsLabel}>Results</Text>
      </View>

      <FlatList
        style={styles.listFlex}
        data={filtered}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.cardGap} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No matches</Text>
            <Text style={styles.emptySub}>Try another category or search term.</Text>
          </View>
        }
      />

      <BottomSheetModal visible={filterSheetOpen} onClose={closeFilterSheet} title="Filters">
        <Text style={styles.sheetSection}>Sort by</Text>
        {SORT_OPTIONS.map((opt) => {
          const active = draftSort === opt.key;
          return (
            <Pressable
              key={opt.key}
              onPress={() => setDraftSort(opt.key)}
              style={[styles.sortRow, active && styles.sortRowActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.sortLabel, active && styles.sortLabelActive]}>{opt.label}</Text>
              {active ? (
                <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
              ) : (
                <View style={styles.sortSpacer} />
              )}
            </Pressable>
          );
        })}
        <View style={styles.sheetActions}>
          <Button title="Apply" onPress={applyFilters} />
          <Button title="Cancel" variant="secondary" onPress={closeFilterSheet} style={styles.sheetCancel} />
        </View>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topPad: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  searchGrow: {
    flex: 1,
    marginRight: spacing.sm,
  },
  searchShell: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    ...shadows.card,
  },
  searchShellFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  sectionLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing.md,
    paddingRight: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  chipLabel: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  chipLabelSelected: {
    color: colors.primary,
  },
  resultsLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  listFlex: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl + spacing.lg,
  },
  cardGap: {
    height: spacing.md,
  },
  resultCard: {
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1.45,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
  },
  cardBody: {
    padding: spacing.md,
  },
  cardName: {
    ...typography.title,
    fontSize: 17,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  ratingText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  priceText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primary,
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
  sheetSection: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.button,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  sortRowActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  sortLabel: {
    ...typography.body,
    flex: 1,
  },
  sortLabelActive: {
    fontWeight: '600',
    color: colors.primary,
  },
  sortSpacer: {
    width: 22,
    height: 22,
  },
  sheetActions: {
    marginTop: spacing.lg,
  },
  sheetCancel: {
    marginTop: spacing.sm,
  },
});
