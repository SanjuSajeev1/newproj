import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';
import { AuthButton } from '../components/AuthButton';
import { ModernInput } from '../components/ModernInput';

export function OtpVerificationScreen() {
  const setAppFlow = useAuthStore((s) => s.setAppFlow);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const pendingPhone = useAuthStore((s) => s.pendingPhone);
  const [otp, setOtp] = useState('');

  const canContinue = otp.replace(/\D/g, '').length >= 4;

  const hero = useMemo(
    () => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=85',
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
          <Pressable onPress={() => setAppFlow('login')} hitSlop={12} accessibilityRole="button">
            <View style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
            </View>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Animated.Text entering={FadeInDown.duration(520)} style={styles.title}>
            Enter the code
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(60).duration(520)} style={styles.sub}>
            We sent a one-time code to {pendingPhone ?? 'your number'}.
          </Animated.Text>

          <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
            <ModernInput
              value={otp}
              onChangeText={setOtp}
              placeholder="OTP"
              leftIcon="key-outline"
              keyboardType="number-pad"
              autoComplete="one-time-code"
              textContentType="oneTimeCode"
              maxLength={6}
            />

            <AuthButton title="Verify" onPress={() => verifyOtp(otp)} disabled={!canContinue} />
          </View>

          <Pressable onPress={() => {}} accessibilityRole="button" style={styles.resend}>
            <Text style={styles.resendText}>Resend code</Text>
          </Pressable>
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
  resend: {
    marginTop: spacing.lg,
    alignSelf: 'center',
  },
  resendText: {
    ...typography.caption,
    color: colors.accentBlue,
    fontWeight: '900',
  },
});

