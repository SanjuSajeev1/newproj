import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useAuthStore } from "../../../store/authStore";
import { HomeStackParamList } from "../../../shell/navigation/types";
import { LocationBottomSheet } from "../components/glass";
import { StickyHomeHeader } from "../components/StickyHomeHeader";
import type { InlineServiceTabId } from "../components/InlineServiceTabs";
import { radius, shadows } from "../../../constants/theme";
import { gs } from "../constants/glassTheme";
import { ServiceDiscoveryLayout } from "../components/ServiceDiscoveryLayout";
import { TopRatedSection } from "../components/TopRatedSection";
import { TrendingSection } from "../components/TrendingSection";
import {
  HOME_HERO_SLIDES,
  HOME_SERVICE_CATEGORIES,
} from "../data/homeDashboardMock";
import {
  getAllArtistsRailForHome,
  getNearMeArtistsForHome,
  getTopRatedArtistsForHome,
} from "../data/homeProviderRails";

type Nav = NativeStackNavigationProp<HomeStackParamList, "HomeMain">;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const [location, setLocation] = useState("Bangalore");
  const [showLocationSheet, setShowLocationSheet] = useState(false);
  const [tab, setTab] = useState<InlineServiceTabId>("events");
  const scrollY = useSharedValue(0);

  const HEADER_EXPANDED = 224;
  const HEADER_COLLAPSED = 176;
  const LOCATION_OPTIONS = [
    "Bangalore",
    "Koramangala",
    "Indiranagar",
    "HSR Layout",
    "Whitefield",
  ];

  const firstName = useMemo(() => {
    const raw = user?.name?.trim().split(/\s+/)[0];
    return raw && raw.length > 0 ? raw : "Sanju";
  }, [user?.name]);

  const activeServiceImageSource = useMemo(() => {
    const match = HOME_SERVICE_CATEGORIES.find((c) => c.id === tab);
    return match?.imageUrl ? { uri: match.imageUrl } : undefined;
  }, [tab]);

  const tryOpenSearchTab = useCallback(() => {
    navigation.navigate("Search", { screen: "SearchMain" });
  }, [navigation]);

  const openProfile = useCallback(() => {
    navigation.navigate("Profile", { screen: "ProfileMain" });
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

  const onTabChange = useCallback(
    (next: InlineServiceTabId) => {
      setTab(next);
    },
    [setTab],
  );

  const topRatedArtists = useMemo(() => getTopRatedArtistsForHome(), []);
  const nearMeArtists = useMemo(
    () => getNearMeArtistsForHome(location),
    [location],
  );
  const allArtistsRail = useMemo(() => getAllArtistsRailForHome(), []);

  const openProvider = useCallback(
    (providerId: string) => {
      navigation.navigate("Search", {
        screen: "ProviderProfile",
        params: { providerId },
      });
    },
    [navigation],
  );

  return (
    <View style={styles.bg}>
      <StatusBar style="dark" />

      <StickyHomeHeader
        scrollY={scrollY}
        firstName={firstName}
        location={location}
        headerBackgroundUri={
          activeServiceImageSource?.uri ?? HOME_HERO_SLIDES[0]?.imageUrl ?? ""
        }
        tab={tab}
        onTabChange={onTabChange}
        onLocationPress={() => setShowLocationSheet(true)}
        onProfilePress={openProfile}
        onSearchSubmit={onSearchSubmit}
        expandedHeight={HEADER_EXPANDED}
        collapsedHeight={HEADER_COLLAPSED}
      />

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: HEADER_EXPANDED + insets.top,
            paddingBottom: insets.bottom + gs.xl + 8,
          },
        ]}
      >
        <View style={styles.discoverySheet}>
          <ServiceDiscoveryLayout tab={tab} />
          <View style={styles.providerRails}>
            <TopRatedSection
              title="Top rated artists"
              data={topRatedArtists}
              onPressProvider={openProvider}
            />
            <TrendingSection
              title="Near me"
              badgeText={null}
              data={nearMeArtists}
              onPressProvider={openProvider}
            />
            <TopRatedSection
              title="All"
              data={allArtistsRail}
              onPressProvider={openProvider}
            />
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

const SHEET = "#FAFAFB";

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#F6F7F9",
  },
  scrollContent: {
    paddingHorizontal: gs.md,
    flexGrow: 1,
  },
  discoverySheet: {
    marginTop: 0,
    marginHorizontal: -gs.md,
    backgroundColor: SHEET,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    overflow: "hidden",
    paddingTop: gs.xxs,
    paddingHorizontal: gs.xxs,
    paddingBottom: gs.md,
    ...shadows.card,
    shadowOpacity: 0.06,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(15,23,42,0.06)",
  },
  providerRails: {
    paddingHorizontal: 0,
    paddingBottom: gs.sm,
  },
});
