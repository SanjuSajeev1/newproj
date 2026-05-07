import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';
import { AuthButton } from '../components/AuthButton';
import { ModernInput } from '../components/ModernInput';

export function LoginScreen() {
  const submitPhone = useAuthStore((s) => s.submitPhone);
  const setAppFlow = useAuthStore((s) => s.setAppFlow);

  const [phone, setPhone] = useState('');

  const canContinue = phone.replace(/\D/g, '').length >= 10;

  const hero = useMemo(
    () => 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=1800&q=85',
    [],
  );

  return (
    <ImageBackground source={{ uri: hero }} style={styles.bg} resizeMode="cover">
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.78)']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.topRow}>
          <Pressable onPress={() => setAppFlow('onboarding')} hitSlop={12} accessibilityRole="button">
            <View style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
            </View>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Animated.Text entering={FadeInDown.duration(520)} style={styles.title}>
            Continue with your mobile number
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(60).duration(520)} style={styles.sub}>
            We’ll send you a one-time code to verify your number.
          </Animated.Text>

          <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
            <ModernInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Mobile number"
              leftIcon="call-outline"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
            />

            <AuthButton
              title="Send OTP"
              onPress={() => submitPhone(phone)}
              disabled={!canContinue}
              style={styles.cta}
            />
          </View>

          <Text style={styles.legal}>
            By continuing, you agree to our Terms and confirm you’ve read our Privacy Policy.
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
  cta: {
    marginTop: spacing.xs,
  },
  legal: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    lineHeight: 18,
  },
});
