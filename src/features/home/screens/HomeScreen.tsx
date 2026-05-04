import { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginPromptModal } from '../../../components/LoginPromptModal';
import { Avatar } from '../../../components/ui';
import { MOCK_POSTS, MOCK_STORIES, Post, Story } from '../../../constants/mockData';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';
import { HomeStackParamList } from '../../../shell/navigation/types';
import { FeedPostCard } from '../components/FeedPostCard';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

type BlockReason = 'like' | 'comment' | 'save';

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const isGuest = useAuthStore((s) => s.isGuest);
  const user = useAuthStore((s) => s.user);

  const [loginModal, setLoginModal] = useState(false);
  const [modalReason, setModalReason] = useState<BlockReason>('like');

  const displayName = useMemo(() => {
    if (isGuest) return 'there';
    const first = user?.name?.trim().split(/\s+/)[0];
    return first ?? 'there';
  }, [isGuest, user?.name]);

  const openStories = useCallback(
    (index: number) => {
      navigation.navigate('StoryViewer', { initialIndex: index });
    },
    [navigation],
  );

  const onInteractionBlocked = useCallback((reason: BlockReason) => {
    if (!isGuest) return;
    setModalReason(reason);
    setLoginModal(true);
  }, [isGuest]);

  const renderStory = useCallback(
    ({ item, index }: { item: Story; index: number }) => (
      <Pressable
        onPress={() => openStories(index)}
        style={styles.storyCell}
        accessibilityRole="button"
        accessibilityLabel={`Open story from ${item.name}`}
      >
        <Avatar name={item.name} size={56} backgroundColor={item.color} showStoryRing />
        <Text style={styles.storyName} numberOfLines={1}>
          {item.name}
        </Text>
      </Pressable>
    ),
    [openStories],
  );

  const renderPost: ListRenderItem<Post> = useCallback(
    ({ item }) => (
      <FeedPostCard post={item} isGuest={isGuest} onInteractionBlocked={onInteractionBlocked} />
    ),
    [isGuest, onInteractionBlocked],
  );

  const listHeader = useMemo(
    () => (
      <View style={[styles.headerBlock, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerTextBlock}>
            <Text style={styles.greeting}>Hi, {displayName}</Text>
            <Text style={styles.subtitle}>Find the best services</Text>
          </View>
          <Pressable
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={styles.notifBtn}
          >
            <Ionicons name="notifications-outline" size={26} color={colors.textPrimary} />
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>Stories</Text>
        <FlatList
          horizontal
          data={MOCK_STORIES}
          keyExtractor={(s) => s.id}
          renderItem={renderStory}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesContent}
          nestedScrollEnabled
          decelerationRate="fast"
        />

        <Text style={[styles.sectionLabel, styles.feedLabel]}>For you</Text>
      </View>
    ),
    [displayName, insets.top, renderStory],
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(p) => p.id}
        renderItem={renderPost}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="normal"
        bounces
      />
      <LoginPromptModal
        visible={loginModal}
        onClose={() => setLoginModal(false)}
        title="Login required"
        message={
          modalReason === 'like'
            ? 'Sign in to like posts.'
            : modalReason === 'comment'
              ? 'Sign in to comment on posts.'
              : 'Sign in to save posts.'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl + spacing.lg,
  },
  headerBlock: {
    paddingBottom: spacing.sm,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  headerTextBlock: {
    flex: 1,
    paddingRight: spacing.md,
  },
  greeting: {
    ...typography.heading,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  feedLabel: {
    marginTop: spacing.md,
  },
  storiesContent: {
    paddingRight: spacing.md,
    paddingBottom: spacing.sm,
  },
  storyCell: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 76,
  },
  storyName: {
    ...typography.caption,
    marginTop: spacing.xs,
    textAlign: 'center',
    width: '100%',
  },
  cardSeparator: {
    height: spacing.md,
  },
});
