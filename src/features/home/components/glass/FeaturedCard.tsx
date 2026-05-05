import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { gs } from '../../constants/glassTheme';
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
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.ratingRow}>
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
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
    paddingHorizontal: gs.md,
    paddingVertical: gs.sm + 2,
    minHeight: 64,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
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
    color: '#64748B',
  },
});
