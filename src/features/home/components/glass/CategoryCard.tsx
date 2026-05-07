import MaskedView from '@react-native-masked-view/masked-view';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { gs } from '../../constants/glassTheme';
import type { ConcaveCorner } from './categoryClipPath';
import { buildCategoryClipPath } from './categoryClipPath';
import { useGlassPressScale } from './useGlassPressScale';

type IconName =
  | 'musical-notes'
  | 'restaurant'
  | 'camera'
  | 'color-palette'
  | 'gift'
  | 'heart'
  | 'business'
  | 'mic'
  | 'flower'
  | 'videocam';

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
            <View style={styles.tint} />
            <View style={styles.content}>
              <View style={styles.iconBubble}>
                <Ionicons name={icon} size={26} color="#6366F1" />
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
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: gs.sm,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
});
