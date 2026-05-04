import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../components/ui';
import { colors, radius, spacing, typography } from '../../../constants/theme';
import { DashboardStackParamList } from '../../../shell/navigation/types';

type Nav = NativeStackNavigationProp<DashboardStackParamList, 'StoryUploadPreview'>;

const { height: SCREEN_H } = Dimensions.get('window');

export function StoryUploadPreviewScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [uploading, setUploading] = useState(false);
  const previewScale = useRef(new Animated.Value(0.94)).current;
  const previewOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(previewScale, {
        toValue: 1,
        friction: 8,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(previewOpacity, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [previewOpacity, previewScale]);

  const publish = useCallback(() => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      Alert.alert('Uploaded', 'Your story was published (mock).', [
        { text: 'OK', onPress: () => navigation.pop(2) },
      ]);
    }, 900);
  }, [navigation]);

  const maxPreviewH = SCREEN_H * 0.62;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Preview</Text>
      <Text style={styles.sub}>How your story will look in the feed</Text>

      <Animated.View
        style={[
          styles.previewWrap,
          {
            maxHeight: maxPreviewH,
            opacity: previewOpacity,
            transform: [{ scale: previewScale }],
          },
        ]}
      >
        <View style={styles.preview}>
          <View style={styles.previewGradientTop} />
          <View style={styles.previewBody}>
            <Ionicons name="sparkles-outline" size={40} color="rgba(255,255,255,0.9)" />
            <Text style={styles.previewLabel}>Story preview</Text>
            <Text style={styles.previewMeta}>9:16 · full bleed</Text>
          </View>
          <View style={styles.previewFooter}>
            <View style={styles.mockAvatar} />
            <View style={styles.mockLines}>
              <View style={styles.mockLineWide} />
              <View style={styles.mockLineShort} />
            </View>
          </View>
        </View>
      </Animated.View>

      <View style={[styles.actions, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button title="Upload story" onPress={publish} loading={uploading} />
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.discard, pressed && styles.discardPressed]}
          accessibilityRole="button"
          accessibilityLabel="Discard and go back"
        >
          <Text style={styles.discardText}>Discard</Text>
        </Pressable>
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
    marginBottom: spacing.xs,
  },
  sub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  previewWrap: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    aspectRatio: 9 / 16,
    borderRadius: radius.card,
    overflow: 'hidden',
  },
  preview: {
    flex: 1,
    backgroundColor: '#4F46E5',
  },
  previewGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '38%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  previewBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  previewLabel: {
    ...typography.title,
    color: '#fff',
    marginTop: spacing.md,
    fontWeight: '700',
  },
  previewMeta: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.xs,
  },
  previewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  mockAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  mockLines: {
    marginLeft: spacing.sm,
    flex: 1,
    gap: 6,
  },
  mockLineWide: {
    height: 8,
    borderRadius: 4,
    width: '72%',
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  mockLineShort: {
    height: 8,
    borderRadius: 4,
    width: '44%',
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  actions: {
    marginTop: 'auto',
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  discard: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  discardPressed: {
    opacity: 0.65,
  },
  discardText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
