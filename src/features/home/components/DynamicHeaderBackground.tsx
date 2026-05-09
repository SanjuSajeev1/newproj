import { LinearGradient } from "expo-linear-gradient";
import { memo, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

type Props = {
  uri: string;
  scrollY: SharedValue<number>;
  expandedHeight: number;
  collapsedHeight: number;
};

const timing = { duration: 260 };

function DynamicHeaderBackgroundImpl({
  uri,
  scrollY,
  expandedHeight,
  collapsedHeight,
}: Props) {
  const [prevUri, setPrevUri] = useState(uri);
  const [currUri, setCurrUri] = useState(uri);
  const t = useSharedValue(1);

  useEffect(() => {
    if (!uri || uri.length === 0) return;
    if (uri === currUri) return;
    setPrevUri(currUri);
    setCurrUri(uri);
    t.value = 0;
    t.value = withTiming(1, timing);
  }, [currUri, t, uri]);

  const range = useMemo(
    () => Math.max(1, expandedHeight - collapsedHeight),
    [collapsedHeight, expandedHeight],
  );

  const parallaxStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, range],
      [0, -18],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      scrollY.value,
      [0, range],
      [1, 1.08],
      Extrapolation.CLAMP,
    );
    return { transform: [{ translateY }, { scale }] };
  }, [range, scrollY]);

  const prevStyle = useAnimatedStyle(() => ({ opacity: 1 - t.value }));
  const currStyle = useAnimatedStyle(() => ({ opacity: t.value }));

  return (
    <View style={styles.wrap}>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, parallaxStyle, prevStyle]}
      >
        <Image source={{ uri: prevUri }} style={styles.img} />
      </Animated.View>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, parallaxStyle, currStyle]}
      >
        <Image source={{ uri: currUri }} style={styles.img} />
      </Animated.View>

      <LinearGradient
        colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.18)", "rgba(0,0,0,0.62)"]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

export const DynamicHeaderBackground = memo(DynamicHeaderBackgroundImpl);

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
