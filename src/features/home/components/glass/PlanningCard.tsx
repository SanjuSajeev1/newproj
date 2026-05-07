import MaskedView from '@react-native-masked-view/masked-view';
import { memo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { gs } from '../../constants/glassTheme';
import { useGlassPressScale } from './useGlassPressScale';
import { buildCategoryClipPath, type ConcaveCorner } from './categoryClipPath';

type Props = {
  title: string;
  imageUrl: string;
  cut: ConcaveCorner;
  width: number;
  height: number;
  onPress?: () => void;
};

export const PlanningCard = memo(function PlanningCard({
  title,
  imageUrl,
  cut,
  width,
  height,
  onPress,
}: Props) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.96);
  const [pressed, setPressed] = useState(false);
  const d = buildCategoryClipPath(width, height, cut);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        setPressed(true);
        onPressIn();
      }}
      onPressOut={() => {
        setPressed(false);
        onPressOut();
      }}
      style={{ width, height }}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Animated.View style={[styles.host, animatedStyle]}>
        <MaskedView
          style={{ width, height }}
          maskElement={
            <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
              <Path d={d} fill="white" />
            </Svg>
          }
        >
          <View style={styles.fill}>
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
            <View style={styles.gradientOverlay} />
            <View style={[styles.pressOverlay, pressed && styles.pressOverlayActive]} />
            <View style={styles.textWrap}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
        </MaskedView>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  host: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 5,
  },
  fill: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.35)',
  },
  pressOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.02)',
  },
  pressOverlayActive: {
    backgroundColor: 'rgba(15,23,42,0.18)',
  },
  textWrap: {
    position: 'absolute',
    left: gs.sm,
    right: gs.sm,
    bottom: gs.sm,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
