import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card } from '../../../components/ui';
import { colors, shadows, spacing, typography } from '../../../constants/theme';
import { DashboardStackParamList } from '../../../shell/navigation/types';

type Nav = NativeStackNavigationProp<DashboardStackParamList, 'StoryUpload'>;

export function StoryUploadScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.985,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const onPressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const pulseHint = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseHint, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseHint, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulseHint]);

  const hintOpacity = pulseHint.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom + spacing.md }]}>
      <Text style={styles.title}>New story</Text>
      <Text style={styles.sub}>
        Choose a photo or short clip. You will preview it full screen before publishing.
      </Text>

      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => navigation.navigate('StoryUploadPreview')}
          accessibilityRole="button"
          accessibilityLabel="Choose media for story"
        >
          <Card style={styles.drop} padded>
            <View style={styles.iconRing}>
              <Ionicons name="images-outline" size={36} color={colors.primary} />
            </View>
            <Text style={styles.dropTitle}>Tap to choose media</Text>
            <Animated.Text style={[styles.dropHint, { opacity: hintOpacity }]}>
              JPEG, PNG, or short video · mock flow skips the picker
            </Animated.Text>
          </Card>
        </Pressable>
      </Animated.View>

      <View style={styles.footer}>
        <Button
          title="Continue to preview"
          onPress={() => navigation.navigate('StoryUploadPreview')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    ...typography.heading,
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  sub: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  drop: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  iconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  dropTitle: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
  dropHint: {
    ...typography.caption,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing.lg,
  },
});
