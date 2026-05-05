import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useAuthStore } from '../../../store/authStore';
import { HomeStackParamList } from '../../../shell/navigation/types';
import { CategoryCard, FeaturedCard, GlassCard, HomeHeader, LocationBottomSheet } from '../components/glass';
import { gs } from '../constants/glassTheme';
import { HOME_CATEGORIES, HOME_FEATURED_PROVIDERS, HOME_HERO_SLIDES, HOME_UPCOMING_BOOKING } from '../data/homeDashboardMock';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { width: winW } = useWindowDimensions();
  const user = useAuthStore((s) => s.user);
  const [location, setLocation] = useState('Bangalore');
  const [showLocationSheet, setShowLocationSheet] = useState(false);
  const scrollY = useSharedValue(0);

  const HEADER_EXPANDED = 244;
  const HEADER_COLLAPSED = 86;
  const HEADER_RANGE = HEADER_EXPANDED - HEADER_COLLAPSED;
  const SEARCH_TOP_EXPANDED = insets.top + 146;
  const SEARCH_TOP_COLLAPSED = insets.top + 18;
  const SEARCH_DROP = SEARCH_TOP_EXPANDED - SEARCH_TOP_COLLAPSED;
  const LOCATION_OPTIONS = ['Bangalore', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield'];

  const firstName = useMemo(() => {
    const raw = user?.name?.trim().split(/\s+/)[0];
    return raw && raw.length > 0 ? raw : 'Sanju';
  }, [user?.name]);

  const cell = useMemo(() => {
    const horizontalPad = gs.md * 2;
    const colGap = gs.sm;
    return (winW - horizontalPad - colGap) / 2;
  }, [winW]);

  const tryOpenSearchTab = useCallback(() => {
    const tab = navigation.getParent();
    if (!tab) return;
    const state = tab.getState();
    if (state?.routeNames?.includes('SearchTab')) {
      tab.navigate('SearchTab' as never);
    }
  }, [navigation]);

  const onSearchSubmit = useCallback(
    (_text: string) => {
      tryOpenSearchTab();
    },
    [tryOpenSearchTab],
  );

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const h = interpolate(
      scrollY.value,
      [0, HEADER_RANGE],
      [HEADER_EXPANDED + insets.top, HEADER_COLLAPSED + insets.top],
      Extrapolation.CLAMP,
    );
    return { height: h };
  }, [insets.top]);

  const greetingStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, HEADER_RANGE * 0.55], [1, 0], Extrapolation.CLAMP);
    const translateY = interpolate(scrollY.value, [0, HEADER_RANGE], [0, -16], Extrapolation.CLAMP);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const topRowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, HEADER_RANGE * 0.5], [1, 0], Extrapolation.CLAMP);
    const translateY = interpolate(scrollY.value, [0, HEADER_RANGE], [0, -20], Extrapolation.CLAMP);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const stickySearchStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_RANGE],
      [0, -Math.max(0, SEARCH_DROP - 8)],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{ translateY }],
    };
  });

  const headerGlassStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, HEADER_RANGE], [0.7, 1], Extrapolation.CLAMP);
    return { opacity };
  });

  return (
    <View style={styles.bg}>
      <StatusBar style="light" />

      <HomeHeader
        topInset={insets.top}
        searchTop={SEARCH_TOP_EXPANDED}
        headerHeight={HEADER_EXPANDED}
        heroSlides={HOME_HERO_SLIDES}
        firstName={firstName}
        location={location}
        onLocationPress={() => setShowLocationSheet(true)}
        onSearchSubmit={onSearchSubmit}
        containerStyle={headerStyle}
        bgOpacityStyle={headerGlassStyle}
        topRowStyle={topRowStyle}
        greetingStyle={greetingStyle}
        searchStyle={stickySearchStyle}
      />

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: HEADER_EXPANDED + insets.top + gs.sm,
            paddingBottom: insets.bottom + gs.xl + 8,
          },
        ]}
      >
        <View>
          <Text style={styles.sectionLabel}>Browse</Text>
          <View style={styles.grid}>
            <View style={styles.gridRow}>
              {HOME_CATEGORIES.slice(0, 2).map((c) => (
                <CategoryCard
                  key={c.id}
                  label={c.label}
                  icon={c.icon}
                  cut={c.cut}
                  width={cell}
                  height={cell}
                  onPress={tryOpenSearchTab}
                />
              ))}
            </View>
            <View style={[styles.gridRow, styles.gridRowSpaced]}>
              {HOME_CATEGORIES.slice(2, 4).map((c) => (
                <CategoryCard
                  key={c.id}
                  label={c.label}
                  icon={c.icon}
                  cut={c.cut}
                  width={cell}
                  height={cell}
                  onPress={tryOpenSearchTab}
                />
              ))}
            </View>
          </View>
        </View>

        <View>
          <Text style={[styles.sectionLabel, styles.sectionSpaced]}>Featured</Text>
          <Animated.ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            contentContainerStyle={styles.featuredScroll}
          >
            {HOME_FEATURED_PROVIDERS.map((p) => (
              <FeaturedCard
                key={p.id}
                name={p.name}
                rating={p.rating}
                imageUrl={p.imageUrl}
                onPress={tryOpenSearchTab}
              />
            ))}
          </Animated.ScrollView>
        </View>

        {HOME_UPCOMING_BOOKING ? (
          <View>
            <Text style={[styles.sectionLabel, styles.sectionSpaced]}>Upcoming</Text>
            <GlassCard style={styles.upcomingCard}>
              <View style={styles.upcomingTop}>
                <Text style={styles.upcomingProvider}>
                  {HOME_UPCOMING_BOOKING.providerName}
                </Text>
                <View style={styles.statusPill}>
                  <Text style={styles.statusText}>{HOME_UPCOMING_BOOKING.status}</Text>
                </View>
              </View>
              <Text style={styles.upcomingDate}>{HOME_UPCOMING_BOOKING.dateLabel}</Text>
            </GlassCard>
          </View>
        ) : null}
      </Animated.ScrollView>

      <LocationBottomSheet
        visible={showLocationSheet}
        onClose={() => setShowLocationSheet(false)}
        options={LOCATION_OPTIONS}
        selected={location}
        onSelect={(next) => {
          setLocation(next);
          setShowLocationSheet(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: gs.md,
    flexGrow: 1,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: gs.sm,
  },
  sectionSpaced: {
    marginTop: gs.xl,
  },
  grid: {
    marginBottom: gs.sm,
  },
  gridRow: {
    flexDirection: 'row',
    gap: gs.sm,
  },
  gridRowSpaced: {
    marginTop: gs.sm,
  },
  featuredScroll: {
    paddingRight: gs.md,
    paddingBottom: gs.xxs,
  },
  upcomingCard: {
    marginTop: 0,
  },
  upcomingTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: gs.sm,
    marginBottom: gs.xxs,
  },
  upcomingProvider: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  statusPill: {
    paddingHorizontal: gs.sm,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#166534',
  },
  upcomingDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
});
