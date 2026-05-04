import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../../../components/ui';
import { MOCK_CHAT_THREADS, type ChatThread } from '../../../constants/mockData';
import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../../constants/theme';
import type { ChatStackParamList } from '../../../shell/navigation/types';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatList'>;

export function ChatListScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: ChatThread }) => (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={() =>
        navigation.navigate('Conversation', {
          threadId: item.id,
          title: item.name,
        })
      }
    >
      <Avatar
        name={item.name}
        size={52}
        backgroundColor={item.avatarColor ?? colors.primaryLight}
      />
      <View style={styles.body}>
        <View style={styles.topLine}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.bottomLine}>
          <Text style={styles.preview} numberOfLines={2}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {item.unread > 9 ? '9+' : item.unread}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={MOCK_CHAT_THREADS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  rowPressed: {
    opacity: 0.92,
  },
  body: {
    flex: 1,
    marginLeft: spacing.md,
    minWidth: 0,
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
  },
  time: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  bottomLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  preview: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  badge: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textOnPrimary,
  },
});
