import { memo } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { colors, shadows, spacing } from "../../../constants/theme";
import { gs } from "../constants/glassTheme";
import { useGlassPressScale } from "./glass/useGlassPressScale";

export type SubServiceItem<T extends string> = {
  id: T;
  label: string;
  imageUrl: string;
};

type Props<T extends string> = {
  title?: string;
  items: SubServiceItem<T>[];
  value: T;
  onChange: (next: T) => void;
  style?: ViewStyle;
};

function SubServiceCarouselImpl<T extends string>({ title, items, value, onChange, style }: Props<T>) {
  return (
    <View style={[styles.wrap, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        contentContainerStyle={styles.row}
      >
        {items.map((it) => (
          <SubServiceCard
            key={it.id}
            item={it}
            active={it.id === value}
            onPress={() => onChange(it.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function SubServiceCard<T extends string>({
  item,
  active,
  onPress,
}: {
  item: SubServiceItem<T>;
  active: boolean;
  onPress: () => void;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.97);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.cardPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={item.label}
    >
      <Animated.View style={[styles.card, active ? styles.cardActive : styles.cardIdle, animatedStyle]}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.overlay} />
        <Text numberOfLines={2} style={styles.label}>
          {item.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export const SubServiceCarousel = memo(SubServiceCarouselImpl) as typeof SubServiceCarouselImpl;

const styles = StyleSheet.create({
  wrap: {
    marginTop: gs.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.3,
    marginBottom: gs.sm,
    paddingHorizontal: spacing.md,
  },
  row: {
    paddingHorizontal: spacing.md,
    paddingRight: spacing.md,
    gap: gs.sm,
  },
  cardPress: {
    width: 104,
  },
  card: {
    height: 118,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: colors.surfaceMuted,
    ...shadows.card,
  },
  cardActive: {
    borderWidth: 1,
    borderColor: "rgba(37,99,235,0.32)",
  },
  cardIdle: {
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.06)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,6,23,0.28)",
  },
  label: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    fontSize: 13,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },
});

