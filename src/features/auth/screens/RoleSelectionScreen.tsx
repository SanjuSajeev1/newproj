import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '../../../components/ui';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';
import { RoleSelectionCard } from '../components/RoleSelectionCard';

export function RoleSelectionScreen() {
  const setRole = useAuthStore((s) => s.setRole);
  const continueAsGuest = useAuthStore((s) => s.continueAsGuest);
  const [selected, setSelected] = useState<'user' | 'provider' | null>(null);

  const images = useMemo(
    () => ({
      user: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=85',
      provider: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1800&q=85',
    }),
    [],
  );

  return (
    <ImageBackground source={{ uri: selected ? images[selected] : images.user }} style={styles.bg} resizeMode="cover">
      <LinearGradient
        colors={['rgba(0,0,0,0.30)', 'rgba(0,0,0,0.42)', 'rgba(0,0,0,0.86)']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.container}>
        <Animated.View entering={FadeInDown.duration(520)} style={styles.hero}>
          <Text style={styles.title}>Choose your experience</Text>
          <Text style={styles.sub}>You can switch roles later in settings.</Text>
        </Animated.View>

        <View style={styles.list}>
          <RoleSelectionCard
            title="Explore Services"
            subtitle="Discover and book trusted professionals around you."
            imageUrl={images.user}
            selected={selected === 'user'}
            onPress={() => setSelected('user')}
          />
          <RoleSelectionCard
            title="Offer Your Services"
            subtitle="Showcase your work, connect with clients, and grow your business."
            imageUrl={images.provider}
            selected={selected === 'provider'}
            onPress={() => setSelected('provider')}
          />
        </View>

        {selected ? (
          <Animated.View entering={FadeInDown.duration(420)} style={styles.ctaWrap}>
            <Button
              title="Continue"
              onPress={() => setRole(selected)}
              variant="secondary"
              style={styles.cta}
              accessibilityLabel="Continue"
            />
            <Pressable onPress={continueAsGuest} accessibilityRole="button" accessibilityLabel="Continue as guest">
              <Text style={styles.guest}>Continue as guest</Text>
            </Pressable>
          </Animated.View>
        ) : (
          <View style={styles.ctaWrap} />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl + spacing.md,
    paddingBottom: spacing['2xl'],
  },
  hero: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.heading,
    fontSize: 28,
    color: '#FFFFFF',
    letterSpacing: -0.7,
    marginBottom: spacing.sm,
  },
  sub: {
    ...typography.body,
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 22,
  },
  list: {
    gap: spacing.md,
  },
  ctaWrap: {
    marginTop: 'auto',
    gap: spacing.md,
  },
  cta: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
  },
  guest: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.82)',
    fontWeight: '900',
    textAlign: 'center',
  },
});
