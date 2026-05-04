import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';

export function WelcomeScreen() {
  const continueAsGuest = useAuthStore((s) => s.continueAsGuest);
  const beginLogin = useAuthStore((s) => s.beginLogin);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Welcome to Nexus</Text>
        <Text style={styles.sub}>
          Discover trusted providers, follow stories, and book services in one place.
        </Text>
      </View>
      <View style={styles.actions}>
        <Button title="Continue as Guest" onPress={continueAsGuest} variant="secondary" />
        <Button title="Login / Signup" onPress={beginLogin} style={styles.primaryBtn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: spacing.xl + spacing.md,
  },
  hero: {
    marginTop: spacing.xl * 2,
  },
  title: {
    ...typography.title,
    fontSize: 28,
    marginBottom: spacing.md,
  },
  sub: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  actions: {
    gap: spacing.sm,
  },
  primaryBtn: {
    marginTop: spacing.xs,
  },
});
