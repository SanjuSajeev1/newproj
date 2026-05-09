import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MOCK_POSTS } from "../../../constants/mockData";
import { spacing, colors } from "../../../constants/theme";
import { useAuthStore } from "../../../store/authStore";
import { FeedPostCard } from "../../home/components/FeedPostCard";
import { FeedStoriesCard } from "../components/FeedStoriesCard";

export function FeedScreen() {
  const insets = useSafeAreaInsets();
  const isGuest = useAuthStore((s) => s.isGuest);

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.list,
          { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        <FeedStoriesCard />
        {MOCK_POSTS.map((post) => (
          <FeedPostCard
            key={post.id}
            post={post}
            isGuest={isGuest}
            onInteractionBlocked={() => {}}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
});
