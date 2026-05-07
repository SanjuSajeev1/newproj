import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';

type Props = {
  topInset: number;
  scrollY: SharedValue<number>;
  coverImageUrl?: string;
  profileImageUrl?: string;
  fallbackColor: string;
  name: string;
  serviceTitle: string;
  rating: number;
  reviewCount: number;
  verified?: boolean;
  location?: string;
  onBack: () => void;
  onShare: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
};

const COVER_H = 300;

export const CoverHeader = memo(function CoverHeader({
  topInset,
  scrollY,
  coverImageUrl,
  profileImageUrl,
  fallbackColor,
  name,
  serviceTitle,
  rating,
  reviewCount,
  verified,
  location,
  onBack,
  onShare,
  onToggleFavorite,
  isFavorite,
}: Props) {
  const coverStyle = useAnimatedStyle(() => {
    const y = scrollY.value;
    const translateY = interpolate(y, [-80, 0, 220], [40, 0, -18], Extrapolation.CLAMP);
    const scale = interpolate(y, [-80, 0], [1.12, 1], Extrapolation.CLAMP);
    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const topChromeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 90], [0, 1], Extrapolation.CLAMP);
    return { opacity };
  });

  return (
    <View style={styles.wrap}>
      <View style={[styles.coverShell, { paddingTop: topInset }]}>
        <Animated.View style={[styles.topChrome, topChromeStyle]} />

        <Animated.View style={[styles.coverZoom, coverStyle]}>
          {coverImageUrl ? (
            <Image source={{ uri: coverImageUrl }} style={styles.coverImg} />
          ) : (
            <View style={[styles.coverImg, { backgroundColor: fallbackColor }]} />
          )}
        </Animated.View>

        <LinearGradient
          colors={['rgba(2,6,23,0.00)', 'rgba(2,6,23,0.18)', 'rgba(2,6,23,0.62)']}
          locations={[0, 0.62, 1]}
          start={{ x: 0.25, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.coverGradient}
        />

        <View style={styles.headerRow}>
          <Pressable onPress={onBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="Back">
            <View style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
            </View>
          </Pressable>
          <View style={styles.rightActions}>
            <Pressable onPress={onShare} hitSlop={12} accessibilityRole="button" accessibilityLabel="Share">
              <View style={styles.iconBtn}>
                <Ionicons name="share-outline" size={20} color="#FFFFFF" />
              </View>
            </Pressable>
            <Pressable
              onPress={onToggleFavorite}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? 'Unsave' : 'Save'}
            >
              <View style={styles.iconBtn}>
                <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={20} color={isFavorite ? '#EF4444' : '#FFFFFF'} />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.overlay}>
          <View style={styles.profileRow}>
            <View style={[styles.avatarRing, verified && styles.avatarRingVerified]}>
              {profileImageUrl ? (
                <Image source={{ uri: profileImageUrl }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, { backgroundColor: fallbackColor }]} />
              )}
            </View>

            <View style={styles.nameCol}>
              <View style={styles.nameLine}>
                <Text style={styles.name} numberOfLines={1}>
                  {name}
                </Text>
                {verified ? (
                  <View style={styles.verifiedPill}>
                    <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.service} numberOfLines={1}>
                {serviceTitle}
              </Text>
              <View style={styles.metaRow}>
                <View style={styles.metaChip}>
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text style={styles.metaText}>
                    {rating.toFixed(1)} ({reviewCount})
                  </Text>
                </View>
                {location ? (
                  <View style={styles.metaChip}>
                    <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.86)" />
                    <Text style={[styles.metaText, styles.metaTextLight]} numberOfLines={1}>
                      {location}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.spacer} />
    </View>
  );
});

export const COVER_HEADER_HEIGHT = COVER_H;

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: -spacing.md,
  },
  coverShell: {
    height: COVER_H,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#0B1220',
    ...shadows.card,
  },
  coverZoom: {
    ...StyleSheet.absoluteFillObject,
  },
  coverImg: {
    width: '100%',
    height: '100%',
  },
  coverGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  topChrome: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  headerRow: {
    height: 56,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(2,6,23,0.28)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
  },
  avatarRing: {
    width: 92,
    height: 92,
    borderRadius: 46,
    padding: 3,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    ...shadows.card,
  },
  avatarRingVerified: {
    borderColor: 'rgba(37,99,235,0.40)',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 43,
    backgroundColor: '#E2E8F0',
  },
  nameCol: {
    flex: 1,
    minWidth: 0,
  },
  nameLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 4,
  },
  name: {
    ...typography.heading,
    fontSize: 24,
    color: '#FFFFFF',
    letterSpacing: -0.6,
    flex: 1,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.button,
    backgroundColor: 'rgba(255,255,255,0.90)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.65)',
  },
  verifiedText: {
    ...typography.caption,
    fontWeight: '900',
    color: colors.primary,
  },
  service: {
    ...typography.body,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.86)',
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.button,
    backgroundColor: 'rgba(2,6,23,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  metaText: {
    ...typography.caption,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  metaTextLight: {
    color: 'rgba(255,255,255,0.9)',
  },
  spacer: {
    height: spacing.sm,
  },
});

