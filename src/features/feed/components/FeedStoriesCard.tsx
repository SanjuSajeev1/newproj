import { memo, useCallback } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StoryItem } from "../../../components/StoryItem";
import { Card } from "../../../components/ui";
import { MOCK_STORIES } from "../../../constants/mockData";
import { colors, spacing } from "../../../constants/theme";
import type { FeedStackParamList } from "../../../shell/navigation/types";

type Nav = NativeStackNavigationProp<FeedStackParamList, "FeedMain">;

export const FeedStoriesCard = memo(function FeedStoriesCard() {
  const navigation = useNavigation<Nav>();

  const openStory = useCallback(
    (index: number) => {
      navigation.navigate("StoryViewer", { initialIndex: index });
    },
    [navigation],
  );

  return (
    <Card padded={false} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Stories</Text>
      </View>
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {MOCK_STORIES.map((story, index) => (
          <StoryItem key={story.id} story={story} onPress={() => openStory(index)} />
        ))}
      </ScrollView>
    </Card>
  );
});

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  row: {
    flexDirection: "row",
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    paddingBottom: spacing.md,
    alignItems: "flex-start",
  },
});
