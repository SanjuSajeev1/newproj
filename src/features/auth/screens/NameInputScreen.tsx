import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';
import { AuthButton } from '../components/AuthButton';
import { ModernInput } from '../components/ModernInput';

export function NameInputScreen() {
  const setAppFlow = useAuthStore((s) => s.setAppFlow);
  const submitName = useAuthStore((s) => s.submitName);

  const [firstName, setFirstName] = useState('');
  const [fullName, setFullName] = useState('');

  const canContinue = firstName.trim().length >= 2;

  const hero = useMemo(
    () => 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1800&q=85',
    [],
  );

  return (
    <ImageBackground source={{ uri: hero }} style={styles.bg} resizeMode="cover">
      <LinearGradient
        colors={['rgba(0,0,0,0.18)', 'rgba(0,0,0,0.28)', 'rgba(0,0,0,0.72)']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.topRow}>
          <Pressable onPress={() => setAppFlow('otp')} hitSlop={12} accessibilityRole="button">
            <View style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
            </View>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Animated.Text entering={FadeInDown.duration(520)} style={styles.title}>
            What should we call you?
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(60).duration(520)} style={styles.sub}>
            Your name will appear across the app — for example, “Welcome back, {firstName.trim() || '…'}”.
          </Animated.Text>

          <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
            <ModernInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First name"
              leftIcon="person-outline"
              autoCapitalize="words"
              textContentType="givenName"
            />
            <ModernInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full name (optional)"
              leftIcon="id-card-outline"
              autoCapitalize="words"
              textContentType="name"
            />
            <AuthButton
              title="Continue"
              onPress={() => submitName(firstName, fullName || undefined)}
              disabled={!canContinue}
            />
          </View>

          <Text style={styles.hint}>
            You can change this later in your profile settings.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bg: { flex: 1 },
  topRow: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: 'auto',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing['2xl'],
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  title: {
    ...typography.heading,
    fontSize: 26,
    letterSpacing: -0.6,
  },
  sub: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});

