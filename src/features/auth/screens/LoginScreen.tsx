import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../components/Button';
import { InputField } from '../../../components/InputField';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';

export function LoginScreen() {
  const [email, setEmail] = useState('demo@nexus.app');
  const [password, setPassword] = useState('password');
  const completeMockLogin = useAuthStore((s) => s.completeMockLogin);
  const setAppFlow = useAuthStore((s) => s.setAppFlow);
  const isGuest = useAuthStore((s) => s.isGuest);

  const goBack = () => {
    if (isGuest) {
      setAppFlow('main');
    } else {
      setAppFlow('welcome');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Pressable onPress={goBack} hitSlop={12} style={styles.backRow} accessibilityRole="button">
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.hint}>Mock login — no real authentication.</Text>
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <InputField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Continue" onPress={completeMockLogin} style={styles.cta} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
    paddingTop: spacing.xl + spacing.md,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  backLabel: {
    ...typography.title,
    marginLeft: spacing.xs,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  hint: {
    ...typography.caption,
    marginBottom: spacing.lg,
    color: colors.textSecondary,
  },
  cta: {
    marginTop: spacing.md,
  },
});
