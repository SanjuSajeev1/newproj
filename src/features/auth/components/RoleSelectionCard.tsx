import { LinearGradient } from 'expo-linear-gradient';
import { memo } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, shadows, spacing, typography } from '../../../constants/theme';

type Props = {
  title: string;
  subtitle: string;
  imageUrl: string;
  selected: boolean;
  onPress: () => void;
};

const spring = { damping: 18, stiffness: 240, mass: 0.8 };

export const RoleSelectionCard = memo(function RoleSelectionCard({
  title,
  subtitle,
  imageUrl,
  selected,
  onPress,
}: Props) {
  const press = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => {
    const s = 1 - press.value * 0.02;
    return { transform: [{ scale: s }] };
  });

  const borderStyle = useAnimatedStyle(() => {
    const c = interpolateColor(
      selected ? 1 : 0,
      [0, 1],
      ['rgba(255,255,255,0.14)', 'rgba(37,99,235,0.85)'],
    );
    const glow = selected ? 0.28 : 0.14;
    return {
      borderColor: c,
      shadowColor: colors.accentBlue,
      shadowOpacity: glow,
    };
  }, [selected]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        press.value = withSpring(1, spring);
      }}
      onPressOut={() => {
        press.value = withSpring(0, spring);
      }}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Animated.View style={[styles.card, cardStyle, borderStyle]}>
        <ImageBackground source={{ uri: imageUrl }} style={styles.bg} resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.22)', 'rgba(0,0,0,0.78)']}
            locations={[0, 0.55, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.sub}>{subtitle}</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: '#0B1220',
    ...shadows.float,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 28,
  },
  bg: {
    width: '100%',
    height: 210,
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.heading,
    fontSize: 22,
    color: '#FFFFFF',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  sub: {
    ...typography.body,
    color: 'rgba(255,255,255,0.84)',
    lineHeight: 20,
  },
});

