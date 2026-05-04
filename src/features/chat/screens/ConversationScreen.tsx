import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_CHAT_THREADS, MOCK_MESSAGES, type Message } from '../../../constants/mockData';
import { colors, radius, spacing, typography } from '../../../constants/theme';
import type { ChatStackParamList } from '../../../shell/navigation/types';
import { AnimatedMessageBubble } from '../components/AnimatedMessageBubble';
import { TypingIndicator } from '../components/TypingIndicator';

type Props = NativeStackScreenProps<ChatStackParamList, 'Conversation'>;

function formatNowTime(): string {
  const d = new Date();
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

export function ConversationScreen({ route, navigation }: Props) {
  const { threadId, title: routeTitle } = route.params;
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const listRef = useRef<FlatList<Message>>(null);

  const thread = useMemo(
    () => MOCK_CHAT_THREADS.find((t) => t.id === threadId),
    [threadId],
  );

  const [messages, setMessages] = useState<Message[]>(() => [
    ...(MOCK_MESSAGES[threadId] ?? []),
  ]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const initialMessageIds = useRef(
    new Set((MOCK_MESSAGES[threadId] ?? []).map((m) => m.id)),
  );
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    replyTimerRef.current = null;
    initialMessageIds.current = new Set(
      (MOCK_MESSAGES[threadId] ?? []).map((m) => m.id),
    );
    setMessages([...(MOCK_MESSAGES[threadId] ?? [])]);
    setDraft('');
    setIsTyping(false);
  }, [threadId]);

  useEffect(
    () => () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    },
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: thread?.name ?? routeTitle ?? 'Chat',
    });
  }, [navigation, routeTitle, thread?.name]);

  const scrollToEnd = useCallback((animated: boolean) => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated });
    });
  }, []);

  useEffect(() => {
    scrollToEnd(false);
  }, [scrollToEnd]);

  useEffect(() => {
    if (isTyping) scrollToEnd(true);
  }, [isTyping, scrollToEnd]);

  const send = useCallback(() => {
    const text = draft.trim();
    if (!text) return;

    const mine: Message = {
      id: `m-${Date.now()}`,
      text,
      isMine: true,
      time: formatNowTime(),
    };
    setMessages((prev) => [...prev, mine]);
    setDraft('');
    Keyboard.dismiss();
    scrollToEnd(true);

    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    setIsTyping(true);
    replyTimerRef.current = setTimeout(() => {
      replyTimerRef.current = null;
      setIsTyping(false);
      const reply: Message = {
        id: `m-${Date.now()}-r`,
        text: 'Thanks — got it. We will follow up shortly.',
        isMine: false,
        time: formatNowTime(),
      };
      setMessages((prev) => [...prev, reply]);
      scrollToEnd(true);
    }, 1600);
  }, [draft, scrollToEnd]);

  const keyboardOffset = Platform.OS === 'ios' ? headerHeight : 0;

  const renderMessage = useCallback(({ item }: { item: Message }) => {
    const mine = item.isMine;
    const skipAnimation = initialMessageIds.current.has(item.id);
    return (
      <View
        style={[
          styles.msgRow,
          mine ? styles.msgRowMine : styles.msgRowTheirs,
        ]}
      >
        <AnimatedMessageBubble key={item.id} skipAnimation={skipAnimation}>
          <View
            style={[
              styles.bubble,
              mine ? styles.bubbleMine : styles.bubbleTheirs,
            ]}
          >
            <Text
              style={[
                styles.bubbleText,
                mine ? styles.bubbleTextMine : styles.bubbleTextTheirs,
              ]}
            >
              {item.text}
            </Text>
            <Text
              style={[
                styles.msgTime,
                mine ? styles.msgTimeMine : styles.msgTimeTheirs,
              ]}
            >
              {item.time}
            </Text>
          </View>
        </AnimatedMessageBubble>
      </View>
    );
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardOffset}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: spacing.md },
        ]}
        ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        onContentSizeChange={() => scrollToEnd(true)}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      />

      <View
        style={[
          styles.inputBar,
          {
            paddingBottom: Math.max(insets.bottom, spacing.md),
            paddingTop: spacing.sm,
          },
        ]}
      >
        <View style={styles.inputPill}>
          <TextInput
            style={styles.input}
            placeholder="Message…"
            placeholderTextColor={colors.textSecondary}
            value={draft}
            onChangeText={setDraft}
            multiline
            maxLength={2000}
            returnKeyType="default"
            blurOnSubmit={false}
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendBtn,
              !draft.trim() && styles.sendBtnDisabled,
              pressed && draft.trim() && styles.sendBtnPressed,
            ]}
            onPress={send}
            disabled={!draft.trim()}
          >
            <Text style={styles.sendLabel}>Send</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  msgRow: {
    marginBottom: spacing.sm,
    maxWidth: '88%',
  },
  msgRowMine: {
    alignSelf: 'flex-end',
  },
  msgRowTheirs: {
    alignSelf: 'flex-start',
  },
  bubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: 18,
  },
  bubbleMine: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 6,
  },
  bubbleTheirs: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 6,
  },
  bubbleText: {
    ...typography.body,
    lineHeight: 22,
  },
  bubbleTextMine: {
    color: colors.textOnPrimary,
  },
  bubbleTextTheirs: {
    color: colors.textPrimary,
  },
  msgTime: {
    ...typography.caption,
    fontSize: 11,
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },
  msgTimeMine: {
    color: 'rgba(255,255,255,0.75)',
  },
  msgTimeTheirs: {
    color: colors.textSecondary,
  },
  inputBar: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
  },
  inputPill: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.background,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    paddingLeft: spacing.md,
    paddingRight: spacing.xs,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    maxHeight: 120,
    paddingVertical: spacing.sm,
    minHeight: 40,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.button,
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.45,
  },
  sendBtnPressed: {
    opacity: 0.88,
  },
  sendLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textOnPrimary,
    fontSize: 15,
  },
});
