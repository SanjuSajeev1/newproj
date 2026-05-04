import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Post } from '../constants/mockData';
import { colors, radius, spacing, typography } from '../constants/theme';
import { Avatar } from './Avatar';

type Props = {
  post: Post;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSavePress?: () => void;
  interactionDisabled?: boolean;
};

export function PostCard({
  post,
  onLikePress,
  onCommentPress,
  onSavePress,
  interactionDisabled = false,
}: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Avatar name={post.authorName} size={44} backgroundColor={colors.primaryLight} />
        <Text style={[typography.title, styles.author]}>{post.authorName}</Text>
      </View>
      <View style={styles.media} accessibilityLabel="Post media placeholder">
        <Ionicons name="image-outline" size={40} color={colors.textSecondary} />
        <Text style={typography.caption}>Media</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          hitSlop={8}
          onPress={interactionDisabled ? undefined : onLikePress}
          style={styles.actionBtn}
          disabled={interactionDisabled}
        >
          <Ionicons
            name="heart-outline"
            size={24}
            color={interactionDisabled ? colors.textSecondary : colors.textPrimary}
          />
        </Pressable>
        <Pressable
          hitSlop={8}
          onPress={interactionDisabled ? undefined : onCommentPress}
          style={styles.actionBtn}
          disabled={interactionDisabled}
        >
          <Ionicons
            name="chatbubble-outline"
            size={22}
            color={interactionDisabled ? colors.textSecondary : colors.textPrimary}
          />
        </Pressable>
        <Pressable
          hitSlop={8}
          onPress={interactionDisabled ? undefined : onSavePress}
          style={[styles.actionBtn, styles.saveBtn]}
          disabled={interactionDisabled}
        >
          <Ionicons
            name="bookmark-outline"
            size={22}
            color={interactionDisabled ? colors.textSecondary : colors.textPrimary}
          />
        </Pressable>
      </View>
      <Text style={styles.meta}>
        {post.likes} likes · {post.comments} comments
      </Text>
      <Text style={[typography.body, styles.caption]}>{post.caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  author: {
    marginLeft: spacing.sm,
  },
  media: {
    height: 200,
    borderRadius: radius.image,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  actionBtn: {
    marginRight: spacing.md,
  },
  saveBtn: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  meta: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  caption: {
    lineHeight: 22,
  },
});
