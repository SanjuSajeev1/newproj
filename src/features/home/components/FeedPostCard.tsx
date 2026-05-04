import { useCallback, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../../../constants/mockData';
import { Avatar, Card } from '../../../components/ui';
import { colors, radius, spacing, typography } from '../../../constants/theme';

const DOUBLE_TAP_MS = 280;
const CARD_LIFT = 3;
const LIKE_HEART = '#EF4444';

type BlockReason = 'like' | 'comment' | 'save';

type Props = {
  post: Post;
  isGuest: boolean;
  onInteractionBlocked: (reason: BlockReason) => void;
};

export function FeedPostCard({ post, isGuest, onInteractionBlocked }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const lastTapRef = useRef(0);
  const imageColor = post.imageColor ?? colors.primaryLight;

  const cardLift = useRef(new Animated.Value(0)).current;
  const likeIconScale = useRef(new Animated.Value(1)).current;
  const burstScale = useRef(new Animated.Value(0)).current;
  const burstOpacity = useRef(new Animated.Value(0)).current;
  const [burstActive, setBurstActive] = useState(false);
  const displayLikes = post.likes + (liked ? 1 : 0);

  const runCardLift = useCallback(
    (pressed: boolean) => {
      Animated.spring(cardLift, {
        toValue: pressed ? 1 : 0,
        useNativeDriver: true,
        friction: 8,
        tension: 120,
      }).start();
    },
    [cardLift],
  );

  const translateY = cardLift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -CARD_LIFT],
  });

  const bounceLikeIcon = useCallback(() => {
    Animated.sequence([
      Animated.spring(likeIconScale, {
        toValue: 1.22,
        useNativeDriver: true,
        friction: 4,
        tension: 200,
      }),
      Animated.spring(likeIconScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
        tension: 200,
      }),
    ]).start();
  }, [likeIconScale]);

  const playBurst = useCallback(() => {
    setBurstActive(true);
    burstScale.setValue(0.35);
    burstOpacity.setValue(1);
    Animated.parallel([
      Animated.spring(burstScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
        tension: 140,
      }),
      Animated.sequence([
        Animated.delay(220),
        Animated.timing(burstOpacity, {
          toValue: 0,
          duration: 320,
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) setBurstActive(false);
    });
  }, [burstOpacity, burstScale]);

  const toggleLike = useCallback(() => {
    if (isGuest) {
      onInteractionBlocked('like');
      return;
    }
    setLiked((v) => !v);
    bounceLikeIcon();
  }, [bounceLikeIcon, isGuest, onInteractionBlocked]);

  const handleMediaPress = () => {
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      playBurst();
      bounceLikeIcon();
      if (isGuest) {
        onInteractionBlocked('like');
        return;
      }
      if (!liked) {
        setLiked(true);
      }
    }
    lastTapRef.current = now;
  };

  const onComment = () => {
    if (isGuest) onInteractionBlocked('comment');
  };

  const onSave = () => {
    if (isGuest) {
      onInteractionBlocked('save');
      return;
    }
    setSaved((s) => !s);
  };

  return (
    <Pressable
      accessibilityRole="button"
      onPressIn={() => runCardLift(true)}
      onPressOut={() => runCardLift(false)}
    >
      <Animated.View style={[styles.cardLift, { transform: [{ translateY }] }]}>
        <Card padded={false} style={styles.cardInner}>
          <View style={styles.headerRow}>
            <Avatar name={post.authorName} size={40} backgroundColor={colors.primaryLight} />
            <Text style={styles.authorName} numberOfLines={1}>
              {post.authorName}
            </Text>
          </View>

          <Pressable onPress={handleMediaPress} style={styles.mediaPress}>
            <View style={[styles.media, { backgroundColor: imageColor }]}>
              <Ionicons name="image-outline" size={44} color={colors.textSecondary} />
              {burstActive ? (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.burstWrap,
                    { opacity: burstOpacity, transform: [{ scale: burstScale }] },
                  ]}
                >
                  <Ionicons name="heart" size={72} color={LIKE_HEART} />
                </Animated.View>
              ) : null}
            </View>
          </Pressable>

          <View style={styles.actionsRow}>
            <Pressable
              hitSlop={10}
              onPress={toggleLike}
              accessibilityRole="button"
              accessibilityLabel={liked ? 'Unlike' : 'Like'}
            >
              <Animated.View style={{ transform: [{ scale: likeIconScale }] }}>
                <Ionicons
                  name={liked ? 'heart' : 'heart-outline'}
                  size={24}
                  color={liked ? LIKE_HEART : colors.textPrimary}
                />
              </Animated.View>
            </Pressable>
            <Pressable
              hitSlop={10}
              onPress={onComment}
              style={styles.actionSpace}
              accessibilityRole="button"
              accessibilityLabel="Comment"
            >
              <Ionicons name="chatbubble-outline" size={22} color={colors.textPrimary} />
            </Pressable>
            <Pressable
              hitSlop={10}
              onPress={onSave}
              style={styles.saveBtn}
              accessibilityRole="button"
              accessibilityLabel={saved ? 'Unsave' : 'Save'}
            >
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color={saved ? colors.primary : colors.textPrimary}
              />
            </Pressable>
          </View>

          <Text style={styles.meta}>
            {displayLikes} likes · {post.comments} comments
          </Text>
          <Text style={styles.caption} numberOfLines={2} ellipsizeMode="tail">
            {post.caption}
          </Text>
        </Card>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardLift: {
    width: '100%',
  },
  cardInner: {
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  authorName: {
    ...typography.title,
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
  },
  mediaPress: {
    width: '100%',
    paddingBottom: spacing.sm,
  },
  media: {
    width: '100%',
    aspectRatio: 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.image,
    overflow: 'hidden',
  },
  burstWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  actionSpace: {
    marginLeft: spacing.md,
  },
  saveBtn: {
    marginLeft: 'auto',
  },
  meta: {
    ...typography.caption,
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  caption: {
    ...typography.body,
    color: colors.textPrimary,
    lineHeight: 22,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});
