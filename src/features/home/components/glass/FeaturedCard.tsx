import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { glass, gs } from '../../constants/glassTheme';
import { useGlassPressScale } from './useGlassPressScale';

type Props = {
  name: string;
  rating: number;
  imageUrl: string;
  onPress?: () => void;
};

const CARD_W = 208;
const IMG_H = 118;

export function FeaturedCard({ name, rating, imageUrl, onPress }: Props) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.96);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.press}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.clip}>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.footer}>
          <BlurView intensity={48} tint="light" style={StyleSheet.absoluteFill} />
          <View style={styles.footerTint} />
          <Text style={[styles.name, styles.footerText]} numberOfLines={1}>
            {name}
          </Text>
          <View style={[styles.ratingRow, styles.footerText]}>
            <Ionicons name="star" size={14} color="#FBBF24" />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    width: CARD_W,
    marginRight: gs.sm,
  },
  card: {
    width: CARD_W,
    borderRadius: glass.radius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: glass.border,
    shadowColor: glass.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.38,
    shadowRadius: 16,
    elevation: 9,
  },
  clip: {
    height: IMG_H,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: IMG_H,
  },
  footer: {
    position: 'relative',
    paddingHorizontal: gs.md,
    paddingVertical: gs.sm + 2,
    minHeight: 64,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  footerTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  footerText: {
    zIndex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: glass.textPrimary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: glass.textSecondary,
  },
});
