import { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { colors, spacing } from "../../../constants/theme";

export type CategoryChipItem<T extends string> = {
  id: T;
  label: string;
};

type Props<T extends string> = {
  items: CategoryChipItem<T>[];
  value: T;
  onChange: (next: T) => void;
  style?: ViewStyle;
};

type Layout = { x: number; width: number };
const timing = { duration: 180 };

function CategoryChipRowImpl<T extends string>({ items, value, onChange, style }: Props<T>) {
  const layoutsRef = useRef<Record<string, Layout | undefined>>({});
  const [readyCount, setReadyCount] = useState(0);

  const activeX = useSharedValue(0);
  const activeW = useSharedValue(0);

  const activeIndex = useMemo(() => items.findIndex((i) => i.id === value), [items, value]);

  const move = useCallback(
    (id: T) => {
      const l = layoutsRef.current[id];
      if (!l) return;
      activeX.value = withTiming(l.x, timing);
      activeW.value = withTiming(l.width, timing);
    },
    [activeW, activeX],
  );

  const onItemLayout = useCallback(
    (id: T) => (e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      const prev = layoutsRef.current[id];
      layoutsRef.current[id] = { x, width };
      if (!prev) setReadyCount((c) => c + 1);
      if (id === value) {
        activeX.value = x;
        activeW.value = width;
      }
    },
    [activeW, activeX, value],
  );

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: activeX.value }],
    width: activeW.value,
    opacity: readyCount >= Math.min(2, items.length) ? 1 : 0,
  }));

  return (
    <View style={[styles.wrap, style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false} contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <Animated.View pointerEvents="none" style={[styles.underline, indicatorStyle]} />
          {items.map((it, idx) => {
            const active = idx === activeIndex;
            return (
              <Pressable
                key={it.id}
                onPress={() => {
                  onChange(it.id);
                  move(it.id);
                }}
                onLayout={onItemLayout(it.id)}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                accessibilityLabel={it.label}
                style={styles.tab}
              >
                <Text style={[styles.text, active ? styles.textActive : styles.textIdle]} numberOfLines={1}>
                  {it.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export const CategoryChipRow = memo(CategoryChipRowImpl) as typeof CategoryChipRowImpl;

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingRight: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.md,
    paddingTop: 2,
    paddingBottom: 10,
  },
  underline: {
    position: "absolute",
    left: 0,
    bottom: 2,
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.textPrimary,
  },
  tab: {
    paddingVertical: 6,
  },
  text: {
    fontSize: 14,
    letterSpacing: -0.2,
  },
  textActive: {
    color: colors.textPrimary,
    fontWeight: "800",
  },
  textIdle: {
    color: colors.textTertiary,
    fontWeight: "700",
  },
});

