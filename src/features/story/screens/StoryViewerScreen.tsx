import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../../../components/ui';
import { MOCK_STORIES } from '../../../constants/mockData';
import { spacing, typography } from '../../../constants/theme';
import { HomeStackParamList } from '../../../shell/navigation/types';

const STORY_DURATION_MS = 5200;

type R = RouteProp<HomeStackParamList, 'StoryViewer'>;
type Nav = NativeStackNavigationProp<HomeStackParamList, 'StoryViewer'>;

export function StoryViewerScreen() {
  const route = useRoute<R>();
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const initialIndex = route.params?.initialIndex ?? 0;

  const [index, setIndex] = useState(initialIndex);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const story = MOCK_STORIES[index];

  const runContentFade = useCallback(() => {
    contentOpacity.setValue(0.72);
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [contentOpacity]);

  const goPrev = useCallback(() => {
    animationRef.current?.stop();
    if (index <= 0) {
      navigation.goBack();
      return;
    }
    setIndex((i) => i - 1);
  }, [index, navigation]);

  const goNext = useCallback(() => {
    animationRef.current?.stop();
    if (index >= MOCK_STORIES.length - 1) {
      navigation.goBack();
      return;
    }
    setIndex((i) => i + 1);
  }, [index, navigation]);

  useEffect(() => {
    progressAnim.setValue(0);
    animationRef.current?.stop();

    const anim = Animated.timing(progressAnim, {
      toValue: 1,
      duration: STORY_DURATION_MS,
      easing: Easing.linear,
      useNativeDriver: false,
    });
    animationRef.current = anim;

    anim.start(({ finished }) => {
      animationRef.current = null;
      if (!finished) return;
      if (index < MOCK_STORIES.length - 1) {
        setIndex(index + 1);
      } else {
        navigation.goBack();
      }
    });

    return () => {
      anim.stop();
      animationRef.current = null;
    };
  }, [index, navigation, progressAnim]);

  const didMountFade = useRef(false);
  useEffect(() => {
    if (!didMountFade.current) {
      didMountFade.current = true;
      return;
    }
    runContentFade();
  }, [index, runContentFade]);

  if (!story) {
    return null;
  }

  const topChromeHeight = insets.top + 52;
  const footerReserve = 112 + insets.bottom;

  return (
    <View style={styles.root}>
      <StatusBar style="light" translucent />

      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: story.color, opacity: contentOpacity },
        ]}
      >
        <View style={styles.mediaInner}>
          <Ionicons name="images-outline" size={72} color="rgba(15,23,42,0.28)" />
        </View>
      </Animated.View>

      <View
        pointerEvents="none"
        style={[styles.topScrim, { height: topChromeHeight + 48 }]}
      />
      <View
        pointerEvents="none"
        style={[styles.bottomScrim, { height: footerReserve + 40 }]}
      />

      <View style={[styles.chromeTop, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.progressRow}>
          {MOCK_STORIES.map((s, i) => (
            <View key={s.id} style={styles.segmentTrack}>
              {i < index ? <View style={styles.segmentFillFull} /> : null}
              {i === index ? (
                <Animated.View
                  style={[
                    styles.segmentFill,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              ) : null}
            </View>
          ))}
        </View>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={16}
          style={styles.closeFab}
          accessibilityRole="button"
          accessibilityLabel="Close stories"
        >
          <View style={styles.closeInner}>
            <Ionicons name="close" size={22} color="#fff" />
          </View>
        </Pressable>
      </View>

      <View
        style={[
          styles.tapLayer,
          {
            top: topChromeHeight,
            bottom: footerReserve,
          },
        ]}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <Pressable
          style={styles.tapLeft}
          onPress={goPrev}
          accessibilityRole="button"
          accessibilityLabel="Previous story"
        />
        <Pressable
          style={styles.tapRight}
          onPress={goNext}
          accessibilityRole="button"
          accessibilityLabel="Next story"
        />
      </View>

      <View
        pointerEvents="none"
        style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}
      >
        <Avatar name={story.name} size={44} backgroundColor="rgba(255,255,255,0.95)" />
        <View style={styles.footerText}>
          <Text style={styles.name}>{story.name}</Text>
          <Text style={styles.caption}>Tap left or right to move between stories</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#020617',
  },
  mediaInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  bottomScrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  chromeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingHorizontal: spacing.md,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: spacing.sm,
  },
  segmentTrack: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.22)',
    overflow: 'hidden',
  },
  segmentFillFull: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },
  segmentFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  closeFab: {
    alignSelf: 'flex-end',
  },
  closeInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
  },
  tapLeft: {
    flex: 1,
  },
  tapRight: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  footerText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  name: {
    ...typography.title,
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  caption: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.78)',
    marginTop: 4,
  },
});
