import MaskedView from '@react-native-masked-view/masked-view';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { glass, gs } from '../../constants/glassTheme';
import type { ConcaveCorner } from './categoryClipPath';
import { buildCategoryClipPath } from './categoryClipPath';
import { useGlassPressScale } from './useGlassPressScale';

type IconName = 'musical-notes' | 'restaurant' | 'camera' | 'color-palette';

type Props = {
  label: string;
  icon: IconName;
  cut: ConcaveCorner;
  width: number;
  height: number;
  onPress?: () => void;
};

export function CategoryCard({ label, icon, cut, width, height, onPress }: Props) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.96);
  const d = buildCategoryClipPath(width, height, cut);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{ width, height }}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Animated.View style={[styles.shadowHost, animatedStyle]}>
        <MaskedView
          style={{ width, height }}
          maskElement={
            <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
              <Path d={d} fill="white" />
            </Svg>
          }
        >
          <View style={{ flex: 1 }}>
            <BlurView
              intensity={glass.blur}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.tint} />
            <View style={styles.content}>
              <View style={styles.iconBubble}>
                <Ionicons name={icon} size={26} color={glass.textPrimary} />
              </View>
              <Text style={styles.label}>{label}</Text>
            </View>
          </View>
        </MaskedView>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadowHost: {
    flex: 1,
    borderWidth: 1,
    borderColor: glass.border,
    shadowColor: glass.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 10,
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: glass.fill,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: gs.md,
  },
  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: gs.sm,
    borderWidth: 1,
    borderColor: glass.borderSoft,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: glass.textPrimary,
    letterSpacing: 0.2,
  },
});
