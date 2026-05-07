import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { gs } from '../../constants/glassTheme';
import { useGlassPressScale } from './useGlassPressScale';

type Props = {
  title: string;
  subtitle?: string;
  imageUrl: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export function ServiceCategoryCard({ title, subtitle, imageUrl, height = 168, style, onPress }: Props) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.98);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={style}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Animated.View style={[styles.host, animatedStyle]}>
        <ImageBackground source={{ uri: imageUrl }} style={[styles.bg, { height }]} resizeMode="cover">
          <LinearGradient
            colors={['rgba(2,6,23,0.10)', 'rgba(2,6,23,0.45)', 'rgba(2,6,23,0.78)']}
            locations={[0, 0.55, 1]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.overlay}
          />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? (
              <Text style={styles.subtitle} numberOfLines={2}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  host: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#0B1220',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 6,
  },
  bg: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingHorizontal: gs.lg,
    paddingTop: gs.lg,
    paddingBottom: gs.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 20,
  },
});

