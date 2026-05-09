import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { Avatar } from "../../../components/ui/Avatar";
import { shadows, spacing } from "../../../constants/theme";
import { gs } from "../constants/glassTheme";
import { LocationSelector } from "./glass/LocationSelector";
import { SearchBar } from "./glass/SearchBar";
import {
  InlineServiceTabs,
  type InlineServiceTabId,
} from "./InlineServiceTabs";
import { DynamicHeaderBackground } from "./DynamicHeaderBackground";

const TOP_ROW_HEIGHT = 42;
const SEARCH_HEIGHT = 52;
/** Main tabs (compact + underline) — reserve space so search sits above without overlap. */
const MAIN_TAB_BAND_HEIGHT = 46;
/** Padding from header bottom edge to tabs. */
const HEADER_BOTTOM_INSET = spacing.sm;
/** Space between search bar and tab row. */
const GAP_SEARCH_TO_TABS = 12;
/** How far the search bar shifts down (px) at full header collapse scroll. */
const SEARCH_SCROLL_NUDGE = 8;
/** Bottom corner radius so the sticky header meets the sheet with a slight curve. */
const HEADER_BOTTOM_RADIUS = 14;

type Props = {
  scrollY: SharedValue<number>;
  firstName: string;
  location: string;
  headerBackgroundUri: string;
  tab: InlineServiceTabId;
  onTabChange: (next: InlineServiceTabId) => void;
  onLocationPress: () => void;
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
  onSearchSubmit: (text: string) => void;
  expandedHeight?: number;
  collapsedHeight?: number;
};

function StickyHomeHeaderImpl({
  scrollY,
  firstName,
  location,
  headerBackgroundUri,
  tab,
  onTabChange,
  onLocationPress,
  onNotificationsPress,
  onProfilePress,
  onSearchSubmit,
  expandedHeight = 224,
  collapsedHeight = 176,
}: Props) {
  const insets = useSafeAreaInsets();
  const range = Math.max(1, expandedHeight - collapsedHeight);
  const topInset = insets.top + gs.xxs;

  const containerStyle = useAnimatedStyle(() => {
    const h = interpolate(
      scrollY.value,
      [0, range],
      [expandedHeight + insets.top, collapsedHeight + insets.top],
      Extrapolation.CLAMP,
    );
    const elevated = interpolate(
      scrollY.value,
      [0, 8, 28],
      [0, 0.55, 1],
      Extrapolation.CLAMP,
    );
    return {
      height: h,
      shadowOpacity: (shadows.card.shadowOpacity ?? 0.06) * elevated,
      elevation: 3 * elevated,
    };
  }, [collapsedHeight, expandedHeight, insets.top, range]);

  const topRowStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, range],
      [0, -4],
      Extrapolation.CLAMP,
    );
    return { transform: [{ translateY }] };
  }, [range]);

  const searchScrollStyle = useAnimatedStyle(() => {
    const nudgeY = interpolate(
      scrollY.value,
      [0, range],
      [0, SEARCH_SCROLL_NUDGE],
      Extrapolation.CLAMP,
    );
    return { transform: [{ translateY: nudgeY }] };
  }, [range]);

  const searchBottom =
    HEADER_BOTTOM_INSET + MAIN_TAB_BAND_HEIGHT + GAP_SEARCH_TO_TABS;
  const tabsBottom = HEADER_BOTTOM_INSET;

  return (
    <Animated.View style={[styles.header, containerStyle]}>
      <DynamicHeaderBackground
        uri={headerBackgroundUri}
        scrollY={scrollY}
        expandedHeight={expandedHeight + insets.top}
        collapsedHeight={collapsedHeight + insets.top}
      />

      <View style={styles.inner}>
        <Animated.View
          style={[
            styles.topRowWrap,
            { paddingTop: topInset, paddingHorizontal: spacing.md },
            topRowStyle,
          ]}
        >
          <LocationSelector location={location} onPress={onLocationPress} />

          <View style={styles.rightActions}>
            <Pressable
              onPress={onNotificationsPress}
              style={styles.iconBtn}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color="rgba(255,255,255,0.95)"
              />
            </Pressable>

            <Pressable
              onPress={onProfilePress}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Profile"
            >
              <View style={styles.avatarWrap}>
                <Avatar
                  name={firstName}
                  size={34}
                  backgroundColor="rgba(255,255,255,0.20)"
                  showStoryRing
                />
              </View>
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.searchFloating,
            { bottom: searchBottom },
            searchScrollStyle,
          ]}
        >
          <SearchBar
            onSubmit={onSearchSubmit}
            placeholder="Search DJs, designers, stylists..."
          />
        </Animated.View>

        <View
          style={[styles.tabsBand, { bottom: tabsBottom }]}
          pointerEvents="box-none"
        >
          <InlineServiceTabs
            value={tab}
            onChange={onTabChange}
            variant="onDark"
            level="main"
            showDivider={false}
            compact
          />
        </View>
      </View>
    </Animated.View>
  );
}

export const StickyHomeHeader = memo(StickyHomeHeaderImpl);

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    ...shadows.card,
    overflow: "hidden",
    borderBottomLeftRadius: HEADER_BOTTOM_RADIUS,
    borderBottomRightRadius: HEADER_BOTTOM_RADIUS,
  },
  inner: {
    flex: 1,
    paddingBottom: HEADER_BOTTOM_INSET,
  },
  topRowWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: TOP_ROW_HEIGHT + 2,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  avatarWrap: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
    padding: 2,
    backgroundColor: "rgba(0,0,0,0.12)",
  },
  searchFloating: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    height: SEARCH_HEIGHT,
    zIndex: 5,
  },
  tabsBand: {
    position: "absolute",
    left: 0,
    right: 0,
    minHeight: MAIN_TAB_BAND_HEIGHT,
    justifyContent: "flex-end",
    zIndex: 4,
  },
});
