import { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors, spacing } from "../../../constants/theme";

export type InlineServiceTabId =
  | "events"
  | "arts-creative"
  | "digital-services"
  | "beauty-styling";

type TabItem = { id: InlineServiceTabId; label: string };

type Props = {
  value: InlineServiceTabId;
  onChange: (next: InlineServiceTabId) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: "light" | "onDark";
  level?: "main" | "category";
  showDivider?: boolean;
  /** Tighter vertical padding when embedded in collapsing headers */
  compact?: boolean;
};

type TabLayout = { x: number; width: number };

const TABS: TabItem[] = [
  { id: "events", label: "Events" },
  { id: "arts-creative", label: "Arts & Creative" },
  { id: "digital-services", label: "Digital Services" },
  { id: "beauty-styling", label: "Beauty & Styling" },
];

const timing = { duration: 200 };

function InlineServiceTabsImpl({
  value,
  onChange,
  style,
  textStyle,
  variant = "light",
  level = "main",
  showDivider = true,
  compact = false,
}: Props) {
  const layoutsRef = useRef<Record<InlineServiceTabId, TabLayout | undefined>>({
    events: undefined,
    "arts-creative": undefined,
    "digital-services": undefined,
    "beauty-styling": undefined,
  });
  const [readyCount, setReadyCount] = useState(0);

  const underlineX = useSharedValue(0);
  const underlineW = useSharedValue(0);

  const activeIndex = useMemo(
    () => TABS.findIndex((t) => t.id === value),
    [value],
  );

  const moveUnderline = useCallback(
    (id: InlineServiceTabId) => {
      const l = layoutsRef.current[id];
      if (!l) return;
      underlineX.value = withTiming(l.x, timing);
      underlineW.value = withTiming(l.width, timing);
    },
    [underlineW, underlineX],
  );

  const onTabLayout = useCallback(
    (id: InlineServiceTabId) => (e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      const prev = layoutsRef.current[id];
      layoutsRef.current[id] = { x, width };
      if (!prev) setReadyCount((c) => c + 1);
      if (id === value) {
        underlineX.value = x;
        underlineW.value = width;
      }
    },
    [underlineW, underlineX, value],
  );

  const underlineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: underlineX.value }],
    width: underlineW.value,
    opacity: readyCount >= 2 ? 1 : 0,
  }));

  return (
    <View
      style={[
        styles.wrap,
        variant === "onDark" ? styles.wrapOnDark : null,
        style,
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        bounces={false}
      >
        <View
          style={[
            styles.row,
            level === "main" ? styles.rowMain : styles.rowCategory,
            compact && level === "main" ? styles.rowMainCompact : null,
          ]}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              styles.underline,
              variant === "onDark" ? styles.underlineOnDark : null,
              underlineStyle,
            ]}
          />
          {TABS.map((t, idx) => {
            const active = idx === activeIndex;
            return (
              <Pressable
                key={t.id}
                onPress={() => {
                  onChange(t.id);
                  moveUnderline(t.id);
                }}
                onLayout={onTabLayout(t.id)}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={`Service ${t.label}`}
                accessibilityState={{ selected: active }}
                style={styles.tab}
              >
                <Text
                  style={[
                    styles.text,
                    level === "main" ? styles.textMain : styles.textCategory,
                    textStyle,
                    active
                      ? variant === "onDark"
                        ? styles.textActiveOnDark
                        : styles.textActive
                      : variant === "onDark"
                        ? styles.textInactiveOnDark
                        : styles.textInactive,
                  ]}
                >
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      {showDivider ? (
        <View
          style={[
            styles.bottomHairline,
            variant === "onDark" ? styles.bottomHairlineOnDark : null,
          ]}
        />
      ) : null}
    </View>
  );
}

export const InlineServiceTabs = memo(InlineServiceTabsImpl);

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
  },
  wrapOnDark: {
    backgroundColor: "transparent",
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.lg,
    paddingBottom: 10,
    paddingTop: 6,
  },
  rowMain: {},
  rowMainCompact: {
    paddingTop: 2,
    paddingBottom: 4,
    gap: spacing.md,
  },
  rowCategory: {
    gap: spacing.md,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tab: {
    paddingVertical: 6,
  },
  text: {
    letterSpacing: -0.2,
  },
  textMain: {
    fontSize: 16,
  },
  textCategory: {
    fontSize: 14,
  },
  textActive: {
    color: colors.textPrimary,
    fontWeight: "800",
  },
  textActiveOnDark: {
    color: "rgba(255,255,255,0.98)",
    fontWeight: "800",
  },
  textInactive: {
    color: colors.textTertiary,
    fontWeight: "700",
  },
  textInactiveOnDark: {
    color: "rgba(255,255,255,0.72)",
    fontWeight: "700",
  },
  underline: {
    position: "absolute",
    left: 0,
    bottom: 2,
    height: 2.5,
    borderRadius: 999,
    backgroundColor: colors.textPrimary,
  },
  underlineOnDark: {
    backgroundColor: "rgba(255,255,255,0.98)",
  },
  bottomHairline: {
    height: 1,
    backgroundColor: "rgba(15, 23, 42, 0.06)",
  },
  bottomHairlineOnDark: {
    backgroundColor: "rgba(255,255,255,0.10)",
  },
});
