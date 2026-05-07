import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';

type Props = {
  title: string;
  topInset: number;
  /** 0..1 */
  progress: SharedValue<number>;
  onBack: () => void;
  onShare?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
};

export const ProfileHeader = memo(function ProfileHeader({
  title,
  topInset,
  progress,
  onBack,
  onShare,
  onToggleFavorite,
  isFavorite = false,
}: Props) {
  const bgStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 6 }],
  }));

  return (
    <View style={[styles.wrap, { paddingTop: topInset }]}>
      <Animated.View style={[styles.bg, bgStyle]} />
      <View style={styles.row}>
        <Pressable onPress={onBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="Back">
          <View style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
          </View>
        </Pressable>

        <Animated.View style={[styles.titleWrap, titleStyle]} pointerEvents="none">
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </Animated.View>

        <View style={styles.actions}>
          {onShare ? (
            <Pressable onPress={onShare} hitSlop={12} accessibilityRole="button" accessibilityLabel="Share">
              <View style={styles.iconBtn}>
                <Ionicons name="share-outline" size={20} color={colors.textPrimary} />
              </View>
            </Pressable>
          ) : null}
          {onToggleFavorite ? (
            <Pressable
              onPress={onToggleFavorite}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? 'Unsave' : 'Save'}
            >
              <View style={styles.iconBtn}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isFavorite ? '#EF4444' : colors.textPrimary}
                />
              </View>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  row: {
    height: 56,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.button,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  titleWrap: {
    position: 'absolute',
    left: spacing.md + 44,
    right: spacing.md + 92,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.title,
    fontSize: 16,
  },
  actions: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});

