import { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import type { ServiceProvider } from '../../../constants/mockData';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';
import { useGlassPressScale } from '../../home/components/glass/useGlassPressScale';

type Props = {
  item: ServiceProvider;
  index: number;
  onPress: () => void;
  onToggleFavorite?: () => void;
};

export const ProviderCard = memo(function ProviderCard({ item, index, onPress, onToggleFavorite }: Props) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.96);
  const availability = item.availability ?? 'Available this week';
  const hasFav = Boolean(onToggleFavorite);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      android_ripple={Platform.OS === 'android' ? { color: 'rgba(2,6,23,0.06)' } : undefined}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      <Animated.View
        entering={FadeInDown.delay(Math.min(240, index * 18)).duration(420)}
        style={styles.enterWrap}
      >
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={styles.topRow}>
            <View style={styles.avatarWrap}>
              {item.profileImageUrl ? (
                <Image source={{ uri: item.profileImageUrl }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, { backgroundColor: item.imageColor }]} />
              )}
              {item.verified ? (
                <View style={styles.verifiedDot} accessibilityLabel="Verified">
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
              ) : null}
            </View>

            <View style={styles.body}>
              <View style={styles.titleRow}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                {hasFav ? (
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      onToggleFavorite?.();
                    }}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel="Favorite"
                    style={styles.favBtn}
                  >
                    <Ionicons name="heart-outline" size={18} color={colors.textSecondary} />
                  </Pressable>
                ) : null}
              </View>

              <Text style={styles.role} numberOfLines={1}>
                {item.category}
              </Text>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text style={styles.metaText}>
                    {item.rating.toFixed(1)} ({item.reviewCount})
                  </Text>
                </View>
                {item.location ? (
                  <View style={styles.metaItem}>
                    <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.metaText} numberOfLines={1}>
                      {item.location}
                    </Text>
                  </View>
                ) : null}
              </View>

              {item.bio ? (
                <Text style={styles.bio} numberOfLines={2}>
                  {item.bio}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.price}>Starts from ₹{item.priceFrom}</Text>
            <View style={styles.availabilityPill}>
              <Text style={styles.availabilityText}>{availability}</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  enterWrap: {
    width: '100%',
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    padding: spacing.md,
    ...shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  avatarWrap: {
    width: 78,
    height: 78,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  verifiedDot: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: 2,
  },
  name: {
    ...typography.title,
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
    flex: 1,
  },
  favBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  role: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.sm - 2,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm - 2,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  bio: {
    ...typography.body,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  bottomRow: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  price: {
    ...typography.body,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  availabilityPill: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.button,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  availabilityText: {
    ...typography.caption,
    fontWeight: '900',
    color: '#047857',
    letterSpacing: 0.2,
  },
});

