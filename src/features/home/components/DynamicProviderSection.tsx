import { memo, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import type { HomeDiscoveryProvider } from "../data/homeDashboardMock";
import { TopRatedSection } from "./TopRatedSection";
import { TrendingSection } from "./TrendingSection";
import { RecentlyAddedSection } from "./RecentlyAddedSection";
import { gs } from "../constants/glassTheme";

type Props = {
  contextLabel: string;
  topRated: HomeDiscoveryProvider[];
  trending: HomeDiscoveryProvider[];
  recent: HomeDiscoveryProvider[];
  onPressProvider: (providerId: string) => void;
};

const timing = { duration: 220 };

function DynamicProviderSectionImpl({ contextLabel, topRated, trending, recent, onPressProvider }: Props) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = 0;
    opacity.value = withTiming(1, timing);
  }, [contextLabel, opacity]);

  const fadeStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={[styles.wrap, fadeStyle]}>
      <TopRatedSection title={`Top Rated ${contextLabel}`} data={topRated} onPressProvider={onPressProvider} />
      <TrendingSection title={`Trending ${contextLabel}`} data={trending} onPressProvider={onPressProvider} />
      <RecentlyAddedSection title={`New in ${contextLabel}`} data={recent} onPressProvider={onPressProvider} />
    </Animated.View>
  );
}

export const DynamicProviderSection = memo(DynamicProviderSectionImpl);

const styles = StyleSheet.create({
  wrap: {
    marginTop: gs.sm,
  },
});

