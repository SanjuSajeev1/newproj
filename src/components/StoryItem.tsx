import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Story } from '../constants/mockData';
import { colors, spacing, typography } from '../constants/theme';
import { Avatar } from './Avatar';

type Props = {
  story: Story;
  onPress: () => void;
};

export function StoryItem({ story, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.wrap} accessibilityRole="button">
      <View style={styles.ring}>
        <Avatar name={story.name} size={56} backgroundColor={story.color} />
      </View>
      <Text numberOfLines={1} style={[typography.caption, styles.name]}>
        {story.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    width: 72,
    marginRight: spacing.sm,
  },
  ring: {
    padding: 3,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: spacing.xs,
  },
  name: {
    textAlign: 'center',
    maxWidth: 72,
  },
});
