import { memo, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import type { HomeDiscoveryProvider } from "../data/homeDashboardMock";
import { TopRatedSection } from "./TopRatedSection";
import { TrendingSection } from "./TrendingSection";
import { RecentlyAddedSection } from "./RecentlyAddedSection";
import { gs } from "../constants/glassTheme";
import { colors } from "../../../constants/theme";

type Props = {
  browseCaption?: string;
  transitionKey: string;
  topRated: HomeDiscoveryProvider[];
  trending: HomeDiscoveryProvider[];
  recent: HomeDiscoveryProvider[];
  onPressProvider: (providerId: string) => void;
};

const SPRING = { damping: 22, stiffness: 300, mass: 0.42 };

function DynamicProviderSectionImpl({
  browseCaption,
  transitionKey,
  topRated,
  trending,
  recent,
  onPressProvider,
}: Props) {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = 0;
    translateY.value = 10;
    opacity.value = withSpring(1, SPRING);
    translateY.value = withSpring(0, SPRING);
  }, [transitionKey, opacity, translateY]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.wrap, fadeStyle]}>
      {browseCaption ? (
        <Text style={styles.hint} numberOfLines={1}>
          Showing · {browseCaption}
        </Text>
      ) : null}
      <TopRatedSection title="Top picks" data={topRated} onPressProvider={onPressProvider} />
      <TrendingSection title="Trending now" data={trending} onPressProvider={onPressProvider} />
      <RecentlyAddedSection title="Just added" data={recent} onPressProvider={onPressProvider} />
    </Animated.View>
  );
}

export const DynamicProviderSection = memo(DynamicProviderSectionImpl);

const styles = StyleSheet.create({
  wrap: {
    marginTop: gs.xl,
  },
  hint: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textTertiary,
    letterSpacing: -0.1,
    marginBottom: gs.md,
    marginTop: 2,
  },
});
