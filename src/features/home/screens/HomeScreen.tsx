import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useAuthStore } from "../../../store/authStore";
import { HomeStackParamList } from "../../../shell/navigation/types";
import { MOCK_POSTS } from "../../../constants/mockData";
import { LocationBottomSheet } from "../components/glass";
import { FeedPostCard } from "../components/FeedPostCard";
import { StickyHomeHeader } from "../components/StickyHomeHeader";
import {
  InlineServiceTabs,
  type InlineServiceTabId,
} from "../components/InlineServiceTabs";
import { gs } from "../constants/glassTheme";
import { ServiceDiscoveryLayout } from "../components/ServiceDiscoveryLayout";
import {
  HOME_HERO_SLIDES,
  HOME_RECENTLY_ADDED,
  HOME_SERVICE_CATEGORIES,
  HOME_TOP_RATED_PROFESSIONALS,
  HOME_TRENDING_NEAR_YOU,
} from "../data/homeDashboardMock";

type Nav = NativeStackNavigationProp<HomeStackParamList, "HomeMain">;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const isGuest = useAuthStore((s) => s.isGuest);
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

  const filterProviders = useCallback(
    (items: typeof HOME_TOP_RATED_PROFESSIONALS) => {
      const cat = (p: (typeof items)[number]) => p.category.toLowerCase();
      const out =
        tab === "events"
          ? items.filter((p) => cat(p).includes("events"))
          : tab === "arts-creative"
            ? items.filter(
                (p) =>
                  cat(p).includes("arts") ||
                  cat(p).includes("creative") ||
                  cat(p).includes("artist"),
              )
            : tab === "digital-services"
              ? items.filter(
                  (p) =>
                    cat(p).includes("digital") ||
                    cat(p).includes("web") ||
                    cat(p).includes("app"),
                )
              : items.filter(
                  (p) =>
                    cat(p).includes("beauty") ||
                    cat(p).includes("styling") ||
                    cat(p).includes("makeup"),
                );

      return out.length > 0 ? out : items.slice(0, 3);
    },
    [tab],
  );

  const openEvents = useCallback(() => {
    navigation.navigate("Events");
  }, [navigation]);

  const openArtsCreative = useCallback(() => {
    navigation.navigate("ArtsCreative");
  }, [navigation]);

  const openDigitalServices = useCallback(() => {
    navigation.navigate("DigitalServices");
  }, [navigation]);

  const openBeautyStyling = useCallback(() => {
    navigation.navigate("BeautyStyling");
  }, [navigation]);

  const tryOpenSearchTab = useCallback(() => {
    const tab = navigation.getParent();
    if (!tab) return;
    const state = tab.getState();
    if (state?.routeNames?.includes("SearchTab")) {
      tab.navigate("SearchTab" as never);
    }
  }, [navigation]);

  const openProviderProfile = useCallback(
    (providerId: string) => {
      const tab = navigation.getParent();
      if (!tab) return;
      tab.navigate(
        "SearchTab" as never,
        {
          screen: "ProviderProfile",
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

  const onTabChange = useCallback(
    (next: InlineServiceTabId) => {
      setTab(next);
    },
    [setTab],
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
            paddingTop: HEADER_EXPANDED + insets.top + gs.md,
            paddingBottom: insets.bottom + gs.xl + 8,
          },
        ]}
      >
        <View style={styles.sectionBlock}>
          <ServiceDiscoveryLayout
            tab={tab}
            providersTopRated={HOME_TOP_RATED_PROFESSIONALS}
            providersTrending={HOME_TRENDING_NEAR_YOU}
            providersRecent={HOME_RECENTLY_ADDED}
            onPressProvider={openProviderProfile}
          />
        </View>

        {/* provider rails rendered inside ServiceDiscoveryLayout */}

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
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: gs.md,
    flexGrow: 1,
  },
  sectionBlock: {
    marginTop: gs.xl,
  },
  feedSection: {
    marginTop: gs.xl,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.2,
    marginBottom: gs.sm,
  },
  feedList: {
    gap: gs.md,
  },
});
