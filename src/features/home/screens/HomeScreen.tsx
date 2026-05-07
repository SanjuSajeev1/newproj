import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
import { MOCK_POSTS } from '../../../constants/mockData';
import { HomeHeader, LocationBottomSheet } from '../components/glass';
import { RecentlyAddedSection } from '../components/RecentlyAddedSection';
import { TopRatedSection } from '../components/TopRatedSection';
import { TrendingSection } from '../components/TrendingSection';
import { FeedPostCard } from '../components/FeedPostCard';
import { OurServicesSection } from '../components/OurServicesSection';
import { gs } from '../constants/glassTheme';
import {
  HOME_HERO_SLIDES,
  HOME_RECENTLY_ADDED,
  HOME_SERVICE_CATEGORIES,
  HOME_TOP_RATED_PROFESSIONALS,
  HOME_TRENDING_NEAR_YOU,
} from '../data/homeDashboardMock';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const isGuest = useAuthStore((s) => s.isGuest);
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

  const openEvents = useCallback(() => {
    navigation.navigate('Events');
  }, [navigation]);

  const openArtsCreative = useCallback(() => {
    navigation.navigate('ArtsCreative');
  }, [navigation]);

  const openDigitalServices = useCallback(() => {
    navigation.navigate('DigitalServices');
  }, [navigation]);

  const openBeautyStyling = useCallback(() => {
    navigation.navigate('BeautyStyling');
  }, [navigation]);

  const tryOpenSearchTab = useCallback(() => {
    const tab = navigation.getParent();
    if (!tab) return;
    const state = tab.getState();
    if (state?.routeNames?.includes('SearchTab')) {
      tab.navigate('SearchTab' as never);
    }
  }, [navigation]);

  const openProviderProfile = useCallback(
    (providerId: string) => {
      const tab = navigation.getParent();
      if (!tab) return;
      tab.navigate(
        'SearchTab' as never,
        {
          screen: 'ProviderProfile',
          params: { providerId },
        } as never,
      );
    },
    [navigation],
  );

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
        <OurServicesSection
          categories={HOME_SERVICE_CATEGORIES}
          onPressEvents={openEvents}
          onPressArtsCreative={openArtsCreative}
          onPressDigitalServices={openDigitalServices}
          onPressBeautyStyling={openBeautyStyling}
        />

        <TopRatedSection data={HOME_TOP_RATED_PROFESSIONALS} onPressProvider={openProviderProfile} />
        <TrendingSection data={HOME_TRENDING_NEAR_YOU} onPressProvider={openProviderProfile} />
        <RecentlyAddedSection data={HOME_RECENTLY_ADDED} onPressProvider={openProviderProfile} />

        <View style={styles.feedSection}>
          <Text style={styles.feedTitle}>Feed</Text>
          <View style={styles.feedList}>
            {MOCK_POSTS.slice(0, 2).map((post) => (
              <FeedPostCard
                key={post.id}
                post={post}
                isGuest={isGuest}
                onInteractionBlocked={() => {}}
              />
            ))}
          </View>
        </View>
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
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: gs.md,
    flexGrow: 1,
  },
  feedSection: {
    marginTop: gs.xl,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
    marginBottom: gs.sm,
  },
  feedList: {
    gap: gs.md,
  },
});
