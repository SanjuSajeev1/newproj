import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import {
  ImageBackground,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { gs } from "../constants/glassTheme";
import { useGlassPressScale } from "./glass/useGlassPressScale";

export type DiscoveryCategory<T extends string> = {
  id: T;
  label: string;
  imageUrl: string;
};

type IonName = ComponentProps<typeof Ionicons>["name"];

type Props<T extends string> = {
  items: DiscoveryCategory<T>[];
  iconFor: (id: T) => IonName;
  onPressItem: (id: T) => void;
  style?: ViewStyle;
};

const GAP = 14;
/** Taller tile ratio feels more “editorial” than a short crop. */
const TILE_MIN_HEIGHT = 168;
const RADIUS = 20;

function CategoryCard<T extends string>({
  item,
  width,
  icon,
  onPress,
}: {
  item: DiscoveryCategory<T>;
  width: number;
  icon: IonName;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.97);
  const [hovered, setHovered] = useState(false);

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
      accessibilityRole="button"
      accessibilityLabel={item.label}
      accessibilityHint={`Opens ${item.label} services`}
      style={[styles.press, { width }]}
    >
      <Animated.View
        style={[
          styles.card,
          animatedStyle,
          hovered ? styles.cardHovered : null,
          Platform.OS === "web" && hovered ? styles.cardHoveredWeb : null,
        ]}
      >
        <ImageBackground
          source={{ uri: item.imageUrl }}
          style={styles.imageBg}
          resizeMode="cover"
          imageStyle={styles.imageCurve}
        >
          <LinearGradient
            pointerEvents="none"
            colors={["rgba(15,23,42,0)", "rgba(15,23,42,0.25)", "rgba(8,11,20,0.88)"]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.topAccent}>
            <View style={styles.iconWell}>
              <Ionicons name={icon} size={18} color="rgba(255,255,255,0.95)" />
            </View>
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title} numberOfLines={3}>
              {item.label}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
}

function DiscoveryCategoryGridImpl<T extends string>({
  items,
  iconFor,
  onPressItem,
  style,
}: Props<T>) {
  const [gridW, setGridW] = useState(0);

  const onGridLayout = useCallback((e: LayoutChangeEvent) => {
    setGridW(e.nativeEvent.layout.width);
  }, []);

  const columns = gridW >= 560 ? 3 : 2;

  const cardWidth = useMemo(() => {
    if (gridW <= 0) return 168;
    return (gridW - GAP * (columns - 1)) / columns;
  }, [columns, gridW]);

  return (
    <View style={[styles.wrap, style]} onLayout={onGridLayout}>
      <View style={styles.grid}>
        {items.map((item) => (
          <CategoryCard
            key={String(item.id)}
            item={item}
            width={cardWidth}
            icon={iconFor(item.id)}
            onPress={() => onPressItem(item.id)}
          />
        ))}
      </View>
    </View>
  );
}

export const DiscoveryCategoryGrid = memo(
  DiscoveryCategoryGridImpl,
) as typeof DiscoveryCategoryGridImpl;

const styles = StyleSheet.create({
  wrap: {
    marginTop: 0,
    width: "100%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  press: {},
  card: {
    borderRadius: RADIUS,
    minHeight: TILE_MIN_HEIGHT,
    backgroundColor: "#0B0F16",
    shadowColor: "#0B0F16",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
    overflow: "hidden",
  },
  cardHovered: {
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
  cardHoveredWeb: {
    shadowOffset: { width: 0, height: 14 },
  },
  imageBg: {
    flex: 1,
    width: "100%",
    minHeight: TILE_MIN_HEIGHT,
    justifyContent: "space-between",
  },
  imageCurve: {
    borderRadius: RADIUS,
  },
  topAccent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 11,
    paddingHorizontal: 11,
  },
  iconWell: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.28)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.22)",
  },
  titleBlock: {
    paddingHorizontal: gs.md,
    paddingBottom: gs.md + 2,
    paddingTop: gs.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.45,
    lineHeight: 21,
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
});
