import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';

export type ProfileTabKey = 'portfolio' | 'about' | 'stats' | 'reviews' | 'availability';

export type ProfileTab = {
  key: ProfileTabKey;
  title: string;
};

type TabsProps = {
  tabs: ProfileTab[];
  activeIndex: number;
  onPressTab: (index: number) => void;
  indicatorX: Animated.SharedValue<number>;
};

export const ProfileTabs = memo(function ProfileTabs({ tabs, activeIndex, onPressTab, indicatorX }: TabsProps) {
  const { width } = useWindowDimensions();
  const pad = spacing.md;
  const pillW = width - pad * 2;
  const itemW = pillW / tabs.length;

  const indicatorStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      indicatorX.value,
      [0, width * (tabs.length - 1)],
      [0, itemW * (tabs.length - 1)],
      Extrapolation.CLAMP,
    );
    return { transform: [{ translateX }] };
  }, [itemW, tabs.length, width]);

  return (
    <View style={styles.stickyWrap}>
      <View style={[styles.pill, { width: pillW }]}>
        <Animated.View style={[styles.indicator, { width: itemW }, indicatorStyle]} />
        {tabs.map((t, idx) => {
          const active = idx === activeIndex;
          return (
            <Pressable
              key={t.key}
              onPress={() => onPressTab(idx)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={styles.tabBtn}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.title}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});

type PagerProps = {
  tabs: ProfileTab[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  renderScene: (tab: ProfileTab, index: number, activeIndex: number) => React.ReactNode;
  indicatorX: Animated.SharedValue<number>;
};

export const ProfileTabsPager = memo(function ProfileTabsPager({
  tabs,
  activeIndex,
  onIndexChange,
  renderScene,
  indicatorX,
}: PagerProps) {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<Animated.ScrollView | null>(null);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      indicatorX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      const idx = Math.round(e.contentOffset.x / width);
      runOnJS(onIndexChange)(idx);
    },
  });

  const scrollToIndex = useCallback(
    (index: number, animated = true) => {
      const ref = scrollRef.current as any;
      if (!ref?.scrollTo) return;
      ref.scrollTo({ x: index * width, y: 0, animated });
    },
    [width, scrollRef],
  );

  // Keep pager in sync when tab is pressed.
  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex, scrollToIndex]);

  return (
    <Animated.ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{}}
    >
      {tabs.map((t, idx) => {
        const shouldRender = Math.abs(idx - activeIndex) <= 1;
        return (
          <View key={t.key} style={{ width }}>
            {shouldRender ? renderScene(t, idx, activeIndex) : <View style={{ height: 320 }} />}
          </View>
        );
      })}
    </Animated.ScrollView>
  );
});

const styles = StyleSheet.create({
  stickyWrap: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  pill: {
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    flexDirection: 'row',
    ...shadows.card,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 22,
    backgroundColor: '#0B1220',
    opacity: 0.06,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  tabText: {
    ...typography.caption,
    fontWeight: '900',
    color: colors.textSecondary,
    letterSpacing: -0.1,
  },
  tabTextActive: {
    color: colors.textPrimary,
  },
});

