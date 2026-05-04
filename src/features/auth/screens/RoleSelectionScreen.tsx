import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';

export function RoleSelectionScreen() {
  const setRole = useAuthStore((s) => s.setRole);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How will you use Nexus?</Text>
      <Text style={styles.sub}>You can switch modes later in settings (mock).</Text>
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Continue as User</Text>
        <Text style={styles.cardBody}>Book services, chat with providers, and save favorites.</Text>
        <Button title="Continue as User" onPress={() => setRole('user')} style={styles.btn} />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Continue as Provider</Text>
        <Text style={styles.cardBody}>Manage requests, upload stories, and track performance.</Text>
        <Button title="Continue as Provider" onPress={() => setRole('provider')} style={styles.btn} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: spacing.xl + spacing.md,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  sub: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
  cardBody: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  btn: {
    marginTop: spacing.xs,
  },
});
