import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { colors, shadows } from "../../../constants/theme";
import { gs } from "../constants/glassTheme";
import { useGlassPressScale } from "./glass/useGlassPressScale";

export type SubcategoryItem<T extends string> = {
  id: T;
  label: string;
  imageUrl: string;
};

type IonName = ComponentProps<typeof Ionicons>["name"];

type BaseProps<T extends string> = {
  caption?: string;
  items: SubcategoryItem<T>[];
  iconFor?: (id: T) => IonName;
  style?: ViewStyle;
  transitionKey?: string;
};

type SelectProps<T extends string> = BaseProps<T> & {
  mode?: "select";
  value: T;
  onChange: (next: T) => void;
};

type NavigateProps<T extends string> = BaseProps<T> & {
  mode: "navigate";
  onPressItem: (item: SubcategoryItem<T>) => void;
};

type Props<T extends string> = SelectProps<T> | NavigateProps<T>;

const GAP = 10;
const SELECT_SPRING = { damping: 19, stiffness: 280, mass: 0.42 };
const ENTER = { duration: 240 };

function SubTile<T extends string>({
  item,
  active,
  width,
  icon,
  onPress,
}: {
  item: SubcategoryItem<T>;
  active: boolean;
  width: number;
  icon?: IonName;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.985);
  const select = useSharedValue(active ? 1 : 0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    select.value = withSpring(active ? 1 : 0, SELECT_SPRING);
  }, [active, select]);

  const shellStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      select.value,
      [0, 1],
      ["#E8EAEF", "rgba(37, 99, 235, 0.38)"],
    ),
    backgroundColor: interpolateColor(
      select.value,
      [0, 1],
      ["#FFFFFF", "#F5F8FF"],
    ),
  }));

  const shadowAnim = useAnimatedStyle(() => ({
    shadowOpacity: 0.04 + select.value * 0.07,
    shadowRadius: 12 + select.value * 6,
  }));

  const onHoverIn = useCallback(() => {
    if (Platform.OS === "web") setHovered(true);
  }, []);
  const onHoverOut = useCallback(() => {
    if (Platform.OS === "web") setHovered(false);
  }, []);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      style={{ width }}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={item.label}
    >
      <Animated.View
        style={[
          styles.tile,
          shellStyle,
          shadowAnim,
          shadows.card,
          animatedStyle,
          hovered && Platform.OS === "web" ? styles.tileHoverWeb : null,
        ]}
      >
        <View style={styles.tileRow}>
          <View style={styles.thumbWrap}>
            <Image source={{ uri: item.imageUrl }} style={styles.thumb} />
            {icon ? (
              <View style={styles.thumbBadge}>
                <Ionicons name={icon} size={14} color={colors.accentBlue} />
              </View>
            ) : null}
          </View>
          <Text
            style={[styles.tileLabel, active ? styles.tileLabelActive : styles.tileLabelIdle]}
            numberOfLines={2}
          >
            {item.label}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

function SubcategoryCardsImpl<T extends string>(props: Props<T>) {
  const navigateMode = props.mode === "navigate";
  const caption = props.caption;
  const iconFor = props.iconFor;
  const style = props.style;
  const transitionKey = props.transitionKey;

  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const [gridW, setGridW] = useState(0);

  useEffect(() => {
    opacity.value = 0;
    translateY.value = 10;
    opacity.value = withTiming(1, ENTER);
    translateY.value = withSpring(0, { damping: 22, stiffness: 200 });
  }, [opacity, translateY, transitionKey]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const onGridLayout = useCallback((e: LayoutChangeEvent) => {
    setGridW(e.nativeEvent.layout.width);
  }, []);

  const columns = gridW >= 480 ? 2 : 1;
  const cardWidth = useMemo(() => {
    if (gridW <= 0) return 300;
    return (gridW - GAP * (columns - 1)) / columns;
  }, [columns, gridW]);

  const selectedId = navigateMode ? undefined : props.value;

  const onTilePress = (it: SubcategoryItem<T>) => {
    if (navigateMode) {
      props.onPressItem(it);
    } else {
      props.onChange(it.id);
    }
  };

  return (
    <Animated.View style={[styles.wrap, containerStyle, style]} onLayout={onGridLayout}>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
      <View style={styles.grid}>
        {props.items.map((it) => (
          <SubTile
            key={String(it.id)}
            item={it}
            active={navigateMode ? false : it.id === selectedId}
            width={cardWidth}
            icon={iconFor?.(it.id)}
            onPress={() => onTilePress(it)}
          />
        ))}
      </View>
    </Animated.View>
  );
}

export const SubcategoryCards = memo(
  SubcategoryCardsImpl,
) as typeof SubcategoryCardsImpl;

const styles = StyleSheet.create({
  wrap: {
    marginTop: gs.xl,
    width: "100%",
  },
  caption: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textTertiary,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: gs.sm + 2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  tile: {
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth + 0.5,
    paddingVertical: gs.md,
    paddingHorizontal: gs.md,
    minHeight: 72,
    shadowColor: "#0B0F16",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 2,
  },
  tileHoverWeb: {
    shadowOpacity: 0.11,
    elevation: 6,
  },
  tileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: gs.md,
  },
  thumbWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.surfaceMuted,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E8EAEF",
  },
  thumb: {
    width: "100%",
    height: "100%",
  },
  thumbBadge: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 22,
    height: 22,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(37,99,235,0.12)",
  },
  tileLabel: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.35,
  },
  tileLabelActive: {
    color: colors.textPrimary,
    fontWeight: "700",
  },
  tileLabelIdle: {
    color: colors.textSecondary,
    fontWeight: "600",
  },
});
